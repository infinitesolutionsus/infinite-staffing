import { ArrowRight, Phone } from 'lucide-react';
import ButtonLink from '@/components/site/button-link';
import Container from '@/components/site/container';
import { company } from '@/lib/site';
import { contact, home } from '@/routes';

const messages: Record<number, { title: string; description: string }> = {
    403: {
        title: 'Access denied',
        description: 'Sorry, you don’t have permission to view this page.',
    },
    404: {
        title: 'Page not found',
        description:
            'The page you’re looking for may have moved or no longer exists.',
    },
    429: {
        title: 'Too many requests',
        description:
            'You’ve made a lot of requests in a short time. Please wait a moment and try again.',
    },
    500: {
        title: 'Something went wrong',
        description:
            'We hit an unexpected error on our end. Please try again in a few minutes.',
    },
    503: {
        title: 'Down for maintenance',
        description:
            'We’re making some improvements and will be back online shortly.',
    },
};

export default function ErrorPage({ status }: { status: number }) {
    const { title, description } = messages[status] ?? messages[500];

    return (
        <>
            <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-navy-950 pt-36 pb-24 sm:pt-44">
                <div
                    aria-hidden
                    className="absolute -top-40 -right-32 -z-10 size-[36rem] rounded-full bg-brand-500/25 blur-3xl"
                />
                <div
                    aria-hidden
                    className="absolute -bottom-48 -left-32 -z-10 size-[32rem] rounded-full bg-brand-500/10 blur-3xl"
                />
                <Container>
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="bg-linear-to-r from-brand-300 to-brand-500 bg-clip-text font-display text-8xl font-extrabold tracking-tight text-transparent sm:text-9xl">
                            {status}
                        </p>
                        <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl">
                            {title}
                        </h1>
                        <p className="mt-6 text-lg leading-relaxed text-pretty text-slate-300 sm:text-xl">
                            {description}
                        </p>
                        <div className="mt-10 flex flex-wrap justify-center gap-3">
                            <ButtonLink href={home()} size="lg">
                                Back to home
                                <ArrowRight />
                            </ButtonLink>
                            <ButtonLink
                                href={contact()}
                                size="lg"
                                variant="ghostLight"
                            >
                                Contact us
                            </ButtonLink>
                        </div>
                        <a
                            href={company.phoneHref}
                            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white"
                        >
                            <Phone className="size-4" />
                            Need help now? Call {company.phone}
                        </a>
                    </div>
                </Container>
            </section>
        </>
    );
}
