import { tmdb } from "@/lib/tmdb";
import { MovieCard } from "@/components/entertainment/movie-card";
import { Movie, TVShow, SearchResult } from "@/types/tmdb";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";

  if (!query) {
    return (
      <div className="container mx-auto px-6 md:px-12 py-24 text-center max-w-2xl">
        <h2 className="text-3xl font-bold mb-4 text-foreground">
          Search GSC Movie Hub
        </h2>
        <p className="text-muted-foreground mb-8">
          Enter a title to search for movies and TV shows from around the world.
        </p>
        <form
          action="/entertainment/search"
          method="GET"
          className="relative group"
        >
          <input
            type="text"
            name="q"
            placeholder="Search movies, TV shows..."
            className="w-full bg-muted border border-border rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg"
            autoFocus
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-xl font-bold hover:scale-105 transition-all cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
    );
  }

  const results = await tmdb.searchMulti(query);

  const movies = results.results.filter(
    (item: SearchResult) => item.media_type === "movie",
  ) as unknown as Movie[];
  const tvShows = results.results.filter(
    (item: SearchResult) => item.media_type === "tv",
  ) as unknown as TVShow[];

  return (
    <div className="container mx-auto px-6 md:px-12 py-12 flex flex-col gap-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-foreground">
            Search Results for "{query}"
          </h2>
          <p className="text-muted-foreground">
            {results.total_results} results found.
          </p>
        </div>
        <form
          action="/entertainment/search"
          method="GET"
          className="relative w-full md:w-96"
        >
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search again..."
            className="w-full bg-muted border border-border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary font-bold hover:scale-110 transition-all cursor-pointer text-xs"
          >
            Search
          </button>
        </form>
      </div>

      {movies.length > 0 && (
        <section>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-foreground">
            <span className="w-1 h-6 bg-primary rounded-full"></span>
            Movies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} item={movie} type="movie" />
            ))}
          </div>
        </section>
      )}

      {tvShows.length > 0 && (
        <section>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-foreground">
            <span className="w-1 h-6 bg-primary rounded-full"></span>
            TV Shows
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {tvShows.map((tv) => (
              <MovieCard key={tv.id} item={tv} type="tv" />
            ))}
          </div>
        </section>
      )}

      {movies.length === 0 && tvShows.length === 0 && (
        <div className="text-center py-24">
          <p className="text-xl text-muted-foreground">
            No results found for "{query}".
          </p>
        </div>
      )}
    </div>
  );
}
