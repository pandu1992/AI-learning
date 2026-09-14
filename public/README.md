# Static assets (`public/`)

Files here are served at the site root. On GitHub Pages the app is under a
basePath (`/AI-learning`), so a file `public/pandu.png` is available at
`/AI-learning/pandu.png` and referenced in code via
`` `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/pandu.png` ``.

## Instructor photo — `pandu.png`

The profile page (`/profile`) shows the instructor's photo from **`public/pandu.png`**.

To add it:
1. Save the photo as `pandu.png` (PNG, ideally square, e.g. 512×512 or larger).
2. Place it in this `public/` folder (commit it to the repo, or upload via
   GitHub → *Add file → Upload files* into `public/`).
3. That's it — the profile page picks it up automatically after the next deploy.

Until the file exists, the page gracefully shows the instructor's initials
("PP") instead, so nothing looks broken.
