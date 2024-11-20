<?php

use Illuminate\Http\Request;
use Modules\Menu\Http\Controllers\MenuController;

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

//Route::middleware('auth:api')->get('/menu', function (Request $request) {
//    return $request->user();
//});

Route::apiResource('menus', MenuController::class);
