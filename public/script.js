'use strict';

const themeToggle = document.getElementById('theme-toggle');

function applyTheme(dark) {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  themeToggle.setAttribute('aria-pressed', String(dark));
}

// Storage can be unavailable in privacy-restricted browsers.
try {
  applyTheme(localStorage.getItem('portfolio-theme') === 'dark');
} catch {
  applyTheme(false);
}
themeToggle.hidden = false;
themeToggle.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  applyTheme(dark);
  try {
    localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
  } catch {
    // The toggle still works for this visit when persistence is blocked.
  }
});

const GITHUB_USER = 'talentweb11';
document.getElementById('year').textContent = new Date().getFullYear();

const backToTop = document.getElementById('back-to-top');
const hero = document.getElementById('hero');

function updateBackToTop() {
  backToTop.hidden = hero.getBoundingClientRect().bottom > 0;
}

// Observe the section boundary, including restored scroll positions and resizing.
const heroObserver = new IntersectionObserver(updateBackToTop);
heroObserver.observe(hero);
updateBackToTop();

backToTop.addEventListener('click', () => {
  document.getElementById('hero-title').focus({ preventScroll: true });
  // The stylesheet enables smooth scrolling unless reduced motion is preferred.
  window.scrollTo({ top: 0, behavior: 'auto' });
});

async function loadRepositories() {
  const status = document.getElementById('repo-status');
  const grid = document.getElementById('repo-grid');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(GITHUB_USER)}/repos?sort=updated&per_page=12`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal
    });
    if (!response.ok) throw new Error('GitHub request failed');
    const repositories = await response.json();
    if (!Array.isArray(repositories)) throw new Error('Unexpected response');
    const publicRepositories = repositories.filter(repo => !repo.private).slice(0, 12);
    if (!publicRepositories.length) {
      status.textContent = 'No public repositories to show yet.';
      return;
    }
    const cards = document.createDocumentFragment();
    for (const repo of publicRepositories) {
      const card = document.createElement('article');
      card.className = 'repo-card';
      const heading = document.createElement('h3');
      const link = document.createElement('a');
      // Construct a trusted GitHub URL; never insert API content as HTML.
      link.href = `https://github.com/${encodeURIComponent(GITHUB_USER)}/${encodeURIComponent(repo.name)}`;
      link.textContent = repo.name;
      heading.append(link);
      const description = document.createElement('p');
      description.textContent = repo.description || 'No description provided.';
      const meta = document.createElement('div');
      meta.className = 'repo-meta';
      const language = document.createElement('span');
      language.className = 'repo-language';
      language.textContent = repo.language || 'Not specified';
      const stars = document.createElement('span');
      const count = Number.isFinite(repo.stargazers_count) ? repo.stargazers_count : 0;
      stars.textContent = `☆ ${count.toLocaleString()}`;
      stars.setAttribute('aria-label', `${count} stars`);
      meta.append(language, stars);
      card.append(heading, description, meta);
      cards.append(card);
    }
    grid.replaceChildren(cards);
    status.textContent = '';
  } catch {
    status.textContent = 'Repositories could not be loaded. Please visit my GitHub profile or try again later.';
  } finally {
    clearTimeout(timeout);
  }
}

loadRepositories();
