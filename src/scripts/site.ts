const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => [
  ...root.querySelectorAll<T>(sel),
];
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const isRTL = () => document.documentElement.dir === 'rtl';
const lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
/** Keep phone numbers in left-to-right order inside Arabic sentences. */
const ltr = (s: string) => `⁦${s}⁩`;

/* ------------------------------------------------------------------
   Scroll reveal: once per element
------------------------------------------------------------------- */
function initReveal() {
  const els = $$('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  els.forEach((el) => io.observe(el));
}

/* ------------------------------------------------------------------
   Nav: stronger glass once the page has scrolled (sentinel, no scroll listener)
------------------------------------------------------------------- */
function initNavState() {
  const nav = $('[data-nav]');
  if (!nav) return;
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:48px;pointer-events:none;';
  document.body.prepend(sentinel);
  new IntersectionObserver(([entry]) => nav.toggleAttribute('data-scrolled', !entry.isIntersecting)).observe(sentinel);
}

/* Move focus to an in-page target after programmatic navigation */
function goTo(hash: string) {
  const target = document.getElementById(hash.replace('#', ''));
  if (!target) return;
  history.pushState(null, '', hash);
  target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}

/* ------------------------------------------------------------------
   Mobile menu (native modal dialog: focus trap, Escape, inert page)
------------------------------------------------------------------- */
function initMenu() {
  const menu = $<HTMLDialogElement>('[data-menu]');
  const openBtn = $('[data-menu-open]');
  if (!menu || !openBtn) return;
  openBtn.addEventListener('click', () => {
    menu.showModal();
    openBtn.setAttribute('aria-expanded', 'true');
  });
  $('[data-menu-close]', menu)?.addEventListener('click', () => menu.close());
  menu.addEventListener('close', () => openBtn.setAttribute('aria-expanded', 'false'));
  $$<HTMLAnchorElement>('[data-menu-link]', menu).forEach((link) =>
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (!hash?.startsWith('#')) return;
      e.preventDefault();
      menu.close();
      goTo(hash);
    }),
  );
  matchMedia('(min-width: 64rem)').addEventListener('change', (e) => {
    if (e.matches && menu.open) menu.close();
  });
}

