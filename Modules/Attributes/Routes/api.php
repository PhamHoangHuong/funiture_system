<?php

use Illuminate\Support\Facades\Route;
use Modules\Attributes\Http\Controllers\AttributesController;
use Modules\Attributes\Http\Controllers\AttributeValuesController;

Route::apiResource('attributes', AttributesController::class);
Route::apiResource('attribute-values', AttributeValuesController::class);
