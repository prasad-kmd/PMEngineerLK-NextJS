import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { env } from "../env";

/**
 * Custom Error for Notion API related failures.
 */
export class NotionAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = "NotionAPIError";
  }
}

// Initialize Notion client
export const notion = new Client({
  auth: env.NOTION_AUTH_TOKEN,
});

// Initialize Notion to Markdown converter
export const n2m = new NotionToMarkdown({ notionClient: notion });

export const DATABASE_IDS = {
  blog: env.NOTION_BLOG_ID,
  articles: env.NOTION_ARTICLES_ID,
  projects: env.NOTION_PROJECTS_ID,
  tutorials: env.NOTION_TUTORIALS_ID,
  wiki: env.NOTION_WIKI_ID,
  authors: env.NOTION_AUTHORS_ID,
};

export const isNotionEnabled = !!(env.NOTION_AUTH_TOKEN && DATABASE_IDS.blog);

/**
 * Performs a global search across Notion.
 */
export async function searchNotion(query: string) {
  if (!isNotionEnabled) return [];
  try {
    const response = await notion.search({
      query,
      sort: {
        direction: "descending",
        timestamp: "last_edited_time",
      },
      page_size: 20,
    });
    return response.results;
  } catch (error) {
    console.error("Notion search error:", error);
    return [];
  }
}

// Notion types for better type safety
export interface NotionPage {
  id: string;
  properties: Record<string, unknown>;
}

export interface NotionTitleProperty {
  type: "title";
  title: Array<{ plain_text: string }>;
}

export interface NotionRichTextProperty {
  type: "rich_text";
  rich_text: Array<{ plain_text: string }>;
}
