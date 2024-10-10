<?php

use Illuminate\Http\Request;
use Modules\Customer\Http\Controllers\CustomerController;
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

//Route::middleware('auth:api')->get('/customer', function (Request $request) {
//    return $request->user();
//});


Route::apiResource('customer', CustomerController::class);
