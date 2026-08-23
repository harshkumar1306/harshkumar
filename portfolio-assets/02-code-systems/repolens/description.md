# RepoLens

Paste a GitHub URL, get a full documentation suite back — architecture
diagrams, API reference, database schema, setup guide, all generated in
parallel and streamed in live as each one finishes.

## The problem
Undocumented repos are expensive to onboard into. RepoLens automates the
first pass: it ingests a repository, understands its structure, and
produces the eight documents a new contributor would actually need —
overview, architecture, tech stack breakdown, database schema, API
reference, setup guide, deployment guide, and a reverse-engineered spec.

## How it works
A 4-layer ingestion pipeline handles repos of any size without wasting
API calls: a size guard rejects anything over 50MB or 2,000 files, then
the file tree is fetched and filtered, files are tier-ranked by
relevance (entry points and config first, then routes/controllers/
models), and only the highest-value files are sent to Claude. Each of
the 8 documents is generated from a scoped prompt containing only the
files relevant to that document — architecture gets entry points and
Docker files, API reference gets route files.

Generation runs through a concurrency-limited queue (3 parallel Claude
calls) with retry logic and exponential backoff, and WebSocket updates
push each completed document to the frontend as it lands, so the whole
flow is watched live rather than waiting on a spinner.

## Stack & architecture
Frontend: React + Vite, Tailwind, Framer Motion, Socket.io client,
Mermaid.js for live architecture/ER diagrams.
Backend: Node.js + Express, Prisma ORM over PostgreSQL (Neon serverless),
Octokit for GitHub access, the Anthropic SDK for generation, Puppeteer
for PDF export.
Deployed as two services — frontend on Vercel, backend on Render — with
a proxy rewrite so cookies work across origins, plus GitHub OAuth for
auth.

## Reliability details worth mentioning
Repo caching (24h TTL) avoids re-analyzing repos already processed.
Partial-failure handling means a job still returns results if up to 4
of the 8 documents fail. A rate-limit guard checks GitHub API headroom
every 20 files and pauses ingestion before hitting zero.

## Tech tags (for logo chips)
React, Vite, TailwindCSS, Node.js, Express, PostgreSQL, Prisma,
Socket.io, Vercel, GitHub, Anthropic