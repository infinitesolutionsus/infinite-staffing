import { Link } from '@inertiajs/react';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import SiteLogo from '@/components/site/site-logo';
import { company } from '@/lib/site';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthBrandLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="site-theme grid min-h-svh bg-white font-display text-navy-950 antialiased lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <aside className="relative isolate hidden overflow-hidden bg-navy-950 lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
                <img
                    src="/images/ct-scanner.jpeg"
                    alt=""
                    className="absolute inset-0 -z-20 size-full object-cover opacity-40"
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-navy-950 via-navy-950/85 to-navy-950/40" />
                <div
                    aria-hidden
                    className="absolute -bottom-48 -left-40 -z-10 size-[40rem] rounded-full bg-brand-500/25 blur-3xl"
                />

                <Link href={home()} className="self-start">
                    <SiteLogo inverted className="h-16" />
                </Link>

                <div className="max-w-lg">
                    <p className="font-display text-5xl leading-[1.05] font-extrabold tracking-tight text-white xl:text-6xl">
                        Staff. Train. Excel.
                    </p>
                    <p className="mt-6 text-lg leading-relaxed text-slate-300">
                        Your portal for the Infinite Learning Solutions CT
                        Program and your partnership with our team.
                    </p>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-300">
                    <a
                        href={company.phoneHref}
                        className="flex items-center gap-2 hover:text-white"
                    >
                        <Phone className="size-4 text-brand-400" />
                        {company.phone}
                    </a>
                    <a
                        href={`mailto:${company.email}`}
                        className="flex items-center gap-2 hover:text-white"
                    >
                        <Mail className="size-4 text-brand-400" />
                        {company.email}
                    </a>
                </div>
            </aside>

            <main className="flex flex-col px-4 py-8 sm:px-10 lg:px-16">
                <div className="flex items-center justify-between">
                    <Link href={home()} className="lg:hidden">
                        <SiteLogo className="h-12" />
                    </Link>
                    <Link
                        href={home()}
                        className="ml-auto flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-brand-600"
                    >
                        <ArrowLeft className="size-4" />
                        Back to website
                    </Link>
                </div>

                <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
                    <h1 className="font-display text-3xl font-bold tracking-tight text-navy-950">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-2 text-slate-500">{description}</p>
                    )}
                    <div className="mt-10">{children}</div>
                </div>

                <p className="text-center text-xs text-slate-400">
                    © {new Date().getFullYear()} {company.name}
                </p>
            </main>
        </div>
    );
}
