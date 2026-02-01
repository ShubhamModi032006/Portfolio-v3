
const experiences = [
    {
        date: "2024 — Present",
        title: "Senior Frontend Engineer",
        company: "Tech Corp",
        description:
            "Deliver high-quality, robust production code for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more. Provide leadership within the engineering department through close collaboration with leads and directors on technical assessments, new standards and processes, and core hiring initiatives.",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind"],
    },
    {
        date: "2018 — 2024",
        title: "Lead Engineer",
        company: "Upstatement",
        description:
            "Developed, maintained, and shipped production code for client websites. Clients included JetBlue, Lovesac, U.S. Senator Raphael Warnock, The Verge, and more.",
        technologies: ["Vue", "Nuxt", "SCSS", "PHP"],
    },
    {
        date: "2024 — Present",
        title: "Senior Frontend Engineer",
        company: "Tech Corp",
        description:
            "Deliver high-quality, robust production code for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more. Provide leadership within the engineering department through close collaboration with leads and directors on technical assessments, new standards and processes, and core hiring initiatives.",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind"],
    },
];

export default function Experience() {
    return (
        <section
            id="experience"
            className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
            aria-label="Work experience"
        >
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-neutral-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                    Experience
                </h2>
            </div>
            <div>
                <ol className="group/list">
                    {experiences.map((job, index) => (
                        <li key={index} className="mb-12">
                            <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                                <header
                                    aria-label={job.date}
                                    className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
                                >
                                    {job.date}
                                </header>
                                <div className="z-10 sm:col-span-6">
                                    <h3 className="font-medium leading-snug text-slate-200">
                                        <div>
                                            <a
                                                className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link"
                                                href="#"
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label={`${job.title} at ${job.company}`}
                                            >
                                                <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                                                <span>
                                                    {job.title} ·{" "}
                                                    <span className="inline-block">
                                                        {job.company}
                                                        {/* Arrow Icon would go here */}
                                                    </span>
                                                </span>
                                            </a>
                                        </div>
                                    </h3>
                                    <p className="mt-2 text-sm leading-normal text-slate-400">
                                        {job.description}
                                    </p>
                                    <ul
                                        className="mt-2 flex flex-wrap"
                                        aria-label="Technologies used"
                                    >
                                        {job.technologies.map((tech) => (
                                            <li key={tech} className="mr-1.5 mt-2">
                                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                                    {tech}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
