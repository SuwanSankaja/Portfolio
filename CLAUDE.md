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
│   │   ├── globals.css           # Design system: tokens, reset, utilities, animations
│   │   ├── layout.js             # Root layout with metadata/SEO
│   │   └── page.js               # Home page composing all sections
│   └── components/               # 9 section components with co-located CSS Modules
│       ├── Navbar.js / Navbar.module.css
│       ├── Hero.js / Hero.module.css
│       ├── About.js / About.module.css
│       ├── Skills.js / Skills.module.css
│       ├── Projects.js / Projects.module.css
│       ├── Resume.js / Resume.module.css
│       ├── Certifications.js / Certifications.module.css
│       ├── Contact.js / Contact.module.css
│       └── Footer.js / Footer.module.css
├── public/                       # Static assets (favicon, etc.)
├── package.json
├── next.config.mjs               # Static export config
├── jsconfig.json                 # Path alias: @/ → src/
├── eslint.config.mjs
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
| Fonts | Inter (body), Space Grotesk (headings) via Google Fonts |
| Icons | Inline SVGs (no icon library) |
| Deployment | Static export — compatible with GitHub Pages, Cloudflare, Vercel |

---

## Development

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Build static export to /out/
npm run lint     # Run ESLint
```

---

## Architecture & Conventions

### Components
- Named exports only (e.g., `export function Navbar()`)
- `'use client'` directive only on interactive components (Navbar, Hero, Certifications, Contact)
- CSS Modules co-located with components (`Component.module.css`)
- Data arrays defined at module top level, not inside render

### Styling
- All design tokens in `globals.css` as CSS custom properties (`:root`)
- Colors: `--primary` (cyan #00d4ff), `--accent` (purple #a855f7), dark backgrounds
- Glass-morphism: `backdrop-filter: blur()` + semi-transparent backgrounds
- Responsive: mobile-first, breakpoints at 600px, 768px, 1024px
- Global utility classes: `.container`, `.section`, `.section-alt`, `.section-label`, `.section-title`, `.btn`, `.glass-card`, `.gradient-text`

### Path Alias
- `@/` maps to `./src/` (configured in jsconfig.json)

---

## Content Updates

All portfolio content is defined as static data arrays at the top of each component file:

| Content | File |
|---|---|
| Navigation links | `src/components/Navbar.js` |
| Typed text items | `src/components/Hero.js` |
| Contact info | `src/components/About.js`, `src/components/Contact.js` |
| Skills | `src/components/Skills.js` |
| Projects | `src/components/Projects.js` |
| Resume / Education | `src/components/Resume.js` |
| Certifications | `src/components/Certifications.js` |
| Social links | `src/components/Contact.js` |

Images are hosted on an external CDN (`filedn.eu`) — do not commit large binaries.
