import { tmdb } from "@/lib/tmdb";
import { TVControls } from "@/components/entertainment/tv-controls";
import { MovieCard } from "@/components/entertainment/movie-card";
import { Star, Clock, Calendar, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function TVDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  try {
    const [show, credits] = await Promise.all([
      tmdb.getTVDetails(id),
      tmdb.getTVCredits(id),
    ]);

    if (!show) return notFound();

    const backdropUrl = tmdb.getImageUrl(show.backdrop_path, "original");
    const posterUrl = tmdb.getImageUrl(show.poster_path, "w500");
    const year = new Date(show.first_air_date).getFullYear();

    return (
      <div className="flex flex-col gap-12 pb-24">
        {/* Backdrop Hero */}
        <section className="relative w-full h-[500px] md:h-[700px] overflow-hidden">
          <div className="absolute inset-0 z-0">
            {backdropUrl && (
              <Image
                src={backdropUrl}
                alt={show.name}
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent"></div>
          </div>

          <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex items-end pb-16">
            <div className="flex flex-col md:flex-row items-end gap-10 w-full">
              {/* Poster */}
              <div className="hidden md:block w-64 shrink-0 shadow-2xl rounded-lg overflow-hidden border border-border/5 transform -rotate-1">
                {posterUrl && (
                  <Image
                    src={posterUrl}
                    alt={show.name}
                    width={256}
                    height={384}
                    className="w-full aspect-2/3 object-cover"
                  />
                )}
              </div>

              {/* Details */}
              <div className="grow">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {show.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-primary/20 text-primary px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl md:text-7xl font-black tracking-tighter shadow-black mb-4 uppercase text-foreground">
                  {show.name}
                </h1>

                {show.tagline && (
                  <p className="text-lg md:text-2xl text-muted-foreground italic mb-6 max-w-2xl font-light tracking-tight">
                    "{show.tagline}"
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="font-bold text-foreground">
                      {show.vote_average.toFixed(1)}
                    </span>
                    <span>/ 10</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{show.number_of_seasons} Seasons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{year}</span>
                  </div>
                  <div className="flex items-center gap-2 border border-border/30 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest">
                    {show.status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Player & Info Section */}
        <section className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            {/* TV Controls & Player */}
            <TVControls show={show} />

            {/* Plot */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                <span className="w-1 h-8 bg-primary rounded-full"></span>
                The Story
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl font-light">
                {show.overview}
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
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all mb-3 shadow-xl relative">
                      {person.profile_path ? (
                        <Image
                          src={tmdb.getImageUrl(person.profile_path, "w500")!}
                          alt={person.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#201f1f] flex items-center justify-center text-xs text-center border border-[#3c4947]/10 rounded-full">
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
            <div className="bg-card border border-border/5 p-8 rounded-2xl shadow-xl space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Production Info
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border/10">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="text-sm font-bold">{show.status}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/10">
                  <span className="text-sm text-muted-foreground">
                    Total Episodes
                  </span>
                  <span className="text-sm font-bold">
                    {show.number_of_episodes}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/10">
                  <span className="text-sm text-muted-foreground">
                    Total Seasons
                  </span>
                  <span className="text-sm font-bold">
                    {show.number_of_seasons}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/10">
                  <span className="text-sm text-muted-foreground">
                    Original Language
                  </span>
                  <span className="text-sm font-bold uppercase">
                    {show.original_language}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch TV details:", error);
    return notFound();
  }
}
