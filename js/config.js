/* ==========================================================
   TMDB CONFIGURATION
========================================================== */

export const API_KEY = "47de9b9df3139587d406b3621462a913";

export const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

/* ==========================================================
   GEMINI API
========================================================== */

export const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";

export const GEMINI_URL =
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

/* ==========================================================
   APPLICATION SETTINGS
========================================================== */

export const DEFAULT_LANGUAGE = "en-US";

export const DEFAULT_PAGE = 1;

export const SEARCH_DEBOUNCE = 500;

export const MOVIES_PER_PAGE = 20;

/* ==========================================================
   TMDB ENDPOINTS
========================================================== */

export const ENDPOINTS = {

    POPULAR: "/movie/popular",

    SEARCH: "/search/movie",

    DETAILS: "/movie"

};

/* ==========================================================
   PLACEHOLDER IMAGES
========================================================== */

export const PLACEHOLDER_POSTER =
"https://placehold.co/500x750/1c1c1c/ffffff?text=No+Poster";

export const PLACEHOLDER_BACKDROP =
"https://placehold.co/1280x720/1c1c1c/ffffff?text=No+Backdrop";

/* ==========================================================
   LOCAL STORAGE
========================================================== */

export const STORAGE_KEYS = {

    FAVORITES: "netflix-lite-favorites"

};