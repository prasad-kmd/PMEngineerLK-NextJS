/**
 * Extracts plain text from a Notion rich_text or title property.
 */
export function getPlainText(property: unknown): string {
  if (!property || typeof property !== "object") return "";
  const p = property as {
    type: string;
    title?: Array<{ plain_text: string }>;
    rich_text?: Array<{ plain_text: string }>;
  };
  if (p.type === "title" && p.title) {
    return p.title.map((t) => t.plain_text).join("");
  }
  if (p.type === "rich_text" && p.rich_text) {
    return p.rich_text.map((t) => t.plain_text).join("");
  }
  return "";
}

/**
 * Extracts a date string from a Notion date property.
 */
export function getDate(property: unknown): string | undefined {
  if (!property || typeof property !== "object") return undefined;
  const p = property as { type: string; date?: { start: string } };
  if (p.type !== "date" || !p.date) return undefined;
  return p.date.start;
}

/**
 * Extracts values from a Notion multi_select property.
 */
export function getMultiSelect(property: unknown): string[] {
  if (!property || typeof property !== "object") return [];
  const p = property as {
    type: string;
    multi_select?: Array<{ name: string }>;
  };
  if (p.type !== "multi_select" || !p.multi_select) return [];
  return p.multi_select.map((item) => item.name);
}

/**
 * Extracts a value from a Notion select property.
 */
export function getSelect(property: unknown): string | undefined {
  if (!property || typeof property !== "object") return undefined;
  const p = property as { type: string; select?: { name: string } };
  if (p.type !== "select" || !p.select) return undefined;
  return p.select.name;
}

/**
 * Extracts a boolean from a Notion checkbox property.
 */
export function getCheckbox(property: unknown): boolean {
  if (!property || typeof property !== "object") return false;
  const p = property as { type: string; checkbox?: boolean };
  if (p.type !== "checkbox") return false;
  return p.checkbox || false;
}

/**
 * Extracts an image URL from a Notion file or external image property.
 */
export function getImageUrl(property: unknown): string | undefined {
  if (!property || typeof property !== "object") return undefined;
  const p = property as {
    type: string;
    files?: Array<{
      type: string;
      external?: { url: string };
      file?: { url: string };
    }>;
  };
  if (p.type !== "files" || !p.files || p.files.length === 0) {
    return undefined;
  }
  const file = p.files[0];
  if (file.type === "external") return file.external?.url;
  if (file.type === "file") return file.file?.url;
  return undefined;
}

// Notion types for better type safety
export interface NotionPage {
  id: string;
  properties: Record<string, unknown>;
}

export interface NotionTitleProperty {
  type: "title";
  title: Array<{ plain_text: string }>;
}

export interface NotionRichTextProperty {
  type: "rich_text";
  rich_text: Array<{ plain_text: string }>;
}
