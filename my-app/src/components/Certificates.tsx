"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ExternalLink, CheckCircle2, Calendar, Award, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Certificate {
    id: number;
    title: string;
    issuer: string;
    date: string;
    image: string;
    link: string;
    id_code?: string;
    type?: string;
    category?: "Hackathons" | "Other";
}

const certificates: Certificate[] = [
    // --- HACKATHONS ---
    {
        id: 101,
        title: "HTT Hackathon",
        issuer: "SVNIT",
        date: "2024",
        image: "/HTT-NIT.pdf",
        link: "https://drive.google.com/file/d/1uBls7L8wHn8dgzan76ROSHtDO1-ct6ao/view?usp=drive_link",
        type: "competition",
        category: "Hackathons"
    },
    {
        id: 102,
        title: "Odoo Hackathon",
        issuer: "Indus University",
        date: "2024",
        image: "/OdooxIndus.pdf",
        link: "https://drive.google.com/file/d/1QCS3va2HsYlNNTLoRR-6r-5uZYLoAC9I/view?usp=drive_link",
        type: "competition",
        category: "Hackathons"
    },
    {
        id: 103,
        title: "Openpools Hackathon",
        issuer: "Openpools",
        date: "2024",
        image: "/openpools.pdf",
        link: "https://drive.google.com/file/d/1TQ3DCx6-QUzt46SQlh9FDDGUrjvNah3L/view?usp=drive_link",
        type: "competition",
        category: "Hackathons"
    },
    {
        id: 104,
        title: "RIFT Hackathon",
        issuer: "PW Pune",
        date: "2024",
        image: "/RIFT.pdf",
        link: "https://drive.google.com/file/d/1Ym9SXcEeElGaUZ_gWJ44SaBd9LaH15nT/view?usp=drive_link",
        type: "competition",
        category: "Hackathons"
    },
    // --- HIGH PRIORITY (Intermediate / Specialized) ---
    {
        id: 1,
        title: "Node.js (Intermediate)",
        issuer: "HackerRank",
        date: "2025",
        image: "/nodejs_intermediate_certificate_page-0001.jpg",
        link: "https://www.hackerrank.com/certificates/61af0bdbf806",
        id_code: "NODE_INT_01",
        type: "backend"
    },
    {
        id: 2,
        title: "Rest API (Intermediate)",
        issuer: "HackerRank",
        date: "2025",
        image: "/rest_api_intermediate_certificate_page-0001.jpg",
        link: "https://www.hackerrank.com/certificates/c45504a6100c",
        id_code: "REST_INT_02",
        type: "backend"
    },
    {
        id: 3,
        title: "JavaScript (Intermediate)",
        issuer: "HackerRank",
        date: "2025",
        image: "/javascript_intermediate_certificate_page-0001.jpg",
        link: "https://www.hackerrank.com/certificates/ed715b831fbf",
        id_code: "ED7158831FBF",
        type: "code"
    },
    {
        id: 4,
        title: "Problem Solving (Intermediate)",
        issuer: "HackerRank",
        date: "2025",
        image: "/problem_solving_intermediate_certificate_page-0001.jpg",
        link: "https://www.hackerrank.com/certificates/9f915b23d21b",
        id_code: "PS_INT_04",
        type: "algo"
    },
    {
        id: 5,
        title: "GitHub Copilot Fundamentals",
        issuer: "Microsoft / Simplilearn",
        date: "May 2025",
        image: "/github_page-0001.jpg",
        link: "https://simpli-web.app.link/e/j41OGmlBGZb",
        id_code: "8363721",
        type: "ai"
    },
    {
        id: 6,
        title: "Amazon DocumentDB",
        issuer: "AWS / Simplilearn",
        date: "May 2025",
        image: "/Amazon_documentDB_page-0001.jpg",
        link: "https://simpli-web.app.link/e/45TjJYuBGZb",
        id_code: "8365040",
        type: "cloud"
    },
    {
        id: 7,
        title: "Intro to Azure Services",
        issuer: "Simplilearn",
        date: "May 2025",
        image: "/Basic_Azure_services_page-0001.jpg",
        link: "#",
        id_code: "8381989",
        type: "cloud"
    },

    // --- MEDIUM PRIORITY (Basic Skills) ---
    {
        id: 8,
        title: "React (Basic)",
        issuer: "HackerRank",
        date: "2025",
        image: "/react_basic_certificate_page-0001.jpg",
        link: "https://www.hackerrank.com/certificates/be86f7642999",
        id_code: "REACT_bas_08",
        type: "frontend"
    },
    {
        id: 9,
        title: "SQL (Basic)",
        issuer: "HackerRank",
        date: "2025",
        image: "/sql_basic_certificate_page-0001.jpg",
        link: "https://www.hackerrank.com/certificates/6f817e93f1c3",
        id_code: "6F817E93F1C3",
        type: "database"
    },

    // --- BASE PRIORITY ---
    {
        id: 10,
        title: "Problem Solving (Basic)",
        issuer: "HackerRank",
        date: "May 2025",
        image: "/problem_solving_basic_certificate_page-0001.jpg",
        link: "https://www.hackerrank.com/certificates/66be564aa173",
        id_code: "66BE564AA173",
        type: "algo"
    },
    {
        id: 11,
        title: "CSS (Basic)",
        issuer: "HackerRank",
        date: "May 2025",
        image: "/css_certificate_page-0001.jpg",
        link: "https://www.hackerrank.com/certificates/907dd2eac522",
        id_code: "907DD2EAC522",
        type: "frontend"
    }
];

