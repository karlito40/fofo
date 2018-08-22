<?php

namespace App\Http\Controllers\API;

use App\Exceptions\InvalidCredentialsException;
use App\Http\Requests\LoginRequest;
use App\User;
use App\Utils\OAuthProxy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LoginController extends APIController
{

    public function login(LoginRequest $request, OAuthProxy $oauth)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        if(!Auth::attempt(compact('email', 'password'))) {
            throw new InvalidCredentialsException();
        }

        $oauthToken = $oauth->login($email, $password);

        return $this->ok([
            'user' => Auth::user(),
            'access_token' => $oauthToken['access_token']
        ]);
    }

    public function logout(Request $request)
    {
        $accessToken = $request->user()->token();
        $accessToken->revoke();

        return $this->ok([]);
    }



}
