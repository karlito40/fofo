<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Log;

class Site extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'domain',
    ];

    protected $dates = ['deleted_at'];

    public function pages()
    {
        return $this->hasMany(Page::class);
    }
}
