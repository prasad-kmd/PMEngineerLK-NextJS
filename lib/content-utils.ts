import { ContentItem, DEFAULT_IMAGES } from "@/types/content";

/**
 * Returns the preferred image for a content item.
 * Rule: Thumbnail > firstImage > Default.
 */
export function getContentImage(post: ContentItem): string {
  if (post.thumbnail) return post.thumbnail;
  if (post.firstImage) return post.firstImage;
  return (
    DEFAULT_IMAGES[post.type as keyof typeof DEFAULT_IMAGES] ||
    DEFAULT_IMAGES.blog
  );
}
