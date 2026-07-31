# Workflowware Agent Handoff

This file is the one-glance operating brief for any human or AI agent entering the repository.

## Mission

Build Workflowware as a premium Afrofuturist operating platform for installable, governed AI workflow packages.

Workflowware is not a chatbot site. It is a product platform where people can discover, inspect, install, verify, run, and hand off agent-operable workflows.

Core promise:

> Build. Verify. Deploy.
> Workflows that agents can run. Humans can trust.

## Locked Visual Target

The approved homepage reference is the dense ivory, matte-black, and gold application dashboard with:

- persistent left navigation rail
- top product navigation and search
- BUILD / VERIFY / DEPLOY hero
- Afrofuturist African profile illustration
- Live Lab terminal
- System Health metrics
- Recent Activity
- Quick Start workflow stack
- package category row
- featured workflow panel
- ecosystem flow
- community and contributor panels
- dark branded footer

Do not reinterpret this as a generic landing page. Preserve the application-platform density and strict grid.

## Current Build State

### Live branch

`main`

### Primary homepage

`index.html`

### Current visual assets

- `assets/hero-queen.svg`
- `assets/v2-polish.css`

### Current homepage implementation commit

`6616d88064887b308550712cf34b63814b0051fa`

### Current polish layer commit

`0f6adf6ebcfe3f380c204a94f19b7b0abf5224f2`

### Current hero asset commit

`8777e2fdd1aa3021dd460ad8bfad592fe73ea075`

## Build Priorities

1. Wire `assets/v2-polish.css` into `index.html`.
2. Replace the inline hero SVG with `assets/hero-queen.svg`.
3. Replace every emoji and placeholder glyph with a consistent SVG icon.
4. Build a real Workflowware logo asset and use it in the rail, header, favicon, and footer.
5. Tighten the desktop grid to match the approved reference.
6. Align the hero, Live Lab, System Health, Recent Activity, Quick Start, and Featured Workflow panels.
7. Replace CSS-only workflow stack placeholders with a polished reusable SVG asset.
8. Audit responsive behavior after desktop alignment is stable.
9. Rebuild Library and Launch Lab using the same design system only after the homepage is visually approved.

## Non-Negotiable Design Rules

- Use ivory, matte black, deep navy, and restrained gold.
- Use an 8px spacing system.
- Keep borders thin and quiet.
- Avoid oversized empty sections.
- Avoid generic SaaS gradients and glassmorphism.
- Avoid emoji icons.
- Avoid fake inventory or unsupported product claims.
- Keep the interface dense but readable.
- Every panel must align to the same grid.
- Every visual asset must support the product story.
- Preserve Ma'at as a governance foundation, not decorative branding.

## Agent Work Protocol

Before changing code:

1. Read this file.
2. Read `docs/BUILD_ROADMAP.md`.
3. Inspect the current `index.html` and existing assets.
4. Compare the intended change against the locked homepage reference.
5. Make one coherent change per commit.

After changing code:

1. Update `docs/BUILD_STATUS.md`.
2. Record files changed and the commit SHA.
3. State what is visibly different.
4. State what remains unfinished.
5. Do not mark a phase complete without visual confirmation.

## Safe Division of Agent Labor

Agents may work in parallel only when files do not overlap.

Suggested ownership:

- Visual system agent: logo, icons, SVG assets, colors, typography.
- Layout agent: homepage grid, spacing, responsive behavior.
- Content agent: package descriptions, labels, honest metrics and claims.
- QA agent: visual comparison, broken links, accessibility, mobile checks.
- Documentation agent: roadmap, status, decisions, handoff notes.

Do not let two agents rewrite `index.html` simultaneously.

## Definition of Done for Homepage v2

The homepage is complete only when:

- the page visibly matches the approved reference structure
- the major panels occupy the correct relative positions
- placeholder emoji and glyphs are gone
- the hero illustration and logo are production assets
- desktop layout is controlled at common widths
- mobile layout remains usable
- links work
- no fake functionality is presented as live
- the build status document records the final commit

## Truth Rule

Never describe a rough prototype as a finished design. Label incomplete work honestly.
