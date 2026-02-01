"use client"
import { motion } from 'framer-motion';
import { memo } from 'react';

// Data extracted from your previous image and project files
const SKILL_DATA = [
    {
        category: "Languages",
        skills: ["JavaScript (ES6+)", "HTML5", "CSS3/SCSS", "C++"]
    },
    {
        category: "Frameworks & Libraries",
        skills: ["React", "Next.js", "Tailwind CSS", "Node.js", "Express"]
    },
    {
        category: "Tools & Platforms",
        skills: ["Git", "GitHub", "Vercel", "Figma", "VS Code", "Postman", "Netlify"]
    },
    {
        category: "Databases",
        skills: ["PostgreSQL", "MongoDB"]
    },
    {
        category: "Concepts & Arch",
        skills: ["REST API", "JWT Auth", "RBAC", "SEO Optimization"]
    }
];

const CategoryCard = memo(({ category, skills }: { category: string, skills: string[] }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all duration-500"
    >
        <h3 className="text-xs font-mono tracking-[0.3em] text-neutral-500 uppercase mb-6 group-hover:text-white transition-colors">
            {category}
        </h3>
        <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
                <span
                    key={skill}
                    className="text-lg md:text-xl font-medium text-neutral-400 group-hover:text-white transition-colors cursor-default"
                >
                    {skill}<span className="text-neutral-700 ml-2 group-last:hidden">•</span>
                </span>
            ))}
        </div>
    </motion.div>
));

CategoryCard.displayName = "CategoryCard";

export default function Skills() {
    return (
        <section id="skills" className="min-h-screen py-24 bg-black">
            <div className="px-6 md:px-12">
                <div className="max-w-4xl mb-20">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">
                        TECHNICAL <br />
                        <span className="text-neutral-500">EXPERTISE.</span>
                    </h2>
                    <p className="text-xl text-neutral-400 font-light leading-relaxed">
                        I specialize in the <span className="text-white">MERN Stack</span> and modern cloud infrastructure, focusing on creating high-performance, accessible web applications.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Main Large Card for MERN */}
                    <div className="md:col-span-2 p-6 md:p-10 rounded-3xl bg-white text-black overflow-hidden relative group">
                        <div className="relative z-10">
                            <h3 className="text-xs md:text-sm font-mono tracking-widest uppercase mb-2 opacity-60">Core Stack</h3>
                            <p className="text-3xl md:text-6xl font-bold tracking-tighter break-words">MERN STACK SPECIALIST</p>
                            <div className="mt-8 flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-2">MongoDB <span>⇢</span></span>
                                <span className="flex items-center gap-2">Express <span>⇢</span></span>
                                <span className="flex items-center gap-2">React <span>⇢</span></span>
                                <span>Node</span>
                            </div>
                        </div>
                        {/* Subtle aesthetic element */}
                        <div className="absolute -right-10 -bottom-10 text-[6rem] md:text-[12rem] font-black opacity-5 select-none transition-transform duration-700 group-hover:scale-110">
                            MERN
                        </div>
                    </div>

                    {/* Dynamic Category Cards */}
                    {SKILL_DATA.map((item) => (
                        <CategoryCard key={item.category} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
