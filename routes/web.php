<?php

use Laravel\Fortify\RoutePath;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use Laravel\Fortify\Http\Controllers\TwoFactorAuthenticatedSessionController;

$twoFactorLimiter = config('fortify.limiters.two-factor');

Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/login', 'index')->name('login');
    Route::get('/register', 'index')->name('register');
    Route::get('/reset-password', 'index')->name('password.reset');
    Route::get('/email/verifyemail', 'index')->name('verification.notice');
    Route::get('/twofactor', 'index')->name('twofactor.index');
});

Route::post(RoutePath::for('two-factor.challenge', '/two-factor-challenge'), [TwoFactorAuthenticatedSessionController::class, 'store'])
    ->middleware(array_filter([
        'guest:' . config('fortify.guard'),
        $twoFactorLimiter ? 'throttle:' . $twoFactorLimiter : null,
    ]))->name('two-factor.challenge');
