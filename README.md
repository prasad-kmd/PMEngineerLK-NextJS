# GSC Movie Hub | Entertainment Site

A standalone, private entertainment portal built with Next.js 16, Tailwind CSS 4, and TypeScript. This site allows you to explore movies and TV shows, search for content, and manage a personal watchlist.

## 🚀 Features

- **Entertainment-Only Content**: Focused exclusively on movies and TV shows using TMDB, OMDb, and YTS APIs.
- **Single-User Login Gate**: Secure access restricted to a single administrator via environment variables.
- **Search & Discovery**: Trending, popular, and top-rated categories with advanced search functionality.
- **Watchlist (My List)**: Persist your favorite titles using local storage.
- **Performance & UX**: High-performance rendering, responsive design, and cinematic UI.

## 🔒 Security & Authentication

The site is protected by a single-user login system:
- **JWT-based Sessions**: Uses `jose` for secure, signed cookie sessions.
- **Middleware/Proxy Protection**: All routes are intercepted and validated.
- **Zero Database**: Configuration and credentials are managed entirely through environment variables.

## 🛠️ Configuration

To run this project, you need to set up the following environment variables in `.env.local`:

### Entertainment API Keys
- `TMDB_API_KEY`: Your The Movie Database API key.
- `OMDB_API`: Your OMDb API key.
- `YTS_API`: (Optional) YTS API endpoint (defaults to `https://movies-api.accel.li/api/v2/`).

### Authentication
- `ADMIN_USERNAME`: The username for the site administrator.
- `ADMIN_PASSWORD`: The password for the site administrator.
- `AUTH_SECRET`: A strong secret key used to sign session cookies.

## 📦 Getting Started

1. Clone the repository.
2. Install dependencies: `pnpm install`
3. Set up your `.env.local` file.
4. Run the development server: `pnpm dev`
5. Build for production: `pnpm build`

## 📄 Attribution

Data provided by [TMDB](https://www.themoviedb.org/), [OMDb](http://www.omdbapi.com/), and [YTS](https://yts.mx/).

---
**GSC Movie Hub | 2026**
