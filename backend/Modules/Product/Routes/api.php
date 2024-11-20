<?php

use Illuminate\Support\Facades\Route;
use Modules\Product\Http\Controllers\ProductController;
use Modules\Product\Http\Controllers\ProductAttributeController;


Route::apiResource('products', ProductController::class);
Route::get('/search', [ProductController::class, 'searchProduct']);

Route::put('products/{id}/change-status', [ProductController::class, 'changeStatus']);

// ProductAttribute\
Route::apiResource('product-attributes', ProductAttributeController::class);

Route::post('products/variant-prices', [ProductController::class, 'getVariantPrices']);
Route::post('products/{productId}/variants', [ProductController::class, 'addVariant']);
Route::delete('products/variants/{variantId}', [ProductController::class, 'deleteVariant']);
