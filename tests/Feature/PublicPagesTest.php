<?php

use Inertia\Testing\AssertableInertia as Assert;

test('public pages render their page components', function (string $routeName, string $component) {
    $this->get(route($routeName))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component($component));
})->with([
    ['home', 'site/home'],
    ['about', 'site/about'],
    ['staffing', 'site/staffing'],
    ['ct-program', 'site/ct-program'],
    ['ct-program.curriculum', 'site/ct-curriculum'],
    ['newsletter', 'site/newsletter'],
    ['newsletters.ct-connection-july-2026', 'site/newsletters/ct-connection-july-2026'],
    ['consulting', 'site/consulting'],
    ['advocacy', 'site/advocacy'],
    ['contact', 'site/contact'],
]);

test('legacy website urls permanently redirect to their new pages', function (string $legacyUrl, string $newUrl) {
    $this->get($legacyUrl)->assertStatus(301)->assertRedirect($newUrl);
})->with([
    ['/request-staff', '/contact?topic=staffing'],
    ['/apply', '/contact?topic=staffing'],
    ['/join-our-team', '/contact'],
    ['/application', '/contact'],
    ['/our-courses', '/ct-program'],
    ['/shops', '/ct-program'],
    ['/courses/complete-ct-program', '/ct-program/curriculum'],
]);

test('account pages are not available', function (string $url) {
    $this->get($url)->assertNotFound();
})->with(['/login', '/register', '/dashboard', '/settings/profile', '/forgot-password']);

test('pages share the configured infinite learning url for enroll links', function () {
    config(['services.infinite_learning.url' => 'https://learning.example.com']);

    $this->get(route('ct-program'))
        ->assertInertia(fn (Assert $page) => $page->where('infiniteLearningUrl', 'https://learning.example.com'));
});
