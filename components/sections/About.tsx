"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiBookOpen,
  FiAward,
  FiCpu,
  FiUser,
  FiBriefcase,
  FiCheckCircle,
} from "react-icons/fi";

const factSheetItems = [
  {
    icon: <FiUser className="w-4 h-4 text-[var(--text-primary)] mt-0.5 shrink-0" />,
    label: "Role",
    value: "Full-stack Engineer",
  },
  {
    icon: <FiBookOpen className="w-4 h-4 text-[var(--text-primary)] mt-0.5 shrink-0" />,
    label: "Degree",
    value: "B.Tech, Computer Science",
  },
  {
    icon: <FiAward className="w-4 h-4 text-[var(--text-primary)] mt-0.5 shrink-0" />,
    label: "Institution",
    value: "Noida Institute of Engineering and Technology",
  },
  {
    icon: <FiMapPin className="w-4 h-4 text-[var(--text-primary)] mt-0.5 shrink-0" />,
    label: "Location",
    value: "Based in India",
  },
  {
    icon: <FiCpu className="w-4 h-4 text-[var(--text-primary)] mt-0.5 shrink-0" />,
    label: "Focus",
    value: "Backend architecture, AI/LLM integration",
  },
  {
    icon: <FiBriefcase className="w-4 h-4 text-[var(--text-primary)] mt-0.5 shrink-0" />,
    label: "Currently",
    value: "Open to full-stack & AI engineering roles",
  },
  {
    icon: <FiCheckCircle className="w-4 h-4 text-[var(--text-primary)] mt-0.5 shrink-0" />,
    label: "Recognition",
    value: "SIH 2024 Grand Finale selectee",
  },
];

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
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
              // 02. Identity &amp; Approach
            </span>
          </div>
          <h2 className="font-heading text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)]">
            About
          </h2>
        </div>

        {/* Co-Equal Two-Column Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start text-left"
        >
          {/* LEFT COLUMN: Bio Text (~58% width on desktop) */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 font-sans text-sm xs:text-base sm:text-[17px] text-[var(--text-body)] leading-[1.72]">
            <motion.p variants={itemVariants}>
              I design systems before I build them &mdash; architecture,
              trade-offs, and interfaces first, implementation second. That
              order matters more to me than any single language or framework.
            </motion.p>

            <motion.p variants={itemVariants}>
              Day to day, that&apos;s full-stack work: frontend interfaces,
              backend services, the integration layer connecting them, and
              AI/LLM components woven into the systems themselves rather than
              bolted on top. The same instinct carries into CAD design and
              hardware builds &mdash; plan the structure, understand the
              constraints, then build something that actually works.
            </motion.p>

            <motion.p variants={itemVariants}>
              Right now I&apos;m deepening the parts of this that scale:
              production-grade backend architecture, and AI integration
              reliable enough to depend on, not just impressive in a demo.
            </motion.p>
          </div>

          {/* RIGHT COLUMN: Fact Sheet (~42% width on desktop) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 w-full flex flex-col mt-2 lg:mt-0"
          >
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-panel)] p-5 sm:p-7 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
              {/* Fact Sheet Header */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[var(--border)]">
                <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[var(--text-primary)]">
                  Fact Sheet
                </span>
                <span className="font-mono text-[11px] text-[var(--text-muted)]">
                  [PROFILE_DATA]
                </span>
              </div>

              {/* Rows */}
              <ul className="space-y-3.5 font-mono text-xs text-[var(--text-body)]">
                {factSheetItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    {item.icon}
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                        {item.label}
                      </div>
                      <div className="font-medium text-[var(--text-primary)] mt-0.5 leading-snug">
                        {item.value}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
