import { Metadata } from "next";
import { siteConfig } from "../config";
import { ContentItem } from "../content/types";

/**
 * Generates a clean excerpt from content string.
 * Strips HTML tags, markdown notation, and collapses whitespace.
 */
export function generateExcerpt(content: string, length: number = 160): string {
  if (!content) return "";

  const cleanText = content
    .replace(/<[^>]*>/g, "") // Strip HTML
    .replace(/!\[.*?\]\(.*?\)/g, "") // Strip images
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Strip links but keep text
    .replace(/[#*`_~]/g, "") // Strip MD markers
    .replace(/\s+/g, " ") // Collapse whitespace
    .trim();

  if (cleanText.length <= length) return cleanText;
  return cleanText.substring(0, length).trim() + "...";
}

/**
 * Builds an absolute OG image URL with full parameters.
 */
export function getOgImageUrl({
  title,
  description,
  type,
}: {
  title: string;
  description?: string;
  type?: string;
}): string {
  const params = new URLSearchParams();
  params.set("title", title);
  if (description) params.set("description", description);
  if (type) params.set("type", type.toLowerCase());

  // Using siteConfig.url to ensure absolute path for SEO
  const baseUrl = siteConfig.url.endsWith("/") 
    ? siteConfig.url.slice(0, -1) 
    : siteConfig.url;
    
  return `${baseUrl}/api/og?${params.toString()}`;
}

/**
 * Generates standard Next.js Metadata for content items or simple pages.
 */
export function generateContentMetadata(
  item: ContentItem | { title: string; description: string; slug: string; type?: string },
  typeLabel: string,
  pathPrefix: string = "",
): Metadata {
  const title = `${item.title} | ${typeLabel}`;
  let description = item.description || "";
  
  if (!description && 'content' in item) {
    description = generateExcerpt(item.rawContent || item.content);
  }

  const ogImage = getOgImageUrl({
    title: item.title,
    description,
    type: (item as any).type || typeLabel,
  });

  const canonicalUrl = `${siteConfig.url.endsWith("/") ? siteConfig.url.slice(0, -1) : siteConfig.url}${pathPrefix}/${item.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1280,
          height: 720,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
