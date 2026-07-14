/* ==========================================================
   SEARCH CONTROLLER
========================================================== */

import { debounce } from "./debounce.js";

import {
    getPopularMovies,
    searchMovies
} from "./api.js";

import {
    renderMovies,
    showLoader,
    hideLoader,
    showError,
    hideError,
    setSectionTitle
} from "./ui.js";

import {
    state,
    resetPagination,
    setSearchQuery,
    setView
} from "./state.js";

/* ==========================================================
   DOM
========================================================== */

const searchInput = document.getElementById("searchInput");

const searchButton = document.getElementById("searchBtn");

/* ==========================================================
   SEARCH
========================================================== */

export async function performSearch(query = "") {

    query = query.trim();

    /* Skip duplicate search */

    if (

        query === state.searchQuery &&

        state.view === "search"

    ) {

        return;

    }

    try {

        searchButton.disabled = true;

        showLoader();

        hideError();

        resetPagination();

        /* Empty Search */

        if (!query) {

            setView("popular");

            setSearchQuery("");

            setSectionTitle("🔥 Popular Movies");

            const data = await getPopularMovies(1);

            renderMovies(data.results);

            return;

        }

        /* Search */

        setView("search");

        setSearchQuery(query);

        setSectionTitle(`Search Results : "${query}"`);

        const data = await searchMovies(

            query,

            1

        );

        renderMovies(data.results);

    }

    catch (error) {

        /* Ignore aborted searches */

        if (

            error.name === "AbortError"

        ) {

            return;

        }

        console.error(error);

        showError(

            "Unable to search movies."

        );

    }

    finally {

        searchButton.disabled = false;

        hideLoader();

    }

}

/* ==========================================================
   DEBOUNCED SEARCH
========================================================== */

const debouncedSearch = debounce(

    performSearch,

    500

);

/* ==========================================================
   INITIALIZE
========================================================== */

export function initializeSearch() {

    /* Live Search */

    searchInput.addEventListener(

        "input",

        event => {

            debouncedSearch(

                event.target.value

            );

        }

    );

    /* Button */

    searchButton.addEventListener(

        "click",

        () => {

            performSearch(

                searchInput.value

            );

        }

    );

    /* Enter Key */

    searchInput.addEventListener(

        "keydown",

        event => {

            if (

                event.key === "Enter"

            ) {

                event.preventDefault();

                performSearch(

                    searchInput.value

                );

            }

        }

    );

}

/* ==========================================================
   CLEAR SEARCH
========================================================== */

export function clearSearch() {

    searchInput.value = "";

    performSearch("");

}