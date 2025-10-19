const API_KEY = "326d2be7";
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;
let allMovies = [];

// --- ON PAGE LOAD ---
window.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search__input");
  const searchButton = document.getElementById("search__btn");

  // Optional default fetch for preview
  fetchMovies("Good");

  // Click to search
  if (searchButton) {
    searchButton.addEventListener("click", handleSearch);
  }

  // Press Enter to search
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    });
  }
});

// --- FETCH MOVIES ---
async function fetchMovies(searchTerm) {
  const loading = document.getElementById("watchMovie");
  if (loading) loading.classList.add("loading");

  try {
    const response = await fetch(`${API_URL}&s=${encodeURIComponent(searchTerm)}`);
    const data = await response.json();

    console.log("🎥 API Response:", data); // ✅ Verify fetch response structure

    if (data.Response === "True" && Array.isArray(data.Search)) {
      allMovies = data.Search;
      console.log("✅ Movies Fetched:", allMovies); // ✅ Log movies array
      showSuccessAnimation();
    } else {
      console.warn("⚠️ No results found or invalid response format");
      showError("No movies found.");
    }
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    showError("Failed to load movies. Please try again.");
  } finally {
    if (loading) loading.classList.remove("loading");
  }
}

// --- SEARCH HANDLER ---
function handleSearch() {
  const searchInput = document.getElementById("search__input");
  const query = searchInput ? searchInput.value.trim() : "";

  if (!query) {
    alert("Please enter a movie name to search!");
    return;
  }

  console.log("🔍 Searching for:", query);
  // Redirect to movies page
  window.location.href = `movies.html?search=${encodeURIComponent(query)}`;
}

// --- SUCCESS ANIMATION ---
function showSuccessAnimation() {
  const watchMovie = document.getElementById("watchMovie");
  if (!watchMovie) return;
  watchMovie.classList.add("success");
  setTimeout(() => watchMovie.classList.remove("success"), 800);
}

// --- ERROR HANDLER ---
function showError(message) {
  const watchMovie = document.getElementById("watchMovie");
  if (watchMovie) {
    watchMovie.innerHTML = `<p style="text-align:center; color:#6030b1;">${message}</p>`;
    setTimeout(() => {
      watchMovie.innerHTML = `
        <img class="movie movie1" src="./assets/undraw_home-cinema_jdm1.svg" alt="cinema illustration" />
        <div class="loading__dots"><div class="bento-menu__dot loading__dot movie1"></div></div>
      `;
    }, 2000);
  }
}

// --- MOBILE MENU TOGGLE ---
function toggleMenu() {
  const menu = document.querySelector(".show__menu");
  const bento = document.querySelector(".bento-menu");
  if (!menu || !bento) return;
  menu.classList.toggle("active");
  bento.classList.toggle("active");
}
