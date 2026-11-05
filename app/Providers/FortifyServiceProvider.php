<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // The site has no user accounts, so Fortify's auth routes are disabled.
        Fortify::ignoreRoutes();
    }
}
