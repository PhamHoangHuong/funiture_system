<?php

use Illuminate\Http\Request;
use Modules\Slider\Http\Controllers\SliderController;
use Modules\Slider\Http\Controllers\SliderImageController;

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

//Route::middleware('auth:api')->get('/slider', function (Request $request) {
//    return $request->user();
//});

Route::apiResource('sliders', SliderController::class);
Route::apiResource('slider-images', SliderImageController::class);