<?php

use App\Enums\InquiryType;
use App\Mail\InquiryReceived;
use App\Models\Inquiry;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

/**
 * @return array<string, mixed>
 */
function validTechnologistApplication(array $overrides = []): array
{
    return [
        'first_name' => 'Sam',
        'last_name' => 'Lee',
        'email' => 'sam@example.com',
        'phone' => '(555) 555-0102',
        'modalities' => ['x-ray', 'ct'],
        'credentials' => 'ARRT (R)(CT)',
        'years_experience' => 6,
        'availability' => 'Per diem',
        'preferred_contact' => 'Text',
        'resume' => UploadedFile::fake()->create('resume.pdf', 200, 'application/pdf'),
        ...$overrides,
    ];
}

test('the application form only offers clinical modalities', function () {
    $this->get(route('technologist-application.create'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('modalities', fn ($modalities) => collect($modalities)->pluck('value')->doesntContain('rso')));
});

test('a technologist application stores the resume and emails it to the team', function () {
    Mail::fake();
    Storage::fake();

    $this->post(route('technologist-application.store'), validTechnologistApplication())
        ->assertRedirect(route('technologist-application.create'));

    $inquiry = Inquiry::sole();

    expect($inquiry->type)->toBe(InquiryType::TechnologistApplication)
        ->and($inquiry->name)->toBe('Sam Lee')
        ->and($inquiry->details['Modalities'])->toBe('General X-Ray (Fluoroscopy, C-Arm), Computed Tomography (CT)');

    Storage::assertExists($inquiry->attachment_path);

    Mail::assertSent(InquiryReceived::class, fn (InquiryReceived $mail) => $mail->inquiry->is($inquiry)
        && count($mail->attachments()) === 1);
});

test('a technologist application requires a resume', function () {
    $this->post(route('technologist-application.store'), validTechnologistApplication(['resume' => null]))
        ->assertSessionHasErrors('resume');
});

test('a technologist application rejects a resume that is not a pdf or word document', function () {
    $this->post(route('technologist-application.store'), validTechnologistApplication([
        'resume' => UploadedFile::fake()->create('resume.exe', 10),
    ]))->assertSessionHasErrors(['resume' => 'Your resume must be a PDF or Word document.']);
});

test('a technologist application rejects a facility support service as a modality', function () {
    $this->post(route('technologist-application.store'), validTechnologistApplication(['modalities' => ['rso']]))
        ->assertSessionHasErrors('modalities.0');
});
