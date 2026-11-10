/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  GARAGE-SALE LEFTOVER PICKUP — centralized offer configuration.
 *
 *  Every place on the site that mentions the garage-sale program reads from
 *  here, so the offer can be switched without touching page code.
 *
 *  `mode` controls the public promise:
 *    'ask'       → "Ask about free pickup of qualifying garage sale leftovers"
 *                  (SAFE DEFAULT — no guarantee is made).
 *    'confirmed' → "FREE PICKUP WITHIN 24 HOURS" headline + published terms.
 *                  Only switch after the owner has approved eligibility,
 *                  service area, item exclusions, scheduling and capacity,
 *                  and filled in `terms` below.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type OfferMode = 'ask' | 'confirmed';

export const garageSaleOffer = {
  mode: 'ask' as OfferMode,

  copy: {
    ask: {
      badge: 'Garage Sale Leftover Pickup',
      headline: 'Ask About Free Pickup of Qualifying Garage Sale Leftovers',
      short: 'Ask about free pickup of qualifying leftovers',
    },
    confirmed: {
      badge: 'Free Leftover Pickup',
      headline: 'FREE PICKUP WITHIN 24 HOURS',
      short: 'Free pickup of qualifying leftovers within 24 hours',
    },
  },

  /**
   * Published terms (shown on the landing page). Keep these accurate. The
   * `ask`-mode list is intentionally non-committal; replace with real terms
   * before switching to `confirmed`.
   */
  terms: {
    ask: [
      'Eligibility, pickup windows and accepted items are confirmed for each request before anything is scheduled.',
      'Pickup is subject to crew availability and location within our service area.',
      'Some items cannot be accepted (see the list below). Larger or mixed loads may be quoted as a standard junk removal job — we will always tell you before we load anything.',
    ],
    confirmed: [
      // PLACEHOLDER — owner to supply final terms before enabling `confirmed` mode.
      'Offer applies to qualifying unsold garage-sale items only.',
      'Pickup within 24 hours of the sale ending, for requests submitted within [X] hours.',
      'Service area: [list ZIP codes / cities].',
      'Excluded items: [list].',
      'Maximum volume: [describe].',
    ],
  },

  /** Items that are commonly a good fit — informational, not a guarantee. */
  goodFit: [
    'Furniture that did not sell',
    'Household goods & décor',
    'Toys, sporting goods & bikes',
    'Small appliances & electronics',
    'Clothing & linens (bagged)',
    'Books, media & boxed items',
  ],

  /** Never accepted through this program (mirrors site-wide exclusions). */
  notAccepted: [
    'Paint, solvents, fuel & chemicals',
    'Propane tanks & compressed gas cylinders',
    'Car batteries & automotive fluids',
    'Medical or biohazard waste',
    'Anything containing asbestos',
  ],
} as const;

export const offerCopy = garageSaleOffer.copy[garageSaleOffer.mode];
export const offerTerms = garageSaleOffer.terms[garageSaleOffer.mode];
