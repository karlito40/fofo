<?php

namespace App\Models;

use App\Utils\WWWAddress;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\SoftDeletes;

class Page extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'uri'
    ];

    protected $dates = ['deleted_at'];

    public static function findOrCreateWithAddress(WWWAddress $address)
    {
        $page = static::firstOrNew([
            'uri' => $address->getUri(),
        ]);

        if(!isset($page->created_at)) {
            $site = Site::firstOrCreate([
                'domain' => $address->getDomain(),
            ]);

            $page->site()->associate($site);
            $page->save();
        }

        return $page;
    }

    public static function byLatestActivity($domain = null)
    {
        $fromTable = (new static)->getTable();

        return static::query()
            ->joinSub(Comment::byLatestOfType(static::class), 'latest_comments', function($join) use($fromTable) {
                $join->on($fromTable . '.id', 'latest_comments.commentable_id');
            })
            ->when($domain, function ($query, $domain) use($fromTable) {
                $joinTable = (new Site)->getTable();
                $query->join($joinTable, $fromTable . '.site_id', $joinTable . '.id');
                $query->where($joinTable . '.domain', $domain);
            })
            ->orderBy('latest_comments.last_comment_created_at', 'desc');
    }

    public function site()
    {
        return $this->belongsTo(Site::class);
    }

    public function highlights()
    {
        return $this->hasMany(Highlight::class);
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }



}
