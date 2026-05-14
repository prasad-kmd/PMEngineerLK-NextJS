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
        result += `
<div class="mermaid-preview my-12 rounded-3xl border border-border/50 bg-card p-8 shadow-sm overflow-x-auto flex justify-center items-center">
  <pre class="mermaid m-0 bg-transparent p-0">${decodedCode.trim()}</pre>
</div>`;
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
