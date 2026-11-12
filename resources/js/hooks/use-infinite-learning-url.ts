import { usePage } from '@inertiajs/react';

/** The Complete CT Program page on the Infinite Learning site. */
export const ctProgramPath = '/programs/complete-ct-program';

/**
 * Builds links to the Infinite Learning site, whose URL is configured per
 * environment, e.g. `learningUrl('/programs/complete-ct-program')`.
 */
export function useInfiniteLearningUrl(): (
    path?: string,
    query?: Record<string, string>,
) => string {
    const { infiniteLearningUrl } = usePage().props;

    return (path = '/', query = {}) => {
        const url = new URL(path, infiniteLearningUrl);

        for (const [key, value] of Object.entries(query)) {
            url.searchParams.set(key, value);
        }

        return url.toString();
    };
}

/**
 * Links to registration on the Infinite Learning site. Pass a program slug to
 * preselect that package, e.g. `enrollUrl('complete-ct-program')`.
 */
export function useEnrollUrl(): (program?: string) => string {
    const learningUrl = useInfiniteLearningUrl();

    return (program?: string) =>
        learningUrl('/register', program ? { program } : {});
}
