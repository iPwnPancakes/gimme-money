<?php

use App\Http\Controllers\PaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('stripe')->middleware(['auth:sanctum'])->group(function () {
    Route::post('/checkout', [PaymentController::class, 'checkout'])
        ->middleware('auth:sanctum')
        ->name('checkout');
});
