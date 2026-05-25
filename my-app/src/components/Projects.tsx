"use client"
import { motion, AnimatePresence } from "motion/react";
import { useState, memo } from "react";
import { ArrowUpRight, Github, X, Play, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { projects, Project } from "@/data/projects";

const gradientClasses = [
    "from-indigo-500/20 to-purple-500/20",
    "from-blue-500/20 to-cyan-500/20",
    "from-emerald-500/20 to-teal-500/20",
    "from-rose-500/20 to-orange-500/20",
    "from-fuchsia-500/20 to-pink-500/20",
];

const ProjectCard = memo(function ProjectCard({ project, index, onVideoClick }: { project: Project, index: number, onVideoClick: (url: string) => void }) {
    const bgGradient = gradientClasses[index % gradientClasses.length];
    const router = useRouter();

    const handleCardClick = (e: React.MouseEvent) => {
        // If user clicked an anchor, button, or their icons, do not trigger card navigation
        if ((e.target as HTMLElement).closest("a") || (e.target as HTMLElement).closest("button")) {
            return;
        }
        router.push(`/projects/${project.slug}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            onClick={handleCardClick}
            className="group relative w-full aspect-[4/3] sm:aspect-square lg:aspect-[4/3] rounded-[2rem] overflow-hidden bg-[#0d0e12] border border-white/5 transition-all duration-500 hover:border-white/10 flex flex-col cursor-pointer"
        >
            {/* Soft Gradient Overlay matching the style */}
            <div className={`absolute inset-0 opacity-40 transition-opacity duration-700 bg-gradient-to-br ${bgGradient} group-hover:opacity-70`} />

            {/* Top Toolbar (Elevated z-30) */}
            <div className="absolute top-0 left-0 right-0 p-6 md:p-8 flex justify-end items-start z-30 pointer-events-none">
                 {project.demoVideo && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onVideoClick(project.demoVideo!);
                        }}
                        aria-label="Play Demo"
                        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] pointer-events-auto"
                    >
                        <Play className="w-4 h-4 fill-black translate-x-[1px]" />
                    </button>
                )}
            </div>

            {/* Mockup Container (z-10) pushes down using padding */}
            <div className="relative z-10 p-6 md:p-8 pt-20 md:pt-20 flex flex-col h-full pointer-events-none">
                 {/* Browser Mockup Image container */}
                 <div className="flex-1 w-full rounded-t-xl overflow-hidden shadow-2xl relative transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-[1.02] border border-white/10 border-b-0 pointer-events-auto">
                       {/* Window Safari Navbar */}
                       <div className="h-6 bg-[#1a1b1e]/90 backdrop-blur-sm border-b border-white/5 flex items-center px-4 gap-1.5 absolute top-0 w-full z-10 rounded-t-xl">
                            <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                            <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                            <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                       </div>
                       {/* Image Wrapper */}
                       <div className="absolute top-6 left-0 right-0 bottom-0 bg-[#0a0a0a]">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover object-top opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                                unoptimized
                            />
                       </div>
                 </div>
            </div>

            {/* Hover details overlay inside a dark panel */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/95 to-transparent pt-32 transition-all duration-500 z-20 flex flex-col justify-end">
                {/* Title element */}
                <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-widest uppercase drop-shadow-xl">
                        {project.title}
                    </h3>
                </div>

                {/* Grid expansion trick for details */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                    <div className="overflow-hidden">
                        <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex flex-col gap-3">
                            <p className="text-neutral-400 text-[11px] sm:text-xs line-clamp-2 sm:line-clamp-3 leading-relaxed">
                                {project.description}
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-1.5">
                                {project.technologies.map((tech) => (
                                    <span key={tech} className="px-1.5 py-0.5 rounded bg-[#1a1b1e]/50 border border-white/10 text-[9px] font-mono text-neutral-300 uppercase tracking-wider backdrop-blur-md">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 pt-1.5">
                                {project.github && project.github !== "#" && (
                                    <Link
                                        href={project.github}
                                        target="_blank"
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black rounded-full text-[9px] font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
                                    >
                                        <Github className="w-3 h-3" /> Code
                                    </Link>
                                )}
                                {project.link && (
                                    <Link
                                        href={project.link}
                                        target="_blank"
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-white border border-white/20 rounded-full text-[9px] font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all"
                                    >
                                        Visit <ArrowUpRight className="w-3 h-3" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
})

const CATEGORIES = ["All", "Full Stack", "Frontend", "Figma", "Hackathon"];

export default function Projects() {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const filteredProjects = activeCategory === "All" 
        ? projects 
        : projects.filter(p => p.category === activeCategory);

    return (
        <section id="projects" className="py-24 bg-black min-h-screen">
            <div className="px-6 md:px-12">
                <div className="w-full mb-20 relative">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 w-full">
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

                {/* Reverted Grid to 2 columns matching the styling requested */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} onVideoClick={setSelectedVideo} />
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
