"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle, Calendar, Tag } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface GalleryItem {
  id: string;
  src: string;
  thumbnail: string;
  alt: string;
  title: string;
  category: string;
  date: string | null;
}

interface GalleryClientProps {
  initialItems: GalleryItem[];
  initialNextCursor: string | null;
  initialHasMore: boolean;
}

export default function GalleryClient({ 
  initialItems, 
  initialNextCursor, 
  initialHasMore 
}: GalleryClientProps) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [cursor, setCursor] = useState<string | null>(initialNextCursor);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchMoreItems = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/gallery?cursor=${cursor || ""}&limit=9`);
      if (!response.ok) throw new Error("Failed to fetch more items");
      
      const data = await response.json();
      setItems((prev) => [...prev, ...data.items]);
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (err) {
      console.error("Gallery Fetch Error:", err);
      setError("Failed to load more images. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [cursor, hasMore, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMoreItems();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [fetchMoreItems, hasMore]);

  return (
    <div className="space-y-12">
      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5 }}
              className="group relative cursor-pointer overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <Badge variant="secondary" className="mb-2 backdrop-blur-md">
                    {item.category}
                  </Badge>
                  <h3 className="text-lg font-semibold text-white line-clamp-1">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Loading & States */}
      <div ref={observerTarget} className="flex flex-col items-center justify-center py-10">
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading technical assets...</span>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-4 text-destructive">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => fetchMoreItems()}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Retry
            </button>
          </div>
        )}

        {!hasMore && items.length > 0 && (
          <p className="text-sm text-muted-foreground">
            You've reached the end of the documentation archive.
          </p>
        )}
      </div>

      {/* Modal / Dialog using Radix-based UI component for accessibility */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none sm:max-w-5xl">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedImage?.title}</DialogTitle>
            <DialogDescription>{selectedImage?.alt}</DialogDescription>
          </DialogHeader>
          
          <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-card/95 backdrop-blur-xl border shadow-2xl">
            <div className="relative aspect-video w-full">
              {selectedImage && (
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain p-2"
                  priority
                />
              )}
            </div>
            
            <div className="w-full bg-background/50 p-6 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold tracking-tight">
                    {selectedImage?.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedImage?.alt}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {selectedImage?.category && (
                    <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                      <Tag className="h-4 w-4" />
                      {selectedImage.category}
                    </div>
                  )}
                  {selectedImage?.date && (
                    <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground border-l pl-3">
                      <Calendar className="h-4 w-4" />
                      {new Date(selectedImage.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
