import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    BookOpenCheck,
    Check,
    ChevronDown,
    Hospital,
    MonitorPlay,
    Trophy,
} from 'lucide-react';
import ButtonLink from '@/components/site/button-link';
import CheckList from '@/components/site/check-list';
import Container from '@/components/site/container';
import CtaSection from '@/components/site/cta-section';
import PageHero from '@/components/site/page-hero';
import SectionHeading from '@/components/site/section-heading';
import { cn } from '@/lib/utils';
import { contact, newsletter } from '@/routes';
import { curriculum } from '@/routes/ct-program';

const questionsHref = contact({ query: { topic: 'ct-program' } });
const enrollHref = questionsHref;

const sectionLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'tuition', label: 'Tuition' },
    { id: 'faculty', label: 'Faculty' },
    { id: 'faq', label: 'FAQ' },
];

const highlights = [
    { value: '100%', label: 'Board review pass rate' },
    { value: '8', label: 'Self-paced study modules' },
    { value: '3–6', label: 'Months to complete' },
    { value: 'SoCal', label: 'Guaranteed clinical placement' },
];

const differentiators = [
    'A proven Board Review Program with a 100% pass rate',
    'Flexible, self-paced study modules designed for busy professionals',
    'Weekly board review sessions (live and recorded) with expert faculty',
    'Guaranteed placement at one of our clinical affiliates in Southern California to complete your ARRT-required examinations',
];

const steps = [
    'Enroll in our program',
    'Complete the 8 study modules — one per week is suggested, but you control the schedule',
    'Join weekly board review sessions (live and on-demand)',
    'Onboard at a clinical affiliate site to complete ARRT-required exams',
    'Sit for your boards and launch your career as a certified CT Technologist',
];

const schedule = [
    {
        title: 'Board Review Course',
        subtitle: 'Didactic',
        icon: MonitorPlay,
        items: [
            'Self-paced modules available online',
            '8 live/recorded review sessions led by experienced faculty',
        ],
    },
    {
        title: 'Clinical Training',
        subtitle: 'Hands-on',
        icon: Hospital,
        items: [
            'Placement with one of our trusted clinical affiliates',
            'Hands-on experience completing required ARRT CT exams',
        ],
    },
    {
        title: 'Board Preparation',
        subtitle: 'Exam ready',
        icon: Trophy,
        items: ['Ongoing support until you sit for (and pass) your exam'],
    },
];

const packages = [
    {
        value: 'complete',
        name: 'Complete CT Program',
        price: '$1,995',
        description: 'Board Review + Exam Prep + Clinical Placement',
        features: [
            'Online didactic modules',
            'Weekly board review sessions',
            'Guaranteed clinical placement',
            'Exam prep & ARRT application support',
        ],
        featured: true,
    },
    {
        value: 'board-review',
        name: 'Board Review + Exam Prep',
        price: '$550',
        description: 'For those who already have a clinical site',
        features: [
            'Weekly board review sessions',
            'Exam prep support',
            'Recorded sessions on demand',
        ],
        featured: false,
    },
    {
        value: 'clinical-site',
        name: 'Clinical Site Only',
        price: '$1,495',
        description:
            'Didactic requirements completed — clinical placement only',
        features: [
            'Placement at a clinical affiliate',
            'Competency documentation support',
            'Verification of completed exams',
        ],
        featured: false,
    },
];

const whyChoose = [
    '100% Board Exam Pass Rate (proven track record)',
    'Partnerships with top clinical affiliates for guaranteed placement',
    'Accredited, proprietary curriculum designed with working professionals in mind',
    'Expert faculty with real-world experience across multiple imaging modalities',
    'Flexible, affordable options tailored to your career path',
];

const clinicalAffiliates = [
    'Adventist Health White Memorial',
    'Adventist Health Montebello',
    'Providence Little Company of Mary',
    'Cedars-Sinai Marina del Rey Hospital',
    'Southern California Medical Imaging (Santa Monica)',
    'Tower Imaging Valencia',
    'Tower Imaging St. John’s',
    'Beverly Hills Medical Imaging',
];

const timeline = [
    {
        title: 'Enrollment & onboarding',
        description:
            'You’re officially registered and receive onboarding communication outlining next steps, expectations and required documentation.',
    },
    {
        title: 'Didactic coursework',
        description:
            'Within 5–10 business days you’re enrolled with our academic partner, Medical Imaging Consultants (MIC) — an ARRT- and ASRT-recognized provider. Eight accredited modules, mailed course materials and up to six months to complete.',
    },
    {
        title: 'Academic support',
        description:
            'Instructor-led lectures, guided reviews, concept clarification and exam preparation sessions throughout the program.',
    },
    {
        title: 'Clinical education',
        description:
            'Coordinated through our approved network of imaging facilities, including placement, documentation and verification of competencies to meet ARRT and state requirements.',
    },
    {
        title: 'Exam readiness',
        description:
            'We guide you through final exam readiness and the ARRT application process — emphasizing readiness over speed.',
    },
];

