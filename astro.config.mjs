// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The canonical origin: SITE_URL if set, else Netlify's primary-domain URL, else the
// production domain (so local builds also produce correct canonicals).
const site = (process.env.SITE_URL || process.env.URL || 'https://ozarkjunkremovals.com').replace(/\/$/, '');

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) => !/\/(thank-you|404)\/?$/.test(page),
      lastmod: new Date(),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
