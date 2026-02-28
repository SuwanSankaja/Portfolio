# CLAUDE.md — Portfolio Codebase Guide

This file provides context for AI assistants (Claude Code and similar tools) working in this repository.

---

## Project Overview

A personal portfolio website for **Suwan Sankaja** (Data Engineer & AI/ML Enthusiast), built as a static site with a serverless backend. The live site is hosted at **suwansankaja.com** via Cloudflare Workers.

- **Repo:** https://github.com/SuwanSankaja/Portfolio
- **Stack:** Vanilla HTML/CSS/JS frontend + Cloudflare Workers serverless API
- **Deployment:** Cloudflare Workers (`wrangler deploy`)

---

## Repository Structure

```
Portfolio/
├── index.html            # Main portfolio page (single-page application, ~877 lines)
├── inner-page.html       # Template placeholder — not actively used
├── package.json          # npm metadata; one dependency (nodemailer)
├── package-lock.json     # Locked dependency tree
├── wrangler.jsonc        # Cloudflare Workers deployment config
├── CNAME                 # Custom domain: suwansankaja.com
├── .gitignore            # Ignores node_modules/
│
├── api/
│   ├── contact.js        # Serverless contact form handler (POST /api/contact)
│   └── test.js           # Health-check endpoint (GET /api/test)
│
├── assets/
│   ├── css/
│   │   └── style.css     # All custom styles (~1610 lines, dark theme)
│   ├── js/
│   │   └── main.js       # All custom JS interactions (~275 lines)
│   ├── scss/
│   │   └── Readme.txt    # SCSS source only available in paid template version
│   └── vendor/           # Third-party libraries (loaded locally, not via CDN)
│       ├── aos/              # Animate On Scroll
│       ├── bootstrap/        # Bootstrap 5.3.1
│       ├── bootstrap-icons/  # Icon set
│       ├── boxicons/         # Additional icons
│       ├── glightbox/        # Lightbox gallery
│       ├── isotope-layout/   # Grid filtering/sorting
│       ├── php-email-form/   # Legacy PHP form helper (unused)
│       ├── purecounter/      # Counter animations
│       ├── swiper/           # Carousel/slider
│       ├── typed.js/         # Typewriter text effect
│       └── waypoints/        # Scroll position triggers
│
└── forms/
    ├── contact.php       # Legacy PHP form handler — superseded by api/contact.js
    └── Readme.txt        # Note: premium PHP form in paid template version
```

---

## Technology Stack

| Layer | Technology |
|---|---|
| HTML/CSS | Vanilla HTML5, custom CSS (no preprocessor) |
| CSS Framework | Bootstrap 5.3.1 (local vendor) |
| JavaScript | Vanilla ES6+ (no bundler) |
| Animation | AOS, custom CSS transitions, Typed.js, Parallax |
| Icons | Bootstrap Icons, Boxicons |
| Backend/API | Node.js — Cloudflare Workers serverless |
| Email | Nodemailer 7.x (Gmail SMTP) |
| Deployment | Cloudflare Wrangler CLI |
| Package Manager | npm |

There is **no build step**, **no bundler** (Webpack/Vite), and **no TypeScript**. All assets are served as static files directly from the repository root.

---

## Key Files in Detail

### `index.html`

The single HTML file driving the whole site. Sections in order:

1. **Header / Sidebar** — profile card, social links, navigation
2. **Hero** — animated code background, typing effect, parallax scroll
3. **About** — biography, contact details
4. **Skills** — 6 skill cards (Languages, Data Engineering, AI/ML, Frontend/Mobile, Backend, Databases)
5. **Projects** — 6 featured projects with GIF demos (served from external CDN: `filedn.eu`)
6. **Resume** — Education + Work/Project timeline
7. **Certifications** — Filterable grid (Cisco, AWS, Oracle, GitHub, Coursera, Other)
8. **Contact** — Form + contact info block
9. **Footer**

The `<head>` includes Google Analytics tag `GA-DMMDCYRZMK`.

### `assets/css/style.css`

All custom styles. Key CSS custom properties defined at `:root`:

```css
--primary-color: #00d4ff   /* Cyan accent */
--accent-color:  #ff006e   /* Hot pink accent */
--bg-primary:    #0d1117   /* Dark background */
--text-primary:  #ffffff
--text-secondary: #a3a3a3
```

The file is **not generated** — edit it directly. There is no SCSS compilation step.

### `assets/js/main.js`

Handles all client-side interactivity:

- **Loader** — fade-out on page ready
- **Mobile nav** — hamburger toggle, icon swap (list ↔ X)
- **Active nav** — highlights current section link on scroll (200px offset)
- **Smooth scroll** — `.scrollto` links with 70px offset, closes mobile menu
- **Back-to-top** — appears after 100px scroll
- **Typed.js** — reads `data-typed-items` attribute; 50ms type speed, 30ms back speed
- **Cert filtering** — show/hide `.cert-card` items by category via `data-category`
- **AOS init** — 800ms duration, 100px offset, ease-in-out
- **Parallax** — hero at 0.5× scroll speed, code background at 0.3×
- **Contact form** — intercepts submit, POSTs JSON to `/api/contact`, shows loading state; falls back to `mailto:` on API failure

