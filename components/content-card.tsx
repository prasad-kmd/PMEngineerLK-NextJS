"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Author, ContentItem } from "@/types/content";
import { getContentImage } from "@/lib/content-utils";
import { getAuthorBasic } from "@/lib/author-client";
import { useEffect, useState } from "react";

interface ContentCardProps {
  post: ContentItem;
  basePath: string;
}

function appendCategories(
  category?: string | string[],
  technical?: string | string[],
): string[] {
  const cats: string[] = [];

  const process = (val: string | string[] | undefined) => {
    if (!val) return;
    if (typeof val === "string") {
      val.split(",").forEach((c) => {
        const trimmed = c.trim();
        if (trimmed && !cats.includes(trimmed)) cats.push(trimmed);
      });
    } else if (Array.isArray(val)) {
      val.forEach((c: string) => {
        if (c && !cats.includes(c)) cats.push(c);
      });
    }
  };

  process(category);
  process(technical);

  return cats;
}

export function ContentCard({ post, basePath }: ContentCardProps) {
  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    if (post.author) {
      getAuthorBasic(post.author).then(setAuthor);
    }
  }, [post.author]);

  const cardImage = getContentImage(post);

  return (
    <Link
      href={`${basePath}/${post.slug}`}
      className="group relative flex w-full flex-col overflow-hidden rounded-xl md:rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-2xl hover:border-primary/40 hover:-translate-y-1.5 aspect-video md:aspect-3/2 min-h-[200px] md:min-h-[300px]"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={cardImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-br from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex h-full flex-col p-4 md:p-6">
        {/* Top Bar: Categories and Arrow */}
        <div className="flex items-center justify-between mb-2 md:mb-4">
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {appendCategories(post.category, post.technical)
              .slice(0, 2)
              .map((cat, i) => (
                <Badge
                  key={i}
                  className="px-2 md:px-3 py-0.5 md:py-1 text-[8px] md:text-[10px] font-bold uppercase tracking-widest local-jetbrains-mono border-0 bg-primary text-white shadow-lg shadow-primary/30"
                >
                  {cat}
                </Badge>
              ))}
          </div>
          <div className="p-1.5 rounded-full border transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 bg-white/10 border-white/20 text-white">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        {/* Middle: Title and Description */}
        <div className="grow overflow-hidden mt-1 md:mt-0">
          <h2 className="mb-1.5 md:mb-3 text-lg md:text-2xl font-bold transition-colors duration-300 line-clamp-2 mozilla-headline leading-[1.1] group-hover:text-primary text-white">
            {post.title}
          </h2>

          {post.description && (
            <p className="text-[10px] md:text-xs line-clamp-2 md:line-clamp-3 font-google-sans leading-relaxed opacity-80 text-gray-300">
              {post.description}
            </p>
          )}
        </div>

        {/* Bottom Section: Author, Date, and Tags */}
        <div className="mt-2 md:mt-4 pt-2 md:pt-4 border-t flex flex-col gap-2 md:gap-4 border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-2.5">
              <div className="relative h-6 w-6 md:h-7 md:w-7 overflow-hidden rounded-full border transition-transform duration-300 border-white/20">
                {author?.avatar ? (
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                    <User className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
              <p className="text-[9px] md:text-[11px] font-bold uppercase tracking-wider local-jetbrains-mono text-white">
                {author?.name || "Anonymous"}
              </p>
            </div>

            {post.date && (
              <div className="flex items-center gap-1 md:gap-1.5 text-[9px] md:text-[11px] space-mono text-gray-400">
                <Calendar className="h-3 w-3" />
                {new Date(post.date).toLocaleDateString("en-UK", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="hidden md:flex flex-wrap gap-2 overflow-hidden">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="whitespace-nowrap text-[10px] font-medium px-2.5 py-1 rounded-md border bg-white/5 border-white/10 text-white/60 group-hover:text-white/90"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
