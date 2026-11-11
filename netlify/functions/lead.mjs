/**
 * Backup lead endpoint: POST /.netlify/functions/lead (JSON).
 *
 * The browser only calls this when the normal Netlify Forms POST fails (e.g.
 * form detection is turned off), so a lead is never lost. Text fields only —
 * photos still require Netlify Forms. Forwards to the same CRM webhook
 * (GHL_WEBHOOK_URL) using the same field mapping as submission-created.
 */
import { buildLead } from './submission-created.mjs';

const ALLOWED_FORMS = new Set(['estimate', 'quote', 'garage-sale-pickup']);
const MAX_FIELD = 2000;

export async function handler(event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };

  const url = process.env.GHL_WEBHOOK_URL;
  if (!url) {
    console.error('[lead] GHL_WEBHOOK_URL is not set — cannot accept backup submissions.');
    return { statusCode: 503, body: 'not configured' };
  }

  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: 'invalid json' };
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return { statusCode: 400, body: 'invalid body' };

  // Basic abuse protection: honeypot, allowed form names, required fields, size limits.
  if (data.company_website) return { statusCode: 200, body: 'ok' };
  const formName = String(data['form-name'] || '');
  if (!ALLOWED_FORMS.has(formName)) return { statusCode: 400, body: 'unknown form' };
  const clean = {};
  for (const [k, v] of Object.entries(data)) {
    if (/^photo_/.test(k)) continue;
    clean[k] = Array.isArray(v) ? v.map((x) => String(x).slice(0, MAX_FIELD)) : String(v ?? '').slice(0, MAX_FIELD);
  }
  const digits = String(clean.phone || '').replace(/\D/g, '');
  if (!clean.name || digits.length < 10 || clean.contact_consent !== 'yes') {
    return { statusCode: 422, body: 'missing required fields' };
  }

  const lead = buildLead({ form_name: formName, data: clean, created_at: new Date().toISOString(), id: '' });
  lead.source += ' (backup route)';
  lead.tags.push('backup-route');

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      console.error(`[lead] webhook responded ${res.status}`);
      return { statusCode: 502, body: 'webhook error' };
    }
    console.log(`[lead] forwarded ${formName} via backup route`);
    return { statusCode: 200, body: 'ok' };
  } catch (err) {
    console.error('[lead] webhook request failed:', err?.message || err);
    return { statusCode: 502, body: 'webhook unreachable' };
  }
}
