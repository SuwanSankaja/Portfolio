# <div align="center">Suwan Sankaja Portfolio</div>

<div align="center">
  A modern, animated personal portfolio built to showcase data engineering, AI/ML, and full-stack work with a polished, high-end presentation.
</div>

<br />

<div align="center">
  <a href="https://suwansankaja.com">
    <img src="https://img.shields.io/badge/Live%20Website-suwansankaja.com-00d4ff?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Website" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-16.1.6-111111?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.1.0-149eca?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Architecture-Static%20Export-1f2937?style=for-the-badge" alt="Static Export" />
  <img src="https://img.shields.io/badge/Contact-Web3Forms%20%2B%20API-7c3aed?style=for-the-badge" alt="Contact Flow" />
</div>

<br />

## ✨ Overview

This repository powers the personal portfolio of **Suwan Sankaja**: a **Data Engineer & AI/ML Enthusiast** with a strong focus on intelligent systems, modern frontend presentation, and production-minded software craftsmanship.

The active application is a **Next.js App Router** portfolio with a custom visual system built around:

- animated hero interactions
- glassmorphism-inspired cards
- scroll-based reveal effects
- responsive navigation
- featured project storytelling
- resume and certification sections
- a working contact experience with fallback behavior

### 🌐 Production Website

The portfolio is live at **[suwansankaja.com](https://suwansankaja.com)**.

## 🧩 What This Portfolio Includes

| Section | Purpose |
| --- | --- |
| `Hero` | High-impact landing section with typed specialties, animated code backdrop, CTA buttons, and quick stats |
| `About` | Professional introduction, role summary, and direct contact details |
| `Skills` | Categorized technical stack across languages, data engineering, AI/ML, frontend/mobile, backend, and databases |
| `Projects` | Featured portfolio work with live/demo links and GitHub references |
| `Resume` | Education timeline, project history, and downloadable resume link |
| `Certifications` | Filterable certifications and badge gallery across Cisco, AWS, Oracle, GitHub, Coursera, and more |
| `Contact` | Direct contact info, social links, and form submission flow |

## 🚀 Highlights

- **Premium UI direction** using CSS Modules, layered gradients, glow effects, custom typography, and motion-heavy sections
- **Responsive by design** with desktop and mobile navigation patterns
- **Strong content architecture** for presenting technical identity, project depth, and career progression
- **SEO-ready metadata** through the App Router layout metadata configuration
- **Static export friendly** setup for straightforward deployment on static hosting platforms
- **Custom domain ready** with `CNAME` already configured for `suwansankaja.com`

## 🛠️ Tech Stack

### Frontend

- Next.js 16
- React 19
- App Router
- CSS Modules
- Custom global design system

### UX / Motion

- Typed-text animation in the hero section
- `IntersectionObserver`-based scroll reveal transitions
- Mouse-follow glow effect
- Responsive section-based single-page layout

### Contact / Integrations

- **Web3Forms** for the current production contact form flow
- `mailto:` fallback if remote submission fails
- Local `api/` handlers for health checks and self-hosted email flow experiments

### Deployment

- Static export via `next.config.mjs`
- `out/` build output
- Custom domain via `CNAME`
- `wrangler.jsonc` included for edge/static hosting workflows

## 📡 API Reference

> **Important:** The live contact form in the frontend currently submits to **Web3Forms** from `src/components/Contact.js`.  
> The local routes in `api/` are still worth documenting because they exist in the repository and can be used for a self-hosted API flow.

### Current Contact Flow

The portfolio's visible form currently:

1. collects `name`, `email`, `subject`, and `message`
2. submits the payload to `https://api.web3forms.com/submit`
3. falls back to a `mailto:` link if the remote request fails

### Local API Endpoints

| Endpoint | Method | Purpose | Notes |
| --- | --- | --- | --- |
| `/api/test` | `GET` | Basic health check route | Returns a message, method, and timestamp |
| `/api/contact` | `GET` | Debug/status endpoint for the contact service | Reports whether Gmail env vars are present |
| `/api/contact` | `POST` | Contact submission endpoint | Validates input and attempts to send an email |
| `/api/contact` | `OPTIONS` | CORS preflight | Allows browser-based cross-origin requests |

The contact route explicitly sets permissive CORS headers for `GET`, `POST`, and `OPTIONS` requests.

### `GET /api/test`

Simple diagnostic endpoint for verifying that the API layer is responding.

#### Example response

```json
{
  "message": "API is working!",
  "method": "GET",
  "timestamp": "2026-04-18T12:00:00.000Z"
}
```

### `GET /api/contact`

Returns a debug payload that helps verify whether the required email credentials are present in the runtime environment.

#### Example response

```json
{
  "message": "Contact API is working! Use POST to send messages.",
  "timestamp": "2026-04-18T12:00:00.000Z",
  "environmentCheck": {
    "hasGmailUser": true,
    "hasGmailPassword": true,
    "gmailUser": "suw***"
  }
}
```

### `POST /api/contact`

Accepts a JSON body and is intended to send the message to the portfolio owner's Gmail inbox.

#### Request body

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Project Inquiry",
  "message": "I would love to discuss a collaboration."
}
```

#### Example request

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Project Inquiry",
    "message": "I would love to discuss a collaboration."
  }'
```

