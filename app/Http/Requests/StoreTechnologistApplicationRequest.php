<?php

namespace App\Http\Requests;

use App\Enums\Modality;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTechnologistApplicationRequest extends FormRequest
{
    public const array AVAILABILITY_OPTIONS = ['Per diem', 'Part-time', 'Full-time', 'Travel / contract'];

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
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:30'],
            'modalities' => ['required', 'array', 'min:1'],
            'modalities.*' => [Rule::enum(Modality::class)->only(Modality::clinical())],
            'credentials' => ['required', 'string', 'max:255'],
            'years_experience' => ['required', 'integer', 'min:0', 'max:60'],
            'availability' => ['required', Rule::in(self::AVAILABILITY_OPTIONS)],
            'preferred_contact' => ['required', Rule::in(StoreStaffRequestRequest::CONTACT_METHODS)],
            'resume' => ['required', 'file', 'mimes:pdf,doc,docx', 'max:10240'],
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
            'modalities.required' => 'Select at least one modality.',
            'resume.mimes' => 'Your resume must be a PDF or Word document.',
            'resume.max' => 'Your resume may not be larger than 10 MB.',
        ];
    }
}
