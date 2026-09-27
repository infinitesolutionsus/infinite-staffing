import { cn } from '@/lib/utils';

export default function SiteLogo({
    inverted = false,
    className,
}: {
    inverted?: boolean;
    className?: string;
}) {
    return (
        <img
            src="/images/logo.png"
            alt="Infinite Solutions"
            className={cn(
                'h-12 w-auto transition duration-300',
                inverted && 'brightness-0 invert',
                className,
            )}
        />
    );
}
