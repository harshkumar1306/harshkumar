"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
import { GitHubContributionGraph } from "@/components/ui/GitHubContributionGraph";

export function Hero() {
  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col justify-center py-2 sm:py-4">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
        {/* LEFT COLUMN: Editorial Typography & CTA (50% Width) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 flex flex-col items-start text-left"
        >
          {/* Eyebrow Label (Retro-Magazine Kicker) */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 mb-3 sm:mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-[var(--text-muted)]">
              Full-Stack Engineer
            </span>
          </motion.div>

          {/* Display Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[var(--text-primary)] leading-[0.92] uppercase select-none"
          >
            Harsh Kumar
          </motion.h1>

          {/* Subheading / Tagline */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-base sm:text-lg md:text-xl text-[var(--text-body)] mt-4 sm:mt-6 max-w-[500px] leading-relaxed font-normal"
          >
            Full-stack engineer who designs systems before writing a line of
            code &mdash; architecture, trade-offs, and interfaces first,
            implementation second.
          </motion.p>

          {/* Primary CTA Button */}
          <motion.div
            variants={itemVariants}
            className="mt-6 sm:mt-8 flex items-center gap-4"
          >
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[var(--accent)] text-white text-sm sm:text-base font-medium tracking-wide shadow-sm hover:bg-[var(--accent-hover)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <span>View Projects</span>
              <FiArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Large Borderless GitHub Contribution Heatmap (50% Width) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          className="lg:col-span-6 flex flex-col items-start lg:items-end justify-center w-full"
        >
          <GitHubContributionGraph />
        </motion.div>
      </div>
    </div>
  );
}
