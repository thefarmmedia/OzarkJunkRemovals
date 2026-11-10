// Section entrance animations + click tracking for any [data-track] element.
const els = document.querySelectorAll<HTMLElement>('.reveal');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduce || !('IntersectionObserver' in window)) {
  els.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  els.forEach((el) => io.observe(el));
}

// Start held animations once at least ~40% of the element is visible.
const holds = document.querySelectorAll<HTMLElement>('[data-play-on-view]');
if (reduce || !('IntersectionObserver' in window)) {
  holds.forEach((el) => el.classList.add('play'));
} else {
  const playIo = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('play');
          playIo.unobserve(e.target);
        }
      }
    },
    { threshold: 0.4 },
  );
  holds.forEach((el) => playIo.observe(el));
}

document.addEventListener('click', (e) => {
  const el = (e.target as HTMLElement).closest<HTMLElement>('[data-track]');
  if (!el) return;
  window.ozTrack?.(el.dataset.track!, { cta_location: el.dataset.cta ?? 'unknown', link_url: (el as HTMLAnchorElement).href });
});
