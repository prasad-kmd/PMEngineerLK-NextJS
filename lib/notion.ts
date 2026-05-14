import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { env } from "./env";

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

/** Helper to fetch OpenGraph metadata for Web Bookmarks */
async function fetchOpengraphMetadata(url: string) {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(5000),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
      },
    });
    const html = await res.text();

    const titleMatch =
      html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i) ||
      html.match(/<title[^>]*>([^<]+)<\/title>/i);

    const descMatch =
      html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:description["']/i) ||
      html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);

    const imageMatch =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);

    let image = imageMatch ? imageMatch[1] : "";

    // Resolve relative image URLs
    if (image && !image.startsWith("http")) {
      try {
        const urlObj = new URL(url);
        image = new URL(image, urlObj.origin).href;
      } catch (e) {
        // Fallback to original
      }
    }

    return {
      title: titleMatch ? titleMatch[1] : new URL(url).hostname,
      description: descMatch ? descMatch[1] : "",
      image,
      url,
    };
  } catch {
    try {
      return { title: new URL(url).hostname, description: "", image: "", url };
    } catch {
      return { title: url, description: "", image: "", url };
    }
  }
}

// Transform Bookmark to a sophisticated card
n2m.setCustomTransformer("bookmark", async (block) => {
  const { bookmark } = block as { bookmark: { url: string } };
  const url = bookmark.url;
  const og = await fetchOpengraphMetadata(url);

  return `
<div class="notion-bookmark my-6 border border-border/60 bg-linear-to-br from-card to-background rounded-3xl overflow-hidden hover:border-primary/50 transition-all shadow-sm group">
  <a href="${url}" target="_blank" rel="noopener noreferrer" class="flex flex-col sm:flex-row h-full no-underline">
    <div class="flex flex-col p-5 sm:p-6 sm:w-2/3 max-w-full justify-between">
      <div class="mb-4">
        <h4 class="text-sm sm:text-base font-black amoriaregular text-foreground tracking-wide leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          ${og.title}
        </h4>
        <p class="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-2 font-light leading-relaxed google-sans">
          ${og.description}
        </p>
      </div>
      <div class="flex items-center gap-2 text-[10px] sm:text-xs">
        <img src="https://www.google.com/s2/favicons?domain=${new URL(url).hostname}" alt="favicon" class="w-4 h-4 rounded-sm grayscale group-hover:grayscale-0 transition-all opacity-70" />
        <span class="text-muted-foreground/60 truncate max-w-[200px] hover:text-muted-foreground transition-colors">${url}</span>
      </div>
    </div>
    ${
      og.image
        ? `
    <div class="w-full h-32 sm:h-auto sm:w-1/3 relative border-t sm:border-t-0 sm:border-l border-border/40 overflow-hidden bg-muted/20">
      <img src="${og.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Bookmark thumbnail" />
    </div>
    `
        : ""
    }
  </a>
</div>`;
});

// Transform File blocks
n2m.setCustomTransformer("file", async (block) => {
  const { file } = block as {
    file: {
      type: string;
      external?: { url: string };
      file?: { url: string };
      name?: string;
    };
  };
  const url = file.type === "external" ? file.external?.url : file.file?.url;
  const name = file.name || "Download File";
  const isExternal = file.type === "external";

  return `
<div class="notion-file-block my-4 inline-block">
  <a href="${url}" target="_blank" rel="noopener noreferrer" class="skip-external-icon group relative flex items-center gap-3 p-2 pr-4 rounded-xl border border-border/40 bg-card/50 hover:border-primary/40 transition-all duration-300 no-underline overflow-hidden">
    <div class="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-inner shrink-0">
      <svg class="w-5 h-5 transform group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
      </svg>
    </div>
    <div class="relative z-10 flex-1 min-w-0">
      <div class="text-[13px] font-bold amoriaregular text-foreground truncate group-hover:text-primary transition-colors">${name}</div>
      <div class="text-[9px] tracking-widest uppercase font-black text-muted-foreground/30 mt-0.5 flex items-center gap-1.5">
        <span class="w-1 h-1 rounded-full bg-primary/30"></span>
        ${isExternal ? "External" : "Hosted"}
      </div>
    </div>
  </a>
</div>`;
});

