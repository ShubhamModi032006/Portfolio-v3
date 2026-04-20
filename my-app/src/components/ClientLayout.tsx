"use client";

import { useState } from "react";
import { clsx } from "clsx";
import Sidebar from "@/components/Sidebar";
import PageTransitionScroller from "@/components/PageTransitionScroller";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  
  return (
    <div className="flex min-h-screen flex-col lg:flex-row overflow-x-hidden max-w-full relative">
      
      {/* Sidebar Area */}
      <div className={clsx(
        "lg:fixed lg:inset-y-0 lg:z-40 shrink-0 transition-all duration-500 ease-in-out",
        isSidebarClosed ? "lg:w-[5%] lg:translate-x-0" : "lg:w-[45%] lg:translate-x-0"
      )}>
        {/* Toggle Button on the vertical line */}
        <button 
          onClick={() => setIsSidebarClosed(!isSidebarClosed)}
          className={clsx(
            "hidden lg:flex absolute top-1/2 -right-6 z-[60] -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full border border-white/20 text-white bg-black hover:bg-neutral-900 transition-all duration-500 shadow-xl"
          )}
          title={isSidebarClosed ? "Open Navbar" : "Close Navbar"}
        >
          {isSidebarClosed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>

        <Sidebar isSidebarClosed={isSidebarClosed} setIsSidebarClosed={setIsSidebarClosed} />
      </div>

      {/* Main Content Area */}
      <main className={clsx(
        "w-full min-w-0 min-h-screen bg-black text-slate-400 pt-16 lg:pt-0 overflow-x-hidden transition-all duration-500 ease-in-out",
        isSidebarClosed ? "lg:w-[95%] lg:ml-[5%]" : "lg:w-[55%] lg:ml-[45%]"
      )}>
        <PageTransitionScroller>
          {children}
        </PageTransitionScroller>
      </main>
    </div>
  );
}
