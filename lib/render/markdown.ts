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

marked.use({
  renderer,
  async: true,
  extensions: [quizExtension],
});

export { marked };
