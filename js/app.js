/* ==========================================================
   NETFLIX LITE
   APPLICATION ENTRY POINT
========================================================== */

import {

    getPopularMovies,

    getMovieDetails

} from "./api.js";

import {

    state,

    setView

} from "./state.js";

import {

    renderMovies,

    showLoader,

    hideLoader,

    showError,

    hideError,

    openMovieModal,

    closeMovieModal,

    setSectionTitle

} from "./ui.js";

import {

    initializeSearch

} from "./search.js";

import {

    initializeFavorites,

    toggleMovieFavorite,

    showFavoritesView,

    showPopularView,

    movieIsFavorite,

    openFavorites,

    closeFavorites

} from "./favorites.js";

import {

    initializeInfiniteScroll,

    restartInfiniteScroll

} from "./infiniteScroll.js";

import {

    initializeMoodMatcher

} from "./moodMatcher.js";

/* ==========================================================
   INITIALIZATION GUARD
========================================================== */

let initialized = false;

/* ==========================================================
   DOM
========================================================== */

const homeBtn =
    document.getElementById("homeBtn");

const popularBtn =
    document.getElementById("popularBtn");

const favoritesBtn =
    document.getElementById("favoritesBtn");

const closeFavoritesBtn =
    document.getElementById("closeFavorites");

const movieModal =
    document.getElementById("movieModal");

const closeModalBtn =
    document.getElementById("closeModal");

/* ==========================================================
   APPLICATION START
========================================================== */

async function initializeApp() {

    if (initialized) {

        return;

    }

    initialized = true;

    try {

        showLoader();

        hideError();

        initializeFavorites();

        initializeSearch();

        initializeInfiniteScroll();

        initializeMoodMatcher();

        const data =
            await getPopularMovies(1);

        renderMovies(data.results);

        setSectionTitle(

            "🔥 Popular Movies"

        );

    }

    catch (error) {

        console.error(error);

        showError(

            "Unable to load movies."

        );

    }

    finally {

        hideLoader();

    }

}

/* ==========================================================
   NAVIGATION
========================================================== */

homeBtn.addEventListener(

    "click",

    async () => {

        try {

            showLoader();

            setView("popular");

            const data =
                await getPopularMovies(1);

            renderMovies(

                data.results

            );

            showPopularView();

            restartInfiniteScroll();

        }

        catch (error) {

            console.error(error);

        }

        finally {

            hideLoader();

        }

    }

);

popularBtn.addEventListener(

    "click",

    async () => {

        try {

            showLoader();

            setView("popular");

            const data =
                await getPopularMovies(1);

            renderMovies(

                data.results

            );

            showPopularView();

            restartInfiniteScroll();

        }

        catch (error) {

            console.error(error);

        }

        finally {

            hideLoader();

        }

    }

);

favoritesBtn.addEventListener(

    "click",

    () => {

        setView("favorites");

        showFavoritesView();

        openFavorites();

    }

);

closeFavoritesBtn.addEventListener(

    "click",

    () => {

        closeFavorites();

    }

);

/* ==========================================================
   GLOBAL CLICK EVENTS
========================================================== */

document.addEventListener(

    "click",

    async (event) => {
                /*
        ==================================================
        FAVORITE BUTTON
        ==================================================
        */

        const favoriteButton =

            event.target.closest(

                ".favorite-btn"

            );

        if (favoriteButton) {

            event.stopPropagation();

            const movieId = Number(

                favoriteButton.dataset.id

            );

            const movie =

                state.movies.find(

                    movie => movie.id === movieId

                ) ||

                state.favorites.find(

                    movie => movie.id === movieId

                );

            if (!movie) {

                return;

            }

            toggleMovieFavorite(

                movie

            );

            favoriteButton.innerHTML =

                movieIsFavorite(movie.id)

                    ? '<i class="fa-solid fa-heart"></i>'

                    : '<i class="fa-regular fa-heart"></i>';

            return;

        }

        /*
        ==================================================
        MOVIE CARD
        ==================================================
        */

        const movieCard =

            event.target.closest(

                ".movie-card"

            );

        if (!movieCard) {

            return;

        }

        const movieId = Number(

            movieCard.dataset.id

        );

        try {

            showLoader();

            const movie =

                await getMovieDetails(

                    movieId

                );

            openMovieModal(

                movie

            );

        }

        catch (error) {

            if (

                error.name ===

                "AbortError"

            ) {

                return;

            }

            console.error(error);

            showError(

                "Unable to load movie details."

            );

        }

        finally {

            hideLoader();

        }

    }

);

/* ==========================================================
   MODAL EVENTS
========================================================== */

closeModalBtn.addEventListener(

    "click",

    () => {

        closeMovieModal();

    }

);

movieModal.addEventListener(

    "click",

    event => {

        if (

            event.target ===

            movieModal

        ) {

            closeMovieModal();

        }

    }

);

/* ==========================================================
   KEYBOARD EVENTS
========================================================== */

document.addEventListener(

    "keydown",

    event => {

        if (

            event.key ===

            "Escape"

        ) {

            closeMovieModal();

            closeFavorites();

        }

    }

);

/* ==========================================================
   WINDOW EVENTS
========================================================== */

window.addEventListener(

    "online",

    () => {

        hideError();

    }

);

window.addEventListener(

    "offline",

    () => {

        showError(

            "No Internet Connection."

        );

    }

);

/* ==========================================================
   START APPLICATION
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initializeApp

);