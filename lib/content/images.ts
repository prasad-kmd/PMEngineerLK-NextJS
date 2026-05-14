import { ContentItem } from "./types";

export const DEFAULT_IMAGES: Record<string, string> = {
  blog: "/images/defaults/blog.jpg",
  articles: "/images/defaults/articles.jpg",
  projects: "/images/defaults/projects.jpg",
  tutorials: "/images/defaults/tutorials.jpg",
  wiki: "/images/defaults/wiki.jpg",
  default: "/images/defaults/default.jpg",
};

/**
 * Gets the thumbnail for a content item, following selection rules.
 */
export function getContentImage(item: ContentItem): string {
  if (item.thumbnail) return item.thumbnail;
  if (item.firstImage) return item.firstImage;

  if (item.type && DEFAULT_IMAGES[item.type]) {
    return DEFAULT_IMAGES[item.type];
  }

  return DEFAULT_IMAGES.default;
}
