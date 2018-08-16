<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Highlight extends Model
{
    protected $fillable = [
        'location'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function page()
    {
        return $this->belongsTo('App\Models\Page');
    }

    public function comments()
    {
        return $this->morphMany('App\Models\Comment', 'commentable');
    }
}
