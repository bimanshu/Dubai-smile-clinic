# Dubai Smile Dental Clinic

A redesign of [dubaismile.com](https://dubaismile.com/) as a fast, bilingual static site: English at `/`, Arabic (full right-to-left) at `/ar/`.

## Run it

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve the production build
npm run check     # type-check
```

`dist/` is plain HTML, CSS, JS and images, so it deploys to any static host (Netlify, Vercel, Cloudflare Pages, S3, the existing server).

## Demo mode (on by default)

While the site is being reviewed, demo mode is on (`src/lib/config.ts`):

- a slim "Design preview. Not the live Dubai Smile website." strip sits above the nav, in both languages
- search engines are kept out (`noindex` meta tag and a `Disallow: /` robots.txt), so a preview never competes with dubaismile.com
- the booking form never sends anything; on submit it says so and offers tap-to-call for the chosen clinic

For launch, set `PUBLIC_DEMO=false` and `PUBLIC_BOOKING_ENDPOINT` (see `.env.example`).

## Offline preview files

```bash
npm run preview:file
```

This writes `preview/dubai-smile-preview-en.html` and `preview/dubai-smile-preview-ar.html` (about 2.5 MB each). Each is fully self-contained, with images, fonts and script inlined. Double-click to open it in any modern browser; no server or internet needed. The language switch jumps between the two files.

## Booking form

With demo mode off, the form POSTs JSON to `PUBLIC_BOOKING_ENDPOINT`. Any form backend or CRM webhook that accepts JSON works (Formspree, Basin, Zapier, HubSpot, etc.). If no endpoint is set, the form still validates and tells the patient to call the clinic they picked, with a tap-to-call link.

Payload: `name, phone, clinic, treatment, preferredTime, message, language, page`.

## What's on the page

Hero with a draggable before/after, key numbers, a treatment explorer (9 treatments plus 4 more), a second before/after, the founder's note, why patients choose Dubai Smile, the dentists carousel, reviews, the four clinics with live "open now" status in Dubai time, FAQ, booking, and a mobile Call / Book bar.

## Stack and structure

- Astro 7, static output, no client framework. One script (about 4 KB gzipped) handles every interaction.
- Tailwind CSS v4 with semantic OKLCH tokens in `src/styles/global.css` (light and dark).
- Self-hosted Geist (Latin) and IBM Plex Sans Arabic (Arabic).
- Phosphor icons inlined at build time.
- Images in `src/assets`, served as AVIF/WebP at multiple sizes.

```
src/
  i18n/ui.ts        every interface string, EN + AR
  data/site.ts      treatments, dentists, clinics + hours, reviews, FAQ, socials
  components/       one file per section
  scripts/site.ts   reveal, menu, before/after, tabs, carousel, clinic status, form, mobile bar
  styles/global.css tokens, type scale, radius rule, motion
```

To edit content, change `src/i18n/ui.ts` and `src/data/site.ts`. Every string has an `en` and an `ar` value.

## Design system

- **Color.** One accent: the blue from the Dubai Smile logo (`#019cd6`, hue 234). Neutrals are a cool porcelain ramp ending in the brand navy. Every text pair is measured against WCAG AA in both themes.
- **Type.** A semantic scale (`text-display`, `text-title`, `text-heading` and so on). Arabic gets no letter-spacing and taller line heights.
- **Shape.** Buttons, chips and tabs are full pills. Media and cards use a double bezel: a 28px shell around a 22px core.
- **Motion.** Purposeful only: a hero load-in, one-time scroll reveals, a one-time "peek" that shows the before/after is draggable, the sliding tab indicator, button press feedback, and the menu and sheet transitions. Everything respects `prefers-reduced-motion`.

## Quality checks (Lighthouse, mobile)

| Page | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| English | 99 | 100 | 100 | 100 |
| Arabic | 98 | 100 | 100 | 100 |

CLS is 0 and total blocking time is 0 ms. There is no horizontal overflow at 390px or 1440px. Keyboard, menu, sheet, tabs, form and slider flows were tested in Chromium.

## Please confirm before launch

- **Logo:** the wordmark is a vector redraw, because the site only has a 112px PNG. Send the official SVG and it drops into `src/components/Logo.astro`.
- **Arabic copy:** a native speaker should review it. These Arabic name spellings in particular: Yoge Shan, Manal Chbael, Khalil Al Rouh, Tamara Nemar, Ahmed Al Shagran (flagged `verify` in `src/data/site.ts`).
- **Saturday hours:** the old site only lists Sunday to Thursday and Friday, so every clinic is shown closed on Saturday.
- **FAQ:** the "24/7" and "guaranteed results" claims conflicted with the listed hours or were risky, so they were softened or removed.
- **Inner pages:** the service and branch pages on the live site currently return 404. This page keeps all treatment and clinic details on-site, so nothing links to them.
