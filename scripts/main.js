document.addEventListener("DOMContentLoaded", () => {
  // Scroll to sets
  const scrollBtn = document.getElementById("scrollToSets");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      document.getElementById("djSets").scrollIntoView({ behavior: "smooth" });
    });
  }

  // Load sets
  fetch("data/djsets.json")
    .then(res => res.json())
    .then(data => renderSets(data))
    .catch(err => console.error("Error loading DJ sets:", err));
});

function renderSets(sets) {
  const container = document.querySelector(".grid");
  container.innerHTML = "";

  sets.forEach(set => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${set.title}</h3>
      <p>${set.description}</p>
      <div class="video-wrapper">
        <iframe src="${set.embedUrl}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
    `;
    container.appendChild(card);
  });
}