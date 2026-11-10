# Ozark Junk Removals — Website

Lead-generation website for **Ozark Junk Removals**, a junk removal & hauling company serving Springfield, MO and Southwest Missouri.

- **Stack:** Astro 7 (static output) · TypeScript · Tailwind CSS v4 · Netlify Forms · Netlify hosting
- **JavaScript shipped:** only small vanilla scripts (menu, form steps/uploader, reveal-on-scroll, before/after slider). No framework runtime.
- **Pages:** 43 static pages (8 services, 25 service-area town pages — the largest towns within 60 miles of Springfield, garage-sale landing page, quote, about, service areas hub, resources, privacy, thank-you, 404)

> **Not deployed yet.** Nothing has been published to Netlify. See [Deploying](#deploying-to-netlify).

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build → dist/
npm run validate   # link/SEO/schema checks against dist/ (run after build)
npm run check      # TypeScript + Astro diagnostics
npm run preview    # serve dist/ locally
```

Node 22.23.4+ is required (Astro 7); `.nvmrc` and Netlify pin Node 24.

---

## Where to change things

| What | File |
| --- | --- |
| Business name, phone, email, address, hours, social links | `src/config/site.ts` + env vars `PUBLIC_PHONE`, `PUBLIC_EMAIL` |
| Garage-sale offer wording & terms (`ask` ↔ `confirmed`) | `src/config/offer.ts` |
| Tracking IDs (GA4, GTM, Google Ads, Meta, call tracking) | env vars — see `.env.example` |
| Service page content (8 services) | `src/data/services.ts` |
| Core city pages (8 hand-written) + region copy | `src/data/cities.ts` |
| Extended towns (17 more, largest within 60 miles) | `src/data/areas.ts` |
| Homepage FAQ | `src/data/faqs.ts` |
| Before/after projects | `src/data/projects.ts` + photos in `src/assets/projects/` |
| Customer reviews (component hidden until populated) | `src/data/reviews.ts` |
| Hero photo (replaces the illustration automatically) | drop `src/assets/photos/hero.jpg` |
| Articles | `src/content/resources/*.md` (template: `docs/ARTICLE-TEMPLATE.md`) |
| Colors, fonts, buttons, cards | `src/styles/global.css` (`@theme` tokens) |
| Redirects & headers | `netlify.toml` |

**Rule of thumb:** anything left `null`/empty is simply not rendered — no phone button, no address, no hours, no review section, no schema field. Never fill these with placeholder values.

### Phone number / click-to-call
Set `PUBLIC_PHONE` (e.g. `(417) 555-0123` — use the real number) in Netlify env vars and redeploy. Click-to-call buttons then appear in the header, hero, mobile sticky bar, CTA bands, footer and thank-you page, and `telephone` is added to the LocalBusiness schema.

### Garage-sale offer
`src/config/offer.ts` → `mode: 'ask'` (default) shows *"Ask About Free Pickup of Qualifying Garage Sale Leftovers"* with non-committal terms. Switch to `mode: 'confirmed'` only after the owner approves eligibility, service area, item exclusions, scheduling and capacity **and** replaces the bracketed placeholder terms. That switches the headline to *"FREE PICKUP WITHIN 24 HOURS"* everywhere.

Short URLs for yard signs (configured in `netlify.toml`): `/sign` and `/yard-sign` → garage-sale page with UTM tags (`utm_source=yard_sign`), so sign traffic shows up in analytics and on each form submission.

---

## Lead forms

Two Netlify Forms, both detected from the static HTML at build time:

| Form name | Where | Notes |
| --- | --- | --- |
| `quote` | `/get-a-quote/`, every service page, every city page | 3 steps, load-size picker, up to 3 photos |
| `garage-sale-pickup` | `/garage-sale-junk-pickup/` | 2 steps, sale end date, item types, up to 3 photos |

How it works:
- **With JS:** multi-step UI, inline accessible validation, photos downscaled in the browser (max 1800px JPEG) to stay under Netlify's ~8 MB per-submission limit, `fetch` POST (multipart) → redirect to `/thank-you/?form=…`.
- **Without JS:** one long form that POSTs natively to `/thank-you/` — still works.
- **Spam:** Netlify honeypot (`company_website` field) + Netlify's built-in spam filtering. Optionally enable reCAPTCHA in Netlify if spam becomes a problem.
- **Attribution:** hidden fields capture page URL and first-touch `utm_source/medium/campaign`, `gclid`, `fbclid`.
- **Tracking events** (pushed to `dataLayer`; forwarded to GA4/Ads/Meta when configured): `form_start`, `form_step`, `generate_lead`, `lead_thank_you_view`, `cta_click`, `call_click`.

**After the first deploy:** in Netlify → *Forms*, confirm both forms are detected, then set up email notifications (Forms → Form notifications) to the owner's inbox/phone.

---

## Tracking & consent
All tracking is off by default. Setting any `PUBLIC_*` tracking ID turns on a small consent banner; scripts load **only after the visitor accepts**, with Google Consent Mode v2 defaulting to denied. Recommended setup: use **GTM** (`PUBLIC_GTM_ID`) and fire the GA4 / Ads / Meta tags from the `generate_lead` dataLayer event, or set the individual IDs directly.

---

## SEO architecture
- Per-page `<title>`, meta description, canonical, Open Graph and Twitter cards (`src/layouts/BaseLayout.astro`).
- JSON-LD graph on every page: `LocalBusiness` (service-area business — no address/hours/ratings until verified), `WebSite`, `BreadcrumbList`, plus `Service` and `FAQPage` where relevant (`src/lib/schema.ts`).
- `sitemap-index.xml` (excludes thank-you/404), `robots.txt` generated from `SITE_URL`.
- URL structure: `/services/<service>/`, `/junk-removal-<city>-mo/`, `/garage-sale-junk-pickup/`, `/resources/<article>/`.
- Internal linking: services ↔ cities ↔ garage-sale page ↔ quote page, plus breadcrumbs.

Set **`SITE_URL`** to the production domain in Netlify before launch — canonicals, sitemap, robots and OG URLs are all derived from it (falls back to Netlify's deploy URL).

---

## Deploying to Netlify
1. Push this repo to GitHub (`thefarmmedia/OzarkJunkRemovals`).
2. Netlify → *Add new site → Import from Git* → pick the repo. Build settings come from `netlify.toml` (`npm run build`, publish `dist`, Node 24).
3. Set environment variables (*Site configuration → Environment variables*): at minimum `SITE_URL`, then `PUBLIC_PHONE`, `PUBLIC_EMAIL` and tracking IDs as available.
4. Deploy → check *Forms* shows `quote` and `garage-sale-pickup` → enable notifications.
5. Submit a real test lead with a photo on the live URL and confirm it arrives with the attachment.
6. Add the custom domain + HTTPS, update `SITE_URL`, redeploy.
7. Submit `https://<domain>/sitemap-index.xml` in Google Search Console.

See **[docs/LAUNCH-CHECKLIST.md](docs/LAUNCH-CHECKLIST.md)** for everything needed before launch and **[docs/TESTING.md](docs/TESTING.md)** for the QA performed and how to re-run it.

## Project structure
```
src/
  config/      site.ts · offer.ts · tracking.ts
  data/        services · cities · faqs · projects · reviews · resources
  components/
    layout/    Header · Footer · MobileCtaBar
    sections/  HomeHero · HeroVisual · PageHero · TrustStrip · HowItWorks ·
               BeforeAfterGallery · GarageSalePromo · ServiceAreaMap
    forms/     QuoteForm · GarageSaleForm · LoadSizeSelector · PhotoUploader
    ui/        Icon · Breadcrumbs · SectionHeading · ServiceCard · FaqAccordion ·
               CtaBand · Testimonials
    seo/       Tracking · ConsentBanner
  layouts/     BaseLayout.astro
  lib/         schema.ts (JSON-LD builders)
  scripts/     lead-form.ts · reveal.ts
  pages/       routes (see above)
scripts/validate-site.mjs   post-build QA
docs/                       launch checklist, testing log, competitive notes
```
