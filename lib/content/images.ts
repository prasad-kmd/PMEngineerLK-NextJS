import { ContentItem, ContentType } from "./types";

export const DEFAULT_IMAGES: Record<string, string> = {
  blog: "/img/page/diary_page.webp",
  articles: "/img/page/workflow.webp",
  projects: "/img/page/workflow.webp",
  tutorials: "/img/page/workflow.webp",
  wiki: "/img/page/diary_page.webp",
  default: "/img/page/diary_page.webp",
};

/**
 * Extracts the first image URL from Markdown or HTML content.
 */
export function extractFirstImage(
  content: string,
  isMarkdown: boolean,
): string | undefined {
  if (isMarkdown) {
    const markdownImageRegex = /!\[.*?\]\((.*?)\)/;
    const match = content.match(markdownImageRegex);
    if (match && match[1]) {
      return match[1];
    }
  }

  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["']/i;
  const match = content.match(htmlImageRegex);
  if (match && match[1]) {
    return match[1];
  }

  return undefined;
}

/**
 * Returns the best image for a content item based on fallback rules:
 * 1. thumbnail
 * 2. firstImage
 * 3. Default image based on content type
 */
export function getContentImage(post: ContentItem): string {
  if (post.thumbnail) return post.thumbnail;
  if (post.firstImage) return post.firstImage;

  const type = post.type || "default";
  return DEFAULT_IMAGES[type] || DEFAULT_IMAGES.default;
}
