// Opening hours: [open, close] in 24h decimal, keyed by day (0 = Sunday)
const HOURS = {
  0: [8, 16],
  1: [7, 17],
  2: [7, 17],
  3: [7, 17],
  4: [7, 17],
  5: [7, 18],
  6: [8, 18],
};

const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');

// Mobile menu
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
document.querySelectorAll('.nav__links a').forEach((link) =>
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Nav border on scroll
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Menu tabs
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute('aria-selected', selected);
    t.tabIndex = selected ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
  });
  tab.focus();
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') selectTab(tabs[(i + 1) % tabs.length]);
    if (e.key === 'ArrowLeft') selectTab(tabs[(i - 1 + tabs.length) % tabs.length]);
  });
});

// Open / closed status + highlight today's hours
function formatHour(h) {
  const hr = Math.floor(h);
  const min = Math.round((h - hr) * 60);
  const suffix = hr >= 12 ? 'pm' : 'am';
  const display = hr % 12 || 12;
  return min ? `${display}:${String(min).padStart(2, '0')}${suffix}` : `${display}${suffix}`;
}

function updateStatus() {
  const now = new Date();
  const day = now.getDay();
  const time = now.getHours() + now.getMinutes() / 60;
  const [open, close] = HOURS[day];
  const status = document.getElementById('open-status');

  if (time >= open && time < close) {
    status.textContent = `Open now · until ${formatHour(close)}`;
    status.classList.remove('is-closed');
  } else {
    const opensToday = time < open;
    const nextOpen = opensToday ? open : HOURS[(day + 1) % 7][0];
    status.textContent = `Closed · opens ${opensToday ? 'today' : 'tomorrow'} at ${formatHour(nextOpen)}`;
    status.classList.add('is-closed');
  }

  document.querySelectorAll('#hours tr').forEach((row) =>
    row.classList.toggle('is-today', Number(row.dataset.day) === day)
  );
}
updateStatus();
setInterval(updateStatus, 60 * 1000);

// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Newsletter (front-end only — connect to your email provider)
document.getElementById('newsletter').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('email');
  document.getElementById('newsletter-msg').textContent = `Thanks! We'll be in touch at ${input.value} ☕`;
  input.value = '';
});

document.getElementById('year').textContent = new Date().getFullYear();
