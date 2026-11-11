<?php

use App\Http\Controllers\ContactController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'site/home')
    ->withHead(title: ['value' => 'Infinite Staffing Solutions | Radiology Staffing, CT Certification & Consulting', 'exact' => true])
    ->name('home');
Route::inertia('about', 'site/about')
    ->withHead(title: 'About Us', description: 'Infinite Solutions is a Los Angeles radiology partner providing technologist staffing, CT certification, imaging consulting and patient advocacy.')
    ->name('about');
Route::inertia('staffing-services', 'site/staffing')
    ->withHead(title: 'Radiology Staffing', description: 'Radiology staffing across every modality for Los Angeles hospitals and imaging centers — X-ray, CT, MRI, nuclear medicine, PET, ultrasound, mammography and more.')
    ->name('staffing');
Route::inertia('ct-program', 'site/ct-program')
    ->withHead(title: 'CT Certification Program', description: 'Earn your ARRT (CT) certification while you work. Online board review, weekly live sessions, and guaranteed clinical placement in Southern California.')
    ->name('ct-program');
Route::inertia('ct-program/curriculum', 'site/ct-curriculum')
    ->withHead(title: 'CT Program Curriculum', description: 'Complete Computed Tomography Review Program curriculum — learning outcomes, eight study modules, assessment and ARRT requirements.')
    ->name('ct-program.curriculum');
Route::inertia('ct-program-newsletter', 'site/newsletter')
    ->withHead(title: 'CT Program Newsletter', description: 'The CT Connection — the monthly newsletter of the Infinite Learning Solutions CT Program.')
    ->name('newsletter');
Route::inertia('newsletters/ct-connection-july-2026', 'site/newsletters/ct-connection-july-2026')
    ->withHead(title: 'The CT Connection — July 2026', description: 'The July 2026 edition of The CT Connection, the Infinite Solutions CT Certification Program newsletter.', og: ['type' => 'article'])
    ->name('newsletters.ct-connection-july-2026');
Route::inertia('consulting-services', 'site/consulting')
    ->withHead(title: 'Consulting Services', description: 'Strategic radiology consulting for imaging centers, hospitals and healthcare organizations — operations, protocols, workflow and best practices.')
    ->name('consulting');
Route::inertia('advocacy-program', 'site/advocacy')
    ->withHead(title: 'Healthcare Advocacy Program', description: 'Infinite Patient Solutions helps patients and families navigate the healthcare system — appointments, insurance, provider communication and care navigation.')
    ->name('advocacy');

Route::get('contact', [ContactController::class, 'create'])
    ->withHead(title: 'Contact Us', description: 'Contact Infinite Staffing Solutions about radiology staffing, the CT certification program, consulting or healthcare advocacy.')
    ->name('contact');
Route::post('contact', [ContactController::class, 'store'])
    ->middleware([HandlePrecognitiveRequests::class, 'throttle:contact'])
    ->name('contact.store');

// Removed pages now point to the contact form.
Route::permanentRedirect('request-staff', '/contact?topic=staffing');
Route::permanentRedirect('apply', '/contact?topic=staffing');
Route::permanentRedirect('join-our-team', '/contact');
Route::permanentRedirect('application', '/contact');

Route::permanentRedirect('our-courses', 'ct-program');
Route::permanentRedirect('shops', 'ct-program');
Route::permanentRedirect('courses/{course}', '/ct-program/curriculum');
