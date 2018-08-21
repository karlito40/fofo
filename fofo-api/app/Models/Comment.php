<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'content',
    ];

    protected $dates = ['deleted_at'];

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

    public static function concatAll($pageId)
    {
        $query = (new static)->newQuery();

        $query->whereHas('highlight', function($q) use($pageId)
        {
            $q->where('page_id', $pageId);
        })->orWhereHas('page', function ($q) use($pageId)
        {
            $q->where('id', $pageId);
        });

        return $query;
    }


}
