# Launch checklist — information & decisions needed

Nothing below has been invented on the site. Each item is either hidden until provided or marked as a placeholder.

## 1. Business details (owner to supply)
- [ ] **Phone number** → `PUBLIC_PHONE` (enables click-to-call everywhere + schema `telephone`)
- [ ] **Public email** → `PUBLIC_EMAIL`
- [ ] **Business address** — only if it should be public. Otherwise stay a service-area business (recommended for a home-based operation). `src/config/site.ts → address`
- [ ] **Hours** → `src/config/site.ts → openingHours` (e.g. `['Mo-Sa 07:00-19:00']`)
- [ ] **Production domain** → `SITE_URL`
- [ ] **Social profiles** (Facebook, Google Business Profile URL) → `src/config/site.ts → social`
- [ ] **Google Business Profile** — create/verify it; use the same name, phone and service areas as the site (NAP consistency)

## 2. Claims to confirm or keep off the site
- [ ] Insurance / licensing — **not mentioned anywhere**. If insured, add it to the trust strip and FAQ.
- [ ] Years in business / company history — **not mentioned**. The About page describes how the company works, not how long.
- [ ] Donation / recycling partners — copy says usable items "may" be donated "where practical and accepted". Name partners only once confirmed.
- [ ] Same-day / next-day service — copy says "sometimes, depending on schedule". Confirm before strengthening.
- [ ] Items the crew will / won't take (tires, hot tubs, pianos, concrete, shingles, mattresses) — review `src/data/services.ts` item lists and `notAccepted`.
- [ ] Shed teardown / light demolition — copy says "after an assessment". Confirm it's offered.
- [ ] Hoarding / biohazard — copy says assessment required and specialists may be needed. Keep this unless qualifications are confirmed.

## 3. Garage-sale program (`src/config/offer.ts`)
Currently `mode: 'ask'` — no guarantee is published. Before switching to `confirmed` ("FREE PICKUP WITHIN 24 HOURS"):
- [ ] Eligibility (which items qualify)
- [ ] Geographic limits (cities / ZIPs)
- [ ] Item exclusions
- [ ] Volume cap (e.g. one pickup-bed load)
- [ ] How far in advance to request; how the 24-hour window is measured
- [ ] Capacity on busy weekends
- [ ] Replace the bracketed placeholders in `terms.confirmed`
- [ ] Yard signs: point them to `yourdomain.com/sign` (redirect with UTM tracking already configured)

## 4. Local content to verify (city pages)
Geography in `src/data/cities.ts` was written from general knowledge — please confirm:
- [ ] Counties, ZIP codes and "direction from Springfield" for all 8 towns
- [ ] Springfield neighborhood list (Rountree, Phelps Grove, Midtown, Commercial Street, Galloway, Southern Hills, Woodland Heights, Doling Park, Westside…)
- [ ] Springfield household-chemical note (City of Springfield's household chemical collection program — confirm it's still current)
- [ ] **Flagged for expansion** (`status: 'expand'`): Battlefield, Willard, Rogersville, Strafford. These pages are useful but thinner. Before pushing them in ads or link-building, add: real job photos from that town, owner-written notes on local access/disposal, and town-specific FAQs from real customer questions.

## 5. Photos (biggest visual upgrade available)
The site uses a custom technical illustration and clearly-labelled placeholders — **no stock photos are presented as company work**.
- [ ] Hero photo: crew loading the trailer, or the branded trailer loaded → `src/assets/photos/hero.jpg`
- [ ] 3–6 real before/after pairs → `src/data/projects.ts` (customer permission; no house numbers/plates/faces)
- [ ] Trailer + crew photos for the About page
- [ ] Once real projects exist, the gallery's "Illustration — real project photos coming soon" demo disappears automatically

## 6. Reviews
- [ ] Ask every early customer for a Google review (the #1 competitive gap — see `COMPETITIVE-ANALYSIS.md`)
- [ ] Add real reviews (verbatim, with permission/source link) to `src/data/reviews.ts`. Do **not** add rating schema.

## 7. Netlify & tracking
- [ ] Connect repo, deploy, set env vars (see README)
- [ ] Confirm both forms detected; set up email notifications
- [ ] **Live test:** submit both forms with a photo on the deployed site; confirm data + attachment arrive
- [ ] GTM / GA4 / Google Ads conversion / Meta Pixel IDs → env vars; mark `generate_lead` as a conversion
- [ ] Call tracking (e.g. CallRail) script URL → `PUBLIC_CALL_TRACKING_SCRIPT`
- [ ] Privacy policy: set effective date, have it reviewed (`src/pages/privacy.astro`)
- [ ] Google Search Console: verify domain, submit sitemap
- [ ] Re-run Lighthouse / PageSpeed Insights against the live URL

## 8. SEO notes
- The homepage targets "junk removal Springfield MO"; the Springfield city page is titled "Local Junk Removal Across Springfield, MO" and focuses on neighborhoods to limit keyword cannibalization. If Search Console later shows the two competing, consider consolidating.
- Write the planned articles (`src/data/resources.ts`) from real jobs — one strong article beats six thin ones.
