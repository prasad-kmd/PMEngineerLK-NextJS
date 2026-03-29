import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import pMemoize from "p-memoize";

const getNotionClient = () => {
  return new Client({
    auth: process.env.NOTION_AUTH_TOKEN,
  });
};

const getN2M = () => {
  return new NotionToMarkdown({ notionClient: getNotionClient() });
};

export interface NotionPageMetadata {
  id: string;
  slug: string;
  title: string;
  date?: string;
  description?: string;
  status?: string;
  tags?: string[];
  category?: string;
  final?: boolean;
  aiAssisted?: boolean;
  technical?: string;
}

async function getDatabaseEntriesInternal(databaseId: string): Promise<NotionPageMetadata[]> {
  if (!databaseId || !process.env.NOTION_AUTH_TOKEN) return [];

  const notion = getNotionClient();
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Status",
      status: {
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

  return response.results.map((page: any) => {
    const props = page.properties;

    // Helper to get property value safely
    const getProp = (name: string, type: string) => {
      const prop = props[name];
      if (!prop) return undefined;
      if (type === "title") return prop.title?.[0]?.plain_text || "";
      if (type === "rich_text") return prop.rich_text?.[0]?.plain_text || "";
      if (type === "date") return prop.date?.start;
      if (type === "status") return prop.status?.name;
      if (type === "multi_select") return prop.multi_select?.map((opt: any) => opt.name);
      if (type === "checkbox") return prop.checkbox;
      if (type === "select") return prop.select?.name;
      return undefined;
    };

    return {
      id: page.id,
      slug: getProp("Slug", "rich_text") || page.id,
      title: getProp("Title", "title") || "Untitled",
      date: getProp("Date", "date"),
      description: getProp("Description", "rich_text"),
      status: getProp("Status", "status"),
      tags: getProp("Tags", "multi_select"),
      category: getProp("Category", "select"),
      final: getProp("Final", "checkbox") || false,
      aiAssisted: getProp("AIAssisted", "checkbox") || false,
      technical: getProp("Technical", "rich_text"),
    };
  });
}

async function getPageContentInternal(pageId: string): Promise<string> {
  if (!process.env.NOTION_AUTH_TOKEN) return "";
  const n2m = getN2M();
  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdblocks);
  return mdString.parent;
}

async function getPageBySlugInternal(databaseId: string, slug: string): Promise<NotionPageMetadata | null> {
  if (!databaseId || !process.env.NOTION_AUTH_TOKEN) return null;

  const notion = getNotionClient();
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });

  if (response.results.length === 0) return null;

  const page = response.results[0] as any;
  const props = page.properties;

  const getProp = (name: string, type: string) => {
    const prop = props[name];
    if (!prop) return undefined;
    if (type === "title") return prop.title?.[0]?.plain_text || "";
    if (type === "rich_text") return prop.rich_text?.[0]?.plain_text || "";
    if (type === "date") return prop.date?.start;
    if (type === "status") return prop.status?.name;
    if (type === "multi_select") return prop.multi_select?.map((opt: any) => opt.name);
    if (type === "checkbox") return prop.checkbox;
    if (type === "select") return prop.select?.name;
    return undefined;
  };

  return {
    id: page.id,
    slug: getProp("Slug", "rich_text") || page.id,
    title: getProp("Title", "title") || "Untitled",
    date: getProp("Date", "date"),
    description: getProp("Description", "rich_text"),
    status: getProp("Status", "status"),
    tags: getProp("Tags", "multi_select"),
    category: getProp("Category", "select"),
    final: getProp("Final", "checkbox") || false,
    aiAssisted: getProp("AIAssisted", "checkbox") || false,
    technical: getProp("Technical", "rich_text"),
  };
}

export const getDatabaseEntries = pMemoize(getDatabaseEntriesInternal);
export const getPageContent = pMemoize(getPageContentInternal);
export const getPageBySlug = pMemoize(getPageBySlugInternal, {
  cacheKey: ([databaseId, slug]) => `${databaseId}-${slug}`,
});
