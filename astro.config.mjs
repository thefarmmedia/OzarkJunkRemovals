// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The canonical origin. Set SITE_URL in Netlify to the production domain once it is
// purchased (e.g. https://www.yourdomain.com). Netlify's own URL env var is the fallback,
// so preview deploys still get valid absolute URLs. Never hard-code a guessed domain here.
const site = (process.env.SITE_URL || process.env.URL || 'http://localhost:4321').replace(/\/$/, '');

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
