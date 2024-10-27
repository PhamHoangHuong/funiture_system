<?php

use Illuminate\Support\Facades\Route;
use Modules\Source\Http\Controllers\SourceController;
use Modules\Source\Http\Controllers\SourceProductController;

Route::apiResource('sources', SourceController::class);
Route::apiResource('source-products', SourceProductController::class);
