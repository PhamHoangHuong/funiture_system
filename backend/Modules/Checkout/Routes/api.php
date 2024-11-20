<?php

use Illuminate\Http\Request;
use Modules\Checkout\Http\Controllers\CheckoutController;

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

// Route::middleware('auth:api')->get('/checkout', function (Request $request) {
//     return $request->user();
// });
Route::get('test-ghtk',[CheckoutController::class , 'index']);

Route::get('test-vnpay',[CheckoutController::class , 'vnpay']);
Route::get('test-momo',[CheckoutController::class , 'momo']);

Route::get('checkout',[CheckoutController::class , 'checkout']);


