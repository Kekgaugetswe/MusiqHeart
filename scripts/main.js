const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function makeCard(mix, isEpisode) {
  const article = document.createElement('article');
  article.className = 'mix-card';
  const link = document.createElement('a');
  link.href = `https://www.youtube.com/watch?v=${encodeURIComponent(mix.videoId)}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', `Watch ${mix.title}${isEpisode ? `, episode ${mix.episode}` : ''} on YouTube (opens in a new tab)`);
  const thumbnail = document.createElement('div');
  thumbnail.className = 'thumbnail-wrap';
  const image = document.createElement('img');
  image.src = mix.thumbnail;
  image.alt = '';
  image.loading = 'lazy';
  image.width = 1280;
  image.height = 720;
  const play = document.createElement('span');
  play.className = 'card-play';
  play.textContent = '▶';
  play.setAttribute('aria-hidden', 'true');
  thumbnail.append(image, play);
  if (mix.duration) {
    const duration = document.createElement('span');
    duration.className = 'duration';
    duration.textContent = mix.duration;
    thumbnail.append(duration);
  }
  const copy = document.createElement('div');
  copy.className = 'card-copy';
  const label = document.createElement('span');
  label.className = 'card-label';
  label.textContent = isEpisode ? `Episode ${mix.episode}` : 'Appreciation Series';
  const title = document.createElement('h3');
  title.textContent = mix.title;
  copy.append(label, title);
  if (mix.description) {
    const description = document.createElement('p');
    description.textContent = mix.description;
    copy.append(description);
  }
  link.append(thumbnail, copy);
  article.append(link);
  return article;
}

async function loadCollection(url, container, isEpisode) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const mixes = await response.json();
    if (!Array.isArray(mixes) || !mixes.length) throw new Error('Empty collection');
    container.replaceChildren(...mixes.map(mix => makeCard(mix, isEpisode)));
    return true;
  } catch (error) {
    const message = document.createElement('p');
    message.className = 'loading-message';
    message.textContent = 'The mixes could not load. Open the playlist link to listen on YouTube.';
    container.replaceChildren(message);
    console.error('Unable to load collection:', error);
    return false;
  }
}

async function initSets() {
  const track = document.getElementById('mix-track');
  const [, mixesLoaded] = await Promise.all([
    loadCollection('data/djsets.json?v=20261122-2', document.getElementById('episode-grid'), true),
    loadCollection('data/appreciation.json?v=20261122-2', track, false)
  ]);
  if (!mixesLoaded) return;
  document.querySelector('.carousel-controls').hidden = false;
  const previous = document.getElementById('previous-mix');
  const next = document.getElementById('next-mix');
  function updateControls() {
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  }
  function move(direction) {
    const card = track.querySelector('.mix-card');
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
    track.scrollBy({ left: direction * step, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', updateControls, { passive: true });
  new ResizeObserver(updateControls).observe(track);
  updateControls();
}

initSets();
