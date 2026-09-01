// Hudson Valley Auto Interiors — page interactions

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

mainNav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') mainNav.classList.remove('open');
});

// Archive search — filters the vehicle cards live
const archiveSearch = document.getElementById('archiveSearch');
const headerSearch = document.getElementById('headerSearch');
const cards = Array.from(document.querySelectorAll('.vehicle-card'));
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

// Header search mirrors into the archive section and scrolls to it
headerSearch.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    archiveSearch.value = headerSearch.value;
    filterArchive(headerSearch.value);
    document.getElementById('archive').scrollIntoView({ behavior: 'smooth' });
  }
});

// Newsletter (stub — no backend yet)
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMsg = document.getElementById('newsletterMsg');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  newsletterMsg.hidden = false;
  newsletterForm.reset();
});
