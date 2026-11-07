# CLAUDE.md — Portfolio Codebase Guide

This file provides context for AI assistants (Claude Code and similar tools) working in this repository.

---

## Project Overview

A personal portfolio website for **Suwan Sankaja** (Data Engineer & AI/ML Enthusiast), built with **Next.js 16** and deployed as a static export. The live site is hosted at **suwansankaja.com**.

- **Repo:** https://github.com/SuwanSankaja/Portfolio
- **Stack:** Next.js 16 (App Router) + React 19 + CSS Modules + CSS Custom Properties
- **Build:** `npm run build` → static export to `/out/`

---

## Repository Structure

```
Portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css           # Design system: tokens, reset, utilities, reveal + reduced-motion rules
│   │   ├── layout.js             # Root layout: next/font, metadata/SEO, Person JSON-LD
│   │   └── page.js               # Home page composing all sections
│   ├── config/
│   │   └── site.js               # Availability status, identity, contact info, socials (single source)
│   └── components/
│       ├── Navbar / Hero / Marquee / About / Skills / Projects / Resume /
│       │   Certifications / Contact / Footer   (+ co-located .module.css)
│       ├── PipelineTerminal.js   # Animated "pipeline run" card in the hero
│       ├── DataField.js          # Interactive canvas network behind the hero
│       ├── InteractiveEffects.js # Cursor glow, card spotlight, [data-magnetic], [data-tilt]
│       ├── ScrollReveal.js / ScrollLine.js / CountUp.js / LocalTime.js
│       ├── SectionHeader.js      # Numbered label + title + gradient highlight + subtitle
│       └── Icons.js              # Inline SVG icon set
├── package.json
├── next.config.mjs               # Static export config
├── jsconfig.json                 # Path alias: @/ → src/
├── eslint.config.mjs             # Flat config (eslint-config-next/core-web-vitals)
└── CLAUDE.md
```

Legacy files (`index.html`, `assets/`, `api/`, `forms/`) are from the previous version and may be removed.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, static export) |
| UI | React 19, functional components |
| Styling | CSS Modules + CSS Custom Properties (no Tailwind) |
| Fonts | Inter (body), Space Grotesk (headings), JetBrains Mono (labels/code) via `next/font/google` |
| Icons | Inline SVGs (no icon library) |
| Deployment | Static export — compatible with GitHub Pages, Cloudflare, Vercel |

---

## Development

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Build static export to /out/
npm run lint     # Run ESLint (eslint .)
```

---

## Architecture & Conventions

### Components
- Named exports only (e.g., `export function Navbar()`)
- `'use client'` directive only on interactive components (Navbar, Hero, Certifications, Contact and the effect/helper components)
- CSS Modules co-located with components (`Component.module.css`)
- Data arrays defined at module top level, not inside render

### Styling
- All design tokens in `globals.css` as CSS custom properties (`:root`)
- Colors: `--primary` (cyan #00d4ff), `--accent` (purple #a855f7), dark backgrounds
- Glass cards: `.glass-card` gets a pointer-following spotlight border via `--mx/--my` (set by InteractiveEffects)
- Motion must respect `prefers-reduced-motion` (handled globally in globals.css and in JS effects)
- **CSS Modules scope `@keyframes` names.** A module cannot use keyframes defined in globals.css —
  define the keyframes locally in the module that uses them (see the bottom of e.g. Marquee.module.css)
- Responsive: mobile-first, breakpoints at 600px, 768px, 1024px
- Global utility classes: `.container`, `.section`, `.section-alt`, `.section-label`, `.section-title`, `.btn`, `.glass-card`, `.gradient-text`

### Path Alias
- `@/` maps to `./src/` (configured in jsconfig.json)

---

## Content Updates

All portfolio content is defined as static data arrays at the top of each component file:

| Content | File |
|---|---|
| **Availability status** | `src/config/site.js` → `AVAILABILITY_STATUS` (`'open'` / `'limited'` / `'unavailable'`) |
| Name, email, phone, résumé link, socials | `src/config/site.js` |
| Navigation links | `src/components/Navbar.js` (and footer links in `Footer.js`) |
| Hero rotating words & stats | `src/components/Hero.js` |
| Hero pipeline card content | `src/components/PipelineTerminal.js` |
| Marquee technologies | `src/components/Marquee.js` |
| Skills | `src/components/Skills.js` |
| Projects | `src/components/Projects.js` |
| Resume / Education | `src/components/Resume.js` |
| Certifications | `src/components/Certifications.js` |

Images are hosted on an external CDN (`filedn.eu`) — do not commit large binaries.