#### Validation rules

- all four fields are required
- `email` must match a valid email format
- Gmail credentials must exist in the environment

#### Success response

```json
{
  "message": "Email sent successfully",
  "messageId": "<provider-message-id>",
  "timestamp": "2026-04-18T12:00:00.000Z"
}
```

#### Error responses

```json
{ "message": "All fields are required" }
```

```json
{ "message": "Invalid email format" }
```

```json
{
  "message": "Server configuration error - missing email credentials"
}
```

```json
{
  "message": "Failed to send email",
  "errorCode": "EAUTH",
  "errorMessage": "Authentication failed",
  "timestamp": "2026-04-18T12:00:00.000Z"
}
```

### Optional environment variables for the local contact API

If you want to use the repository's self-hosted email endpoint instead of Web3Forms, add the following values to `.env.local`:

```bash
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password
```

### API implementation note

The local `/api/contact` route is present in the repo as a debug/self-hosted path, but the current production UI does **not** call it directly. If you plan to enable it in production, review the mailer setup and dependency wiring before deployment. The handler also references `nodemailer`, so make sure that dependency is installed and configured before switching over from Web3Forms.

## 📁 Project Structure

```text
.
├── api/                  # Serverless API handlers
├── src/
│   ├── app/              # Next.js App Router entrypoints and metadata
│   └── components/       # Portfolio sections and UI building blocks
├── assets/               # Legacy static template assets
├── forms/                # Legacy contact form assets
├── next.config.mjs       # Static export configuration
├── wrangler.jsonc        # Hosting/runtime config
├── CNAME                 # Custom domain mapping
└── README.md
```

### Active app vs legacy files

The **active portfolio implementation** lives in:

- `src/app`
- `src/components`
- `next.config.mjs`

The repository also still contains **legacy static-template artifacts** such as:

- `index.html`
- `inner-page.html`
- `assets/`
- `forms/`

Those files appear to come from an older BootstrapMade-based portfolio iteration and are useful to keep in mind when maintaining the repo.

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

### Production build

```bash
npm run build
```

Because the project is configured with `output: 'export'`, the generated static output is written to `out/`.

## 🎨 Design Notes

This portfolio leans into a modern technical aesthetic:

- **Typography:** `Inter` + `Space Grotesk`
- **Visual style:** dark theme, cyan-violet glow palette, glass cards, gradients, and layered depth
- **Motion language:** subtle section reveals, active-state navigation, hover elevation, and hero animation

The end result feels more like a polished digital product than a basic resume site.

## 🌍 Deployment Notes

- The live domain is **[suwansankaja.com](https://suwansankaja.com)**
- Custom domain support is reflected through the repository `CNAME`
- The project is configured for **static export**, which suits CDN and edge-hosted deployments well
- `wrangler.jsonc` suggests compatibility with a Cloudflare-style hosting workflow

## 📬 Contact

If you'd like to collaborate, discuss a role, or connect professionally:

- **Website:** [suwansankaja.com](https://suwansankaja.com)
- **GitHub:** [github.com/SuwanSankaja](https://github.com/SuwanSankaja)
- **LinkedIn:** [linkedin.com/in/suwansankaja](https://www.linkedin.com/in/suwansankaja/)
- **Email:** [suwan.sankaja@gmail.com](mailto:suwan.sankaja@gmail.com)

---

<div align="center">
  Built to present technical depth, product taste, and professional credibility in one clean experience.
</div>
