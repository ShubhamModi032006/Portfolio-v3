"use client"
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Copy, Check, Send, Terminal, MapPin, Clock, Github, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const [time, setTime] = useState("");
    const email = "shubham.modi.cg@gmail.com";

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Asia/Kolkata',
                hour12: true
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleCopy = async () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    const socialLinks = [
        { name: "GitHub", url: "https://github.com/ShubhamModi032006", icon: <Github className="w-5 h-5" /> },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/shubham-modi-cg/", icon: <Linkedin className="w-5 h-5" /> },
        { name: "X / Twitter", url: "https://x.com/shubham_modi_cg", icon: <Twitter className="w-5 h-5" /> },
        { name: "Instagram", url: "https://www.instagram.com/shubham03.2006/", icon: <Instagram className="w-5 h-5" /> },
    ];

    return (
        <section id="contact" className="min-h-screen py-24 bg-black relative overflow-x-hidden">
            {/* Background Ambient Glow - contained so it doesn't cause overflow */}
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-neon-main/5 blur-[120px] rounded-full pointer-events-none opacity-50 -translate-x-1/2 -translate-y-1/2" />

            <div className="px-6 md:px-12 max-w-full min-w-0">

                {/* Header Section */}
                <div className="max-w-4xl mb-20">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8">
                        LET'S <br />
                        <span className="text-neutral-500">CONNECT.</span>
                    </h2>
                    <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-2xl">
                        Open for collaborations, freelance work, or just a friendly chat.
                    </p>
                </div>

                {/* Main Interactive Stack */}
                <div className="flex flex-col gap-8 min-w-0">

                    {/* 1. Social Dock Row (Moved to Top) */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full min-w-0">
                        {socialLinks.map((social) => (
                            <Link
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                className="bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all group relative h-full min-h-[140px] lg:min-h-[160px]"
                                aria-label={social.name}
                            >
                                <div className="group-hover:scale-110 transition-transform duration-300 flex flex-col items-center gap-4">
                                    <div className="p-4 rounded-full bg-white/5 group-hover:bg-neon-main/10 group-hover:text-neon-main transition-colors">
                                        {social.icon}
                                    </div>
                                    <span className="text-[10px] font-mono uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                                        {social.name}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* 2. Full Width Email Card */}
                    <motion.button
                        onClick={handleCopy}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 text-left group hover:border-neon-main/30 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-xs font-mono text-neon-main tracking-widest uppercase flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-neon-main rounded-full animate-pulse" />
                                Copy Address
                            </span>
                        </div>

                        <h3 className="text-neutral-500 font-mono text-xs tracking-widest uppercase mb-4">Email Channel</h3>
                        <div className="flex items-center gap-4">
                            <span className="text-xl md:text-3xl font-display font-bold text-white break-all group-hover:text-neon-main transition-colors">
                                {email}
                            </span>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <div className="text-neutral-500 text-xs font-mono group-hover:text-neutral-400 transition-colors">
                                {copied ? "Address Copied!" : "Click to copy"}
                            </div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${copied ? "bg-neon-main text-black border-neon-main" : "border-white/20 text-white group-hover:border-white"}`}>
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </div>
                        </div>
                    </motion.button>

                    {/* 3. Message Transmission Form */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col relative overflow-hidden min-w-0">
                        {/* Decorative scanline */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-10 pointer-events-none" />

                        <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-neon-main" />
                            <span className="font-mono text-xs tracking-widest uppercase text-neutral-400">Message Transmission</span>
                        </h3>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono uppercase text-neutral-500 tracking-widest ml-1">Identity</label>
                                    <input
                                        type="text"
                                        placeholder="Name / Alias"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 outline-none focus:border-neon-main/50 transition-colors font-mono text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono uppercase text-neutral-500 tracking-widest ml-1">Contact Retrieval</label>
                                    <input
                                        type="email"
                                        placeholder="email@domain.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 outline-none focus:border-neon-main/50 transition-colors font-mono text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col h-full space-y-2">
                                <label className="text-[10px] font-mono uppercase text-neutral-500 tracking-widest ml-1">Payload</label>
                                <textarea
                                    placeholder="Input message data..."
                                    className="w-full flex-grow min-h-[120px] bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-600 outline-none focus:border-neon-main/50 transition-colors font-mono text-sm resize-none"
                                />
                                <button className="w-full bg-white text-black font-bold uppercase py-3 rounded-xl hover:bg-neon-main transition-colors flex items-center justify-center gap-2 mt-4 group text-sm tracking-widest">
                                    Send Transmission
                                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* 4. Info Row (Base & Time) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between min-h-[160px] hover:border-white/20 transition-colors group">
                            <div className="flex justify-between items-start">
                                <span className="text-neutral-500 font-mono text-xs tracking-widest uppercase">Base</span>
                                <MapPin className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <p className="text-xl font-bold text-white">India</p>
                                <p className="text-neutral-400 text-xs mt-1">Gujarat</p>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between min-h-[160px] hover:border-white/20 transition-colors group">
                            <div className="flex justify-between items-start">
                                <span className="text-neutral-500 font-mono text-xs tracking-widest uppercase">Local Time</span>
                                <Clock className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <p className="text-xl font-bold font-mono text-white">{time}</p>
                                <p className="text-neutral-400 text-xs mt-1 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    Active Now
                                </p>
                            </div>
                        </div>
                    </div>


                </div>

                {/* Footer Bar */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-600 uppercase tracking-widest">
                    <p>&copy; 2025 Shubham Modi / System Online</p>
                    <p>Designed with <span className="text-neon-main">Next.js 15</span></p>
                </div>
            </div>
        </section>
    )
}
