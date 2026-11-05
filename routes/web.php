<?php

use App\Http\Controllers\ContactController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'site/home')->name('home');
Route::inertia('about', 'site/about')->name('about');
Route::inertia('staffing-services', 'site/staffing')->name('staffing');
Route::inertia('ct-program', 'site/ct-program')->name('ct-program');
Route::inertia('ct-program/curriculum', 'site/ct-curriculum')->name('ct-program.curriculum');
Route::inertia('ct-program-newsletter', 'site/newsletter')->name('newsletter');
Route::inertia('newsletters/ct-connection-july-2026', 'site/newsletters/ct-connection-july-2026')->name('newsletters.ct-connection-july-2026');
Route::inertia('consulting-services', 'site/consulting')->name('consulting');
Route::inertia('advocacy-program', 'site/advocacy')->name('advocacy');

Route::get('contact', [ContactController::class, 'create'])->name('contact');
Route::post('contact', [ContactController::class, 'store'])
    ->middleware([HandlePrecognitiveRequests::class, 'throttle:contact'])
    ->name('contact.store');

// Removed pages now point to the contact form.
Route::permanentRedirect('request-staff', '/contact?topic=staffing');
Route::permanentRedirect('apply', '/contact?topic=staffing');
Route::permanentRedirect('join-our-team', '/contact');
Route::permanentRedirect('application', '/contact');
Route::permanentRedirect('register', '/contact?topic=ct-program');

Route::permanentRedirect('our-courses', 'ct-program');
Route::permanentRedirect('shops', 'ct-program');
Route::permanentRedirect('courses/{course}', '/ct-program/curriculum');
