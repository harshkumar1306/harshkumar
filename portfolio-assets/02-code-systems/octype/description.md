# Octype

A browser-based grand piano — real Salamander Grand Piano recordings,
32-voice polyphony, MIDI input, sub-10ms feel, working fully offline
after first load.

## The problem
Most web pianos are toys: laggy, thin-sounding, and built as a React
component that happens to trigger audio. Octype is built the other way
around — a real-time audio system that has a React interface, not a
React app that plays audio.

## How it works
The audio engine is fully decoupled from React and never touches
component state. Input (keyboard, mouse, touch, or MIDI) resolves to a
note through a singleton InputRouter, which updates a Zustand store for
the UI and separately calls the audio engine directly. The engine picks
the correct sample and velocity layer, computes pitch shift and gain,
and starts a dedicated signal chain per note — all scheduled on the Web
Audio clock (AudioContext.currentTime), not on React's render cycle.
That separation is what keeps playback tight even while the UI animates.

Notes are sampled at 30 pitches across 16 velocity layers (480 files
total); in-between semitones are produced by pitch-shifting the nearest
recorded sample. A Service Worker plus IndexedDB caching means the app
and its ~480 audio files work with zero network requests after the
first visit.

## Stack & architecture
Next.js 14 (App Router), TypeScript in strict mode, React 18, Tailwind,
Framer Motion for UI animation, Zustand for state, native Web Audio API
and Web MIDI API — no audio or MIDI libraries, built directly on browser
primitives.

## Tech tags (for logo chips)
Next.js, TypeScript, React, TailwindCSS