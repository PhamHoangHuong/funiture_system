<?php

use Illuminate\Http\Request;
use Modules\Wishlist\Http\Controllers\WishlistController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//
//Route::middleware('auth:api')->get('/wishlist', function (Request $request) {
//    return $request->user();
//});

Route::apiResource('wishlist', WishlistController::class);