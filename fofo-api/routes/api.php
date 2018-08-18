<?php

use Illuminate\Http\Request;

Route::prefix('/v1')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:api');

    // ---------- User ---------- //
    Route::get('/me', 'API\UserController@me')->middleware('auth:api');
    Route::post('/login', 'API\UserController@login');
    Route::post('/register', 'API\UserController@register');

    // ---------- Feed ---------- //
    Route::get('/feed', 'API\ActivityController@world');
    Route::get('/feed/{address}', 'API\ActivityController@address')
        ->where('address', '.+');
});




