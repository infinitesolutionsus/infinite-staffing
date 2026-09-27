<?php

namespace App\Http\Requests;

use App\Enums\Modality;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreStaffRequestRequest extends FormRequest
{
    public const array COVERAGE_TYPES = ['Per diem', 'Short-term contract', 'Long-term contract', 'Permanent placement'];

    public const array CONTACT_METHODS = ['Phone', 'Email', 'Text'];

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'facility' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:30'],
            'modalities' => ['required', 'array', 'min:1'],
            'modalities.*' => [Rule::enum(Modality::class)],
            'coverage_type' => ['required', Rule::in(self::COVERAGE_TYPES)],
            'start_date' => ['required', 'date', 'after_or_equal:today'],
            'preferred_contact' => ['required', Rule::in(self::CONTACT_METHODS)],
            'message' => ['nullable', 'string', 'max:5000'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'modalities.required' => 'Select at least one modality or service.',
            'start_date.after_or_equal' => 'The start date cannot be in the past.',
        ];
    }
}
