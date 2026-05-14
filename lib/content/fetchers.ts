import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  notion,
  n2m,
  DATABASE_IDS,
  isNotionEnabled,
  getPlainText,
  getDate,
  getMultiSelect,
  getSelect,
  getCheckbox,
  getImageUrl,
  getNumber,
  NotionAPIError,
} from "../notion";
import { unstable_cache } from "next/cache";
import {
  injectAlerts,
  injectHeadingIds,
  injectQuiz,
  sanitizeContent,
} from "./transformers";
import { notionConfig } from "../constants";
import { marked } from "../render/marked";
import { ContentItem, Author } from "./types";
import { calculateReadingTime, extractFirstImage } from "./utils";
import { highlightCodeBlocks } from "../render/processors";

const contentDirectory = path.join(process.cwd(), "content");

/**
 * Low-level fetcher for Notion content list.
 */
export async function fetchNotionContentByType(
  type: "blog" | "articles" | "projects" | "tutorials" | "wiki",
): Promise<ContentItem[]> {
  const databaseId = DATABASE_IDS[type as keyof typeof DATABASE_IDS];
  if (!databaseId) return [];

  try {
    const dbObj = await notion.databases.retrieve({ database_id: databaseId });
    // @ts-expect-error - Notion SDK might not have data_sources yet
    const dataSourceId = dbObj.data_sources?.[0]?.id || databaseId;
    const response = await (notion as unknown).dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "Status",
        select: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    const items = await Promise.all(
      (response as unknown).results.map(async (page: unknown) => {
        const props = page.properties;
        const slug = getPlainText(props.Slug);
        const title = getPlainText(props.Name || props.Title);
        const date = getDate(props.Date);
        const description = getPlainText(props.Description);
        const tags = getMultiSelect(props.Tags);
        const category = getSelect(props.Categories);
        const aiAssisted = getCheckbox(props.AIAssisted);
        const technical = getMultiSelect(props.Technical).join(", ");
        const thumbnail = getImageUrl(props.Thumbnail);
        const rTime = getNumber(props.RTime);

        let authorSlug = "";
        if (
          props.Authors &&
          props.Authors.relation &&
          props.Authors.relation.length > 0
        ) {
          const authorPage = await notion.pages.retrieve({
            page_id: props.Authors.relation[0].id,
          });
          authorSlug = getPlainText((authorPage as unknown).properties.Slug);
        }

        return {
          id: page.id as string,
          slug,
          title,
          date,
          description,
          content: "",
          rawContent: "",
          final: true,
          firstImage: undefined,
          readingTime: 0,
          thumbnail,
          rTime,
          technical,
          category,
          tags,
          aiAssisted,
          author: authorSlug,
          type: type,
        };
      }),
    );

    return items;
  } catch (error) {
    console.error(`Error fetching Notion content for ${type}:`, error);
    throw new NotionAPIError(
      `Failed to fetch Notion content for ${type}`,
      500,
      error,
    );
  }
}

/**
 * Low-level fetcher for a single Notion content item.
 */
export async function fetchNotionContentItem(
  type: "blog" | "articles" | "projects" | "tutorials" | "wiki",
  slug: string,
): Promise<ContentItem | null> {
  const databaseId = DATABASE_IDS[type as keyof typeof DATABASE_IDS];
  if (!databaseId) return null;

  try {
    const dbObj = await notion.databases.retrieve({ database_id: databaseId });
    // @ts-expect-error - Notion SDK might not have data_sources yet
    const dataSourceId = dbObj.data_sources?.[0]?.id || databaseId;
    const response = await (notion as unknown).dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    if ((response as unknown).results.length === 0) return null;

    const page = (response as unknown).results[0];
    const props = page.properties;

    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks).parent;

    const title = getPlainText(props.Name || props.Title);
    const date = getDate(props.Date);
    const description = getPlainText(props.Description);
    const tags = getMultiSelect(props.Tags);
    const category = getSelect(props.Categories);
    const aiAssisted = getCheckbox(props.AIAssisted);
    const technical = getMultiSelect(props.Technical).join(", ");
    const thumbnail = getImageUrl(props.Thumbnail);
    const rTime = getNumber(props.RTime);

    let authorSlug = "";
    if (
      props.Authors &&
      props.Authors.relation &&
      props.Authors.relation.length > 0
    ) {
      const authorPage = await notion.pages.retrieve({
        page_id: props.Authors.relation[0].id,
      });
      authorSlug = getPlainText((authorPage as unknown).properties.Slug);
    }

    const protectedContent = mdString.replace(
      /\$\$\s*([\s\S]*?)\s*\$\$/g,
      (match, math) => {
        return `\n\n<div class="math-display">$$${math.trim()}$$</div>\n\n`;
      },
    );

    const htmlContent = (await marked.parse(protectedContent)) as string;
    const highlightedHtml = await highlightCodeBlocks(htmlContent);
    const firstImage = extractFirstImage(mdString, true);

    return {
      id: page.id as string,
      slug,
      title,
      date,
      description,
      content: sanitizeContent(
        injectQuiz(injectAlerts(injectHeadingIds(highlightedHtml))),
      ),
      rawContent: mdString,
      final: true,
      firstImage,
      readingTime: calculateReadingTime(mdString),
      thumbnail,
      rTime,
      technical,
      category,
      tags,
      aiAssisted,
      author: authorSlug,
      type: type,
    };
  } catch (error) {
    console.error(`Error fetching Notion item ${slug} for ${type}:`, error);
    throw new NotionAPIError(`Failed to fetch Notion item ${slug}`, 500, error);
  }
}

