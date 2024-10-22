<?php

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

Route::group(
    [
        'middleware' => 'jwt',
    ],
    function ($router) {
        Route::get('profile', [AuthCustomerController::class, 'profile']);
        Route::post('logout', [AuthCustomerController::class, 'logout']);
    },
);
Route::post('login', [AuthCustomerController::class, 'login']);
Route::post('refresh', [AuthCustomerController::class, 'refresh']);
Route::post('register', [AuthCustomerController::class, 'register']);

Route::post('/forgot-password', [AuthCustomerController::class, 'handleForgotPass']);

Route::post('/reset-password', [AuthCustomerController::class, 'handleResetPass'])->name('');

Route::get('/reset-password/{token}', function (string $token) {
    return 111;
})->middleware('guest')->name('password.reset');

