"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2.2 seconds total duration
    const intervalTime = 25; // 40fps for high smoothness
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Wait 300ms at 100% before triggering exit animation
          setTimeout(() => {
            onComplete();
          }, 300);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const dotCount = 15;
  // Sweep center moves from -1 to dotCount + 1 to simulate entry/exit of the sweep
  const activeCenter = (progress / 100) * (dotCount + 2) - 1;

  // Animation variants for premium staggered entry
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // premium custom cubic-bezier
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="loading-screen-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black select-none overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center max-w-lg px-6 w-full"
      >
        {/* Main Header */}
        <motion.h1
          variants={itemVariants}
          className="font-oswald text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter leading-none flex flex-col items-center"
        >
          <span className="text-white">SHUBHAM</span>
          <span className="text-[#2563EB] -mt-1 sm:-mt-2">MODI</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-[10px] sm:text-xs font-light tracking-[0.35em] text-neutral-400 uppercase"
        >
          Full Stack Learner
        </motion.p>

        {/* Horizontal Dotted Loader */}
        <motion.div
          variants={itemVariants}
          className="mt-14 flex items-center justify-center gap-2.5 h-6"
        >
          {Array.from({ length: dotCount }).map((_, idx) => {
            // Check if dot is within 1.5 units of the sweeping active center
            const dist = Math.abs(idx - activeCenter);
            const isActive = dist <= 1.4;

            return (
              <span
                key={idx}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{
                  backgroundColor: isActive ? "#2563EB" : "#262626",
                  transform: isActive ? "scale(1.2)" : "scale(1)",
                }}
              />
            );
          })}
        </motion.div>

        {/* Status Text below Loader */}
        <motion.p
          variants={itemVariants}
          className="mt-4 text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] text-neutral-500 uppercase"
        >
          Loading Portfolio
        </motion.p>
      </motion.div>

      {/* Bottom Navigation Preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.35, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-12 flex flex-wrap justify-center gap-x-5 gap-y-2 px-6 text-[10px] sm:text-xs tracking-wider font-semibold uppercase text-neutral-500"
      >
        <span className="text-[#2563EB] transition-colors duration-300">
          • Projects
        </span>
        <span className="text-neutral-500">• Skills</span>
        <span className="text-neutral-500">• Certificates</span>
        <span className="text-neutral-500">• Github</span>
      </motion.div>
    </motion.div>
  );
}
