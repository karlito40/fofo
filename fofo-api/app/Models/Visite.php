<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Visite extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'ip', 'viewed_at'
    ];

    protected $dates = ['deleted_at', 'viewed_at'];

    public static function connect($ip, User $user)
    {
        return static::where('ip', $ip)
            ->update(['user_id' => $user->id]);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function site()
    {
        return $this->belongsTo(Site::class);
    }
}
