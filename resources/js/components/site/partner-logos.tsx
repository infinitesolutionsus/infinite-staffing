import Container from '@/components/site/container';
import { partners } from '@/lib/site';

export default function PartnerLogos({
    title = 'Proud to partner with leading healthcare organizations',
}: {
    title?: string;
}) {
    return (
        <section className="border-y border-slate-200 bg-white py-12">
            <Container>
                <p className="text-center text-sm font-semibold tracking-[0.18em] text-slate-500 uppercase">
                    {title}
                </p>
                <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-4 lg:grid-cols-7">
                    {partners.map((logo) => (
                        <img
                            key={logo}
                            src={logo}
                            alt="Partner organization logo"
                            loading="lazy"
                            className="mx-auto h-14 w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}
