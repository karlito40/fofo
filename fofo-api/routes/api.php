<?php

$publicRoutes = function()
{
    // ---------- User ---------- //
    Route::post('/login', 'API\UserController@login');
    Route::post('/register', 'API\UserController@register');

    // ---------- Feed ---------- //
    Route::get('/feed', 'API\ActivityController@world');
    Route::get('/feed/{address}', 'API\ActivityController@address')->where('address', '.+');
    Route::get('/feed/site/{domain}', 'API\ActivityController@site');
    Route::get('/feed/page/{address}', 'API\ActivityController@comments')->where('address', '.+');
};

$authRoutes = function()
{
    // ---------- User ---------- //
    Route::get('/me', 'API\UserController@me')->middleware('auth:api');

    // ---------- Highlight ---------- //
    Route::post('/highlight', 'API\HighlightController@add');
    Route::delete('/highlight/{id}', 'API\HighlightController@delete');

    // ---------- Comment ---------- //
    Route::post('/comment', 'API\CommentController@add');
    Route::delete('/comment/{id}', 'API\CommentController@delete');

    // ---------- Like ---------- //
    Route::post('/like', 'API\LikeController@add');
    Route::delete('/like/{id}', 'API\LikeController@delete');

    // ---------- Favorite ---------- //
    Route::get('/favs', 'API\FavoriteController@feed');
    Route::post('/fav', 'API\FavoriteController@add');
    Route::delete('/fav/{id}', 'API\FavoriteController@delete');
};

Route::prefix('/v1')->group(function() use($publicRoutes, $authRoutes)
{
    $publicRoutes();

    Route::middleware('auth:api')->group(function() use($authRoutes)
    {
        $authRoutes();
    });
});
