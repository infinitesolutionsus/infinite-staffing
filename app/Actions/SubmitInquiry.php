<?php

namespace App\Actions;

use App\Enums\InquiryType;
use App\Mail\InquiryConfirmation;
use App\Mail\InquiryReceived;
use App\Models\Inquiry;
use Illuminate\Support\Facades\Mail;

class SubmitInquiry
{
    /**
     * Store an inquiry from the public website, notify the team by email,
     * and send the visitor a confirmation.
     *
     * Mail failures are reported rather than thrown so the visitor's
     * submission is never lost because of a mail transport problem.
     *
     * @param  array<string, string|int|null>  $details
     */
    public function handle(
        InquiryType $type,
        string $name,
        string $email,
        ?string $phone = null,
        ?string $message = null,
        array $details = [],
    ): Inquiry {
        $inquiry = Inquiry::create([
            'type' => $type,
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'message' => $message,
            'details' => $details,
        ]);

        rescue(fn () => Mail::to(config('mail.inquiry_recipient'))->send(new InquiryReceived($inquiry)));
        rescue(fn () => Mail::to($inquiry->email, $inquiry->name)->send(new InquiryConfirmation($inquiry)));

        return $inquiry;
    }
}
