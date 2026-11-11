import { Link } from '@inertiajs/react';
import type { InertiaLinkProps } from '@inertiajs/react';
import type { MouseEventHandler } from 'react';

/**
 * An Inertia link for pages in this app, and a plain anchor for other sites
 * (such as the Infinite Learning site), which Inertia cannot visit.
 */
export default function SiteLink(props: InertiaLinkProps) {
    if (typeof props.href === 'string' && /^https?:\/\//.test(props.href)) {
        const { href, className, children, onClick } = props;

        return (
            <a
                href={href}
                className={className}
                onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
            >
                {children}
            </a>
        );
    }

    return <Link {...props} />;
}
