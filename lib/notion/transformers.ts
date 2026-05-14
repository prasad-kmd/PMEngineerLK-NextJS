import { n2m, notion } from "./client";
import { getPlainText } from "./properties";

/** Helper to fetch OpenGraph metadata for Web Bookmarks */
async function fetchOpengraphMetadata(url: string) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    const html = await res.text();

    const titleMatch =
      html.match(/<meta property="og:title" content="([^"]+)"/i) ||
      html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descMatch =
      html.match(/<meta property="og:description" content="([^"]+)"/i) ||
      html.match(/<meta name="description" content="([^"]+)"/i);
    const imageMatch = html.match(
      /<meta property="og:image" content="([^"]+)"/i,
    );

    return {
      title: titleMatch ? titleMatch[1] : url,
      description: descMatch ? descMatch[1] : "",
      image: imageMatch ? imageMatch[1] : "",
      url,
    };
  } catch {
    return { title: url, description: "", image: "", url };
  }
}

export function registerCustomTransformers() {
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
    const sizeText = file.type === "file" ? "Verified Attachment" : "External Link";

    return `
<div class="notion-file my-8 w-full">
    <a href="${url}" target="_blank" rel="noopener noreferrer" class="group flex items-center justify-between p-6 rounded-[2rem] border border-border bg-card/30 hover:bg-primary/[0.03] hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/5 active:scale-[0.98] no-underline">
        <div class="flex items-center gap-5">
            <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <div class="flex flex-col gap-1">
                <span class="font-bold amoriaregular tracking-widest text-sm uppercase text-foreground group-hover:text-primary transition-colors">${name}</span>
                <span class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">${sizeText}</span>
            </div>
        </div>
        <div class="p-3 rounded-xl bg-muted/50 group-hover:bg-primary group-hover:text-white transition-all duration-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
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
        rich_text: Array<{
            type: string;
            text: { content: string; link: { url: string } | null };
            annotations: {
              bold: boolean;
              italic: boolean;
              strikethrough: boolean;
              underline: boolean;
              code: boolean;
              color: string;
            };
            plain_text: string;
            href: string | null;
          }>;
        icon?: {
          type: string;
          emoji?: string;
          external?: { url: string };
          file?: { url: string };
        };
      };
    };

    const text = callout.rich_text.map(rt => {
        let content = rt.plain_text;
        if (rt.annotations.bold) content = `<strong>${content}</strong>`;
        if (rt.annotations.italic) content = `<em>${content}</em>`;
        if (rt.annotations.code) content = `<code class="bg-primary/10 text-primary px-1 rounded">${content}</code>`;
        if (rt.href) content = `<a href="${rt.href}" target="_blank" rel="noopener noreferrer" class="text-primary underline font-medium">${content}</a>`;
        return content;
    }).join("");

    let iconHtml = "";
    if (callout.icon) {
      if (callout.icon.type === "emoji" && callout.icon.emoji)
        iconHtml = `<span class="text-2xl">${callout.icon.emoji}</span>`;
      if (callout.icon.type === "external" && callout.icon.external)
        iconHtml = `<img src="${callout.icon.external.url}" class="w-6 h-6 object-contain" alt="Callout icon" />`;
      if (callout.icon.type === "file" && callout.icon.file)
        iconHtml = `<img src="${callout.icon.file.url}" class="w-6 h-6 object-contain" alt="Callout icon" />`;
    }
    return `
<div class="notion-callout p-6 rounded-2xl border border-border bg-muted/30 my-6 flex gap-4 items-start">
    <div class="text-2xl">${iconHtml}</div>
    <div class="flex-1 notion-callout-text prose-p:m-0 font-google-sans text-foreground/90">
        ${text}
    </div>
</div>`;
  });

  // Transform Toggles
  n2m.setCustomTransformer("toggle", async (block) => {
    const { id, toggle } = block as {
      id: string;
      toggle: { rich_text: Array<{ plain_text: string }> };
    };
    const text = toggle.rich_text.map((rt) => rt.plain_text).join("");
    const childBlocks = await notion.blocks.children.list({ block_id: id });

    let childrenHtml = "";
    for (const child of childBlocks.results) {
        const md = await n2m.pageToMarkdown((child as { id: string }).id);
        const rawMd = n2m.toMarkdownString(md).parent;
        // Parse markdown to HTML using the same marked instance
        const { marked } = await import("../render/marked");
        childrenHtml += await marked.parse(rawMd);
    }

    return `
<details class="notion-toggle group my-4 p-4 rounded-2xl border border-border bg-card/30 transition-all duration-300">
    <summary class="flex items-center gap-3 cursor-pointer font-bold amoriaregular tracking-widest text-sm uppercase select-none list-none">
        <span class="p-2 rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-open:rotate-90">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
        </span>
        ${text}
    </summary>
    <div class="mt-4 pl-4 md:pl-12 border-l-2 border-primary/20 animate-in fade-in slide-in-from-top-2 duration-500 prose-direct">
        ${childrenHtml}
    </div>
</details>`;
  });
}
