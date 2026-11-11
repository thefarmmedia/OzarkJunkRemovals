/**
 * Netlify event function: runs automatically for every *verified* (non-spam)
 * Netlify Forms submission and forwards the lead to the CRM webhook
 * (GoHighLevel / LeadConnector inbound webhook).
 *
 * Configure in Netlify → Site configuration → Environment variables:
 *   GHL_WEBHOOK_URL = https://services.leadconnectorhq.com/hooks/…/webhook-trigger/…
 * Never commit the webhook URL — this repository is public.
 *
 * Every form ("estimate", "quote", "garage-sale-pickup") is forwarded as one
 * flat JSON object, so the same GHL workflow can map all of them.
 */

const FORM_LABELS = {
  estimate: 'Homepage estimate form',
  quote: 'Full quote form',
  'garage-sale-pickup': 'Garage sale pickup form',
};

const str = (v) => (v == null ? '' : Array.isArray(v) ? v.join(', ') : String(v)).trim();

/** "(417) 555-0123" → "+14175550123" (US); leaves other formats untouched. */
function normalizePhone(raw) {
  const digits = str(raw).replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return str(raw);
}

/** Netlify file fields arrive as { url, filename, ... } objects (or a bare URL). */
function fileUrl(v) {
  if (!v) return '';
  if (typeof v === 'string') return /^https?:\/\//.test(v) ? v : '';
  if (typeof v === 'object' && typeof v.url === 'string') return v.url;
  return '';
}

export function buildLead(payload) {
  const d = payload.data || {};
  const formName = payload.form_name || d['form-name'] || 'unknown';
  const fullName = str(d.name);
  const [firstName, ...rest] = fullName.split(/\s+/);
  const photos = ['photo_1', 'photo_2', 'photo_3'].map((k) => fileUrl(d[k])).filter(Boolean);

  const lead = {
    // Standard contact fields (map these in the GHL webhook trigger)
    first_name: firstName || '',
    last_name: rest.join(' '),
    full_name: fullName,
    phone: normalizePhone(d.phone),
    email: str(d.email),
    postal_code: str(d.zip),
    city: str(d.city),
    state: 'MO',
    source: `Website – ${FORM_LABELS[formName] || formName}`,
    tags: ['website lead', formName],

    // Job details
    form_name: formName,
    service: str(d.service) || (formName === 'garage-sale-pickup' ? 'Garage sale leftover pickup' : ''),
    load_size: str(d.load_size),
    description: str(d.description || d.notes),
    preferred_date: str(d.preferred_date),
    preferred_time: str(d.preferred_time),
    sale_end_date: str(d.sale_end_date),
    leftover_amount: str(d.leftover_amount),
    item_types: str(d.item_types),
    pickup_preference: str(d.pickup_preference),
    heard_from: str(d.heard_from),
    photo_urls: photos.join(' '),
    photo_count: photos.length,
    contact_consent: str(d.contact_consent) === 'yes',

    // Attribution
    page_url: str(d.page_url),
    utm_source: str(d.utm_source),
    utm_medium: str(d.utm_medium),
    utm_campaign: str(d.utm_campaign),
    gclid: str(d.gclid),
    fbclid: str(d.fbclid),

    submitted_at: payload.created_at || new Date().toISOString(),
    netlify_submission_id: payload.id || '',
  };
  return lead;
}

export async function handler(event) {
  const url = process.env.GHL_WEBHOOK_URL;
  if (!url) {
    console.warn('[crm] GHL_WEBHOOK_URL is not set — submission saved in Netlify Forms only.');
    return { statusCode: 200, body: 'webhook not configured' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}').payload;
  } catch {
    return { statusCode: 400, body: 'invalid body' };
  }
  if (!payload) return { statusCode: 400, body: 'missing payload' };

  const lead = buildLead(payload);
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
      if (res.ok) {
        console.log(`[crm] forwarded ${lead.form_name} submission ${lead.netlify_submission_id} (${res.status})`);
        return { statusCode: 200, body: 'forwarded' };
      }
      console.error(`[crm] webhook responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
    } catch (err) {
      console.error(`[crm] attempt ${attempt} failed:`, err?.message || err);
    }
  }
  // The submission is still stored in Netlify Forms; returning 200 avoids noisy retries.
  return { statusCode: 200, body: 'webhook failed — see function logs' };
}
