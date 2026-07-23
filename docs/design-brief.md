# Workflowware.org Design Brief

## Design goal

Make `workflowware.org` feel like the public home of a new software category, not a generic AI landing page.

The page should communicate three things in the first 10 seconds:

1. **Definition:** Workflowware is software packaged as agent-operable workflows.
2. **Credibility:** This is an artifact/spec layer, not hype.
3. **Action:** Read the spec, view examples, follow the repo, or contact BlackLabRats.

## Brand feel

- Serious, technical, category-defining.
- More “open spec / protocol / manifesto” than “SaaS startup sales page.”
- BlackLabRats edge, but not too dark/hacker to scare business buyers.
- Avoid generic purple AI gradients and fluffy robot imagery.

## Visual direction

### Palette

Use a dark technical base with one vivid signal color.

- Background: near-black / blue-black.
- Surface: dark graphite cards.
- Text: white/off-white.
- Muted text: blue-gray.
- Accent 1: electric green for category/flag language.
- Accent 2: cyan for links, diagrams, and technical highlights.

### Typography

- Large editorial hero headline.
- Short sentence blocks.
- Spec/code blocks for package structure.
- Clear hierarchy: H1 definition, H2 sections, H3 cards.

### Layout

Recommended homepage flow:

1. Nav: Workflowware.org / What / Spec / Examples / Origin / GitHub.
2. Hero: definition + one punchline.
3. “What changed?” section: apps → prompts → templates → workflowware.
4. “What is inside a package?” visual stack.
5. Spec preview with package tree.
6. Examples catalog.
7. Origin note / BlackLabRats maintenance.
8. Call to action: GitHub repo + manifesto + contact.

## Hero copy

Headline:

> Workflowware is software packaged as agent-operable workflows.

Subheadline:

> Portable workflow packages with instructions, tools, evals, approval rules, memory pointers, and human-facing documentation so agents can install, operate, evaluate, and improve real work.

Punchline:

> Prompts are ingredients. Agents are workers. Workflowware is the operating package.

## Key sections

### 1. The shift

Show a four-step progression:

| Era | Unit | Problem |
|---|---|---|
| Apps | dashboard/tool | humans still operate the workflow |
| Prompts | instruction snippets | too thin to be reliable software |
| Templates | automations | brittle and platform-bound |
| Workflowware | governed workflow package | agents + humans can operate the job |

### 2. Package anatomy

Use a layered diagram:

- Human trust surface
- Workflow spec
- Agent spec
- Governance and approvals
- Evals
- Install guide
- Templates/scripts
- Manifest + memory handoff

### 3. Minimum package tree

```text
workflowware-package/
  README.md
  index.html
  workflow-spec.md
  agent-spec.md
  install-guide.md
  approval-rules.md
  eval-template.csv
  agent-handoff.md
  artifact-manifest.json
```

### 4. Examples

Feature cards:

- Home Services Missed Lead Recovery Kit
- BlackLabRats AI Service Installer System
- Workflowware Prior-Art and Naming Dossier

### 5. Origin / maintenance

Use careful wording:

> Workflowware.org is maintained by BlackLabRats as a public category/spec home for Workflowware and Agentic Workflow Distribution.

Avoid legal overclaiming:

> We do not claim to have invented agents, prompts, skills, automation templates, or SaaS. The claim is narrower: the missing layer is the governed, agent-operable workflow artifact that packages the job itself.

## Calls to action

Primary:

- Read the v0.1 spec
- View examples
- Follow the GitHub repo: `propershare/workflowware`

Secondary:

- Build a Workflowware package
- Contact BlackLabRats
- Read the manifesto

## Design notes for v1

The current `index.html` is a solid draft, but v1 should improve:

1. Add the “shift” diagram: apps → prompts → templates → workflowware.
2. Add GitHub CTA for `propershare/workflowware` once repo exists.
3. Add more white space in long sections.
4. Add a simple visual package-stack diagram.
5. Add footer links to spec, examples, manifesto, origin, GitHub.
6. Add Open Graph metadata for sharing.
7. Add `CNAME` file when publishing via GitHub Pages.

## Accessibility / production checklist

- Use semantic headings in order.
- Keep text contrast WCAG AA.
- Make nav links keyboard-accessible.
- Test at 320px, 768px, 1024px, and 1440px.
- Avoid relying on color alone.
- Keep the page lightweight and static.
