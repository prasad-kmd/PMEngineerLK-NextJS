import { ContentItem, Author } from "@/types/content";
import {
  getPlainText,
  getDate,
  getMultiSelect,
  getSelect,
  getCheckbox,
  getImageUrl,
  getNumber
} from "./utils";

/**
 * Extracts all properties from a Notion page and maps them to a ContentItem.
 */
export async function mapNotionPageToContentItem(
  page: any,
  type: ContentItem["type"]
): Promise<ContentItem> {
  const props = page.properties;

  // Resilient property extraction
  const slug = getPlainText(props.Slug || props.slug);
  const title = getPlainText(props.Name || props.Title || props.title || props.name);
  const date = getDate(props.Date || props.date || props.Published || props.published);
  const description = getPlainText(props.Description || props.description || props.Summary || props.summary);
  const tags = getMultiSelect(props.Tags || props.tags);
  const category = getSelect(props.Categories || props.categories || props.Category || props.category);

  const aiAssisted =
    getCheckbox(props.AIAssisted) ||
    getCheckbox(props["AI Assisted"]) ||
    getCheckbox(props.aiAssisted) ||
    getCheckbox(props.ai_assisted);

  const technical = getMultiSelect(props.Technical || props.technical).join(", ");

  // Thumbnail with cover fallback
  const thumbnail =
    getImageUrl(props.Thumbnail || props.thumbnail || props.Image || props.image) ||
    page.cover?.external?.url ||
    page.cover?.file?.url;

  const rTime = getNumber(props.RTime || props.rTime || props["Reading Time"] || props.reading_time);

  let authorSlug = "";
  const authorProp = props.Authors || props.authors || props.Author || props.author;
  if (authorProp?.relation?.length > 0) {
    // Note: This still requires a separate fetch or relation handling,
    // keeping current logic but making it more resilient to naming.
    try {
      const { notion } = await import("../notion");
      const authorPage: any = await notion.pages.retrieve({
        page_id: authorProp.relation[0].id,
      });
      authorSlug = getPlainText(authorPage.properties.Slug || authorPage.properties.slug);
    } catch (e) {
      console.error("Error fetching author for page:", page.id, e);
    }
  }

  return {
    id: page.id,
    slug,
    title,
    date,
    description,
    content: "",
    rawContent: "",
    final: true,
    firstImage: undefined,
    thumbnail,
    readingTime: rTime,
    rTime,
    technical,
    category,
    tags,
    aiAssisted,
    author: authorSlug,
    type,
  };
}
