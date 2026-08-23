"use client";

import React from "react";
import { motion } from "framer-motion";
import { TechChip, ConceptTag } from "@/components/ui/TechChip";

interface SkillCategory {
  title: string;
  items: {
    type: "chip" | "concept";
    name: string;
    url?: string;
  }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "01 // Architecture & Systems Thinking",
    items: [
      { type: "concept", name: "System design" },
      { type: "concept", name: "API design" },
      { type: "concept", name: "Database schema design" },
      { type: "concept", name: "Architecture trade-off analysis" },
    ],
  },
  {
    title: "02 // Languages",
    items: [
      { type: "chip", name: "Python", url: "https://python.org" },
      {
        type: "chip",
        name: "JavaScript",
        url: "https://developer.mozilla.org/docs/Web/JavaScript",
      },
      {
        type: "chip",
        name: "TypeScript",
        url: "https://typescriptlang.org",
      },
      { type: "chip", name: "SQL", url: "https://en.wikipedia.org/wiki/SQL" },
      {
        type: "chip",
        name: "HTML5",
        url: "https://developer.mozilla.org/docs/Web/HTML",
      },
      {
        type: "chip",
        name: "CSS3",
        url: "https://developer.mozilla.org/docs/Web/CSS",
      },
    ],
  },
  {
    title: "03 // Frontend",
    items: [
      { type: "chip", name: "React", url: "https://react.dev" },
      { type: "chip", name: "Next.js", url: "https://nextjs.org" },
      { type: "chip", name: "Tailwind CSS", url: "https://tailwindcss.com" },
    ],
  },
  {
    title: "04 // Backend",
    items: [
      { type: "chip", name: "FastAPI", url: "https://fastapi.tiangolo.com" },
      { type: "concept", name: "REST API design & development" },
      { type: "chip", name: "Node.js", url: "https://nodejs.org" },
    ],
  },
  {
    title: "05 // AI & LLM Integration",
    items: [
      {
        type: "concept",
        name: "LLM/AI model integration into production systems",
      },
      { type: "chip", name: "OpenCV", url: "https://opencv.org" },
      { type: "concept", name: "YOLO" },
    ],
  },
  {
    title: "06 // Design & Fabrication",
    items: [
      { type: "concept", name: "CAD design" },
      { type: "concept", name: "Hardware prototyping" },
    ],
  },
  {
    title: "07 // Tools & Platforms",
    items: [
      { type: "chip", name: "Git", url: "https://git-scm.com" },
      { type: "chip", name: "GitHub", url: "https://github.com" },
      { type: "chip", name: "Vercel", url: "https://vercel.com" },
      { type: "chip", name: "VS Code", url: "https://code.visualstudio.com" },
    ],
  },
  {
    title: "08 // Core Foundations",
    items: [
      { type: "concept", name: "Data Structures & Algorithms" },
      { type: "concept", name: "Object-Oriented Programming (OOP)" },
      { type: "concept", name: "Database Management Systems (DBMS)" },
      { type: "concept", name: "Operating Systems & Networks" },
      { type: "concept", name: "Version Control" },
    ],
  },
];

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const groupVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-6 md:mb-8 text-left">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-[var(--text-muted)]">
              // 03. Tooling &amp; Capabilities
            </span>
          </div>
          <h2 className="font-heading text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)]">
            Skills &amp; Tools
          </h2>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 sm:gap-y-7 text-left"
        >
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={groupVariants}
              className="flex flex-col items-start"
            >
              {/* Category Label */}
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[var(--text-muted)] mb-2 sm:mb-2.5">
                {cat.title}
              </span>

              {/* Items flex wrap */}
              <motion.div
                className="flex flex-wrap items-center gap-2 sm:gap-2.5"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.035,
                    },
                  },
                }}
              >
                {cat.items.map((item, itemIdx) => (
                  <motion.div key={itemIdx} variants={itemVariants}>
                    {item.type === "chip" ? (
                      <TechChip techName={item.name} url={item.url} />
                    ) : (
                      <ConceptTag label={item.name} />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
