import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import { isNotionEnabled, NotionAPIError } from "./notion";
import { unstable_cache } from "next/cache";
import {
  injectAlerts,
  injectHeadingIds,
  injectQuiz,
  sanitizeContent,
} from "./content/transformers";
import { notionConfig } from "./constants";
import { marked } from "./render/marked";
import { ContentItem, Author } from "./content/types";
import { calculateReadingTime, extractFirstImage } from "./content/utils";
import {
  fetchNotionContentByType,
  fetchNotionContentItem,
  fetchAuthorBasic,
  fetchAuthorFull,
  fetchAllAuthors,
} from "./content/fetchers";
import { highlightCodeBlocks, injectShortcodes } from "./render/processors";

export type { ContentItem, Author };

const contentDirectory = path.join(process.cwd(), "content");

/**
 * Gets all content items of a specific type.
 * Uses React cache and Next.js unstable_cache for optimal performance.
 */
export const getContentByType = cache(async function (
  type: "blog" | "articles" | "projects" | "tutorials" | "wiki",
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
    } catch {
      console.error(`Cache fetch failed for ${type}`);
      return [];
    }
  }

  const typeDirectory = path.join(contentDirectory, type);

  if (!fs.existsSync(typeDirectory)) {
    return [];
  }

  const files = fs.readdirSync(typeDirectory);

  const items = files
    .filter((file) => file.endsWith(".md") || file.endsWith(".html"))
    .map((file) => {
      const fullPath = path.join(typeDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const filenameSlug = file.replace(/\.(md|html)$/, "");
      const slug = data.slug || filenameSlug;

      const firstImage = extractFirstImage(content, file.endsWith(".md"));

      return {
        slug,
        title: data.title || slug,
        date: data.date,
        description: data.description,
        content: "",
        rawContent: content,
        final: data.final || false,
        firstImage,
        readingTime: calculateReadingTime(content),
        technical: data.technical,
        category: data.category,
        tags: data.tags,
        aiAssisted: data.aiAssisted || false,
        author: data.author,
        type: type,
      } as ContentItem;
    })
    .sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });

  return items;
});

/**
 * Gets a single content item by type and slug.
 */
export const getContentItem = cache(async function (
  type: "blog" | "articles" | "projects" | "tutorials" | "wiki",
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
    } catch {
      console.error(`Cache fetch failed for ${type}/${slug}`);
      return null;
    }
  }

  const typeDirectory = path.join(contentDirectory, type);

  const mdPath = path.join(typeDirectory, `${slug}.md`);
  const htmlPath = path.join(typeDirectory, `${slug}.html`);

  let fullPath: string;
  let isMarkdown: boolean;

  if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
    isMarkdown = true;
  } else if (fs.existsSync(htmlPath)) {
    fullPath = htmlPath;
    isMarkdown = false;
  } else {
    if (!fs.existsSync(typeDirectory)) return null;
    const files = fs.readdirSync(typeDirectory);
    const foundFile = files.find((file) => {
      if (!file.endsWith(".md") && !file.endsWith(".html")) return false;
      const filePath = path.join(typeDirectory, file);
      const content = fs.readFileSync(filePath, "utf8");
      const { data } = matter(content);
      return data.slug === slug;
    });

    if (foundFile) {
      fullPath = path.join(typeDirectory, foundFile);
      isMarkdown = foundFile.endsWith(".md");
    } else {
      return null;
    }
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  if (isMarkdown) {
    const { data, content } = matter(fileContents);

    const protectedContent = content.replace(
      /\$\$\s*([\s\S]*?)\s*\$\$/g,
      (match, math) => {
        return `\n\n<div class="math-display">$$${math.trim()}$$</div>\n\n`;
      },
    );

    const htmlContent = (await marked.parse(protectedContent)) as string;
    const highlightedHtml = await highlightCodeBlocks(htmlContent);
    const shortcodesInjected = await injectShortcodes(highlightedHtml);

    const firstImage = extractFirstImage(content, true);

    return {
      slug,
      title: data.title || slug,
      date: data.date,
      description: data.description,
      content: sanitizeContent(
        injectQuiz(
          injectAlerts(injectHeadingIds(shortcodesInjected)),
        ),
      ),
      rawContent: content,
      final: data.final || false,
      firstImage,
      readingTime: calculateReadingTime(content),
      technical: data.technical,
      category: data.category,
      tags: data.tags,
      aiAssisted: data.aiAssisted || false,
      author: data.author,
      type: type,
    };
  } else {
    const { data, content } = matter(fileContents);
    const highlightedHtml = await highlightCodeBlocks(content);
    const shortcodesInjected = await injectShortcodes(highlightedHtml);
    const firstImage = extractFirstImage(content, false);

    return {
      slug,
      title: data.title || slug,
      date: data.date,
      description: data.description,
      content: sanitizeContent(
        injectQuiz(
          injectAlerts(injectHeadingIds(shortcodesInjected)),
        ),
      ),
      rawContent: content,
      final: data.final || false,
      firstImage,
      readingTime: calculateReadingTime(content),
      technical: data.technical,
      category: data.category,
      tags: data.tags,
      aiAssisted: data.aiAssisted || false,
      author: data.author,
      type: type,
    };
  }
});

