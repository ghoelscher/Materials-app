# Materials Structure Explorer

A browser-based learning tool for intro materials physics. Explore crystal structures, unit cells, coordination environments, and diffraction fingerprints for a curated set of materials.

## How to run locally
1. Open a terminal in this folder.
2. Start a simple web server:

```bash
python3 -m http.server 8000
```

3. Open your browser at `http://localhost:8000`.

## How to use the app
- Pick a material from the dropdown.
- Switch between **Overview**, **Structure View**, **Coordination**, and **Diffraction** tabs.
- Adjust the **View plane** to change the projection of the unit cell.
- Use the **Neighbor cutoff** slider to study coordination changes.

## Add your own material
Open `data.js` and add a new entry to the `materials` array. Each entry needs:
- `id`, `name`, `formula`, `description`
- `crystalSystem` and `latticeParameters`
- `properties` and `basis` atoms (fractional coordinates)
- `peaks` for the simulated diffraction chart

## Deploying on GitHub Pages
1. Push this repo to GitHub.
2. In your repo settings, go to **Pages**.
3. Choose the branch (usually `main`) and the `/root` folder.
4. Save; GitHub will provide a public URL.

### Troubleshooting “Not Found” on GitHub Pages
- **Pages not enabled yet:** After saving, wait a minute and refresh the URL. The first build can take time.
- **Wrong branch or folder:** Ensure the branch contains `index.html` at the repo root and that Pages is set to `/root`.
- **Case-sensitive paths:** GitHub Pages is case-sensitive; make sure the URL uses the exact repo name and casing.
- **Private repo without Pages access:** Free accounts require public repos for Pages unless you have a paid plan.

---
Made for classroom use. Customize and expand as needed.
