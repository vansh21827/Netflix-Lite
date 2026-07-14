/* ==========================================================
   AI MOOD MATCHER
========================================================== */

import { performSearch } from "./search.js";
import { showToast, showLoader, hideLoader } from "./ui.js";

/* ==========================================================
   DOM
========================================================== */

const moodInput = document.getElementById("moodInput");
const moodButton = document.getElementById("moodBtn");

/* ==========================================================
   GEMINI CONFIG
========================================================== */

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";

const GEMINI_URL =
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

/* ==========================================================
   FALLBACK MOVIES
========================================================== */

const moodMovies = {

    happy: "The Secret Life of Walter Mitty",

    sad: "The Pursuit of Happyness",

    romantic: "La La Land",

    love: "The Notebook",

    funny: "The Hangover",

    comedy: "Superbad",

    adventure: "Interstellar",

    exciting: "Mad Max: Fury Road",

    action: "John Wick",

    horror: "The Conjuring",

    scary: "It",

    emotional: "Inside Out",

    inspiring: "Soul",

    family: "Coco",

    relaxed: "Chef",

    thriller: "Se7en"

};

/* ==========================================================
   GEMINI REQUEST
========================================================== */

async function getMovieRecommendation(mood) {

    const prompt = `
Recommend exactly ONE movie title.

Mood: ${mood}

Return only the title.
`;

    const response = await fetch(GEMINI_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]

        })

    });

    if (!response.ok) {

        throw new Error("Gemini unavailable");

    }

    const data = await response.json();

    return data.candidates[0]
        .content.parts[0]
        .text
        .replace(/["']/g, "")
        .split("\n")[0]
        .trim();

}

/* ==========================================================
   FALLBACK
========================================================== */

function getFallbackMovie(mood) {

    const input = mood.toLowerCase();

    for (const key in moodMovies) {

        if (input.includes(key)) {

            return moodMovies[key];

        }

    }

    return "Inception";

}

/* ==========================================================
   HANDLER
========================================================== */

async function handleMoodMatcher() {

    const mood = moodInput.value.trim();

    if (!mood) {

        showToast("Describe your mood first.");

        return;

    }

    moodButton.disabled = true;
    moodButton.textContent = "Thinking...";
    showLoader();

    try {

        let movie;

        try {

            movie = await getMovieRecommendation(mood);

        }

        catch {

            movie = getFallbackMovie(mood);

            showToast("Using offline recommendation");

        }

        moodInput.value = "";

        await performSearch(movie);

    }

    catch (error) {

        console.error(error);

        showToast("Unable to recommend a movie.");

    }

    finally {

        hideLoader();

        moodButton.disabled = false;

        moodButton.textContent = "Find Movie";

    }

}

/* ==========================================================
   INITIALIZE
========================================================== */

export function initializeMoodMatcher() {

    moodButton.addEventListener("click", handleMoodMatcher);

    moodInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            event.preventDefault();

            handleMoodMatcher();

        }

    });

}