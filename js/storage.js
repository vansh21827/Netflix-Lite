/* ==========================================================
   STORAGE SERVICE
   Handles only LocalStorage operations
========================================================== */

import { STORAGE_KEYS } from "./config.js";

/* ==========================================================
   LOAD FAVORITES
========================================================== */

export function loadFavorites() {

    try {

        const data = localStorage.getItem(
            STORAGE_KEYS.FAVORITES
        );

        if (!data) {

            return [];

        }

        const favorites = JSON.parse(data);

        return Array.isArray(favorites)
            ? favorites
            : [];

    }

    catch (error) {

        console.error(
            "Failed to load favorites:",
            error
        );

        return [];

    }

}

/* ==========================================================
   SAVE FAVORITES
========================================================== */

export function saveFavorites(favorites = []) {

    try {

        if (!Array.isArray(favorites)) {

            throw new Error(
                "Favorites must be an array."
            );

        }

        localStorage.setItem(

            STORAGE_KEYS.FAVORITES,

            JSON.stringify(favorites)

        );

    }

    catch (error) {

        console.error(
            "Failed to save favorites:",
            error
        );

    }

}

/* ==========================================================
   CLEAR FAVORITES
========================================================== */

export function clearFavorites() {

    try {

        localStorage.removeItem(
            STORAGE_KEYS.FAVORITES
        );

    }

    catch (error) {

        console.error(
            "Failed to clear favorites:",
            error
        );

    }

}