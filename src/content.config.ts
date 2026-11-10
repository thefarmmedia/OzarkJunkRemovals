import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Helpful-resource articles. Add Markdown files to src/content/resources/.
 * Files starting with "_" are ignored (see docs/ARTICLE-TEMPLATE.md).
 */
const resources = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** Service slugs this article supports (for internal links). */
    services: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { resources };
