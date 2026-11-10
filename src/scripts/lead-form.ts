/**
 * Lead form behaviour shared by every form[data-lead-form]:
 *  - multi-step progression with per-step validation
 *  - accessible inline errors (aria-invalid + described-by messages)
 *  - photo uploader with in-browser downscaling (Netlify ≈ 8 MB / submission)
 *  - first-touch attribution (UTM / gclid / fbclid) into hidden fields
 *  - fetch submission to Netlify Forms → /thank-you/, with error state
 */

const MAX_TOTAL_BYTES = 7.5 * 1024 * 1024;
const MAX_EDGE = 1800;
const ATTR_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'gclid', 'fbclid'] as const;

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function storeAttribution() {
  try {
    const params = new URLSearchParams(location.search);
    const saved = JSON.parse(sessionStorage.getItem('oz-attr') || '{}');
    let changed = false;
    for (const k of ATTR_KEYS) {
      const v = params.get(k);
      if (v && !saved[k]) { saved[k] = v.slice(0, 200); changed = true; }
    }
    if (!saved.landing_page) { saved.landing_page = location.pathname; changed = true; }
    if (changed) sessionStorage.setItem('oz-attr', JSON.stringify(saved));
    return saved as Record<string, string>;
  } catch {
    return {} as Record<string, string>;
  }
}

function fillHidden(form: HTMLFormElement, attr: Record<string, string>) {
  form.querySelectorAll<HTMLInputElement>('[data-fill]').forEach((el) => {
    const key = el.dataset.fill!;
    el.value = key === 'page_url' ? location.origin + location.pathname : (attr[key] ?? '');
  });
  const today = new Date();
  const iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  form.querySelectorAll<HTMLInputElement>('[data-min-today]').forEach((el) => (el.min = iso));
}

/* ── Validation ───────────────────────────────────────────────────────────── */

function errorEl(form: HTMLFormElement, name: string) {
  return form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
}

function setError(form: HTMLFormElement, field: Field, show: boolean) {
  const err = errorEl(form, field.name);
  if (field.type === 'radio') {
    form.querySelectorAll<HTMLInputElement>(`input[name="${field.name}"]`).forEach((r) => r.setAttribute('aria-invalid', String(show)));
  } else {
    field.setAttribute('aria-invalid', String(show));
  }
  err?.classList.toggle('is-visible', show);
}

function isValid(form: HTMLFormElement, field: Field) {
  if (field.type === 'radio') {
    const group = form.querySelectorAll<HTMLInputElement>(`input[name="${field.name}"]`);
    const required = [...group].some((r) => r.required);
    return !required || [...group].some((r) => r.checked);
  }
  if (field instanceof HTMLInputElement && field.type === 'tel' && field.value) {
    return field.value.replace(/\D/g, '').length >= 10 && field.checkValidity();
  }
  if ((field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) && field.required && field.type !== 'checkbox') {
    if (!field.value.trim()) return false;
  }
  return field.checkValidity();
}

function validate(form: HTMLFormElement, scope: ParentNode): Field | null {
  const fields = [...scope.querySelectorAll<Field>('input[name], select[name], textarea[name]')].filter(
    (f) => f.type !== 'hidden' && f.type !== 'file' && !f.closest('[aria-hidden="true"]'),
  );
  const seen = new Set<string>();
  let first: Field | null = null;
  for (const f of fields) {
    if (f.type === 'radio') {
      if (seen.has(f.name)) continue;
      seen.add(f.name);
    }
    const ok = isValid(form, f);
    setError(form, f, !ok);
    if (!ok && !first) first = f;
  }
  return first;
}

/* ── Photo uploader ───────────────────────────────────────────────────────── */

async function downscale(file: File): Promise<File> {
  if (!file.type.startsWith('image/') || file.type === 'image/gif') return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bmp.width, bmp.height));
    if (scale === 1 && file.size < 1.2 * 1024 * 1024) { bmp.close(); return file; }
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext('2d')!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    bmp.close();
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', 0.82));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.\w+$/, '') + '.jpg', { type: 'image/jpeg' });
  } catch {
    return file; // e.g. HEIC on browsers that can't decode it — send as-is
  }
}

