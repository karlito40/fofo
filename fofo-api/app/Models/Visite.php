<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Visite extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'ip', 'viewed_at'
    ];

    protected $dates = ['deleted_at', 'viewed_at'];

    public static function bySites()
    {
        return Visite::query()
            ->select(
                'sites.id',
                'sites.domain',
                DB::raw('MAX(visites.viewed_at) as viewed_at'),
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

    public static function connect($ip, User $user)
    {
        return static::where('ip', $ip)
            ->update(['user_id' => $user->id]);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function page()
    {
        return $this->belongsTo(Page::class);
    }
}
