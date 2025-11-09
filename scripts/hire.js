document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.querySelector("#hireSection .grid");

  try {
    const response = await fetch("data/hire.json");
    const packages = await response.json();

    grid.innerHTML = packages.map(pkg => `
      <div class="card">
        <img src="${pkg.image}" alt="${pkg.title}" />
        <div class="card-content">
          <h3>${pkg.title}</h3>
          <p>${pkg.description}</p>
          <ul>
            ${pkg.features.map(f => `<li>${f}</li>`).join("")}
          </ul>
          <h4>${pkg.price}</h4>
          <a class="cta" href="https://wa.me/27620205410?text=Hi%20MusiqHeart,%20I'm%20interested%20in%20the%20${encodeURIComponent(pkg.title)}%20package.">
            Book Now
          </a>
        </div>
      </div>
    `).join("");

  } catch (error) {
    console.error("Error loading packages:", error);
    grid.innerHTML = `<p>Unable to load packages at the moment.</p>`;
  }
});