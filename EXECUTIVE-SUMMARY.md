# Portfolio v2 — Executive Summary (Corrected)

> **Document type:** Planning & implementation guide  
> **Owner:** Muhammad Ahmad  
> **Target role:** Software Engineer — Backend Developer  
> **Stack constraint:** HTML5, CSS3, JavaScript (ES6+), Bootstrap 5 — no React/Vue/Angular

---

## 1. Purpose

Upgrade the current single-page portfolio from generic **"Frontend Web Developer"** branding to a **recruiter-focused Backend Engineer portfolio (v2)**.

The original PDF described an 80–120 page specification process. **This corrected summary condenses that into an actionable implementation guide** so development can start immediately without waiting for full multi-volume documentation.

---

## 2. Key Strategic Shifts

| Area | Current (v1) | Target (v2) |
|------|--------------|-------------|
| Branding | Frontend Web Developer | Software Engineer \| Backend Developer |
| Focus | HTML/CSS/PHP progress bars | NestJS, TypeScript, PostgreSQL, APIs |
| Sections | Hero, About, Skills, Services, Portfolio, Contact | Hero, About, **Experience**, **Projects**, Skills, **Education**, Contact |
| Skills UI | Percentage bars | Categorized badges/icons |
| Projects | 2 static cards, `#` links | Cards + modals, GitHub/Live Demo, tech tags |
| SEO | Minimal | Title, description, Open Graph |
| Accessibility | Partial | WCAG AA targets, ARIA, keyboard nav |
| Code quality | Duplicate files, CSS bugs | Single source of truth, CSS variables |

---

## 3. Design System (Implementation-Ready)

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#1a73e8` | Buttons, links, accents |
| `--color-primary-dark` | `#1557b0` | Hover states |
| `--color-secondary` | `#6c757d` | Subtitles, muted text |
| `--color-bg-dark` | `#1a1a1a` | Page background |
| `--color-bg-section` | `#20201f` | Section backgrounds |
| `--color-text` | `#f0f0f0` | Body text |
| `--color-text-muted` | `#b0b0b0` | Secondary text |
| `--color-success` | `#28a745` | Valid form states |

**Correction:** Original site used `#0d6efd` and invalid syntax like `#0d6efd(13, 110, 253, 0.1)`. v2 standardizes on `#1a73e8` and valid `rgba()` values.

### Typography

- **Headings / body:** `"Inter", "Segoe UI", Roboto, sans-serif` (Google Fonts)
- **Code / tech:** `"Fira Code", monospace` (optional, for badges)
- **Base size:** 16px minimum on mobile
- **Scale:** H1 3rem → 1.75rem mobile; H2 2rem → 1.35rem mobile

### Spacing & Layout

- Bootstrap 5 container + grid (mobile-first)
- Section padding: 100px desktop / 60px mobile
- Breakpoints: xs `<576`, sm `≥576`, md `≥768`, lg `≥992`, xl `≥1200`

---

## 4. Information Architecture

```
Home (Hero)
├── About
├── Experience
├── Projects
├── Skills
├── Education
└── Contact
```

**Navigation labels:** HOME · ABOUT · EXPERIENCE · PROJECTS · SKILLS · EDUCATION · CONTACT · HIRE ME

**Removed:** Services section (content merged into About/Experience where relevant).

---

## 5. Section Requirements (Condensed)

### Hero
- H1: Muhammad Ahmad
- H2: Software Engineer | Backend Developer
- Short blurb: backend/API focus, production-ready systems
- CTAs: Download CV → `Javascript/Muhammad Ahmad CV.pdf`; View Projects → `#projects`
- Tech decoration: NestJS, TypeScript, PostgreSQL, Node.js icons
- Fade-in animation; respect `prefers-reduced-motion`

### About
- BBIS degree, University of Sahiwal, transition to backend engineering
- Core strengths: REST APIs, auth, databases, clean architecture
- Professional photo + Download CV

### Experience (NEW)
- Timeline layout: role, company, dates, bullet achievements
- Placeholder entries for internships/freelance until real data is added

### Projects
- Minimum 3 cards; flagship: **XS Auth Service (NestJS)**
- Each card: screenshot, title, description, tech badges, GitHub + Live Demo
- Bootstrap modal for expanded details (features, architecture notes)

