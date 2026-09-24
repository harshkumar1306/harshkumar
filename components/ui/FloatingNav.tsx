"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { motion } from "framer-motion";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
  const [indicatorStyle, setIndicatorStyle] = useState<{
    x: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const navRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const isManualClickRef = useRef<string | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Measure and position the active pill relative to the ul container
  const updateIndicator = useCallback((sectionId: string) => {
    const nav = navRef.current;
    const target = itemRefs.current[sectionId];
    if (!nav || !target) return;

    const navRect = nav.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    setIndicatorStyle({
      x: targetRect.left - navRect.left,
      top: targetRect.top - navRect.top,
      width: targetRect.width,
      height: targetRect.height,
    });
  }, []);

  // Update indicator whenever activeSection changes
  useIsomorphicLayoutEffect(() => {
    updateIndicator(activeSection);
  }, [activeSection, updateIndicator]);

  // Keep indicator aligned on resize or font loading
  useEffect(() => {
    const handleResize = () => {
      updateIndicator(activeSection);
    };

    window.addEventListener("resize", handleResize);

    // If web fonts are loading, re-measure when loaded
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        updateIndicator(activeSection);
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeSection, updateIndicator]);

  // Handle scroll detection and smooth section-spying
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // If smooth scroll from a tab click is underway, don't let scroll spy fight it
      if (isManualClickRef.current) return;

      // Top of page threshold
      if (window.scrollY < 80) {
        setActiveSection("hero");
        return;
      }

      // Bottom of page threshold (guarantees Contact is selected at the very bottom)
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;
      if (isBottom) {
        setActiveSection(NAV_ITEMS[NAV_ITEMS.length - 1].id);
        return;
      }

      // Find current active section based on focal scroll position
      const scrollPosition = window.scrollY + window.innerHeight * 0.38;
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

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = null;
      });
    };

    const handleScrollEnd = () => {
      isManualClickRef.current = null;
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };

    const cancelManualScroll = () => {
      if (isManualClickRef.current) {
        isManualClickRef.current = null;
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = null;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", handleScrollEnd);
    window.addEventListener("wheel", cancelManualScroll, { passive: true });
    window.addEventListener("touchstart", cancelManualScroll, { passive: true });

    // Initial check on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", handleScrollEnd);
      window.removeEventListener("wheel", cancelManualScroll);
      window.removeEventListener("touchstart", cancelManualScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    isManualClickRef.current = id;
    setActiveSection(id);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    // Safety release for the scroll lock
    scrollTimeoutRef.current = setTimeout(() => {
      isManualClickRef.current = null;
    }, 850);

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
      className="fixed top-2.5 xs:top-3.5 sm:top-5 inset-x-0 z-50 flex justify-center items-center pointer-events-none px-2 xs:px-3"
    >
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto flex items-center p-0.5 xs:p-1 sm:p-1.5 rounded-full border border-[var(--border)] bg-[#FFFFFF]/85 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.03] transition-all duration-300 ${
          scrolled
            ? "shadow-[0_12px_36px_rgba(0,0,0,0.09)] bg-[#FFFFFF]/92"
            : ""
        }`}
      >
        <ul
          ref={navRef}
          className="relative flex items-center gap-0.5 sm:gap-1 list-none m-0 p-0"
        >
          {/* Silky smooth single sliding indicator pill */}
          {indicatorStyle && (
            <motion.div
              aria-hidden="true"
              className="absolute rounded-full bg-[var(--accent)] shadow-sm pointer-events-none z-0"
              initial={false}
              animate={{
                x: indicatorStyle.x,
                top: indicatorStyle.top,
                width: indicatorStyle.width,
                height: indicatorStyle.height,
              }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 32,
                mass: 0.8,
              }}
            />
          )}

          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className="relative">
                <a
                  ref={(el) => {
                    itemRefs.current[item.id] = el;
                  }}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative z-10 block px-2 py-1 xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 rounded-full font-mono text-[10.5px] xs:text-xs sm:text-sm font-medium tracking-tight xs:tracking-wide uppercase transition-colors duration-200 select-none ${
                    isActive
                      ? "text-white"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/[0.03]"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}
