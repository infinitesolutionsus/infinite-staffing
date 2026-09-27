<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();

            // Student information
            $table->string('legal_name');
            $table->text('date_of_birth');
            $table->text('ssn_last_four');
            $table->string('phone');
            $table->text('home_address');
            $table->string('emergency_contact');

            // Credentials
            $table->string('certification_body');
            $table->string('certification_path');
            $table->string('resume_path');
            $table->string('cpr_certification_path');
            $table->date('cpr_expires_on');
            $table->boolean('has_iv_certification');
            $table->string('iv_certification_path')->nullable();
            $table->string('prior_ct_attempts');
            $table->text('prior_ct_attempt_details')->nullable();

            // Program enrollment
            $table->string('program_package');
            $table->date('preferred_start_date');
            $table->string('employer')->nullable();
            $table->json('weekly_availability');
            $table->string('weekly_work_hours');
            $table->boolean('has_reliable_transportation');
            $table->boolean('has_caregiver_responsibilities');
            $table->text('caregiver_details')->nullable();
            $table->boolean('has_computer_access');
            $table->boolean('needs_accommodations');
            $table->string('accommodation_documentation_path')->nullable();

            // Agreements, health & safety
            $table->string('payment_plan');
            $table->boolean('comfortable_with_iv_starts');
            $table->boolean('has_contrast_allergy');
            $table->text('medical_conditions');
            $table->text('success_support');
            $table->string('signature_name');
            $table->timestamp('agreements_accepted_at');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_profiles');
    }
};
