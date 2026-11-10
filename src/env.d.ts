/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_URL?: string;
  readonly PUBLIC_PHONE?: string;
  readonly PUBLIC_EMAIL?: string;
  readonly PUBLIC_GTM_ID?: string;
  readonly PUBLIC_GA4_ID?: string;
  readonly PUBLIC_GOOGLE_ADS_ID?: string;
  readonly PUBLIC_GOOGLE_ADS_LEAD_LABEL?: string;
  readonly PUBLIC_META_PIXEL_ID?: string;
  readonly PUBLIC_CALL_TRACKING_SCRIPT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  dataLayer: unknown[];
  ozTrack?: (event: string, params?: Record<string, unknown>) => void;
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
}
