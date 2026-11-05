import { ArrowRight, ArrowUpRight, FileText } from 'lucide-react';
import ButtonLink from '@/components/site/button-link';
import CheckList from '@/components/site/check-list';
import Container from '@/components/site/container';
import CtaSection from '@/components/site/cta-section';
import PageHero from '@/components/site/page-hero';
import SectionHeading from '@/components/site/section-heading';
import { contact, ctProgram } from '@/routes';

const enrollHref = contact({ query: { topic: 'ct-program' } });

const institutionalOutcomes = [
    {
        title: 'Demonstrate Advanced Technical Competence',
        description:
            'Apply advanced principles of imaging physics, instrumentation and technology to produce diagnostic-quality medical images.',
    },
    {
        title: 'Apply Clinical Judgment and Problem Solving',
        description:
            'Analyze clinical scenarios, select appropriate imaging protocols and modify technical parameters to optimize image quality and patient outcomes.',
    },
    {
        title: 'Ensure Patient Safety and Quality Care',
        description:
            'Implement radiation protection principles, patient safety standards and ethical practices across advanced imaging procedures.',
    },
    {
        title: 'Communicate Effectively in Healthcare Environments',
        description:
            'Communicate clearly and professionally with patients, peers, radiologists and interdisciplinary healthcare teams.',
    },
    {
        title: 'Demonstrate Professionalism and Ethical Responsibility',
        description:
            'Uphold professional standards, regulatory requirements and ethical decision-making in advanced medical imaging practice.',
    },
    {
        title: 'Engage in Lifelong Learning and Professional Development',
        description:
            'Evaluate emerging technologies, evidence-based practices and continuing education opportunities to support ongoing professional growth.',
    },
];

const programOutcomes = [
    'Explain CT system design, components and operational principles.',
    'Describe CT image formation, data acquisition, reconstruction methods and detector technology.',
    'Analyze factors affecting CT image quality, including spatial resolution, contrast resolution, noise, dose, pitch, slice thickness and reconstruction parameters.',
    'Apply radiation safety principles and dose optimization strategies specific to CT imaging.',
    'Demonstrate safe patient handling, positioning and communication techniques for CT examinations.',
    'Perform IV contrast administration procedures in accordance with institutional policies and patient safety guidelines.',
    'Identify cross-sectional anatomy and common pathologies relevant to CT imaging.',
    'Recognize, analyze and troubleshoot common CT artifacts.',
    'Prepare for successful completion of national CT certification examinations.',
];

const modules = [
    {
        title: 'Systems Operations and Components',
        topics: [
            'CT overview & historical perspective',
            'Interface and gantry components',
            'Patient table and coordinate system',
            'X-ray tube structure & production',
            'Tube current & tube voltage',
            'Collimation & CT detectors',
            'Array processor',
            'RIS / EMR / EHR systems',
        ],
    },
    {
        title: 'CT Image Formation',
        topics: [
            'Pixel / voxel / matrix',
            'CT scanning methods and principles',
            'X-ray photon sampling',
            'Image reconstruction — FBP',
            'Iterative & cone beam reconstruction',
            'Post processing',
        ],
    },
    {
        title: 'CT Image Quality',
        topics: [
            'CT parameter selection',
            'Linear attenuation coefficient',
            'Hounsfield units',
            'Optimizing mA / kVp',
            'Slice thickness',
            'Pitch and reconstruction interval',
        ],
    },
    {
        title: 'Patient Handling & Safety',
        topics: [
            'Patient positioning and immobilization',
            'Radiation protection and ALARA',
            'Infection control and emergency procedures',
        ],
    },
    {
        title: 'IV Procedures & Contrast Agents',
        topics: [
            'Venous access techniques',
            'Contrast pharmacology and administration',
            'Adverse reactions and management',
        ],
    },
    {
        title: 'CT Exam & Anatomy — Part 1',
        topics: [
            'Head, neck, chest and spine CT exams',
            'Cross-sectional anatomy recognition',
        ],
    },
    {
        title: 'CT Exam & Anatomy — Part 2',
        topics: [
            'Abdomen, pelvis and musculoskeletal CT exams',
            'Trauma and angiographic considerations',
        ],
    },
    {
        title: 'CT Artifacts',
        topics: [
            'Physics-based and patient-related artifacts',
            'Motion, beam hardening, partial volume and metal artifacts',
            'Artifact prevention and correction strategies',
        ],
    },
];

