<?php

namespace App\Actions;

use App\Enums\InquiryType;
use App\Mail\InquiryReceived;
use App\Models\Inquiry;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Mail;
use RuntimeException;

class SubmitInquiry
{
    /**
     * Store an inquiry from the public website and notify the team by email.
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
        ?UploadedFile $attachment = null,
    ): Inquiry {
        $inquiry = Inquiry::create([
            'type' => $type,
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'message' => $message,
            'details' => $details,
            'attachment_path' => $attachment === null ? null : ($attachment->store('inquiries')
                ?: throw new RuntimeException('Unable to store the inquiry attachment.')),
        ]);

        rescue(fn () => Mail::to(config('mail.inquiry_recipient'))->send(new InquiryReceived($inquiry)));

        return $inquiry;
    }
}
