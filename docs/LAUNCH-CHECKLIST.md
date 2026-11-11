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

## 4b. Extended service area (19 generated town pages — 27 towns within 60 miles, incl. the 8 core)
Data: `src/data/areas.ts` (towns, counties, ZIPs, coordinates, facts) + region copy in `src/data/cities.ts → regions`.
- [ ] Confirm the business really serves the full 60-mile radius (and any minimum job size or trip scheduling for far towns — copy currently only says "a few days' notice helps")
- [ ] Verify each town's county, ZIP code(s) and the one-line `fact` (county seats, lakes, highways, universities)
- [ ] Distances are straight-line miles from Springfield, computed from approximate coordinates ("about X miles")
- [ ] Town selection used approximate 2020 Census populations — confirm the list matches where you want to rank.
- [ ] 23 smaller towns were removed; their old URLs 301-redirect to the nearest remaining town (`netlify.toml`).
- [ ] **Doorway-page risk:** these 19 pages share region-level copy. They are differentiated by region content, town facts, distance/direction and nearest-town links, but Google may still treat thin location pages as low value. Strengthen the most important ones first (Branson, Bolivar, Lebanon, Marshfield, Mount Vernon, Monett) with real job photos, owner-written notes and town-specific FAQs. Monitor indexing in Search Console; if many stay "Crawled – not indexed", improve or consolidate rather than add more.
- [ ] To add/remove a town: edit `towns` in `src/data/areas.ts` — the page, sitemap entry, map pin, quote-form option and nearest-town links update automatically.

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
- [ ] Set **`GHL_WEBHOOK_URL`** (GoHighLevel inbound webhook) in Netlify env vars, redeploy, submit a test lead, then map the fields in the GHL webhook trigger (see README → Lead forms)
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
