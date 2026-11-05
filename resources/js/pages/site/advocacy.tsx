import {
    ArrowRight,
    BookOpen,
    CalendarCheck,
    Compass,
    HandHeart,
    MessagesSquare,
    ShieldCheck,
    UserRoundCheck,
    Users,
} from 'lucide-react';
import ButtonLink from '@/components/site/button-link';
import Container from '@/components/site/container';
import CtaSection from '@/components/site/cta-section';
import PageHero from '@/components/site/page-hero';
import SectionHeading from '@/components/site/section-heading';
import { contact } from '@/routes';

const services = [
    {
        title: 'Appointment Coordination',
        description:
            'Scheduling, reminders and follow-up support to keep care on track.',
        icon: CalendarCheck,
    },
    {
        title: 'Insurance Guidance',
        description:
            'Helping patients understand coverage, benefits and out-of-pocket costs.',
        icon: ShieldCheck,
    },
    {
        title: 'Provider Communication Support',
        description:
            'Preparing questions, taking notes and ensuring patients fully understand medical recommendations.',
        icon: MessagesSquare,
    },
    {
        title: 'Care Navigation',
        description:
            'Guiding patients through referrals, specialist visits and care transitions.',
        icon: Compass,
    },
    {
        title: 'Patient Education',
        description:
            'Explaining treatment plans, medical terminology and available resources in plain language.',
        icon: BookOpen,
    },
    {
        title: 'Family Support',
        description:
            'Keeping loved ones informed and engaged in the patient’s care journey.',
        icon: Users,
    },
    {
        title: 'Advocacy at Appointments',
        description:
            'Serving as a trusted partner during in-person or virtual visits.',
        icon: UserRoundCheck,
    },
    {
        title: 'Community Resource Connection',
        description:
            'Linking patients with local programs, support groups or wellness services.',
        icon: HandHeart,
    },
];

const advocacyHref = contact({ query: { topic: 'advocacy' } });

export default function Advocacy() {
    return (
        <>
            <PageHero
                eyebrow="Infinite Patient Solutions"
                title="Clarity in care, confidence in decisions"
                description="Our healthcare advocacy program helps patients and families navigate the complexities of the healthcare system — making care more accessible, understandable and compassionate."
                image="/images/about-advocacy.jpg"
            >
                <ButtonLink href={advocacyHref} size="lg">
                    Schedule a Consultation
                    <ArrowRight />
                </ButtonLink>
            </PageHero>

            <section className="bg-white py-24 sm:py-32">
                <Container className="grid items-start gap-16 lg:grid-cols-12">
                    <div className="lg:sticky lg:top-32 lg:col-span-5">
                        <div className="relative">
                            <div
                                aria-hidden
                                className="absolute -inset-4 rounded-[2rem] bg-linear-to-br from-brand-200/70 to-transparent"
                            />
                            <img
                                src="/images/team/denise-hill-portrait.jpeg"
                                alt="Denise Hill"
                                className="relative aspect-[4/5] w-full rounded-3xl object-cover object-top shadow-xl"
                            />
                        </div>
                        <blockquote className="mt-10 border-l-4 border-brand-500 pl-6 font-display text-xl font-semibold text-navy-950">
                            &ldquo;Her mission is simple: to bridge the gap
                            between patients and providers.&rdquo;
                        </blockquote>
                    </div>
                    <div className="lg:col-span-7">
                        <p className="text-sm font-semibold tracking-[0.18em] text-brand-600 uppercase">
                            Head of Patient Advocacy
                        </p>
                        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-navy-950">
                            Denise Hill
                        </h2>
                        <div className="mt-8 grid gap-5 text-lg leading-relaxed text-slate-600">
                            <p>
                                Denise Hill brings over 20 years of experience
                                in healthcare operations, patient services and
                                staff management to her role as a Healthcare
                                Advocate with Infinite Staffing Solutions. Her
                                career began in direct patient care as a Nursing
                                Assistant, followed by extensive administrative
                                and supervisory roles in hospitals, imaging
                                centers and behavioral health practices.
                            </p>
                            <p>
                                As Office Manager at Resolution Imaging/RadNet
                                in Santa Monica, Denise oversaw daily operations
                                across two facilities, managed patient
                                scheduling, insurance authorizations and
                                compliance, and supported oncology physicians
                                with data collection to guide treatment
                                decisions. Her hands-on experience coordinating
                                care and navigating insurance processes gives
                                her a deep understanding of the challenges
                                patients face when trying to access quality
                                healthcare.
                            </p>
                            <p>
                                She has also served in leadership and executive
                                support roles — managing staff, coordinating
                                payroll, and handling compliance and HR
                                functions. This blend of patient-centered care
                                and strategic operations expertise uniquely
                                equips her to advocate for patients and
                                families.
                            </p>
                            <p>
                                Through our Healthcare Advocacy program, Denise
                                helps clients coordinate appointments,
                                understand their insurance coverage, benefits
                                and care options, and ensures clear
                                communication with providers — making healthcare
                                more accessible, understandable and
                                compassionate.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="bg-slate-50 py-24 sm:py-32">
                <Container>
                    <SectionHeading
                        align="center"
                        eyebrow="Healthcare advocacy services"
                        title="Support at every step of the care journey"
                    />
                    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {services.map((service) => (
                            <div
                                key={service.title}
                                className="rounded-3xl border border-slate-200 bg-white p-7 transition hover:shadow-xl hover:shadow-navy-950/5"
                            >
                                <div className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                                    <service.icon className="size-5" />
                                </div>
                                <h3 className="mt-5 font-display font-bold text-navy-950">
                                    {service.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <CtaSection
                title="Healthcare is easier with an advocate by your side"
                description="Apply for the program or schedule a consultation with our advocacy team."
            >
                <ButtonLink href={advocacyHref} size="lg">
                    Apply for the Program
                </ButtonLink>
            </CtaSection>
        </>
    );
}
