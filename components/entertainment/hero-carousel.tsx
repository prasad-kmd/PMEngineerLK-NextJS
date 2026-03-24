"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { tmdb } from "@/lib/tmdb";
import { Movie, TVShow } from "@/types/tmdb";
import { BookmarkButton } from "./bookmark-button";
import { cn } from "@/lib/utils";

interface HeroCarouselProps {
  items: (Movie | TVShow)[];
}

export function HeroCarousel({ items }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  if (!items.length) return null;

  const currentItem = items[currentIndex];
  const isMovie = "title" in currentItem;
  const title = isMovie
    ? (currentItem as Movie).title
    : (currentItem as TVShow).name;
  const releaseDate = isMovie
    ? (currentItem as Movie).release_date
    : (currentItem as TVShow).first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
  const type = isMovie ? "movie" : "tv";

  return (
    <section
      className="relative h-[calc(100vh-4rem)] w-full overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images with transitions */}
      {items.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentIndex ? "opacity-100 z-0" : "opacity-0 -z-10",
          )}
        >
          {item.backdrop_path && (
            <Image
              src={tmdb.getImageUrl(item.backdrop_path, "original")!}
              alt={("title" in item ? item.title : item.name) as string}
              fill
              className="object-cover"
              priority={index === 0}
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/60 to-transparent"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-24 max-w-4xl z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-primary/20 text-primary px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase">
            Trending Now
          </span>
          <span className="text-muted-foreground text-sm font-medium">
            {year} • {isMovie ? "Movie" : "TV Show"}
          </span>
        </div>

        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-foreground mb-6 leading-none uppercase animate-in fade-in slide-in-from-bottom-4 duration-700">
          {title}
        </h2>

        <div className="flex items-center gap-4 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <div className="flex items-center text-yellow-400 gap-1">
            <Star className="h-5 w-5 fill-current" />
            <span className="font-bold">
              {currentItem.vote_average.toFixed(1)}
            </span>
          </div>
          <span className="text-muted-foreground font-medium">TMDB Choice</span>
        </div>

        <p className="text-lg text-muted-foreground mb-10 max-w-2xl leading-relaxed line-clamp-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          {currentItem.overview}
        </p>

        <div className="flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Link
            href={`/entertainment/${type}/${currentItem.id}`}
            className="bg-primary text-primary-foreground px-10 py-4 rounded-lg font-bold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-primary/20"
          >
            <Play className="h-5 w-5 fill-current" />
            Watch Now
          </Link>

          <BookmarkButton
            item={{
              id: currentItem.id,
              type,
              title,
              poster_path: currentItem.poster_path!,
              vote_average: currentItem.vote_average,
              release_date: isMovie
                ? (currentItem as Movie).release_date
                : (currentItem as TVShow).first_air_date,
            }}
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-10 right-12 flex gap-4 z-20">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full border border-border/10 bg-background/20 backdrop-blur-md text-foreground hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full border border-border/10 bg-background/20 backdrop-blur-md text-foreground hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
        <div
          className="h-full bg-primary transition-all duration-100 ease-linear"
          style={{
            width: isPaused
              ? "100%"
              : `${((currentIndex + 1) / items.length) * 100}%`,
            transition: isPaused ? "none" : "width 5s linear",
          }}
        />
      </div>
    </section>
  );
}
