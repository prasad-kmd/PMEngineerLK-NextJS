import { cache } from "react";
import { unstable_cache } from "next/cache";
import { isNotionEnabled } from "./notion";
import { notionConfig } from "./constants";
import { Author, ContentItem, ContentType } from "./content/types";
import {
  fetchNotionContentByType,
  fetchNotionContentItem,
  fetchNotionAuthorBasic,
  fetchNotionAuthorFull,
  fetchAllNotionAuthors,
} from "./content/notion";
import {
  getLocalContentByType,
  getLocalContentItem,
  getLocalAuthor,
  getLocalAllAuthors,
} from "./content/local";

export * from "./content/types";

/**
 * Gets all content items of a specific type.
 * Uses React cache and Next.js unstable_cache for optimal performance.
 */
export const getContentByType = cache(async function (
  type: ContentType,
): Promise<ContentItem[]> {
  if (isNotionEnabled) {
    const fetcher = unstable_cache(
      async () => fetchNotionContentByType(type),
      [`content-list-${type}`],
      {
        revalidate: notionConfig.revalidate,
        tags: [`content-${type}`, ...notionConfig.defaultTags],
      },
    );
    try {
      return await fetcher();
    } catch (e) {
      console.error(`Cache fetch failed for ${type}`, e);
      return [];
    }
  }

  return getLocalContentByType(type);
});

/**
 * Gets a single content item by type and slug.
 */
export const getContentItem = cache(async function (
  type: ContentType,
  slug: string,
): Promise<ContentItem | null> {
  if (isNotionEnabled) {
    const fetcher = unstable_cache(
      async () => fetchNotionContentItem(type, slug),
      [`content-item-${type}-${slug}`],
      {
        revalidate: notionConfig.revalidate,
        tags: [
          `content-${type}`,
          `content-item-${slug}`,
          ...notionConfig.defaultTags,
        ],
      },
    );
    try {
      return await fetcher();
    } catch (e) {
      console.error(`Cache fetch failed for ${type}/${slug}`, e);
      return null;
    }
  }

  return getLocalContentItem(type, slug);
});

/** Sync variant — only reads frontmatter, no body parsing. For use in card components. */
export const getAuthorBasic = cache(async function (
  slug: string,
): Promise<Author | null> {
  if (isNotionEnabled) {
    const fetcher = unstable_cache(
      async () => fetchNotionAuthorBasic(slug),
      [`author-basic-${slug}`],
      {
        revalidate: notionConfig.revalidate,
        tags: ["authors", ...notionConfig.defaultTags],
      },
    );
    try {
      return await fetcher();
    } catch (e) {
      console.error(`Cache fetch failed for author basic ${slug}`, e);
      return null;
    }
  }

  return getLocalAuthor(slug, false);
});

/**
 * Gets full author details including bio and body content.
 */
export const getAuthorBySlug = cache(async function (
  slug: string,
): Promise<Author | null> {
  if (isNotionEnabled) {
    const fetcher = unstable_cache(
      async () => fetchNotionAuthorFull(slug),
      [`author-full-${slug}`],
      {
        revalidate: notionConfig.revalidate,
        tags: ["authors", ...notionConfig.defaultTags],
      },
    );
    try {
      return await fetcher();
    } catch (e) {
      console.error(`Cache fetch failed for author full ${slug}`, e);
      return null;
    }
  }

  return getLocalAuthor(slug, true);
});

/**
 * Gets all authors.
 */
export const getAllAuthors = cache(async function (): Promise<Author[]> {
  if (isNotionEnabled) {
    const fetcher = unstable_cache(
      async () => fetchAllNotionAuthors(),
      ["all-authors"],
      {
        revalidate: notionConfig.revalidate,
        tags: ["authors", ...notionConfig.defaultTags],
      },
    );
    try {
      return await fetcher();
    } catch (e) {
      console.error("Cache fetch failed for all authors", e);
      return [];
    }
  }

  return getLocalAllAuthors();
});
