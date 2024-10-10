<?php

use Illuminate\Support\Facades\Route;
use Modules\Source\Http\Controllers\SourceController;
use Modules\Source\Http\Controllers\SourceProductController;

Route::apiResource('source', SourceController::class);
Route::apiResource('source-product', SourceProductController::class);
