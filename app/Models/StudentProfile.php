<?php

namespace App\Models;

use App\Enums\ProgramPackage;
use Database\Factories\StudentProfileFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $user_id
 * @property string $legal_name
 * @property string $date_of_birth
 * @property string $ssn_last_four
 * @property string $phone
 * @property string $home_address
 * @property string $emergency_contact
 * @property string $certification_body
 * @property string $certification_path
 * @property string $resume_path
 * @property string $cpr_certification_path
 * @property Carbon $cpr_expires_on
 * @property bool $has_iv_certification
 * @property string|null $iv_certification_path
 * @property string $prior_ct_attempts
 * @property string|null $prior_ct_attempt_details
 * @property ProgramPackage $program_package
 * @property Carbon $preferred_start_date
 * @property string|null $employer
 * @property array<int, string> $weekly_availability
 * @property string $weekly_work_hours
 * @property bool $has_reliable_transportation
 * @property bool $has_caregiver_responsibilities
 * @property string|null $caregiver_details
 * @property bool $has_computer_access
 * @property bool $needs_accommodations
 * @property string|null $accommodation_documentation_path
 * @property string $payment_plan
 * @property bool $comfortable_with_iv_starts
 * @property bool $has_contrast_allergy
 * @property string $medical_conditions
 * @property string $success_support
 * @property string $signature_name
 * @property Carbon $agreements_accepted_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'legal_name', 'date_of_birth', 'ssn_last_four', 'phone', 'home_address', 'emergency_contact',
    'certification_body', 'certification_path', 'resume_path', 'cpr_certification_path', 'cpr_expires_on',
    'has_iv_certification', 'iv_certification_path', 'prior_ct_attempts', 'prior_ct_attempt_details',
    'program_package', 'preferred_start_date', 'employer', 'weekly_availability', 'weekly_work_hours',
    'has_reliable_transportation', 'has_caregiver_responsibilities', 'caregiver_details',
    'has_computer_access', 'needs_accommodations', 'accommodation_documentation_path',
    'payment_plan', 'comfortable_with_iv_starts', 'has_contrast_allergy', 'medical_conditions',
    'success_support', 'signature_name', 'agreements_accepted_at',
])]
#[Hidden(['date_of_birth', 'ssn_last_four', 'home_address', 'medical_conditions'])]
class StudentProfile extends Model
{
    /** @use HasFactory<StudentProfileFactory> */
    use HasFactory;

    public const array CERTIFICATION_BODIES = ['ARRT', 'NMTCB', 'Other'];

    public const array PRIOR_CT_ATTEMPTS = ['No', 'Yes – once', 'Yes – multiple times'];

    public const array WEEKLY_AVAILABILITY = ['Days', 'Evenings', 'Nights', 'Weekends', '12-hr shifts'];

    public const array WEEKLY_WORK_HOURS = ['0', '1-20', '21-32', '33+'];

    public const array PAYMENT_PLANS = ['Full payment', 'Employer-sponsored', 'Other'];

    public const array HEALTH_REQUIREMENTS = [
        'TB screening',
        'Drug screen',
        'Background check',
        'Hep B, MMR, Varicella, Tdap, Flu and COVID vaccinations',
        'N95 fit test',
        'Student liability insurance',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'date_of_birth' => 'encrypted',
            'ssn_last_four' => 'encrypted',
            'home_address' => 'encrypted',
            'medical_conditions' => 'encrypted',
            'cpr_expires_on' => 'date',
            'preferred_start_date' => 'date',
            'program_package' => ProgramPackage::class,
            'weekly_availability' => 'array',
            'has_iv_certification' => 'boolean',
            'has_reliable_transportation' => 'boolean',
            'has_caregiver_responsibilities' => 'boolean',
            'has_computer_access' => 'boolean',
            'needs_accommodations' => 'boolean',
            'comfortable_with_iv_starts' => 'boolean',
            'has_contrast_allergy' => 'boolean',
            'agreements_accepted_at' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
