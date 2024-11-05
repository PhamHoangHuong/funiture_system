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

//Route::apiResource('salesrules', CartPriceRuleController::class);

Route::group(['prefix' => 'salesrules'], function () {
    Route::get('/', [CartPriceRuleController::class, 'index']);
    Route::get('/{ruleId}', [CartPriceRuleController::class, 'show']);
    Route::post('/', [CartPriceRuleController::class, 'store']);
    Route::put('/{ruleId}', [CartPriceRuleController::class, 'update']);
    Route::delete('/{ruleId}', [CartPriceRuleController::class, 'destroy']);
});