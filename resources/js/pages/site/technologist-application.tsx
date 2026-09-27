import { Form, Head } from '@inertiajs/react';
import {
    CalendarClock,
    GraduationCap,
    Send,
    Stethoscope,
    Users,
} from 'lucide-react';
import { store } from '@/actions/App/Http/Controllers/TechnologistApplicationController';
import { buttonLinkVariants } from '@/components/site/button-link';
import Container from '@/components/site/container';
import FormField, {
    CheckboxGroup,
    fileInputClassName,
    inputClassName,
    RadioGroup,
} from '@/components/site/form-field';
import FormSuccess from '@/components/site/form-success';
import PageHero from '@/components/site/page-hero';
import { Spinner } from '@/components/ui/spinner';

type TechnologistApplicationProps = {
    modalities: { value: string; label: string }[];
    availabilityOptions: string[];
    contactMethods: string[];
};

const perks = [
    {
        title: 'Skilled professionals',
        description: 'Join a team focused on quality and patient care.',
        icon: Users,
    },
    {
        title: 'Comprehensive training',
        description: 'Hands-on onboarding and extensive training programs.',
        icon: Stethoscope,
    },
    {
        title: 'Flexible scheduling',
        description: 'Flexibility is essential for work-life balance.',
        icon: CalendarClock,
    },
    {
        title: 'CT Program access',
        description: 'Opportunities to enhance your skills and credentials.',
        icon: GraduationCap,
    },
];

export default function TechnologistApplication({
    modalities,
    availabilityOptions,
    contactMethods,
}: TechnologistApplicationProps) {
    return (
        <>
            <Head title="Join Our Team">
                <meta
                    name="description"
                    content="Radiologic technologists: apply to join Infinite Staffing Solutions for top-of-the-industry opportunities across Los Angeles."
                />
            </Head>

            <PageHero
                eyebrow="Careers for technologists"
                title="Empowering professionals through education and staffing"
                description="Join a team that invests in your growth — with top-of-the-industry opportunities, hands-on onboarding and continuous education."
                image="/images/ct-why.jpg"
            />

            <section className="bg-white py-20">
                <Container>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {perks.map((perk) => (
                            <div
                                key={perk.title}
                                className="rounded-3xl bg-brand-50 p-6"
                            >
                                <perk.icon className="size-7 text-brand-600" />
                                <h2 className="mt-4 font-display font-bold text-navy-950">
                                    {perk.title}
                                </h2>
                                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                                    {perk.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-slate-50 py-20 sm:py-24">
                <Container className="max-w-4xl">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-navy-950/5 sm:p-10">
                        <h2 className="font-display text-2xl font-bold text-navy-950">
                            Technologist application
                        </h2>
                        <p className="mt-2 text-slate-600">
                            Fields marked with * are required.
                        </p>

                        <Form
                            {...store.form()}
                            resetOnSuccess
                            options={{ preserveScroll: true }}
                            className="mt-8 grid gap-6 sm:grid-cols-2"
                        >
                            {({
                                errors,
                                processing,
                                progress,
                                wasSuccessful,
                            }) => (
                                <>
                                    {wasSuccessful && (
                                        <div className="sm:col-span-2">
                                            <FormSuccess
                                                title="Application submitted"
                                                message="Thank you for your interest in joining our team! We'll review your application and be in touch."
                                            />
                                        </div>
                                    )}

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
                                            aria-invalid={!!errors.first_name}
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
                                            aria-invalid={!!errors.last_name}
                                            className={inputClassName}
                                        />
                                    </FormField>

                                    <FormField
                                        label="Email address"
                                        htmlFor="email"
                                        required
                                        error={errors.email}
                                    >
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            aria-invalid={!!errors.email}
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
                                            aria-invalid={!!errors.phone}
                                            className={inputClassName}
                                        />
                                    </FormField>

                                    <FormField
                                        label="Modalities"
                                        required
                                        error={
                                            errors.modalities ??
                                            errors['modalities.0']
                                        }
                                        className="sm:col-span-2"
                                    >
                                        <CheckboxGroup
                                            name="modalities[]"
                                            options={modalities}
                                        />
                                    </FormField>

                                    <FormField
                                        label="Credentials"
                                        htmlFor="credentials"
                                        required
                                        error={errors.credentials}
                                        hint="e.g. ARRT (R)(CT), NMTCB, CRT"
                                    >
                                        <input
                                            id="credentials"
                                            name="credentials"
                                            required
                                            aria-invalid={!!errors.credentials}
                                            className={inputClassName}
                                        />
                                    </FormField>

                                    <FormField
                                        label="Years of experience"
                                        htmlFor="years_experience"
                                        required
                                        error={errors.years_experience}
                                    >
                                        <input
                                            id="years_experience"
                                            name="years_experience"
                                            type="number"
                                            min={0}
                                            max={60}
                                            required
                                            aria-invalid={
                                                !!errors.years_experience
                                            }
                                            className={inputClassName}
                                        />
                                    </FormField>

                                    <FormField
                                        label="Availability"
                                        required
                                        error={errors.availability}
                                        className="sm:col-span-2"
                                    >
                                        <RadioGroup
                                            name="availability"
                                            options={availabilityOptions}
                                        />
                                    </FormField>

                                    <FormField
                                        label="Preferred method of communication"
                                        required
                                        error={errors.preferred_contact}
                                        className="sm:col-span-2"
                                    >
                                        <RadioGroup
                                            name="preferred_contact"
                                            options={contactMethods}
                                            defaultValue={contactMethods[0]}
                                        />
                                    </FormField>

                                    <FormField
                                        label="Resume / CV"
                                        htmlFor="resume"
                                        required
                                        error={errors.resume}
                                        hint="PDF or Word document, up to 10 MB."
                                        className="sm:col-span-2"
                                    >
                                        <input
                                            id="resume"
                                            name="resume"
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            required
                                            aria-invalid={!!errors.resume}
                                            className={fileInputClassName}
                                        />
                                        {progress && (
                                            <progress
                                                value={progress.percentage}
                                                max="100"
                                                className="h-1.5 w-full accent-brand-500"
                                            />
                                        )}
                                    </FormField>

                                    <FormField
                                        label="Anything else we should know?"
                                        htmlFor="message"
                                        error={errors.message}
                                        className="sm:col-span-2"
                                    >
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            aria-invalid={!!errors.message}
                                            className={inputClassName}
                                        />
                                    </FormField>

                                    <div className="sm:col-span-2">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className={buttonLinkVariants({
                                                size: 'lg',
                                            })}
                                        >
                                            {processing ? (
                                                <Spinner />
                                            ) : (
                                                <Send />
                                            )}
                                            Submit application
                                        </button>
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
