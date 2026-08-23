"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";

export function Hero() {
  const [blinkState, setBlinkState] = useState<"open" | "closed" | "happy">("open");

  // Periodic random blinking effect (every 3.5 - 6s for 180ms)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let blinkEndId: NodeJS.Timeout;

    const scheduleNextBlink = () => {
      const delay = Math.random() * 2500 + 3500; // 3.5s to 6s
      timeoutId = setTimeout(() => {
        setBlinkState("closed");
        blinkEndId = setTimeout(() => {
          setBlinkState("open");
          scheduleNextBlink();
        }, 180);
      }, delay);
    };

    scheduleNextBlink();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(blinkEndId);
    };
  }, []);

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ASCII Cat art frames
  const catArt = {
    open: `       /\\_____/\\
      /  o   o  \\
     ( ==  ^  == )
      )         (
     (           )
    ( (  )   (  ) )
   (__(__)___(__)__)`,
    closed: `       /\\_____/\\
      /  -   -  \\
     ( ==  ^  == )
      )         (
     (           )
    ( (  )   (  ) )
   (__(__)___(__)__)`,
    happy: `       /\\_____/\\
      /  ^   ^  \\
     ( ==  v  == )
      )         (
     (           )
    ( (  )   (  ) )
   (__(__)___(__)__)`,
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
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* LEFT COLUMN: Editorial Typography & CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left"
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

        {/* RIGHT COLUMN: Animated ASCII Cat Art */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col items-center justify-center mt-4 lg:mt-0"
        >
          <div className="relative group p-5 sm:p-7 md:p-8 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center max-w-full overflow-hidden">
            {/* ASCII Container with subtle breathing idle loop and hover reactions */}
            <motion.div
              animate={{
                scale: [1, 1.025, 1],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                rotate: [0, -2, 2, 0],
                scale: 1.04,
                transition: { duration: 0.4 },
              }}
              onMouseEnter={() => setBlinkState("happy")}
              onMouseLeave={() => setBlinkState("open")}
              className="cursor-pointer select-none max-w-full overflow-x-auto py-1"
              title="Click or hover to pet"
            >
              <pre className="font-mono text-[10px] sm:text-xs md:text-sm lg:text-base leading-[1.18] text-[var(--text-primary)] font-bold tracking-normal whitespace-pre">
                {catArt[blinkState]}
              </pre>
            </motion.div>

            {/* ASCII Label / Terminal Status */}
            <div className="mt-4 pt-3 border-t border-[var(--border)] w-full flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
              <span className="tracking-wider">// sys.cat.daemon</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{blinkState === "happy" ? "purring" : "active"}</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
