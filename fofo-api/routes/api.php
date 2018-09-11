<?php

$publicRoutes = function()
{
    // ---------- Login ---------- //
    Route::post('/login', 'API\LoginController@login');

    // ---------- User ---------- //
    Route::post('/register', 'API\UserController@register');

    // ---------- Feed ---------- //
    /*Route::get('/feed', 'API\ActivityController@world');
    Route::get('/feed/site/{domain}', 'API\ActivityController@site');
    Route::get('/feed/page/{address}', 'API\ActivityController@comments')->where('address', '.+');
    Route::get('/feed/{address}', 'API\ActivityController@address')->where('address', '.+');*/

    Route::get('/feed/world', 'API\ActivityController@world');
    Route::get('/feed/site', 'API\ActivityController@site');
    Route::get('/feed/page', 'API\ActivityController@page');

    Route::get('/visitor/visites', 'API\VisiteController@listByIp');
    Route::post('/visite', 'API\VisiteController@add');

};

$restrictedRoutes = function()
{
    // ---------- Login ---------- //
    Route::post('/logout', 'API\LoginController@logout');

    // ---------- User ---------- //
    Route::get('/me', 'API\UserController@me')->middleware('auth:api');

    // ---------- Highlight ---------- //
    Route::post('/highlight', 'API\HighlightController@add');
    Route::delete('/highlight/{highlight}', 'API\HighlightController@delete');

    // ---------- Comment ---------- //
    Route::post('/comment', 'API\CommentController@add');
    Route::delete('/comment/{comment}', 'API\CommentController@delete');

    // ---------- Like ---------- //
    Route::post('/like', 'API\LikeController@add');
    Route::delete('/like/{id}', 'API\LikeController@delete');

    // ---------- Favorite ---------- //
    Route::get('/favs', 'API\FavoriteController@feed');
    Route::post('/fav', 'API\FavoriteController@add');
    Route::delete('/fav/{id}', 'API\FavoriteController@delete');
};

Route::prefix('/v1')->group(function() use($publicRoutes, $restrictedRoutes)
{
    $publicRoutes();

    Route::middleware('auth:api')->group(function() use($restrictedRoutes)
    {
        $restrictedRoutes();
    });
});