// Transform Embeds (GitHub Gists etc.)
n2m.setCustomTransformer("embed", async (block) => {
  const { embed } = block as { embed: { url: string } };
  const url = embed.url;

  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === "gist.github.com") {
      return `
      <div class="gist-wrapper my-8 relative rounded-2xl overflow-hidden border border-border/40 shadow-sm">
        <script src="${url}.js"></script>
      </div>`;
    }
  } catch {
    // Invalid URL, fall through to default embed
  }

  return `
<div class="notion-embed my-8 aspect-video rounded-3xl overflow-hidden border border-border/50 shadow-sm relative group">
  <iframe src="${url}" class="w-full h-full bg-muted/20" allowfullscreen loading="lazy"></iframe>
  <div class="absolute inset-0 border border-border/10 rounded-3xl pointer-events-none"></div>
</div>`;
});

// Transform Tabs & Columns natively if structural
n2m.setCustomTransformer("column_list", async (block) => {
  const { id } = block as { id: string };
  const childBlocks = await notion.blocks.children.list({ block_id: id });

  let htmlResult = `<div class="notion-column-list my-8 grid grid-cols-1 md:grid-cols-${childBlocks.results.length} gap-8 relative pb-2">`;
  for (const child of childBlocks.results) {
    const md = await n2m.pageToMarkdown((child as { id: string }).id);
    const parsedHTML = n2m.toMarkdownString(md).parent;
    htmlResult += `<div class="notion-column space-y-4">${parsedHTML}</div>`;
  }
  htmlResult += "</div>";
  return htmlResult;
});

// Transform Callouts
n2m.setCustomTransformer("callout", async (block) => {
  const { callout } = block as {
    callout: {
      rich_text: unknown;
      icon?: {
        type: string;
        emoji?: string;
        external?: { url: string };
        file?: { url: string };
      };
    };
  };
  const text = getPlainText(callout.rich_text);
  let iconHtml = "";
  if (callout.icon) {
    if (callout.icon.type === "emoji" && callout.icon.emoji)
      iconHtml = `<span class="text-xl">${callout.icon.emoji}</span>`;
    if (callout.icon.type === "external" && callout.icon.external)
      iconHtml = `<img src="${callout.icon.external.url}" class="w-6 h-6 object-contain" />`;
    if (callout.icon.type === "file" && callout.icon.file)
      iconHtml = `<img src="${callout.icon.file.url}" class="w-6 h-6 object-contain" />`;
  }
  return `<div class="notion-callout my-8 p-6 rounded-3xl bg-primary/5 hover:bg-primary/10 border border-primary/20 flex gap-5 items-start shadow-sm transition-all duration-300 group">
    <div class="shrink-0 w-10 h-10 rounded-xl bg-background border border-primary/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">${iconHtml}</div>
    <div class="text-foreground/90 leading-relaxed text-sm md:text-base font-google-sans">${text}</div>
  </div>`;
});

// Transform Toggle Lists
n2m.setCustomTransformer("toggle", async (block) => {
  const { toggle, id } = block as { toggle: { rich_text: unknown }; id: string };
  const title = getPlainText(toggle.rich_text);

  try {
    const childBlocks = await notion.blocks.children.list({ block_id: id });
    const mdBlocks = await n2m.blocksToMarkdown(childBlocks.results);
    const { parent } = n2m.toMarkdownString(mdBlocks);

    return `
<details class="notion-toggle group my-6 border border-border/40 rounded-2xl bg-card/40 overflow-hidden transition-all duration-300 hover:border-primary/30 shadow-sm" open>
  <summary class="flex items-center gap-4 p-5 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
    <div class="flex items-center justify-center w-7 h-7 rounded-xl bg-primary/10 text-primary group-open:rotate-90 transition-all duration-500 shadow-inner shrink-0">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>
    </div>
    <span class="text-base font-black amoriaregular text-foreground/90 group-hover:text-primary transition-colors tracking-wide">${title}</span>
  </summary>
  <div class="px-6 pb-6 pt-0">
    <div class="prose-direct border-l-2 border-primary/10 pl-6 ml-3.5 space-y-4 text-muted-foreground/90 leading-relaxed">
      ${parent}
    </div>
  </div>
</details>`;
  } catch (error) {
    console.error("Toggle block error:", error);
    return `<div class="notion-toggle-error p-4 border border-red-500/20 bg-red-500/5 rounded-xl text-xs text-red-500">Failed to load toggle content</div>`;
  }
});

