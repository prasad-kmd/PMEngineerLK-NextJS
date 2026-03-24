import { tmdb } from "@/lib/tmdb";
import { VideoPlayer } from "@/components/entertainment/video-player";
import { MovieCard } from "@/components/entertainment/movie-card";
import { Star, Clock, Calendar, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  try {
    const [movie, credits, recommendations] = await Promise.all([
      tmdb.getMovieDetails(id),
      tmdb.getMovieCredits(id),
      tmdb.getMovieRecommendations(id),
    ]);

    if (!movie) return notFound();

    const backdropUrl = tmdb.getImageUrl(movie.backdrop_path, "original");
    const posterUrl = tmdb.getImageUrl(movie.poster_path, "w500");
    const year = new Date(movie.release_date).getFullYear();
    const runtime = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;

    return (
      <div className="flex flex-col gap-12 pb-24">
        {/* Backdrop Hero */}
        <section className="relative w-full h-[500px] md:h-[700px] overflow-hidden">
          <div className="absolute inset-0 z-0">
            {backdropUrl && (
              <Image
                src={backdropUrl}
                alt={movie.title}
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-[#131313] via-[#131313]/80 to-transparent"></div>
          </div>

          <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex items-end pb-16">
            <div className="flex flex-col md:flex-row items-end gap-10 w-full">
              {/* Poster */}
              <div className="hidden md:block w-64 shrink-0 shadow-2xl rounded-lg overflow-hidden border border-white/5 transform -rotate-1">
                {posterUrl && (
                  <Image
                    src={posterUrl}
                    alt={movie.title}
                    width={256}
                    height={384}
                    className="w-full aspect-2/3 object-cover"
                  />
                )}
              </div>

              {/* Details */}
              <div className="grow">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-[#4fdbc8]/20 text-[#4fdbc8] px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl md:text-7xl font-black tracking-tighter shadow-black mb-4 uppercase">
                  {movie.title}
                </h1>

                {movie.tagline && (
                  <p className="text-lg md:text-2xl text-[#bbcac6] italic mb-6 max-w-2xl font-light tracking-tight">
                    "{movie.tagline}"
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-6 text-sm text-[#bbcac6]">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-[#4fdbc8] text-[#4fdbc8]" />
                    <span className="font-bold text-[#e5e2e1]">
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span>/ 10</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{runtime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{year}</span>
                  </div>
                  <div className="flex items-center gap-2 border border-[#3c4947]/30 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest">
                    {movie.status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Player & Info Section */}
        <section className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            {/* Player */}
            <VideoPlayer tmdbId={movie.id} type="movie" />

            {/* Plot */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                <span className="w-1 h-8 bg-[#4fdbc8] rounded-full"></span>
                The Story
              </h2>
              <p className="text-lg text-[#bbcac6] leading-relaxed max-w-3xl font-light">
                {movie.overview}
              </p>
            </div>

            {/* Cast */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">
                  Leading Cast
                </h2>
              </div>
              <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide">
                {credits.cast.slice(0, 10).map((person) => (
                  <div
                    key={person.id}
                    className="flex flex-col items-center shrink-0 group"
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#4fdbc8] transition-all mb-3 shadow-xl relative">
                      {person.profile_path ? (
                        <Image
                          src={tmdb.getImageUrl(person.profile_path, "w500")!}
                          alt={person.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#201f1f] flex items-center justify-center text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-bold text-center w-24 truncate">
                      {person.name}
                    </span>
                    <span className="text-xs text-[#bbcac6] w-24 truncate text-center">
                      {person.character}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area: Production Info */}
          <div className="lg:col-span-4 space-y-10">
            <div className="bg-[#1c1b1b] border border-white/5 p-8 rounded-2xl shadow-xl space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#bbcac6]">
                Production Info
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-[#3c4947]/10">
                  <span className="text-sm text-[#bbcac6]">Status</span>
                  <span className="text-sm font-bold">{movie.status}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#3c4947]/10">
                  <span className="text-sm text-[#bbcac6]">
                    Original Language
                  </span>
                  <span className="text-sm font-bold uppercase">
                    {movie.original_language}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#3c4947]/10">
                  <span className="text-sm text-[#bbcac6]">Budget</span>
                  <span className="text-sm font-bold">
                    {movie.budget > 0
                      ? `$${(movie.budget / 1000000).toFixed(1)}M`
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#3c4947]/10">
                  <span className="text-sm text-[#bbcac6]">Revenue</span>
                  <span className="text-sm font-bold">
                    {movie.revenue > 0
                      ? `$${(movie.revenue / 1000000).toFixed(1)}M`
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommendations */}
        {recommendations.results.length > 0 && (
          <section className="container mx-auto px-6 md:px-12 space-y-8">
            <h2 className="text-2xl font-bold tracking-tight">
              More Like This
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {recommendations.results.slice(0, 10).map((item) => (
                <MovieCard key={item.id} item={item} type="movie" />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch movie details:", error);
    return notFound();
  }
}
