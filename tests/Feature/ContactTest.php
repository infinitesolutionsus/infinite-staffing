<?php

use App\Enums\InquiryType;
use App\Mail\InquiryConfirmation;
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

test('live validation checks a single field without saving anything', function () {
    Mail::fake();

    $this->withHeaders(['Precognition' => 'true', 'Precognition-Validate-Only' => 'email'])
        ->postJson(route('contact.store'), ['email' => 'not-an-email'])
        ->assertStatus(422)
        ->assertJsonValidationErrors(['email'])
        ->assertJsonMissingValidationErrors(['name', 'message']);

    $this->withHeaders(['Precognition' => 'true', 'Precognition-Validate-Only' => 'email'])
        ->post(route('contact.store'), ['email' => 'jordan@example.com'])
        ->assertNoContent();

    expect(Inquiry::count())->toBe(0);
    Mail::assertNothingSent();
});

test('live validation checks do not use up the submission rate limit', function () {
    Mail::fake();

    foreach (range(1, 10) as $attempt) {
        $this->withHeaders(['Precognition' => 'true', 'Precognition-Validate-Only' => 'name'])
            ->post(route('contact.store'), ['name' => 'Jordan'])
            ->assertNoContent();
    }

    $this->flushHeaders()->post(route('contact.store'), [
        'name' => 'Jordan Rivera',
        'email' => 'jordan@example.com',
        'topic' => 'general',
        'message' => 'Hello!',
    ])->assertRedirect(route('contact'));
});

test('the visitor receives a confirmation email with a copy of their message', function () {
    Mail::fake();

    $this->post(route('contact.store'), [
        'name' => 'Jordan Rivera',
        'email' => 'jordan@example.com',
        'topic' => 'staffing',
        'message' => 'We need two CT techs next month.',
    ])->assertRedirect(route('contact'));

    Mail::assertSent(InquiryConfirmation::class, function (InquiryConfirmation $mail) {
        $mail->assertSeeInHtml('We need two CT techs next month.')
            ->assertSeeInHtml('Radiology Staffing');

        return $mail->hasTo('jordan@example.com')
            && $mail->hasReplyTo('info@infinitestaffingsolutions.com')
            && $mail->hasSubject('We received your message');
    });

    Mail::assertSentCount(2);
});

test('the team email includes every detail from the form', function () {
    $inquiry = Inquiry::factory()->create([
        'name' => 'Jordan Rivera',
        'email' => 'jordan@example.com',
        'phone' => '(555) 555-0100',
        'message' => 'We need two CT techs next month.',
        'details' => ['Topic' => 'Radiology Staffing'],
    ]);

    (new InquiryReceived($inquiry))
        ->assertSeeInHtml('Jordan Rivera')
        ->assertSeeInHtml('jordan@example.com')
        ->assertSeeInHtml('(555) 555-0100')
        ->assertSeeInHtml('Radiology Staffing')
        ->assertSeeInHtml('We need two CT techs next month.');
});
