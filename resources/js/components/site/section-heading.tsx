import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionHeadingProps = {
    eyebrow?: string;
    title: ReactNode;
    description?: ReactNode;
    align?: 'left' | 'center';
    tone?: 'light' | 'dark';
    className?: string;
};

export default function SectionHeading({
    eyebrow,
    title,
    description,
    align = 'left',
    tone = 'light',
    className,
}: SectionHeadingProps) {
    return (
        <div
            className={cn(
                'max-w-3xl',
                align === 'center' && 'mx-auto text-center',
                className,
            )}
        >
            {eyebrow && (
                <p
                    className={cn(
                        'mb-3 text-sm font-semibold tracking-[0.18em] uppercase',
                        tone === 'light' ? 'text-brand-600' : 'text-brand-300',
                    )}
                >
                    {eyebrow}
                </p>
            )}
            <h2
                className={cn(
                    'font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl',
                    tone === 'light' ? 'text-navy-950' : 'text-white',
                )}
            >
                {title}
            </h2>
            {description && (
                <p
                    className={cn(
                        'mt-4 text-lg leading-relaxed text-pretty',
                        tone === 'light' ? 'text-slate-600' : 'text-slate-300',
                    )}
                >
                    {description}
                </p>
            )}
        </div>
    );
}
