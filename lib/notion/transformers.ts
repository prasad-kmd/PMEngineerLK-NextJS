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
<div class="notion-file my-6 inline-flex p-4 rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/40 hover:border-primary/30 transition-all group lg:min-w-[400px] cursor-pointer" onclick="window.open('${url}', '_blank')">
  <div class="flex items-center gap-4 no-underline w-full">
    <div class="h-12 w-12 rounded-xl bg-card border border-border flex items-center justify-center shrink-0 group-hover:text-primary group-hover:scale-110 transition-all shadow-sm">
      <svg class="w-5 h-5 text-muted-foreground/50 group-hover:text-primary animate-bounce-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
    </div>
    <div class="overflow-hidden flex-1">
      <div class="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">${name}</div>
      <div class="text-[10px] tracking-widest uppercase font-black text-muted-foreground/50 mt-1 flex items-center gap-2">
        <span>${sizeText}</span>
        <span class="h-1 w-1 rounded-full bg-border"></span>
        <span class="group-hover:text-primary transition-colors">Download Now</span>
      </div>
    </div>
    <div class="text-muted-foreground/20 group-hover:text-primary/40 transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </div>
  </div>
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
        if (rt.href) content = `<a href="${rt.href}" target="_blank" rel="noopener noreferrer" class="text-primary underline">${content}</a>`;
        return content;
    }).join("");

    let iconHtml = "";
    if (callout.icon) {
      if (callout.icon.type === "emoji" && callout.icon.emoji)
        iconHtml = `<span class="text-2xl">${callout.icon.emoji}</span>`;
      if (callout.icon.type === "external" && callout.icon.external)
        iconHtml = `<img src="${callout.icon.external.url}" class="w-6 h-6 object-contain" />`;
      if (callout.icon.type === "file" && callout.icon.file)
        iconHtml = `<img src="${callout.icon.file.url}" class="w-6 h-6 object-contain" />`;
    }
    return `<div class="notion-callout my-8 p-6 rounded-[2rem] bg-linear-to-br from-muted/20 to-muted/5 hover:to-muted/20 border border-border/50 flex gap-5 items-start shadow-sm transition-all duration-300 group">
    <div class="shrink-0 mt-0.5 p-3 rounded-2xl bg-background border border-border/50 shadow-xs group-hover:scale-110 transition-transform">${iconHtml}</div>
    <div class="text-foreground/90 leading-relaxed text-sm md:text-base prose-direct flex-1 pt-1">${text}</div>
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
        childrenHtml += n2m.toMarkdownString(md).parent;
    }

    return `
<details class="notion-toggle my-4 border border-border/50 rounded-2xl overflow-hidden bg-card/30 transition-all duration-300 group">
  <summary class="flex items-center gap-3 p-4 cursor-pointer hover:bg-muted/20 transition-colors list-none">
    <div class="flex-1 flex items-center gap-3 font-bold text-foreground/90">
      <span class="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-open:rotate-90 transition-transform duration-300">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
      </span>
      ${text}
    </div>
  </summary>
  <div class="p-6 pt-2 border-t border-border/40 text-muted-foreground leading-relaxed prose-direct space-y-4">
    ${childrenHtml}
  </div>
</details>`;
  });
}
