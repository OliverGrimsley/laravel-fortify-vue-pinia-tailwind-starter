<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/login', 'index')->name('login');
    Route::get('/register', 'index')->name('register');
    Route::get('/reset-password', 'index')->name('password.reset');
    Route::get('/email/verifyemail', 'index')->name('verification.notice');
    Route::get('/twofactor', 'index')->name('twofactor.index');
});

