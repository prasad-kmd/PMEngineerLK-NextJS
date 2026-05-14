import { marked } from "marked";

// Custom renderer to add IDs to headings for TOC
const renderer = new marked.Renderer();
renderer.heading = ({ text, depth }) => {
  let cleanText = text;
  while (/<[^>]*>/g.test(cleanText)) {
    cleanText = cleanText.replace(/<[^>]*>/g, "");
  }
  const id = cleanText
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `<h${depth} id="${id}">${text}</h${depth}>`;
};

// Custom quiz extension for marked
const quizExtension = {
  name: "quiz",
  level: "block" as const,
  tokenizer(src: string) {
    const rule = /^\[quiz\]\s*([\s\S]*?)\s*\[\/quiz\](?:\s*\n|$)/;
    const match = rule.exec(src);
    if (match) {
      return {
        type: "quiz",
        raw: match[0],
        json: match[1],
      };
    }
  },
  renderer(token: { json: string }) {
    return `[quiz]${token.json}[/quiz]`;
  },
};

// Custom button extension
const buttonExtension = {
  name: "button",
  level: "block" as const,
  tokenizer(src: string) {
    const rule = /^\[button\s+href="([^"]+)"\](.*?)\[\/button\](?:\s*\n|$)/;
    const match = rule.exec(src);
    if (match) {
      return {
        type: "button",
        raw: match[0],
        href: match[1],
        text: match[2],
      };
    }
  },
  renderer(token: { href: string; text: string }) {
    return `[button href="${token.href}"]${token.text}[/button]`;
  },
};

// Custom tabs extension
const tabsExtension = {
  name: "tabs",
  level: "block" as const,
  tokenizer(src: string) {
    const rule = /^\[tabs\]\s*([\s\S]*?)\s*\[\/tabs\](?:\s*\n|$)/;
    const match = rule.exec(src);
    if (match) {
      return {
        type: "tabs",
        raw: match[0],
        content: match[1],
      };
    }
  },
  renderer(token: { content: string }) {
    return `[tabs]${token.content}[/tabs]`;
  },
};

marked.use({
  renderer,
  async: true,
  extensions: [quizExtension, buttonExtension, tabsExtension],
});

export { marked };
