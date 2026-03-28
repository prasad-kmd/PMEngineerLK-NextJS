"use client";

import { useState, useEffect } from "react";

export interface Bookmark {
  id: number;
  type: "movie" | "tv";
  title: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

export function useEntertainmentBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("gsc_bookmarks");
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse bookmarks", e);
      }
    }
  }, []);

  const toggleBookmark = (item: Bookmark) => {
    const isBookmarked = bookmarks.some((b) => b.id === item.id);
    let newBookmarks;

    if (isBookmarked) {
      newBookmarks = bookmarks.filter((b) => b.id !== item.id);
    } else {
      newBookmarks = [...bookmarks, item];
    }

    setBookmarks(newBookmarks);
    localStorage.setItem("gsc_bookmarks", JSON.stringify(newBookmarks));
  };

  const isBookmarked = (id: number) => {
    return bookmarks.some((b) => b.id === id);
  };

  return { bookmarks, toggleBookmark, isBookmarked };
}
