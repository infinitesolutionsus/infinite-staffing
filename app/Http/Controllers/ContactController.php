<?php

namespace App\Http\Controllers;

use App\Actions\SubmitInquiry;
use App\Enums\ContactTopic;
use App\Enums\InquiryType;
use App\Http\Requests\StoreContactInquiryRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Show the contact page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('site/contact', [
            'topics' => ContactTopic::options(),
            'selectedTopic' => (ContactTopic::tryFrom($request->string('topic')->toString()) ?? ContactTopic::General)->value,
        ]);
    }

    /**
     * Store a contact inquiry.
     */
    public function store(StoreContactInquiryRequest $request, SubmitInquiry $submitInquiry): RedirectResponse
    {
        $submitInquiry->handle(
            type: InquiryType::Contact,
            name: $request->validated('name'),
            email: $request->validated('email'),
            phone: $request->validated('phone'),
            message: $request->validated('message'),
            details: ['Topic' => ContactTopic::from($request->validated('topic'))->label()],
        );

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Thanks for reaching out! We\'ll be in touch shortly.')]);

        return to_route('contact');
    }
}
