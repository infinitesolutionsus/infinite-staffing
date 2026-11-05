import { Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Award,
    CalendarClock,
    ClipboardList,
    FolderKanban,
    Hospital,
    Lightbulb,
    MessageCircleQuestion,
} from 'lucide-react';
import CheckList from '@/components/site/check-list';
import Container from '@/components/site/container';
import { company } from '@/lib/site';
import { cn } from '@/lib/utils';
import { newsletter } from '@/routes';

const updates = [
    {
        title: 'Office Hours',
        body: 'Every Tuesday, 4:00–5:00 PM PT via Zoom. No appointment needed. A step-by-step guide is provided in your student portal.',
        icon: CalendarClock,
    },
    {
        title: 'Organization Tip',
        body: 'Take advantage of our Tracking Tool to stay on top of logging your scans and having advisors sign off on them.',
        icon: ClipboardList,
    },
    {
        title: 'New Modules',
        body: 'New module reviews are being uploaded into the ILS Learning Platform. Log in to review!',
        icon: FolderKanban,
    },
    {
        title: 'Administrative',
        body: 'Clinical sites and onboarding can take time. Choose your top 3 clinical site locations, plan your work schedule to accommodate a minimum of 2 shifts per week, and complete the clinical orientation module.',
        icon: Lightbulb,
    },
];

const clinicalSites = [
    { name: 'Adventist Health White Memorial', status: 'Fully Operational' },
    { name: 'Adventist Health Montebello', status: 'Fully Operational' },
    { name: 'Providence Little Company of Mary', status: 'Fully Operational' },
    {
        name: 'Cedars-Sinai Marina del Rey Hospital',
        status: 'Fully Operational',
    },
    {
        name: 'Southern California Medical Imaging (Santa Monica)',
        status: 'Fully Operational',
    },
    { name: 'Tower Imaging Valencia', status: 'Fully Operational' },
    { name: 'Tower Imaging St. John’s', status: 'Fully Operational' },
    { name: 'Beverly Hills Medical Imaging', status: 'Fully Operational' },
    {
        name: 'Providence St. John’s Medical Center',
        status: 'Pending — new scanner installation and staff training',
    },
];

const rotationTips = [
    {
        title: 'Build relationships early',
        body: 'Introduce yourself with intent — share your goals and eagerness. It sets the tone for the entire rotation.',
    },
    {
        title: 'Take initiative',
        body: 'Arrive on time and ready to learn and assist with workflow: positioning patients, loading the contrast injector, readying the room, stocking supplies, and starting with non-contrast studies.',
    },
    {
        title: 'Own your competency checklist',
        body: 'Review gaps before each shift. Advocate for the procedures you still need — don’t wait to be assigned them.',
    },
    {
        title: 'Protect your energy',
        body: 'Full-time work plus a certification program is demanding. Even five quiet minutes before a shift improves performance and retention.',
    },
];

const graduates = [
    { name: 'Man Truong', site: 'Adventist Health White Memorial' },
    { name: 'Ramiro Gonzalez', site: 'Adventist Health White Memorial' },
    { name: 'Michael Megardichian', site: 'Tower Imaging Valencia' },
];

const examPrepTips = [
    'Active recall beats passive review. Close the book and test yourself daily — even 10–15 practice questions.',
    'Review every wrong answer for the reasoning, not just the correct letter.',
    'Track your weak topics and return to source material on those specifically.',
    'Use the ARRT exam blueprint to focus your effort — it tells you exactly which content areas carry the most weight.',
];

