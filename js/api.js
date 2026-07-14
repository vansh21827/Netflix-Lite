/* ==========================================================
   API SERVICE
========================================================== */

import {
    API_KEY,
    BASE_URL,
    DEFAULT_LANGUAGE,
    ENDPOINTS
} from "./config.js";

import {
    state,
    setMovies,
    appendMovies,
    setPage,
    setTotalPages,
    setSearchQuery,
    setView
} from "./state.js";

/* ==========================================================
   SEARCH ABORT CONTROLLER
========================================================== */

let searchController = null;

/* ==========================================================
   GENERIC REQUEST
========================================================== */

async function request(endpoint, params = {}, useAbort = false) {

    if (useAbort) {

        if (searchController) {

            searchController.abort();

        }

        searchController = new AbortController();

    }

    const url = new URL(`${BASE_URL}${endpoint}`);

    url.searchParams.set("api_key", API_KEY);

    url.searchParams.set(
        "language",
        DEFAULT_LANGUAGE
    );

    Object.entries(params).forEach(([key, value]) => {

        if (
            value !== undefined &&
            value !== null &&
            value !== ""
        ) {

            url.searchParams.set(key, value);

        }

    });

    const response = await fetch(url, {

        signal: useAbort
            ? searchController.signal
            : undefined

    });

    if (!response.ok) {

        throw new Error(
            `TMDB request failed (${response.status}) ${response.statusText}`
        );

    }

    return response.json();

}

/* ==========================================================
   POPULAR MOVIES
========================================================== */

export async function getPopularMovies(page = 1) {

    const data = await request(

        ENDPOINTS.POPULAR,

        {
            page
        }

    );

    setView("popular");

    setSearchQuery("");

    setPage(page);

    setTotalPages(

        Math.min(
            data.total_pages,
            500
        )

    );

    if (page === 1) {

        setMovies(data.results);

    }

    else {

        appendMovies(data.results);

    }

    return data;

}

/* ==========================================================
   SEARCH MOVIES
========================================================== */

export async function searchMovies(

    query,

    page = 1

) {

    const cleanedQuery = query.trim();

    if (!cleanedQuery) {

        return getPopularMovies();

    }

    const data = await request(

        ENDPOINTS.SEARCH,

        {

            query: cleanedQuery,

            page,

            include_adult: false

        },

        true

    );

    setView("search");

    setSearchQuery(cleanedQuery);

    setPage(page);

    setTotalPages(

        Math.min(
            data.total_pages,
            500
        )

    );

    if (page === 1) {

        setMovies(data.results);

    }

    else {

        appendMovies(data.results);

    }

    return data;

}

/* ==========================================================
   MOVIE DETAILS
========================================================== */

export async function getMovieDetails(movieId) {

    return await request(

        `${ENDPOINTS.DETAILS}/${movieId}`

    );

}

/* ==========================================================
   NEXT PAGE
========================================================== */

export async function loadNextPage() {

    if (

        state.currentPage >=
        state.totalPages

    ) {

        return null;

    }

    const nextPage =

        state.currentPage + 1;

    if (

        state.view === "popular"

    ) {

        return await getPopularMovies(

            nextPage

        );

    }

    if (

        state.view === "search"

    ) {

        return await searchMovies(

            state.searchQuery,

            nextPage

        );

    }

    return null;

}

/* ==========================================================
   TRENDING (Optional Future Feature)
========================================================== */

export async function getTrendingMovies(page = 1) {

    const data = await request(

        "/trending/movie/week",

        {

            page

        }

    );

    return data;

}

/* ==========================================================
   TOP RATED (Optional Future Feature)
========================================================== */

export async function getTopRatedMovies(page = 1) {

    const data = await request(

        "/movie/top_rated",

        {

            page

        }

    );

    return data;

}