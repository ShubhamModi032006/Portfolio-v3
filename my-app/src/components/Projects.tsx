"use client"
import { motion, AnimatePresence } from "motion/react";
import { useState, memo } from "react";
import { ArrowUpRight, Github, X, Play, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "FinCtrl",
        category: "Full Stack",
        image: "https://res.cloudinary.com/dqhn4dq02/image/upload/v1741248835/hudrwpm8ah1hnlfo0ahm.png",
        link: "https://fin-ctrl-frontend-1.onrender.com",
        github: "https://github.com/shubhamiscodding/Fin_Ctrl",
        description: "A comprehensive financial management system to track expenses and manage budgets effectively.",
        technologies: ["MongoDB", "Express", "React", "Node.js"],
        demoVideo: "https://res.cloudinary.com/dqhn4dq02/video/upload/v1740999850/p5ditex5ags07kvajspz.mp4",
        featured: true
    },
    {
        id: 2,
        title: "Fast-Typing",
        category: "Full Stack",
        image: "https://placehold.co/650x550/E9F0E6/333?text=Fast+Typing",
        link: "https://gemini-type.vercel.app/",
        github: "https://github.com/ShubhamModi032006/Gemini-type",
        description: "Generates text with a fast-typing effect using the Gemini API.",
        technologies: ["Gemini API", "Next.js"],
    },
    {
        id: 3,
        title: "File Uploader",
        category: "Full Stack",
        image: "https://placehold.co/650x550/E9F0E6/333?text=Multer+Storage",
        link: "#",
        github: "#",
        description: "Backend project for local file storage using Node.js and Multer.",
        technologies: ["Node.js", "Multer", "Express"],
    },
    {
        id: 4,
        title: "Progcap Clone",
        category: "Frontend",
        image: "https://cdn.prod.website-files.com/6193782af8f15b5c5763d1de/619b51335bf284cd78d1b5e1_Progcap_Logo.svg",
        link: "https://progcap-clone.onrender.com",
        github: "https://github.com/shubhamiscodding/progcap-clone",
        description: "A pixel-perfect clone of the Progcap platform showcasing responsive design.",
        technologies: ["React", "CSS"],
    },
    {
        id: 5,
        title: "Apollo Clone",
        category: "Frontend",
        image: "https://images.apollo247.in/images/pharmacy_logo.svg?tr=q-70,w-100,dpr-2,c-at_max",
        link: "https://apolloclone.onrender.com",
        github: "https://github.com/shubhamiscodding/apolloclone",
        description: "A faithful recreation of the Apollo healthcare platform interface.",
        technologies: ["HTML", "CSS"],
    },
    {
        id: 6,
        title: "Youtube Clone",
        category: "Frontend",
        image: "https://cdn.iconscout.com/icon/free/png-512/free-youtube-104-432560.png?f=webp&w=512",
        link: "https://youtube-frontend-ch16.onrender.com",
        github: "https://github.com/shubhamiscodding/spotify-with-react/tree/main/you-vite-react",
        description: "A feature-rich YouTube clone implementing core functionalities.",
        technologies: ["React", "API"],
    },
    {
        id: 7,
        title: "Finctrl UI",
        category: "Figma",
        image: "https://res.cloudinary.com/dqhn4dq02/image/upload/v1741248835/hudrwpm8ah1hnlfo0ahm.png",
        link: "https://www.figma.com/proto/DNBtQzukvRqvlJOR15WNiD/FINAL-PROJECT?node-id=165-316&t=IJSgkeDiJ1yPqsuJ-1",
        description: "A sleek Figma prototype for a financial management tool.",
        technologies: ["Figma", "UI Design"],
    },
    {
        id: 8,
        title: "Smellwell",
        category: "Figma",
        image: "https://placehold.co/600x400/E9F0E6/333?text=SmellWell",
        link: "https://www.figma.com/proto/9tFxecNpUhwc9yXIunCS2P/something-like-cloning?page-id=218%3A73&node-id=227-440&viewport=588%2C159%2C0.11&t=IH2rnykLPCUofh1R-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=227%3A440",
        description: "A fragrance brand landing page design featuring advanced prototyping.",
        technologies: ["Figma"],
    },
    {
        id: 9,
        title: "Cricknews",
        category: "Figma",
        image: "https://wallpapercave.com/wp/wp6916613.jpg",
        link: "https://www.figma.com/proto/9tFxecNpUhwc9yXIunCS2P/something-like-cloning?node-id=90-400&t=uwCXGdlQ3AxLspQy-1",
        description: "A Figma prototype for a cricket news platform with interactive elements.",
        technologies: ["Figma"],
    },
    {
        id: 10,
        title: "Instagram",
        category: "Figma",
        image: "https://res.cloudinary.com/dqhn4dq02/image/upload/v1745691177/czc457xnddhzuvobj8xt.jpg",
        link: "https://www.figma.com/proto/9tFxecNpUhwc9yXIunCS2P/something-like-cloning?node-id=43-87&t=uwCXGdlQ3AxLspQy-1",
        description: "A Figma recreation of Instagram's interface with prototyping features.",
        technologies: ["Figma"],
    },
    {
        id: 11,
        title: "Social Media",
        category: "Figma",
        image: "https://res.cloudinary.com/dqhn4dq02/image/upload/v1740113499/hinsjwtehr2aoxyj0f0s.png",
        link: "https://www.figma.com/proto/1rN6JDvA6MVeTwyABaoaHO/EXAM-BUT-UNIQE-IDEA?page-id=0%3A1&node-id=2-2&p=f&viewport=500%2C484%2C0.63&t=YXlQOTdePAZgLyKv-1&scaling=min-zoom&content-scaling=fixed",
        description: "A unique one-page social media design created in Figma.",
        technologies: ["Figma"],
    }
];

