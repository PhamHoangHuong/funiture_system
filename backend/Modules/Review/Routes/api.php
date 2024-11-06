<?php

use Illuminate\Http\Request;
use Modules\Review\Http\Controllers\ReviewController;

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

//Route::middleware('auth:api')->get('/review', function (Request $request) {
//    return $request->user();
//});

Route::group(['prefix' => '/reviews'], function () {
    Route::get('', [ReviewController::class, 'index']);
    Route::post('', [ReviewController::class, 'store']);
    Route::put('/{id}', [ReviewController::class, 'update']);
    Route::delete('/{id}', [ReviewController::class, 'destroy']);
});