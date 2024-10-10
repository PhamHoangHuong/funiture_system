<?php

use Illuminate\Http\Request;
use Modules\GroupCustomer\Http\Controllers\GroupCustomerController;
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
//Route::middleware('auth:api')->get('/groupcustomer', function (Request $request) {
//    return $request->user();
//});

Route::apiResource('group-customer', GroupCustomerController::class);
