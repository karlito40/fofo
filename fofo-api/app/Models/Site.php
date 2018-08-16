<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Site extends Model
{

    protected $fillable = [
        'domain',
    ];

    public function pages()
    {
        return $this->hasMany('App\Models\Page');
    }
}
