document.addEventListener("DOMContentLoaded", () => {
  // Scroll to sets
  const scrollBtn = document.getElementById("scrollToSets");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      document.getElementById("djSets").scrollIntoView({ behavior: "smooth" });
    });
  }

  // Load DJ sets
  fetch("data/djsets.json")
    .then(res => res.json())
    .then(data => renderSets(data))
    .catch(err => console.error("Error loading DJ sets:", err));

  // Load Appreciation Mix Series
  fetch("data/appreciation.json")
    .then(res => res.json())
    .then(data => renderCarousel(data))
    .catch(err => console.error("Error loading Appreciation Mix Series:", err));
});

function renderSets(sets) {
  const container = document.querySelector(".grid");
  container.innerHTML = sets.map(set => `
    <div class="card">
      <h3>${set.title}</h3>
      <p>${set.description}</p>
      <div class="video-wrapper">
        <iframe
          src="${set.embedUrl}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
    </div>
  `).join("");
}

// Appreciation Mix carousel
function renderCarousel(mixes) {
  const track = document.querySelector(".carousel-track");
  if (!track) return;

  track.innerHTML = mixes.map(mix => `
    <div class="carousel-item">
      <iframe
        src="${mix.embedUrl}"
        title="${mix.title}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
      <p>${mix.title}</p>
    </div>
  `).join("");

  const items = Array.from(track.children);
  let index = 0;

  const updateCarousel = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  document.querySelector(".carousel-btn.next")?.addEventListener("click", () => {
    index = (index + 1) % items.length;
    updateCarousel();
  });

  document.querySelector(".carousel-btn.prev")?.addEventListener("click", () => {
    index = (index - 1 + items.length) % items.length;
    updateCarousel();
  });
}