const faqs = [
    {
        question: 'What is this CT certification program?',
        answer: 'A structured pathway that helps x-ray techs become certified in Computed Tomography (CT) without returning to a university program. It combines an online board review course — which also satisfies your required CEUs for the biennium — with hands-on clinical experience through our partnering sites.',
    },
    {
        question: 'Who is this program for?',
        answer: 'ARRT-certified radiologic technologists (RTs) and Nuclear Medicine technologists (both ARRT and NMTCB) who are looking to advance their careers by adding CT certification.',
    },
    {
        question:
            'Do I need to go back to school or enroll in a university CT program?',
        answer: 'No! Our program allows you to complete all of your didactic education online and gain the required clinical experience directly with us.',
    },
    {
        question: 'What are the steps to getting certified?',
        answer: 'Enroll in a partnered online CT prep course, attend weekly board review sessions, complete your clinical hours at one of our accredited sites, then apply for and pass your ARRT CT registry exam.',
    },
    {
        question: 'How much does the program cost?',
        answer: 'Pricing depends on the package you choose: the Complete CT Program is $1,995, Board Review + Exam Prep is $550, and Clinical Site Only is $1,495. Contact us to discuss payment options.',
    },
    {
        question: 'How long does the program take to complete?',
        answer: 'Most participants complete the program in 3–6 months, depending on clinical availability and personal schedules. The more time you can dedicate, the faster it can be completed.',
    },
    {
        question: 'Where will I complete my clinical training?',
        answer: 'Clinical training is offered through participating medical sites affiliated with Infinite Staffing Solutions. Locations vary — please contact us for current availability.',
    },
    {
        question: 'Are the weekly board review sessions required?',
        answer: 'While not mandatory, the board review sessions are highly encouraged to fully prepare you for the ARRT CT registry exam.',
    },
    {
        question: 'What platform do you use for the board reviews?',
        answer: 'We host weekly live Zoom sessions. Recordings are made available afterward so you can review at your convenience.',
    },
    {
        question: 'Can I work while completing the program?',
        answer: 'Yes! Our flexible clinical scheduling allows you to continue working while training. Many students complete their hours during weekends or off-shifts.',
    },
    {
        question: 'What happens after I complete the program?',
        answer: 'Once you’ve completed the online course and clinical requirements, you’ll be eligible to sit for the ARRT CT registry exam. We’ll provide support to help you prepare and apply.',
    },
    {
        question: 'How do I enroll?',
        answer: 'Choose a package in the Tuition section and click “Enroll” to create your student account and complete the six-step registration. Questions first? Send us a message and our team will walk you through it.',
    },
];

