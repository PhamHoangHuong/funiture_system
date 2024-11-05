<?php

use Modules\CatalogPriceRule\Http\Controllers\CatalogPriceRuleController;

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

//Route::middleware('auth:api')->get('/catalogpricerule', function (Request $request) {
//    return $request->user();
//});
Route::group(['prefix' => 'catalogrules'], function () {
    Route::get('', [CatalogPriceRuleController::class, 'index']);
    Route::post('', [CatalogPriceRuleController::class, 'store']);
    Route::get('/{ruleId}', [CatalogPriceRuleController::class, 'show']);
    Route::put('/{ruleId}', [CatalogPriceRuleController::class, 'update']);
    Route::delete('/{ruleId}', [CatalogPriceRuleController::class, 'destroy']);
});
