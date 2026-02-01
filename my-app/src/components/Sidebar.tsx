"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const navItems = [
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Certificates", href: "/certificates" },
    { name: "Contact", href: "/contact" },
    { name: "Resume", href: "/resume" },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const SidebarContent = () => (
        <div className="flex h-full w-full flex-col justify-between p-6 lg:p-12">
            {/* Mobile Header in Overlay */}
            <div className="flex w-full items-center justify-between lg:hidden mb-12">
                <span className="font-oswald text-xl font-bold tracking-tighter text-white">
                    SHUBHAM.
                </span>
                <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 transition-colors hover:bg-white/10"
                >
                    Close
                </button>
            </div>

            {/* Desktop Logo Placeholder */}
            <div className="hidden lg:block">
            </div>

            {/* Navigation */}
            <nav aria-label="Main navigation" className="flex flex-1 flex-col justify-center">
                <ul className="flex flex-col gap-6 lg:gap-0 text-center lg:text-left">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={clsx(
                                        "block font-oswald text-5xl font-semibold uppercase leading-[1.1] tracking-tighter sm:text-7xl lg:text-[7.15rem] lg:leading-[0.97]",
                                        "transition-colors duration-300",
                                        isActive
                                            ? "text-blue-600"
                                            : "text-white hover:text-blue-600"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer / Resume Button */}
            <div className="flex justify-center lg:justify-start lg:hidden mt-12 pb-8">
                <Link
                    href="/resume"
                    className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-transform hover:scale-105 active:scale-95"
                >
                    <span className="text-lg">📄</span>
                    <span className="text-sm font-bold uppercase tracking-wider">View Resume</span>
                </Link>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Top Bar - constrained to viewport to prevent stretch when page overflows */}
            <header className="fixed top-0 left-0 right-0 z-40 flex h-16 w-full min-w-0 max-w-[100vw] items-center justify-between bg-black/80 px-6 backdrop-blur-md lg:hidden border-b border-white/10">
                <span className="font-oswald text-xl font-bold tracking-tighter text-white">
                    SHUBHAM.
                </span>
                <button
                    onClick={() => setIsOpen(true)}
                    className="group flex flex-col items-end gap-[5px] p-2"
                    aria-label="Open Menu"
                >
                    <span className="h-[2px] w-6 bg-white transition-all group-hover:w-8" />
                    <span className="h-[2px] w-4 bg-white transition-all group-hover:w-8" />
                    <span className="h-[2px] w-5 bg-white transition-all group-hover:w-8" />
                </button>
            </header>

            {/* Main Sidebar Container */}
            <aside
                className={clsx(
                    "fixed inset-0 z-50 bg-black transition-transform duration-500 ease-in-out lg:translate-x-0 lg:border-r lg:border-white/10 lg:static lg:h-screen lg:w-full",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <SidebarContent />
            </aside>
        </>
    );
}
