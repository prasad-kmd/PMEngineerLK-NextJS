import { tmdb } from "@/lib/tmdb";
import { getOMDBData } from "@/lib/omdb";
import { TVControls } from "@/components/entertainment/tv-controls";
import { MovieCard } from "@/components/entertainment/movie-card";
import { BookmarkButton } from "@/components/entertainment/bookmark-button";
import { Star, Clock, Calendar, Play } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  try {
    const show = await tmdb.getTVDetails(id);
    if (!show) return {};

    const title = `${show.name} | GSC Movie Hub`;
    const description = show.overview;
    const ogUrl = `/api/og?title=${encodeURIComponent(show.name)}&description=${encodeURIComponent(description)}&type=entertainment`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "video.tv_show",
        images: [{ url: ogUrl, width: 1280, height: 720, alt: show.name }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogUrl],
      },
    };
  } catch (error) {
    return {};
  }
}

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

          <div className="container relative z-10 mx-auto px-6 md:px-12 h-full flex items-end pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end w-full">
              {/* Poster Card */}
              <div className="hidden lg:block lg:col-span-3">
                <div className="relative aspect-[2/3] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                  {posterUrl && (
                    <Image
                      src={posterUrl}
                      alt={show.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform">
                      <Play className="h-8 w-8 text-white fill-current ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Info */}
              <div className="lg:col-span-9 space-y-8">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-black uppercase tracking-widest text-primary/80">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
                      {year}
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <Star className="h-3.5 w-3.5 fill-current" />{" "}
                      {show.vote_average.toFixed(1)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" /> {show.status}
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter amoriaregular leading-tight">
                    {show.name}
                  </h1>
                  <p className="text-xl text-white/70 max-w-3xl font-light leading-relaxed local-inter">
                    {show.overview}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#player"
                    className="h-14 px-8 bg-white text-black hover:bg-white/90 rounded-2xl font-bold flex items-center gap-3 transition-all active:scale-95 amoriaregular uppercase tracking-widest"
                  >
                    <Play className="h-5 w-5 fill-current" /> Watch Now
                  </a>
                  <BookmarkButton item={show} type="tv" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TV Controls & Episodes */}
        <section id="player" className="container mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <TVControls
                tmdbId={show.id}
                imdbId={externalIds.imdb_id || ""}
                totalSeasons={show.number_of_seasons}
                seasons={show.seasons}
              />

              {/* Cast */}
              <div className="pt-12 space-y-10">
                <h2 className="text-2xl font-bold amoriaregular uppercase tracking-wider">
                  Series Cast
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6">
                  {credits.cast.slice(0, 10).map((person) => (
                    <div key={person.id} className="group text-center">
                      <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-4 border border-border/10 grayscale group-hover:grayscale-0 transition-all duration-500">
                        {person.profile_path ? (
                          <Image
                            src={tmdb.getImageUrl(person.profile_path, "w185")!}
                            alt={person.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-xs text-muted-foreground font-black">
                              N/A
                            </span>
                          </div>
                        )}
                      </div>
                      <h4 className="text-sm font-bold truncate">
                        {person.name}
                      </h4>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest truncate mt-1">
                        {person.character}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-10 bg-muted/30 p-8 rounded-[40px] border border-border/5 h-fit lg:sticky lg:top-24">
              <h2 className="text-xl font-bold amoriaregular uppercase tracking-widest border-b border-border/10 pb-6">
                Series Info
              </h2>
              <div className="space-y-6">
                {[
                  { label: "Status", value: show.status },
                  { label: "First Aired", value: show.first_air_date },
                  { label: "Seasons", value: show.number_of_seasons },
                  { label: "Episodes", value: show.number_of_episodes },
                  {
                    label: "Network",
                    value: show.networks?.[0]?.name || "N/A",
                  },
                  {
                    label: "Language",
                    value: show.original_language.toUpperCase(),
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-start py-2 border-b border-border/5 last:border-0 group"
                  >
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors mt-1 google-sans">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold text-right max-w-[180px] local-inter">
                      {item.value}
                    </span>
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

              <div className="pt-8 border-t border-border/10 space-y-4">
                <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                  Data provided by TMDB and OMDb. Streaming links are via
                  third-party providers.
                </p>
                <div className="flex gap-4 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                  <div className="text-[10px] font-black tracking-widest border border-foreground/50 px-1.5 py-0.5 rounded">
                    TMDB
                  </div>
                  <div className="text-[10px] font-black tracking-widest border border-foreground/50 px-1.5 py-0.5 rounded">
                    OMDB
                  </div>
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
