<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Site extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'domain',
    ];

    protected $dates = ['deleted_at'];

    public static function byLatestActivity($userOrIp)
    {
        $fromTable = (new static)->getTable();

        return static::query()
            ->select(
                'sites.id',
                'sites.domain',
                DB::raw('MAX(latest_page.has_new_comment) as has_new_comment'),
                DB::raw('MAX(latest_page.last_comment_id) as last_comment_id')
            )
            ->joinSub(Page::byLatestActivity($userOrIp), 'latest_page', function($join) use($fromTable) {
                $join->on($fromTable . '.id', 'latest_page.site_id');
            })
            ->groupBy('sites.id')
            ->orderBy('last_comment_id', 'desc');
    }

    public function pages()
    {
        return $this->hasMany(Page::class);
    }

    public function visites()
    {
        return $this->pages()->visites();
    }

}
