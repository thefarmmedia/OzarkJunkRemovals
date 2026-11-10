/**
 * JSON-LD builders. Only verified fields are emitted: phone, email, address,
 * hours and sameAs appear automatically once set in src/config/site.ts.
 * No ratings, reviews, coordinates or certifications — by design.
 */
import { site } from '@/config/site';
import { cities } from '@/data/cities';
import type { FAQ } from '@/data/services';

const abs = (origin: string, path: string) => new URL(path, origin).href;

export const businessId = (origin: string) => abs(origin, '/#business');
export const websiteId = (origin: string) => abs(origin, '/#website');

const areaServed = () =>
  cities.map((c) => ({
    '@type': 'City',
    name: `${c.name}, MO`,
    containedInPlace: { '@type': 'State', name: 'Missouri' },
  }));

export function localBusiness(origin: string) {
  const node: Record<string, unknown> = {
    '@type': 'LocalBusiness',
    '@id': businessId(origin),
    name: site.name,
    description: site.description,
    url: abs(origin, '/'),
    logo: abs(origin, '/logo.png'),
    image: abs(origin, '/og-default.jpg'),
    areaServed: areaServed(),
    knowsAbout: ['Junk removal', 'Hauling', 'Property cleanouts', 'Furniture removal', 'Appliance removal'],
  };
  if (site.phone) node.telephone = site.phone;
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
  opts: { name: string; description: string; path: string; area?: string },
) {
  return {
    '@type': 'Service',
    '@id': abs(origin, `${opts.path}#service`),
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: abs(origin, opts.path),
    provider: { '@id': businessId(origin) },
    areaServed: opts.area
      ? { '@type': 'City', name: opts.area, containedInPlace: { '@type': 'State', name: 'Missouri' } }
      : areaServed(),
  };
}

export function breadcrumbs(origin: string, trail: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
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
