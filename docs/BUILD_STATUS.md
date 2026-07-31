# Workflowware Build Status

**Updated:** 2026-07-31  
**Branch:** `platform/restore-classic-and-toolkit`  
**Coordinator:** `cursor_staydangerous_data_drive`

## Verdict

**Pivot.** Public site is the **classic lime Workflowware** marketing site again. Dense ivory/navy dashboard art is parked for **Tehuti Lab Control Center**. Platform features build via `assets/workflowware-ui.css` + `app.html`.

## Surfaces

| Surface | Role |
|---------|------|
| `index.html` (+ library/pilot/docs/spec) | Classic public site (restored from `de4ad65`) |
| `app.html` | Platform shell using UI toolkit — new features land here |
| `assets/workflowware-ui.css` + `icons.svg` | Application shell toolkit |
| TCC handoff | `/mnt/data_drive/tehuti-control-center/docs/workflowware-dashboard-handoff/` |

## Done this turn

- Restored classic homepage + library
- Parked dashboard refs/cutouts for TCC
- Added first toolkit page: `app.html`

## Next platform features (on toolkit)

1. Local install status JSON endpoint → `app.html` panel  
2. Package cards fed from real registry (not invented counts)  
3. Pilot launch from shell with honest capability states  

## Preview

- Classic site: `http://127.0.0.1:8097/`  
- Platform shell: `http://127.0.0.1:8097/app.html`  
