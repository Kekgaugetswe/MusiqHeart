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
async function renderCarousel(mixes) {
  const track = document.querySelector(".carousel-track");
  if (!track) return;

  // Filter out invalid or broken embeds
  const validMixes = [];
  for (const mix of mixes) {
    try {
      if (!mix.embedUrl || !mix.embedUrl.startsWith("https://www.youtube.com/embed/")) continue;

      // Optional: lightweight test if video exists
      const res = await fetch(mix.embedUrl, { method: "HEAD" });
      if (!res.ok) continue;

      validMixes.push(mix);
    } catch (e) {
      console.warn(`Skipping broken video: ${mix.title}`, e);
    }
  }

  if (validMixes.length === 0) {
    track.innerHTML = `<p style="text-align:center; color:#aaa;">No available mixes at the moment.</p>`;
    return;
  }

  // Render as grid cards like DJ Sets
  track.innerHTML = validMixes.map(mix => `
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
