import { SectionPanel } from "@/components/ui/SectionPanel";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[var(--bg-primary)]">
      {/* 1. Hero (Intro) - Light (#FAFAF8) with isBookended="start" so About Me (cream) is visible by ~1cm at the bottom on initial load */}
      <SectionPanel
        id="hero"
        bgVariant="light"
        nextBgVariant="cream"
        roundedEdge="bottom"
        isBookended="start"
      >
        <Hero />
      </SectionPanel>

      {/* 2. About Me - Cream (#EDEBE6) with rounded bottom corners revealing Light (#FAFAF8) below */}
      <SectionPanel
        id="about"
        bgVariant="cream"
        nextBgVariant="light"
        roundedEdge="bottom"
      >
        <About />
      </SectionPanel>

      {/* 3. Skills - Light (#FAFAF8) with rounded bottom corners revealing Cream (#EDEBE6) below */}
      <SectionPanel
        id="skills"
        bgVariant="light"
        nextBgVariant="cream"
        roundedEdge="bottom"
      >
        <Skills />
      </SectionPanel>

      {/* 4. Projects - Cream (#EDEBE6) solid cream connecting into Contact top curve */}
      <SectionPanel
        id="projects"
        bgVariant="cream"
        roundedEdge="none"
      >
        <Projects />
      </SectionPanel>

      {/* 5. Contact - Light (#FAFAF8) with isBookended="end" so Projects (cream) is visible by ~1cm at the top when scrolled all the way to the bottom */}
      <SectionPanel
        id="contact"
        bgVariant="light"
        prevBgVariant="cream"
        roundedEdge="top"
        isBookended="end"
      >
        <Contact />
      </SectionPanel>
    </main>
  );
}
