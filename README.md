Movie App 🎬

A modern movie browsing app that lets users search, filter, and save movies while providing personalized recommendations and stats.

Key Features

Browse movies with posters, titles, release dates, genres, and ratings.

Search by title or keyword; filter by genre, year, and rating.

Sort movies by popularity, release date, or rating.

Add movies to a personal watchlist.

Personalized recommendations based on browsing and watchlist activity.

Visualize movie stats with charts.

Responsive design for desktop and mobile.

User authentication with login/logout.

Project Structure
/components  - Reusable UI components
/hooks       - Custom React hooks
/pages       - Next.js pages
/store       - Zustand state management
/utils       - Helper functions
/styles      - Tailwind CSS styles
/public      - Static assets
/types       - TypeScript types

Known Issues

Recommendations are basic and may not always be accurate.

Some movie metadata may be missing due to API limitations.

Watchlist and filters are stored locally; not synced across devices.

Minor layout issues on very small mobile screens.

External Libraries & Tools

React / Next.js, TypeScript

Zustand (state management)

React Query (data fetching)

Tailwind CSS

Clerk (authentication)

Chart.js / Recharts (visualizations)

TMDB API (movie data)
