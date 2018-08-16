<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;

class Page extends Model
{
    protected $fillable = [
        'uri'
    ];

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
