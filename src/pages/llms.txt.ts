/**
 * /llms.txt — a plain-Markdown summary of the business for AI assistants and
 * LLM crawlers (https://llmstxt.org). Generated from the same data as the site,
 * so it stays in sync. Only verified facts — no prices, ratings or guarantees.
 */
import type { APIRoute } from 'astro';
import { site } from '@/config/site';
import { offerCopy } from '@/config/offer';
import { services, notAccepted } from '@/data/services';
import { cities, cityPath, regions, regionOrder, SERVICE_RADIUS_MILES } from '@/data/cities';
import { homeFaqs } from '@/data/faqs';

export const GET: APIRoute = ({ site: siteUrl }) => {
  const u = (p: string) => new URL(p, siteUrl).href;
  const core = cities.filter((c) => c.region === 'core');
  const lines: string[] = [];

  lines.push(`# ${site.name}`, '');
  lines.push(
    `> ${site.name} is a locally operated, full-service junk removal and hauling company based in Springfield, Missouri, serving ${cities.length} communities within about ${SERVICE_RADIUS_MILES} miles. The crew comes to the property, carries items out, loads them onto a dump trailer or high-side hauling trailer, and handles disposal — customers don't rent trailers or haul anything themselves.`,
    '',
  );
  lines.push('Key facts:');
  lines.push(`- Service area: Springfield, MO and Southwest Missouri (${cities.length} towns within ~${SERVICE_RADIUS_MILES} miles)`);
  if (site.phone) lines.push(`- Phone: ${site.phone}`);
  if (site.email) lines.push(`- Email: ${site.email}`);
  lines.push(`- Free estimates: request online at ${u('/get-a-quote/')}`);
  lines.push('- Pricing: estimate-based (volume, weight and access); no fixed public price list');
  lines.push('- Customers: homeowners, landlords, property managers, realtors, estate executors, contractors and businesses');
  lines.push(`- Garage-sale leftover pickup program: ${offerCopy.short} (eligibility confirmed per request)`, '');

  lines.push('## Services', '');
  for (const s of services) lines.push(`- [${s.name}](${u(`/services/${s.slug}/`)}): ${s.cardBlurb}`);
  lines.push(`- [Garage sale leftover pickup](${u('/garage-sale-junk-pickup/')}): ${offerCopy.headline}.`, '');

  lines.push('## Service areas', '');
  lines.push(`Core area: ${core.map((c) => `[${c.name}](${u(cityPath(c.slug))})`).join(', ')}.`, '');
  for (const k of regionOrder) {
    const list = cities.filter((c) => c.region === k);
    if (!list.length) continue;
    lines.push(`${regions[k].label}: ${list.map((c) => `[${c.name}](${u(cityPath(c.slug))}) (${c.county})`).join(', ')}.`, '');
  }
  lines.push(`Full list with ZIP codes and map: ${u('/service-areas/')}`, '');

  lines.push('## Not accepted with regular junk', '');
  lines.push(notAccepted.join('; ') + '.', '');
  lines.push('Biohazards, active infestations and regulated or hazardous materials require an assessment and may need a licensed specialist.', '');

  lines.push('## Frequently asked questions', '');
  for (const f of homeFaqs) lines.push(`### ${f.q}`, '', f.a, '');

  lines.push('## Key pages', '');
  lines.push(`- [Home](${u('/')})`);
  lines.push(`- [Get a free quote](${u('/get-a-quote/')})`);
  lines.push(`- [All services](${u('/services/')})`);
  lines.push(`- [Service areas](${u('/service-areas/')})`);
  lines.push(`- [About](${u('/about/')})`);
  lines.push(`- [Privacy policy](${u('/privacy/')})`, '');

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
