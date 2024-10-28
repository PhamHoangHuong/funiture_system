<?php

use Illuminate\Http\Request;
use Modules\Auth\Http\Controllers\AuthController;
use Modules\Customer\Http\Controllers\AuthCustomerController;

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
], function ($router) {
    Route::get('profile', [AuthCustomerController::class,'profile']);
    Route::post('logout', [AuthCustomerController::class,'logout']);
});
Route::post('login', [AuthCustomerController::class,'login']);
Route::post('refresh', [AuthCustomerController::class,'refresh']);
Route::post('register', [AuthCustomerController::class,'register']);
