<?php

namespace App\Http\Controllers;

use App\Actions\SubmitInquiry;
use App\Enums\InquiryType;
use App\Enums\Modality;
use App\Http\Requests\StoreStaffRequestRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class StaffRequestController extends Controller
{
    /**
     * Show the staff request form for healthcare facilities.
     */
    public function create(): Response
    {
        return Inertia::render('site/request-staff', [
            'modalities' => Modality::options(),
            'coverageTypes' => StoreStaffRequestRequest::COVERAGE_TYPES,
            'contactMethods' => StoreStaffRequestRequest::CONTACT_METHODS,
        ]);
    }

    /**
     * Store a staff request.
     */
    public function store(StoreStaffRequestRequest $request, SubmitInquiry $submitInquiry): RedirectResponse
    {
        $submitInquiry->handle(
            type: InquiryType::StaffRequest,
            name: "{$request->validated('first_name')} {$request->validated('last_name')}",
            email: $request->validated('email'),
            phone: $request->validated('phone'),
            message: $request->validated('message'),
            details: [
                'Facility' => $request->validated('facility'),
                'Modalities' => Modality::labelsFor($request->array('modalities')),
                'Coverage' => $request->validated('coverage_type'),
                'Start date' => $request->date('start_date')->toFormattedDateString(),
                'Preferred contact' => $request->validated('preferred_contact'),
            ],
        );

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Your staffing request has been received.')]);

        return to_route('staff-request.create');
    }
}
