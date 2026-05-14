import { ContentRenderer } from "@/components/content-renderer";
import { marked } from "@/lib/render/marked";
import { injectAlerts, injectHeadingIds, injectQuiz, sanitizeContent } from "@/lib/content/transformers";
import { highlightCodeBlocks, injectShortcodes } from "@/lib/render/processors";

async function processContent(content: string) {
    const html = await marked.parse(content) as string;
    const highlighted = await highlightCodeBlocks(html);
    const shortcodesInjected = await injectShortcodes(highlighted);
    return sanitizeContent(
        injectQuiz(
            injectAlerts(injectHeadingIds(shortcodesInjected))
        )
    );
}

export default async function TestBlocksPage() {
    const testContent = `
# Block Rendering Test

## Button Shortcode
[button href="https://google.com"]Go to Google[/button]

## Tabs Shortcode
[tabs]
[tab title="Code"]
\`\`\`javascript
console.log("Hello Tabs");
\`\`\`
[/tab]
[tab title="Description"]
This is a description inside a tab.
[/tab]
[/tabs]

## Mermaid Diagram
\`\`\`mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -- Yes --> C[Great!]
    B -- No --> D[Fix it]
    D --> B
\`\`\`

## Notion Simulated Blocks

### Callout
<div class="notion-callout p-6 rounded-2xl border border-border bg-muted/30 my-6 flex gap-4 items-start">
    <div class="text-2xl">💡</div>
    <div class="flex-1 notion-callout-text prose-p:m-0">
        This is a simulated Notion callout. It should show the icon and this text correctly.
    </div>
</div>

### Toggle List
<details class="notion-toggle group my-4 p-4 rounded-2xl border border-border bg-card/30 transition-all duration-300">
    <summary class="flex items-center gap-3 cursor-pointer font-bold amoriaregular tracking-widest text-sm uppercase select-none list-none">
        <span class="p-2 rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-open:rotate-90">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
        </span>
        Click to toggle more information
    </summary>
    <div class="mt-4 pl-12 border-l-2 border-primary/20 animate-in fade-in slide-in-from-top-2 duration-500">
        <p>This is the content inside a toggle list. It can contain other blocks.</p>
        <div class="p-4 bg-muted/50 rounded-xl border border-border">Nested block example</div>
    </div>
</details>

### Files Block
<div class="notion-file my-8">
    <a href="#" class="group flex items-center justify-between p-6 rounded-[2rem] border border-border bg-card/30 hover:bg-primary/[0.03] hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/5 active:scale-[0.98]">
        <div class="flex items-center gap-5">
            <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <div class="flex flex-col gap-1">
                <span class="font-bold amoriaregular tracking-widest text-sm uppercase text-foreground group-hover:text-primary transition-colors">resource-guide.pdf</span>
                <span class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">PDF Document • 2.4 MB</span>
            </div>
        </div>
        <div class="p-3 rounded-xl bg-muted/50 group-hover:bg-primary group-hover:text-white transition-all duration-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
        </div>
    </a>
</div>

### Another Mermaid
\`\`\`mermaid
pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
\`\`\`

## Edge Cases

### Empty Tabs
[tabs]
[/tabs]

### Tab with complex markdown
[tabs]
[tab title="Markdown"]
#### Header
- List item 1
- List item 2

> Quote

| Col 1 | Col 2 |
|-------|-------|
| Val 1 | Val 2 |
[/tab]
[/tabs]

### Button with weird characters
[button href="https://example.com?q=hello&world=true"]Click & Enjoy! < "Special" >[/button]
    `;

    const processedContent = await processContent(testContent);

    return (
        <div className="container mx-auto py-20 px-4">
            <ContentRenderer content={processedContent} />
        </div>
    );
}
