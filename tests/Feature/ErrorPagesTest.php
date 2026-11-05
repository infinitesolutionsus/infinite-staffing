<?php

use Illuminate\Session\TokenMismatchException;
use Illuminate\Support\Facades\Route;
use Inertia\Testing\AssertableInertia as Assert;

test('missing pages render the branded 404 page', function () {
    $this->get('/this-page-does-not-exist')
        ->assertNotFound()
        ->assertInertia(fn (Assert $page) => $page
            ->component('site/error')
            ->where('status', 404));
});

test('server errors render the branded 500 page when debug is off', function () {
    config(['app.debug' => false]);

    Route::get('/test-server-error', fn () => throw new RuntimeException('Boom'))->middleware('web');

    $this->get('/test-server-error')
        ->assertStatus(500)
        ->assertInertia(fn (Assert $page) => $page
            ->component('site/error')
            ->where('status', 500));
});

test('server errors show the debug screen when debug is on', function () {
    config(['app.debug' => true]);

    Route::get('/test-server-error', fn () => throw new RuntimeException('Boom'))->middleware('web');

    $this->get('/test-server-error')
        ->assertStatus(500)
        ->assertSee('RuntimeException');
});

test('expired sessions redirect back instead of showing an error', function () {
    Route::post('/test-expired', fn () => throw new TokenMismatchException)->middleware('web');

    $this->from('/contact')
        ->post('/test-expired')
        ->assertRedirect('/contact');
});

test('json requests keep json error responses', function () {
    $this->getJson('/this-page-does-not-exist')
        ->assertNotFound()
        ->assertJsonStructure(['message']);
});
