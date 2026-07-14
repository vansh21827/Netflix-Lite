/* ==========================================================
   UI CONTROLLER
========================================================== */

import {
    IMAGE_BASE_URL,
    PLACEHOLDER_POSTER
} from "./config.js";

import {
    createMovieCard,
    createEmptyCard
} from "./cards.js";

import { state } from "./state.js";

/* ==========================================================
   DOM ELEMENTS
========================================================== */

const moviesGrid = document.getElementById("moviesGrid");

const loader = document.getElementById("loader");

const noResults = document.getElementById("noResults");

const errorMessage = document.getElementById("errorMessage");

const toast = document.getElementById("toast");

const favoriteCount = document.getElementById("favoriteCount");

const sectionTitle = document.getElementById("sectionTitle");

const favoritesList = document.getElementById("favoritesList");

const favoritesSidebar = document.getElementById("favoritesSidebar");

const modal = document.getElementById("movieModal");

const modalBody = document.getElementById("modalBody");

/* ==========================================================
   MOVIE GRID
========================================================== */

export function clearMovies() {

    moviesGrid.innerHTML = "";

}

export function renderMovies(movies = []) {

    clearMovies();

    if (!movies.length) {

        showNoResults();

        return;

    }

    hideNoResults();

    const fragment = document.createDocumentFragment();

    movies.forEach(movie => {

        fragment.appendChild(

            createMovieCard(movie)

        );

    });

    moviesGrid.appendChild(fragment);

}

export function appendMovies(movies = []) {

    if (!movies.length) return;

    const fragment = document.createDocumentFragment();

    movies.forEach(movie => {

        fragment.appendChild(

            createMovieCard(movie)

        );

    });

    moviesGrid.appendChild(fragment);

}

/* ==========================================================
   FAVORITES
========================================================== */

export function renderFavorites() {

    favoritesList.innerHTML = "";

    if (!state.favorites.length) {

        favoritesList.appendChild(

            createEmptyCard(

                "No Favorite Movies Yet"

            )

        );

        return;

    }

    const fragment = document.createDocumentFragment();

    state.favorites.forEach(movie => {

        fragment.appendChild(

            createMovieCard(movie)

        );

    });

    favoritesList.appendChild(fragment);

}

export function updateFavoriteCount() {

    favoriteCount.textContent =

        state.favorites.length;

}

/* ==========================================================
   SECTION TITLE
========================================================== */

export function setSectionTitle(title) {

    sectionTitle.textContent = title;

}

/* ==========================================================
   MOVIE MODAL
========================================================== */

export function openMovieModal(movie) {

    const poster = movie.poster_path

        ? `${IMAGE_BASE_URL}${movie.poster_path}`

        : PLACEHOLDER_POSTER;

    const title =

        movie.title ||

        movie.name ||

        "Untitled";

    const rating =

        movie.vote_average

            ? movie.vote_average.toFixed(1)

            : "N/A";

    modalBody.innerHTML = `

        <div class="modal-body">

            <img
                src="${poster}"
                alt="${title}"
            >

            <div class="modal-info">

                <h2>

                    ${title}

                </h2>

                <div class="modal-meta">

                    <span>

                        ⭐ ${rating}

                    </span>

                    <span>

                        ${movie.release_date || "N/A"}

                    </span>

                    <span>

                        ${movie.runtime || "N/A"} min

                    </span>

                </div>

                <p>

                    ${movie.overview || "No description available."}

                </p>

            </div>

        </div>

    `;

    modal.classList.add("show");

}

export function closeMovieModal() {

    modal.classList.remove("show");

    modalBody.innerHTML = "";

}

/* ==========================================================
   LOADER
========================================================== */

export function showLoader() {

    loader.classList.remove("hidden");

}

export function hideLoader() {

    loader.classList.add("hidden");

}

/* ==========================================================
   ERROR
========================================================== */

export function showError(message = "Something went wrong.") {

    errorMessage.classList.remove("hidden");

    errorMessage.querySelector("p").textContent =

        message;

}

export function hideError() {

    errorMessage.classList.add("hidden");

}

/* ==========================================================
   NO RESULTS
========================================================== */

export function showNoResults() {

    noResults.classList.remove("hidden");

}

export function hideNoResults() {

    noResults.classList.add("hidden");

}

/* ==========================================================
   TOAST
========================================================== */

let toastTimer;

export function showToast(message) {

    clearTimeout(toastTimer);

    toast.textContent = message;

    toast.classList.add("show");

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}

/* ==========================================================
   RESET UI
========================================================== */

export function resetUI() {

    hideLoader();

    hideError();

    hideNoResults();

}

/* ==========================================================
   FAVORITES SIDEBAR
========================================================== */

export function openFavoritesSidebar() {

    favoritesSidebar.classList.add("open");

}

export function closeFavoritesSidebar() {

    favoritesSidebar.classList.remove("open");

}

/* ==========================================================
   MODAL EVENTS
========================================================== */

modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeMovieModal();

    }

});

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeMovieModal();

        closeFavoritesSidebar();

    }

});