/**
 * Fetches all authors from Notion.
 */
export async function fetchAllAuthors(): Promise<Author[]> {
  const databaseId = DATABASE_IDS.authors;
  if (!databaseId) return [];
  const dbObj = await notion.databases.retrieve({
    database_id: databaseId,
  });
  // @ts-expect-error - Notion SDK might not have data_sources yet
  const dataSourceId = dbObj.data_sources?.[0]?.id || databaseId;
  const response = await (notion as unknown).dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: "Status",
      select: {
        equals: "Published",
      },
    },
  });

  return (response as unknown).results.map((page: unknown) => {
    const props = page.properties;
    return {
      name: getPlainText(props.Name || props.Title),
      slug: getPlainText(props.Slug),
      role: getPlainText(props.Role),
      bio: getPlainText(props.Biography),
      avatar: getImageUrl(props.avatar || props.Avatar) || "",
      twitter: getPlainText(props.twitter || props.Twitter),
      github: getPlainText(props.GitHub || props.github),
      linkedin: getPlainText(
        props.linkedin || props.LinkedIn || props.Linkedin,
      ),
    };
  });
}

/**
 * Fetches basic author info from Notion.
 */
export async function fetchAuthorBasic(slug: string): Promise<Author | null> {
  const databaseId = DATABASE_IDS.authors;
  if (!databaseId) return null;
  const dbObj = await notion.databases.retrieve({
    database_id: databaseId,
  });
  // @ts-expect-error - Notion SDK might not have data_sources yet
  const dataSourceId = dbObj.data_sources?.[0]?.id || databaseId;
  const response = await (notion as unknown).dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });
  if ((response as unknown).results.length === 0) return null;
  const page = (response as unknown).results[0];
  const props = page.properties;
  return {
    name: getPlainText(props.Name || props.Title),
    slug,
    role: getPlainText(props.Role),
    bio: getPlainText(props.Biography),
    avatar: getImageUrl(props.avatar || props.Avatar) || "",
    twitter: getPlainText(props.twitter || props.Twitter),
    github: getPlainText(props.GitHub || props.github),
    linkedin: getPlainText(props.linkedin || props.LinkedIn || props.Linkedin),
  };
}

/**
 * Fetches full author details from Notion.
 */
export async function fetchAuthorFull(slug: string): Promise<Author | null> {
  const databaseId = DATABASE_IDS.authors;
  if (!databaseId) return null;
  const dbObj = await notion.databases.retrieve({
    database_id: databaseId,
  });
  // @ts-expect-error - Notion SDK might not have data_sources yet
  const dataSourceId = dbObj.data_sources?.[0]?.id || databaseId;
  const response = await (notion as unknown).dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });
  if ((response as unknown).results.length === 0) return null;
  const page = (response as unknown).results[0];
  const props = page.properties;

  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks).parent;

  let bodyContent: string | undefined;
  if (mdString.trim()) {
    const rawHtml = (await marked.parse(mdString)) as string;
    bodyContent = sanitizeContent(injectAlerts(injectHeadingIds(rawHtml)));
  }

  return {
    name: getPlainText(props.Name || props.Title),
    slug,
    role: getPlainText(props.Role),
    bio: getPlainText(props.Biography),
    avatar: getImageUrl(props.avatar || props.Avatar) || "",
    twitter: getPlainText(props.twitter || props.Twitter),
    github: getPlainText(props.GitHub || props.github),
    linkedin: getPlainText(props.linkedin || props.LinkedIn || props.Linkedin),
    bodyContent,
  };
}