/* ------------------------------------------------------------------
   Before/after comparison
------------------------------------------------------------------- */
function initCompare(root: HTMLElement) {
  const stage = $('[data-compare-stage]', root);
  const before = $('[data-compare-before]', root);
  const handle = $('[data-compare-handle]', root);
  const range = $<HTMLInputElement>('[data-compare-range]', root);
  if (!stage || !before || !handle || !range) return;

  let pos = 50;
  let width = stage.clientWidth;
  let peek = 0;
  handle.style.insetInlineStart = '0';

  const render = () => {
    before.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
    handle.style.transform = `translateX(${(pos / 100) * width}px)`;
    const rounded = String(Math.round(pos));
    range.value = rounded;
    range.setAttribute('aria-valuetext', `${rounded}%`);
  };
  new ResizeObserver(() => {
    width = stage.clientWidth;
    render();
  }).observe(stage);

  const touch = () => {
    stage.setAttribute('data-touched', '');
    cancelAnimationFrame(peek);
    peek = -1;
  };
  const fromX = (clientX: number) => {
    const r = stage.getBoundingClientRect();
    return clamp(((clientX - r.left) / r.width) * 100, 0, 100);
  };

  // Mouse jumps straight to the pointer; touch waits for a horizontal drag so vertical scrolling still works.
  let pointerId: number | null = null;
  let dragging = false;
  let startX = 0;
  let startY = 0;
  stage.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    pointerId = e.pointerId;
    startX = e.clientX;
    startY = e.clientY;
    if (e.pointerType === 'mouse') {
      dragging = true;
      touch();
      stage.setPointerCapture(e.pointerId);
      stage.setAttribute('data-dragging', '');
      pos = fromX(e.clientX);
      render();
      range.focus({ preventScroll: true });
    }
  });
  stage.addEventListener('pointermove', (e) => {
    if (e.pointerId !== pointerId) return;
    if (!dragging) {
      const dx = Math.abs(e.clientX - startX);
      const dy = Math.abs(e.clientY - startY);
      if (dx < 6 || dx < dy) return;
      dragging = true;
      touch();
      stage.setPointerCapture(e.pointerId);
      stage.setAttribute('data-dragging', '');
    }
    pos = fromX(e.clientX);
    render();
  });
  const end = (e: PointerEvent) => {
    if (e.pointerId !== pointerId) return;
    if (!dragging && e.type === 'pointerup' && e.pointerType !== 'mouse') {
      touch();
      pos = fromX(e.clientX);
      render();
    }
    dragging = false;
    pointerId = null;
    stage.removeAttribute('data-dragging');
  };
  stage.addEventListener('pointerup', end);
  stage.addEventListener('pointercancel', end);

  range.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? 20 : 5;
    const map: Record<string, number> = { ArrowLeft: -step, ArrowDown: -step, ArrowRight: step, ArrowUp: step };
    if (e.key in map) {
      e.preventDefault();
      touch();
      pos = clamp(pos + map[e.key], 0, 100);
      render();
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      touch();
      pos = e.key === 'Home' ? 0 : 100;
      render();
    }
  });
  range.addEventListener('input', () => {
    touch();
    pos = Number(range.value);
    render();
  });

  render();

  // One-time "peek" that shows the slider is draggable (explanation, not decoration).
  if (reduceMotion.matches) return;
  const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const keys = [50, 64, 38, 50];
  const seg = 520;
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      setTimeout(() => {
        if (peek === -1) return;
        const t0 = performance.now();
        const tick = (now: number) => {
          if (peek === -1) return;
          const elapsed = now - t0;
          const i = Math.min(Math.floor(elapsed / seg), keys.length - 2);
          const local = clamp((elapsed - i * seg) / seg, 0, 1);
          pos = keys[i] + (keys[i + 1] - keys[i]) * easeInOut(local);
          render();
          if (elapsed < seg * (keys.length - 1)) peek = requestAnimationFrame(tick);
        };
        peek = requestAnimationFrame(tick);
      }, 900);
    },
    { threshold: 0.6 },
  );
  io.observe(stage);
}

