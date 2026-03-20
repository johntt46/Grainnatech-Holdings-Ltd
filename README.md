# Grainnatech Holdings Ltd — Website (canonical)

**Design source:** `grainnatech_v3` — the single-page site from `Downloads\grainnatech_v3.html`, synced into this folder.

**Branding pack:** logos from **`Granatech Logos New Desings 2026.zip`** (on `D:\`), extracted under `assets/logos-2026/`. Nav and hero use `assets/logos-2026/canonical/nav.png` and `hero.png`. See `assets/logos-2026/README.md`.

## Files

| File | Purpose |
|------|---------|
| `index.html` | **Primary entry** — same content as `grainnatech_v3.html` |
| `grainnatech_v3.html` | Copy kept for name parity / bookmarks |
| `styles.css`, `script.js` | Legacy split layout; **v3 is self-contained** (inline CSS + JS). These may be unused until a future refactor. |
| `_tools/sync_grainnatech_v3.py` | Re-copy from `%USERPROFILE%\Downloads\grainnatech_v3.html`, replace first two embedded webp blobs with canonical PNGs, refresh both HTML files |

Re-sync from Downloads (default path):

```powershell
Set-Location "d:\Grainnatech Holdings Ltd Full Build Offline 2026\03_Infrastructure_Build_Code\website"
python .\_tools\sync_grainnatech_v3.py
```

Custom source file:

```powershell
python .\_tools\sync_grainnatech_v3.py "C:\path\to\grainnatech_v3.html"
```

## Build

No build step — static HTML. Serve the **folder** so `assets/` resolves (e.g. open `index.html` via a local server, not `file://` if you need to verify paths).

## Deploy

- **GitHub Pages / static host:** Publish the **whole** folder **`03_Infrastructure_Build_Code\website\`** (not only `index.html`): include **`assets\`**, **`CNAME`** (`grainnatechholdingsltd.eu`), and both HTML files. See [DEPLOYMENT_DETAILED_STEP_BY_STEP.md](../_MANIFEST/DEPLOYMENT_DETAILED_STEP_BY_STEP.md) Part 2.
- **After push:** GitHub → Settings → Pages → wait for **DNS check** → enable **Enforce HTTPS**.
- **Dependencies:** Google Fonts are loaded from `fonts.googleapis.com` (requires network unless you self-host fonts later).

## API status

If a section calls a live API, default production base is typically `https://api.grainnatechholdingsltd.eu`. For local app testing, point to `http://127.0.0.1:3000` (or your port) in the inline script if present.
