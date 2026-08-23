import React from "react";

export interface SectionPanelProps {
  id?: string;
  bgVariant?: "light" | "cream";
  nextBgVariant?: "light" | "cream";
  prevBgVariant?: "light" | "cream";
  roundedEdge?: "bottom" | "top" | "none";
  isBookended?: "start" | "end";
  className?: string;
  wrapperClassName?: string;
  children: React.ReactNode;
}

export function SectionPanel({
  id,
  bgVariant = "light",
  nextBgVariant,
  prevBgVariant,
  roundedEdge = "bottom",
  isBookended,
  className = "",
  wrapperClassName = "",
  children,
}: SectionPanelProps) {
  const panelBg =
    bgVariant === "cream" ? "bg-[var(--bg-cream)]" : "bg-[var(--bg-primary)]";

  // Determine wrapper background behind the rounded cutout corners
  let cutoutBgClass = "";
  if (roundedEdge === "top") {
    const effectivePrev =
      prevBgVariant ?? (bgVariant === "light" ? "cream" : "light");
    cutoutBgClass =
      effectivePrev === "cream"
        ? "bg-[var(--bg-cream)]"
        : "bg-[var(--bg-primary)]";
  } else if (roundedEdge === "none") {
    cutoutBgClass = panelBg;
  } else {
    const effectiveNext =
      nextBgVariant ?? (bgVariant === "light" ? "cream" : "light");
    cutoutBgClass =
      effectiveNext === "cream"
        ? "bg-[var(--bg-cream)]"
        : "bg-[var(--bg-primary)]";
  }

  // Pronounced 60-88px bold curves
  let roundedClasses = "";
  if (roundedEdge === "top") {
    roundedClasses =
      "rounded-t-[60px] sm:rounded-t-[72px] md:rounded-t-[80px] lg:rounded-t-[88px] rounded-b-none";
  } else if (roundedEdge === "none") {
    roundedClasses = "rounded-none";
  } else {
    roundedClasses =
      "rounded-b-[60px] sm:rounded-b-[72px] md:rounded-b-[80px] lg:rounded-b-[88px] rounded-t-none";
  }

  // Bookended sections (start for Hero, end for Contact) are calc(100vh - 42px) tall
  // so the adjacent section is visible by ~1cm (42px) in the 100vh viewport
  const heightClasses =
    isBookended === "start" || isBookended === "end"
      ? "h-[calc(100vh-42px)] min-h-[calc(100vh-42px)]"
      : "min-h-screen";

  return (
    <div
      data-section-panel="true"
      className={`w-full ${heightClasses} p-0 m-0 relative flex flex-col ${cutoutBgClass} ${wrapperClassName}`}
    >
      <section
        id={id}
        className={`relative z-10 w-full flex-1 min-h-0 flex flex-col justify-center transition-colors duration-200 overflow-hidden ${roundedClasses} ${panelBg} ${className}`}
      >
        {/* Content-safe inner wrapper with 5-8vw horizontal padding */}
        <div className="w-full flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 max-w-[1440px] mx-auto py-3 sm:py-5 md:py-6">
          {children}
        </div>
      </section>
    </div>
  );
}
