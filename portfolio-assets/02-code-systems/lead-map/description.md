# LeadMap

A minimalist prospecting tool: search local businesses by type, location,
and radius, filter the results, and export them as a spreadsheet — no
backend, no database, no login.

## The problem
Lead generation tools are usually either expensive SaaS platforms or
clunky exports from Google Maps. LeadMap is a purpose-built alternative
that runs entirely client-side — search, filter, and export contact
data in one pass, with nothing to host or maintain server-side.

## How it works
Search by business type, location, and radius against the Google Places
API. Results land in a clean table (name, category, rating, reviews,
phone, website, address) with quick actions per row — copy the phone
number, open in Google Maps, or visit the website directly. Filters
narrow results by whether a website exists, minimum rating, and minimum
review count, and any subset of results can be selected and exported to
CSV or Excel.

If no API key is configured, the app runs in a demo mode with realistic
mock data — the full UI is evaluable with zero setup or credentials.

## Stack & architecture
React 19 with TypeScript, built on Vite. Styling with Tailwind CSS and
custom shadcn-style component primitives rather than a full component
library. Data comes from the Google Maps JavaScript API (Places
legacy) plus the Geocoding API for location lookups. Export handled
client-side via the xlsx library — no backend round-trip for either
search or export.

## Tech tags (for logo chips)
React, TypeScript, Vite, TailwindCSS, Google Cloud