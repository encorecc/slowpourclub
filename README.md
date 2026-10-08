# Slow Pour Club

The website for Slow Pour Club, a Japanese-inspired home café in Alexandra, Singapore. It is a static site: plain HTML, CSS and JS, with no build step.

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000.

## Customize
- **Text, menu & prices** – `index.html`
- **Colors & fonts** – CSS variables at the top of `styles.css`
- **Logo** – `assets/logo-badge.png` (main badge), `assets/logo-badge-cream.png` (for dark backgrounds) and `assets/logo-mark.png` (simplified mark, also the favicon), all on transparent backgrounds
- **Opening hours** – update both the `HOURS` object in `script.js` (drives the "Open now" badge, always in Singapore time; `null` = closed) and the hours table in `index.html`
- **Photos** – the `.photo` blocks are gradient placeholders; drop an `<img>` inside each (or set a `background-image`)
- **Map** – replace the Google Maps embed `src` in the Visit section with your address
- **Social links** – Instagram/TikTok handles (`@slowpourclub`) appear in several places in `index.html`

## Deploy
Works out of the box on GitHub Pages, Netlify or Vercel. Just point them at the repo root.
