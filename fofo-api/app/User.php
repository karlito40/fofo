<?php

namespace App;

use App\Models\Comment;
use App\Models\Highlight;
use App\Models\Page;
use App\Models\Visite;
use App\Traits\VisitedSitesScope;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, SoftDeletes, VisitedSitesScope;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $dates = ['deleted_at'];

    public function getAvatar()
    {
        $hash = isset($this->email) ? md5($this->email) : '';
        return 'https://www.gravatar.com/avatar/' . $hash;
    }

    public function highlights()
    {
        return $this->hasMany(Highlight::class);
    }

    public function visites()
    {
        return $this->hasMany(Visite::class)
            ->visitedSites();
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
