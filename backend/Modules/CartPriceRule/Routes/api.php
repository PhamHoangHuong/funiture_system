<?php

use Illuminate\Http\Request;
use Modules\CartPriceRule\Http\Controllers\CartPriceRuleController;

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

//Route::middleware('auth:api')->get('/cartpricerule', function (Request $request) {
//    return $request->user();
//});

Route::apiResource('cart-rules', CartPriceRuleController::class);