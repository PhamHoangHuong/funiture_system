<?php

use Illuminate\Http\Request;
use Modules\Order\Http\Controllers\OrderController;


 Route::prefix('/order')
    ->controller(OrderController::class)
    ->middleware('api')
    ->group(function () {
        Route::get('/', 'checkout')->name('index');
});
