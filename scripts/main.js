const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function youtubePlayer(videoId, title, lazy = true) {
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?playsinline=1&rel=0`;
  iframe.title = title;
  iframe.loading = lazy ? 'lazy' : 'eager';
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  return iframe;
}
function makeCard(mix, isEpisode) {
  const article = document.createElement('article');
  article.className = 'mix-card';
  const media = document.createElement('div');
  media.className = 'card-media';
  media.append(youtubePlayer(mix.videoId, mix.title));
  const copy = document.createElement('div');
  copy.className = 'card-copy';
  const title = document.createElement('h3');
  title.textContent = mix.title;
  const metadata = document.createElement('div');
  metadata.className = 'poster-meta';
  const label = document.createElement('span');
  label.className = 'card-label';
  label.textContent = isEpisode ? `Episode ${mix.episode}` : 'Appreciation Series';
  metadata.append(label);
  if (mix.duration) {
    const duration = document.createElement('span');
    duration.className = 'poster-duration';
    duration.textContent = mix.duration;
    metadata.append(duration);
  }
  copy.append(title, metadata);
  const actions = document.createElement('div');
  actions.className = 'card-actions';
  const link = document.createElement('a');
  link.className = 'card-youtube-link';
  link.href = `https://www.youtube.com/watch?v=${encodeURIComponent(mix.videoId)}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Watch on YouTube';
  actions.append(link);
  article.append(media, copy, actions);
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
    loadCollection('data/djsets.json?v=20261122-6', document.getElementById('episode-grid'), true),
    loadCollection('data/appreciation.json?v=20261122-6', track, false)
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

// Use YouTube's own preview and controls, without a custom play overlay.
const featuredArt = document.querySelector('.featured-art');
const featuredSlot = document.createElement('div');
featuredSlot.className = 'featured-media';
const videoId = new URL(featuredArt.href).searchParams.get('v');
featuredSlot.append(youtubePlayer(videoId, 'Golden Hour Mix — Episode 03', false));
featuredArt.replaceWith(featuredSlot);
const featuredButton = document.querySelector('.featured-copy .button-primary');
featuredButton.textContent = 'Watch on YouTube';
