import { Form, Head } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { store } from '@/actions/App/Http/Controllers/ContactController';
import { buttonLinkVariants } from '@/components/site/button-link';
import Container from '@/components/site/container';
import FormField, { inputClassName } from '@/components/site/form-field';
import FormSuccess from '@/components/site/form-success';
import PageHero from '@/components/site/page-hero';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { company } from '@/lib/site';

type ContactProps = {
    topics: { value: string; label: string }[];
    selectedTopic: string;
};

const contactMethods = [
    {
        label: 'Call us',
        value: company.phone,
        href: company.phoneHref,
        icon: Phone,
    },
    {
        label: 'Email us',
        value: company.email,
        href: `mailto:${company.email}`,
        icon: Mail,
    },
    {
        label: 'Visit us',
        value: company.addressLines.join(', '),
        href: company.mapUrl,
        icon: MapPin,
    },
];

/** How long typing must pause before an invalid field is re-checked. */
const REVALIDATE_MS = 500;

export default function Contact({ topics, selectedTopic }: ContactProps) {
    // One timer per field, so typing in one never cancels another's check.
    const revalidateTimers = useRef<
        Record<string, ReturnType<typeof setTimeout>>
    >({});

    useEffect(() => {
        const timers = revalidateTimers.current;

        return () => Object.values(timers).forEach(clearTimeout);
    }, []);

    return (
        <>
            <Head title="Contact Us">
                <meta
                    name="description"
                    content="Contact Infinite Staffing Solutions about radiology staffing, the CT certification program, consulting or healthcare advocacy."
                />
            </Head>

            <PageHero
                eyebrow="Contact us"
                title="We’d love to hear from you"
                description="Whether you’re a facility looking for skilled technologists or consulting services, a technologist interested in joining our team, curious about continued education, or interested in our healthcare advocacy program — our team is ready to help."
            />

            <section className="bg-slate-50 py-20 sm:py-24">
                <Container className="grid gap-10 lg:grid-cols-12">
                    <div className="grid content-start gap-4 lg:col-span-4">
                        {contactMethods.map((method) => (
                            <a
                                key={method.label}
                                href={method.href}
                                target={
                                    method.icon === MapPin
                                        ? '_blank'
                                        : undefined
                                }
                                rel="noreferrer"
                                className="group flex gap-4 rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-brand-300 hover:shadow-lg hover:shadow-brand-500/5"
                            >
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                                    <method.icon className="size-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm text-slate-500">
                                        {method.label}
                                    </p>
                                    <p className="mt-1 font-semibold break-words text-navy-950">
                                        {method.value}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-navy-950/5 sm:p-10 lg:col-span-8">
                        <h2 className="font-display text-2xl font-bold text-navy-950">
                            Get in touch
                        </h2>
                        <p className="mt-2 text-slate-600">
                            Fill out the form below and we&rsquo;ll get back to
                            you promptly.
                        </p>

                        <Form
                            {...store.form()}
                            noValidate
                            resetOnSuccess
                            options={{ preserveScroll: true }}
                            className="mt-8 grid gap-6 sm:grid-cols-2"
                        >
                            {({
                                errors,
                                processing,
                                wasSuccessful,
                                validate,
                            }) => {
                                // Leaving a field asks the server about that field only.
                                const validateField = (field: string) => {
                                    clearTimeout(
                                        revalidateTimers.current[field],
                                    );
                                    validate({ only: [field] });
                                };

                                // While a field shows an error, re-check it as the user
                                // types (debounced) so the error clears once it's fixed.
                                const revalidateIfInvalid = (field: string) => {
                                    if (
                                        errors[field as keyof typeof errors] ===
                                        undefined
                                    ) {
                                        return;
                                    }

                                    clearTimeout(
                                        revalidateTimers.current[field],
                                    );
                                    revalidateTimers.current[field] =
                                        setTimeout(
                                            () => validateField(field),
                                            REVALIDATE_MS,
                                        );
                                };

                                // Blur and change bubble, so one handler covers every field.
                                const relay =
                                    (handler: (field: string) => void) =>
                                    (event: { target: EventTarget | null }) => {
                                        const field = (
                                            event.target as HTMLInputElement | null
                                        )?.name;

                                        if (field) {
                                            handler(field);
                                        }
                                    };

                                return (
                                    <div
                                        className="contents"
                                        onBlur={relay(validateField)}
                                        onChange={relay(revalidateIfInvalid)}
                                    >
                                        {wasSuccessful && (
                                            <div className="sm:col-span-2">
                                                <FormSuccess
                                                    title="Message sent"
                                                    message="Thanks for reaching out! A member of our team will be in touch shortly."
                                                />
                                            </div>
                                        )}

                                        <FormField
                                            label="Your name"
                                            htmlFor="name"
                                            required
                                            error={errors.name}
                                        >
                                            <input
                                                id="name"
                                                name="name"
                                                autoComplete="name"
                                                aria-invalid={!!errors.name}
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
                                                aria-invalid={!!errors.email}
                                                className={inputClassName}
                                            />
                                        </FormField>

                                        <FormField
                                            label="Phone number"
                                            htmlFor="phone"
                                            error={errors.phone}
                                        >
                                            <input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                autoComplete="tel"
                                                aria-invalid={!!errors.phone}
                                                className={inputClassName}
                                            />
                                        </FormField>

                                        <FormField
                                            label="How can we help?"
                                            htmlFor="topic"
                                            required
                                            error={errors.topic}
                                        >
                                            <Select
                                                name="topic"
                                                defaultValue={selectedTopic}
                                                onValueChange={() =>
                                                    validateField('topic')
                                                }
                                            >
                                                <SelectTrigger
                                                    id="topic"
                                                    aria-invalid={
                                                        !!errors.topic
                                                    }
                                                    className="h-auto w-full cursor-pointer rounded-xl border-slate-300 bg-white px-4 py-3 text-base text-navy-950 transition focus-visible:border-brand-500 focus-visible:ring-4 focus-visible:ring-brand-500/15 aria-invalid:border-red-400 data-[size=default]:h-auto sm:text-sm"
                                                >
                                                    <SelectValue placeholder="Choose a topic" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl border-slate-200 bg-white font-display text-navy-950 shadow-xl shadow-navy-950/10">
                                                    {topics.map((topic) => (
                                                        <SelectItem
                                                            key={topic.value}
                                                            value={topic.value}
                                                            className="cursor-pointer rounded-lg py-2.5 pl-3 text-sm focus:bg-brand-50 focus:text-navy-950"
                                                        >
                                                            {topic.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormField>

                                        <FormField
                                            label="Message"
                                            htmlFor="message"
                                            required
                                            error={errors.message}
                                            className="sm:col-span-2"
                                        >
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={6}
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
                                                Send message
                                            </button>
                                        </div>
                                    </div>
                                );
                            }}
                        </Form>
                    </div>
                </Container>
            </section>
        </>
    );
}
