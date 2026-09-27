<?php

namespace App\Enums;

enum Modality: string
{
    case GeneralXRay = 'x-ray';
    case ComputedTomography = 'ct';
    case Mri = 'mri';
    case NuclearMedicine = 'nuclear-medicine';
    case Pet = 'pet';
    case Ultrasound = 'ultrasound';
    case Mammography = 'mammography';
    case CardiacCathLab = 'cardiac-cath-lab';
    case ApplicationsTraining = 'applications-training';
    case RadiationSafetyOfficer = 'rso';
    case AcrAccreditation = 'acr-accreditation';

    public function label(): string
    {
        return match ($this) {
            self::GeneralXRay => 'General X-Ray (Fluoroscopy, C-Arm)',
            self::ComputedTomography => 'Computed Tomography (CT)',
            self::Mri => 'Magnetic Resonance Imaging (MRI)',
            self::NuclearMedicine => 'General Nuclear Medicine',
            self::Pet => 'Positron Emission Tomography (PET)',
            self::Ultrasound => 'Ultrasound (General, Vascular)',
            self::Mammography => 'Mammography',
            self::CardiacCathLab => 'Cardiac Cath Lab',
            self::ApplicationsTraining => 'Applications Training',
            self::RadiationSafetyOfficer => 'Radiation Safety Officer (RSO)',
            self::AcrAccreditation => 'ACR Accreditation & Renewals',
        };
    }

    /**
     * The imaging modalities a technologist can be credentialed in, excluding
     * the support services the company offers to facilities.
     *
     * @return array<int, self>
     */
    public static function clinical(): array
    {
        return collect(self::cases())
            ->reject(fn (self $modality): bool => in_array($modality, [self::ApplicationsTraining, self::RadiationSafetyOfficer, self::AcrAccreditation], true))
            ->values()
            ->all();
    }

    /**
     * Get a comma separated list of labels for the given modality values.
     *
     * @param  array<int, string>  $values
     */
    public static function labelsFor(array $values): string
    {
        return collect($values)
            ->map(fn (string $value): string => self::from($value)->label())
            ->implode(', ');
    }

    /**
     * @param  array<int, self>|null  $modalities
     * @return list<array{value: string, label: string}>
     */
    public static function options(?array $modalities = null): array
    {
        return array_values(array_map(
            fn (self $modality): array => ['value' => $modality->value, 'label' => $modality->label()],
            $modalities ?? self::cases(),
        ));
    }
}
