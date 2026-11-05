import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import SiteLayout from '@/layouts/site-layout';

void createInertiaApp({
    // Titles and meta tags come from Laravel Head on the server, so they're in
    // the first HTML response that search engines and link previews read.
    serverHead: true,
    layout: () => SiteLayout,
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#00A8F0',
    },
});

// This will set light / dark mode on load...
initializeTheme();
