/**
 * Tracking IDs come from PUBLIC_* environment variables (see .env.example).
 * Nothing loads unless an ID is configured AND the visitor has accepted
 * analytics/ads cookies in the consent banner.
 */
const env = import.meta.env;
const v = (x: unknown) => (typeof x === 'string' && x.trim() ? x.trim() : null);

export const tracking = {
  gtmId: v(env.PUBLIC_GTM_ID),
  ga4Id: v(env.PUBLIC_GA4_ID),
  googleAdsId: v(env.PUBLIC_GOOGLE_ADS_ID),
  googleAdsLeadLabel: v(env.PUBLIC_GOOGLE_ADS_LEAD_LABEL),
  metaPixelId: v(env.PUBLIC_META_PIXEL_ID),
  callTrackingScript: v(env.PUBLIC_CALL_TRACKING_SCRIPT),
};

export const trackingEnabled = Object.values(tracking).some(Boolean);
