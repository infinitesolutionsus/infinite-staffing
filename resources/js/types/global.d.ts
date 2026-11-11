export {};

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            infiniteLearningUrl: string;
            [key: string]: unknown;
        };
    }
}