/** Sync variant — only reads frontmatter, no body parsing. For use in card components. */
export const getAuthorBasic = cache(async function (
  slug: string,
): Promise<Author | null> {
  if (isNotionEnabled) {
    const fetcher = unstable_cache(
      async () => fetchAuthorBasic(slug),
      [`author-basic-${slug}`],
      {
        revalidate: notionConfig.revalidate,
        tags: ["authors", ...notionConfig.defaultTags],
      },
    );
    try {
      return await fetcher();
    } catch {
      return null;
    }
  }

  const authorPath = path.join(contentDirectory, "authors", `${slug}.md`);
  if (!fs.existsSync(authorPath)) return null;
  const fileContents = fs.readFileSync(authorPath, "utf8");
  const { data } = matter(fileContents);
  return { ...(data as Author), slug };
});

/**
 * Gets full author details including bio and body content.
 */
export const getAuthorBySlug = cache(async function (
  slug: string,
): Promise<Author | null> {
  if (isNotionEnabled) {
    const fetcher = unstable_cache(
      async () => fetchAuthorFull(slug),
      [`author-full-${slug}`],
      {
        revalidate: notionConfig.revalidate,
        tags: ["authors", ...notionConfig.defaultTags],
      },
    );
    try {
      return await fetcher();
    } catch {
      return null;
    }
  }

  const authorPath = path.join(contentDirectory, "authors", `${slug}.md`);

  if (!fs.existsSync(authorPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(authorPath, "utf8");
  const { data, content } = matter(fileContents);

  let bodyContent: string | undefined;
  if (content.trim()) {
    const rawHtml = (await marked.parse(content)) as string;
    const shortcodesInjected = await injectShortcodes(rawHtml);
    bodyContent = sanitizeContent(
      injectAlerts(injectHeadingIds(shortcodesInjected)),
    );
  }

  return {
    ...(data as Author),
    slug,
    bodyContent,
  };
});

/**
 * Gets all authors.
 */
export const getAllAuthors = cache(async function (): Promise<Author[]> {
  if (isNotionEnabled) {
    const fetcher = unstable_cache(
      async () => fetchAllAuthors(),
      ["all-authors"],
      {
        revalidate: notionConfig.revalidate,
        tags: ["authors", ...notionConfig.defaultTags],
      },
    );
    try {
      return await fetcher();
    } catch {
      return [];
    }
  }

  const authorsDirectory = path.join(contentDirectory, "authors");

  if (!fs.existsSync(authorsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(authorsDirectory);
  const authors = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(authorsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        ...(data as Author),
        slug,
      };
    });

  return authors;
});
