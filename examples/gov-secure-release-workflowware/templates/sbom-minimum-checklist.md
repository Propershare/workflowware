# SBOM minimum checklist

Use against CycloneDX or SPDX. Mark each row `present` / `missing` / `unknown`.

| Field | Why |
|-------|-----|
| Document / bom format + version | Parseability |
| Product / root component name | Release identity |
| Version or commit | Reproducibility |
| Supplier / publisher | Attribution |
| Unique identifiers (PURL / CPE when available) | Matching advisories |
| Component list with versions | Inventory |
| Dependency relationships (if claimed) | Transitives |
| Timestamp / serialNumber | Freshness |
| Author / tool that generated SBOM | Provenance of the SBOM itself |

## SaaS note

If the buyer asks for a **runtime production** SBOM, say whether this file is build-time, image-time, or runtime. Do not silently substitute.