const ProjectCard = memo(function ProjectCard({ project, onVideoClick }: { project: typeof projects[0], onVideoClick: (url: string) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="group relative h-[450px] w-full rounded-3xl overflow-hidden bg-white/5 border border-white/10"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-fill transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                />
            </div>

            {/* Default Overlay - Minimal darkening */}
            <div className="absolute inset-0 bg-black/20 z-10 transition-colors duration-500 group-hover:bg-black/60 backdrop-blur-[0px] group-hover:backdrop-blur-sm" />

            {/* Category Label - Visible Always */}
            <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-mono uppercase tracking-wider text-white border border-white/10">
                    {project.category}
                </span>
            </div>

            {/* Play Button for Video Projects - Visible on default if video exists */}
            {project.demoVideo && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onVideoClick(project.demoVideo!);
                    }}
                    aria-label="Play Demo"
                    className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-neon-main/90 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-neon-main"
                >
                    <Play className="w-4 h-4 fill-black" />
                </button>
            )}

            {/* Content Overlay - Slides up on hover */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-5 drop-shadow-md">
                        {project.title}
                    </h3>

                    {/* Details Container - Fades/Slides in */}
                    <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                        <p className="text-neutral-300 text-sm mb-4 line-clamp-2">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            {project.technologies.map((tech) => (
                                <span key={tech} className="text-[10px] font-bold text-neon-main uppercase tracking-wider">
                                    #{tech}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            {project.github && project.github !== "#" && (
                                <Link
                                    href={project.github}
                                    target="_blank"
                                    className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                                >
                                    <Github className="w-3 h-3" /> Code
                                </Link>
                            )}
                            {project.link && (
                                <Link
                                    href={project.link}
                                    target="_blank"
                                    className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all"
                                >
                                    Visit <ArrowUpRight className="w-3 h-3" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
})

const CATEGORIES = ["Full Stack", "Frontend", "Figma"];

export default function Projects() {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState("Full Stack");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const filteredProjects = projects.filter(p => p.category === activeCategory);

    return (
        <section id="projects" className="py-24 bg-black min-h-screen">
            <div className="px-6 md:px-12">
                <div className="max-w-4xl mb-20 relative">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                        <div>
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">
                                SELECTED <br />
                                <span className="text-neutral-500">WORKS.</span>
                            </h2>
                            <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-2xl">
                                Innovative digital experiences designed with precision and passion.
                            </p>
                        </div>

                        {/* Dropdown Filter */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center justify-between gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl min-w-[180px] text-white hover:bg-white/10 transition-colors"
                            >
                                <span className="text-sm font-mono tracking-wider uppercase">{activeCategory}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                            </button>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 top-full mt-2 w-full min-w-[180px] bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 py-1"
                                    >
                                        {CATEGORIES.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => {
                                                    setActiveCategory(category);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-5 py-3 text-sm font-mono tracking-wider uppercase transition-colors hover:bg-white/5 ${activeCategory === category ? "text-neon-main" : "text-neutral-400"
                                                    }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Grid changed to 1 column as requested */}
                <div className="grid grid-cols-1 gap-12 w-full">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} onVideoClick={setSelectedVideo} />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedVideo(null)}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-20"
                    >
                        <button aria-label="Close Video" className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50">
                            <X className="w-8 h-8" />
                        </button>
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                        >
                            <video
                                src={selectedVideo}
                                className="w-full h-full object-contain"
                                controls
                                autoPlay
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
