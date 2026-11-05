import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Award,
    BookOpenCheck,
    Building2,
    GraduationCap,
    HeartHandshake,
    Microscope,
    ScanLine,
    Stethoscope,
    UserRoundCheck,
    Users,
} from 'lucide-react';
import ButtonLink from '@/components/site/button-link';
import Container from '@/components/site/container';
import CtaSection from '@/components/site/cta-section';
import PartnerLogos from '@/components/site/partner-logos';
import SectionHeading from '@/components/site/section-heading';
import { modalities } from '@/lib/site';
import {
    about,
    advocacy,
    consulting,
    contact,
    ctProgram,
    staffing,
} from '@/routes';

const contactStaffing = contact({ query: { topic: 'staffing' } });

const services = [
    {
        title: 'Radiology Staffing',
        description:
            'We connect top-tier radiologic technologists with leading hospitals and imaging centers across Los Angeles, ensuring every patient receives expert, compassionate care.',
        image: '/images/about-staffing.jpg',
        href: staffing(),
        icon: Users,
    },
    {
        title: 'CT Certification Program',
        description:
            'Designed for working technologists, our flexible and affordable program helps you earn your CT certification and take your career to the next level.',
        image: '/images/about-learning.jpg',
        href: ctProgram(),
        icon: GraduationCap,
    },
    {
        title: 'Radiology Consulting',
        description:
            'Strategic insight and hands-on guidance to optimize imaging operations, boost efficiency and elevate patient outcomes.',
        image: '/images/about-consulting.jpg',
        href: consulting(),
        icon: Microscope,
    },
    {
        title: 'Healthcare Advocacy',
        description:
            'Board certified patient advocates who guide and support patients through every decision — making care simple and efficient.',
        image: '/images/about-advocacy.jpg',
        href: advocacy(),
        icon: HeartHandshake,
    },
];

const pillars = [
    {
        title: 'Staffing Solutions',
        description:
            'Short-term coverage or long-term placement with carefully selected technologists.',
        icon: UserRoundCheck,
    },
    {
        title: 'Technologist Training',
        description:
            'On-site, hands-on onboarding so every technologist is ready from day one.',
        icon: Stethoscope,
    },
    {
        title: 'Continued Education',
        description:
            'Advanced certification pathways and CE opportunities that grow careers.',
        icon: BookOpenCheck,
    },
    {
        title: 'Diagnostic Solutions',
        description:
            'Protocols, workflow and accreditation support for high-performing imaging departments.',
        icon: ScanLine,
    },
];

const stats = [
    { value: '100%', label: 'Board review pass rate' },
    { value: '25+', label: 'Years of radiology leadership' },
    { value: '10+', label: 'Imaging modalities staffed' },
    { value: '8+', label: 'SoCal clinical affiliates' },
];

