# Ilmora — Islamic Companion

## Files
- `index.html` — page markup (HTML only, links to the files below)
- `style.css` — all CSS styling
- `config.js` — Firebase project config (public web API key, safe to expose — security comes from Firestore Rules, not from hiding this)
- `firebase-init.js` — Firebase initialization + helper functions (users, assignments, orders, para status)
- `app.js` — main app logic (screens, Quran reader, prayer times, dua, tasbeeh, etc.)

## Host on GitHub Pages
1. Create a new GitHub repo (or use an existing one).
2. Upload **all 5 files** (index.html, style.css, config.js, firebase-init.js, app.js) to the **repo root** — keep them in the same folder, don't put them in subfolders.
3. Commit the changes (Add file → Upload files → scroll down → Commit changes → commit directly to `main`).
4. Go to **Settings → Pages** → under "Build and deployment", set Source = "Deploy from a branch", Branch = `main`, folder = `/ (root)`. Save.
5. Wait 1–2 minutes, then check the **Actions** tab for a green checkmark.
6. Your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`

## Note on Firebase security
The `apiKey` in `config.js` is a **public** identifier for the Firebase project (not a secret). Anyone who wants their data protected should make sure proper **Firestore Security Rules** are set in the Firebase console — the API key alone does not restrict access.
