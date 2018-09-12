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
        'uri',
        'title'
    ];

    protected $dates = ['deleted_at'];

    public static function findOrCreateWithAddress(WWWAddress $address)
    {
        $site = Site::firstOrCreate([
            'domain' => $address->getDomain(),
        ]);

        $page = static::where('site_id', $site->id)
            ->where('uri', $address->getUri())
            ->first();

        if(!$page) {
            $page = new static([
                'uri' => $address->getUri(),
                'title' => $address->findTitle()
            ]);

            $page->site()->associate($site);
            $page->save();
        }

        return $page;
    }

    public static function findLatestComment($domain, $uri)
    {
        $site = Site::with(['pages' => function($query) use($uri) {
            $query->where('uri', $uri);
        }])
            ->where('domain', $domain)
            ->first();

        return (!empty($site) && $site->pages->isNotEmpty())
            ? Comment::byLatestActivity($site->pages[0]->id)
            : Comment::whereRaw('1 != 1');
    }

    public static function byLatestActivity($domain = null) : Builder
    {
        $fromTable = (new static)->getTable();

        return static::query()
            ->select('pages.id', 'pages.title', 'pages.uri', 'pages.site_id', 'latest_comments.last_id as last_comment_id')
            ->joinSub(Comment::byLatestOfType(static::class), 'latest_comments', function($join) use($fromTable) {
                $join->on($fromTable . '.id', 'latest_comments.commentable_id');
            })
            ->when($domain, function ($query, $domain) use($fromTable) {
                $joinTable = (new Site)->getTable();
                $query->join($joinTable, $fromTable . '.site_id', $joinTable . '.id');
                $query->where($joinTable . '.domain', $domain);
            })
            ->orderBy('latest_comments.last_comment_created_at', 'desc')
            ->orderBy('last_comment_id', 'desc');
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
