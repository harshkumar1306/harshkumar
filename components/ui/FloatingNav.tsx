"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Find current active section based on scroll position
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-3.5 sm:top-5 inset-x-0 z-50 flex justify-center items-center pointer-events-none px-3"
    >
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto flex items-center p-1 sm:p-1.5 rounded-full border border-[var(--border)] bg-[#FFFFFF]/85 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.03] transition-all duration-300 ${
          scrolled ? "shadow-[0_12px_36px_rgba(0,0,0,0.09)] bg-[#FFFFFF]/92" : ""
        }`}
      >
        <ul className="flex items-center gap-0.5 sm:gap-1 list-none m-0 p-0">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative z-10 block px-2.5 py-1.5 xs:px-3 sm:px-4 sm:py-2 rounded-full font-mono text-[11px] xs:text-xs sm:text-sm font-medium tracking-wide uppercase transition-colors duration-200 select-none ${
                    isActive
                      ? "text-white"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/[0.03]"
                  }`}
                >
                  {item.label}
                </a>

                {/* Animated active pill pill indicator */}
                {isActive && (
                  <motion.div
                    layoutId="floatingNavActivePill"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 32,
                    }}
                    className="absolute inset-0 rounded-full bg-[var(--accent)] shadow-sm"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}