function initUploader(root: HTMLElement) {
  let supported = false;
  try { supported = !!new DataTransfer(); } catch { supported = false; }
  if (!supported) return; // native inputs remain visible

  const max = Number(root.dataset.max || 3);
  const enhanced = root.querySelector<HTMLElement>('.uploader-enhanced')!;
  const native = root.querySelector<HTMLElement>('.uploader-native')!;
  const drop = root.querySelector<HTMLButtonElement>('.uploader-drop')!;
  const picker = root.querySelector<HTMLInputElement>('.uploader-picker')!;
  const list = root.querySelector<HTMLUListElement>('.uploader-previews')!;
  const status = root.querySelector<HTMLElement>('.uploader-status')!;
  const inputs = [...native.querySelectorAll<HTMLInputElement>('input[type=file]')];
  let files: File[] = [];

  enhanced.classList.remove('hidden');
  native.classList.add('hidden');
  native.setAttribute('aria-hidden', 'true');
  inputs.forEach((i) => (i.tabIndex = -1));

  const sync = () => {
    inputs.forEach((input, i) => {
      const dt = new DataTransfer();
      if (files[i]) dt.items.add(files[i]);
      input.files = dt.files;
    });
    list.innerHTML = '';
    files.forEach((f, i) => {
      const url = URL.createObjectURL(f);
      const li = document.createElement('li');
      li.className = 'relative aspect-square overflow-hidden rounded border border-white/10 bg-black';
      li.innerHTML = `<img src="${url}" alt="Photo ${i + 1} preview" class="h-full w-full object-cover" />
        <button type="button" class="absolute top-1 right-1 grid size-8 place-items-center rounded-full bg-ink/90 text-white ring-1 ring-white/20 hover:bg-orange hover:text-ink" aria-label="Remove photo ${i + 1}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>
        </button>`;
      li.querySelector('img')!.addEventListener('load', () => URL.revokeObjectURL(url), { once: true });
      li.querySelector('button')!.addEventListener('click', () => {
        files.splice(i, 1);
        sync();
        status.textContent = `Photo removed. ${files.length} of ${max} added.`;
        drop.focus();
      });
      list.appendChild(li);
    });
    drop.disabled = files.length >= max;
    drop.classList.toggle('opacity-50', files.length >= max);
  };

  const add = async (incoming: FileList | File[]) => {
    const imgs = [...incoming].filter((f) => f.type.startsWith('image/') || /\.(heic|heif)$/i.test(f.name));
    if (!imgs.length) { status.textContent = 'Please choose image files.'; return; }
    status.textContent = 'Preparing photos…';
    const room = max - files.length;
    const prepared = await Promise.all(imgs.slice(0, room).map(downscale));
    for (const f of prepared) {
      const total = files.reduce((s, x) => s + x.size, 0) + f.size;
      if (total > MAX_TOTAL_BYTES) {
        status.textContent = 'That photo is too large to attach. Try a different one, or describe the items instead.';
        sync();
        return;
      }
      files.push(f);
    }
    sync();
    status.textContent =
      imgs.length > room
        ? `Added ${room} photo${room === 1 ? '' : 's'} — the limit is ${max}.`
        : `${files.length} of ${max} photo${max === 1 ? '' : 's'} added.`;
  };

  drop.addEventListener('click', () => picker.click());
  picker.addEventListener('change', () => { if (picker.files) add(picker.files); picker.value = ''; });
  ['dragenter', 'dragover'].forEach((t) =>
    drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.add('!border-blue', '!bg-blue/10'); }),
  );
  ['dragleave', 'drop'].forEach((t) =>
    drop.addEventListener(t, () => drop.classList.remove('!border-blue', '!bg-blue/10')),
  );
  drop.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer?.files) add(e.dataTransfer.files);
  });
}

/* ── Steps ────────────────────────────────────────────────────────────────── */

