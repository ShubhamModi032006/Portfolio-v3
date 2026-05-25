"use client";

import { motion } from "motion/react";
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  BookOpen, 
  Terminal, 
  Cpu, 
  Calendar, 
  Layers 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";

// Helper to parse standard YouTube share and search links into embeddable URLs
const getYouTubeEmbedUrl = (url?: string) => {
  if (!url) return null;
  let videoId = "";
  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("youtube.com/watch")) {
    const parts = url.split("?")[1] || "";
    const urlParams = new URLSearchParams(parts);
    videoId = urlParams.get("v") || "";
  } else if (url.includes("youtube.com/embed/")) {
    videoId = url.split("youtube.com/embed/")[1].split("?")[0];
  }
  
  if (videoId) {
    // Autoplay, mute, infinite looping enabled
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&rel=0`;
  }
  return null;
};

export default function ProjectDetails({ project }: { project: Project }) {
  const ytEmbedUrl = getYouTubeEmbedUrl(project.demoVideo);

  return (
    <div className="min-h-screen bg-black text-slate-300 py-12 px-6 md:px-12 lg:py-20">
      
      {/* ── BACK BUTTON ── */}
      <div className="mb-12">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-3 text-sm font-mono tracking-widest text-neutral-500 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
          BACK TO SELECTED WORKS
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:gap-16">
        
        {/* ── HEADER TITLE & CTAS ── */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 text-xs font-mono tracking-widest uppercase bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-3 py-1 text-xs font-mono tracking-widest uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full">
                Featured Case
              </span>
            )}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white font-display uppercase">
            {project.title}
          </h1>

          <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed max-w-4xl">
            {project.description}
          </p>

          {/* Links Action Bar */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.4)]"
              >
                Visit Live Site <ExternalLink className="w-4 h-4" />
              </Link>
            )}
            
            {project.github && project.github !== "#" && (
              <Link
                href={project.github}
                target="_blank"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 hover:border-neutral-700 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
              >
                GitHub Source <Github className="w-4 h-4" />
              </Link>
            )}

            {project.postman && (
              <Link
                href={project.postman}
                target="_blank"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-orange-600/10 hover:bg-orange-600 text-orange-400 hover:text-white border border-orange-500/20 hover:border-orange-500 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(249,115,22,0.15)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.35)]"
              >
                Postman API Docs <Terminal className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* ── PREMIUM SAFARI MOCKUP & VIDEO/IMAGE ── */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-[#0d0e12] border border-white/5 shadow-2xl flex flex-col group">
          {/* Subtle Glowing Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-purple-600/5 to-transparent opacity-60 pointer-events-none" />

          {/* Window Header */}
          <div className="h-10 bg-[#121318] border-b border-white/5 flex items-center justify-between px-6 shrink-0 z-10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            {/* Address Bar */}
            <div className="hidden sm:block text-xs font-mono text-neutral-500 bg-black/45 border border-white/5 px-8 py-1 rounded-md max-w-sm w-full text-center truncate">
              {project.link.replace("https://", "").replace("www.", "")}
            </div>
            <div className="w-14" /> {/* Spacer */}
          </div>

          {/* Content Space */}
          <div className="flex-1 relative bg-black overflow-hidden flex items-center justify-center">
            {ytEmbedUrl ? (
              <iframe
                src={ytEmbedUrl}
                className="w-full h-full border-0 absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={`${project.title} Demo Video`}
              />
            ) : project.demoVideo ? (
              <video
                src={project.demoVideo}
                className="w-full h-full object-cover md:object-contain bg-black"
                controls
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="100vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-102"
                unoptimized
              />
            )}
          </div>
        </div>

        {/* ── DETAILED GRID LAYOUT ── */}
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12"
          >
            {/* Left side detail texts */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-500" /> Project Overview
                </h2>
                <p className="text-lg text-neutral-400 leading-relaxed font-light">
                  {project.longDescription || project.description}
                </p>
              </div>

              <div className="h-px bg-white/5" />

              <div>
                <h3 className="text-md font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-3">
                  <Layers className="w-4 h-4 text-blue-500" /> Core Features & Architecture
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <li className="flex items-start gap-3 text-neutral-400 text-sm md:text-base leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
                    Responsive interface carefully optimized across desktop, tablet, and mobile browsers.
                  </li>
                  <li className="flex items-start gap-3 text-neutral-400 text-sm md:text-base leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
                    Engaging micro-animations and transitions designed to enhance the layout.
                  </li>
                  <li className="flex items-start gap-3 text-neutral-400 text-sm md:text-base leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
                    Clean modular files built with modern practices and highly cohesive files structure.
                  </li>
                  <li className="flex items-start gap-3 text-neutral-400 text-sm md:text-base leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
                    Designed using curated dark styling palettes matching Shubham&apos;s signature theme.
                  </li>
                </ul>
              </div>
            </div>

            {/* Right side specs card */}
            <div className="flex flex-col gap-6">
              
              {/* Core Details Panel */}
              <div className="bg-[#0b0c10]/40 border border-white/5 rounded-3xl p-8 flex flex-col gap-6 backdrop-blur-sm shadow-xl">
                <div>
                  <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5" /> Technical Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg bg-neutral-900/80 border border-white/5 text-xs font-mono text-white tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-white/5" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">
                      Type
                    </h4>
                    <p className="text-sm font-semibold text-white">{project.category}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">
                      Timeline
                    </h4>
                    <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" /> 2026
                    </p>
                  </div>
                </div>
              </div>

              {/* Elegant Postman callout card */}
              {project.postman && (
                <div className="relative overflow-hidden bg-gradient-to-br from-orange-600/10 to-amber-600/5 border border-orange-500/20 rounded-3xl p-8 flex flex-col gap-4 shadow-[0_4px_30px_rgba(249,115,22,0.05)]">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-xl pointer-events-none" />
                  
                  <span className="px-2.5 py-1 text-[9px] font-mono font-bold tracking-widest uppercase bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-md w-fit">
                    API Reference
                  </span>

                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                    Postman Workspace
                  </h3>
                  
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    Review and test request structures, query parameters, payloads, and response models inside the public Postman documentation.
                  </p>

                  <Link
                    href={project.postman}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 hover:scale-102 active:scale-98 shadow-md"
                  >
                    Open Workspace <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
