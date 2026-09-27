import { Link } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import Container from '@/components/site/container';
import SiteLogo from '@/components/site/site-logo';
import { company, footerNavigation } from '@/lib/site';
import { home } from '@/routes';

export default function SiteFooter() {
    return (
        <footer className="bg-navy-950 text-slate-300">
            <Container className="grid gap-12 py-16 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <Link href={home()}>
                        <SiteLogo inverted className="h-14" />
                    </Link>
                    <p className="mt-6 max-w-sm leading-relaxed text-slate-400">
                        Radiology staffing, CT certification, imaging consulting
                        and patient advocacy — supporting excellence in every
                        corner of healthcare.
                    </p>
                    <ul className="mt-8 grid gap-4 text-sm">
                        <li>
                            <a
                                href={company.phoneHref}
                                className="flex items-center gap-3 hover:text-white"
                            >
                                <Phone className="size-4 text-brand-400" />
                                {company.phone}
                            </a>
                        </li>
                        <li>
                            <a
                                href={`mailto:${company.email}`}
                                className="flex items-center gap-3 hover:text-white"
                            >
                                <Mail className="size-4 text-brand-400" />
                                {company.email}
                            </a>
                        </li>
                        <li>
                            <a
                                href={company.mapUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-start gap-3 hover:text-white"
                            >
                                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-400" />
                                <span>
                                    {company.addressLines.map((line) => (
                                        <span key={line} className="block">
                                            {line}
                                        </span>
                                    ))}
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
                    {footerNavigation.map((group) => (
                        <div key={group.title}>
                            <h3 className="font-display text-sm font-semibold tracking-[0.18em] text-white uppercase">
                                {group.title}
                            </h3>
                            <ul className="mt-5 grid gap-3 text-sm">
                                {group.links.map((link) => (
                                    <li key={link.title}>
                                        <Link
                                            href={link.href}
                                            className="transition hover:text-brand-300"
                                        >
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Container>
            <div className="border-t border-white/10">
                <Container className="flex flex-col gap-2 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} {company.name}. All rights
                        reserved.
                    </p>
                    <p>Serving healthcare facilities across Los Angeles.</p>
                </Container>
            </div>
        </footer>
    );
}
