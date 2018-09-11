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

    public static function byLatestActivity()
    {
        $fromTable = (new static)->getTable();

        return static::query()
            ->select(
                'sites.id',
                'sites.domain',
                DB::raw('MAX(latest_page.last_comment_id) as last_comment_id')
            )
            ->joinSub(Page::byLatestActivity(), 'latest_page', function($join) use($fromTable) {
                $join->on($fromTable . '.id', 'latest_page.site_id');
            })
            ->groupBy('sites.id')
            ->orderBy('last_comment_id', 'desc');

        /*return Page::byLatestActivity()
            ->select(
                'sites.id',
                DB::raw('MAX(latest_comments.last_id) as last_comment_id'),
                'sites.domain'
            )
            ->join('sites',  'pages.site_id', '=', 'sites.id')
            ->groupBy('pages.site_id');*/
    }

    public function pages()
    {
        return $this->hasMany(Page::class);
    }

    public function visites()
    {
        return $this->hasMany(Visite::class);
    }
}
