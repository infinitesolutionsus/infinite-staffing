import { Head } from '@inertiajs/react';
import {
    Activity,
    ArrowRight,
    BadgeCheck,
    CalendarClock,
    ClipboardCheck,
    GraduationCap,
    HeartPulse,
    Magnet,
    Radiation,
    Scan,
    ScanLine,
    ShieldCheck,
    Waves,
} from 'lucide-react';
import ButtonLink from '@/components/site/button-link';
import Container from '@/components/site/container';
import CtaSection from '@/components/site/cta-section';
import PageHero from '@/components/site/page-hero';
import SectionHeading from '@/components/site/section-heading';
import { create as requestStaff } from '@/routes/staff-request';
import { create as joinOurTeam } from '@/routes/technologist-application';

const services = [
    {
        title: 'General X-Ray',
        detail: 'Fluoroscopy, C-Arm',
        icon: Scan,
    },
    {
        title: 'Computed Tomography (CT)',
        icon: ScanLine,
    },
    {
        title: 'Magnetic Resonance Imaging (MRI)',
        icon: Magnet,
    },
    {
        title: 'General Nuclear Medicine',
        icon: Radiation,
    },
    {
        title: 'Positron Emission Tomography',
        detail: 'Oncology, Bracco Cardiac Rubidium certified technologists',
        icon: Activity,
    },
    {
        title: 'Ultrasound',
        detail: 'General, Vascular',
        icon: Waves,
    },
    {
        title: 'Mammography',
        icon: HeartPulse,
    },
    {
        title: 'Cardiac Cath Lab',
        icon: HeartPulse,
    },
    {
        title: 'Applications Training',
        detail: 'PET/CT, Rubidium, Cardiac MRI and more — all major manufacturer platforms',
        icon: GraduationCap,
    },
    {
        title: 'Radiation Safety Officer',
        detail: 'RSO service, including annual quality assurance testing',
        icon: ShieldCheck,
    },
    {
        title: 'ACR Accreditation',
        detail: 'Initial accreditation and renewals',
        icon: BadgeCheck,
    },
];

const steps = [
    {
        title: 'Tell us what you need',
        description:
            'Share the modality, schedule and coverage you need — per diem, short-term or long-term.',
    },
    {
        title: 'We match the right technologist',
        description:
            'We carefully select technologists who are technically proficient and dedicated to patient care.',
    },
    {
        title: 'Hands-on onboarding',
        description:
            'Our on-site, hands-on approach makes onboarding our technologists our number one priority.',
    },
    {
        title: 'Ongoing partnership',
        description:
            'We stay engaged as an extension of your practice — not just a contractor.',
    },
];

export default function Staffing() {
    return (
        <>
            <Head title="Radiology Staffing">
                <meta
                    name="description"
                    content="Radiology staffing across every modality for Los Angeles hospitals and imaging centers — X-ray, CT, MRI, nuclear medicine, PET, ultrasound, mammography and more."
                />
            </Head>

            <PageHero
                eyebrow="Radiology staffing"
                title="We believe in the power behind precision imaging"
                description="We connect healthcare facilities with highly skilled radiologic technologists across every modality — for short-term coverage or long-term placement."
                image="/images/staff-doctor.jpeg"
            >
                <ButtonLink href={requestStaff()} size="lg">
                    Request Staff
                    <ArrowRight />
                </ButtonLink>
                <ButtonLink href={joinOurTeam()} size="lg" variant="ghostLight">
                    Technologist Application
                </ButtonLink>
            </PageHero>

            <section className="bg-white py-24 sm:py-32">
                <Container className="grid items-center gap-16 lg:grid-cols-2">
                    <div>
                        <SectionHeading
                            eyebrow="Why Infinite Solutions"
                            title="The right expertise, right when you need it"
                        />
                        <div className="mt-6 grid gap-5 text-lg leading-relaxed text-slate-600">
                            <p>
                                Our team understands the unique demands of the
                                radiology field. That&rsquo;s why we provide
                                professionals who are not only technically
                                proficient, but also dedicated to delivering
                                exceptional patient care.
                            </p>
                            <p>
                                Whether for short-term coverage or long-term
                                placement, our staffing solutions ensure your
                                facility has the right expertise, right when you
                                need it — while providing our technologists
                                top-of-the-industry opportunities.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="/images/about-staffing.jpg"
                            alt="Radiology team reviewing imaging"
                            loading="lazy"
                            className="col-span-2 aspect-[16/9] w-full rounded-3xl object-cover"
                        />
                        <div className="rounded-3xl bg-brand-50 p-6">
                            <CalendarClock className="size-7 text-brand-600" />
                            <p className="mt-4 font-display font-bold text-navy-950">
                                Short & long-term coverage
                            </p>
                        </div>
                        <div className="rounded-3xl bg-navy-950 p-6">
                            <ClipboardCheck className="size-7 text-brand-300" />
                            <p className="mt-4 font-display font-bold text-white">
                                Carefully vetted technologists
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="bg-slate-50 py-24 sm:py-32">
                <Container>
                    <SectionHeading
                        align="center"
                        eyebrow="Services offered"
                        title="Staffing and support across every modality"
                    />
                    <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <li
                                key={service.title}
                                className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5"
                            >
                                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                                    <service.icon className="size-5" />
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-navy-950">
                                        {service.title}
                                    </h3>
                                    {service.detail && (
                                        <p className="mt-1 text-sm leading-relaxed text-slate-500">
                                            {service.detail}
                                        </p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </Container>
            </section>

            <section className="bg-white py-24 sm:py-32">
                <Container>
                    <SectionHeading
                        eyebrow="How it works"
                        title="A simple, personal staffing process"
                    />
                    <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step, index) => (
                            <li key={step.title} className="relative">
                                <div className="flex items-center gap-4">
                                    <span className="flex size-12 items-center justify-center rounded-full bg-navy-950 font-display text-lg font-bold text-white">
                                        {index + 1}
                                    </span>
                                    <span className="hidden h-px flex-1 bg-slate-200 lg:block" />
                                </div>
                                <h3 className="mt-6 font-display text-lg font-bold text-navy-950">
                                    {step.title}
                                </h3>
                                <p className="mt-2 leading-relaxed text-slate-600">
                                    {step.description}
                                </p>
                            </li>
                        ))}
                    </ol>
                </Container>
            </section>

            <CtaSection
                title="Ready to strengthen your imaging team?"
                description="Facilities can request staff in minutes. Technologists can apply to join our team."
            >
                <ButtonLink href={requestStaff()} size="lg">
                    Request Staff
                </ButtonLink>
                <ButtonLink href={joinOurTeam()} size="lg" variant="ghostLight">
                    Technologist Application
                </ButtonLink>
            </CtaSection>
        </>
    );
}
