import { Form, Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    Check,
    ClipboardCheck,
    FileBadge,
    GraduationCap,
    PenLine,
    ShieldCheck,
    UserRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import { buttonLinkVariants } from '@/components/site/button-link';
import Container from '@/components/site/container';
import FormField, {
    AgreementCheckbox,
    CheckboxGroup,
    fileInputClassName,
    inputClassName,
    RadioGroup,
    yesNoOptions,
} from '@/components/site/form-field';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { contact, login } from '@/routes';
import { store } from '@/routes/register';

type ProgramPackageOption = {
    value: string;
    label: string;
    description: string;
    price: string;
};

type RegisterProps = {
    passwordRules: string;
    programPackages: ProgramPackageOption[];
    selectedPackage: string;
    certificationBodies: string[];
    priorCtAttempts: string[];
    weeklyAvailability: string[];
    weeklyWorkHours: string[];
    paymentPlans: string[];
    healthRequirements: string[];
};

type Step = {
    title: string;
    description: string;
    icon: LucideIcon;
    fields: string[];
};

const steps: Step[] = [
    {
        title: 'Account',
        description: 'Create the login you’ll use for the student portal.',
        icon: UserRound,
        fields: [
            'first_name',
            'last_name',
            'email',
            'password',
            'password_confirmation',
            'accepts_terms',
        ],
    },
    {
        title: 'Student information',
        description:
            'Your government ID name must match your ARRT/Pearson VUE registration.',
        icon: FileBadge,
        fields: [
            'legal_name',
            'date_of_birth',
            'ssn_last_four',
            'phone',
            'home_address',
            'emergency_contact',
        ],
    },
    {
        title: 'Credentials',
        description: 'Upload your current certifications and resume.',
        icon: ShieldCheck,
        fields: [
            'certification_body',
            'certification',
            'resume',
            'cpr_certification',
            'cpr_expires_on',
            'has_iv_certification',
            'iv_certification',
            'prior_ct_attempts',
            'prior_ct_attempt_details',
        ],
    },
    {
        title: 'Program enrollment',
        description: 'Choose your package and tell us about your schedule.',
        icon: GraduationCap,
        fields: [
            'program_package',
            'preferred_start_date',
            'employer',
            'weekly_availability',
            'weekly_work_hours',
            'has_reliable_transportation',
            'has_caregiver_responsibilities',
            'caregiver_details',
            'has_computer_access',
            'needs_accommodations',
            'accommodation_documentation',
        ],
    },
    {
        title: 'Agreements',
        description: 'Payment, clinical placement and health & safety.',
        icon: ClipboardCheck,
        fields: [
            'accepts_payment_terms',
            'payment_plan',
            'acknowledges_clinical_placement',
            'agrees_to_board_review',
            'acknowledges_health_requirements',
            'comfortable_with_iv_starts',
            'has_contrast_allergy',
            'agrees_to_conduct_standards',
        ],
    },
    {
        title: 'Signature & consent',
        description: 'Review, sign and submit your registration.',
        icon: PenLine,
        fields: [
            'medical_conditions',
            'success_support',
            'accepts_terms_and_conditions',
            'consents_to_early_intervention',
            'signature_name',
        ],
    },
];

function stepIndexForErrors(errors: Record<string, string>): number {
    const index = steps.findIndex((step) =>
        Object.keys(errors).some((key) =>
            step.fields.includes(key.split('.')[0]),
        ),
    );

    return index === -1 ? 0 : index;
}

/**
 * Validate the fields in a step with the browser's constraint validation,
 * reporting the first problem found so the student can fix it in place.
 */
function validateStep(stepElement: HTMLElement | null): boolean {
    if (!stepElement) {
        return true;
    }

    for (const group of stepElement.querySelectorAll<HTMLElement>(
        '[data-require-one]',
    )) {
        const checkboxes = group.querySelectorAll<HTMLInputElement>(
            'input[type=checkbox]',
        );
        const hasSelection = Array.from(checkboxes).some(
            (checkbox) => checkbox.checked,
        );

        checkboxes[0]?.setCustomValidity(
            hasSelection ? '' : 'Select at least one option.',
        );
    }

    const fields = stepElement.querySelectorAll<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >('input, select, textarea');

    for (const field of fields) {
        if (!field.checkValidity()) {
            field.reportValidity();

            return false;
        }
    }

    return true;
}

function StepSection({
    isActive,
    stepRef,
    children,
}: {
    isActive: boolean;
    stepRef: (element: HTMLFieldSetElement | null) => void;
    children: ReactNode;
}) {
    return (
        <fieldset
            ref={stepRef}
            hidden={!isActive}
            className="grid gap-6 sm:grid-cols-2"
        >
            {children}
        </fieldset>
    );
}

export default function Register({
    passwordRules,
    programPackages,
    selectedPackage,
    certificationBodies,
    priorCtAttempts,
    weeklyAvailability,
    weeklyWorkHours,
    paymentPlans,
    healthRequirements,
}: RegisterProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [hasIvCertification, setHasIvCertification] = useState(false);
    const [hasPriorCtAttempts, setHasPriorCtAttempts] = useState(false);
    const [hasCaregiverResponsibilities, setHasCaregiverResponsibilities] =
        useState(false);
    const [needsAccommodations, setNeedsAccommodations] = useState(false);
    const stepElements = useRef<(HTMLFieldSetElement | null)[]>([]);
    const formTop = useRef<HTMLDivElement>(null);

    const isLastStep = currentStep === steps.length - 1;
    const progress = ((currentStep + 1) / steps.length) * 100;
    const today = new Date().toISOString().split('T')[0];

    const goToStep = (index: number) => {
        setCurrentStep(index);
        formTop.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const goToNextStep = () => {
        if (validateStep(stepElements.current[currentStep])) {
            goToStep(currentStep + 1);
        }
    };

    const stepRef =
        (index: number) => (element: HTMLFieldSetElement | null) => {
            stepElements.current[index] = element;
        };

    return (
        <>
            <Head title="CT Program Registration" />

            <section className="relative isolate overflow-hidden bg-navy-950 pt-36 pb-40 sm:pt-44">
                <div
                    aria-hidden
                    className="absolute -top-40 -right-32 -z-10 size-[36rem] rounded-full bg-brand-500/25 blur-3xl"
                />
                <Container className="max-w-4xl text-center">
                    <p className="text-sm font-semibold tracking-[0.18em] text-brand-200 uppercase">
                        Infinite Learning Solutions
                    </p>
                    <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        CT Program Registration
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
                        Create your student account and enroll in six short
                        steps. Already registered?{' '}
                        <Link
                            href={login()}
                            className="font-semibold text-brand-300 underline underline-offset-4 hover:text-white"
                        >
                            Log in
                        </Link>
                    </p>
                </Container>
            </section>

            <section className="relative z-10 -mt-28 pb-24">
                <Container className="max-w-4xl">
                    <div
                        ref={formTop}
                        className="scroll-mt-28 rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-navy-950/10"
                    >
                        <div className="border-b border-slate-200 p-6 sm:p-10">
                            <div className="flex items-center justify-between gap-4 text-sm">
                                <p className="font-semibold text-brand-600">
                                    Step {currentStep + 1} of {steps.length}
                                </p>
                                <p className="text-slate-500">
                                    {Math.round(progress)}% complete
                                </p>
                            </div>
                            <div
                                role="progressbar"
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-valuenow={Math.round(progress)}
                                aria-label="Registration progress"
                                className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"
                            >
                                <div
                                    className="h-full rounded-full bg-linear-to-r from-brand-400 to-brand-600 transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <ol className="mt-6 hidden grid-cols-6 gap-2 md:grid">
                                {steps.map((step, index) => {
                                    const isComplete = index < currentStep;
                                    const isCurrent = index === currentStep;

                                    return (
                                        <li key={step.title}>
                                            <button
                                                type="button"
                                                disabled={!isComplete}
                                                onClick={() => goToStep(index)}
                                                className="flex w-full flex-col items-center gap-2 text-center disabled:cursor-default"
                                            >
                                                <span
                                                    className={cn(
                                                        'flex size-10 items-center justify-center rounded-full border-2 transition',
                                                        isComplete &&
                                                            'border-brand-500 bg-brand-500 text-white',
                                                        isCurrent &&
                                                            'border-brand-500 bg-brand-50 text-brand-600',
                                                        !isComplete &&
                                                            !isCurrent &&
                                                            'border-slate-200 text-slate-400',
                                                    )}
                                                >
                                                    {isComplete ? (
                                                        <Check className="size-5" />
                                                    ) : (
                                                        <step.icon className="size-5" />
                                                    )}
                                                </span>
                                                <span
                                                    className={cn(
                                                        'text-xs font-semibold',
                                                        isCurrent || isComplete
                                                            ? 'text-navy-950'
                                                            : 'text-slate-400',
                                                    )}
                                                >
                                                    {step.title}
                                                </span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ol>

                            <div className="mt-8">
                                <h2 className="font-display text-2xl font-bold text-navy-950">
                                    {steps[currentStep].title}
                                </h2>
                                <p className="mt-1 text-slate-600">
                                    {steps[currentStep].description}
                                </p>
                            </div>
                        </div>

                        <Form
                            {...store.form()}
                            noValidate
                            resetOnError={['password', 'password_confirmation']}
                            onBefore={() =>
                                validateStep(stepElements.current[currentStep])
                            }
                            onError={(errors) =>
                                goToStep(stepIndexForErrors(errors))
                            }
                            className="p-6 sm:p-10"
                        >
                            {({ errors, processing, progress: upload }) => (
                                <>
                                    {/* Step 1: Account */}
                                    <StepSection
                                        isActive={currentStep === 0}
                                        stepRef={stepRef(0)}
                                    >
                                        <FormField
                                            label="First name"
                                            htmlFor="first_name"
                                            required
                                            error={errors.first_name}
                                        >
                                            <input
                                                id="first_name"
                                                name="first_name"
                                                autoComplete="given-name"
                                                required
                                                className={inputClassName}
                                            />
                                        </FormField>
                                        <FormField
                                            label="Last name"
                                            htmlFor="last_name"
                                            required
                                            error={errors.last_name}
                                        >
                                            <input
                                                id="last_name"
                                                name="last_name"
                                                autoComplete="family-name"
                                                required
                                                className={inputClassName}
                                            />
                                        </FormField>
                                        <FormField
                                            label="Email address"
                                            htmlFor="email"
                                            required
                                            error={errors.email}
                                            className="sm:col-span-2"
                                        >
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className={inputClassName}
                                            />
                                        </FormField>
                                        <FormField
                                            label="Password"
                                            htmlFor="password"
                                            required
                                            error={errors.password}
                                            hint="Use at least 12 characters with letters, numbers and symbols."
                                        >
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="new-password"
                                                passwordrules={passwordRules}
                                                required
                                                className={inputClassName}
                                            />
                                        </FormField>
                                        <FormField
                                            label="Confirm password"
                                            htmlFor="password_confirmation"
                                            required
                                            error={errors.password_confirmation}
                                        >
                                            <input
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                type="password"
                                                autoComplete="new-password"
                                                passwordrules={passwordRules}
                                                required
                                                className={inputClassName}
                                            />
                                        </FormField>
                                        <div className="sm:col-span-2">
                                            <AgreementCheckbox
                                                name="accepts_terms"
                                                error={errors.accepts_terms}
                                            >
                                                I have reviewed and agree to the
                                                Terms of Service and Privacy
                                                Policy.
                                            </AgreementCheckbox>
                                        </div>
                                    </StepSection>

                                    {/* Step 2: Student information */}
                                    <StepSection
                                        isActive={currentStep === 1}
                                        stepRef={stepRef(1)}
                                    >
                                        <FormField
                                            label="Government ID name"
                                            htmlFor="legal_name"
                                            required
                                            error={errors.legal_name}
                                            hint="Must match your ARRT/Pearson VUE registration."
                                            className="sm:col-span-2"
                                        >
                                            <input
                                                id="legal_name"
                                                name="legal_name"
                                                required
                                                className={inputClassName}
                                            />
                                        </FormField>
                                        <FormField
                                            label="Date of birth"
                                            htmlFor="date_of_birth"
                                            required
                                            error={errors.date_of_birth}
                                        >
                                            <input
                                                id="date_of_birth"
                                                name="date_of_birth"
                                                type="date"
                                                max={today}
                                                autoComplete="bday"
                                                required
                                                className={inputClassName}
                                            />
                                        </FormField>
                                        <FormField
                                            label="Last 4 digits of SSN"
                                            htmlFor="ssn_last_four"
                                            required
                                            error={errors.ssn_last_four}
                                            hint="Stored encrypted."
                                        >
                                            <input
                                                id="ssn_last_four"
                                                name="ssn_last_four"
                                                inputMode="numeric"
                                                pattern="\d{4}"
                                                maxLength={4}
                                                autoComplete="off"
                                                required
                                                className={inputClassName}
                                            />
                                        </FormField>
                                        <FormField
                                            label="Phone number"
                                            htmlFor="phone"
                                            required
                                            error={errors.phone}
                                        >
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                autoComplete="tel"
                                                required
                                                className={inputClassName}
                                            />
                                        </FormField>
                                        <FormField
                                            label="Emergency contact name & number"
                                            htmlFor="emergency_contact"
                                            required
                                            error={errors.emergency_contact}
                                        >
                                            <input
                                                id="emergency_contact"
                                                name="emergency_contact"
                                                required
                                                className={inputClassName}
                                            />
                                        </FormField>
                                        <FormField
                                            label="Home address"
                                            htmlFor="home_address"
                                            required
                                            error={errors.home_address}
                                            className="sm:col-span-2"
                                        >
                                            <textarea
                                                id="home_address"
                                                name="home_address"
                                                rows={2}
                                                autoComplete="street-address"
                                                required
                                                className={inputClassName}
                                            />
                                        </FormField>
                                    </StepSection>

                                    {/* Step 3: Credentials */}
                                    <StepSection
                                        isActive={currentStep === 2}
                                        stepRef={stepRef(2)}
                                    >
                                        <FormField
                                            label="Are you certified by ARRT or NMTCB?"
                                            required
                                            error={errors.certification_body}
                                            className="sm:col-span-2"
                                        >
                                            <RadioGroup
                                                name="certification_body"
                                                options={certificationBodies}
                                                required
                                            />
                                        </FormField>
                                        <FormField
                                            label="Copy of current certification"
                                            htmlFor="certification"
                                            required
                                            error={errors.certification}
                                            hint="PDF, image or Word document up to 10 MB."
                                        >
                                            <input
                                                id="certification"
                                                name="certification"
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                                required
                                                className={fileInputClassName}
                                            />
                                        </FormField>
                                        <FormField
                                            label="Resume or CV"
                                            htmlFor="resume"
                                            required
                                            error={errors.resume}
                                            hint="PDF, image or Word document up to 10 MB."
                                        >
                                            <input
                                                id="resume"
                                                name="resume"
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                                required
                                                className={fileInputClassName}
                                            />
                                        </FormField>
                                        <FormField
                                            label="CPR/BLS certification"
                                            htmlFor="cpr_certification"
                                            required
                                            error={errors.cpr_certification}
                                        >
                                            <input
                                                id="cpr_certification"
                                                name="cpr_certification"
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                                required
                                                className={fileInputClassName}
                                            />
                                        </FormField>
                                        <FormField
                                            label="CPR/BLS expiration date"
                                            htmlFor="cpr_expires_on"
                                            required
                                            error={errors.cpr_expires_on}
                                        >
                                            <input
                                                id="cpr_expires_on"
                                                name="cpr_expires_on"
                                                type="date"
                                                min={today}
                                                required
                                                className={inputClassName}
                                            />
                                        </FormField>
                                        <FormField
                                            label="Venipuncture/IV certification?"
                                            required
                                            error={errors.has_iv_certification}
                                        >
                                            <RadioGroup
                                                name="has_iv_certification"
                                                options={yesNoOptions}
                                                required
                                                onValueChange={(value) =>
                                                    setHasIvCertification(
                                                        value === '1',
                                                    )
                                                }
                                            />
                                        </FormField>
                                        {hasIvCertification ? (
                                            <FormField
                                                label="Copy of IV certification"
                                                htmlFor="iv_certification"
                                                required
                                                error={errors.iv_certification}
                                            >
                                                <input
                                                    id="iv_certification"
                                                    name="iv_certification"
                                                    type="file"
                                                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                                    required
                                                    className={
                                                        fileInputClassName
                                                    }
                                                />
                                            </FormField>
                                        ) : (
                                            <div className="hidden sm:block" />
                                        )}
                                        <FormField
                                            label="Have you previously attempted the ARRT (CT) exam?"
                                            required
                                            error={errors.prior_ct_attempts}
                                            className="sm:col-span-2"
                                        >
                                            <RadioGroup
                                                name="prior_ct_attempts"
                                                options={priorCtAttempts}
                                                required
                                                onValueChange={(value) =>
                                                    setHasPriorCtAttempts(
                                                        value !==
                                                            priorCtAttempts[0],
                                                    )
                                                }
                                            />
                                        </FormField>
                                        {hasPriorCtAttempts && (
                                            <FormField
                                                label="Date(s) and outcome"
                                                htmlFor="prior_ct_attempt_details"
                                                required
                                                error={
                                                    errors.prior_ct_attempt_details
                                                }
                                                className="sm:col-span-2"
                                            >
                                                <textarea
                                                    id="prior_ct_attempt_details"
                                                    name="prior_ct_attempt_details"
                                                    rows={3}
                                                    required
                                                    className={inputClassName}
                                                />
                                            </FormField>
                                        )}
                                    </StepSection>

                                    {/* Step 4: Program enrollment */}
                                    <StepSection
                                        isActive={currentStep === 3}
                                        stepRef={stepRef(3)}
                                    >
                                        <FormField
                                            label="Program package"
                                            required
                                            error={errors.program_package}
                                            className="sm:col-span-2"
                                        >
                                            <div className="grid gap-3 md:grid-cols-3">
                                                {programPackages.map((pkg) => (
                                                    <label
                                                        key={pkg.value}
                                                        className="flex cursor-pointer flex-col rounded-2xl border-2 border-slate-200 p-5 transition hover:border-brand-300 has-checked:border-brand-500 has-checked:bg-brand-50"
                                                    >
                                                        <span className="flex items-start justify-between gap-3">
                                                            <span className="font-display font-bold text-navy-950">
                                                                {pkg.label}
                                                            </span>
                                                            <input
                                                                type="radio"
                                                                name="program_package"
                                                                value={
                                                                    pkg.value
                                                                }
                                                                defaultChecked={
                                                                    pkg.value ===
                                                                    selectedPackage
                                                                }
                                                                required
                                                                className="mt-1 accent-brand-500"
                                                            />
                                                        </span>
                                                        <span className="mt-1 flex-1 text-xs text-slate-500">
                                                            {pkg.description}
                                                        </span>
                                                        <span className="mt-4 font-display text-2xl font-extrabold text-navy-950">
                                                            {pkg.price}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </FormField>
                                        <FormField
                                            label="Preferred start date"
                                            htmlFor="preferred_start_date"
                                            required
                                            error={errors.preferred_start_date}
                                        >
                                            <input
                                                id="preferred_start_date"
                                                name="preferred_start_date"
                                                type="date"
                                                min={today}
                                                required
                                                className={inputClassName}
                                            />
                                        </FormField>
                                        <FormField
                                            label="Employer / facility"
                                            htmlFor="employer"
                                            error={errors.employer}
                                            hint="Optional"
                                        >
                                            <input
                                                id="employer"
                                                name="employer"
                                                autoComplete="organization"
                                                className={inputClassName}
                                            />
                                        </FormField>
                                        <FormField
                                            label="Weekly availability"
                                            required
                                            error={
                                                errors.weekly_availability ??
                                                errors['weekly_availability.0']
                                            }
                                            className="sm:col-span-2"
                                        >
                                            <CheckboxGroup
                                                name="weekly_availability[]"
                                                options={weeklyAvailability}
                                                requireOne
                                                className="sm:grid-cols-3"
                                            />
                                        </FormField>
                                        <FormField
                                            label="Average work hours per week"
                                            required
                                            error={errors.weekly_work_hours}
                                        >
                                            <RadioGroup
                                                name="weekly_work_hours"
                                                options={weeklyWorkHours}
                                                required
                                            />
                                        </FormField>
                                        <FormField
                                            label="Reliable transportation?"
                                            required
                                            error={
                                                errors.has_reliable_transportation
                                            }
                                        >
                                            <RadioGroup
                                                name="has_reliable_transportation"
                                                options={yesNoOptions}
                                                required
                                            />
                                        </FormField>
                                        <FormField
                                            label="Do you have a computer with reliable internet, webcam and microphone?"
                                            required
                                            error={errors.has_computer_access}
                                        >
                                            <RadioGroup
                                                name="has_computer_access"
                                                options={yesNoOptions}
                                                required
                                            />
                                        </FormField>
                                        <FormField
                                            label="Childcare/caregiver responsibilities that may affect your schedule?"
                                            required
                                            error={
                                                errors.has_caregiver_responsibilities
                                            }
                                        >
                                            <RadioGroup
                                                name="has_caregiver_responsibilities"
                                                options={yesNoOptions}
                                                required
                                                onValueChange={(value) =>
                                                    setHasCaregiverResponsibilities(
                                                        value === '1',
                                                    )
                                                }
                                            />
                                        </FormField>
                                        {hasCaregiverResponsibilities && (
                                            <FormField
                                                label="Please explain"
                                                htmlFor="caregiver_details"
                                                required
                                                error={errors.caregiver_details}
                                                className="sm:col-span-2"
                                            >
                                                <textarea
                                                    id="caregiver_details"
                                                    name="caregiver_details"
                                                    rows={3}
                                                    required
                                                    className={inputClassName}
                                                />
                                            </FormField>
                                        )}
                                        <FormField
                                            label="Do you anticipate needing ADA/testing accommodations?"
                                            required
                                            error={errors.needs_accommodations}
                                            className="sm:col-span-2"
                                        >
                                            <RadioGroup
                                                name="needs_accommodations"
                                                options={yesNoOptions}
                                                required
                                                onValueChange={(value) =>
                                                    setNeedsAccommodations(
                                                        value === '1',
                                                    )
                                                }
                                            />
                                        </FormField>
                                        {needsAccommodations && (
                                            <FormField
                                                label="Accommodation documentation"
                                                htmlFor="accommodation_documentation"
                                                required
                                                error={
                                                    errors.accommodation_documentation
                                                }
                                                className="sm:col-span-2"
                                            >
                                                <input
                                                    id="accommodation_documentation"
                                                    name="accommodation_documentation"
                                                    type="file"
                                                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                                    required
                                                    className={
                                                        fileInputClassName
                                                    }
                                                />
                                            </FormField>
                                        )}
                                    </StepSection>

                                    {/* Step 5: Agreements */}
                                    <StepSection
                                        isActive={currentStep === 4}
                                        stepRef={stepRef(4)}
                                    >
                                        <div className="grid gap-4 sm:col-span-2">
                                            <h3 className="font-display text-lg font-bold text-navy-950">
                                                Payment agreement
                                            </h3>
                                            <AgreementCheckbox
                                                name="accepts_payment_terms"
                                                error={
                                                    errors.accepts_payment_terms
                                                }
                                            >
                                                I understand the total cost of
                                                the program package I selected.
                                            </AgreementCheckbox>
                                            <FormField
                                                label="Payment plan"
                                                required
                                                error={errors.payment_plan}
                                            >
                                                <RadioGroup
                                                    name="payment_plan"
                                                    options={paymentPlans}
                                                    required
                                                />
                                            </FormField>
                                        </div>

                                        <div className="grid gap-4 sm:col-span-2">
                                            <h3 className="font-display text-lg font-bold text-navy-950">
                                                Clinical placement
                                            </h3>
                                            <AgreementCheckbox
                                                name="acknowledges_clinical_placement"
                                                error={
                                                    errors.acknowledges_clinical_placement
                                                }
                                            >
                                                I understand that clinical
                                                placement is required and may
                                                involve travel to affiliated
                                                clinical sites located 20 miles
                                                or more from my residence. I
                                                acknowledge that reliable
                                                transportation is my
                                                responsibility.
                                            </AgreementCheckbox>
                                            <AgreementCheckbox
                                                name="agrees_to_board_review"
                                                error={
                                                    errors.agrees_to_board_review
                                                }
                                            >
                                                I agree to attend weekly board
                                                review Zoom sessions.
                                            </AgreementCheckbox>
                                        </div>

                                        <div className="grid gap-4 sm:col-span-2">
                                            <h3 className="font-display text-lg font-bold text-navy-950">
                                                Health & safety compliance
                                            </h3>
                                            <div className="rounded-2xl bg-slate-50 p-5">
                                                <p className="text-sm text-slate-600">
                                                    Clinical sites require the
                                                    following before placement:
                                                </p>
                                                <ul className="mt-3 grid gap-2 text-sm text-navy-950 sm:grid-cols-2">
                                                    {healthRequirements.map(
                                                        (requirement) => (
                                                            <li
                                                                key={
                                                                    requirement
                                                                }
                                                                className="flex gap-2"
                                                            >
                                                                <Check className="size-4 shrink-0 text-brand-500" />
                                                                {requirement}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                            <AgreementCheckbox
                                                name="acknowledges_health_requirements"
                                                error={
                                                    errors.acknowledges_health_requirements
                                                }
                                            >
                                                I understand and will complete
                                                the health & safety requirements
                                                listed above.
                                            </AgreementCheckbox>
                                        </div>

                                        <FormField
                                            label="Are you comfortable performing IV starts under supervision?"
                                            required
                                            error={
                                                errors.comfortable_with_iv_starts
                                            }
                                        >
                                            <RadioGroup
                                                name="comfortable_with_iv_starts"
                                                options={yesNoOptions}
                                                required
                                            />
                                        </FormField>
                                        <FormField
                                            label="Any known allergies to latex or iodinated contrast?"
                                            required
                                            error={errors.has_contrast_allergy}
                                        >
                                            <RadioGroup
                                                name="has_contrast_allergy"
                                                options={yesNoOptions}
                                                required
                                            />
                                        </FormField>
                                        <div className="sm:col-span-2">
                                            <AgreementCheckbox
                                                name="agrees_to_conduct_standards"
                                                error={
                                                    errors.agrees_to_conduct_standards
                                                }
                                            >
                                                I agree to comply with site
                                                dress code, dosimetry badge
                                                policy, HIPAA and professional
                                                conduct standards.
                                            </AgreementCheckbox>
                                        </div>
                                    </StepSection>

                                    {/* Step 6: Signature & consent */}
                                    <StepSection
                                        isActive={currentStep === 5}
                                        stepRef={stepRef(5)}
                                    >
                                        <FormField
                                            label="Medical conditions the program should be aware of in case of emergency"
                                            htmlFor="medical_conditions"
                                            required
                                            error={errors.medical_conditions}
                                            hint="Enter “None” if not applicable. Stored encrypted."
                                            className="sm:col-span-2"
                                        >
                                            <textarea
                                                id="medical_conditions"
                                                name="medical_conditions"
                                                rows={3}
                                                required
                                                className={inputClassName}
                                            />
                                        </FormField>
                                        <FormField
                                            label="How can we best support you in succeeding in this program?"
                                            htmlFor="success_support"
                                            required
                                            error={errors.success_support}
                                            className="sm:col-span-2"
                                        >
                                            <textarea
                                                id="success_support"
                                                name="success_support"
                                                rows={3}
                                                required
                                                className={inputClassName}
                                            />
                                        </FormField>
                                        <div className="grid gap-4 sm:col-span-2">
                                            <AgreementCheckbox
                                                name="accepts_terms_and_conditions"
                                                error={
                                                    errors.accepts_terms_and_conditions
                                                }
                                            >
                                                I agree to the terms and
                                                conditions outlined above.
                                            </AgreementCheckbox>
                                            <AgreementCheckbox
                                                name="consents_to_early_intervention"
                                                error={
                                                    errors.consents_to_early_intervention
                                                }
                                            >
                                                I consent to early
                                                intervention/alerts if I am at
                                                risk of falling behind
                                                academically or clinically.
                                            </AgreementCheckbox>
                                        </div>
                                        <FormField
                                            label="Type your full name as your signature"
                                            htmlFor="signature_name"
                                            required
                                            error={errors.signature_name}
                                        >
                                            <input
                                                id="signature_name"
                                                name="signature_name"
                                                required
                                                className={cn(
                                                    inputClassName,
                                                    'font-display text-lg italic',
                                                )}
                                            />
                                        </FormField>
                                        <FormField label="Date">
                                            <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                                                {new Date().toLocaleDateString(
                                                    'en-US',
                                                    { dateStyle: 'long' },
                                                )}
                                            </p>
                                        </FormField>
                                    </StepSection>

                                    {upload && (
                                        <progress
                                            value={upload.percentage}
                                            max="100"
                                            className="mt-6 h-1.5 w-full accent-brand-500"
                                        />
                                    )}

                                    <div className="mt-10 flex flex-col-reverse gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
                                        {currentStep > 0 ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    goToStep(currentStep - 1)
                                                }
                                                className={buttonLinkVariants({
                                                    variant: 'outline',
                                                })}
                                            >
                                                <ArrowLeft />
                                                Back
                                            </button>
                                        ) : (
                                            <p className="text-sm text-slate-500">
                                                Questions?{' '}
                                                <Link
                                                    href={contact({
                                                        query: {
                                                            topic: 'ct-program',
                                                        },
                                                    })}
                                                    className="font-semibold text-brand-600"
                                                >
                                                    Contact us
                                                </Link>
                                            </p>
                                        )}

                                        {isLastStep ? (
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                data-test="register-user-button"
                                                className={buttonLinkVariants({
                                                    size: 'lg',
                                                })}
                                            >
                                                {processing ? (
                                                    <Spinner />
                                                ) : (
                                                    <Check />
                                                )}
                                                Submit registration
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={goToNextStep}
                                                className={buttonLinkVariants({
                                                    size: 'lg',
                                                })}
                                            >
                                                Continue
                                                <ArrowRight />
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>
                </Container>
            </section>
        </>
    );
}
