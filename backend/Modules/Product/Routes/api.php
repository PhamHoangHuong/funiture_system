<?php

use Illuminate\Support\Facades\Route;
use Modules\Product\Http\Controllers\ProductController;
use Modules\Product\Http\Controllers\ProductAttributeController;

Route::apiResource('products', ProductController::class);
Route::put('products/{id}/change-status', [ProductController::class, 'changeStatus']);

// ProductAttribute\
Route::apiResource('product-attributes', ProductAttributeController::class);