// Transform Tabs
n2m.setCustomTransformer("tab_view", async (block) => {
  const { id } = block as { id: string };
  const childBlocks = await notion.blocks.children.list({ block_id: id });

  const tabs: Array<{ title: string; content: string }> = [];

  for (const child of childBlocks.results) {
    const childBlock = child as {
      id: string;
      type: string;
      title?: unknown;
      [key: string]: unknown;
    };
    // Each child is likely a 'page' or something that acts as a tab container
    const title =
      getPlainText(childBlock.title) ||
      getPlainText(childBlock[childBlock.type]?.rich_text) ||
      "Tab";
    const md = await n2m.pageToMarkdown(childBlock.id);
    const { parent } = n2m.toMarkdownString(md);
    tabs.push({ title, content: parent });
  }

  const tabsJson = JSON.stringify(tabs).replace(/'/g, "&apos;");

  return `<div class="notion-tabs-placeholder my-8" data-tabs='${tabsJson}'></div>`;
});

// Transform Buttons
n2m.setCustomTransformer("button", async (block) => {
  const { button } = block as any;
  const label = getPlainText(button.rich_text);
  let url = "#";

  // Notion API Button block mapping for notion-to-md can be tricky
  // Some versions of notion-to-md might not pass the action correctly
  // Or the block type might be different
  if (button.action) {
    url = button.action.url || button.action.open_url?.url || url;
  }

  return `
<div class="notion-button-wrapper my-10 flex justify-center">
  <a href="${url}" target="_blank" rel="noopener noreferrer" class="skip-external-icon group relative px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-black amoriaregular tracking-[0.2em] uppercase text-sm md:text-base shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-500 hover:-translate-y-1 overflow-hidden no-underline border-0">
    <span class="relative z-10 flex items-center gap-4">
      ${label || "Click Here"}
      <svg class="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
    </span>
    <div class="absolute inset-0 bg-linear-to-r from-white/0 via-white/25 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
  </a>
</div>`;
});

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

/**
 * Extracts plain text from a Notion rich_text or title property.
 */
export function getPlainText(property: unknown): string {
  if (!property) return "";

  // Handle direct rich_text arrays
  if (Array.isArray(property)) {
    return property.map((t) => t.plain_text || "").join("");
  }

  if (typeof property !== "object") return "";

  const p = property as {
    type: string;
    title?: Array<{ plain_text: string }>;
    rich_text?: Array<{ plain_text: string }>;
  };

  if (p.type === "title" && p.title) {
    return p.title.map((t) => t.plain_text).join("");
  }
  if (p.type === "rich_text" && p.rich_text) {
    return p.rich_text.map((t) => t.plain_text).join("");
  }
  return "";
}

/**
 * Extracts a number from a Notion number property.
 */
export function getNumber(property: unknown): number | undefined {
  if (!property || typeof property !== "object") return undefined;
  const p = property as { type: string; number?: number | null };
  if (p.type !== "number" || p.number === null || p.number === undefined)
    return undefined;
  return p.number;
}

/**
 * Extracts a date string from a Notion date property.
 */
export function getDate(property: unknown): string | undefined {
  if (!property || typeof property !== "object") return undefined;
  const p = property as { type: string; date?: { start: string } };
  if (p.type !== "date" || !p.date) return undefined;
  return p.date.start;
}

/**
 * Extracts values from a Notion multi_select property.
 */
export function getMultiSelect(property: unknown): string[] {
  if (!property || typeof property !== "object") return [];
  const p = property as {
    type: string;
    multi_select?: Array<{ name: string }>;
  };
  if (p.type !== "multi_select" || !p.multi_select) return [];
  return p.multi_select.map((item) => item.name);
}

/**
 * Extracts a value from a Notion select property.
 */
export function getSelect(property: unknown): string | undefined {
  if (!property || typeof property !== "object") return undefined;
  const p = property as { type: string; select?: { name: string } };
  if (p.type !== "select" || !p.select) return undefined;
  return p.select.name;
}

/**
 * Extracts a boolean from a Notion checkbox property.
 */
export function getCheckbox(property: unknown): boolean {
  if (!property || typeof property !== "object") return false;
  const p = property as { type: string; checkbox?: boolean };
  if (p.type !== "checkbox") return false;
  return p.checkbox || false;
}

/**
 * Extracts an image URL from a Notion file or external image property.
 */
export function getImageUrl(property: unknown): string | undefined {
  if (!property || typeof property !== "object") return undefined;
  const p = property as {
    type: string;
    files?: Array<{
      type: string;
      name?: string;
      external?: { url: string };
      file?: { url: string };
    }>;
    external?: { url: string };
    file?: { url: string };
    url?: string;
  };

  // Handle 'Files & Media' property
  if (p.type === "files" && p.files && p.files.length > 0) {
    const file = p.files[0];
    if (file.type === "external") return file.external?.url;
    if (file.type === "file") return file.file?.url;
  }

  // Handle single 'File' property or block
  if (p.type === "external") return p.external?.url;
  if (p.type === "file") return p.file?.url;

  // Handle 'Url' property
  if (p.type === "url" && p.url) return p.url;

  return undefined;
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
