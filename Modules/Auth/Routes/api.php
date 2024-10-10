<?php

use Illuminate\Http\Request;
use Modules\Auth\Http\Controllers\AuthController;

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

Route::group([
    'middleware' => 'jwt',
    'prefix' => 'auth'
], function ($router) {
    Route::get('profile', [AuthController::class,'profile']);
    Route::post('logout', [AuthController::class,'logout']);
});
Route::post('auth/login', [AuthController::class,'login']);
Route::post('auth/refresh', [AuthController::class,'refresh']);