const CertCard = ({ cert, index }: { cert: Certificate; index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-neon-main/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(45,212,191,0.05)] flex flex-col h-full"
    >
        {/* Verification Strip Top */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-neon-main/50 transition-colors" />

        {/* Image Section */}
        <div className="relative h-48 w-full overflow-hidden bg-neutral-900 pointer-events-none">
            {cert.image ? (
                cert.image.endsWith('.pdf') ? (
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <iframe
                            src={`${cert.image}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                            className="absolute top-1/2 left-1/2 w-[800px] h-[600px] -translate-x-1/2 -translate-y-[55%] scale-[0.4] group-hover:scale-[0.42] object-cover opacity-70 grayscale transition-all duration-500 pointer-events-none origin-center"
                            title={cert.title}
                        />
                    </div>
                ) : (
                    <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
                        unoptimized
                    />
                )
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#121212] to-[#0a0a0a] flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    <Award className="w-16 h-16 text-white/10 group-hover:text-neon-main/30 group-hover:scale-110 transition-all duration-500" />
                </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-90" />

            {/* Floating Badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                <CheckCircle2 className="w-3 h-3 text-neon-main" />
                <span className="text-[10px] font-mono font-bold text-white tracking-widest uppercase">Verified</span>
            </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow relative -mt-6">
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#FFB800] bg-[#FFB800]/10 px-2 py-0.5 rounded border border-[#FFB800]/20 font-bold">
                        {cert.issuer}
                    </span>
                    {cert.type && (
                        <span className="text-[10px] uppercase tracking-widest text-neutral-500 border border-white/5 px-2 py-0.5 rounded">
                            {cert.type}
                        </span>
                    )}
                </div>
                <h3 className="text-xl font-display font-bold text-white group-hover:text-neon-main transition-colors leading-tight min-h-[3rem]">
                    {cert.title}
                </h3>
            </div>

            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-[9px] text-neutral-500 uppercase tracking-widest mb-0.5">Issued</span>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-mono">
                        <Calendar className="w-3 h-3 text-neutral-500" />
                        {cert.date}
                    </div>
                </div>

                {cert.link && cert.link !== "#" && (
                    <Link
                        href={cert.link}
                        target="_blank"
                        className="p-2 rounded-full bg-white/5 text-white hover:bg-neon-main hover:text-black transition-all duration-300 group/btn"
                        aria-label="View Certificate"
                    >
                        <ExternalLink className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
                    </Link>
                )}
            </div>
        </div>
    </motion.div>
);

export default function Certificates() {
    const tabs = ["Hackathons", "Other"];
    const [activeTab, setActiveTab] = useState("Hackathons");

    const filteredCertificates = activeTab === "Hackathons"
        ? certificates.filter(c => c.category === "Hackathons")
        : certificates.filter(c => c.category !== "Hackathons");

    return (
        <section id="certifications" className="min-h-screen py-24 bg-black relative">
            <div className="px-6 md:px-12">

                {/* Header - Standardized Alignment */}
                <div className="max-w-4xl mb-12">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">
                        LEARNING <br />
                        <span className="text-neutral-500">PATHWAY.</span>
                    </h2>
                    <div className="flex items-center gap-4 text-neutral-400 font-light text-xl max-w-2xl">
                        <Award className="w-6 h-6 text-neon-main" />
                        <p>
                            Verified credentials validating expertise in <span className="text-white">Full Stack Development</span>, <span className="text-white">Cloud Architecture</span>, and <span className="text-white">Algorithms</span>.
                        </p>
                    </div>
                </div>

                {/* Horizontal Tab Bar (Full Parallelogram Style) */}
                <div className="flex w-full mb-12 overflow-visible pb-2 px-4 sm:px-6">
                    {/* The entire outer container is skewed to create sharp slanted edges everywhere! */}
                    <div className="relative flex bg-[#121212] border border-white/10 w-full overflow-hidden isolate -skew-x-[30deg]">
                        
                        {/* The background sliding indicator */}
                        <div 
                            className="absolute top-0 bottom-0 w-1/2 bg-white transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                            style={{
                                transform: `translateX(${activeTab === tabs[0] ? "0%" : "100%"})`,
                            }}
                        />

                        {/* The center cross line divider */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20" />

                        {tabs.map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className="relative flex-1 py-4 px-4 sm:px-6 z-10 font-mono tracking-wider uppercase transition-colors duration-300 text-center whitespace-nowrap"
                                >
                                    {/* Counter-skew the text so it stays completely upright and readable */}
                                    <div className="skew-x-[30deg]">
                                        <span className={`transition-colors duration-300 text-xs sm:text-sm ${isActive ? "text-black font-bold drop-shadow-sm" : "text-neutral-500 hover:text-white"}`}>
                                            {tab}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
                    {filteredCertificates.map((cert, index) => (
                        <CertCard key={cert.id} cert={cert} index={index} />
                    ))}
                </div>

                {/* Footer Stat */}
                <div className="mt-16 pt-8 border-t border-white/5 flex justify-center">
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 uppercase tracking-widest">
                        <ShieldCheck className="w-4 h-4" />
                        <span>All certifications authenticated by issuing authorities</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
