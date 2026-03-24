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
      <div className="container mx-auto px-6 md:px-12 py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Search GSC Movie Hub</h2>
        <p className="text-[#bbcac6]">
          Enter a title to search for movies and TV shows.
        </p>
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
      <div>
        <h2 className="text-3xl font-bold mb-2">
          Search Results for "{query}"
        </h2>
        <p className="text-[#bbcac6]">{results.total_results} results found.</p>
      </div>

      {movies.length > 0 && (
        <section>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-[#4fdbc8] rounded-full"></span>
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
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-[#4fdbc8] rounded-full"></span>
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
          <p className="text-xl text-[#bbcac6]">
            No results found for "{query}".
          </p>
        </div>
      )}
    </div>
  );
}
