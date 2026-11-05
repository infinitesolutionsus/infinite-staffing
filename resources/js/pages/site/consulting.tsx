import {
    ArrowRight,
    BadgeCheck,
    ClipboardList,
    Gauge,
    Radiation,
    Users,
    Workflow,
} from 'lucide-react';
import ButtonLink from '@/components/site/button-link';
import Container from '@/components/site/container';
import CtaSection from '@/components/site/cta-section';
import PageHero from '@/components/site/page-hero';
import SectionHeading from '@/components/site/section-heading';
import { contact } from '@/routes';

const focusAreas = [
    {
        title: 'Operational efficiency',
        description:
            'Improve day-to-day imaging operations and throughput across your department.',
        icon: Gauge,
    },
    {
        title: 'Protocols & workflow',
        description:
            'Strategic solutions with protocols and workflow designed for efficiency and success.',
        icon: Workflow,
    },
    {
        title: 'Best practices',
        description:
            'Implement industry best practices that enhance patient outcomes and safety.',
        icon: ClipboardList,
    },
    {
        title: 'Accreditation support',
        description: 'Guidance through ACR initial accreditation and renewals.',
        icon: BadgeCheck,
    },
    {
        title: 'Radiation safety',
        description:
            'Radiation Safety Officer services, including annual quality assurance testing.',
        icon: Radiation,
    },
    {
        title: 'Team organization',
        description:
            'Organize your facility and staff for consistent, high-quality care.',
        icon: Users,
    },
];

const credentials = ['BSRS', 'R.T.', 'CNMT', '(CT)', '(N)', '(MR)', '(ARRT)'];

const consultationHref = contact({ query: { topic: 'consulting' } });

export default function Consulting() {
    return (
        <>
            <PageHero
                eyebrow="Healthcare Imaging Solutions"
                title="Strategic solutions for radiology success"
                description="We partner with imaging centers, hospitals and healthcare organizations to not just provide quality staff, but to improve operations, enhance patient outcomes and implement industry best practices."
                image="/images/about-consulting.jpg"
            >
                <ButtonLink href={consultationHref} size="lg">
                    Schedule a Consultation
                    <ArrowRight />
                </ButtonLink>
            </PageHero>

            <section className="bg-white py-24 sm:py-32">
                <Container className="grid items-center gap-16 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <div className="relative">
                            <div
                                aria-hidden
                                className="absolute -inset-4 rounded-[2rem] bg-linear-to-br from-brand-200/70 to-transparent"
                            />
                            <img
                                src="/images/team/walter-mcmillan-faculty.jpg"
                                alt="Walter McMillan"
                                className="relative aspect-[4/5] w-full rounded-3xl object-cover object-top shadow-xl"
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <p className="text-sm font-semibold tracking-[0.18em] text-brand-600 uppercase">
                            President / CEO
                        </p>
                        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-navy-950">
                            Walter McMillan
                        </h2>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {credentials.map((credential) => (
                                <li
                                    key={credential}
                                    className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700"
                                >
                                    {credential}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 grid gap-5 text-lg leading-relaxed text-slate-600">
                            <p>
                                Walter McMillan brings decades of experience in
                                the radiology field. As a trusted entrepreneur
                                and consultant, he partners with imaging
                                centers, hospitals and healthcare organizations
                                to not just provide quality staff, but also
                                improve operations, enhance patient outcomes and
                                implement industry best practices.
                            </p>
                            <p>
                                Walter&rsquo;s expertise ensures clients can
                                navigate today&rsquo;s complex healthcare
                                landscape with clarity and confidence. He
                                understands the importance of organization
                                within the facility and offers strategic
                                solutions with protocols and workflow to ensure
                                efficiency and success.
                            </p>
                        </div>
                        <ButtonLink
                            href={consultationHref}
                            variant="dark"
                            className="mt-10"
                        >
                            Schedule a Consultation
                        </ButtonLink>
                    </div>
                </Container>
            </section>

            <section className="bg-slate-50 py-24 sm:py-32">
                <Container>
                    <SectionHeading
                        align="center"
                        eyebrow="Consulting services"
                        title="Guiding imaging facilities to peak performance"
                    />
                    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {focusAreas.map((area) => (
                            <div
                                key={area.title}
                                className="rounded-3xl border border-slate-200 bg-white p-8 transition hover:shadow-xl hover:shadow-navy-950/5"
                            >
                                <div className="flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-brand-400 to-brand-600 text-white shadow-lg shadow-brand-500/30">
                                    <area.icon className="size-6" />
                                </div>
                                <h3 className="mt-6 font-display text-lg font-bold text-navy-950">
                                    {area.title}
                                </h3>
                                <p className="mt-2 leading-relaxed text-slate-600">
                                    {area.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <CtaSection
                title="Let’s elevate your imaging department"
                description="Schedule a consultation to discuss your facility’s goals."
            >
                <ButtonLink href={consultationHref} size="lg">
                    Schedule a Consultation
                </ButtonLink>
            </CtaSection>
        </>
    );
}
