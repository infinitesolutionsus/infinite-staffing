import type { ReactNode } from 'react';
import SiteFooter from '@/components/site/site-footer';
import SiteHeader from '@/components/site/site-header';

export default function SiteLayout({ children }: { children: ReactNode }) {
    return (
        <div className="site-theme flex min-h-screen flex-col bg-white font-display text-slate-900 antialiased">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
    );
}
