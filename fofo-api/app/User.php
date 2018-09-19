<?php

namespace App;

use App\Models\Comment;
use App\Models\Highlight;
use App\Models\Page;
use App\Models\Visite;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, SoftDeletes;

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
            ->select(
                'sites.id',
                'sites.domain',
                DB::raw('MAX(visites.viewed_at) as viewed_at'),
                DB::raw('MAX(visites.user_id) as user_id'),
                DB::raw('MAX(comments.id) as has_new_comment')
            )
            ->join('pages', 'pages.id', '=', 'visites.page_id')
            ->join('sites', 'sites.id', '=', 'pages.site_id')
            ->leftJoin('comments', function ($join) {
                $join->on('comments.commentable_id', '=', 'pages.id')
                    ->where('comments.commentable_type', '=', Page::class)
                    ->whereRaw('comments.created_at > visites.viewed_at');

            })
            ->groupBy('sites.id')
            ->orderByDesc('viewed_at');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
