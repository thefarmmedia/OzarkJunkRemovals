/**
 * BEFORE / AFTER PROJECT GALLERY
 *
 * Add REAL completed jobs only. Never use stock photos here.
 *
 * How to add a project:
 *  1. Drop the photos in src/assets/projects/ (JPG/PNG/WebP, landscape ~4:3,
 *     ideally 1600px wide — the build optimizes them automatically).
 *  2. Import them below and add an entry to `projects`.
 *  3. Get the customer's permission and avoid showing house numbers,
 *     license plates, faces or personal documents.
 *
 * Example:
 *   import garageBefore from '@/assets/projects/2027-01-garage-before.jpg';
 *   import garageAfter  from '@/assets/projects/2027-01-garage-after.jpg';
 *   { title: 'Two-car garage cleanout', city: 'Nixa', service: 'garage-cleanouts',
 *     before: garageBefore, after: garageAfter,
 *     summary: 'Old furniture, boxes and a broken treadmill — one trailer load.' }
 */
import type { ImageMetadata } from 'astro';

export interface Project {
  title: string;
  city: string;
  service: string;
  summary: string;
  before: ImageMetadata;
  after: ImageMetadata;
  beforeAlt?: string;
  afterAlt?: string;
}

export const projects: Project[] = [];
