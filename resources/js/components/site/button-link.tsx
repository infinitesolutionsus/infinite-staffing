import { Link } from '@inertiajs/react';
import type { InertiaLinkProps } from '@inertiajs/react';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonLinkVariants = cva(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                primary:
                    'bg-brand-500 text-white shadow-lg shadow-brand-500/25 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-brand-500/40',
                dark: 'bg-navy-900 text-white shadow-lg shadow-navy-900/20 hover:-translate-y-0.5 hover:bg-navy-800',
                light: 'bg-white text-navy-900 shadow-lg shadow-black/10 hover:-translate-y-0.5 hover:bg-brand-50',
                outline:
                    'border border-slate-300 bg-white/60 text-navy-900 backdrop-blur hover:border-brand-500 hover:text-brand-700',
                ghostLight:
                    'border border-white/30 text-white hover:border-white hover:bg-white/10',
            },
            size: {
                sm: 'h-9 px-4 text-sm',
                md: 'h-11 px-6 text-sm',
                lg: 'h-13 px-7 text-base',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    },
);

type ButtonLinkProps = Omit<InertiaLinkProps, 'size'> &
    VariantProps<typeof buttonLinkVariants>;

export default function ButtonLink({
    className,
    variant,
    size,
    ...props
}: ButtonLinkProps) {
    return (
        <Link
            className={cn(buttonLinkVariants({ variant, size }), className)}
            {...props}
        />
    );
}
