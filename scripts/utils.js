async function loadComponent(id, file) {
  let container = document.getElementById(id);
  if (!container) {
    container = document.createElement('div');
    container.id = id;
    if (id === 'navbar') document.body.prepend(container);
    else document.body.append(container);
  }
  try {
    const response = await fetch(`${file}?v=20261122-6`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    container.innerHTML = await response.text();
    if (id === 'navbar') {
      const currentPage = location.pathname.split('/').pop() || 'index.html';
      container.querySelectorAll('a').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
      });
    }
    container.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  } catch (error) {
    console.error(`Unable to load ${file}:`, error);
    const link = document.createElement('a');
    link.href = id === 'navbar' ? 'index.html' : 'https://www.youtube.com/@musiqheartza';
    link.textContent = id === 'navbar' ? 'MusiqHeart — DJ Sets' : 'MusiqHeart on YouTube';
    container.replaceChildren(link);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('navbar', 'components/navbar.html');
  loadComponent('footer', 'components/footer.html');
});
