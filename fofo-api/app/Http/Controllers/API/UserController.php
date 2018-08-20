<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;

class UserController extends APIController
{

    public function me(Request $request)
    {
        return $this->ok($request->user());
    }

    public function login(LoginRequest $request)
    {
        if(!Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            return $this->err(['code' => 'INVALID_ACCOUNT']);
        }

        $user = Auth::user();
        $token = $user->createToken(config('app.name'))->accessToken;

        return $this->ok(compact('user', 'token'));

    }

    public function register(RegisterRequest $request)
    {
        $input = $request->all();
        $input['password'] = Hash::make($input['password']);
        $user = User::create($input);
        $token = $user->createToken(config('app.name'))->accessToken;

        return $this->ok(compact('token', 'user'));
    }

}
