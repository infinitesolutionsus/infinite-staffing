<?php

use App\Enums\InquiryType;
use App\Mail\InquiryReceived;
use App\Models\Inquiry;
use Illuminate\Support\Facades\Mail;

/**
 * @return array<string, mixed>
 */
function validStaffRequest(array $overrides = []): array
{
    return [
        'first_name' => 'Alex',
        'last_name' => 'Morgan',
        'facility' => 'Westside Imaging',
        'email' => 'alex@example.com',
        'phone' => '(555) 555-0101',
        'modalities' => ['ct', 'mri'],
        'coverage_type' => 'Per diem',
        'start_date' => '2026-10-15',
        'preferred_contact' => 'Email',
        'message' => 'Two weekend shifts per week.',
        ...$overrides,
    ];
}

test('a staff request is stored with readable details and emailed to the team', function () {
    Mail::fake();
    $this->travelTo('2026-10-01');

    $this->post(route('staff-request.store'), validStaffRequest())
        ->assertRedirect(route('staff-request.create'));

    $inquiry = Inquiry::sole();

    expect($inquiry->type)->toBe(InquiryType::StaffRequest)
        ->and($inquiry->name)->toBe('Alex Morgan')
        ->and($inquiry->details)->toBe([
            'Facility' => 'Westside Imaging',
            'Modalities' => 'Computed Tomography (CT), Magnetic Resonance Imaging (MRI)',
            'Coverage' => 'Per diem',
            'Start date' => 'Oct 15, 2026',
            'Preferred contact' => 'Email',
        ]);

    Mail::assertSent(InquiryReceived::class, fn (InquiryReceived $mail) => $mail->inquiry->is($inquiry));
});

test('a staff request rejects a start date in the past', function () {
    $this->travelTo('2026-10-01');

    $this->post(route('staff-request.store'), validStaffRequest(['start_date' => '2026-09-30']))
        ->assertSessionHasErrors(['start_date' => 'The start date cannot be in the past.']);
});

test('a staff request requires at least one modality', function () {
    $this->post(route('staff-request.store'), validStaffRequest(['modalities' => []]))
        ->assertSessionHasErrors(['modalities' => 'Select at least one modality or service.']);
});

test('a staff request rejects an unknown modality', function () {
    $this->post(route('staff-request.store'), validStaffRequest(['modalities' => ['dental']]))
        ->assertSessionHasErrors('modalities.0');
});