### Skills
- Categories: Backend · Languages · Databases · Tools
- Icon/badge grid — **no percentage bars** (recruiters prefer verifiable projects over self-rated %)

### Education & Certificates
- BBIS — University of Sahiwal
- Certificate placeholders with issuer + link fields

### Contact
- Form: Name, Email, Message (client validation; backend via Formspree or similar when ready)
- Display: email, phone, LinkedIn, GitHub
- Honeypot field for basic spam protection

---

## 6. Technical Standards

### HTML
- Valid `<!DOCTYPE html>`
- Semantic: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- One H1 per page; logical heading order
- All images: meaningful `alt` text
- `loading="lazy"` on below-fold images

### CSS
- CSS custom properties in `:root`
- No invalid color syntax
- Unique class names for decorative shapes (avoid `.shape-1` collisions)
- `.nav-link.active` styled for scroll spy

### JavaScript
- Single `DOMContentLoaded` entry point
- Scroll spy, smooth scroll, scroll animations
- Bootstrap modal triggers for projects
- Form validation + prevent default submit until backend wired

### SEO (minimum)
```html
<title>Muhammad Ahmad — Backend Developer | NestJS & PostgreSQL</title>
<meta name="description" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:type" content="website">
```

### Performance targets
- Lighthouse: aim ≥90 Performance, ≥90 Accessibility, ≥90 SEO
- Minimize render-blocking where possible (fonts with `display=swap`)

---

## 7. Folder Structure

```
M-Ahmad-Portfolio-main/
├── index.html
├── EXECUTIVE-SUMMARY.md
├── CSS/
│   └── style.css
├── Javascript/
│   ├── portfolio.js
│   └── Muhammad Ahmad CV.pdf   (add file)
├── Images/
│   ├── logo.png
│   ├── my-image-removebg.png
│   └── project-*.png
└── README.md
```

**Remove:** duplicate `style.css` and `portfolio.js` at project root.

---

## 8. Corrections Applied to Original PDF

1. **Removed broken citation markers** (`【38†L191-L195】`) — not usable in implementation.
2. **Clarified document purpose** — original was a *plan to write* 80–120 pages; this file is the *build spec*.
3. **Resolved color conflict** — standardized on `#1a73e8` (spec sample) vs old `#0d6efd`.
4. **Bootstrap 5 badge syntax** — use `badge bg-primary`, not Bootstrap 4 `badge-pill`.
5. **SCSS note** — deferred; v2 uses plain CSS + variables (no build step).
6. **CV path** — use relative `Javascript/Muhammad Ahmad CV.pdf`, not root-absolute `/Javascript/...`.
7. **LinkedIn URL** — always include `https://` protocol.
8. **Contact form** — documented that client-only validation is interim; Formspree/EmailJS recommended.
9. **Content gap** — added placeholder Experience/Education until real entries are supplied.
10. **Services section** — removed from IA; backend portfolio prioritizes projects + experience.

---

## 9. Implementation Checklist (Acceptance Criteria)

- [ ] Valid HTML5 doctype and semantic structure
- [ ] Branding updated to Backend Developer
- [ ] All nav links scroll to correct sections
- [ ] Active nav highlight on scroll
- [ ] Experience timeline section present
- [ ] Projects with modals and tech badges
- [ ] Skills grouped by category (no % bars)
- [ ] Education section present
- [ ] SEO meta + Open Graph tags
- [ ] `navbar-dark` for mobile menu visibility
- [ ] `prefers-reduced-motion` respected
- [ ] Invalid CSS colors fixed
- [ ] Duplicate root CSS/JS removed
- [ ] All external links use `https://`
- [ ] Form validates; submit does not reload page (until backend added)

---

## 10. Future Enhancements (Post v2)

- Wire contact form to Formspree / custom API
- Add real project screenshots and GitHub URLs
- Add `robots.txt`, `sitemap.xml`, favicon
- Lighthouse audit and image compression pass
- Optional: dark/light theme toggle

---

## 11. Sources (Clean References)

- [Bootstrap 5 — Grid & breakpoints](https://getbootstrap.com/docs/5.2/layout/grid/)
- [WCAG 2.1 — Contrast (AA)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)

---

*Last updated: July 2026 — corrected for direct implementation.*