export default function CtConnectionJuly2026() {
    return (
        <>
            <section className="relative isolate overflow-hidden bg-navy-950 pt-36 pb-20 sm:pt-44">
                <div
                    aria-hidden
                    className="absolute -top-40 -right-32 -z-10 size-[36rem] rounded-full bg-brand-500/25 blur-3xl"
                />
                <Container className="max-w-4xl">
                    <Link
                        href={newsletter()}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-white"
                    >
                        <ArrowLeft className="size-4" />
                        All newsletters
                    </Link>
                    <p className="mt-8 text-sm font-semibold tracking-[0.18em] text-brand-200 uppercase">
                        Monthly Student Newsletter · CT Certification
                    </p>
                    <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                        The CT Connection
                    </h1>
                    <p className="mt-4 text-xl text-slate-300">July 2026</p>
                </Container>
            </section>

            <article className="bg-white py-20">
                <Container className="max-w-4xl">
                    <div className="grid gap-5 text-lg leading-relaxed text-slate-700">
                        <p className="font-display text-2xl font-bold text-navy-950">
                            Welcome to the July edition of The CT Connection!
                        </p>
                        <p>
                            First, I want to thank each of you for your
                            patience, flexibility and trust as we continue
                            building the Infinite Solutions CT Certification
                            Program. Launching a new educational program while
                            simultaneously developing curriculum, expanding
                            clinical partnerships and supporting students
                            through clinical training has been an exciting
                            journey, and I truly appreciate everyone who has
                            been part of it.
                        </p>
                        <p>
                            I&rsquo;m excited to share that our program
                            continues to make tremendous progress. We now have
                            students actively training throughout the greater
                            Los Angeles region, where they are gaining valuable
                            real-world CT experience under the guidance of
                            outstanding technologists.
                        </p>
                        <p>
                            I&rsquo;m also pleased to announce that{' '}
                            <strong className="text-navy-950">
                                Cedars-Sinai Marina del Rey Hospital
                            </strong>{' '}
                            has officially joined our growing network of
                            clinical affiliates, providing additional
                            opportunities for current and future students.
                        </p>
                        <p>
                            As the program continues to grow, so does our
                            commitment to supporting you. We have expanded our
                            administrative team with the addition of{' '}
                            <strong className="text-navy-950">
                                Jamiee Bowman
                            </strong>{' '}
                            and{' '}
                            <strong className="text-navy-950">
                                Lamont Barrett
                            </strong>
                            , our new Strategic Administrative Coordinators.
                            Jamiee and Lamont will help improve communication,
                            streamline student support, coordinate program
                            operations and ensure you receive timely assistance
                            throughout your educational journey.
                        </p>
                        <p>
                            Your feedback has been instrumental in helping us
                            refine this program, and I encourage you to continue
                            sharing your ideas and suggestions. Every
                            recommendation helps us build a stronger experience,
                            not only for you, but for every student who follows.
                        </p>
                        <p>
                            Thank you for being part of this journey. I am
                            excited to continue watching each of you grow into
                            confident, knowledgeable and compassionate CT
                            technologists.
                        </p>
                        <div className="mt-4 flex items-center gap-4">
                            <img
                                src="/images/team/walter-mcmillan.jpg"
                                alt="Walter McMillan"
                                className="size-14 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-display font-bold text-navy-950">
                                    Walter McMillan
                                </p>
                                <p className="text-sm text-slate-500">
                                    Program Director · Infinite Solutions
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 grid gap-4 sm:grid-cols-2">
                        {updates.map((update) => (
                            <div
                                key={update.title}
                                className="rounded-3xl bg-brand-50 p-7"
                            >
                                <update.icon className="size-6 text-brand-600" />
                                <h2 className="mt-4 font-display text-lg font-bold text-navy-950">
                                    {update.title}
                                </h2>
                                <p className="mt-2 leading-relaxed text-slate-600">
                                    {update.body}
                                </p>
                            </div>
                        ))}
                    </div>

                    <section className="mt-16">
                        <h2 className="font-display text-2xl font-bold text-navy-950">
                            Clinical site status
                        </h2>
                        <ul className="mt-6 divide-y divide-slate-200 rounded-3xl border border-slate-200">
                            {clinicalSites.map((site) => (
                                <li
                                    key={site.name}
                                    className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <span className="flex items-center gap-3 font-semibold text-navy-950">
                                        <Hospital className="size-5 shrink-0 text-brand-500" />
                                        {site.name}
                                    </span>
                                    <span
                                        className={cn(
                                            'self-start rounded-full px-3 py-1 text-xs font-semibold sm:self-auto',
                                            site.status === 'Fully Operational'
                                                ? 'bg-emerald-50 text-emerald-700'
                                                : 'bg-amber-50 text-amber-700',
                                        )}
                                    >
                                        {site.status}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="mt-16">
                        <h2 className="font-display text-2xl font-bold text-navy-950">
                            Making the most of your clinical rotation
                        </h2>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            {rotationTips.map((tip) => (
                                <div
                                    key={tip.title}
                                    className="rounded-3xl border border-slate-200 p-7"
                                >
                                    <h3 className="font-display font-bold text-navy-950">
                                        {tip.title}
                                    </h3>
                                    <p className="mt-2 leading-relaxed text-slate-600">
                                        {tip.body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="relative isolate mt-16 overflow-hidden rounded-3xl bg-navy-950 p-8 sm:p-12">
                        <div
                            aria-hidden
                            className="absolute -right-20 -bottom-20 -z-10 size-72 rounded-full bg-brand-500/30 blur-3xl"
                        />
                        <Award className="size-10 text-brand-300" />
                        <h2 className="mt-6 font-display text-2xl font-bold text-white">
                            Program completion shout-outs
                        </h2>
                        <p className="mt-3 text-slate-300">
                            Congratulations on completing both the didactic and
                            clinical requirements for your ARRT (CT) Advanced
                            Credential. Your CT credential opens a different
                            category of opportunity!
                        </p>
                        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                            {graduates.map((graduate) => (
                                <li
                                    key={graduate.name}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                                >
                                    <p className="font-display font-bold text-white">
                                        {graduate.name}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-400">
                                        {graduate.site}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="mt-16 rounded-3xl border border-slate-200 p-8 sm:p-10">
                        <MessageCircleQuestion className="size-8 text-brand-500" />
                        <h2 className="mt-4 font-display text-2xl font-bold text-navy-950">
                            Student question
                        </h2>
                        <blockquote className="mt-4 border-l-4 border-brand-500 pl-5 text-lg text-slate-700 italic">
                            &ldquo;I passed all my modules but I feel like
                            I&rsquo;m not ready for the ARRT exam. How do I know
                            when I&rsquo;m actually prepared enough to schedule
                            it?&rdquo;
                        </blockquote>
                        <h3 className="mt-8 font-display font-bold text-navy-950">
                            Faculty answer
                        </h3>
                        <CheckList items={examPrepTips} className="mt-4" />
                    </section>

                    <div className="mt-16 rounded-3xl bg-slate-50 p-8 text-center">
                        <p className="text-lg leading-relaxed text-slate-700">
                            Remember, every lecture, every clinical shift and
                            every competency completed brings you one step
                            closer to your goal of becoming a Certified CT
                            Technologist. We are honored to be part of your
                            journey.
                        </p>
                        <p className="mt-4 text-sm text-slate-500">
                            Need support? Email{' '}
                            <a
                                href={`mailto:${company.email}`}
                                className="font-semibold text-brand-600"
                            >
                                {company.email}
                            </a>
                        </p>
                    </div>
                </Container>
            </article>
        </>
    );
}
