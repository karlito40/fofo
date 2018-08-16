<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Highlight extends Model
{
    protected $fillable = [
        'location'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function page()
    {
        return $this->belongsTo(Page::class);
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
