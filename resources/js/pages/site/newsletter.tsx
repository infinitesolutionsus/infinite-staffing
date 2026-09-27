import { Head, Link } from '@inertiajs/react';
import { ArrowRight, CalendarDays, Newspaper } from 'lucide-react';
import ButtonLink from '@/components/site/button-link';
import Container from '@/components/site/container';
import PageHero from '@/components/site/page-hero';
import SectionHeading from '@/components/site/section-heading';
import { ctProgram } from '@/routes';
import { ctConnectionJuly2026 } from '@/routes/newsletters';

const issues = [
    {
        title: 'The CT Connection — July 2026',
        date: 'July 2026',
        summary:
            'Cedars-Sinai Marina del Rey joins our clinical network, new administrative coordinators, clinical site updates, rotation tips and congratulations to our newest credentialed technologists.',
        href: ctConnectionJuly2026(),
    },
];

export default function Newsletter() {
    const [latestIssue] = issues;

    return (
        <>
            <Head title="CT Program Newsletter">
                <meta
                    name="description"
                    content="The CT Connection — the monthly newsletter of the Infinite Learning Solutions CT Program."
                />
            </Head>

            <PageHero
                eyebrow="Stay connected"
                title="The CT Connection"
                description="Our monthly newsletter includes program announcements, clinical updates, student accomplishments, educational highlights, board-preparation guidance and important upcoming dates."
                image="/images/ct-scanner.jpeg"
            />

            <section className="bg-white py-24 sm:py-28">
                <Container>
                    <SectionHeading
                        eyebrow="Latest issue"
                        title={latestIssue.title}
                    />
                    <Link
                        href={latestIssue.href}
                        className="group mt-10 grid overflow-hidden rounded-3xl border border-slate-200 transition hover:shadow-2xl hover:shadow-brand-500/10 md:grid-cols-5"
                    >
                        <div className="relative isolate flex min-h-64 flex-col justify-end overflow-hidden bg-navy-950 p-8 md:col-span-2">
                            <div
                                aria-hidden
                                className="absolute -top-16 -right-16 -z-10 size-64 rounded-full bg-brand-500/40 blur-3xl"
                            />
                            <Newspaper className="size-10 text-brand-300" />
                            <p className="mt-6 font-display text-3xl font-extrabold text-white">
                                {latestIssue.date}
                            </p>
                            <p className="mt-1 text-sm text-slate-300">
                                Monthly Edition
                            </p>
                        </div>
                        <div className="flex flex-col justify-center p-8 sm:p-12 md:col-span-3">
                            <p className="text-lg leading-relaxed text-slate-600">
                                {latestIssue.summary}
                            </p>
                            <span className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-600">
                                Read the {latestIssue.date} newsletter
                                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                            </span>
                        </div>
                    </Link>
                </Container>
            </section>

            <section className="bg-slate-50 py-24 sm:py-28">
                <Container className="grid gap-12 lg:grid-cols-2">
                    <div>
                        <h2 className="font-display text-2xl font-bold text-navy-950">
                            2026 newsletters
                        </h2>
                        <ul className="mt-6 grid gap-3">
                            {issues.map((issue) => (
                                <li key={issue.title}>
                                    <Link
                                        href={issue.href}
                                        className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 font-semibold text-navy-950 transition hover:border-brand-300"
                                    >
                                        <CalendarDays className="size-5 text-brand-500" />
                                        <span className="flex-1">
                                            {issue.date} Newsletter
                                        </span>
                                        <ArrowRight className="size-4 text-slate-400" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-3xl bg-navy-950 p-10">
                        <h2 className="font-display text-2xl font-bold text-white">
                            Interested in our CT Program?
                        </h2>
                        <p className="mt-4 leading-relaxed text-slate-300">
                            Learn more about our CT advanced certification
                            pathway, including didactic education, clinical
                            training, student support and enrollment
                            requirements.
                        </p>
                        <ButtonLink href={ctProgram()} className="mt-8">
                            Explore the CT Program
                        </ButtonLink>
                    </div>
                </Container>
            </section>
        </>
    );
}
