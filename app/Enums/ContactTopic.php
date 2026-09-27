<?php

namespace App\Enums;

enum ContactTopic: string
{
    case General = 'general';
    case Staffing = 'staffing';
    case CtProgram = 'ct-program';
    case Consulting = 'consulting';
    case Advocacy = 'advocacy';

    public function label(): string
    {
        return match ($this) {
            self::General => 'General Question',
            self::Staffing => 'Radiology Staffing',
            self::CtProgram => 'CT Certification Program',
            self::Consulting => 'Consulting Services',
            self::Advocacy => 'Healthcare Advocacy',
        };
    }

    /**
     * @return list<array{value: string, label: string}>
     */
    public static function options(): array
    {
        return array_map(
            fn (self $topic): array => ['value' => $topic->value, 'label' => $topic->label()],
            self::cases(),
        );
    }
}
