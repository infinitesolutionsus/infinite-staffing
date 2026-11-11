import { usePage } from '@inertiajs/react';

/**
 * Builds links to registration on the Infinite Learning site. Pass a program
 * slug to preselect that package, e.g. `enrollUrl('complete-ct-program')`.
 */
export function useEnrollUrl(): (program?: string) => string {
    const { infiniteLearningUrl } = usePage().props;

    return (program?: string) => {
        const url = new URL('/register', infiniteLearningUrl);

        if (program) {
            url.searchParams.set('program', program);
        }

        return url.toString();
    };
}
