import type { ReactNode } from 'react';
import Container from '@/components/site/container';
import { cn } from '@/lib/utils';

type PageHeroProps = {
    eyebrow: string;
    title: ReactNode;
    description?: ReactNode;
    image?: string;
    children?: ReactNode;
    className?: string;
};

export default function PageHero({
    eyebrow,
    title,
    description,
    image,
    children,
    className,
}: PageHeroProps) {
    return (
        <section
            className={cn(
                'relative isolate overflow-hidden bg-navy-950 pt-36 pb-20 sm:pt-44 sm:pb-28',
                className,
            )}
        >
            {image && (
                <img
                    src={image}
                    alt=""
                    className="absolute inset-0 -z-20 size-full object-cover opacity-35"
                />
            )}
            <div className="absolute inset-0 -z-10 bg-linear-to-r from-navy-950 via-navy-950/90 to-navy-900/50" />
            <div
                aria-hidden
                className="absolute -top-40 -right-32 -z-10 size-[36rem] rounded-full bg-brand-500/25 blur-3xl"
            />
            <Container>
                <div className="max-w-3xl">
                    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-brand-200 uppercase backdrop-blur">
                        <span className="size-1.5 rounded-full bg-brand-400" />
                        {eyebrow}
                    </p>
                    <h1 className="font-display text-4xl font-extrabold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-slate-300 sm:text-xl">
                            {description}
                        </p>
                    )}
                    {children && (
                        <div className="mt-10 flex flex-wrap gap-3">
                            {children}
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}
