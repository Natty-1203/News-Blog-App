# News & Blogs

News & Blogs is a responsive single-page application built with React and Vite that aggregates news, provides quick weather lookups, a calendar widget, and a simple blog-post editor stored in `localStorage`.

Key features
- News feed with category filters and search (powered by GNews API — `VITE_GNEWS_API_KEY`).
- Article modal and bookmark manager persisted in `localStorage`.
- Blog creation, edit and delete with image upload (images stored as Base64 in `localStorage`).
- Weather lookup using OpenWeatherMap (`VITE_WEATHER_API_KEY`).
- Small calendar widget showing current month and navigation.
- Clean UI with componentized structure under `src/components` and several demo images under `src/assets/images`.

Tech stack
- React 19 + Vite
- Axios for HTTP requests
- LocalStorage for client-side persistence
- Plain CSS modules under `src/components` for styling

Getting started
1. Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd news-blog-app
npm install
```

2. Create a `.env` file in the project root with the following variables (replace keys with your own):

```env
VITE_GNEWS_API_KEY=your_gnews_api_key
VITE_WEATHER_API_KEY=your_openweathermap_key
```

Notes:
- The app expects to call the GNews endpoints as used in the code (example path `/gnews/api/v4/...`). If you use the official GNews endpoints, ensure your dev/proxy setup forwards requests correctly or change the base URL in `src/components/news.jsx`.

Development
- Run the dev server with hot reload:

```bash
npm run dev
```

- Build for production:

```bash
npm run build
```

- Preview the production build locally:

```bash
npm run preview
```

Project structure (high level)
- `index.html` — app entry
- `src/main.jsx` — React bootstrap
- `src/App.jsx` — root component handling News / Blogs views
- `src/components/` — UI components: `news`, `blogs`, `weather`, `calander`, modals, and styles
- `src/assets/images/` — sample images used in the UI

Usage highlights
- Browse news by category or search queries.
- Click headline or grid items to open article modal.
- Bookmark articles; bookmarks persist across sessions.
- Create and manage blog posts from the Blog view; posts are stored in `localStorage`.
- Use the weather panel to lookup current weather by city.



