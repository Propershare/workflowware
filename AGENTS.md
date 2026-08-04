# Workflowware Agent Handoff

This file is the operating brief for any human or AI agent entering the repository.

## Mission

Workflowware packages agent-operable workflows: specs, rules, evals, approvals, and human handoff.

Public promise:

> Software packaged as agent-operable workflows.
> The job, the rules, the evals, and the handoff — portable for humans and agents.

## Locked public site (LAW)

**Do not replace the public marketing homepage with the ivory/gold dashboard, Afrofuturist command center, BUILD/VERIFY/DEPLOY rail UI, or any “lab console” look.**

Live public site (`main` → workflowware.org) is the **classic lime + white marketing site**:

- Brand mark: navy rounded `W` with lime slash (`logo-mark`)
- Colors: lime `#c8f542`, white/paper, light gray bg `#eef1f4`, navy ink
- Hero: brand, one headline, one supporting sentence, CTA group (Pilot primary), package-layer stack visual
- Conversion door: **Pilot** (Missed Lead Recovery)
- No unfinished Platform / `app.html` links on the public homepage

### Protected files on `main`

Do not wholesale rewrite without Imhotep’s explicit approval:

- `index.html`
- `library.html`
- `pilot.html`
- `spec.html`
- `docs.html`
- `assets/site.css`

### Lab toolkit (not the public homepage)

Dense platform / builder shells (`app.html`, platform CSS, entitlement walls) belong on a **feature branch** or gated path — never as a silent overwrite of `index.html` on `main`.

## Current build state

- Branch: `main`
- Homepage: classic lime marketing (`index.html`)
- Primary CTA: `pilot.html`

## Allowed polish (without redesign)

1. Tighten copy in existing sections
2. Fix broken links
3. Improve Pilot conversion path
4. Keep Spec / Library / Docs in the same visual system

## Forbidden without explicit human approval

- Restoring BUILD / VERIFY / DEPLOY dashboard as homepage
- Replacing lime marketing with ivory/gold Afrofuturist application shell
- Adding fake metrics, fake community quotes, or emoji-glyph rails to the public homepage
- Pointing public nav at unfinished `app.html` pages

## Cursor Cloud specific instructions

This repository is a **purely static site** (plain HTML/CSS/SVG/PNG). There is no build step, no bundler, no JavaScript, no package manager, and no automated test or lint suite. It is published as-is via GitHub Pages (see `CNAME` and `README.md`).

- **Run it in dev:** serve the repo root with any static file server, e.g. `python3 -m http.server 8000` (Python 3 is the only runtime dependency and is preinstalled), then open `http://localhost:8000/index.html`. Do not open `index.html` via `file://` — relative asset paths and page links are designed to be served from the site root.
- **Pages:** `index.html` (homepage), `library.html`, `pilot.html`, `docs.html`, `spec.html`, and `docs/getting-started.html`.
- **No build/test/lint:** there is nothing to compile or run as tests. "Verifying" a change means serving the site and visually checking the affected page(s), plus confirming internal links/assets resolve (e.g. curl the page and referenced asset paths for `200`).
- **Note:** `index.html` does not yet reference `assets/v2-polish.css` or `assets/hero-queen.svg` — wiring those in is an open build task tracked above, not a broken environment.
