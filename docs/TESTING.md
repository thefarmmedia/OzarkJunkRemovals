# QA log & how to re-test

## Performed (local, 2026-11-09)

| Check | How | Result |
| --- | --- | --- |
| Dependencies install | `npm install` | OK, 0 vulnerabilities |
| Production build | `npm run build` | 26 pages, no errors (expected warning: `resources` collection empty until first article) |
| Type check | `npm run check` | 0 errors, 0 warnings |
| Links, metadata, canonicals, JSON-LD, h1, alt text, forms in HTML, sitemap | `npm run validate` | All checks passed |
| Lighthouse mobile (home, quote, garage-sale, Springfield, junk-removal service) | Lighthouse 12.8.2 vs. `astro preview` | Perf 97 · A11y 100 · Best Practices 100 · SEO 100 (LCP 2.3–2.4s, CLS ≤ 0.02, TBT 0ms) |
| Lighthouse desktop (home) | same | Perf 100 · A11y 100 · BP 100 · SEO 100 |
| Accessibility on every page template | Lighthouse | 100 on all (services, service, city, about, quote, resources, privacy, thank-you, 404) |
| 404 handling | curl | Unknown URLs return HTTP 404 + custom page |
| Responsive layout | Browser at 375px and 1440px | No horizontal scroll; mobile menu (focus trap, Esc) and sticky CTA bar work |
| Quote form | Browser, `fetch` stubbed | Step validation, ZIP/phone/consent errors, focus management, deep-link prefill (`?service=&city=`), payload contents, `generate_lead` event, redirect to thank-you |
| Photo upload | Browser, synthetic 4000×3000 image | Downscaled to 1800px JPEG, placed into `photo_1..3`, previews + remove; empty slots stripped from payload |
| Garage-sale form | Browser | Validation, multi-select item types, server-error state (alert shown + focused, button re-enabled) |
| Click-to-call | Build | `tel:+14178417021` links + schema telephone |
| Consent / tracking | Test build with dummy GA4 ID | No Google script before consent; Consent Mode default "denied"; script loads after Accept |
| Reduced motion | CSS review | All animations disabled under `prefers-reduced-motion` |

## Requires the live Netlify deploy (not testable locally)
- Netlify form detection + actual submission storage
- File attachments arriving in Netlify Forms (8 MB/submission limit)
- Email notifications
- Netlify redirects (`/sign`, `/quote`, …) and headers
- Real-world Core Web Vitals (Search Console / PageSpeed Insights field data)
- Google Rich Results Test against the public URL

## Re-test after changes
```bash
npm run build && npm run validate && npm run check
npx lighthouse http://localhost:4321/ --view   # with `npm run preview` running
```
Live: submit both forms with a photo, confirm in Netlify → Forms; run https://search.google.com/test/rich-results and https://pagespeed.web.dev on the production URL.