function initSteps(form: HTMLFormElement) {
  const steps = [...form.querySelectorAll<HTMLElement>('.form-step')];
  if (steps.length < 2) return { current: () => steps.length - 1, steps };
  const next = form.querySelector<HTMLButtonElement>('[data-nav="next"]')!;
  const back = form.querySelector<HTMLButtonElement>('[data-nav="back"]')!;
  const submit = form.querySelector<HTMLButtonElement>('.form-submit')!;
  const progress = form.querySelector<HTMLElement>('.form-progress');
  const announcer = form.querySelector<HTMLElement>('[data-step-announcer]');
  let idx = 0;

  form.classList.add('is-stepped');
  progress?.classList.remove('hidden');

  const show = (i: number, focus = true) => {
    idx = i;
    steps.forEach((s, n) => {
      s.hidden = n !== i;
      if (n === i) s.classList.add('step-in');
    });
    form.querySelectorAll<HTMLElement>('[data-step-indicator]').forEach((el, n) => {
      el.classList.toggle('is-done', n < i);
      el.classList.toggle('is-current', n === i);
    });
    back.classList.toggle('hidden', i === 0);
    next.classList.toggle('hidden', i === steps.length - 1);
    submit.classList.toggle('hidden', i !== steps.length - 1);
    if (announcer) announcer.textContent = `Step ${i + 1} of ${steps.length}`;
    if (focus) {
      const top = form.getBoundingClientRect().top;
      if (top < 0) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      steps[i].querySelector<HTMLElement>('input:not([type=hidden]):not(.sr-only), select, textarea, button')?.focus({ preventScroll: true });
    }
  };

  next.addEventListener('click', () => {
    const bad = validate(form, steps[idx]);
    if (bad) { bad.focus(); return; }
    window.ozTrack?.('form_step', { form_name: form.dataset.leadForm, step: idx + 2 });
    show(idx + 1);
  });
  back.addEventListener('click', () => show(idx - 1));
  // Enter inside a step advances instead of submitting early
  form.addEventListener('keydown', (e) => {
    const t = e.target as HTMLElement;
    if (e.key === 'Enter' && t.tagName === 'INPUT' && idx < steps.length - 1) {
      e.preventDefault();
      next.click();
    }
  });
  show(0, false);
  return { current: () => idx, steps, show };
}

/* ── Submit ───────────────────────────────────────────────────────────────── */

function setLoading(form: HTMLFormElement, on: boolean) {
  const btn = form.querySelector<HTMLButtonElement>('.form-submit')!;
  btn.disabled = on;
  btn.querySelector('.submit-label')?.classList.toggle('hidden', on);
  btn.querySelector('.submit-arrow')?.classList.toggle('hidden', on);
  const loading = btn.querySelector('.submit-loading');
  loading?.classList.toggle('hidden', !on);
  loading?.classList.toggle('inline-flex', on);
}

function initForm(form: HTMLFormElement) {
  if (form.dataset.ready) return;
  form.dataset.ready = '1';
  const attr = storeAttribution();
  fillHidden(form, attr);
  form.querySelectorAll<HTMLElement>('[data-uploader]').forEach(initUploader);
  const stepper = initSteps(form);
  const alertBox = form.querySelector<HTMLElement>('.form-alert');
  let started = false;

  form.addEventListener('input', (e) => {
    const f = e.target as Field;
    if (!started) { started = true; window.ozTrack?.('form_start', { form_name: form.dataset.leadForm }); }
    if (f.name && f.getAttribute('aria-invalid') === 'true') setError(form, f, !isValid(form, f));
  });
  form.addEventListener('change', (e) => {
    const f = e.target as Field;
    if (f.name && f.type === 'radio') setError(form, f, false);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    alertBox?.classList.add('hidden');

    // Validate every step; jump to the first one with a problem.
    for (let i = 0; i < stepper.steps.length; i++) {
      const bad = validate(form, stepper.steps[i]);
      if (bad) {
        if ('show' in stepper && stepper.current() !== i) stepper.show?.(i);
        bad.focus();
        return;
      }
    }

    const honeypot = form.querySelector<HTMLInputElement>('input[name="company_website"]');
    const thanks = `${form.getAttribute('action') || '/thank-you/'}?form=${encodeURIComponent(form.dataset.leadForm || '')}`;
    if (honeypot?.value) { location.href = thanks; return; }

    setLoading(form, true);
    try {
      const body = new FormData(form);
      // Don't send empty photo slots as zero-byte files.
      for (const [k, v] of [...body.entries()]) if (v instanceof File && v.size === 0) body.delete(k);
      const res = await fetch('/', { method: 'POST', body });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      window.ozTrack?.('generate_lead', { form_name: form.dataset.leadForm, service: (form.elements.namedItem('service') as HTMLSelectElement | null)?.value });
      try { sessionStorage.setItem('oz-submitted', form.dataset.leadForm || 'form'); } catch {}
      location.href = thanks;
    } catch (err) {
      console.warn('Form submission failed', err);
      setLoading(form, false);
      alertBox?.classList.remove('hidden');
      alertBox?.focus();
    }
  });
}

export function initLeadForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-lead-form]').forEach(initForm);
}
