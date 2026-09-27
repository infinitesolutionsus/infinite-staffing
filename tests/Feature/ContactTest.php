<?php

use App\Enums\InquiryType;
use App\Mail\InquiryReceived;
use App\Models\Inquiry;
use Illuminate\Support\Facades\Exceptions;
use Illuminate\Support\Facades\Mail;
use Inertia\Testing\AssertableInertia as Assert;

test('the contact page preselects the topic from the query string', function () {
    $this->get(route('contact', ['topic' => 'ct-program']))
        ->assertInertia(fn (Assert $page) => $page->where('selectedTopic', 'ct-program'));
});

test('the contact page falls back to the general topic for an unknown topic', function () {
    $this->get(route('contact', ['topic' => 'unknown']))
        ->assertInertia(fn (Assert $page) => $page->where('selectedTopic', 'general'));
});

test('a contact inquiry is stored and emailed to the team', function () {
    Mail::fake();

    $this->post(route('contact.store'), [
        'name' => 'Jordan Rivera',
        'email' => 'jordan@example.com',
        'phone' => '(555) 555-0100',
        'topic' => 'consulting',
        'message' => 'We would like to improve our CT workflow.',
    ])->assertRedirect(route('contact'));

    $inquiry = Inquiry::sole();

    expect($inquiry->type)->toBe(InquiryType::Contact)
        ->and($inquiry->name)->toBe('Jordan Rivera')
        ->and($inquiry->details)->toBe(['Topic' => 'Consulting Services']);

    Mail::assertSent(InquiryReceived::class, fn (InquiryReceived $mail) => $mail->inquiry->is($inquiry)
        && $mail->hasTo('info@infinitestaffingsolutions.com')
        && $mail->hasReplyTo('jordan@example.com'));
});

test('a contact inquiry is kept when the notification email fails', function () {
    Exceptions::fake();
    Mail::shouldReceive('to')->andThrow(new RuntimeException('Mail server unavailable'));

    $this->post(route('contact.store'), [
        'name' => 'Jordan Rivera',
        'email' => 'jordan@example.com',
        'topic' => 'general',
        'message' => 'Hello!',
    ])->assertRedirect(route('contact'));

    expect(Inquiry::count())->toBe(1);
    Exceptions::assertReported(RuntimeException::class);
});

test('a contact inquiry requires a name, email, topic and message', function () {
    Mail::fake();

    $this->post(route('contact.store'), [])
        ->assertSessionHasErrors(['name', 'email', 'topic', 'message']);

    expect(Inquiry::count())->toBe(0);
    Mail::assertNothingSent();
});

test('a contact inquiry rejects an unknown topic', function () {
    $this->post(route('contact.store'), [
        'name' => 'Jordan Rivera',
        'email' => 'jordan@example.com',
        'topic' => 'billing',
        'message' => 'Hello!',
    ])->assertSessionHasErrors(['topic' => 'The selected topic is invalid.']);
});
