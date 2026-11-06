<?php

/**
 * Laravel Head always writes canonical URLs as https, whatever APP_URL is.
 */
function canonicalUrl(string $path): string
{
    return preg_replace('#^http://#', 'https://', rtrim(url('/'), '/')).$path;
}

test('pages render their own title, description and canonical url on the server', function (string $url, string $title, string $description) {
    $this->get($url)
        ->assertOk()
        ->assertSee("<title data-inertia=\"title\">{$title}</title>", escape: false)
        ->assertSee($description)
        ->assertSee('<link data-inertia="canonical" rel="canonical" href="'.canonicalUrl($url).'">', escape: false);
})->with([
    ['/', 'Infinite Staffing Solutions | Radiology Staffing, CT Certification &amp; Consulting', 'connects Los Angeles hospitals and imaging centers'],
    ['/about', 'About Us | Infinite Staffing Solutions', 'Los Angeles radiology partner'],
    ['/staffing-services', 'Radiology Staffing | Infinite Staffing Solutions', 'Radiology staffing across every modality'],
    ['/contact', 'Contact Us | Infinite Staffing Solutions', 'Contact Infinite Staffing Solutions about'],
]);

test('pages include social sharing tags, icons and organization data', function () {
    $this->get('/')
        ->assertSee('property="og:image" content="'.asset('images/og-image.jpg').'"', escape: false)
        ->assertSee('name="twitter:card" content="summary_large_image"', escape: false)
        ->assertSee('<link rel="icon" href="/favicon.ico"', escape: false)
        ->assertSee('<link rel="apple-touch-icon" href="/apple-touch-icon.png"', escape: false)
        ->assertSee('application/ld+json', escape: false)
        ->assertSee('"@type":"Organization"', escape: false);
});

test('error pages are hidden from search engines', function () {
    $this->get('/this-page-does-not-exist')
        ->assertNotFound()
        ->assertSee('<title data-inertia="title">Page not found | Infinite Staffing Solutions</title>', escape: false)
        ->assertSee('name="robots" content="noindex, follow"', escape: false);
});
