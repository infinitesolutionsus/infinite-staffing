import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, Menu, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import Container from '@/components/site/container';
import SiteLink from '@/components/site/site-link';
import SiteLogo from '@/components/site/site-logo';
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { company, mainNavigation } from '@/lib/site';
import { cn } from '@/lib/utils';
import { home } from '@/routes';

export default function SiteHeader() {
    const navigation = mainNavigation(usePage().props.infiniteLearningUrl);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // The dropdown opens on hover/focus via CSS, so after a click it would stay
    // open (the mouse is still over it). Hide it until the mouse leaves.
    const [closedMenu, setClosedMenu] = useState<string | null>(null);
    const { isCurrentUrl } = useCurrentUrl();

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 24);

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-lg'
                    : 'bg-transparent',
            )}
        >
            <div
                className={cn(
                    'hidden border-b transition-all duration-300 lg:block',
                    isScrolled
                        ? 'h-0 overflow-hidden border-transparent'
                        : 'border-white/10',
                )}
            >
                <Container className="flex h-10 items-center justify-between text-xs text-slate-300">
                    <p>{company.tagline}</p>
                    <div className="flex items-center gap-6">
                        <a
                            href={company.phoneHref}
                            className="flex items-center gap-1.5 hover:text-white"
                        >
                            <Phone className="size-3.5" />
                            {company.phone}
                        </a>
                        <a
                            href={`mailto:${company.email}`}
                            className="hover:text-white"
                        >
                            {company.email}
                        </a>
                    </div>
                </Container>
            </div>

            <Container className="flex h-20 items-center justify-between gap-6">
                <Link href={home()} className="shrink-0">
                    <SiteLogo inverted={!isScrolled} />
                </Link>

                <nav className="ml-auto hidden items-center gap-1 lg:flex">
                    {navigation.map((item) =>
                        item.children ? (
                            <div
                                key={item.title}
                                className={cn(
                                    'relative',
                                    closedMenu !== item.title && 'group',
                                )}
                                onMouseLeave={() => setClosedMenu(null)}
                            >
                                <button
                                    type="button"
                                    className={cn(
                                        'flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition',
                                        isScrolled
                                            ? 'text-slate-700 hover:text-brand-600'
                                            : 'text-white/90 hover:text-white',
                                    )}
                                >
                                    {item.title}
                                    <ChevronDown className="size-4 transition group-focus-within:rotate-180 group-hover:rotate-180" />
                                </button>
                                <div className="invisible absolute top-full left-1/2 w-80 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                                    <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-navy-950/10">
                                        {item.children.map((child) => (
                                            <SiteLink
                                                key={child.title}
                                                href={child.href}
                                                onClick={(event) => {
                                                    setClosedMenu(item.title);
                                                    (
                                                        event.currentTarget as HTMLElement
                                                    ).blur();
                                                }}
                                                className="block rounded-xl px-4 py-3 transition hover:bg-brand-50"
                                            >
                                                <span className="block text-sm font-semibold text-navy-950">
                                                    {child.title}
                                                </span>
                                                {child.description && (
                                                    <span className="mt-0.5 block text-sm text-slate-500">
                                                        {child.description}
                                                    </span>
                                                )}
                                            </SiteLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <SiteLink
                                key={item.title}
                                href={item.href}
                                className={cn(
                                    'rounded-full px-4 py-2 text-sm font-semibold transition',
                                    isScrolled
                                        ? 'text-slate-700 hover:text-brand-600'
                                        : 'text-white/90 hover:text-white',
                                    isCurrentUrl(item.href) &&
                                        (isScrolled
                                            ? 'text-brand-600'
                                            : 'text-white underline decoration-brand-400 decoration-2 underline-offset-8'),
                                )}
                            >
                                {item.title}
                            </SiteLink>
                        ),
                    )}
                </nav>

                <div className="flex items-center gap-2 lg:hidden">
                    <Sheet
                        open={isMobileMenuOpen}
                        onOpenChange={setIsMobileMenuOpen}
                    >
                        <SheetTrigger
                            className={cn(
                                'rounded-full p-2 lg:hidden',
                                isScrolled ? 'text-navy-950' : 'text-white',
                            )}
                            aria-label="Open menu"
                        >
                            <Menu className="size-6" />
                        </SheetTrigger>
                        <SheetContent className="w-full overflow-y-auto border-slate-200 bg-white p-6 text-slate-900 sm:max-w-sm">
                            <SheetTitle className="sr-only">
                                Navigation
                            </SheetTitle>
                            <SiteLogo className="h-10 self-start" />
                            <nav className="mt-4 grid gap-1">
                                {navigation.map((item) => (
                                    <div key={item.title}>
                                        {item.children ? (
                                            <>
                                                <p className="mt-4 mb-1 px-3 text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
                                                    {item.title}
                                                </p>
                                                {item.children.map((child) => (
                                                    <SiteLink
                                                        key={child.title}
                                                        href={child.href}
                                                        onClick={() =>
                                                            setIsMobileMenuOpen(
                                                                false,
                                                            )
                                                        }
                                                        className="block rounded-lg px-3 py-2.5 font-semibold text-navy-950 hover:bg-brand-50"
                                                    >
                                                        {child.title}
                                                    </SiteLink>
                                                ))}
                                            </>
                                        ) : (
                                            <SiteLink
                                                href={item.href}
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                                className="block rounded-lg px-3 py-2.5 font-semibold text-navy-950 hover:bg-brand-50"
                                            >
                                                {item.title}
                                            </SiteLink>
                                        )}
                                    </div>
                                ))}
                            </nav>
                            <a
                                href={company.phoneHref}
                                className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600"
                            >
                                <Phone className="size-4" />
                                {company.phone}
                            </a>
                        </SheetContent>
                    </Sheet>
                </div>
            </Container>
        </header>
    );
}
