<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\Cart\Http\Controllers\CartController;

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
Route::group(['prefix' => '/cart'], function () {
    Route::get('', [CartController::class, 'index']);
    Route::get('/mini', [CartController::class, 'miniCart']);
    Route::post('', [CartController::class, 'store']);
    Route::put('/{itemId}', [CartController::class, 'update']);
    Route::delete('/{itemId}', [CartController::class, 'destroy']);
    Route::delete('', [CartController::class, 'clear']);
});
