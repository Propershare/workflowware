# Workflowware Build Status

**Updated:** 2026-07-31  
**Branch:** `platform/restore-classic-and-toolkit`  
**Coordinator:** `cursor_staydangerous_data_drive`

## Verdict

**Pivot.** Public site is the **classic lime Workflowware** marketing site again. Dense ivory/navy dashboard art is parked for **Tehuti Lab Control Center**. Platform features build via `assets/workflowware-ui.css` + `app.html`.

## Surfaces

| Surface | Role |
|---------|------|
| `index.html` (+ library/pilot/docs/spec) | Classic public marketing site |
| `app.html` | Lab workspace (spine, terminal, health, activity, quick actions) |
| `app-library.html` | Package library cards + category rail |
| `app-marketplace.html` | Marketplace list rows |
| `app-builder.html` | Node canvas builder stub |
| `assets/platform-classic.css` | Classic lime/navy platform shell |
| Contact sheet ref | `visuals/assets-inbox/reference-platform-contact-sheet.png` |
| TCC handoff (ivory/gold dashboard art) | `tehuti-control-center/docs/workflowware-dashboard-handoff/` |

## Done this turn

- Classic site restored
- Platform panels built in **classic colors** from contact sheet layout
- Honest metrics (unproven / no invented success %)

## Access (Maat)

| Layer | Truth |
|-------|--------|
| Open | Spec, docs, pilot, Lab preview — no fee |
| Governed | Library + Builder + Marketplace + full Lab — scoped install via hello@ |
| Local override | Lab hostname only — development, not a SKU |

Public page: `pricing.html` (Access). Gate: `assets/ww-entitlements.js`.

## Next

1. Local `workflowware-ctl` status JSON into Lab terminal/health  
2. Builder drag/connect  
3. Wire marketplace only to real packages  

## Preview

- Classic: `http://127.0.0.1:8097/`  
- Lab: `http://127.0.0.1:8097/app.html`  
- Library: `http://127.0.0.1:8097/app-library.html`  
- Market: `http://127.0.0.1:8097/app-marketplace.html`  
- Builder: `http://127.0.0.1:8097/app-builder.html`  

