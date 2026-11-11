/**
 * JSON-LD builders. Only verified fields are emitted: phone, email, address,
 * hours and sameAs appear automatically once set in src/config/site.ts.
 * No ratings, reviews, business coordinates or certifications — by design.
 * (Town-center coordinates on city pages describe the *area served*, not the business.)
 */
import { site } from '@/config/site';
import { cities, SERVICE_RADIUS_MILES } from '@/data/cities';
import { SPRINGFIELD } from '@/data/areas';
import { services, type FAQ } from '@/data/services';

const abs = (origin: string, path: string) => new URL(path, origin).href;

export const businessId = (origin: string) => abs(origin, '/#business');
export const websiteId = (origin: string) => abs(origin, '/#website');

const missouri = { '@type': 'State', name: 'Missouri', sameAs: 'https://en.wikipedia.org/wiki/Missouri' };

const cityNode = (name: string, lat?: number, lon?: number) => ({
  '@type': 'City',
  name: `${name}, MO`,
  containedInPlace: missouri,
  ...(lat != null && lon != null ? { geo: { '@type': 'GeoCoordinates', latitude: lat, longitude: lon } } : {}),
});

/** Every town we serve, plus the 60-mile radius around Springfield. */
const areaServed = () => [
  {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: SPRINGFIELD[0], longitude: SPRINGFIELD[1] },
    geoRadius: Math.round(SERVICE_RADIUS_MILES * 1609.34),
    description: `Within about ${SERVICE_RADIUS_MILES} miles of Springfield, Missouri`,
  },
  ...cities.map((c) => cityNode(c.name)),
];

export function localBusiness(origin: string) {
  const node: Record<string, unknown> = {
    '@type': 'LocalBusiness',
    '@id': businessId(origin),
    name: site.name,
    description: site.description,
    url: abs(origin, '/'),
    slogan: site.tagline,
    logo: { '@type': 'ImageObject', url: abs(origin, '/logo.png'), width: 600, height: 301 },
    image: abs(origin, '/og-default.jpg'),
    areaServed: areaServed(),
    knowsAbout: ['Junk removal', 'Junk hauling', 'Property cleanouts', 'Furniture removal', 'Appliance removal', 'Garage cleanouts', 'Construction debris removal'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Junk removal services',
      itemListElement: [
        ...services.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.name, url: abs(origin, `/services/${s.slug}/`), description: s.cardBlurb },
        })),
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Garage sale leftover pickup', url: abs(origin, '/garage-sale-junk-pickup/') },
        },
      ],
    },
  };
  if (site.phone) {
    node.telephone = site.phone;
    node.contactPoint = {
      '@type': 'ContactPoint',
      telephone: site.phone,
      contactType: 'customer service',
      areaServed: 'US-MO',
      availableLanguage: 'English',
    };
  }
  if (site.email) node.email = site.email;
  if (site.address) {
    node.address = {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: 'US',
    };
  }
  if (site.openingHours?.length) node.openingHours = site.openingHours;
  if (site.social.length) node.sameAs = site.social;
  return node;
}

export function website(origin: string) {
  return {
    '@type': 'WebSite',
    '@id': websiteId(origin),
    name: site.name,
    url: abs(origin, '/'),
    publisher: { '@id': businessId(origin) },
    inLanguage: 'en-US',
  };
}

export function service(
  origin: string,
  opts: { name: string; description: string; path: string; area?: string; lat?: number; lon?: number },
) {
  return {
    '@type': 'Service',
    '@id': abs(origin, `${opts.path}#service`),
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: abs(origin, opts.path),
    provider: { '@id': businessId(origin) },
    areaServed: opts.area ? cityNode(opts.area.replace(/, MO$/, ''), opts.lat, opts.lon) : areaServed(),
    potentialAction: { '@type': 'CommunicateAction', name: 'Request a free estimate', target: abs(origin, '/get-a-quote/') },
  };
}

/** Page-level node tying each URL to the site, business and breadcrumb trail. */
export function webPage(
  origin: string,
  opts: { path: string; title: string; description: string; hasBreadcrumb: boolean; type?: string },
) {
  const url = abs(origin, opts.path);
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    isPartOf: { '@id': websiteId(origin) },
    about: { '@id': businessId(origin) },
    primaryImageOfPage: { '@type': 'ImageObject', url: abs(origin, '/og-default.jpg') },
    inLanguage: 'en-US',
    ...(opts.hasBreadcrumb ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
  };
}

export function breadcrumbs(origin: string, trail: { name: string; href: string }[]) {
  const last = trail[trail.length - 1];
  return {
    '@type': 'BreadcrumbList',
    '@id': `${abs(origin, last.href)}#breadcrumb`,
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: abs(origin, t.href),
    })),
  };
}

export function faqPage(faqs: FAQ[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export const graph = (nodes: unknown[]) => ({ '@context': 'https://schema.org', '@graph': nodes });
