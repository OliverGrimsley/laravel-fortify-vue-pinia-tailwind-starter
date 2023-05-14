<?php

use Illuminate\Http\Response;

test('returns 200 from a home request', function () {
    $response = test()->get('/');
    $response->assertStatus(Response::HTTP_OK);
});
