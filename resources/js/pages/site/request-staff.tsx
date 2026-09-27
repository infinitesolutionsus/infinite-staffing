import { Form, Head } from '@inertiajs/react';
import { Phone, Send } from 'lucide-react';
import { store } from '@/actions/App/Http/Controllers/StaffRequestController';
import { buttonLinkVariants } from '@/components/site/button-link';
import CheckList from '@/components/site/check-list';
import Container from '@/components/site/container';
import FormField, {
    CheckboxGroup,
    inputClassName,
    RadioGroup,
} from '@/components/site/form-field';
import FormSuccess from '@/components/site/form-success';
import PageHero from '@/components/site/page-hero';
import { Spinner } from '@/components/ui/spinner';
import { company } from '@/lib/site';

type RequestStaffProps = {
    modalities: { value: string; label: string }[];
    coverageTypes: string[];
    contactMethods: string[];
};

const benefits = [
    'Skilled technologists across every modality',
    'Carefully selected professionals focused on patient care',
    'On-site, hands-on onboarding',
    'Short-term coverage and long-term placement',
];

export default function RequestStaff({
    modalities,
    coverageTypes,
    contactMethods,
}: RequestStaffProps) {
    const today = new Date().toISOString().split('T')[0];

    return (
        <>
            <Head title="Request Staff">
                <meta
                    name="description"
                    content="Request radiologic technologists for your hospital or imaging center. Tell us the modality, coverage and start date you need."
                />
            </Head>

            <PageHero
                eyebrow="For healthcare facilities"
                title="Request staff"
                description="Tell us about your staffing needs and our team will match you with the right radiologic technologist — quickly."
                image="/images/staff-doctor.jpeg"
            />

            <section className="bg-slate-50 py-20 sm:py-24">
                <Container className="grid gap-10 lg:grid-cols-12">
                    <aside className="grid content-start gap-6 lg:col-span-4">
                        <div className="rounded-3xl bg-navy-950 p-8">
                            <h2 className="font-display text-xl font-bold text-white">
                                Why facilities choose us
                            </h2>
                            <CheckList
                                items={benefits}
                                tone="dark"
                                className="mt-6"
                            />
                        </div>
                        <div className="rounded-3xl border border-slate-200 bg-white p-8">
                            <p className="text-sm text-slate-500">
                                Need coverage urgently?
                            </p>
                            <a
                                href={company.phoneHref}
                                className="mt-2 flex items-center gap-3 font-display text-2xl font-bold text-navy-950 hover:text-brand-600"
                            >
                                <Phone className="size-5 text-brand-500" />
                                {company.phone}
                            </a>
                        </div>
                    </aside>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-navy-950/5 sm:p-10 lg:col-span-8">
                        <h2 className="font-display text-2xl font-bold text-navy-950">
                            Staff request form
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
                            {({ errors, processing, wasSuccessful }) => (
                                <>
                                    {wasSuccessful && (
                                        <div className="sm:col-span-2">
                                            <FormSuccess
                                                title="Request received"
                                                message="Thank you! Our staffing team will contact you shortly to confirm the details."
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
                                        label="Facility / company name"
                                        htmlFor="facility"
                                        required
                                        error={errors.facility}
                                        className="sm:col-span-2"
                                    >
                                        <input
                                            id="facility"
                                            name="facility"
                                            autoComplete="organization"
                                            required
                                            aria-invalid={!!errors.facility}
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
                                        label="Modalities / services needed"
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
                                        label="Type of coverage"
                                        htmlFor="coverage_type"
                                        required
                                        error={errors.coverage_type}
                                    >
                                        <select
                                            id="coverage_type"
                                            name="coverage_type"
                                            required
                                            defaultValue=""
                                            aria-invalid={
                                                !!errors.coverage_type
                                            }
                                            className={inputClassName}
                                        >
                                            <option value="" disabled>
                                                Select coverage
                                            </option>
                                            {coverageTypes.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </FormField>

                                    <FormField
                                        label="Start date needed"
                                        htmlFor="start_date"
                                        required
                                        error={errors.start_date}
                                    >
                                        <input
                                            id="start_date"
                                            name="start_date"
                                            type="date"
                                            min={today}
                                            required
                                            aria-invalid={!!errors.start_date}
                                            className={inputClassName}
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
                                        label="Additional notes"
                                        htmlFor="message"
                                        error={errors.message}
                                        hint="Shifts, schedule, number of technologists, special certifications, etc."
                                        className="sm:col-span-2"
                                    >
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
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
                                            Submit request
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
