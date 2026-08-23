"use client";

import { useEffect, useRef } from "react";

export function SoftScrollSettle() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSettlingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls during settling, cancel settling immediately to not fight user input
      if (isSettlingRef.current) {
        isSettlingRef.current = false;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Debounce 130ms after scroll events stop
      timeoutRef.current = setTimeout(() => {
        const sections = document.querySelectorAll<HTMLElement>(
          "[data-section-panel='true']"
        );
        if (!sections || sections.length === 0) return;

        const threshold = window.innerHeight * 0.25;
        let closestSection: HTMLElement | null = null;
        let minDistance = Infinity;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const dist = Math.abs(rect.top);
          // If section top is within 25% of viewport top and not already perfectly aligned
          if (dist > 8 && dist <= threshold && dist < minDistance) {
            minDistance = dist;
            closestSection = section;
          }
        });

        if (closestSection) {
          const targetTop =
            window.scrollY +
            (closestSection as HTMLElement).getBoundingClientRect().top;
          isSettlingRef.current = true;
          window.scrollTo({
            top: targetTop,
            behavior: "smooth",
          });
          setTimeout(() => {
            isSettlingRef.current = false;
          }, 600);
        }
      }, 130);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return null;
}
