# Portfolio Project Brief

## Concept
A single-page portfolio for Harsh Kumar, a full-stack software engineer
working across frontend, backend, systems integration, and applied
AI/LLM engineering. Visual direction: a bold retro-magazine-style Hero
paired with a calm, minimalist body — light background throughout, no
dark/space theme.

The page is built from rounded-rectangle panel sections that rise up
and stack over one another as the user scrolls, rather than a plain
top-to-bottom flow. Projects break from vertical scroll into a
horizontal card gallery, navigated by directional cue buttons and
two-finger trackpad swipe — not by hijacking the vertical scroll wheel.

## Positioning
The site should read as production-level engineering work. Copy,
structure, and project descriptions should reflect real ownership —
architecture decisions, trade-offs, deployment, and outcomes — not
just "built with X, Y, Z."

## Section Order (single scroll, no jump-nav)
1. Hero — retro/magazine headline treatment, animated ASCII cat art on
   the right side of the section
2. About Me — full section, bio content
3. Skills/Tech — tech stack shown as clickable brand-logo chips
4. Projects — RepoLens, Octype, LeadMap, each a rounded-rectangle card
   in a horizontal gallery within this section (see interaction model)
5. Contact — email with copy button, resume link, WhatsApp button,
   social handles (GitHub/LinkedIn) positioned in a corner

## Layout Mechanic
- Every section renders as a rounded-corner rectangular panel
- As the user scrolls, each new section's panel rises up and settles
  over the previous one (card-stack effect), rather than a flat scroll
- No "jump to next section" cue buttons anywhere in the site

## Projects Section — Interaction Model
- Normal vertical mouse-wheel scroll always continues scrolling the
  page vertically, even while inside the Projects section — it is
  never hijacked into horizontal movement
- Horizontal movement between the 3 project cards happens via:
  1. Two directional cue buttons (prev/next) on the section
  2. Two-finger horizontal swipe/scroll on a laptop trackpad, detected
     separately from vertical wheel scroll
- Order: RepoLens → Octype → LeadMap

## Visual Constants
- Light background throughout (see color-and-theme.md)
- One accent color (near-black), used consistently for buttons,
  links, and interactive elements
- Bold display typography in Hero only; clean, restrained typography
  everywhere else
- Rounded-rectangle panel shape repeated across every section for
  visual consistency

## Content Source
All assets and text content live in the portfolio-assets folder:
00-project-brief, 01-identity, 02-code-systems, 05-contact,
shared-assets. Each project has its own subfolder with a
description.md and associated media — treat description.md files as
the source of truth for copy.

## Build Approach
Built in Antigravity, section by section rather than as one giant
generation pass.