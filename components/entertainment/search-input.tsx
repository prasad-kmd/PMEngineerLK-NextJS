"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Loader2, X } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

export function SearchInput({
  placeholder = "Search movies, TV shows...",
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 500);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (debouncedQuery !== initialQuery) {
      startTransition(() => {
        if (debouncedQuery) {
          router.push(
            `/entertainment/search?q=${encodeURIComponent(debouncedQuery)}`,
          );
        } else {
          router.push(`/entertainment/search`);
        }
      });
    }
  }, [debouncedQuery, initialQuery, router]);

  return (
    <div className={`relative group ${className}`}>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
        {isPending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Search className="h-5 w-5" />
        )}
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-muted/50 border border-border/10 rounded-2xl pl-12 pr-12 py-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg backdrop-blur-md"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
