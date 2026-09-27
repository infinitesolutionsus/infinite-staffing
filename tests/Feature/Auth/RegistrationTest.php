<?php

use App\Enums\ProgramPackage;
use App\Models\StudentProfile;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::registration());
});

/**
 * @return array<string, mixed>
 */
function validRegistration(array $overrides = []): array
{
    return [
        'first_name' => 'Taylor',
        'last_name' => 'Nguyen',
        'email' => 'taylor@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'accepts_terms' => '1',
        'legal_name' => 'Taylor A. Nguyen',
        'date_of_birth' => '1994-03-12',
        'ssn_last_four' => '4321',
        'phone' => '(555) 555-0103',
        'home_address' => '123 Main St, Los Angeles, CA 90001',
        'emergency_contact' => 'Jamie Nguyen (555) 555-0104',
        'certification_body' => 'ARRT',
        'certification' => UploadedFile::fake()->create('arrt.pdf', 100, 'application/pdf'),
        'resume' => UploadedFile::fake()->create('resume.pdf', 100, 'application/pdf'),
        'cpr_certification' => UploadedFile::fake()->create('cpr.pdf', 100, 'application/pdf'),
        'cpr_expires_on' => '2027-06-01',
        'has_iv_certification' => '0',
        'prior_ct_attempts' => 'No',
        'program_package' => 'complete',
        'preferred_start_date' => '2026-11-01',
        'weekly_availability' => ['Evenings', 'Weekends'],
        'weekly_work_hours' => '33+',
        'has_reliable_transportation' => '1',
        'has_caregiver_responsibilities' => '0',
        'has_computer_access' => '1',
        'needs_accommodations' => '0',
        'accepts_payment_terms' => '1',
        'payment_plan' => 'Full payment',
        'acknowledges_clinical_placement' => '1',
        'agrees_to_board_review' => '1',
        'acknowledges_health_requirements' => '1',
        'comfortable_with_iv_starts' => '1',
        'has_contrast_allergy' => '0',
        'agrees_to_conduct_standards' => '1',
        'medical_conditions' => 'None',
        'success_support' => 'Regular check-ins would help.',
        'accepts_terms_and_conditions' => '1',
        'consents_to_early_intervention' => '1',
        'signature_name' => 'Taylor Nguyen',
        ...$overrides,
    ];
}

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('registration screen preselects the package from the query string', function () {
    $this->get(route('register', ['package' => 'clinical-site']))
        ->assertInertia(fn (Assert $page) => $page->where('selectedPackage', 'clinical-site'));
});

test('new students can register and their enrollment details are saved', function () {
    Storage::fake();
    $this->travelTo('2026-10-01');

    $response = $this->post(route('register.store'), validRegistration());

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));

    $user = User::sole();
    $profile = $user->studentProfile;

    expect($user->name)->toBe('Taylor Nguyen')
        ->and($profile)->toBeInstanceOf(StudentProfile::class)
        ->and($profile->program_package)->toBe(ProgramPackage::CompleteProgram)
        ->and($profile->weekly_availability)->toBe(['Evenings', 'Weekends'])
        ->and($profile->ssn_last_four)->toBe('4321')
        ->and($profile->iv_certification_path)->toBeNull();

    Storage::assertExists([$profile->certification_path, $profile->resume_path, $profile->cpr_certification_path]);
});

test('sensitive student details are encrypted at rest', function () {
    Storage::fake();
    $this->travelTo('2026-10-01');

    $this->post(route('register.store'), validRegistration());

    $row = DB::table('student_profiles')->sole();

    expect($row->ssn_last_four)->not->toContain('4321')
        ->and($row->date_of_birth)->not->toContain('1994')
        ->and($row->home_address)->not->toContain('Main St')
        ->and($row->medical_conditions)->not->toBe('None');
});

test('an iv certification upload is required when the student has one', function () {
    Storage::fake();
    $this->travelTo('2026-10-01');

    $this->post(route('register.store'), validRegistration(['has_iv_certification' => '1']))
        ->assertSessionHasErrors(['iv_certification' => 'Upload a copy of your IV certification.']);

    $this->assertGuest();
});

test('previous ct exam attempts must be described', function () {
    Storage::fake();
    $this->travelTo('2026-10-01');

    $this->post(route('register.store'), validRegistration(['prior_ct_attempts' => 'Yes – once']))
        ->assertSessionHasErrors(['prior_ct_attempt_details' => 'Provide the date(s) and outcome of your previous attempts.']);
});

test('registration requires every agreement to be accepted', function () {
    Storage::fake();
    $this->travelTo('2026-10-01');

    $this->post(route('register.store'), validRegistration([
        'accepts_terms' => null,
        'accepts_payment_terms' => null,
        'acknowledges_clinical_placement' => null,
        'agrees_to_board_review' => null,
        'acknowledges_health_requirements' => null,
        'agrees_to_conduct_standards' => null,
        'accepts_terms_and_conditions' => null,
        'consents_to_early_intervention' => null,
    ]))->assertSessionHasErrors([
        'accepts_terms', 'accepts_payment_terms', 'acknowledges_clinical_placement', 'agrees_to_board_review',
        'acknowledges_health_requirements', 'agrees_to_conduct_standards', 'accepts_terms_and_conditions',
        'consents_to_early_intervention',
    ]);

    $this->assertGuest();
});

test('registration rejects an expired cpr certification', function () {
    Storage::fake();
    $this->travelTo('2026-10-01');

    $this->post(route('register.store'), validRegistration(['cpr_expires_on' => '2026-09-30']))
        ->assertSessionHasErrors(['cpr_expires_on' => 'Your CPR/BLS certification must not be expired.']);
});

test('registration requires the last four digits of the ssn', function () {
    Storage::fake();
    $this->travelTo('2026-10-01');

    $this->post(route('register.store'), validRegistration(['ssn_last_four' => '123-45-6789']))
        ->assertSessionHasErrors(['ssn_last_four' => 'Enter the last 4 digits of your SSN.']);
});
