"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFastapi,
  SiNodedotjs,
  SiOpencv,
  SiGit,
  SiGithub,
  SiVercel,
  SiPostgresql,
  SiVite,
  SiExpress,
  SiPrisma,
  SiSocketdotio,
  SiAnthropic,
  SiGooglecloud,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

// Default tech URLs
export const defaultTechUrls: Record<string, string> = {
  Python: "https://python.org",
  JavaScript: "https://developer.mozilla.org/docs/Web/JavaScript",
  TypeScript: "https://typescriptlang.org",
  SQL: "https://en.wikipedia.org/wiki/SQL",
  HTML5: "https://developer.mozilla.org/docs/Web/HTML",
  CSS3: "https://developer.mozilla.org/docs/Web/CSS",
  React: "https://react.dev",
  "Next.js": "https://nextjs.org",
  "Tailwind CSS": "https://tailwindcss.com",
  TailwindCSS: "https://tailwindcss.com",
  FastAPI: "https://fastapi.tiangolo.com",
  "Node.js": "https://nodejs.org",
  OpenCV: "https://opencv.org",
  Git: "https://git-scm.com",
  GitHub: "https://github.com",
  Vercel: "https://vercel.com",
  "VS Code": "https://code.visualstudio.com",
  Vite: "https://vite.dev",
  Express: "https://expressjs.com",
  PostgreSQL: "https://postgresql.org",
  Prisma: "https://prisma.io",
  "Socket.io": "https://socket.io",
  Anthropic: "https://anthropic.com",
  "Google Cloud": "https://cloud.google.com",
};

// Map tech names to default icons with official brand colors
const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
  Python: { icon: <SiPython />, color: "#3776AB" },
  JavaScript: { icon: <SiJavascript />, color: "#F7DF1E" },
  TypeScript: { icon: <SiTypescript />, color: "#3178C6" },
  SQL: { icon: <SiPostgresql />, color: "#4169E1" },
  HTML5: { icon: <SiHtml5 />, color: "#E34F26" },
  CSS3: { icon: <SiCss />, color: "#1572B6" },
  React: { icon: <SiReact />, color: "#61DAFB" },
  "Next.js": { icon: <SiNextdotjs />, color: "#000000" },
  "Tailwind CSS": { icon: <SiTailwindcss />, color: "#06B6D4" },
  TailwindCSS: { icon: <SiTailwindcss />, color: "#06B6D4" },
  FastAPI: { icon: <SiFastapi />, color: "#009688" },
  "Node.js": { icon: <SiNodedotjs />, color: "#5FA04E" },
  OpenCV: { icon: <SiOpencv />, color: "#5C3EE8" },
  Git: { icon: <SiGit />, color: "#F05032" },
  GitHub: { icon: <SiGithub />, color: "#181717" },
  Vercel: { icon: <SiVercel />, color: "#000000" },
  "VS Code": { icon: <VscVscode />, color: "#007ACC" },
  Vite: { icon: <SiVite />, color: "#646CFF" },
  Express: { icon: <SiExpress />, color: "#000000" },
  PostgreSQL: { icon: <SiPostgresql />, color: "#4169E1" },
  Prisma: { icon: <SiPrisma />, color: "#2D3748" },
  "Socket.io": { icon: <SiSocketdotio />, color: "#010101" },
  Anthropic: { icon: <SiAnthropic />, color: "#CC785C" },
  "Google Cloud": { icon: <SiGooglecloud />, color: "#4285F4" },
};

export interface TechChipProps {
  techName: string;
  url?: string;
  className?: string;
}

export function TechChip({ techName, url, className = "" }: TechChipProps) {
  const brandData = iconMap[techName];
  const targetUrl = url || defaultTechUrls[techName];

  const chipContent = (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] text-xs font-mono font-medium text-[var(--text-primary)] hover:border-[var(--accent)] hover:shadow-sm transition-colors duration-150 cursor-pointer select-none ${className}`}
    >
      {brandData && (
        <span
          className="text-sm sm:text-base flex items-center justify-center shrink-0"
          style={{ color: brandData.color }}
        >
          {brandData.icon}
        </span>
      )}
      <span>{techName}</span>
    </motion.div>
  );

  if (targetUrl) {
    return (
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-full focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
        title={`Visit ${techName} official website`}
      >
        {chipContent}
      </a>
    );
  }

  return chipContent;
}

export function ConceptTag({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`inline-flex items-center px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg bg-[var(--bg-elevated)] text-xs sm:text-[13px] font-sans font-normal text-[var(--text-body)] select-none ${className}`}
    >
      {label}
    </div>
  );
}
