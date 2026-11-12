import { ArrowRight } from 'lucide-react';
import ButtonLink from '@/components/site/button-link';
import Container from '@/components/site/container';
import CtaSection from '@/components/site/cta-section';
import PageHero from '@/components/site/page-hero';
import PartnerLogos from '@/components/site/partner-logos';
import SectionHeading from '@/components/site/section-heading';
import {
    ctProgramPath,
    useInfiniteLearningUrl,
} from '@/hooks/use-infinite-learning-url';
import { cn } from '@/lib/utils';
import { advocacy, consulting, contact } from '@/routes';

const values = [
    {
        title: 'Quality over quantity',
        description:
            'We prioritize quality in every solution — from the people we place to the programs we teach.',
    },
    {
        title: 'Carefully selected teams',
        description:
            'We take time to carefully select our technologists so they are the right fit for your facility.',
    },
    {
        title: 'Hands-on onboarding',
        description:
            'On-site, hands-on onboarding of our technologists is our number one priority.',
    },
    {
        title: 'Continuous education',
        description:
            'Our educational platform supports our staff and enhances technologists’ careers.',
    },
];

const divisions = [
    {
        division: 'Infinite Staffing Solutions',
        title: 'Your partner in quality radiology staffing',
        tagline: 'Transforming the radiology staffing experience.',
        body: 'Our core service connects skilled radiologic technologists with hospitals and outpatient imaging centers throughout Los Angeles. We supply professionals across all modalities — from X-ray and MRI to ultrasound and nuclear medicine — ensuring healthcare providers have the expertise they need to deliver exceptional patient care.',
        image: '/images/about-staffing.jpg',
        cta: {
            label: 'Contact Us',
            href: contact({ query: { topic: 'staffing' } }),
        },
    },
    {
        division: 'Infinite Learning Solutions',
        title: 'Advance your career',
        tagline: 'Supplying excellence, while growing in your expertise.',
        body: 'Our CT Program is designed for working technologists who want to expand their skills by specializing in Computed Tomography. With flexible online learning, affordable tuition and hands-on clinical opportunities, we make career growth accessible and achievable — on your schedule.',
        image: '/images/about-learning.jpg',
        cta: { label: 'CT Program Information', learningPath: ctProgramPath },
    },
    {
        division: 'Healthcare Imaging Specialists',
        title: 'Specialized consulting in quality procedures',
        tagline: 'Guiding imaging facilities to peak performance.',
        body: 'We are more than a staffing company — we are a partner in radiology excellence. Working directly with our CEO, Walter McMillan, healthcare organizations improve operations, enhance patient outcomes and implement industry best practices, navigating today’s complex healthcare landscape with clarity and confidence.',
        image: '/images/about-consulting.jpg',
        cta: { label: 'Consulting Information', href: consulting() },
    },
    {
        division: 'Infinite Patient Solutions',
        title: 'Patient advocacy',
        tagline: 'Clarity in care, confidence in decisions.',
        body: 'With over 20 years of healthcare experience, Denise Hill guides patients and families through the healthcare system — helping them understand insurance coverage, benefits and care options while coordinating appointments and ensuring clear communication with providers.',
        image: '/images/about-advocacy.jpg',
        cta: { label: 'Patient Solutions', href: advocacy() },
    },
];

const team = [
    {
        name: 'Walter McMillan',
        role: 'CEO / President',
        image: '/images/team/walter-mcmillan.jpg',
    },
    {
        name: 'Lea McMillan',
        role: 'Chief Operations Coordinator',
        image: '/images/team/lea-mcmillan.jpg',
    },
    {
        name: 'Denise Hill',
        role: 'Executive Operations Coordinator',
        image: '/images/team/denise-hill-portrait.jpeg',
    },
];

export default function About() {
    const learningUrl = useInfiniteLearningUrl();

    return (
        <>
            <PageHero
                eyebrow="About us"
                title="Your partner in infinite healthcare solutions"
                description="We supply our facilities with technologist professionals across all modalities, enhance technologists’ careers with top-of-the-line opportunities and continuous education, and strive to be an extension of your practice rather than a contractor."
                image="/images/about-staffing.jpg"
            />

            <section className="bg-white py-24 sm:py-32">
                <Container>
                    <SectionHeading
                        eyebrow="What guides us"
                        title="Built on quality, care and continuous growth"
                    />
                    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((value, index) => (
                            <div
                                key={value.title}
                                className="rounded-3xl border border-slate-200 p-8"
                            >
                                <p className="font-display text-sm font-bold text-brand-500">
                                    0{index + 1}
                                </p>
                                <h3 className="mt-4 font-display text-lg font-bold text-navy-950">
                                    {value.title}
                                </h3>
                                <p className="mt-2 leading-relaxed text-slate-600">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-slate-50 py-24 sm:py-32">
                <Container className="grid gap-24">
                    {divisions.map((division, index) => (
                        <div
                            key={division.division}
                            className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
                        >
                            <div
                                className={cn(
                                    'relative',
                                    index % 2 === 1 && 'lg:order-last',
                                )}
                            >
                                <div
                                    aria-hidden
                                    className={cn(
                                        'absolute -inset-4 -z-0 rounded-[2rem] bg-linear-to-br from-brand-200/60 to-transparent',
                                        index % 2 === 1 && 'bg-linear-to-bl',
                                    )}
                                />
                                <img
                                    src={division.image}
                                    alt=""
                                    loading="lazy"
                                    className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-semibold tracking-[0.18em] text-brand-600 uppercase">
                                    {division.division}
                                </p>
                                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
                                    {division.title}
                                </h2>
                                <p className="mt-3 text-lg font-medium text-slate-500 italic">
                                    {division.tagline}
                                </p>
                                <p className="mt-6 text-lg leading-relaxed text-slate-600">
                                    {division.body}
                                </p>
                                <ButtonLink
                                    href={
                                        'learningPath' in division.cta
                                            ? learningUrl(
                                                  division.cta.learningPath,
                                              )
                                            : division.cta.href
                                    }
                                    variant="dark"
                                    className="mt-8"
                                >
                                    {division.cta.label}
                                    <ArrowRight />
                                </ButtonLink>
                            </div>
                        </div>
                    ))}
                </Container>
            </section>

            <section className="bg-white py-24 sm:py-32">
                <Container>
                    <SectionHeading
                        align="center"
                        eyebrow="Leadership"
                        title="Meet our team"
                        description="Experienced healthcare leaders dedicated to technologists, facilities and patients."
                    />
                    <ul className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-3">
                        {team.map((member) => (
                            <li key={member.name} className="group text-center">
                                <div className="relative mx-auto aspect-square w-full max-w-72 overflow-hidden rounded-3xl bg-slate-100">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        loading="lazy"
                                        className="size-full object-cover object-top transition duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="mt-6 font-display text-xl font-bold text-navy-950">
                                    {member.name}
                                </h3>
                                <p className="mt-1 text-slate-500">
                                    {member.role}
                                </p>
                            </li>
                        ))}
                    </ul>
                </Container>
            </section>

            <PartnerLogos title="A few of our proud partnerships" />

            <CtaSection
                title="Let’s talk about what you need"
                description="Staffing, education, consulting or advocacy — our team is ready to help."
            >
                <ButtonLink href={contact()} size="lg">
                    Contact Us
                </ButtonLink>
            </CtaSection>
        </>
    );
}
