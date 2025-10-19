const API_KEY = "326d2be7";
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

let allMovies = []; // stores all fetched movies

// INITIAL LOAD
window.addEventListener("DOMContentLoaded", () => {
  fetchMovies("Good"); // default search
  setupSearchHandlers();
});

// FETCH MOVIES FROM OMDB
async function fetchMovies(searchTerm) {
  const movieContainer = document.getElementById("movie-container");
  const loading = document.getElementById("watchMovie");

  movieContainer.innerHTML = "";
  loading.classList.add("loading");

  try {
    const response = await fetch(`${API_URL}&s=${encodeURIComponent(searchTerm)}`);
    const data = await response.json();
    console.log("API Response:", data); // ✅ check API results

    if (data.Response === "True" && data.Search) {
      allMovies = data.Search;
      renderMovies(allMovies.slice(0, 6)); // show only first 6
    } else {
      movieContainer.innerHTML = `
        <p style="text-align:center; color:#6030b1; font-size:20px;">No movies found.</p>`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    movieContainer.innerHTML = `
      <p style="text-align:center; color:red;">Failed to load movies. Please try again.</p>`;
  } finally {
    loading.classList.remove("loading");
  }
}

// RENDER MOVIES TO THE PAGE
function renderMovies(movies) {
  const movieContainer = document.getElementById("movie-container");
  const template = document.getElementById("movies__template").firstElementChild;

  movieContainer.innerHTML = "";

  movies.forEach((movie) => {
    const clone = template.cloneNode(true);
    clone.style.display = "flex";
    clone.querySelector(".movie__poster").src =
      movie.Poster !== "N/A" ? movie.Poster : "./assets/placeholder.png";
    clone.querySelector(".movie__title").textContent = movie.Title;
    clone.querySelector(".movie__year").textContent = `Year: ${movie.Year}`;
    clone.querySelector(".movie__imdbID").textContent = `IMDb ID: ${movie.imdbID}`;
    movieContainer.appendChild(clone);
  });
}

// SEARCH HANDLING
function handleSearch() {
  const searchInput = document.getElementById("search__input");
  const query = searchInput.value.trim();

  if (query) {
    fetchMovies(query);
  } else {
    alert("Please enter a movie name to search!");
  }
}

function setupSearchHandlers() {
  const searchButton = document.querySelector(".search__btn--wrapper");
  const searchInput = document.getElementById("search__input");

  searchButton.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });
}

// MOBILE MENU
function toggleMenu() {
  const menu = document.querySelector(".show__menu");
  const bento = document.querySelector(".bento-menu");
  menu.classList.toggle("active");
  bento.classList.toggle("active");
}
