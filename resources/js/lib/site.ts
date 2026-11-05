import type { InertiaLinkProps } from '@inertiajs/react';
import {
    about,
    advocacy,
    consulting,
    contact,
    ctProgram,
    home,
    newsletter,
    staffing,
} from '@/routes';
import { curriculum } from '@/routes/ct-program';

export const company = {
    name: 'Infinite Staffing Solutions',
    shortName: 'Infinite Solutions',
    tagline: 'Supplying Excellence, Growing Expertise',
    phone: '(323) 252-8741',
    phoneHref: 'tel:+13232528741',
    email: 'info@infinitestaffingsolutions.com',
    addressLines: ['4325 Glencoe Ave Ste C9 9330', 'Marina Del Rey, CA 90292'],
    mapUrl: 'https://maps.google.com/?q=4325+Glencoe+Ave+Marina+Del+Rey+CA+90292',
};

export type SiteNavLink = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    description?: string;
};

export type SiteNavItem = SiteNavLink & {
    children?: SiteNavLink[];
};

export const mainNavigation: SiteNavItem[] = [
    { title: 'About', href: about() },
    {
        title: 'Services',
        href: staffing(),
        children: [
            {
                title: 'Radiology Staffing',
                href: staffing(),
                description: 'Skilled technologists across every modality.',
            },
            {
                title: 'Consulting Services',
                href: consulting(),
                description: 'Strategic guidance for imaging operations.',
            },
            {
                title: 'Advocacy Program',
                href: advocacy(),
                description: 'Patient advocates who simplify care.',
            },
        ],
    },
    {
        title: 'Academy',
        href: ctProgram(),
        children: [
            {
                title: 'CT Certification Program',
                href: ctProgram(),
                description: 'Earn your ARRT (CT) credential while you work.',
            },
            {
                title: 'Curriculum',
                href: curriculum(),
                description: 'Modules, learning outcomes and requirements.',
            },
            {
                title: 'Newsletter',
                href: newsletter(),
                description: 'The CT Connection, our monthly update.',
            },
        ],
    },
    { title: 'Contact', href: contact() },
];

export const footerNavigation: { title: string; links: SiteNavLink[] }[] = [
    {
        title: 'Company',
        links: [
            { title: 'Home', href: home() },
            { title: 'About Us', href: about() },
            { title: 'Contact', href: contact() },
        ],
    },
    {
        title: 'Services',
        links: [
            { title: 'Radiology Staffing', href: staffing() },
            { title: 'Consulting Services', href: consulting() },
            { title: 'Advocacy Program', href: advocacy() },
        ],
    },
    {
        title: 'Academy',
        links: [
            { title: 'CT Certification Program', href: ctProgram() },
            { title: 'Curriculum', href: curriculum() },
            { title: 'Newsletter', href: newsletter() },
        ],
    },
];

export const modalities = [
    'General X-Ray',
    'Fluoroscopy & C-Arm',
    'CT',
    'MRI',
    'Nuclear Medicine',
    'PET/CT',
    'Ultrasound',
    'Vascular',
    'Mammography',
    'Cardiac Cath Lab',
];

export const partners = [
    'partner-one',
    'partner-two',
    'partner-three',
    'partner-four',
    'partner-five',
    'partner-six',
    'partner-seven',
].map((name) => `/images/partners/${name}.png`);
