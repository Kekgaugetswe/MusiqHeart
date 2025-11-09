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

  const safeMixes = mixes.filter(mix => 
    mix.embedUrl && !mix.embedUrl.includes("unavailable") && mix.embedUrl.startsWith("https://www.youtube.com/embed/")
  );

  if (safeMixes.length === 0) {
    track.innerHTML = `<p style="text-align:center; color:#aaa;">No available mixes at the moment.</p>`;
    return;
  }

  track.innerHTML = safeMixes.map(mix => `
    <div class="card">
      <h3>${mix.title}</h3>
      <p>${mix.description || "Curated Afro & Deep House energy."}</p>
      <div class="video-wrapper">
        <iframe
          src="${mix.embedUrl}"
          title="${mix.title}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
    </div>
  `).join("");
}
