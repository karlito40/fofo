<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;

class UserController extends APIController
{

    public function me(Request $request)
    {
        return $this->res($request->user());
    }

    public function login()
    {
        if(!Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            return $this->err(['code' => 'INVALID_ACCOUNT']);
        }

        $user = Auth::user();
        $token = $user->createToken(config('app.name'))->accessToken;

        return $this->res(compact('user', 'token'));

    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return $this->err([
                'code' => 'INVALID_INPUTS',
                'validator' => $validator->errors()
            ]);
        }

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);
        $user = User::create($input);
        $token = $user->createToken(config('app.name'))->accessToken;

        return $this->res(compact('token', 'user'));
    }

}
