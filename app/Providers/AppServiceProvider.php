<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Laravel\Head\Enums\OgType;
use Laravel\Head\Enums\TwitterCard;
use Laravel\Head\ErrorPages;
use Laravel\Head\Facades\Head;
use Laravel\Head\Facades\Schema;
use Laravel\Head\HeadBuilder;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
        $this->configureRateLimiting();
        $this->configureHead();
    }

    /**
     * The SEO metadata every page starts from. Each route sets its own
     * title and description on top of these (see routes/web.php).
     */
    protected function configureHead(): void
    {
        $siteName = 'Infinite Staffing Solutions';

        Head::defaults(function (HeadBuilder $head) use ($siteName): void {
            $head
                // Shown as-is on the home page; other pages get "Page | Infinite Staffing Solutions".
                ->title($siteName, suffix: " | {$siteName}")
                ->description('Infinite Staffing Solutions connects Los Angeles hospitals and imaging centers with skilled radiologic technologists, and helps technologists grow through CT certification, consulting and patient advocacy.')
                ->canonical()
                ->og(siteName: $siteName, type: OgType::Website, locale: 'en_US')
                ->ogImage(asset('images/og-image.jpg'), alt: $siteName, width: 1200, height: 630, type: 'image/jpeg')
                ->twitter(card: TwitterCard::SummaryWithLargeImage)
                ->twitterImage(asset('images/og-image.jpg'), alt: $siteName)
                ->themeColor('#04152f')
                ->searchableByRobots()
                ->schema(
                    Schema::organization()
                        ->name($siteName)
                        ->url(url('/'))
                        ->logo(asset('images/logo.png'))
                        ->set('telephone', '+1-323-252-8741')
                        ->set('email', 'info@infinitestaffingsolutions.com')
                        ->set('address', [
                            '@type' => 'PostalAddress',
                            'streetAddress' => '4325 Glencoe Ave Ste C9 9330',
                            'addressLocality' => 'Marina Del Rey',
                            'addressRegion' => 'CA',
                            'postalCode' => '90292',
                            'addressCountry' => 'US',
                        ]),
                );
        });

        // Icons are the same on every page, so they're sent once rather than per visit.
        Head::inertiaGlobals(function (HeadBuilder $head) use ($siteName): void {
            $head
                ->applicationName($siteName)
                ->favicon('/favicon.ico', sizes: '32x32')
                ->icon('/favicon-32.png', type: 'image/png', sizes: '32x32')
                ->icon('/favicon-512.png', type: 'image/png', sizes: '512x512')
                ->appleTouchIcon('/apple-touch-icon.png', sizes: '180x180');
        });

        // Error pages should never show up in search results.
        Head::errors(function (ErrorPages $errors): void {
            $errors->defaults(robots: 'noindex, follow');
            $errors->status(403, title: 'Access denied');
            $errors->status(404, title: 'Page not found');
            $errors->status(429, title: 'Too many requests');
            $errors->status(500, title: 'Something went wrong');
            $errors->status(503, title: 'Down for maintenance');
        });
    }

    /**
     * Configure rate limiting.
     */
    protected function configureRateLimiting(): void
    {
        // Live validation checks never save anything, so they get a looser
        // limit than real submissions. Separate keys keep them from sharing a budget.
        RateLimiter::for('contact', fn (Request $request): Limit => $request->isPrecognitive()
            ? Limit::perMinute(120)->by('contact-validate|'.$request->ip())
            : Limit::perMinute(6)->by('contact|'.$request->ip()),
        );
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        // Laravel Cloud handles HTTPS before the request reaches the app, so generated
        // links (share images, logo) would otherwise come out as http://.
        URL::forceHttps(app()->isProduction());

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