/* ------------------------------------------------------------------
   Treatments: ARIA tabs with automatic activation + sliding indicator
------------------------------------------------------------------- */
function initTabs(root: HTMLElement) {
  const list = $('[data-tablist]', root);
  const indicator = $('[data-indicator]', root);
  const tabs = $$<HTMLButtonElement>('[role="tab"]', root);
  if (!list || !tabs.length) return null;

  const moveIndicator = (tab: HTMLElement, animate = true) => {
    if (!indicator) return;
    if (!animate) indicator.style.transition = 'none';
    indicator.style.transform = `translateY(${tab.offsetTop}px)`;
    indicator.style.height = `${tab.offsetHeight}px`;
    if (!animate) {
      void indicator.offsetHeight;
      indicator.style.transition = '';
    }
  };
  const current = () => tabs.find((t) => t.getAttribute('aria-selected') === 'true') ?? tabs[0];

  const select = (tab: HTMLButtonElement, focus = false) => {
    for (const t of tabs) {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls')!);
      if (panel) panel.hidden = !on;
    }
    moveIndicator(tab);
    if (focus) tab.focus({ preventScroll: true });
    if (list.scrollWidth > list.clientWidth + 1) {
      const pad = parseFloat(getComputedStyle(list).paddingInlineStart) || 0;
      const target = isRTL()
        ? tab.offsetLeft + tab.offsetWidth - list.clientWidth + pad
        : tab.offsetLeft - pad;
      list.scrollTo({ left: target, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    }
  };

  tabs.forEach((tab) => tab.addEventListener('click', () => select(tab)));
  list.addEventListener('keydown', (e) => {
    const i = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    const horizontal = getComputedStyle(list).flexDirection === 'row';
    const fwd = horizontal ? (isRTL() ? 'ArrowLeft' : 'ArrowRight') : 'ArrowDown';
    const back = horizontal ? (isRTL() ? 'ArrowRight' : 'ArrowLeft') : 'ArrowUp';
    let next = -1;
    if (e.key === fwd) next = (i + 1) % tabs.length;
    else if (e.key === back) next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    select(tabs[next], true);
  });

  new ResizeObserver(() => moveIndicator(current(), false)).observe(list);
  moveIndicator(current(), false);

  return (slug: string) => {
    const tab = tabs.find((t) => t.dataset.tab === slug);
    if (tab) select(tab);
  };
}

/* ------------------------------------------------------------------
   Dentists carousel (native scroll-snap + buttons)
------------------------------------------------------------------- */
function initCarousel() {
  const track = $('[data-carousel-track]');
  const prev = $<HTMLButtonElement>('[data-carousel-prev]');
  const next = $<HTMLButtonElement>('[data-carousel-next]');
  if (!track || !prev || !next) return;
  const items = $$('[data-carousel-item]', track);
  if (!items.length) return;

  const page = () => {
    const item = items[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 16;
    const perView = Math.max(1, Math.floor((track.clientWidth + gap) / (item + gap)));
    return perView * (item + gap);
  };
  const go = (dir: 1 | -1) =>
    track.scrollBy({ left: dir * (isRTL() ? -1 : 1) * page(), behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));

  // Disable a button once its end of the track is fully in view
  const watch = (item: Element, button: HTMLButtonElement) =>
    new IntersectionObserver(([entry]) => (button.disabled = entry.intersectionRatio > 0.9), {
      root: track,
      threshold: [0, 0.9, 1],
    }).observe(item);
  watch(items[0], prev);
  watch(items[items.length - 1], next);
}

/* ------------------------------------------------------------------
   Clinics: live "open now" status in Dubai time
------------------------------------------------------------------- */
type Hours = { weekdays: [string, string]; friday: [string, string] };
const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const fmtTime = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  const h12 = ((h + 11) % 12) + 1;
  const mins = m ? `:${String(m).padStart(2, '0')}` : '';
  return lang === 'ar' ? `${h12}${mins} ${h < 12 ? 'ص' : 'م'}` : `${h12}${mins} ${h < 12 ? 'am' : 'pm'}`;
};
const weekdayName = (day: number) =>
  new Intl.DateTimeFormat(lang, { weekday: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2024, 0, 7 + day)));
const hoursOn = (h: Hours, day: number): [string, string] | null => (day === 6 ? null : day === 5 ? h.friday : h.weekdays);

function dubaiNow() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dubai',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

function initClinicStatus() {
  const section = $('#clinics');
  if (!section) return;
  const s = JSON.parse(section.dataset.statusStrings || '{}') as Record<string, string>;
  const els = $$('[data-clinic-status]', section);
  const fill = (tpl: string, vars: Record<string, string>) =>
    Object.entries(vars).reduce((out, [k, v]) => out.replaceAll(`{${k}}`, v), tpl);

  const update = () => {
    const now = dubaiNow();
    for (const el of els) {
      const hours = JSON.parse(el.dataset.hours || '{}') as Hours;
      const today = hoursOn(hours, now.day);
      let state = 'closed';
      let text = '';
      if (today && now.minutes >= toMin(today[0]) && now.minutes < toMin(today[1])) {
        const left = toMin(today[1]) - now.minutes;
        state = left <= 60 ? 'soon' : 'open';
        text = fill(left <= 60 ? s.closingSoon : s.openUntil, { time: fmtTime(today[1]) });
      } else if (today && now.minutes < toMin(today[0])) {
        text = fill(s.closedOpens, { day: s.today, time: fmtTime(today[0]) });
      } else {
        for (let d = 1; d <= 7; d++) {
          const day = (now.day + d) % 7;
          const h = hoursOn(hours, day);
          if (!h) continue;
          text = fill(s.closedOpens, { day: d === 1 ? s.tomorrow : weekdayName(day), time: fmtTime(h[0]) });
          break;
        }
      }
      el.dataset.state = state;
      const label = $('[data-status-text]', el);
      if (label) label.textContent = text;
      el.hidden = false;
    }
  };
  update();
  setInterval(update, 60_000);
}

/* ------------------------------------------------------------------
   Booking form
------------------------------------------------------------------- */
function initBooking() {
  const form = $<HTMLFormElement>('[data-booking]');
  const success = $('[data-booking-success]');
  if (!form || !success) return;
  const msg = JSON.parse(form.dataset.messages || '{}') as Record<string, string>;
  const clinicInfo = JSON.parse(form.dataset.clinics || '{}') as Record<string, { name: string; phone: string }>;
  const submit = $<HTMLButtonElement>('[data-submit]', form)!;
  const alertBox = $('[data-form-alert]', form)!;
  const alertText = $('[data-form-alert-text]', form)!;
  const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement;
  const treatmentSelect = field('treatment') as HTMLSelectElement;

  // Prefill the treatment from any "Book a consultation" link that carries one
  document.addEventListener('click', (e) => {
    const link = (e.target as Element).closest<HTMLElement>('[data-book-treatment]');
    if (!link) return;
    const slug = link.dataset.bookTreatment!;
    if ([...treatmentSelect.options].some((o) => o.value === slug)) treatmentSelect.value = slug;
  });

  const setError = (name: string, message: string | null) => {
    const input = field(name);
    const error = $(`[data-error-for="${name}"]`, form);
    if (!input || !error) return;
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      error.textContent = message;
      error.hidden = false;
    } else {
      input.removeAttribute('aria-invalid');
      error.textContent = '';
      error.hidden = true;
    }
  };
  const rules: Record<string, (v: string) => boolean> = {
    name: (v) => v.trim().length >= 2,
    phone: (v) => v.replace(/\D/g, '').length >= 9,
    clinic: (v) => v !== '',
  };
  for (const name of Object.keys(rules)) {
    field(name).addEventListener('input', () => {
      if (field(name).getAttribute('aria-invalid') === 'true' && rules[name](field(name).value)) setError(name, null);
    });
    field(name).addEventListener('change', () => {
      if (field(name).getAttribute('aria-invalid') === 'true' && rules[name](field(name).value)) setError(name, null);
    });
  }

  const showFailure = (clinicId: string) => {
    const info = clinicInfo[clinicId] ?? Object.values(clinicInfo)[0];
    const [beforeTxt, afterTxt] = msg.failure.replace('{clinic}', info.name).split('{phone}');
    const link = document.createElement('a');
    link.href = `tel:${info.phone.replace(/\s+/g, '')}`;
    link.textContent = ltr(info.phone);
    alertText.replaceChildren(beforeTxt, link, afterTxt ?? '');
    alertBox.hidden = false;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submit.hasAttribute('data-loading')) return;
    alertBox.hidden = true;

    let firstInvalid: HTMLElement | null = null;
    for (const [name, ok] of Object.entries(rules)) {
      const valid = ok(field(name).value);
      setError(name, valid ? null : msg[name]);
      if (!valid && !firstInvalid) firstInvalid = field(name);
    }
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const data = new FormData(form);
    const clinicId = String(data.get('clinic'));
    const info = clinicInfo[clinicId];
    const treatment = treatmentSelect.value ? treatmentSelect.selectedOptions[0].text : '';
    const payload = {
      name: String(data.get('name')).trim(),
      phone: String(data.get('phone')).trim(),
      clinic: info?.name ?? clinicId,
      treatment,
      preferredTime: String(data.get('time') ?? ''),
      message: String(data.get('message') ?? '').trim(),
      language: lang,
      page: location.href,
    };

    // aria-disabled (not disabled) so keyboard focus stays on the button while sending
    submit.setAttribute('data-loading', '');
    submit.setAttribute('aria-disabled', 'true');
    const endpoint = form.dataset.endpoint || '';
    try {
      if (!endpoint) throw new Error('Booking endpoint is not configured');
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = $('[data-success-text]', success)!;
      text.textContent = msg.success
        .replace('{name}', payload.name.split(/\s+/)[0])
        .replace('{clinic}', payload.clinic)
        .replace('{phone}', ltr(payload.phone));
      form.hidden = true;
      success.hidden = false;
      $('[data-success-title]', success)?.focus();
    } catch {
      showFailure(clinicId);
    } finally {
      submit.removeAttribute('data-loading');
      submit.removeAttribute('aria-disabled');
    }
  });

  $('[data-booking-reset]', success)?.addEventListener('click', () => {
    form.reset();
    success.hidden = true;
    form.hidden = false;
    field('name').focus();
  });
}

