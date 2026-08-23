"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiExternalLink, FiGithub } from "react-icons/fi";
import { TechChip } from "@/components/ui/TechChip";

interface ProjectData {
  id: string;
  name: string;
  category: string;
  tagline: string;
  problemSummary: string;
  problemFull: string;
  howItWorks: string;
  howItWorksExtra?: string;
  stackArchitecture: string;
  reliabilityDetails?: string;
  techTags: string[];
  links: {
    live?: string;
    github?: string;
  };
  screenshots: {
    cover: string;
    coverAlt: string;
    secondary: string;
    secondaryAlt: string;
  };
}

const projects: ProjectData[] = [
  {
    id: "repolens",
    name: "RepoLens",
    category: "AI & Developer Tooling",
    tagline:
      "Paste a GitHub URL, get a full documentation suite back — architecture diagrams, API reference, database schema, setup guide, all generated in parallel and streamed in live as each one finishes.",
    problemSummary: "Undocumented repos are expensive to onboard into.",
    problemFull:
      "RepoLens automates the first pass: it ingests a repository, understands its structure, and produces the eight documents a new contributor would actually need — overview, architecture, tech stack breakdown, database schema, API reference, setup guide, deployment guide, and a reverse-engineered spec.",
    howItWorks:
      "A 4-layer ingestion pipeline handles repos of any size without wasting API calls: a size guard rejects anything over 50MB or 2,000 files, then the file tree is fetched and filtered, files are tier-ranked by relevance (entry points and config first, then routes/controllers/models), and only the highest-value files are sent to Claude. Each of the 8 documents is generated from a scoped prompt containing only the files relevant to that document — architecture gets entry points and Docker files, API reference gets route files.",
    howItWorksExtra:
      "Generation runs through a concurrency-limited queue (3 parallel Claude calls) with retry logic and exponential backoff, and WebSocket updates push each completed document to the frontend as it lands, so the whole flow is watched live rather than waiting on a spinner.",
    stackArchitecture:
      "Frontend: React + Vite, Tailwind, Framer Motion, Socket.io client, Mermaid.js for live architecture/ER diagrams.\nBackend: Node.js + Express, Prisma ORM over PostgreSQL (Neon serverless), Octokit for GitHub access, the Anthropic SDK for generation, Puppeteer for PDF export.\nDeployed as two services — frontend on Vercel, backend on Render — with a proxy rewrite so cookies work across origins, plus GitHub OAuth for auth.",
    reliabilityDetails:
      "Repo caching (24h TTL) avoids re-analyzing repos already processed. Partial-failure handling means a job still returns results if up to 4 of the 8 documents fail. A rate-limit guard checks GitHub API headroom every 20 files and pauses ingestion before hitting zero.",
    techTags: [
      "React",
      "Vite",
      "TailwindCSS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Socket.io",
      "Vercel",
      "GitHub",
      "Anthropic",
    ],
    links: {
      live: "https://repolens-kappa.vercel.app",
      github: "https://github.com/harshkumar1306/repolens",
    },
    screenshots: {
      cover: "/projects/repolens/repolens-home-page.png",
      coverAlt: "RepoLens Home Page Documentation Generator",
      secondary: "/projects/repolens/repolens-login-page.png",
      secondaryAlt: "RepoLens Authentication & Live Stream View",
    },
  },
  {
    id: "octype",
    name: "Octype",
    category: "Real-Time Audio Systems",
    tagline:
      "A browser-based grand piano — real Salamander Grand Piano recordings, 32-voice polyphony, MIDI input, sub-10ms feel, working fully offline after first load.",
    problemSummary:
      "Most web pianos are toys: laggy, thin-sounding, and built as a React component that happens to trigger audio.",
    problemFull:
      "Octype is built the other way around — a real-time audio system that has a React interface, not a React app that plays audio.",
    howItWorks:
      "The audio engine is fully decoupled from React and never touches component state. Input (keyboard, mouse, touch, or MIDI) resolves to a note through a singleton InputRouter, which updates a Zustand store for the UI and separately calls the audio engine directly. The engine picks the correct sample and velocity layer, computes pitch shift and gain, and starts a dedicated signal chain per note — all scheduled on the Web Audio clock (AudioContext.currentTime), not on React's render cycle. That separation is what keeps playback tight even while the UI animates.",
    howItWorksExtra:
      "Notes are sampled at 30 pitches across 16 velocity layers (480 files total); in-between semitones are produced by pitch-shifting the nearest recorded sample. A Service Worker plus IndexedDB caching means the app and its ~480 audio files work with zero network requests after the first visit.",
    stackArchitecture:
      "Next.js 14 (App Router), TypeScript in strict mode, React 18, Tailwind, Framer Motion for UI animation, Zustand for state, native Web Audio API and Web MIDI API — no audio or MIDI libraries, built directly on browser primitives.",
    techTags: ["Next.js", "TypeScript", "React", "TailwindCSS"],
    links: {
      live: "https://octype.vercel.app",
      github: "https://github.com/harshkumar1306/octype.git",
    },
    screenshots: {
      cover: "/projects/octype/octype-home-page.png",
      coverAlt: "Octype Grand Piano Home Interface",
      secondary: "/projects/octype/octype-piano-page.png",
      secondaryAlt: "Octype Interactive 88-Key Grand Piano UI",
    },
  },
  {
    id: "lead-map",
    name: "LeadMap",
    category: "Client-Side Intelligence & Prospecting",
    tagline:
      "A minimalist prospecting tool: search local businesses by type, location, and radius, filter the results, and export them as a spreadsheet — no backend, no database, no login.",
    problemSummary:
      "Lead generation tools are usually either expensive SaaS platforms or clunky exports from Google Maps.",
    problemFull:
      "LeadMap is a purpose-built alternative that runs entirely client-side — search, filter, and export contact data in one pass, with nothing to host or maintain server-side.",
    howItWorks:
      "Search by business type, location, and radius against the Google Places API. Results land in a clean table (name, category, rating, reviews, phone, website, address) with quick actions per row — copy the phone number, open in Google Maps, or visit the website directly. Filters narrow results by whether a website exists, minimum rating, and minimum review count, and any subset of results can be selected and exported to CSV or Excel.",
    howItWorksExtra:
      "If no API key is configured, the app runs in a demo mode with realistic mock data — the full UI is evaluable with zero setup or credentials.",
    stackArchitecture:
      "React 19 with TypeScript, built on Vite. Styling with Tailwind CSS and custom shadcn-style component primitives rather than a full component library. Data comes from the Google Maps JavaScript API (Places legacy) plus the Geocoding API for location lookups. Export handled client-side via the xlsx library — no backend round-trip for either search or export.",
    techTags: ["React", "TypeScript", "Vite", "TailwindCSS", "Google Cloud"],
    links: {
      live: "https://lead-map-seven.vercel.app",
      github: "https://github.com/harshkumar1306/lead-map.git",
    },
    screenshots: {
      cover: "/projects/lead-map/leadmap-home-page.png",
      coverAlt: "LeadMap Search & Prospecting Interface",
      secondary: "/projects/lead-map/leadmap-result-page.png",
      secondaryAlt: "LeadMap Filtered Table and Export View",
    },
  },
];

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const accumulatedDeltaXRef = useRef(0);
  const isCooldownRef = useRef(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const nextProject = useCallback(() => {
    setActiveIndex((prev) => Math.min(projects.length - 1, prev + 1));
  }, []);

  const prevProject = useCallback(() => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  }, []);

  // Keyboard navigation support for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextProject();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevProject();
    }
  };

  // Listen for TWO-FINGER TRACKPAD HORIZONTAL SWIPE without hijacking vertical scroll
  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      // Explicitly ignore events where vertical scroll dominates
      if (absY >= absX || absX < 15) {
        return;
      }

      // If horizontal movement strongly dominates, accumulate deltaX
      if (absX > absY * 1.5) {
        if (isCooldownRef.current) return;

        accumulatedDeltaXRef.current += e.deltaX;

        if (Math.abs(accumulatedDeltaXRef.current) > 55) {
          if (accumulatedDeltaXRef.current > 0) {
            nextProject();
          } else {
            prevProject();
          }

          accumulatedDeltaXRef.current = 0;
          isCooldownRef.current = true;
          setTimeout(() => {
            isCooldownRef.current = false;
          }, 380);
        }
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: true });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [nextProject, prevProject]);

  // Touch Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    const diffY = touchStartYRef.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) * 1.5 && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        nextProject();
      } else {
        prevProject();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  return (
    <div
      ref={galleryRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Featured Projects Gallery (use left/right arrows to navigate)"
      className="w-full flex flex-col justify-center focus-visible:outline-none"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col">
        {/* Section Header with Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3.5 sm:gap-4 mb-4 sm:mb-5 pb-3 sm:pb-3.5 border-b border-[var(--border)]">
          <div>
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-[var(--text-muted)]">
                // 04. Systems &amp; Engineering
              </span>
            </div>
            <h2 className="font-heading text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
              Featured Projects
            </h2>
          </div>

          {/* Navigation Controls & Indicators */}
          <div className="flex items-center gap-3 sm:gap-4 self-start sm:self-auto">
            {/* Step Counter */}
            <span className="font-mono text-xs text-[var(--text-muted)] tracking-wider">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>

            {/* Dot Indicators */}
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Project tabs">
              {projects.map((p, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === activeIndex}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Jump to project ${i + 1}: ${p.name}`}
                  className={`h-2 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none ${
                    i === activeIndex
                      ? "w-6 bg-[var(--accent)]"
                      : "w-2 bg-[var(--border)] hover:bg-[var(--text-muted)] cursor-pointer"
                  }`}
                />
              ))}
            </div>

            {/* Left / Right Cue Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevProject}
                disabled={activeIndex === 0}
                aria-label="Previous project"
                className={`p-2 sm:p-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-panel)] text-[var(--text-primary)] shadow-sm transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none ${
                  activeIndex === 0
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:border-[var(--accent)] hover:bg-[var(--bg-elevated)] active:scale-95 cursor-pointer"
                }`}
              >
                <FiArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextProject}
                disabled={activeIndex === projects.length - 1}
                aria-label="Next project"
                className={`p-2 sm:p-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-panel)] text-[var(--text-primary)] shadow-sm transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none ${
                  activeIndex === projects.length - 1
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:border-[var(--accent)] hover:bg-[var(--bg-elevated)] active:scale-95 cursor-pointer"
                }`}
              >
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Card Gallery Viewport */}
        <div className="relative w-full overflow-hidden rounded-[24px]">
          <motion.div
            className="flex w-full"
            animate={{ x: `-${activeIndex * 100}%` }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="w-full shrink-0 px-0.5 sm:px-1 flex flex-col"
              >
                <div className="w-full rounded-[20px] sm:rounded-[24px] border border-[var(--border)] bg-[var(--bg-panel)] p-4 xs:p-5 sm:p-7 md:p-8 flex flex-col gap-4 sm:gap-6 shadow-sm lg:max-h-[calc(100vh-14rem)] lg:overflow-y-auto">
                  {/* Top Bar: Name, Tagline & CTAs */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3.5 sm:gap-4 pb-3.5 sm:pb-4 border-b border-[var(--border)]">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="font-heading text-2xl xs:text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                        {project.name}
                      </h3>
                      <p className="font-sans text-xs xs:text-sm sm:text-base text-[var(--text-body)] mt-2 leading-relaxed max-w-3xl">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0 self-start">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[var(--accent)] text-white text-xs sm:text-sm font-medium hover:bg-[var(--accent-hover)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none transition-colors shadow-sm"
                        >
                          <span>View Live Demo</span>
                          <FiExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-primary)] text-xs sm:text-sm font-medium hover:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none transition-colors"
                        >
                          <FiGithub className="w-3.5 h-3.5" />
                          <span>View on GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Tech Stack Chips Row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] mr-1">
                      Stack:
                    </span>
                    {project.techTags.map((tech, tIdx) => (
                      <TechChip key={tIdx} techName={tech} />
                    ))}
                  </div>

                  {/* Cover Screenshot Image */}
                  <div className="relative w-full h-52 sm:h-64 md:h-72 lg:h-80 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg-elevated)] shrink-0">
                    <Image
                      src={project.screenshots.cover}
                      alt={project.screenshots.coverAlt}
                      fill
                      priority={project.id === "repolens"}
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      className="object-cover object-top hover:scale-[1.01] transition-transform duration-300"
                    />
                  </div>

                  {/* Detailed Description Sections */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-2">
                    {/* Left: Problem & How It Works */}
                    <div className="flex flex-col gap-5 text-left">
                      <div>
                        <h4 className="font-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                          The Problem
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                          {project.problemFull}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                          How It Works
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-[var(--text-body)] leading-relaxed mb-3">
                          {project.howItWorks}
                        </p>
                        {project.howItWorksExtra && (
                          <p className="font-sans text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                            {project.howItWorksExtra}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right: Stack & Architecture + Secondary Screenshot */}
                    <div className="flex flex-col gap-5 text-left">
                      <div>
                        <h4 className="font-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                          Stack &amp; Architecture
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-[var(--text-body)] leading-relaxed whitespace-pre-line">
                          {project.stackArchitecture}
                        </p>
                      </div>

                      {project.reliabilityDetails && (
                        <div>
                          <h4 className="font-heading text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                            Reliability &amp; Key Decisions
                          </h4>
                          <p className="font-sans text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                            {project.reliabilityDetails}
                          </p>
                        </div>
                      )}

                      {/* Secondary Screenshot */}
                      <div className="relative w-full h-36 sm:h-44 md:h-48 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg-elevated)] shrink-0 mt-1">
                        <Image
                          src={project.screenshots.secondary}
                          alt={project.screenshots.secondaryAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, 500px"
                          className="object-cover object-top hover:scale-[1.01] transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
