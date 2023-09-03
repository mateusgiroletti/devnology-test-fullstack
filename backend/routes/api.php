<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/session', [SessionController::class, 'store']);
Route::post('/user', [UserController::class, 'store']);
Route::post('/order', [OrderController::class, 'store'])->middleware('auth:sanctum');
