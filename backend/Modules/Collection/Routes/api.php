<?php

use Illuminate\Http\Request;
use Modules\Collection\Http\Controllers\CollectionController;

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

//Route::middleware('auth:api')->get('/collection', function (Request $request) {
//    return $request->user();
//});

Route::group(['prefix' => '/collections'], function () {
    Route::get('', [CollectionController::class, 'index']);
    Route::get('/{collectionId}', [CollectionController::class, 'show']);
    Route::post('', [CollectionController::class, 'store']);
    Route::put('/{collectionId}', [CollectionController::class, 'update']);
    Route::put('/{collectionId}/active', [CollectionController::class, 'switchStatus']);
    Route::delete('/{collectionId}', [CollectionController::class, 'destroy']);
});