const instructionalMethods = [
    'Recorded lectures and presentations',
    'Live or recorded board-review sessions',
    'Case-based discussions',
    'Image analysis exercises',
    'Self-assessment quizzes',
];

const assessments = [
    'Module quizzes and exams',
    'Image interpretation exercises',
    'Participation in review sessions',
    'Comprehensive final assessment or board-style examination',
];

const grading = [
    { label: 'Module Quizzes', weight: 40 },
    { label: 'Assignments / Case Studies', weight: 30 },
    { label: 'Final Exam / Comprehensive Assessment', weight: 30 },
];

const arrtResources = [
    {
        label: 'Postprimary Eligibility Handbook',
        href: 'https://assets-us-01.kc-usercontent.com/406ac8c6-58e8-00b3-e3c1-0c312965deb2/6b9300df-bd64-4a7a-a87a-5eca16c9483f/postprimary-eligibility-pathway-handbook.pdf',
    },
    {
        label: 'Examination Content Specifications — effective September 1, 2026',
        href: 'https://assets-us-01.kc-usercontent.com/406ac8c6-58e8-00b3-e3c1-0c312965deb2/7e8095ab-e424-496d-a5d4-d1e951d5783b/CT_Content_Specifications_2026.pdf',
    },
    {
        label: 'Task Inventory — effective September 1, 2026',
        href: 'https://assets-us-01.kc-usercontent.com/406ac8c6-58e8-00b3-e3c1-0c312965deb2/09a3d213-3608-44e3-8c38-04f5fc697578/CT_Task_Inventory_2026.pdf',
    },
];

