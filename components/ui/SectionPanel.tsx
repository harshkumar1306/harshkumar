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

  // Refined proportional corner curves for all viewports
  let roundedClasses = "";
  if (roundedEdge === "top") {
    roundedClasses =
      "rounded-t-[40px] xs:rounded-t-[48px] sm:rounded-t-[64px] md:rounded-t-[80px] lg:rounded-t-[88px] rounded-b-none";
  } else if (roundedEdge === "none") {
    roundedClasses = "rounded-none";
  } else {
    roundedClasses =
      "rounded-b-[40px] xs:rounded-b-[48px] sm:rounded-b-[64px] md:rounded-b-[80px] lg:rounded-b-[88px] rounded-t-none";
  }

  // Bookended sections (Hero at start, Contact at end) are calc(100vh - 42px) on desktop
  // so the adjacent section is visible by ~1cm (42px) in the viewport.
  // On mobile devices, min-h-[calc(100dvh-42px)] allows natural content expansion.
  const heightClasses =
    isBookended === "start" || isBookended === "end"
      ? "min-h-[calc(100dvh-42px)] lg:h-[calc(100vh-42px)] lg:min-h-[calc(100vh-42px)]"
      : "min-h-[100dvh] lg:min-h-screen";

  return (
    <div
      data-section-panel="true"
      className={`w-full ${heightClasses} p-0 m-0 relative flex flex-col ${cutoutBgClass} ${wrapperClassName}`}
    >
      <section
        id={id}
        className={`relative z-10 w-full flex-1 min-h-0 flex flex-col justify-center transition-colors duration-200 overflow-hidden ${roundedClasses} ${panelBg} ${className}`}
      >
        {/* Content-safe inner wrapper with fluid horizontal & vertical padding */}
        <div className="w-full flex-1 flex flex-col justify-center px-4 xs:px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 max-w-[1440px] mx-auto py-8 sm:py-10 md:py-12">
          {children}
        </div>
      </section>
    </div>
  );
}
