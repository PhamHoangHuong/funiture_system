<?php

use Illuminate\Support\Facades\Route;
use Modules\AdvancedPrice\Http\Controllers\AdvancedPriceController;

Route::apiResource('advanced-prices', AdvancedPriceController::class);