export default function CtCurriculum() {
    return (
        <>
            <PageHero
                eyebrow="Complete Computed Tomography Review Program"
                title="CT Program curriculum"
                description="An advanced imaging certification program for credentialed radiologic science professionals seeking specialized competence in CT imaging — preparing learners for safe clinical practice and successful performance on national CT certification examinations."
                image="/images/ct-schedule.jpg"
            >
                <ButtonLink href={enrollHref} size="lg">
                    Enroll — $1,995
                    <ArrowRight />
                </ButtonLink>
                <ButtonLink href={ctProgram()} size="lg" variant="ghostLight">
                    Program overview
                </ButtonLink>
            </PageHero>

            <section className="bg-white py-24 sm:py-28">
                <Container className="grid gap-16 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <SectionHeading
                            eyebrow="Program overview"
                            title="Specialized competence in CT imaging"
                        />
                        <p className="mt-6 text-lg leading-relaxed text-slate-600">
                            The program emphasizes CT physics, system
                            operations, image formation, image quality
                            optimization, patient safety, contrast
                            administration, cross-sectional anatomy, pathology
                            recognition and artifact analysis — building a
                            foundation for future advanced imaging
                            certifications.
                        </p>
                    </div>
                    <div className="lg:col-span-7">
                        <h3 className="font-display text-xl font-bold text-navy-950">
                            CT Program Learning Outcomes
                        </h3>
                        <p className="mt-2 text-slate-600">
                            Upon completion of the CT Program, learners will be
                            able to:
                        </p>
                        <CheckList items={programOutcomes} className="mt-6" />
                    </div>
                </Container>
            </section>

            <section className="bg-navy-950 py-24 sm:py-28">
                <Container>
                    <SectionHeading
                        tone="dark"
                        eyebrow="Program structure"
                        title="Eight modules, from physics to artifacts"
                    />
                    <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {modules.map((module, index) => (
                            <div
                                key={module.title}
                                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-brand-400/50 hover:bg-white/10"
                            >
                                <p className="text-xs font-semibold tracking-[0.18em] text-brand-300 uppercase">
                                    Module {index + 1}
                                </p>
                                <h3 className="mt-2 font-display text-lg font-bold text-white">
                                    {module.title}
                                </h3>
                                <ul className="mt-4 grid gap-2 text-sm text-slate-300">
                                    {module.topics.map((topic) => (
                                        <li key={topic} className="flex gap-2">
                                            <span className="mt-2 size-1 shrink-0 rounded-full bg-brand-400" />
                                            {topic}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-slate-50 py-24 sm:py-28">
                <Container>
                    <SectionHeading
                        eyebrow="Institutional learning outcomes"
                        title="What every advanced imaging learner achieves"
                    />
                    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {institutionalOutcomes.map((outcome, index) => (
                            <div
                                key={outcome.title}
                                className="rounded-3xl border border-slate-200 bg-white p-8"
                            >
                                <p className="font-display text-sm font-bold text-brand-500">
                                    0{index + 1}
                                </p>
                                <h3 className="mt-3 font-display text-lg font-bold text-navy-950">
                                    {outcome.title}
                                </h3>
                                <p className="mt-2 leading-relaxed text-slate-600">
                                    {outcome.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-white py-24 sm:py-28">
                <Container className="grid gap-6 lg:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 p-8">
                        <h3 className="font-display text-xl font-bold text-navy-950">
                            Instructional methods
                        </h3>
                        <CheckList
                            items={instructionalMethods}
                            className="mt-6"
                        />
                    </div>
                    <div className="rounded-3xl border border-slate-200 p-8">
                        <h3 className="font-display text-xl font-bold text-navy-950">
                            Assessment & evaluation
                        </h3>
                        <CheckList items={assessments} className="mt-6" />
                    </div>
                    <div className="rounded-3xl bg-brand-50 p-8">
                        <h3 className="font-display text-xl font-bold text-navy-950">
                            Grading policy
                        </h3>
                        <ul className="mt-6 grid gap-5">
                            {grading.map((item) => (
                                <li key={item.label}>
                                    <div className="flex justify-between gap-4 text-sm font-semibold text-navy-950">
                                        <span>{item.label}</span>
                                        <span>{item.weight}%</span>
                                    </div>
                                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                                        <div
                                            className="h-full rounded-full bg-brand-500"
                                            style={{ width: `${item.weight}%` }}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 text-sm text-slate-600">
                            A minimum passing score of 75% is required for
                            program completion.
                        </p>
                    </div>
                </Container>

                <Container className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 p-8">
                        <h3 className="font-display text-xl font-bold text-navy-950">
                            Professional & ethical expectations
                        </h3>
                        <p className="mt-4 leading-relaxed text-slate-600">
                            Students are expected to maintain professionalism,
                            adhere to ethical standards and comply with all
                            institutional and clinical policies. Academic
                            integrity and respectful communication are required
                            at all times.
                        </p>
                        <h3 className="mt-8 font-display text-xl font-bold text-navy-950">
                            Program completion
                        </h3>
                        <p className="mt-4 leading-relaxed text-slate-600">
                            Upon successful completion, students receive a
                            Certificate of Completion verifying advanced CT
                            education hours applicable toward certification and
                            continuing education requirements.
                        </p>
                    </div>
                    <div className="rounded-3xl bg-navy-950 p-8">
                        <h3 className="font-display text-xl font-bold text-white">
                            ARRT requirements & guidelines
                        </h3>
                        <ul className="mt-6 grid gap-3">
                            {arrtResources.map((resource) => (
                                <li key={resource.href}>
                                    <a
                                        href={resource.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-semibold text-white transition hover:border-brand-400/60"
                                    >
                                        <FileText className="size-5 shrink-0 text-brand-300" />
                                        <span className="flex-1">
                                            {resource.label}
                                        </span>
                                        <ArrowUpRight className="size-4 text-slate-400 transition group-hover:text-white" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 text-xs text-slate-400">
                            This syllabus is subject to revision to reflect
                            advancements in technology, accreditation standards
                            and certification requirements.
                        </p>
                    </div>
                </Container>
            </section>

            <CtaSection
                title="Ready to start your CT journey?"
                description="Enroll in the Complete Computed Tomography Review Program today."
            >
                <ButtonLink href={enrollHref} size="lg">
                    Enroll Now
                </ButtonLink>
            </CtaSection>
        </>
    );
}
