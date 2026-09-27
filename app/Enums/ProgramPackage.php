<?php

namespace App\Enums;

enum ProgramPackage: string
{
    case CompleteProgram = 'complete';
    case BoardReviewAndExamPrep = 'board-review';
    case ClinicalSiteOnly = 'clinical-site';

    public function label(): string
    {
        return match ($this) {
            self::CompleteProgram => 'Complete CT Program',
            self::BoardReviewAndExamPrep => 'Board Review + Exam Prep',
            self::ClinicalSiteOnly => 'Clinical Site Only',
        };
    }

    public function description(): string
    {
        return match ($this) {
            self::CompleteProgram => 'Board Review + Exam Prep + Clinical Placement',
            self::BoardReviewAndExamPrep => 'For those who already have a clinical site',
            self::ClinicalSiteOnly => 'Didactic requirements completed — clinical placement only',
        };
    }

    public function price(): string
    {
        return match ($this) {
            self::CompleteProgram => '$1,995',
            self::BoardReviewAndExamPrep => '$550',
            self::ClinicalSiteOnly => '$1,495',
        };
    }

    /**
     * @return array<int, array{value: string, label: string, description: string, price: string}>
     */
    public static function options(): array
    {
        return array_map(
            fn (self $package): array => [
                'value' => $package->value,
                'label' => $package->label(),
                'description' => $package->description(),
                'price' => $package->price(),
            ],
            self::cases(),
        );
    }
}
