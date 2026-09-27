<?php

namespace Database\Factories;

use App\Enums\ProgramPackage;
use App\Models\StudentProfile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<StudentProfile>
 */
class StudentProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'legal_name' => fake()->name(),
            'date_of_birth' => fake()->date(max: '-21 years'),
            'ssn_last_four' => fake()->numerify('####'),
            'phone' => fake()->phoneNumber(),
            'home_address' => fake()->address(),
            'emergency_contact' => fake()->name().' '.fake()->phoneNumber(),
            'certification_body' => fake()->randomElement(StudentProfile::CERTIFICATION_BODIES),
            'certification_path' => 'student-documents/certification.pdf',
            'resume_path' => 'student-documents/resume.pdf',
            'cpr_certification_path' => 'student-documents/cpr.pdf',
            'cpr_expires_on' => now()->addYear(),
            'has_iv_certification' => false,
            'iv_certification_path' => null,
            'prior_ct_attempts' => StudentProfile::PRIOR_CT_ATTEMPTS[0],
            'prior_ct_attempt_details' => null,
            'program_package' => fake()->randomElement(ProgramPackage::cases()),
            'preferred_start_date' => now()->addMonth(),
            'employer' => fake()->optional()->company(),
            'weekly_availability' => fake()->randomElements(StudentProfile::WEEKLY_AVAILABILITY, 2),
            'weekly_work_hours' => fake()->randomElement(StudentProfile::WEEKLY_WORK_HOURS),
            'has_reliable_transportation' => true,
            'has_caregiver_responsibilities' => false,
            'caregiver_details' => null,
            'has_computer_access' => true,
            'needs_accommodations' => false,
            'accommodation_documentation_path' => null,
            'payment_plan' => fake()->randomElement(StudentProfile::PAYMENT_PLANS),
            'comfortable_with_iv_starts' => true,
            'has_contrast_allergy' => false,
            'medical_conditions' => 'None',
            'success_support' => fake()->sentence(),
            'signature_name' => fake()->name(),
            'agreements_accepted_at' => now(),
        ];
    }
}
