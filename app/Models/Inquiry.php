<?php

namespace App\Models;

use App\Enums\InquiryType;
use Database\Factories\InquiryFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property InquiryType $type
 * @property string $name
 * @property string $email
 * @property string|null $phone
 * @property string|null $message
 * @property array<string, mixed>|null $details
 * @property string|null $attachment_path
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['type', 'name', 'email', 'phone', 'message', 'details', 'attachment_path'])]
class Inquiry extends Model
{
    /** @use HasFactory<InquiryFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'type' => InquiryType::class,
            'details' => 'array',
        ];
    }
}
