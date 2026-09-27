<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Enums\ProgramPackage;
use App\Models\StudentProfile;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use RuntimeException;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * The validation rules shared by every uploaded student document.
     *
     * @var array<int, string>
     */
    private const array DOCUMENT_RULES = ['file', 'mimes:pdf,jpg,jpeg,png,doc,docx', 'max:10240'];

    /**
     * Validate and create a newly registered CT program student.
     *
     * @param  array<string, mixed>  $input
     */
    public function create(array $input): User
    {
        $validated = Validator::make($input, $this->rules(), $this->messages())->validate();

        return DB::transaction(function () use ($validated): User {
            $user = User::create([
                'name' => "{$validated['first_name']} {$validated['last_name']}",
                'email' => $validated['email'],
                'password' => $validated['password'],
            ]);

            $storeDocument = function (?UploadedFile $file) use ($user): ?string {
                if ($file === null) {
                    return null;
                }

                return $file->store("student-documents/{$user->id}")
                    ?: throw new RuntimeException('Unable to store the uploaded student document.');
            };

            $user->studentProfile()->create([
                'legal_name' => $validated['legal_name'],
                'date_of_birth' => $validated['date_of_birth'],
                'ssn_last_four' => $validated['ssn_last_four'],
                'phone' => $validated['phone'],
                'home_address' => $validated['home_address'],
                'emergency_contact' => $validated['emergency_contact'],
                'certification_body' => $validated['certification_body'],
                'certification_path' => $storeDocument($validated['certification']),
                'resume_path' => $storeDocument($validated['resume']),
                'cpr_certification_path' => $storeDocument($validated['cpr_certification']),
                'cpr_expires_on' => $validated['cpr_expires_on'],
                'has_iv_certification' => $validated['has_iv_certification'],
                'iv_certification_path' => $validated['has_iv_certification'] ? $storeDocument($validated['iv_certification']) : null,
                'prior_ct_attempts' => $validated['prior_ct_attempts'],
                'prior_ct_attempt_details' => $validated['prior_ct_attempts'] === 'No' ? null : $validated['prior_ct_attempt_details'],
                'program_package' => $validated['program_package'],
                'preferred_start_date' => $validated['preferred_start_date'],
                'employer' => $validated['employer'] ?? null,
                'weekly_availability' => $validated['weekly_availability'],
                'weekly_work_hours' => $validated['weekly_work_hours'],
                'has_reliable_transportation' => $validated['has_reliable_transportation'],
                'has_caregiver_responsibilities' => $validated['has_caregiver_responsibilities'],
                'caregiver_details' => $validated['has_caregiver_responsibilities'] ? $validated['caregiver_details'] : null,
                'has_computer_access' => $validated['has_computer_access'],
                'needs_accommodations' => $validated['needs_accommodations'],
                'accommodation_documentation_path' => $validated['needs_accommodations'] ? $storeDocument($validated['accommodation_documentation']) : null,
                'payment_plan' => $validated['payment_plan'],
                'comfortable_with_iv_starts' => $validated['comfortable_with_iv_starts'],
                'has_contrast_allergy' => $validated['has_contrast_allergy'],
                'medical_conditions' => $validated['medical_conditions'],
                'success_support' => $validated['success_support'],
                'signature_name' => $validated['signature_name'],
                'agreements_accepted_at' => now(),
            ]);

            return $user;
        });
    }

    /**
     * Get the validation rules for each step of the registration form.
     *
     * @return array<string, mixed>
     */
    private function rules(): array
    {
        return [
            // Account
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => $this->emailRules(),
            'password' => $this->passwordRules(),
            'accepts_terms' => ['accepted'],

            // Student information
            'legal_name' => ['required', 'string', 'max:255'],
            'date_of_birth' => ['required', 'date', 'before:today'],
            'ssn_last_four' => ['required', 'digits:4'],
            'phone' => ['required', 'string', 'max:30'],
            'home_address' => ['required', 'string', 'max:500'],
            'emergency_contact' => ['required', 'string', 'max:255'],

            // Credentials
            'certification_body' => ['required', Rule::in(StudentProfile::CERTIFICATION_BODIES)],
            'certification' => ['required', ...self::DOCUMENT_RULES],
            'resume' => ['required', ...self::DOCUMENT_RULES],
            'cpr_certification' => ['required', ...self::DOCUMENT_RULES],
            'cpr_expires_on' => ['required', 'date', 'after:today'],
            'has_iv_certification' => ['required', 'boolean'],
            'iv_certification' => ['exclude_unless:has_iv_certification,1', 'required', ...self::DOCUMENT_RULES],
            'prior_ct_attempts' => ['required', Rule::in(StudentProfile::PRIOR_CT_ATTEMPTS)],
            'prior_ct_attempt_details' => ['exclude_if:prior_ct_attempts,No', 'required', 'string', 'max:1000'],

            // Program enrollment
            'program_package' => ['required', Rule::enum(ProgramPackage::class)],
            'preferred_start_date' => ['required', 'date', 'after_or_equal:today'],
            'employer' => ['nullable', 'string', 'max:255'],
            'weekly_availability' => ['required', 'array', 'min:1'],
            'weekly_availability.*' => [Rule::in(StudentProfile::WEEKLY_AVAILABILITY)],
            'weekly_work_hours' => ['required', Rule::in(StudentProfile::WEEKLY_WORK_HOURS)],
            'has_reliable_transportation' => ['required', 'boolean'],
            'has_caregiver_responsibilities' => ['required', 'boolean'],
            'caregiver_details' => ['exclude_unless:has_caregiver_responsibilities,1', 'required', 'string', 'max:1000'],
            'has_computer_access' => ['required', 'boolean'],
            'needs_accommodations' => ['required', 'boolean'],
            'accommodation_documentation' => ['exclude_unless:needs_accommodations,1', 'required', ...self::DOCUMENT_RULES],

            // Agreements, health & safety
            'accepts_payment_terms' => ['accepted'],
            'payment_plan' => ['required', Rule::in(StudentProfile::PAYMENT_PLANS)],
            'acknowledges_clinical_placement' => ['accepted'],
            'agrees_to_board_review' => ['accepted'],
            'acknowledges_health_requirements' => ['accepted'],
            'comfortable_with_iv_starts' => ['required', 'boolean'],
            'has_contrast_allergy' => ['required', 'boolean'],
            'agrees_to_conduct_standards' => ['accepted'],

            // Signature & consent
            'signature_name' => ['required', 'string', 'max:255'],
            'accepts_terms_and_conditions' => ['accepted'],
            'consents_to_early_intervention' => ['accepted'],
            'medical_conditions' => ['required', 'string', 'max:2000'],
            'success_support' => ['required', 'string', 'max:2000'],
        ];
    }

    /**
     * Get custom validation messages for the registration form.
     *
     * @return array<string, string>
     */
    private function messages(): array
    {
        $documentMessages = collect(['certification', 'resume', 'cpr_certification', 'iv_certification', 'accommodation_documentation'])
            ->flatMap(fn (string $field): array => [
                "{$field}.mimes" => 'Upload a PDF, image or Word document.',
                "{$field}.max" => 'Documents may not be larger than 10 MB.',
            ])
            ->all();

        return [
            ...$documentMessages,
            'accepts_terms.accepted' => 'You must agree to the Terms of Service and Privacy Policy.',
            'ssn_last_four.digits' => 'Enter the last 4 digits of your SSN.',
            'cpr_expires_on.after' => 'Your CPR/BLS certification must not be expired.',
            'iv_certification.required' => 'Upload a copy of your IV certification.',
            'prior_ct_attempt_details.required' => 'Provide the date(s) and outcome of your previous attempts.',
            'caregiver_details.required' => 'Please explain how your responsibilities may affect your schedule.',
            'accommodation_documentation.required' => 'Documentation is required for accommodation requests.',
            'weekly_availability.required' => 'Select at least one availability option.',
            'accepts_payment_terms.accepted' => 'You must acknowledge the total cost of your program package.',
            'acknowledges_clinical_placement.accepted' => 'You must acknowledge the clinical placement requirements.',
            'agrees_to_board_review.accepted' => 'You must agree to attend weekly board review sessions.',
            'acknowledges_health_requirements.accepted' => 'You must acknowledge the health & safety requirements.',
            'agrees_to_conduct_standards.accepted' => 'You must agree to the professional conduct standards.',
            'accepts_terms_and_conditions.accepted' => 'You must agree to the terms and conditions.',
            'consents_to_early_intervention.accepted' => 'You must consent to early intervention alerts.',
        ];
    }
}
