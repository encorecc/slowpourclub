# Slow Pour Club

The website for Slow Pour Club, a neighborhood specialty coffee shop. It is a static site: plain HTML, CSS and JS, with no build step.

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000.

## Customize
- **Text, menu & prices** – `index.html`
- **Colors & fonts** – CSS variables at the top of `styles.css`
- **Opening hours** – update both the `HOURS` object in `script.js` (drives the "Open now" badge) and the hours table in `index.html`
- **Photos** – the `.photo` blocks are gradient placeholders; drop an `<img>` inside each (or set a `background-image`)
- **Map** – replace the Google Maps embed `src` in the Visit section with your address
- **Newsletter** – the form is front-end only; connect it to your email provider (Mailchimp, Buttondown, etc.)

## Deploy
Works out of the box on GitHub Pages, Netlify or Vercel. Just point them at the repo root.
