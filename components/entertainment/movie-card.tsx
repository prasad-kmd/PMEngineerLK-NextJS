import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { tmdb } from "@/lib/tmdb";
import { Movie, TVShow } from "@/types/tmdb";

interface MovieCardProps {
  item: Movie | TVShow;
  type: "movie" | "tv";
}

export function MovieCard({ item, type }: MovieCardProps) {
  const title = (item as Movie).title || (item as TVShow).name;
  const releaseDate =
    (item as Movie).release_date || (item as TVShow).first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  const posterUrl = tmdb.getImageUrl(item.poster_path, "w500");

  return (
    <Link
      href={`/entertainment/${type}/${item.id}`}
      className="group cursor-pointer"
    >
      <div className="relative aspect-2/3 rounded-xl overflow-hidden mb-3 bg-[#201f1f] shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-2">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Poster
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-[#0e0e0e] to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
          <button className="w-full py-2 bg-[#4fdbc8] text-[#003731] rounded text-xs font-bold mb-2">
            Details
          </button>
        </div>
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-[#4fdbc8]">
          {item.vote_average.toFixed(1)}
        </div>
      </div>
      <h4 className="text-[#e5e2e1] font-semibold text-sm truncate mb-1">
        {title}
      </h4>
      <div className="flex items-center justify-between">
        <span className="text-[#bbcac6] text-xs">{year}</span>
        <div className="flex items-center text-[#4fdbc8] text-[10px] gap-0.5 font-bold">
          <Star className="h-3 w-3 fill-current" />
          {item.vote_average.toFixed(1)}
        </div>
      </div>
    </Link>
  );
}
