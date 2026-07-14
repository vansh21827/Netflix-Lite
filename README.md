# 🎬 Netflix Lite

A modern **Netflix-inspired Movie Discovery Web Application** built using **HTML, CSS, and Vanilla JavaScript**. The application integrates with **The Movie Database (TMDB) API** to provide real-time movie discovery, intelligent search, infinite scrolling, favorites management, and an AI-powered Mood Matcher with graceful fallback support.

---

## 📌 Project Overview

Netflix Lite is a lightweight Single Page Application (SPA) that allows users to discover trending movies, search thousands of titles instantly, save favorite movies locally, and receive movie recommendations based on their mood.

The project emphasizes modern frontend architecture including:

- Modular JavaScript
- REST API Integration
- Debounced Search
- Infinite Scrolling
- Local Storage Persistence
- Lazy Loading
- Responsive UI
- Graceful Error Handling

---

## 🚀 Live Demo

**Live Website**
https://netflix-lite-orpin.vercel.app/

---

## 📷 Preview
<img width="1888" height="888" alt="Screenshot 2026-07-14 130546" src="https://github.com/user-attachments/assets/bf036e35-79bb-4de5-acd6-b15127832e7d" />
<img width="1877" height="900" alt="Screenshot 2026-07-14 130617" src="https://github.com/user-attachments/assets/9a64b76d-82d9-4e8b-b1ee-dcd3cd6c5c66" />
<img width="1842" height="892" alt="Screenshot 2026-07-14 130649" src="https://github.com/user-attachments/assets/3ef42a6d-3a79-49cc-bab3-9fea3c698a5a" />
<img width="1156" height="598" alt="Screenshot 2026-07-14 130713" src="https://github.com/user-attachments/assets/f654db2d-95ae-4f02-8859-c97b3b1dc611" />
<img width="1847" height="910" alt="Screenshot 2026-07-14 130808" src="https://github.com/user-attachments/assets/8c84da1a-a893-4b23-b758-e7c4c62a8c82" />

---

# ✨ Features

## 🎥 Movie Discovery

- Browse Popular Movies
- Movie Posters
- Release Year
- Movie Ratings
- Responsive Movie Cards

---

## 🔍 Smart Search

- Search movies instantly
- Debounced API requests (500ms)
- Search by title
- Empty state handling
- Error handling

---

## ❤️ Favorites

- Add movies to favorites
- Remove favorites
- Favorite counter
- Persistent storage using Local Storage
- Favorites Sidebar

---

## 📖 Movie Details

Clicking a movie opens:

- Poster
- Title
- Overview
- Runtime
- Release Date
- Rating

---

## ♾ Infinite Scrolling

Instead of pagination:

- Intersection Observer API
- Automatic loading of next page
- Smooth scrolling experience

---

## ⚡ Debouncing

Search requests are delayed by **500ms** to prevent excessive API calls.

Benefits:

- Better performance
- Reduced network requests
- Improved user experience

---

## 🖼 Lazy Loading

Movie posters use native browser lazy loading.

```html
loading="lazy"
```

Improves:

- Performance
- Lighthouse Score
- Initial page load speed

---

## 🤖 AI Mood Matcher

Describe your mood such as:

- Happy
- Sad
- Excited
- Romantic
- Horror
- Adventure

The application attempts to use **Google Gemini API** to recommend a movie title and automatically performs a TMDB search.

If Gemini is unavailable or quota is exceeded, the application gracefully falls back to predefined movie recommendations.

---

# 🛠 Tech Stack

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- TMDB REST API
- Google Gemini API (Optional)
- Local Storage
- Intersection Observer API

---

# 📂 Project Structure

```
Netflix-Lite
│
├── index.html
│
├── css
│   └── styles.css
│
├── js
│   ├── api.js
│   ├── app.js
│   ├── cards.js
│   ├── config.js
│   ├── debounce.js
│   ├── favorites.js
│   ├── infiniteScroll.js
│   ├── moodMatcher.js
│   ├── search.js
│   ├── state.js
│   ├── storage.js
│   └── ui.js
│
└── README.md
```

---

# 📦 Installation

Clone the repository

```bash
git clone https://github.com/yourusername/netflix-lite.git
```

Open project

```bash
cd netflix-lite
```

Launch

Simply open

```
index.html
```

or use VS Code Live Server.

---

# 🔑 API Configuration

## TMDB API

Create a free account:

https://www.themoviedb.org/

Generate an API Key and replace inside

```javascript
js/config.js
```

```javascript
export const API_KEY = "YOUR_TMDB_API_KEY";
```

---

## Gemini API (Optional)

Create an API key from Google AI Studio.

Replace

```javascript
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";
```

inside

```
js/moodMatcher.js
```

If no Gemini API key is provided, the application uses the built-in fallback recommendation system.

---

# 🎯 Future Improvements

- Genre Filters
- Watchlist
- Trailer Support
- Dark / Light Theme
- User Authentication
- Recently Viewed
- Voice Search
- Streaming Provider Integration

---

# ⚠ Important Note

This repository **does not include a Google Gemini API key** for security reasons.

To enable the AI Mood Matcher:

1. Generate your own Gemini API key.
2. Replace:

```javascript
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";
```

inside

```
js/moodMatcher.js
```

If Gemini is unavailable, the application automatically falls back to predefined movie recommendations.

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open a Pull Request

---


# 👨‍💻 Author

**Vansh Bansal**

---

## ⭐ If you like this project, consider giving it a star on GitHub!
