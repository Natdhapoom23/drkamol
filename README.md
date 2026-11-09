# drkamol.com

Portfolio website of **Dr. Kamol Pansritum** — English at `/`, Thai at `/th`, with a CMS at `/admin`.

- **Front end:** Next.js 16 (static pages, refreshed automatically when content changes), GSAP + Lenis scroll motion, YouTube "click to play" embeds.
- **CMS:** Payload 3 (runs inside the same Next.js app). Every text field has English and Thai versions.
- **Database:** PostgreSQL (Neon on Vercel). **Images:** Vercel Blob.

## Content model (in `/admin`)

| Section | What it holds |
|---|---|
| Dr. Kamol profile | Hero text, biography, "in his words", figures, education, career, memberships |
| Portfolio | Photo stories (patient journeys, conferences, press). Patient items can't be published until consent is ticked |
| Videos | YouTube links — paste the URL, the thumbnail comes automatically |
| Publications / Lectures / Awards | Academic record shown on `/academic` and in the archive |
| Media library | Uploaded images (converted to WebP, resized automatically) |
| Site settings | Contact email, phone, address, booking link, SEO title/description |

Figures under *Profile → Figures* only appear on the site once **Confirmed** is ticked.

## Deploying on Vercel

1. Import this repository as a new Vercel project (framework: Next.js).
2. **Storage → Create Database → Neon (Postgres)** and connect it to the project (sets `DATABASE_URL`).
3. **Storage → Create → Blob** and connect it (sets `BLOB_READ_WRITE_TOKEN`).
4. **Settings → Environment Variables:** add `PAYLOAD_SECRET` (a long random string) and `NEXT_PUBLIC_SERVER_URL` (e.g. `https://drkamol.com`).
5. Deploy. The build runs the database migrations, which also load the starting content.
6. Open `/admin` and create the first user — it becomes the administrator.

## Local development

```bash
cp .env.example .env        # fill in DATABASE_URI and PAYLOAD_SECRET
npm install
npm run payload migrate     # create tables + starting content
npm run dev                 # http://localhost:3000, CMS at /admin
```

Changing a collection's fields? Run `npm run migrate:create <name>` and commit the new file in `src/migrations`.
