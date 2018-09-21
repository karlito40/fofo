<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\APIRequest;
use App\Http\Requests\FindUserRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\Visite;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Validator;
use App\Utils\OAuthProxy;

class UserController extends APIController
{

    public function me(APIRequest $request)
    {
        $user = $request->user();
        $user->load('visites');

        return $this->ok(new UserResource($user));
    }

    public function find(FindUserRequest $request)
    {
        $user = User::where($request->all())->first();
        return $this->ok($user ? new UserResource($user) : null);
    }

    public function register(RegisterRequest $request, OAuthProxy $oauth)
    {
        $input = $request->all();
        $input['password'] = Hash::make($input['password']);

        $user = User::create($input);
        $oauthToken = $oauth->login($user->email, $request->input('password'));

        Visite::connect($request->ip(), $user);

        $user->load('visites');

        return $this->ok([
            'user' => new UserResource($user),
            'access_token' => $oauthToken['access_token']
        ]);
    }

}
