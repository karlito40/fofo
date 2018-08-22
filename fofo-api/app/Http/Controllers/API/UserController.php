<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Validator;
use App\Utils\OAuthProxy;

class UserController extends APIController
{

    public function me(Request $request)
    {
        return $this->ok($request->user());
    }

    public function register(RegisterRequest $request, OAuthProxy $oauth)
    {
        $input = $request->all();
        $input['password'] = Hash::make($input['password']);

        $user = User::create($input);
        $oauthToken = $oauth->login($user->email, $request->input('password'));

        return $this->ok([
            'user' => $user,
            'access_token' => $oauthToken['access_token']
        ]);
    }

}
