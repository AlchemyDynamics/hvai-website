// Hudson Valley Auto Interiors — page interactions

// ============ Tab router ============
const TABS = ['home', 'restorations', 'services', 'chairs', 'archive', 'about'];
const navLinks = Array.from(document.querySelectorAll('.main-nav a[data-tab]'));

function showTab(id) {
  document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
  window.scrollTo(0, 0);
}

function route() {
  const hash = location.hash.slice(1);
  if (TABS.includes(hash)) {
    showTab(hash);
  } else if (hash === 'contact') {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  } else {
    showTab('home');
  }
}

window.addEventListener('hashchange', route);

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

mainNav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') mainNav.classList.remove('open');
});

// ============ Restorations listing ============
const restList = document.getElementById('restList');
const restSearch = document.getElementById('restSearch');
const restMake = document.getElementById('restMake');
const restNoResults = document.getElementById('restNoResults');

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const byMake = new Map();
RESTORATIONS.forEach((r) => {
  if (!byMake.has(r.make)) byMake.set(r.make, []);
  byMake.get(r.make).push(r);
});
const makes = Array.from(byMake.keys()).sort();

makes.forEach((m) => {
  const opt = document.createElement('option');
  opt.value = m;
  opt.textContent = m + ' (' + byMake.get(m).length + ')';
  restMake.appendChild(opt);
});

function rowMatch(r, q) {
  return !q || (r.make + ' ' + r.model + ' ' + r.year + ' ' + r.work + ' ' + r.trim).toLowerCase().includes(q);
}

function renderRestorations() {
  const q = restSearch.value.trim().toLowerCase();
  const makeFilter = restMake.value;
  let html = '';
  let total = 0;

  makes.forEach((m) => {
    if (makeFilter && m !== makeFilter) return;
    const rows = byMake.get(m).filter((r) => rowMatch(r, q));
    if (!rows.length) return;
    total += rows.length;
    const open = q || makeFilter ? ' open' : '';
    html += '<details class="rest-group"' + open + '><summary>' +
      '<span class="rest-make">' + esc(m) + '</span>' +
      '<span class="rest-count">' + rows.length + ' restoration' + (rows.length === 1 ? '' : 's') + '</span>' +
      '</summary><div class="rest-rows">';
    rows.forEach((r) => {
      const desc = [r.model, r.trim].filter(Boolean).join(' — ');
      html += '<div class="rest-row">' +
        '<span class="rest-year">' + esc(r.year || '—') + '</span>' +
        '<span><span class="rest-model">' + esc(desc || 'Restoration') + '</span>' +
        (r.work ? ' <span class="rest-work">· ' + esc(r.work) + '</span>' : '') +
        '</span></div>';
    });
    html += '</div></details>';
  });

  restList.innerHTML = html;
  restNoResults.hidden = total > 0;
}

restSearch.addEventListener('input', renderRestorations);
restMake.addEventListener('change', renderRestorations);
renderRestorations();

// ============ Archive search — filters the vehicle cards live ============
const archiveSearch = document.getElementById('archiveSearch');
const cards = Array.from(document.querySelectorAll('#archiveGrid .vehicle-card'));
const noResults = document.getElementById('noResults');

function filterArchive(query) {
  const q = query.trim().toLowerCase();
  let visible = 0;
  cards.forEach((card) => {
    const match = !q || card.dataset.search.includes(q) || card.querySelector('h3').textContent.toLowerCase().includes(q);
    card.hidden = !match;
    if (match) visible++;
  });
  noResults.hidden = visible > 0;
}

archiveSearch.addEventListener('input', () => filterArchive(archiveSearch.value));

// ============ Newsletter (stub — no backend yet) ============
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMsg = document.getElementById('newsletterMsg');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  newsletterMsg.hidden = false;
  newsletterForm.reset();
});

// Initial route
route();