export default function CtProgram() {
    return (
        <>
            <PageHero
                eyebrow="Infinite Learning Solutions · Post Primary Academy"
                title="Earn your CT certification. Advance your career."
                description="A CT training course designed for working radiologic technologists — combining flexible online learning, weekly board reviews and guaranteed clinical placement."
                image="/images/ct-scanner.jpeg"
            >
                <ButtonLink href={enrollHref} size="lg">
                    Enroll in the CT Course
                    <ArrowRight />
                </ButtonLink>
                <ButtonLink href={curriculum()} size="lg" variant="ghostLight">
                    View Curriculum
                </ButtonLink>
            </PageHero>

            <nav className="sticky top-20 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-lg">
                <Container className="flex gap-1 overflow-x-auto py-3">
                    {sectionLinks.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
                        >
                            {link.label}
                        </a>
                    ))}
                </Container>
            </nav>

            <section id="overview" className="bg-white py-24 sm:py-28">
                <Container>
                    <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {highlights.map((highlight) => (
                            <div
                                key={highlight.label}
                                className="rounded-3xl bg-brand-50 p-6 text-center"
                            >
                                <dt className="text-sm text-slate-600">
                                    {highlight.label}
                                </dt>
                                <dd className="order-first font-display text-3xl font-extrabold text-navy-950">
                                    {highlight.value}
                                </dd>
                            </div>
                        ))}
                    </dl>

                    <div className="mt-20 grid gap-16 lg:grid-cols-2">
                        <div>
                            <SectionHeading
                                eyebrow="Program overview"
                                title="Designed for working technologists ready for the next step"
                            />
                            <div className="mt-6 grid gap-5 text-lg leading-relaxed text-slate-600">
                                <p>
                                    Infinite Learning Solutions is a
                                    post-primary educational institution
                                    providing educational programs in medical
                                    imaging. By earning an advanced
                                    certification in Computed Tomography, you
                                    not only enhance your skill set but also
                                    bring significant value to your radiology
                                    department as a multi-modality technologist.
                                </p>
                                <p>
                                    We&rsquo;ve partnered with clinical
                                    affiliates and structured education
                                    providers to offer a complete solution that
                                    satisfies both the didactic and clinical
                                    requirements established by the ARRT.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-3xl border border-slate-200 p-8 sm:p-10">
                            <h3 className="font-display text-xl font-bold text-navy-950">
                                What sets us apart
                            </h3>
                            <CheckList
                                items={differentiators}
                                className="mt-6"
                            />
                        </div>
                    </div>
                </Container>
            </section>

            <section id="how-it-works" className="bg-navy-950 py-24 sm:py-28">
                <Container>
                    <SectionHeading
                        tone="dark"
                        eyebrow="How it works"
                        title="Five steps to your CT credential"
                    />
                    <ol className="mt-14 grid gap-4 md:grid-cols-5">
                        {steps.map((step, index) => (
                            <li
                                key={step}
                                className="rounded-3xl border border-white/10 bg-white/5 p-6"
                            >
                                <span className="font-display text-4xl font-extrabold text-brand-400">
                                    {index + 1}
                                </span>
                                <p className="mt-4 leading-relaxed text-slate-200">
                                    {step}
                                </p>
                            </li>
                        ))}
                    </ol>
                </Container>
            </section>

            <section id="schedule" className="bg-slate-50 py-24 sm:py-28">
                <Container>
                    <SectionHeading
                        align="center"
                        eyebrow="Program schedule"
                        title="Built around the life of a working technologist"
                        description="All live sessions are recorded and available for review on your own time."
                    />
                    <div className="mt-14 grid gap-6 md:grid-cols-3">
                        {schedule.map((block) => (
                            <div
                                key={block.title}
                                className="rounded-3xl border border-slate-200 bg-white p-8"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-brand-400 to-brand-600 text-white shadow-lg shadow-brand-500/30">
                                        <block.icon className="size-6" />
                                    </div>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                        {block.subtitle}
                                    </span>
                                </div>
                                <h3 className="mt-6 font-display text-xl font-bold text-navy-950">
                                    {block.title}
                                </h3>
                                <CheckList
                                    items={block.items}
                                    className="mt-4"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-20">
                        <h3 className="text-center font-display text-2xl font-bold text-navy-950">
                            Once you&rsquo;re enrolled
                        </h3>
                        <ol className="relative mx-auto mt-10 max-w-3xl border-l-2 border-brand-200 pl-8">
                            {timeline.map((item, index) => (
                                <li
                                    key={item.title}
                                    className="relative pb-10 last:pb-0"
                                >
                                    <span className="absolute top-0 -left-[2.6rem] flex size-8 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white ring-4 ring-slate-50">
                                        {index + 1}
                                    </span>
                                    <h4 className="font-display text-lg font-bold text-navy-950">
                                        {item.title}
                                    </h4>
                                    <p className="mt-2 leading-relaxed text-slate-600">
                                        {item.description}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </Container>
            </section>

            <section id="tuition" className="bg-white py-24 sm:py-28">
                <Container>
                    <SectionHeading
                        align="center"
                        eyebrow="Tuition & program options"
                        title="Flexible packages to meet your needs"
                    />
                    <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.name}
                                className={cn(
                                    'relative flex flex-col rounded-3xl p-8 sm:p-10',
                                    pkg.featured
                                        ? 'bg-navy-950 text-white shadow-2xl shadow-navy-950/30 lg:-my-4 lg:py-14'
                                        : 'border border-slate-200 bg-white',
                                )}
                            >
                                {pkg.featured && (
                                    <span className="absolute top-6 right-6 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                                        Most popular
                                    </span>
                                )}
                                <h3
                                    className={cn(
                                        'font-display text-xl font-bold',
                                        pkg.featured
                                            ? 'text-white'
                                            : 'text-navy-950',
                                    )}
                                >
                                    {pkg.name}
                                </h3>
                                <p
                                    className={cn(
                                        'mt-2 text-sm',
                                        pkg.featured
                                            ? 'text-slate-300'
                                            : 'text-slate-500',
                                    )}
                                >
                                    {pkg.description}
                                </p>
                                <p
                                    className={cn(
                                        'mt-8 font-display text-5xl font-extrabold tracking-tight',
                                        pkg.featured
                                            ? 'text-white'
                                            : 'text-navy-950',
                                    )}
                                >
                                    {pkg.price}
                                </p>
                                <ul className="mt-8 grid flex-1 gap-3">
                                    {pkg.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex gap-3 text-sm"
                                        >
                                            <Check
                                                className={cn(
                                                    'size-5 shrink-0',
                                                    pkg.featured
                                                        ? 'text-brand-300'
                                                        : 'text-brand-500',
                                                )}
                                            />
                                            <span
                                                className={
                                                    pkg.featured
                                                        ? 'text-slate-200'
                                                        : 'text-slate-700'
                                                }
                                            >
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <ButtonLink
                                    href={enrollHref}
                                    variant={
                                        pkg.featured ? 'primary' : 'outline'
                                    }
                                    className="mt-10 w-full"
                                >
                                    Enroll in this course
                                </ButtonLink>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section id="faculty" className="bg-slate-50 py-24 sm:py-28">
                <Container className="grid items-center gap-16 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <img
                            src="/images/team/walter-mcmillan-faculty.jpg"
                            alt="Professor Walter McMillan"
                            loading="lazy"
                            className="aspect-[4/5] w-full rounded-3xl object-cover object-top shadow-xl"
                        />
                    </div>
                    <div className="lg:col-span-7">
                        <SectionHeading
                            eyebrow="Meet your faculty"
                            title="Walter McMillan, BSRS, RT, CT, CNMT, MR (ARRT)"
                        />
                        <div className="mt-6 grid gap-5 text-lg leading-relaxed text-slate-600">
                            <p>
                                Professor McMillan brings over 25 years of
                                radiology experience to the classroom. He began
                                his career as a radiology patient transporter,
                                working his way up as a darkroom tech, film
                                librarian, scheduler and tech aide while
                                completing his Radiologic Technology degree. He
                                later advanced as a CT Technologist while
                                pursuing Nuclear Medicine, and subsequently
                                completed an MRI program.
                            </p>
                            <p>
                                With extensive experience as both a Radiology
                                Administrator and faculty leader, Professor
                                McMillan has successfully built CT and Nuclear
                                Medicine programs, and serves as the Nuclear
                                Medicine Program Director at NP College in
                                Lakewood, CA. His depth of clinical expertise,
                                combined with his passion for teaching, ensures
                                students receive both the knowledge and
                                mentorship they need to succeed.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="bg-white py-24 sm:py-28">
                <Container className="grid gap-16 lg:grid-cols-2">
                    <div>
                        <SectionHeading
                            eyebrow="Why choose Infinite Solutions"
                            title="A proven path to certification"
                        />
                        <CheckList items={whyChoose} className="mt-8" />
                        <div className="mt-10 flex flex-wrap gap-3">
                            <ButtonLink href={curriculum()} variant="dark">
                                <BookOpenCheck />
                                Explore the curriculum
                            </ButtonLink>
                            <ButtonLink href={newsletter()} variant="outline">
                                Read our newsletter
                            </ButtonLink>
                        </div>
                    </div>
                    <div className="rounded-3xl bg-brand-50 p-8 sm:p-10">
                        <h3 className="font-display text-xl font-bold text-navy-950">
                            Our clinical affiliates
                        </h3>
                        <p className="mt-2 text-slate-600">
                            Students train at approved imaging facilities across
                            the greater Los Angeles region.
                        </p>
                        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                            {clinicalAffiliates.map((affiliate) => (
                                <li
                                    key={affiliate}
                                    className="flex items-start gap-3 rounded-2xl bg-white p-4 text-sm font-semibold text-navy-950"
                                >
                                    <Hospital className="size-5 shrink-0 text-brand-500" />
                                    {affiliate}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Container>
            </section>

            <section id="faq" className="bg-slate-50 py-24 sm:py-28">
                <Container className="grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <SectionHeading
                            eyebrow="FAQ"
                            title="Frequently asked questions"
                            description={
                                <>
                                    Still have questions?{' '}
                                    <Link
                                        href={questionsHref}
                                        className="font-semibold text-brand-600 underline underline-offset-4"
                                    >
                                        Contact our team
                                    </Link>
                                    .
                                </>
                            }
                        />
                    </div>
                    <div className="grid gap-3 lg:col-span-8">
                        {faqs.map((faq) => (
                            <details
                                key={faq.question}
                                className="group rounded-2xl border border-slate-200 bg-white p-6 open:shadow-lg open:shadow-navy-950/5"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-bold text-navy-950 [&::-webkit-details-marker]:hidden">
                                    {faq.question}
                                    <ChevronDown className="size-5 shrink-0 text-brand-500 transition group-open:rotate-180" />
                                </summary>
                                <p className="mt-4 leading-relaxed text-slate-600">
                                    {faq.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </Container>
            </section>

            <CtaSection
                title="Advance your career. Become a certified CT Technologist."
                description="Whether you’re looking to specialize, increase your earning potential, or simply want a new challenge — our CT program is here to help."
            >
                <ButtonLink href={enrollHref} size="lg">
                    Enroll Now
                </ButtonLink>
                <ButtonLink href={curriculum()} size="lg" variant="ghostLight">
                    View Curriculum
                </ButtonLink>
            </CtaSection>
        </>
    );
}
