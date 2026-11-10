/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — the single source of truth for business details.
 *
 *  RULE: only publish verified information. Anything left `null` is simply not
 *  rendered (no phone button, no address, no hours, no schema field). Values
 *  marked "PLACEHOLDER" must be confirmed by the owner before launch.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const env = import.meta.env;
const clean = (v: unknown): string | null => {
  const s = typeof v === 'string' ? v.trim() : '';
  return s.length ? s : null;
};

export const site = {
  name: 'Ozark Junk Removals',
  shortName: 'Ozark Junk',
  tagline: 'Junk Gone. Problem Solved.',
  description:
    "Springfield's local junk removal and hauling crew. We do the loading, lifting and hauling — from one bulky item to a full property cleanout across Southwest Missouri.",

  /** Click-to-call number (owner-provided). Override with env PUBLIC_PHONE; set to null to hide. */
  phone: clean(env.PUBLIC_PHONE) ?? '(417) 841-7021',
  /** Public email (env PUBLIC_EMAIL). */
  email: clean(env.PUBLIC_EMAIL),

  /**
   * Service-area business: no public street address until one is verified.
   * If a storefront/yard address is ever published, fill this in and the
   * LocalBusiness schema will pick it up automatically.
   */
  address: null as null | {
    street: string;
    city: string;
    region: string;
    postalCode: string;
  },

  /** Opening hours — leave null until confirmed. Example: ['Mo-Sa 07:00-19:00'] */
  openingHours: null as null | string[],

  /** Verified social profile URLs only (used for schema `sameAs`). */
  social: [] as string[],

  primaryCity: 'Springfield',
  region: 'MO',
  regionName: 'Missouri',
  areaLabel: 'Springfield & Southwest Missouri',

  /** Equipment we can truthfully reference in copy. */
  equipment: ['dump trailer', 'high-side hauling trailer'],
} as const;

const telDigits = site.phone?.replace(/[^\d+]/g, '') ?? '';
/** E.164 tel: link (assumes US numbers when 10 digits are given). */
export const telHref = telDigits ? `tel:${/^\d{10}$/.test(telDigits) ? '+1' + telDigits : telDigits}` : null;

/** Primary navigation (desktop + mobile). */
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'Service Areas', href: '/service-areas/' },
  { label: 'Garage Sale Cleanup', href: '/garage-sale-junk-pickup/' },
  { label: 'About', href: '/about/' },
  { label: 'Get a Quote', href: '/get-a-quote/' },
] as const;
