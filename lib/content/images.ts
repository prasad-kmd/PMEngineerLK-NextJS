/**
 * Extracts the first image URL from Markdown or HTML content.
 */
export function extractFirstImage(
  content: string,
  isMarkdown: boolean,
): string | undefined {
  if (isMarkdown) {
    const markdownImageRegex = /!\[.*?\]\((.*?)\)/;
    const match = content.match(markdownImageRegex);
    if (match && match[1]) {
      return match[1];
    }
  }

  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["']/i;
  const match = content.match(htmlImageRegex);
  if (match && match[1]) {
    return match[1];
  }

  return undefined;
}
