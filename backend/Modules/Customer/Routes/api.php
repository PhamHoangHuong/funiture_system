<?php

use Illuminate\Http\Request;
use Modules\Auth\Http\Controllers\AuthController;
use Modules\Customer\Http\Controllers\AuthCustomerController;
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

//Route for admin
Route::group(['prefix'=>'/customers'],function(){
    Route::get('', [CustomerController::class,'index']);
    Route::post('', [CustomerController::class,'store']);
    Route::put('/{id}', [CustomerController::class,'update']);
    Route::put('/{id}/active', [CustomerController::class,'switchStatus']);
    Route::delete('/{id}', [CustomerController::class,'destroy']);
});

//Route for customer auth
Route::group([
    'middleware' => 'jwt',
], function ($router) {
    Route::get('profile', [AuthCustomerController::class,'profile']);
    Route::post('logout', [AuthCustomerController::class,'logout']);
});
Route::post('login', [AuthCustomerController::class,'login']);
Route::post('refresh', [AuthCustomerController::class,'refresh']);
Route::post('register', [AuthCustomerController::class,'register']);
