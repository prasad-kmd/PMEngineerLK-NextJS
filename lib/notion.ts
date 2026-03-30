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

// Helper to check if a database has certain properties
const getDatabaseProperties = pMemoize(async (databaseId: string) => {
  if (!databaseId || !process.env.NOTION_AUTH_TOKEN) return {};
  try {
    const notion = getNotionClient();
    const db = await notion.databases.retrieve({ database_id: databaseId });
    return (db as any).properties || {};
  } catch (error) {
    console.error(`Error retrieving database ${databaseId} properties:`, error);
    return {};
  }
});

async function getDatabaseEntriesInternal(databaseId: string): Promise<NotionPageMetadata[]> {
  if (!databaseId || !process.env.NOTION_AUTH_TOKEN) return [];

  const notion = getNotionClient();
  const dbProps = await getDatabaseProperties(databaseId);

  const hasStatus = "Status" in dbProps;
  const hasDate = "Date" in dbProps;

  // Find the property name for the title from database schema
  const titlePropName = Object.keys(dbProps).find(key => dbProps[key].type === "title") || "Title";

  const queryParams: any = {
    database_id: databaseId,
  };

  if (hasStatus) {
    queryParams.filter = {
      property: "Status",
      status: {
        equals: "Published",
      },
    };
  }

  if (hasDate) {
    queryParams.sorts = [
      {
        property: "Date",
        direction: "descending",
      },
    ];
  }

  try {
    const response = await notion.databases.query(queryParams);

    return response.results.map((page: any) => {
      const props = page.properties;

      // Helper to get property value safely
      const getProp = (name: string, type: string) => {
        const prop = props[name];
        if (!prop) return undefined;
        if (type === "title") return prop.title?.map((t: any) => t.plain_text).join("") || "";
        if (type === "rich_text") return prop.rich_text?.map((t: any) => t.plain_text).join("") || "";
        if (type === "date") return prop.date?.start;
        if (type === "status") return prop.status?.name;
        if (type === "multi_select") return prop.multi_select?.map((opt: any) => opt.name);
        if (type === "checkbox") return prop.checkbox;
        if (type === "select") return prop.select?.name;
        return undefined;
      };

      // Try to find the title property name if the one from dbProps didn't work
      let actualTitlePropName = titlePropName;
      if (!props[actualTitlePropName] || props[actualTitlePropName].type !== "title") {
        const found = Object.keys(props).find(key => props[key].type === "title");
        if (found) actualTitlePropName = found;
      }

      return {
        id: page.id,
        slug: getProp("Slug", "rich_text") || page.id,
        title: getProp(actualTitlePropName, "title") || "Untitled",
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
  } catch (error) {
    console.error(`Error querying database ${databaseId}:`, error);
    return [];
  }
}

async function getPageContentInternal(pageId: string): Promise<string> {
  if (!process.env.NOTION_AUTH_TOKEN) return "";
  try {
    const n2m = getN2M();
    const mdblocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdblocks);
    return mdString.parent;
  } catch (error) {
    console.error(`Error fetching page content for ${pageId}:`, error);
    return "";
  }
}

async function getPageBySlugInternal(databaseId: string, slug: string): Promise<NotionPageMetadata | null> {
  if (!databaseId || !process.env.NOTION_AUTH_TOKEN) return null;

  const notion = getNotionClient();
  const dbProps = await getDatabaseProperties(databaseId);

  if (!("Slug" in dbProps)) {
    console.warn(`Database ${databaseId} is missing "Slug" property.`);
    // We can't query by slug if the property is missing
    return null;
  }

  const titlePropName = Object.keys(dbProps).find(key => dbProps[key].type === "title") || "Title";

  try {
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
      if (type === "title") return prop.title?.map((t: any) => t.plain_text).join("") || "";
      if (type === "rich_text") return prop.rich_text?.map((t: any) => t.plain_text).join("") || "";
      if (type === "date") return prop.date?.start;
      if (type === "status") return prop.status?.name;
      if (type === "multi_select") return prop.multi_select?.map((opt: any) => opt.name);
      if (type === "checkbox") return prop.checkbox;
      if (type === "select") return prop.select?.name;
      return undefined;
    };

    // Try to find the title property name if the one from dbProps didn't work
    let actualTitlePropName = titlePropName;
    if (!props[actualTitlePropName] || props[actualTitlePropName].type !== "title") {
      const found = Object.keys(props).find(key => props[key].type === "title");
      if (found) actualTitlePropName = found;
    }

    return {
      id: page.id,
      slug: getProp("Slug", "rich_text") || page.id,
      title: getProp(actualTitlePropName, "title") || "Untitled",
      date: getProp("Date", "date"),
      description: getProp("Description", "rich_text"),
      status: getProp("Status", "status"),
      tags: getProp("Tags", "multi_select"),
      category: getProp("Category", "select"),
      final: getProp("Final", "checkbox") || false,
      aiAssisted: getProp("AIAssisted", "checkbox") || false,
      technical: getProp("Technical", "rich_text"),
    };
  } catch (error) {
    console.error(`Error querying page by slug in database ${databaseId}:`, error);
    return null;
  }
}

export const getDatabaseEntries = pMemoize(getDatabaseEntriesInternal);
export const getPageContent = pMemoize(getPageContentInternal);
export const getPageBySlug = pMemoize(getPageBySlugInternal, {
  cacheKey: ([databaseId, slug]) => `${databaseId}-${slug}`,
});
