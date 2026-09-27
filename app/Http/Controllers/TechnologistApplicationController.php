<?php

namespace App\Http\Controllers;

use App\Actions\SubmitInquiry;
use App\Enums\InquiryType;
use App\Enums\Modality;
use App\Http\Requests\StoreStaffRequestRequest;
use App\Http\Requests\StoreTechnologistApplicationRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TechnologistApplicationController extends Controller
{
    /**
     * Show the technologist application form.
     */
    public function create(): Response
    {
        return Inertia::render('site/technologist-application', [
            'modalities' => Modality::options(Modality::clinical()),
            'availabilityOptions' => StoreTechnologistApplicationRequest::AVAILABILITY_OPTIONS,
            'contactMethods' => StoreStaffRequestRequest::CONTACT_METHODS,
        ]);
    }

    /**
     * Store a technologist application.
     */
    public function store(StoreTechnologistApplicationRequest $request, SubmitInquiry $submitInquiry): RedirectResponse
    {
        $submitInquiry->handle(
            type: InquiryType::TechnologistApplication,
            name: "{$request->validated('first_name')} {$request->validated('last_name')}",
            email: $request->validated('email'),
            phone: $request->validated('phone'),
            message: $request->validated('message'),
            details: [
                'Modalities' => Modality::labelsFor($request->array('modalities')),
                'Credentials' => $request->validated('credentials'),
                'Years of experience' => $request->validated('years_experience'),
                'Availability' => $request->validated('availability'),
                'Preferred contact' => $request->validated('preferred_contact'),
            ],
            attachment: $request->file('resume'),
        );

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Application submitted. Thank you for your interest!')]);

        return to_route('technologist-application.create');
    }
}
