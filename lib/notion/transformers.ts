import { notion, n2m } from "./client";
import { getPlainText } from "./properties";
import { marked } from "marked";

/** Helper to fetch OpenGraph metadata for Web Bookmarks with improved reliability */
async function fetchOpengraphMetadata(url: string) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BlogfolioBot/1.0; +https://prasadm.com)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      }
    });

    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const html = await res.text();

    // Improved Regex for OG and title
    const title = html.match(/<meta property="og:title" content="([^"]+)"/i)?.[1] ||
                  html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ||
                  url;

    const description = html.match(/<meta property="og:description" content="([^"]+)"/i)?.[1] ||
                        html.match(/<meta name="description" content="([^"]+)"/i)?.[1] ||
                        "";

    const image = html.match(/<meta property="og:image" content="([^"]+)"/i)?.[1] ||
                  html.match(/<meta name="twitter:image" content="([^"]+)"/i)?.[1] ||
                  "";

    return {
      title: title.trim(),
      description: description.trim(),
      image,
      url,
    };
  } catch (error) {
    console.warn(`Failed to fetch metadata for ${url}:`, error);
    return { title: url, description: "", image: "", url };
  }
}

// Transform Bookmark to a sophisticated card
n2m.setCustomTransformer("bookmark", async (block) => {
  const { bookmark } = block as { bookmark: { url: string } };
  const url = bookmark.url;
  const og = await fetchOpengraphMetadata(url);
  const hostname = new URL(url).hostname;

  return `
<div class="notion-bookmark my-8 border border-border/60 bg-linear-to-br from-card to-background rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-sm group">
  <a href="${url}" target="_blank" rel="noopener noreferrer" class="flex flex-col sm:flex-row h-full no-underline">
    <div class="flex flex-col p-6 sm:p-8 sm:w-2/3 max-w-full justify-between">
      <div class="mb-4">
        <h4 class="text-base sm:text-lg font-black amoriaregular text-foreground tracking-wide leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          ${og.title}
        </h4>
        <p class="text-xs sm:text-sm text-muted-foreground mt-3 line-clamp-2 font-light leading-relaxed google-sans">
          ${og.description || 'No description available for this bookmark.'}
        </p>
      </div>
      <div class="flex items-center gap-3 text-[10px] sm:text-xs">
        <div class="p-1.5 rounded-lg bg-muted/50 border border-border group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
          <img src="https://www.google.com/s2/favicons?domain=${hostname}&sz=64" alt="favicon" class="w-4 h-4 grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100" />
        </div>
        <span class="text-muted-foreground/60 truncate max-w-[200px] hover:text-muted-foreground transition-colors uppercase tracking-widest font-black">${hostname}</span>
      </div>
    </div>
    ${
      og.image
        ? `
    <div class="w-full h-40 sm:h-auto sm:w-1/3 relative border-t sm:border-t-0 sm:border-l border-border/40 overflow-hidden bg-muted/20">
      <img src="${og.image}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Bookmark thumbnail" loading="lazy" />
      <div class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
    </div>
    `
        : `
    <div class="hidden sm:flex w-1/3 items-center justify-center bg-muted/10 border-l border-border/40">
       <svg class="w-12 h-12 text-muted-foreground/10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
    </div>
    `
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
  const extension = name.split(".").pop()?.toUpperCase() || "FILE";

  return `
<div class="notion-file-card my-8 group relative max-w-md">
  <a href="${url}" target="_blank" rel="noopener noreferrer"
     class="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-300 no-underline active:scale-[0.98] active:duration-100 shadow-sm hover:shadow-md">
    <div class="relative h-14 w-14 shrink-0 rounded-xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-colors overflow-hidden">
      <div class="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
      <svg class="relative w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    </div>
    <div class="flex-1 overflow-hidden">
      <div class="text-sm font-black text-foreground truncate group-hover:text-primary transition-colors local-inter uppercase tracking-tight">${name}</div>
      <div class="flex items-center gap-2 mt-1">
        <span class="text-[9px] font-black tracking-[0.2em] uppercase text-primary/60 local-jetbrains-mono">${extension}</span>
        <span class="w-1 h-1 rounded-full bg-border"></span>
        <span class="text-[9px] font-bold text-muted-foreground/60 local-inter uppercase tracking-widest">Click to Download</span>
      </div>
    </div>
    <div class="h-8 w-8 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground/40 group-hover:border-primary/40 group-hover:text-primary transition-all duration-300">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
    </div>
  </a>
  <div class="absolute -inset-1 bg-linear-to-r from-primary to-primary/40 rounded-3xl blur-xl opacity-0 group-hover:opacity-10 transition-opacity -z-10"></div>
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
  return `<div class="notion-callout my-6 p-5 rounded-3xl bg-muted/20 hover:bg-muted/30 border border-border/50 flex gap-4 items-start shadow-sm transition-colors">
    <div class="shrink-0 mt-0.5">${iconHtml}</div>
    <div class="text-foreground/90 leading-relaxed text-sm md:text-base prose-direct">${text}</div>
  </div>`;
});

// Transform Tabs (if using Notion's official tabs)
n2m.setCustomTransformer("tabs", async (block) => {
  const { id } = block as { id: string };
  const childBlocks = await notion.blocks.children.list({ block_id: id });
  let htmlResult = `<div class="notion-tabs border border-border/50 rounded-3xl p-4 my-6 bg-card"><div class="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 pb-2 border-b border-border">Tabbed Focus Area</div>`;
  for (const child of childBlocks.results) {
    const md = await n2m.pageToMarkdown((child as { id: string }).id);
    const parsedHTML = n2m.toMarkdownString(md).parent;
    htmlResult += `<div class="notion-tab-content my-4">${parsedHTML}</div>`;
  }
  htmlResult += `</div>`;
  return htmlResult;
});

// Transform Toggles recursively
n2m.setCustomTransformer("toggle", async (block) => {
  const { id, toggle } = block as any;
  const text = getPlainText(toggle.rich_text);

  // Fetch children blocks
  const childBlocks = await notion.blocks.children.list({ block_id: id });

  // Convert children to markdown
  const childMarkdown = await n2m.blocksToMarkdown(childBlocks.results);
  const { parent: childrenHtml } = n2m.toMarkdownString(childMarkdown);

  // Parse the children markdown to HTML
  const parsedChildren = await marked.parse(childrenHtml);

  return `
<details class="notion-toggle my-6 group">
  <summary class="flex items-center gap-3 cursor-pointer list-none p-4 rounded-2xl bg-muted/20 hover:bg-muted/40 border border-border/50 transition-all font-bold text-foreground group-open:rounded-b-none group-open:border-b-transparent">
    <div class="p-1 rounded-md bg-primary/10 text-primary group-open:rotate-90 transition-transform duration-300">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
    </div>
    ${text}
  </summary>
  <div class="p-6 border border-t-0 border-border/50 rounded-b-2xl bg-card/10 space-y-4 prose-direct">
    ${parsedChildren}
  </div>
</details>`;
});

export function initTransformers() {
  // This function is just to trigger the custom transformers registration
  // which happens at the module level in this file.
}
