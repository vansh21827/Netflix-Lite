/* ==========================================================
   FAVORITES CONTROLLER
========================================================== */

import {
    state,
    setFavorites,
    addFavorite,
    removeFavorite,
    isFavorite
} from "./state.js";

import {
    loadFavorites,
    saveFavorites
} from "./storage.js";

import {
    renderFavorites,
    updateFavoriteCount,
    showToast,
    openFavoritesSidebar,
    closeFavoritesSidebar,
    renderMovies,
    setSectionTitle
} from "./ui.js";

/* ==========================================================
   INITIALIZE
========================================================== */

export function initializeFavorites() {

    const favorites = loadFavorites();

    setFavorites(favorites);

    refreshFavoritesUI();

}

/* ==========================================================
   REFRESH UI
========================================================== */

export function refreshFavoritesUI() {

    updateFavoriteCount();

    renderFavorites();

}

/* ==========================================================
   TOGGLE FAVORITE
========================================================== */

export function toggleMovieFavorite(movie) {

    if (isFavorite(movie.id)) {

        removeFavorite(movie.id);

        showToast("Removed from Favorites");

    }

    else {

        addFavorite(movie);

        showToast("Added to Favorites");

    }

    saveFavorites(state.favorites);

    refreshFavoritesUI();

    if (state.view === "favorites") {

        renderMovies(state.favorites);

    }

}

/* ==========================================================
   REMOVE
========================================================== */

export function removeFavoriteMovie(movieId) {

    removeFavorite(movieId);

    saveFavorites(state.favorites);

    refreshFavoritesUI();

    if (state.view === "favorites") {

        renderMovies(state.favorites);

    }

    showToast("Favorite Removed");

}

/* ==========================================================
   FAVORITES VIEW
========================================================== */

export function showFavoritesView() {

    setSectionTitle("❤️ My Favorites");

    renderMovies(state.favorites);

}

/* ==========================================================
   OPEN SIDEBAR
========================================================== */

export function openFavorites() {

    refreshFavoritesUI();

    openFavoritesSidebar();

}

/* ==========================================================
   CLOSE SIDEBAR
========================================================== */

export function closeFavorites() {

    closeFavoritesSidebar();

}

/* ==========================================================
   FAVORITE STATUS
========================================================== */

export function movieIsFavorite(movieId) {

    return isFavorite(movieId);

}
export function showPopularView() {

    const sectionTitle =
        document.getElementById("sectionTitle");

    sectionTitle.textContent =
        "🔥 Popular Movies";

    renderMovies(state.movies);

}