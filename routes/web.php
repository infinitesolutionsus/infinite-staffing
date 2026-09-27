<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\StaffRequestController;
use App\Http\Controllers\TechnologistApplicationController;
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
Route::post('contact', [ContactController::class, 'store'])->middleware('throttle:6,1')->name('contact.store');

Route::get('request-staff', [StaffRequestController::class, 'create'])->name('staff-request.create');
Route::post('request-staff', [StaffRequestController::class, 'store'])->middleware('throttle:6,1')->name('staff-request.store');

Route::get('join-our-team', [TechnologistApplicationController::class, 'create'])->name('technologist-application.create');
Route::post('join-our-team', [TechnologistApplicationController::class, 'store'])->middleware('throttle:6,1')->name('technologist-application.store');

Route::permanentRedirect('apply', 'request-staff');
Route::permanentRedirect('application', 'join-our-team');
Route::permanentRedirect('our-courses', 'ct-program');
Route::permanentRedirect('shops', 'ct-program');
Route::permanentRedirect('courses/{course}', '/ct-program/curriculum');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
