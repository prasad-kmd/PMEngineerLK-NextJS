import { tmdb } from "@/lib/tmdb";
import { MovieCard } from "@/components/entertainment/movie-card";
import { Star, Play, Plus, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function EntertainmentPage() {
  const [trendingMovies, popularMovies, topRatedMovies, trendingTV] =
    await Promise.all([
      tmdb.getTrendingMovies(),
      tmdb.getPopularMovies(),
      tmdb.getTopRatedMovies(),
      tmdb.getTrendingTV(),
    ]);

  const heroMovie = trendingMovies.results[0];

  return (
    <div className="flex flex-col gap-12 pb-24">
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
        <div className="absolute inset-0">
          {heroMovie.backdrop_path && (
            <Image
              src={tmdb.getImageUrl(heroMovie.backdrop_path, "original")!}
              alt={heroMovie.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/60 to-transparent"></div>
        </div>

        <div className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-24 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary/20 text-primary px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase">
              Trending Now
            </span>
            <span className="text-muted-foreground text-sm font-medium">
              {new Date(heroMovie.release_date).getFullYear()} • Movie
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-foreground mb-6 leading-none uppercase">
            {heroMovie.title}
          </h2>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-yellow-400 gap-1">
              <Star className="h-5 w-5 fill-current" />
              <span className="font-bold">
                {heroMovie.vote_average.toFixed(1)}
              </span>
            </div>
            <span className="text-muted-foreground font-medium">
              TMDB Choice
            </span>
          </div>

          <p className="text-lg text-muted-foreground mb-10 max-w-2xl leading-relaxed line-clamp-3">
            {heroMovie.overview}
          </p>

          <div className="flex items-center gap-4">
            <Link
              href={`/entertainment/movie/${heroMovie.id}`}
              className="bg-primary text-primary-foreground px-10 py-4 rounded-lg font-bold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Play className="h-5 w-5 fill-current" />
              Watch Now
            </Link>
            <button className="bg-muted border border-border/30 backdrop-blur-md px-10 py-4 rounded-lg font-bold text-foreground flex items-center gap-2 hover:bg-muted/80 transition-all cursor-pointer">
              <Plus className="h-5 w-5" />
              My List
            </button>
          </div>
        </div>
      </section>

      {/* Trending Movies */}
      <section className="px-6 md:px-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground mb-1">
              Trending Movies
            </h3>
            <div className="h-1 w-12 bg-primary rounded-full"></div>
          </div>
          <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline cursor-pointer">
            Explore all <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {trendingMovies.results.slice(0, 12).map((movie) => (
            <MovieCard key={movie.id} item={movie} type="movie" />
          ))}
        </div>
      </section>

      {/* Popular Movies */}
      <section className="px-6 md:px-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground mb-1">
              Popular Movies
            </h3>
            <div className="h-1 w-12 bg-primary rounded-full"></div>
          </div>
          <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline cursor-pointer">
            Explore all <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {popularMovies.results.slice(0, 12).map((movie) => (
            <MovieCard key={movie.id} item={movie} type="movie" />
          ))}
        </div>
      </section>

      {/* Top Rated Movies */}
      <section className="px-6 md:px-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground mb-1">
              Top Rated
            </h3>
            <div className="h-1 w-12 bg-primary rounded-full"></div>
          </div>
          <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline cursor-pointer">
            Explore all <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {topRatedMovies.results.slice(0, 12).map((movie) => (
            <MovieCard key={movie.id} item={movie} type="movie" />
          ))}
        </div>
      </section>

      {/* Trending TV Shows */}
      <section className="px-6 md:px-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground mb-1">
              Trending TV Shows
            </h3>
            <div className="h-1 w-12 bg-primary rounded-full"></div>
          </div>
          <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline cursor-pointer">
            Explore all <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {trendingTV.results.slice(0, 12).map((tv) => (
            <MovieCard key={tv.id} item={tv} type="tv" />
          ))}
        </div>
      </section>
    </div>
  );
}
