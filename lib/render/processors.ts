import { highlightCode } from "../content/highlighter";

/**
 * Highlights code blocks in HTML using Shiki with an enhanced UI wrapper.
 */
export async function highlightCodeBlocks(html: string): Promise<string> {
  try {
    const codeRegex =
      /<pre[^>]*><code(?:\s+class="language-([^"]+)")?[^>]*>([\s\S]*?)<\/code\s*><\/pre\s*>/g;
    const matches = Array.from(html.matchAll(codeRegex));
    if (matches.length === 0) return html;

    let result = "";
    let lastIndex = 0;

    for (const match of matches) {
      const [fullMatch, langMatch, code] = match;
      const lang = langMatch || "text";
      const matchIndex = match.index!;

      result += html.substring(lastIndex, matchIndex);

      const decodedCode = code
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&");

      if (lang === "mermaid") {
        const encodedCode = decodedCode.trim().replace(/'/g, "&apos;");
        // Output format compatible with ContentRenderer split regex
        result += `<pre class="mermaid m-0 bg-transparent p-0 transition-opacity duration-700" data-content='${encodedCode}'></pre>`;
        lastIndex = matchIndex + fullMatch.length;
        continue;
      }

      try {
        const highlighted = await highlightCode(decodedCode.trim(), lang);

        const enhancedHtml = `
<div class="code-block-wrapper my-12 rounded-2xl overflow-hidden border border-border/40 bg-[#1e1e1e] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] group/code relative transition-all duration-500 hover:shadow-[0_35px_70px_-10px_rgba(var(--primary-rgb),0.15)]">
  <div class="code-block-header flex items-center justify-between px-3 py-1 bg-[#252526] border-b border-white/5 select-none">
    <div class="flex items-center gap-5">
      <div class="flex gap-2.5">
        <div class="w-3.5 h-3.5 rounded-full bg-[#ff5f57] shadow-inner shadow-black/10 hover:brightness-110 transition-all cursor-pointer"></div>
        <div class="w-3.5 h-3.5 rounded-full bg-[#febc2e] shadow-inner shadow-black/10 hover:brightness-110 transition-all cursor-pointer"></div>
        <div class="w-3.5 h-3.5 rounded-full bg-[#28c840] shadow-inner shadow-black/10 hover:brightness-110 transition-all cursor-pointer"></div>
      </div>
      <div class="h-5 w-px bg-white/10"></div>
      <div class="flex items-center gap-3">
        <span class="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 local-jetbrains-mono flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse"></span>
          ${lang}
        </span>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <button class="copy-button group/copy p-2.5 hover:bg-white/5 rounded-xl transition-all duration-300 text-white/30 hover:text-white flex items-center gap-2.5 border border-transparent hover:border-white/10 shadow-sm"
              onclick="const codeBlock = this.closest('.code-block-wrapper'); const code = codeBlock.querySelector('code').innerText; navigator.clipboard.writeText(code); const btn = this; const originalContent = btn.innerHTML; btn.innerHTML = '<span class=\\'text-[9px] font-black uppercase tracking-widest text-green-400\\'>Copied!</span><svg class=\\'w-4 h-4 text-green-400 animate-in zoom-in-75 duration-300\\' fill=\\'none\\' stroke=\\'currentColor\\' viewBox=\\'0 0 24 24\\'><path stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\' stroke-width=\\'2.5\\' d=\\'M5 13l4 4L19 7\\'></path></svg>'; btn.classList.add('bg-green-400/5', 'border-green-400/20'); setTimeout(() => { btn.innerHTML = originalContent; btn.classList.remove('bg-green-400/5', 'border-green-400/20'); }, 2000);">
        <span class="text-[9px] font-black uppercase tracking-[0.2em] opacity-0 group-hover/copy:opacity-100 transition-all duration-300 translate-x-2 group-hover/copy:translate-x-0 hidden sm:inline">Copy Code</span>
        <svg class="w-4 h-4 transition-all duration-300 group-hover/copy:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
      </button>
    </div>
  </div>
  <div class="shiki-container relative overflow-x-auto custom-scrollbar-code p-1 bg-[#1e1e1e]">
    ${highlighted}
  </div>
  <div class="absolute bottom-3 right-5 pointer-events-none opacity-20">
     <span class="text-[9px] font-black text-white uppercase tracking-[0.5em] select-none italic">Engineering Excellence</span>
  </div>
  <div class="absolute top-[52px] right-0 bottom-0 w-8 bg-linear-to-l from-[#1e1e1e] to-transparent pointer-events-none z-10 opacity-0 group-hover/code:opacity-100 transition-opacity"></div>
</div>`;
        result += enhancedHtml;
      } catch (e) {
        console.error("Shiki individual block highlight error:", e);
        result += fullMatch;
      }

      lastIndex = matchIndex + fullMatch.length;
    }

    result += html.substring(lastIndex);
    return result;
  } catch (e) {
    console.error("Shiki highlighting error:", e);
    return html;
  }
}