export default function Home() {
    return (
        <>
            <Head title="Radiology Staffing, CT Certification & Consulting">
                <meta
                    name="description"
                    content="Infinite Staffing Solutions connects Los Angeles hospitals and imaging centers with skilled radiologic technologists, and helps technologists grow through CT certification, consulting and patient advocacy."
                />
            </Head>

            {/* Hero */}
            <section className="relative isolate overflow-hidden bg-navy-950 pt-36 pb-24 sm:pt-44 lg:pb-32">
                <img
                    src="/images/ct-scanner.jpeg"
                    alt=""
                    className="absolute inset-0 -z-20 size-full object-cover opacity-25"
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-br from-navy-950 via-navy-950/95 to-navy-900/70" />
                <div
                    aria-hidden
                    className="absolute top-1/3 -right-40 -z-10 size-[40rem] rounded-full bg-brand-500/25 blur-3xl"
                />
                <Container className="grid items-center gap-16 lg:grid-cols-2">
                    <div>
                        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-brand-200 uppercase backdrop-blur">
                            <span className="size-1.5 animate-pulse rounded-full bg-brand-400" />
                            Staff. Train. Excel.
                        </p>
                        <h1 className="font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-white sm:text-6xl">
                            Empowering healthcare professionals.{' '}
                            <span className="bg-linear-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
                                Transforming patient care.
                            </span>
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
                            We&rsquo;re shaping the future of healthcare — one
                            professional, one program, and one partnership at a
                            time. From staffing and education to consulting and
                            advocacy, we support excellence in every corner of
                            the field.
                        </p>
                        <div className="mt-10 flex flex-wrap gap-3">
                            <ButtonLink href={contactStaffing} size="lg">
                                Contact Us
                                <ArrowRight />
                            </ButtonLink>
                            <ButtonLink
                                href={ctProgram()}
                                size="lg"
                                variant="ghostLight"
                            >
                                Explore the CT Program
                            </ButtonLink>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                        <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40">
                            <img
                                src="/images/about-staffing.jpg"
                                alt="Radiology team reviewing an x-ray"
                                className="aspect-[4/3] w-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-8 -left-4 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-xl sm:-left-8">
                            <div className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                                <Award className="size-6" />
                            </div>
                            <div>
                                <p className="font-display text-2xl font-extrabold text-navy-950">
                                    100%
                                </p>
                                <p className="text-sm text-slate-500">
                                    Board review pass rate
                                </p>
                            </div>
                        </div>
                        <div className="absolute -top-6 -right-2 hidden items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur sm:flex">
                            <Building2 className="size-5 text-brand-600" />
                            <p className="text-sm font-semibold text-navy-950">
                                Serving Los Angeles facilities
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Stats */}
            <section className="relative z-10 -mt-10">
                <Container>
                    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-slate-200 shadow-xl shadow-navy-950/5 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="bg-white px-6 py-8 text-center"
                            >
                                <dt className="text-sm text-slate-500">
                                    {stat.label}
                                </dt>
                                <dd className="order-first font-display text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </Container>
            </section>

            {/* Services */}
            <section className="bg-white py-24 sm:py-32">
                <Container>
                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <SectionHeading
                            eyebrow="What we do"
                            title="One partner for staffing, education, consulting and advocacy"
                            description="Four specialized divisions working together to support facilities, technologists and patients."
                        />
                        <ButtonLink href={about()} variant="outline">
                            About Infinite Solutions
                        </ButtonLink>
                    </div>

                    <div className="mt-14 grid gap-6 md:grid-cols-2">
                        {services.map((service) => (
                            <Link
                                key={service.title}
                                href={service.href}
                                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-500/10 sm:flex-row"
                            >
                                <div className="relative h-56 shrink-0 overflow-hidden sm:h-auto sm:w-2/5">
                                    <img
                                        src={service.image}
                                        alt=""
                                        loading="lazy"
                                        className="size-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col p-7">
                                    <div className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                                        <service.icon className="size-5" />
                                    </div>
                                    <h3 className="mt-5 font-display text-xl font-bold text-navy-950">
                                        {service.title}
                                    </h3>
                                    <p className="mt-3 flex-1 leading-relaxed text-slate-600">
                                        {service.description}
                                    </p>
                                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                                        Learn more
                                        <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Modalities */}
            <section className="relative isolate overflow-hidden bg-navy-950 py-24 sm:py-28">
                <div
                    aria-hidden
                    className="absolute -top-32 left-1/2 -z-10 size-[44rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl"
                />
                <Container className="grid items-center gap-14 lg:grid-cols-2">
                    <div>
                        <SectionHeading
                            tone="dark"
                            eyebrow="Every modality"
                            title="Precision imaging needs the right expertise — right when you need it"
                            description="From X-ray and MRI to ultrasound and nuclear medicine, we supply technologists who are technically proficient and dedicated to exceptional patient care. We strive to be an extension of your practice, not a contractor."
                        />
                        <div className="mt-10 flex flex-wrap gap-3">
                            <ButtonLink href={staffing()} variant="light">
                                View staffing services
                            </ButtonLink>
                        </div>
                    </div>
                    <ul className="flex flex-wrap gap-3">
                        {modalities.map((modality) => (
                            <li
                                key={modality}
                                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-brand-400 hover:bg-brand-500/20"
                            >
                                {modality}
                            </li>
                        ))}
                    </ul>
                </Container>
            </section>

            {/* Pillars */}
            <section className="bg-slate-50 py-24 sm:py-32">
                <Container>
                    <SectionHeading
                        align="center"
                        eyebrow="Our approach"
                        title="Supplying excellence while growing expertise"
                        description="Quality over quantity in everything we do — from the technologists we place to the education we provide."
                    />
                    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {pillars.map((pillar) => (
                            <div
                                key={pillar.title}
                                className="rounded-3xl border border-slate-200 bg-white p-8 transition hover:shadow-xl hover:shadow-navy-950/5"
                            >
                                <div className="flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-brand-400 to-brand-600 text-white shadow-lg shadow-brand-500/30">
                                    <pillar.icon className="size-6" />
                                </div>
                                <h3 className="mt-6 font-display text-lg font-bold text-navy-950">
                                    {pillar.title}
                                </h3>
                                <p className="mt-2 leading-relaxed text-slate-600">
                                    {pillar.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Audiences */}
            <section className="bg-white py-24 sm:py-32">
                <Container className="grid gap-6 lg:grid-cols-2">
                    <div className="relative isolate flex flex-col overflow-hidden rounded-3xl bg-brand-50 p-10 sm:p-12">
                        <Building2 className="size-10 text-brand-600" />
                        <h3 className="mt-6 font-display text-2xl font-bold text-navy-950 sm:text-3xl">
                            For hospitals & imaging centers
                        </h3>
                        <p className="mt-4 flex-1 text-lg leading-relaxed text-slate-600">
                            Tell us what you need and we&rsquo;ll match you with
                            carefully selected technologists — onboarded on site
                            with a hands-on approach.
                        </p>
                        <div className="mt-8">
                            <ButtonLink href={contactStaffing}>
                                Contact us
                                <ArrowRight />
                            </ButtonLink>
                        </div>
                    </div>
                    <div className="relative isolate flex flex-col overflow-hidden rounded-3xl bg-navy-950 p-10 sm:p-12">
                        <div
                            aria-hidden
                            className="absolute -right-20 -bottom-20 -z-10 size-72 rounded-full bg-brand-500/30 blur-3xl"
                        />
                        <GraduationCap className="size-10 text-brand-300" />
                        <h3 className="mt-6 font-display text-2xl font-bold text-white sm:text-3xl">
                            For radiologic technologists
                        </h3>
                        <p className="mt-4 flex-1 text-lg leading-relaxed text-slate-300">
                            Top-of-the-industry opportunities, continuous
                            education and a flexible path to your ARRT (CT)
                            credential.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <ButtonLink href={ctProgram()} variant="light">
                                CT Certification Program
                            </ButtonLink>
                        </div>
                    </div>
                </Container>
            </section>

            <PartnerLogos />

            <CtaSection
                title="Let’s build a stronger imaging team together"
                description="Whether you need coverage next week or a long-term partner, our team is ready to help."
            >
                <ButtonLink href={contactStaffing} size="lg">
                    Contact Us
                </ButtonLink>
            </CtaSection>
        </>
    );
}
