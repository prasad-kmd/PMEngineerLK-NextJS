import { marked } from "marked";

/**
 * Strips HTML tags from a string using a simple state machine.
 */
export function stripTags(html: string): string {
  if (typeof html !== "string") return "";

  let result = "";
  let inTag = false;

  for (let i = 0; i < html.length; i++) {
    const char = html[i];
    if (char === "<" && !inTag) {
      inTag = true;
    } else if (char === ">" && inTag) {
      inTag = false;
      continue;
    } else if (!inTag) {
      result += char;
    }
  }
  return result.trim();
}

/**
 * Injects anchor IDs into heading tags (h2, h3, h4) for Table of Contents.
 */
export function injectHeadingIds(html: string): string {
  return html.replace(
    /<h([2-4])([^>]*)>(.*?)<\/h\1\s*>/gi,
    (match, level, attrs, text) => {
      if (attrs.toLowerCase().includes("id=")) return match;

      const cleanText = stripTags(text);
      const id = cleanText
        .toLowerCase()
        .replace(/[^\w]+/g, "-")
        .replace(/^-+|-+$/g, "");

      return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
    },
  );
}

/**
 * Injects interactive quiz placeholders into the HTML.
 */
export function injectQuiz(html: string): string {
  const placeholders: string[] = [];
  const protectedHtml = html.replace(
    /<(pre|code)[\s\S]*?<\/\1\s*>/gi,
    (match) => {
      placeholders.push(match);
      return `__QUIZ_PROTECTED_BLOCK_${placeholders.length - 1}__`;
    },
  );

  const injectedHtml = protectedHtml.replace(
    /\[quiz\]([\s\S]*?)\[\/quiz\]/g,
    (match, jsonContent) => {
      try {
        let cleanJson = stripTags(jsonContent);
        cleanJson = cleanJson.trim();
        cleanJson = cleanJson.replace(/[\r\n\t]+/g, " ");

        cleanJson = cleanJson.replace(
          /\\(["\\\/bfnrt]|u[0-9a-fA-F]{4})|\\/g,
          (m: string, p1: string) => (p1 ? m : "\\\\"),
        );

        const minifiedJson = JSON.stringify(JSON.parse(cleanJson));
        const encodedJson = minifiedJson.replace(/'/g, "&apos;");
        return `<div class="interactive-quiz-placeholder" data-quiz='${encodedJson}'></div>`;
      } catch (e) {
        console.error(
          "Quiz HTML inject parse error:",
          e,
          "\nContent:",
          jsonContent,
        );
        return `<div class="bg-red-500/10 border border-red-500 p-4 rounded-lg text-red-500 my-4">
        <p><strong>Quiz Error:</strong> Invalid JSON format.</p>
        <pre class="text-[10px] mt-2 overflow-auto">${jsonContent.substring(0, 100)}...</pre>
      </div>`;
      }
    },
  );

  return injectedHtml.replace(
    /__QUIZ_PROTECTED_BLOCK_(\d+)__/g,
    (match, index) => placeholders[parseInt(index)] ?? "",
  );
}

/**
 * Injects custom shortcodes (buttons, tabs, etc.) into the HTML.
 */
export async function injectShortcodes(html: string): Promise<string> {
  // 1. [button href="..."]Title[/button]
  let processedHtml = html.replace(
    /\[button\s+href="([^"]+)"\]([\s\S]*?)\[\/button\]/g,
    (match, href, title) => {
      return `
<div class="my-8 inline-block">
  <a href="${href}" target="_blank" rel="noopener noreferrer"
     class="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_40px_-15px_rgba(var(--primary-rgb),0.4)] active:scale-[0.98] overflow-hidden no-underline">
    <span class="relative z-10">${title}</span>
    <svg class="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7-7 7M5 12h16"></path>
    </svg>
    <div class="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
  </a>
</div>`;
    },
  );

  // 2. [tabs] ... [tab title="..."] ... [/tab] ... [/tabs]
  const tabsRegex = /\[tabs\]([\s\S]*?)\[\/tabs\]/g;
  const tabRegex = /\[tab\s+title="([^"]+)"\]([\s\S]*?)\[\/tab\]/g;

  const matches = Array.from(processedHtml.matchAll(tabsRegex));
  for (const match of matches) {
    const tabsContent = match[1];
    const tabMatches = Array.from(tabsContent.matchAll(tabRegex));

    if (tabMatches.length === 0) continue;

    let tabHeaders = '<div class="flex border-b border-border mb-6 overflow-x-auto no-scrollbar gap-2">';
    let tabPanels = '<div class="relative">';

    for (let i = 0; i < tabMatches.length; i++) {
      const [fullTab, title, content] = tabMatches[i];
      const isActive = i === 0;
      const tabId = `tab-${Math.random().toString(36).substring(2, 9)}`;

      const parsedContent = await marked.parse(content.trim());

      tabHeaders += `
        <button class="tab-trigger px-6 py-3 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap
                       ${isActive ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'}"
                data-tab-target="${tabId}">
          ${title}
        </button>
      `;

      tabPanels += `
        <div id="${tabId}" class="tab-panel transition-all duration-300 ${isActive ? 'block animate-in fade-in slide-in-from-bottom-2' : 'hidden'}">
          <div class="prose-direct">${parsedContent}</div>
        </div>
      `;
    }

    tabHeaders += '</div>';
    tabPanels += '</div>';

    const tabsHtml = `
      <div class="notion-tabs-container my-10 border border-border/50 rounded-[2rem] p-6 md:p-8 bg-card/30 backdrop-blur-sm shadow-sm">
        ${tabHeaders}
        ${tabPanels}
      </div>
    `;

    processedHtml = processedHtml.replace(match[0], tabsHtml);
  }

  return processedHtml;
}

/**
 * Transforms GitHub-style alerts into styled HTML callouts.
 */
export function injectAlerts(html: string): string {
  const alertTypes = {
    NOTE: { color: "blue" },
    TIP: { color: "green" },
    IMPORTANT: { color: "purple" },
    WARNING: { color: "yellow" },
    CAUTION: { color: "red" },
  };

  return html.replace(
    /<blockquote[^>]*>\s*<p[^>]*>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(?:<\/p>|<br\/?>)?([\s\S]*?)<\/blockquote>/gi,
    (match, type, content) => {
      const upperType = type.toUpperCase() as keyof typeof alertTypes;
      const config = alertTypes[upperType];

      const colors: Record<string, string> = {
        blue: "border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-400",
        green:
          "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400",
        purple:
          "border-purple-500 bg-purple-500/10 text-purple-700 dark:text-purple-400",
        yellow:
          "border-yellow-500 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
        red: "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400",
      };

      return `<div class="my-6 border-l-4 p-4 rounded-r-lg ${colors[config.color] || colors.blue}">
      <p class="flex items-center gap-2 font-bold mb-2 uppercase text-xs tracking-widest">
        <span class="opacity-80">${upperType}</span>
      </p>
      <div class="prose-direct text-sm leading-relaxed">${content.trim()}</div>
    </div>`;
    },
  );
}

/**
 * Sanitizes HTML content by removing dangerous script/style tags while preserving GitHub Gists.
 */
export function sanitizeContent(html: string): string {
  if (typeof html !== "string") return "";

  const gists: string[] = [];

  let processedHtml = html.replace(
    /<script\b[^>]*>([\s\S]*?)<\/script[^>]*>/gim,
    (match) => {
      const srcMatch = match.match(/src=["']([^"']+)["']/i);
      if (srcMatch?.[1]) {
        try {
          const url = new URL(
            srcMatch[1].startsWith("//") ? "https:" + srcMatch[1] : srcMatch[1],
          );
          if (
            url.hostname === "gist.github.com" ||
            url.hostname.endsWith(".github.com")
          ) {
            gists.push(match);
            return `__GIST_PLACEHOLDER_${gists.length - 1}__`;
          }
        } catch {
        }
      }
      return match;
    },
  );

  const dangerousTagRegex = /<(script|style)\b[^>]*>[\s\S]*?<\/\1[^>]*>/gi;
  let previousHtml: string;
  do {
    previousHtml = processedHtml;
    processedHtml = processedHtml.replace(dangerousTagRegex, "");
  } while (processedHtml !== previousHtml);

  while (/<script\b/i.test(processedHtml) || /<\/script/i.test(processedHtml)) {
    processedHtml = processedHtml
      .replace(/<script\b/gi, "&lt;script")
      .replace(/<\/script/gi, "&lt;/script");
  }

  return processedHtml.replace(
    /__GIST_PLACEHOLDER_(\d+)__/g,
    (_, index) => gists[parseInt(index)] ?? "",
  );
}
