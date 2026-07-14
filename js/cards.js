/* ==========================================================
   MOVIE CARD COMPONENT
========================================================== */

import {

    IMAGE_BASE_URL,

    PLACEHOLDER_POSTER

} from "./config.js";

import {

    isFavorite

} from "./state.js";

/* ==========================================================
   CREATE MOVIE CARD
========================================================== */

export function createMovieCard(movie) {

    const article = document.createElement("article");

    article.className = "movie-card fade-in";

    article.dataset.id = movie.id;

    const poster = movie.poster_path

        ? `${IMAGE_BASE_URL}${movie.poster_path}`

        : PLACEHOLDER_POSTER;

    const year = movie.release_date

        ? movie.release_date.split("-")[0]

        : "N/A";

    const rating = movie.vote_average

        ? movie.vote_average.toFixed(1)

        : "N/A";

    article.innerHTML = `

        <div class="movie-poster">

            <img

                src="${poster}"

                alt="${movie.title}"

                loading="lazy"

                onerror="this.src='${PLACEHOLDER_POSTER}'"

            >

            <button

                class="favorite-btn"

                data-id="${movie.id}"

                aria-label="Favorite Movie"

            >

                <i class="${

                    isFavorite(movie.id)

                        ? "fa-solid"

                        : "fa-regular"

                } fa-heart"></i>

            </button>

        </div>

        <div class="movie-info">

            <h3 class="movie-title">

                ${movie.title}

            </h3>

            <div class="movie-meta">

                <span>

                    ${year}

                </span>

                <span class="movie-rating">

                    ⭐ ${rating}

                </span>

            </div>

        </div>

    `;

    return article;

}

/* ==========================================================
   FAVORITE BUTTON
========================================================== */

export function updateFavoriteButton(

    button,

    favorite

) {

    button.innerHTML = favorite

        ? '<i class="fa-solid fa-heart"></i>'

        : '<i class="fa-regular fa-heart"></i>';

}

/* ==========================================================
   EMPTY CARD
========================================================== */

export function createEmptyCard(message) {

    const div = document.createElement("div");

    div.className = "empty-card";

    div.innerHTML = `

        <h2>${message}</h2>

    `;

    return div;

}