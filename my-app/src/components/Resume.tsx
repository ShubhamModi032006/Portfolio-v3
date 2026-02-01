"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Download, X, Eye } from 'lucide-react';

export default function Resume() {
    const [isResumeOpen, setIsResumeOpen] = useState(false);

    // Resume URLs - Using the one provided in the request
    const resumeUrl = "https://drive.google.com/file/d/1Y3xLQZPY8RYeQ_CNiWjOWVmiCN2_i7Mu/preview";
    const downloadUrl = "https://drive.google.com/u/0/uc?id=1Y3xLQZPY8RYeQ_CNiWjOWVmiCN2_i7Mu&export=download";

    return (
        <section id="resume" className="min-h-screen py-24 bg-black relative flex flex-col justify-center">
            <div className="px-6 md:px-12 relative z-10 w-full">

                {/* Header */}
                <div className="max-w-4xl mb-20">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">
                        MY <br />
                        <span className="text-neutral-500">RESUME.</span>
                    </h2>
                    <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-2xl">
                        A detailed overview of my professional experience, skills, and education.
                    </p>
                </div>

                {/* Resume Card Action Area */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Preview Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsResumeOpen(true)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-12 text-left group hover:border-neon-main/30 hover:bg-white/10 transition-all duration-300 relative overflow-hidden min-h-[300px] flex flex-col justify-between"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                            <FileText className="w-32 h-32 text-neon-main transform rotate-12" />
                        </div>

                        <div>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-main/10 text-neon-main text-xs font-mono uppercase tracking-widest mb-6">
                                <Eye className="w-3 h-3" />
                                Preview
                            </span>
                            <h3 className="text-4xl font-display font-bold text-white mb-2">View Resume</h3>
                            <p className="text-neutral-400">Read online without downloading</p>
                        </div>

                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mt-8 group-hover:bg-neon-main group-hover:text-black group-hover:border-neon-main transition-colors">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </motion.button>

                    {/* Download Button */}
                    <motion.a
                        href={downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-12 text-left group hover:border-neon-main/30 hover:bg-white/10 transition-all duration-300 relative overflow-hidden min-h-[300px] flex flex-col justify-between"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                            <Download className="w-32 h-32 text-white transform -rotate-12" />
                        </div>

                        <div>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono uppercase tracking-widest mb-6">
                                <Download className="w-3 h-3" />
                                PDF Format
                            </span>
                            <h3 className="text-4xl font-display font-bold text-white mb-2">Download</h3>
                            <p className="text-neutral-400">Save a copy to your device</p>
                        </div>

                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mt-8 group-hover:bg-white group-hover:text-black group-hover:border-white transition-colors">
                            <Download className="w-5 h-5" />
                        </div>
                    </motion.a>
                </div>

            </div>

            {/* Resume Modal */}
            <AnimatePresence>
                {isResumeOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 md:p-10"
                        onClick={() => setIsResumeOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="w-full max-w-6xl h-[85vh] bg-neutral-900 rounded-2xl border border-white/10 flex flex-col overflow-hidden shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-neutral-900/50 backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-neon-main/20 flex items-center justify-center">
                                        <FileText className="w-4 h-4 text-neon-main" />
                                    </div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                                        Resume Preview
                                    </h3>
                                </div>

                                <div className="flex items-center gap-3">
                                    <a
                                        href={downloadUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
                                        title="Download PDF"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span className="hidden sm:inline">Download</span>
                                    </a>
                                    <button
                                        onClick={() => setIsResumeOpen(false)}
                                        className="w-8 h-8 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors flex items-center justify-center"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Iframe Content */}
                            <div className="flex-1 bg-neutral-800 relative w-full h-full">
                                <iframe
                                    src={resumeUrl}
                                    className="w-full h-full border-none"
                                    title="Resume Preview"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

function ArrowUpRight({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
        </svg>
    )
}
