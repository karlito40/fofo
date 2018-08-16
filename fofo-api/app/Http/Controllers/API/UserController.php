<?php

namespace App\Http\Controllers\API;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login() {

        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            $accessToken = $user->createToken('Fofo')->accessToken;

            return response()->json([
                'data' => [
                    'access_token' => $accessToken,
                    'user' => $user
                ]
            ]);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => [
                    'code' => 'INVALID_INPUTS',
                    'validator' => $validator->errors()
                ]
            ], 401);
        }

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);
        $user = User::create($input);
        $accessToken = $user->createToken('Fofo')->accessToken;

        return response()->json([
            'data' => [
                'access_token' => $accessToken,
                'user' => $user
            ]
        ]);
    }

}
