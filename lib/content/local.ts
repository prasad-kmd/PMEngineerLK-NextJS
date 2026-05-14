import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ContentItem, ContentType, Author } from "./types";
import { extractFirstImage } from "./images";
import { calculateReadingTime } from "./utils";
import { marked } from "../render/markdown";
import { highlightCodeBlocks } from "../render/shiki";
import {
  sanitizeContent,
  injectQuiz,
  injectAlerts,
  injectHeadingIds,
  injectShortcodes,
} from "../render/processors";

const contentDirectory = path.join(process.cwd(), "content");

/**
 * Gets all content items of a specific type from the local file system.
 */
export function getLocalContentByType(type: ContentType): ContentItem[] {
  const typeDirectory = path.join(contentDirectory, type);

  if (!fs.existsSync(typeDirectory)) {
    return [];
  }

  const files = fs.readdirSync(typeDirectory);

  return files
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
      };
    })
    .sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
}

/**
 * Gets a single content item by type and slug from the local file system.
 */
export async function getLocalContentItem(
  type: ContentType,
  slug: string,
): Promise<ContentItem | null> {
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
  const { data, content } = matter(fileContents);

  if (isMarkdown) {
    const protectedContent = content.replace(
      /\$\$\s*([\s\S]*?)\s*\$\$/g,
      (match, math) => {
        return `\n\n<div class="math-display">$$${math.trim()}$$</div>\n\n`;
      },
    );

    const htmlContent = (await marked.parse(protectedContent)) as string;
    const highlightedHtml = await highlightCodeBlocks(htmlContent);
    const firstImage = extractFirstImage(content, true);

    return {
      slug,
      title: data.title || slug,
      date: data.date,
      description: data.description,
      content: sanitizeContent(
        await injectShortcodes(injectQuiz(injectAlerts(injectHeadingIds(highlightedHtml)))),
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
    const highlightedHtml = await highlightCodeBlocks(content);
    const firstImage = extractFirstImage(content, false);

    return {
      slug,
      title: data.title || slug,
      date: data.date,
      description: data.description,
      content: sanitizeContent(
        await injectShortcodes(injectQuiz(injectAlerts(injectHeadingIds(highlightedHtml)))),
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
}

/**
 * Gets author details from the local file system.
 */
export async function getLocalAuthor(slug: string, full = false): Promise<Author | null> {
  const authorPath = path.join(contentDirectory, "authors", `${slug}.md`);
  if (!fs.existsSync(authorPath)) return null;
  const fileContents = fs.readFileSync(authorPath, "utf8");
  const { data, content } = matter(fileContents);

  if (!full) {
    return { ...(data as Author), slug };
  }

  let bodyContent: string | undefined;
  if (content.trim()) {
    const rawHtml = (await marked.parse(content)) as string;
    bodyContent = sanitizeContent(injectAlerts(injectHeadingIds(rawHtml)));
  }

  return {
    ...(data as Author),
    slug,
    bodyContent,
  };
}

/**
 * Gets all authors from the local file system.
 */
export function getLocalAllAuthors(): Author[] {
  const authorsDirectory = path.join(contentDirectory, "authors");

  if (!fs.existsSync(authorsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(authorsDirectory);
  return files
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
}