/* ------------------------------------------------------------------
   Mobile action bar + call sheet
------------------------------------------------------------------- */
function initMobileBar() {
  const bar = $('[data-mobile-bar]');
  const heroCtas = $('[data-hero-ctas]');
  const book = $('#book');
  const footer = $('footer');
  if (!bar || !heroCtas || !book) return;
  const seen = new Map<Element, boolean>([
    [heroCtas, true],
    [book, false],
  ]);
  if (footer) seen.set(footer, false);
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) seen.set(entry.target, entry.isIntersecting);
    const show = !seen.get(heroCtas) && !seen.get(book) && !(footer && seen.get(footer));
    bar.toggleAttribute('data-visible', show);
    bar.inert = !show;
  });
  for (const el of seen.keys()) io.observe(el);

  const sheet = $<HTMLDialogElement>('[data-call-sheet]');
  const openBtn = $('[data-call-open]');
  if (!sheet || !openBtn) return;
  openBtn.addEventListener('click', () => sheet.showModal());
  $('[data-call-close]', sheet)?.addEventListener('click', () => sheet.close());
  sheet.addEventListener('click', (e) => {
    const r = sheet.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) sheet.close();
  });
}

/* ------------------------------------------------------------------
   Theme toggle (html[data-theme] is set before paint in Base.astro)
------------------------------------------------------------------- */
function initTheme() {
  const root = document.documentElement;
  const toggles = $$('[data-theme-toggle]');
  const meta = $<HTMLMetaElement>('meta[name="theme-color"]');
  const system = matchMedia('(prefers-color-scheme: dark)');
  const stored = () => {
    try {
      return localStorage.getItem('ds-theme');
    } catch {
      return null;
    }
  };

  const sync = () => {
    const dark = root.dataset.theme === 'dark';
    toggles.forEach((b) => b.setAttribute('aria-pressed', String(dark)));
    if (meta) meta.content = dark ? '#0d111b' : '#f8f9fc';
  };

  // A theme flip changes nearly every color at once; switch instantly instead of cross-fading
  // (the toggle's own icon swap is exempt so it still animates).
  const apply = (theme: 'light' | 'dark') => {
    const freeze = document.createElement('style');
    freeze.textContent = '*:not(.theme-icon):not(.switch):not(.switch-thumb),*::before,*::after{transition:none!important}';
    document.head.append(freeze);
    root.dataset.theme = theme;
    sync();
    void getComputedStyle(document.body).opacity;
    requestAnimationFrame(() => freeze.remove());
  };

  toggles.forEach((b) =>
    b.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(next);
      try {
        localStorage.setItem('ds-theme', next);
      } catch {
        /* private mode: the choice just won't persist */
      }
    }),
  );
  // Until someone picks, keep following the system setting
  system.addEventListener('change', (e) => {
    if (!stored()) apply(e.matches ? 'dark' : 'light');
  });
  sync();
}

/* ------------------------------------------------------------------
   Boot
------------------------------------------------------------------- */
initTheme();
initReveal();
initNavState();
initMenu();
$$('[data-compare]').forEach(initCompare);
const showTreatment = (() => {
  const tabsRoot = $('[data-tabs]');
  return tabsRoot ? initTabs(tabsRoot) : null;
})();
document.addEventListener('click', (e) => {
  const link = (e.target as Element).closest<HTMLElement>('[data-show-treatment]');
  if (link && showTreatment) showTreatment(link.dataset.showTreatment!);
});
initCarousel();
initClinicStatus();
initBooking();
initMobileBar();
