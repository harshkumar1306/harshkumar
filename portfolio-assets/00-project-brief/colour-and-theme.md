# Color & Theme System

## Philosophy
Light, minimalist, high-contrast-but-calm — near-white backgrounds,
near-black text and accents, restrained use of color. The retro
character comes from typography and layout (bold Hero headline, ASCII
art, rounded panels), not from a colorful palette.

## Base Palette

### Background
- Primary background: #FAFAF8
- Panel/card surface: #FFFFFF
- Elevated/alternate surface (subtle section variation): #F2F1ED

### Accent (buttons, links, active states)
- Near-black (main): #16171A
- Hover state: #34363B
- Muted/disabled: #C7C6C1

### Neutrals / Text
- Primary text (headings): #16171A
- Body text: #4B4D52
- Muted text (captions, labels): #8A8D93
- Borders/dividers: #E4E3DE

## Typography Direction
- Hero display/headline: Archivo Black or Bebas Neue (Google Fonts) —
  bold, condensed, retro-magazine character, used only in Hero
- Section headings elsewhere: Space Grotesk (Google Fonts)
- Body text: Inter (Google Fonts)
- Monospace (ASCII art, code-flavored accents): JetBrains Mono
  (Google Fonts)

## Panel & Motion Rules
- Every section is a rounded-rectangle panel (generous corner radius,
  e.g. 24-32px), background var(--bg-panel), subtle border
  var(--border), optional soft shadow for depth against the page
  background
- Sections rise/stack over one another on scroll — implemented as a
  layered scroll animation, not a flat top-to-bottom layout
- Buttons: filled pill shape, var(--accent) background, white text,
  var(--accent-hover) on hover — matches the black-pill CTA style from
  the reference design
- Projects horizontal gallery: directional buttons use the same pill
  button style; trackpad two-finger swipe supported alongside button
  clicks

## What to avoid
- No dark backgrounds or space/starfield elements — that theme has
  been fully replaced
- No more than one accent color for UI/interactive elements
- No gradients as primary decoration
- Keep color usage restrained outside of brand/tech logo chips, which
  naturally carry their own official colors