# Axolotl — Tamari Mikava, psychotherapist

Personal website with an integrated blog. Next.js 15 (App Router), React 19,
Tailwind CSS 3, no database. Full background and every decision behind this
build live in the project brief the client and developer keep — this README
covers only what's needed to run and deploy it.

## Stack

Next.js 15 · React 19 · JavaScript (no TypeScript) · Tailwind CSS 3 +
`@tailwindcss/typography` · Lucide React · Framer Motion · MDX blog files in
the repo (no CMS) · Telegram Bot API for the contact form · Vercel hosting.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the four variables, see below
npm run dev
```

Open `http://localhost:3000` — it redirects to `/ru`. Check both `/ru` and
`/en`.

## Environment variables

See `.env.example` for the full list with instructions:

- `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` — booking-form enquiries are
  delivered to a private Telegram chat, never stored in a database.
- `NEXT_PUBLIC_WHATSAPP_PHONE` — international format, digits only.
- `NEXT_PUBLIC_SITE_URL` — used for canonical links, the sitemap and Open
  Graph metadata.

**The Telegram bot token must never appear in the repository, in chat, or
anywhere outside the Vercel environment-variable interface.**

## Project structure

```
app/
  layout.jsx                 fonts, global styles
  globals.css                the palette — every colour in the project
  sitemap.js                 both locales, all posts
  [locale]/
    layout.jsx                header, footer, booking modal, metadata
    page.jsx                  home page — composes the sections in order
    not-found.jsx             404 page
    blog/page.jsx              post list with tag filter
    blog/[slug]/page.jsx        post page, MDX rendering
  api/contact/route.js        validation, anti-spam, Telegram delivery
src/
  components/                 one file per section, plus shared primitives
  i18n/ru.js, en.js           ALL SITE COPY — no strings hardcoded in components
  lib/                        posts.js, rate-limit.js, utils.js
content/blog/ru/*.mdx
content/blog/en/*.mdx
public/images/               portrait, certificates (see README.md there)
```

Two rules keep this maintainable by a non-developer:

1. Colours change only in `app/globals.css`.
2. Copy changes only in `src/i18n/ru.js` and `src/i18n/en.js`.

Components are touched only when structure changes.

## What's still a placeholder

Search the codebase for `[PLACEHOLDER]` — currently the About section's
first paragraph (professional path, years in practice) and the FAQ's
time-zone/response-window line. These are facts only Tamari can confirm;
everything else is a working draft, ready to launch and refine live. See
`public/images/README.md` for the image assets still needed (portrait,
certificates, favicon, OG image) — none of them block a deploy.

## Deploying

1. `npm install && npm run dev` locally, check both locales.
2. Push to a **private** GitHub repository.
3. Import into Vercel via GitHub; Next.js is auto-detected.
4. Add the four environment variables in Vercel, then redeploy (they're
   read at build time).
5. Check the live `.vercel.app` URL on a real phone.
6. Once the content is real (not before — see `public/robots.txt`), buy
   the domain and connect it in Vercel → Settings → Domains.
7. Enable 2FA on GitHub, Vercel and the domain registrar.

After that: edit → `git commit` → `git push` → Vercel rebuilds
automatically. A push to a non-`main` branch gets its own preview URL —
the right way to try an alternate headline or palette before committing.

`public/robots.txt` currently disallows all crawling — this is intentional
during the draft phase, so search engines don't index placeholder text.
Flip it to `Allow: /` at launch.
