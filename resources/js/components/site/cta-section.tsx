import type { ReactNode } from 'react';
import Container from '@/components/site/container';

type CtaSectionProps = {
    title: ReactNode;
    description?: ReactNode;
    children: ReactNode;
};

export default function CtaSection({
    title,
    description,
    children,
}: CtaSectionProps) {
    return (
        <section className="bg-white py-20 sm:py-24">
            <Container>
                <div className="relative isolate overflow-hidden rounded-3xl bg-navy-950 px-6 py-16 text-center sm:px-16">
                    <div
                        aria-hidden
                        className="absolute -top-24 -left-24 -z-10 size-80 rounded-full bg-brand-500/30 blur-3xl"
                    />
                    <div
                        aria-hidden
                        className="absolute -right-24 -bottom-24 -z-10 size-80 rounded-full bg-brand-400/20 blur-3xl"
                    />
                    <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
                        {title}
                    </h2>
                    {description && (
                        <p className="mx-auto mt-4 max-w-xl text-lg text-pretty text-slate-300">
                            {description}
                        </p>
                    )}
                    <div className="mt-10 flex flex-wrap justify-center gap-3">
                        {children}
                    </div>
                </div>
            </Container>
        </section>
    );
}
