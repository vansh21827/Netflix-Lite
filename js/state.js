/* ==========================================================
   APPLICATION STATE
========================================================== */

export const state = {

    /* Current Movies */

    movies: [],

    /* Favorite Movies */

    favorites: [],

    /* Search Query */

    searchQuery: "",

    /* Pagination */

    currentPage: 1,

    totalPages: 1,

    /* Current View */

    view: "popular",
    // popular | search | favorites

    /* Loading */

    isLoading: false,

    isFetching: false

};

/* ==========================================================
   MOVIES
========================================================== */

export function setMovies(movies) {

    state.movies = [...movies];

}

export function appendMovies(movies) {

    state.movies.push(...movies);

}

export function clearMovies() {

    state.movies = [];

}

/* ==========================================================
   SEARCH
========================================================== */

export function setSearchQuery(query) {

    state.searchQuery = query.trim();

}

/* ==========================================================
   PAGINATION
========================================================== */

export function resetPagination() {

    state.currentPage = 1;

    state.totalPages = 1;

}

export function setPage(page) {

    state.currentPage = page;

}

export function nextPage() {

    state.currentPage++;

}

export function setTotalPages(totalPages) {

    state.totalPages = totalPages;

}

export function hasMorePages() {

    return state.currentPage < state.totalPages;

}

/* ==========================================================
   VIEW
========================================================== */

export function setView(view) {

    state.view = view;

}

/* ==========================================================
   LOADING
========================================================== */

export function startLoading() {

    state.isLoading = true;

}

export function stopLoading() {

    state.isLoading = false;

}

/* ==========================================================
   FETCH LOCK
========================================================== */

export function lockFetching() {

    state.isFetching = true;

}

export function unlockFetching() {

    state.isFetching = false;

}

/* ==========================================================
   FAVORITES
========================================================== */

export function setFavorites(favorites) {

    state.favorites = [...favorites];

}

export function addFavorite(movie) {

    if (

        !state.favorites.some(

            item => item.id === movie.id

        )

    ) {

        state.favorites.push(movie);

    }

}

export function removeFavorite(movieId) {

    state.favorites = state.favorites.filter(

        movie => movie.id !== movieId

    );

}

export function isFavorite(movieId) {

    return state.favorites.some(

        movie => movie.id === movieId

    );

}

export function getFavoriteCount() {

    return state.favorites.length;

}