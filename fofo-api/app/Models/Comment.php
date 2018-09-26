<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Comment extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'content'
    ];

    protected $dates = ['deleted_at'];

    public static function byLatestOfType($commentableType)
    {
        return static::query()
            ->select(
                'commentable_id',
                DB::raw('MAX(created_at) as last_comment_created_at'),
                DB::raw('MAX(id) as last_id')
            )
            ->where('commentable_type', $commentableType)
            ->groupBy('commentable_id');
    }

    public static function byLatestActivity($pageId)
    {
        $query = static::query();

        $query->whereHas('highlight', function($q) use($pageId)
        {
            $q->where('page_id', $pageId);
        })->orWhereHas('page', function ($q) use($pageId)
        {
            $q->where('id', $pageId);
        })->orderBy('id', 'desc');

        return $query;
    }

    public function setContentAttribute($content)
    {
        $parsedown = new \Parsedown;
        $parsedown->setSafeMode(true);

        $this->attributes['content'] = $parsedown->text($content);
    }

    public function commentable()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function highlight()
    {
        return $this->belongsTo(Highlight::class, 'commentable_id')
            ->whereCommentableType(Highlight::class);
    }

    public function page()
    {
        return $this->belongsTo(Page::class, 'commentable_id')
            ->whereCommentableType(Page::class);
    }



}
