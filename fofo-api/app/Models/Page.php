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