/**
 * Parses and injects custom shortcodes into HTML.
 */
export async function injectShortcodes(html: string): Promise<string> {
  let processed = html;

  // Helper to extract URL from potentially mangled href attribute (marked sometimes auto-links URLs)
  const extractUrl = (str: string) => {
    const linkMatch = str.match(/href="([^"]+)"/);
    if (linkMatch) return linkMatch[1];
    return str.replace(/&amp;/g, "&");
  };

  // Handle Button shortcode: [button href="..."]Title[/button]
  // We handle both raw and <p> wrapped versions
  const buttonRegex = /(?:<p>\s*)?\[button\s+href="([^"]+)"\](.*?)\[\/button\](?:\s*<\/p>)?/g;
  const buttonMatches = Array.from(processed.matchAll(buttonRegex));

  for (const match of buttonMatches.reverse()) {
    const [fullMatch, href, title] = match;
    const actualHref = extractUrl(href);
    const actualTitle = title.replace(/<[^>]*>/g, "");
    const buttonHtml = createButtonHtml(actualHref, actualTitle);
    processed = processed.substring(0, match.index!) + buttonHtml + processed.substring(match.index! + fullMatch.length);
  }

  // Handle Tabs shortcode: [tabs] ... [tab title="..."] ... [/tab] ... [/tabs]
  const tabsRegex = /(?:<p>\s*)?(\[tabs\][\s\S]*?\[\/tabs\])(?:\s*<\/p>)?/g;
  const tabsMatches = Array.from(processed.matchAll(tabsRegex));

  for (const match of tabsMatches.reverse()) {
    const [fullMatch, content] = match;
    const tabsHtml = await createTabsPlaceholder(content);
    processed = processed.substring(0, match.index!) + tabsHtml + processed.substring(match.index! + fullMatch.length);
  }

  return processed;
}

function createButtonHtml(href: string, title: string): string {
  return `
<div class="my-12 flex justify-center not-prose">
  <a href="${href}" target="_blank" rel="noopener noreferrer" class="group relative inline-flex items-center justify-center px-10 py-5 font-black amoriaregular tracking-[0.2em] text-white transition-all duration-500 ease-out hover:scale-105 active:scale-95 no-underline">
    <span class="absolute inset-0 rounded-2xl bg-linear-to-br from-primary via-primary to-primary/80 opacity-100 transition-all duration-500 group-hover:shadow-[0_0_50px_-10px_rgba(var(--primary-rgb),0.6)] group-hover:brightness-110"></span>
    <span class="absolute inset-0 rounded-2xl bg-linear-to-tr from-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
    <span class="relative flex items-center gap-4 text-xs uppercase">
      ${title}
      <svg class="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </span>
  </a>
</div>`;
}

async function createTabsPlaceholder(content: string): Promise<string> {
    const tabs: Array<{title: string, content: string}> = [];
    const { marked } = await import("./marked");

    // Clean up content inside [tabs] - sometimes Notion adds <p> or <br> between tabs
    const cleanedContent = content
        .replace(/<\/p>\s*<p>/g, '\n')
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '')
        .replace(/<br\s*\/?>/g, '\n');

    const tabMatches = Array.from(cleanedContent.matchAll(/\[tab\s+title="([^"]+)"\]([\s\S]*?)\[\/tab\]/g));

    for (const m of tabMatches) {
        const title = m[1];
        const rawContent = m[2].trim();
        const htmlContent = await marked.parse(rawContent) as string;
        // Also highlight code blocks inside tabs
        const highlightedHtml = await highlightCodeBlocks(htmlContent);
        tabs.push({ title, content: highlightedHtml });
    }

    if (tabs.length === 0) return content;

    const tabsJson = JSON.stringify(tabs).replace(/'/g, "&apos;");
    return `<div class="interactive-tabs-placeholder my-12" data-tabs='${tabsJson}'></div>`;
}
