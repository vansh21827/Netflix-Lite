/* ==========================================================
   INFINITE SCROLL
========================================================== */

import {

    loadNextPage

} from "./api.js";

import {

    appendMovies,

    showLoader,

    hideLoader,

    showError

} from "./ui.js";

import {

    state,

    hasMorePages,

    lockFetching,

    unlockFetching

} from "./state.js";

/* ==========================================================
   OBSERVER
========================================================== */

let observer;

/* ==========================================================
   LOAD MORE MOVIES
========================================================== */

async function loadMoreMovies() {

    if (state.isFetching) {

        return;

    }

    if (!hasMorePages()) {

        return;

    }

    try {

        lockFetching();

        showLoader();

        const data = await loadNextPage();

        if (!data) {

            return;

        }

        appendMovies(data.results);

    }

    catch (error) {

        console.error(error);

        showError(

            "Unable to load more movies."

        );

    }

    finally {

        hideLoader();

        unlockFetching();

    }

}

/* ==========================================================
   INITIALIZE
========================================================== */

export function initializeInfiniteScroll() {

    const sentinel = document.getElementById(

        "scrollSentinel"

    );

    if (!sentinel) {

        return;

    }

    observer = new IntersectionObserver(

        entries => {

            const entry = entries[0];

            if (

                entry.isIntersecting

            ) {

                loadMoreMovies();

            }

        },

        {

            root: null,

            rootMargin: "200px",

            threshold: 0

        }

    );

    observer.observe(

        sentinel

    );

}

/* ==========================================================
   DESTROY
========================================================== */

export function destroyInfiniteScroll() {

    if (observer) {

        observer.disconnect();

    }

}
/* ==========================================================
   RESTART OBSERVER
========================================================== */

export function restartInfiniteScroll() {

    destroyInfiniteScroll();

    initializeInfiniteScroll();

}