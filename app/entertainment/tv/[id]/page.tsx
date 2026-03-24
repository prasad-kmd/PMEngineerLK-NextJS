import { tmdb } from "@/lib/tmdb";
import { getOMDBData } from "@/lib/omdb";
import { TVControls } from "@/components/entertainment/tv-controls";
import { MovieCard } from "@/components/entertainment/movie-card";
import { BookmarkButton } from "@/components/entertainment/bookmark-button";
import { Star, Clock, Calendar, Play } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function TVDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  try {
    const [show, credits, externalIds] = await Promise.all([
      tmdb.getTVDetails(id),
      tmdb.getTVCredits(id),
      tmdb.getTVExternalIds(id),
    ]);

    if (!show) return notFound();

    // Fetch OMDb data for additional ratings
    const omdbData = externalIds.imdb_id
      ? await getOMDBData(externalIds.imdb_id)
      : null;

    const backdropUrl = tmdb.getImageUrl(show.backdrop_path, "original");
    const posterUrl = tmdb.getImageUrl(show.poster_path, "w500");
    const year = new Date(show.first_air_date).getFullYear();

    return (
      <div className="flex flex-col gap-12 pb-24">
        {/* Backdrop Hero */}
        <section className="relative w-full h-[600px] md:h-[800px] overflow-hidden">
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
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/20 to-transparent"></div>
          </div>

          <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex items-end pb-24">
            <div className="flex flex-col md:flex-row items-end gap-10 w-full">
              {/* Poster */}
              <div className="hidden md:block w-72 shrink-0 shadow-2xl rounded-2xl overflow-hidden border border-border/10 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                {posterUrl && (
                  <Image
                    src={posterUrl}
                    alt={show.name}
                    width={288}
                    height={432}
                    className="w-full aspect-2/3 object-cover"
                  />
                )}
              </div>

              {/* Details */}
              <div className="grow pb-4">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {show.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-primary/10"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 uppercase text-foreground leading-none">
                  {show.name}
                </h1>

                {show.tagline && (
                  <p className="text-xl md:text-3xl text-muted-foreground italic mb-8 max-w-3xl font-light tracking-tight leading-relaxed">
                    "{show.tagline}"
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-8 mb-10">
                  <div className="flex items-center gap-4">
                    <a
                      href="#player"
                      className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
                    >
                      <Play className="h-5 w-5 fill-current" />
                      Watch Now
                    </a>
                    <BookmarkButton
                      item={{
                        id: show.id,
                        type: "tv",
                        title: show.name,
                        poster_path: show.poster_path!,
                        vote_average: show.vote_average,
                        first_air_date: show.first_air_date,
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-8 text-sm text-muted-foreground font-medium">
                  <div className="flex items-center gap-2">
                    <div className="bg-yellow-400 text-black px-1.5 py-0.5 rounded font-black text-[10px]">
                      TMDB
                    </div>
                    <span className="font-bold text-foreground text-lg">
                      {show.vote_average.toFixed(1)}
                    </span>
                  </div>

                  {omdbData?.imdbRating && (
                    <div className="flex items-center gap-2">
                      <div className="bg-[#f5c518] text-black px-1.5 py-0.5 rounded font-black text-[10px]">
                        IMDb
                      </div>
                      <span className="font-bold text-foreground text-lg">
                        {omdbData.imdbRating}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{show.number_of_seasons} Seasons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{year}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Player & Info Section */}
        <section
          id="player"
          className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 scroll-mt-24"
        >
          <div className="lg:col-span-8 space-y-16">
            {/* TV Controls & Player */}
            <TVControls show={show} />

            {/* Plot */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight flex items-center gap-4">
                <span className="w-1.5 h-10 bg-primary rounded-full"></span>
                The Synopsis
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl font-light">
                {show.overview}
              </p>
            </div>

            {/* Cast */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tight">Cast & Crew</h2>
              <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4">
                {credits.cast.slice(0, 12).map((person) => (
                  <div
                    key={person.id}
                    className="flex flex-col items-center shrink-0 group text-center w-28"
                  >
                    <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-primary group-hover:scale-105 transition-all mb-4 shadow-xl relative">
                      {person.profile_path ? (
                        <Image
                          src={tmdb.getImageUrl(person.profile_path, "w500")!}
                          alt={person.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center text-[10px] p-4 font-bold uppercase tracking-widest text-muted-foreground">
                          No Photo
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-bold text-foreground truncate w-full">
                      {person.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate w-full italic">
                      {person.character}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area: Production Info */}
          <div className="lg:col-span-4 space-y-10">
            <div className="bg-card border border-border/10 p-10 rounded-3xl shadow-2xl space-y-8 sticky top-24">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                Series Details
              </h3>
              <div className="space-y-6">
                {[
                  { label: "Status", value: show.status },
                  { label: "Episodes", value: show.number_of_episodes },
                  { label: "Seasons", value: show.number_of_seasons },
                  {
                    label: "Language",
                    value: show.original_language.toUpperCase(),
                  },
                  { label: "Network", value: show.networks[0]?.name || "N/A" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-4 border-b border-border/5 last:border-0 group"
                  >
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold">{item.value}</span>
                  </div>
                ))}
              </div>

              {omdbData?.Ratings && omdbData.Ratings.length > 0 && (
                <div className="pt-4 space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                    Critics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {omdbData.Ratings.map((rating, idx) => (
                      <div
                        key={idx}
                        className="bg-muted/50 p-4 rounded-xl border border-border/5"
                      >
                        <div className="text-[10px] text-muted-foreground uppercase font-bold mb-1 truncate">
                          {rating.Source}
                        </div>
                        <div className="text-lg font-black">{rating.Value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
