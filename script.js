// Opening hours: [open, close] in 24h decimal (7.5 = 7:30am), keyed by day (0 = Sunday).
// null = closed. Keep in sync with the hours table in index.html.
const HOURS = {
  0: [9, 17],
  1: null,
  2: null,
  3: [7.5, 13],
  4: [7.5, 13],
  5: [7.5, 13],
  6: [9, 17],
};
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

function nextOpening(day, time) {
  for (let offset = 0; offset < 7; offset++) {
    const d = (day + offset) % 7;
    const hours = HOURS[d];
    if (hours && (offset > 0 || time < hours[0])) {
      const when = offset === 0 ? 'today' : offset === 1 ? 'tomorrow' : DAY_NAMES[d];
      return `${when} at ${formatHour(hours[0])}`;
    }
  }
  return null;
}

function updateStatus() {
  // Always use Singapore time, wherever the visitor is
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore' }));
  const day = now.getDay();
  const time = now.getHours() + now.getMinutes() / 60;
  const today = HOURS[day];
  const status = document.getElementById('open-status');

  if (today && time >= today[0] && time < today[1]) {
    status.textContent = `Open now · until ${formatHour(today[1])}`;
    status.classList.remove('is-closed');
  } else {
    const next = nextOpening(day, time);
    status.textContent = next ? `Closed · opens ${next}` : 'Closed';
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

document.getElementById('year').textContent = new Date().getFullYear();
