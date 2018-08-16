<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = [
        'uri'
    ];

    public function site()
    {
        return $this->belongsTo('App\Models\Site');
    }

    public function highlights()
    {
        return $this->hasMany('App\Models\Highlight');
    }

    public function comments()
    {
        return $this->morphMany('App\Models\Comment', 'commentable');
    }
}
