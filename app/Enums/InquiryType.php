<?php

namespace App\Enums;

enum InquiryType: string
{
    case Contact = 'contact';
    case StaffRequest = 'staff_request';
    case TechnologistApplication = 'technologist_application';

    public function label(): string
    {
        return match ($this) {
            self::Contact => 'Contact Inquiry',
            self::StaffRequest => 'Staff Request',
            self::TechnologistApplication => 'Technologist Application',
        };
    }
}
