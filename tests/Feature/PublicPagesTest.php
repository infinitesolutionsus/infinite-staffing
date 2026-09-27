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
    ['staff-request.create', 'site/request-staff'],
    ['technologist-application.create', 'site/technologist-application'],
]);

test('legacy website urls permanently redirect to their new pages', function (string $legacyUrl, string $newUrl) {
    $this->get($legacyUrl)->assertStatus(301)->assertRedirect($newUrl);
})->with([
    ['/apply', '/request-staff'],
    ['/application', '/join-our-team'],
    ['/our-courses', '/ct-program'],
    ['/shops', '/ct-program'],
    ['/courses/complete-ct-program', '/ct-program/curriculum'],
]);