### `api/contact.js`

Serverless function deployed as a Cloudflare Worker:

- **GET `/api/contact`** — Health check; returns config status (whether env vars are set)
- **POST `/api/contact`** — Sends email via Gmail SMTP using Nodemailer

**Required environment variables (set in Cloudflare dashboard):**

| Variable | Purpose |
|---|---|
| `GMAIL_USER` | Gmail address used to send email |
| `GMAIL_PASSWORD` | Gmail App Password (not account password) |

Validation: all four fields (`name`, `email`, `subject`, `message`) required; email regex validated. Specific error codes handled: `EAUTH` (bad credentials), `ENOTFOUND` (network failure).

### `wrangler.jsonc`

```jsonc
{
  "name": "portfolio",
  "compatibility_date": "2026-02-21",
  "assets": { "directory": "." }
}
```

Serves the entire repo root as static assets; `/api/` functions are automatically routed by Cloudflare Workers.

---

## Development Workflow

### Local development

There is no local dev server configured. Options:

```bash
# Simple HTTP server (Python)
python3 -m http.server 8080

# Or use the Wrangler dev server (mirrors Cloudflare environment)
npx wrangler dev
```

`npx wrangler dev` is preferred when testing the contact form API because it loads environment variables from a `.dev.vars` file.

### Environment variables for local API testing

Create a `.dev.vars` file in the repo root (already gitignored via `.gitignore` if you add it):

```
GMAIL_USER=your-gmail@gmail.com
GMAIL_PASSWORD=your-app-password
```

### Install dependencies

```bash
npm install
```

This installs only `nodemailer`. Vendor libraries in `assets/vendor/` are already committed to the repo and require no installation.

### Deploy to Cloudflare Workers

```bash
npm run deploy:cf
# equivalent to:
npx wrangler deploy
```

Make sure you are authenticated (`npx wrangler login`) before deploying.

---

## Conventions & Patterns

### HTML

- All sections use `id` attributes that match nav links (`#about`, `#skills`, `#projects`, `#resume`, `#certifications`, `#contact`)
- AOS animations applied via `data-aos="fade-up"` attributes
- Lazy loading on all `<img>` tags: `loading="lazy"`
- Project GIFs/images are hosted on an external CDN (`filedn.eu`), not committed to the repo

### CSS

- Follow the existing dark-theme variable system — use `var(--primary-color)` etc. rather than hardcoded hex values
- New sections should follow the existing `.section-title` / `.section-content` pattern
- Transitions default to `0.3s ease` for interactive elements; `0.5s ease` for larger layout changes
- No CSS preprocessor — write plain CSS

### JavaScript

- Utility wrappers `select()`, `on()`, `onscroll()` are defined at the top of `main.js` — use them instead of raw `document.querySelector`
- No module system (no `import`/`export`) — all code is global scope in `main.js`
- Third-party libraries are loaded via `<script>` tags in `index.html` and accessed as globals (e.g. `Typed`, `AOS`, `Swiper`)

### API

- Keep API handlers in `api/` directory; each file exports a single `async function handler(req, res)`
- Always set CORS headers at the top of every handler
- Always handle `OPTIONS` preflight requests
- Validate all inputs before processing
- Use environment variables for all secrets — never hardcode credentials

---

## What Does Not Exist (Do Not Assume)

- No build step or bundler (no Webpack, Vite, Rollup, Parcel)
- No TypeScript
- No CSS preprocessor (SCSS files are not present in this repo)
- No test framework — `npm test` intentionally exits with an error
- No CI/CD pipeline (no `.github/workflows/`)
- No linting config (no ESLint, Prettier, Stylelint)
- No staging/preview environments
- No `vercel.json` — Vercel was previously used but the project migrated to Cloudflare Workers

---

## Content Updates

To update portfolio content, edit **`index.html`** directly. Key locations:

| Content | Location in index.html |
|---|---|
| Profile info / bio | `#about` section |
| Typed text variants | `data-typed-items` attribute on hero element |
| Skills | `.skill-card` elements in `#skills` |
| Projects | `.project-card` elements in `#projects` |
| Resume / Experience | `#resume` section |
| Certifications | `.cert-card` elements in `#certifications` |
| Social links | Header sidebar `<a>` links |

Project demo GIFs/images should be uploaded to the external CDN or another hosting service and referenced by URL — do not commit large binary files to the repo.

---

## Git Workflow

- **Main branch:** `master` (GitHub default for this repo is `main` on remote)
- **Remote:** `origin` → `https://github.com/SuwanSankaja/Portfolio.git`
- Commit messages have historically been short (`"Update index.html"`) — prefer more descriptive messages for new changes
- No pre-commit hooks or branch protection rules are configured
