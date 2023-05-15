<?php

use App\Models\User;
use Laravel\Fortify\Features;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;

beforeEach(function () {
    clearDB(['users']);
});

test('a person can register', function () {
    $pw = fake()->password(10, 20);
    $resp = test()->postJson('/register', [
        'name' => fake()->name,
        'email' => fake()->email,
        'password' => $pw,
        'password_confirmation' => $pw,
        'regkey' => '12341234'
    ]);
    $resp->assertStatus(201);
});

test('a user can enable two factor authentication', function () {
    TwoFactorEnabled();
    test()->actingAs($user = User::factory()->create());
    test()->withSession(['auth.password_confirmed_at' => time()]);
    test()->post('/user/two-factor-authentication');
    expect($user->fresh()->two_factor_secret)->not->toBeNull();
    test()->assertCount(8, $user->fresh()->recoveryCodes());
});

test('two factor recovery codes can be gerenated', function () {
    TwoFactorEnabled();
    test()->actingAs($user = User::factory()->create());
    test()->withSession(['auth.password_confirmed_at' => time()]);
    test()->post('/user/two-factor-authentication');
    test()->post('/user/two-factor-recovery-codes');
    test()->assertCount(8, $user->recoveryCodes());
});

test('user can change their password', function () {
    test()->actingAs($user = User::factory()->create(
        [
            'password' => bcrypt('password')
        ]
    ));
    $newPW = fake()->password(10, 20);
    test()->putJson('/user/password', [
        'current_password' => 'password',
        'password' => $newPW,
        'password_confirmation' => $newPW
    ]);
    test()->assertTrue(Hash::check($newPW, $user->fresh()->password));
});

test('a user can reset their password', function () {
    if (!Features::enabled(Features::resetPasswords())) {
        test()->markTestSkipped('Password updates are not enabled.');

        return;
    }

    Notification::fake();

    $user = User::factory()->create();

    $resp = test()->post('/forgot-password', [
        'email' => $user->email,
    ]);

    $resp->assertStatus(302);
    Notification::assertSentTo($user, ResetPassword::class);
});
