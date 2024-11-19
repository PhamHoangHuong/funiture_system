<?php

use Illuminate\Support\Facades\Route;
use Modules\Category\Http\Controllers\CategoryController;
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

Route::group(['prefix' => '/category'], function () {
    Route::get('', [CategoryController::class, 'index']);
    Route::get('/{categoryId}', [CategoryController::class, 'show']);
    Route::post('', [CategoryController::class, 'store']);
    Route::put('/{categoryId}', [CategoryController::class, 'update']);
    Route::put('/{categoryId}/active', [CategoryController::class, 'switchStatus']);
    Route::delete('/{categoryId}', [CategoryController::class, 'destroy']);
});
