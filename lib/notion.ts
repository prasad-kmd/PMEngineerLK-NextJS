import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap } from 'notion-types'
import { getPageTitle, getAllPagesInSpace, getPageProperty } from 'notion-utils'
import pMap from 'p-map'
import pMemoize from 'p-memoize'

// Create a Notion client with an optional auth token
export const notion = new NotionAPI({
  activeUser: process.env.NOTION_ACTIVE_USER,
  authToken: process.env.NOTION_AUTH_TOKEN
})

const getPageMemoized = pMemoize(async (pageId: string) => {
  return notion.getPage(pageId)
})

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  return getPageMemoized(pageId)
}

export interface NotionContentItem {
  id: string; // The Notion Page ID
  slug: string; // The URL slug (either custom or the ID)
  title: string;
  date?: string;
  description?: string;
  recordMap: ExtendedRecordMap;
  firstImage?: string;
  type: string;
  technical?: string;
  tags?: string[];
}

const NOTION_COLLECTIONS: Record<string, string> = {
  blog: process.env.NOTION_BLOG_ID || '',
  articles: process.env.NOTION_ARTICLES_ID || '',
  projects: process.env.NOTION_PROJECTS_ID || '',
  tutorials: process.env.NOTION_TUTORIALS_ID || '',
  wiki: process.env.NOTION_WIKI_ID || '',
  quizzes: process.env.NOTION_QUIZZES_ID || '',
}

export async function getNotionContentByType(type: string): Promise<NotionContentItem[]> {
  const collectionId = NOTION_COLLECTIONS[type]
  if (!collectionId) return []

  try {
    const recordMap = await getPage(collectionId)
    const pageIds = getAllPagesInSpace(recordMap, collectionId)

    const items = await pMap(
      pageIds,
      async (pageId) => {
        try {
          const pageRecordMap = await getPage(pageId)
          const block = pageRecordMap.block[pageId]?.value
          if (!block) return null

          const title = getPageTitle(pageRecordMap)
          const date = getPageProperty<number>('Date', block, pageRecordMap)
            ? new Date(getPageProperty<number>('Date', block, pageRecordMap)).toISOString()
            : undefined
          const description = getPageProperty<string>('Description', block, pageRecordMap)
          const slug = getPageProperty<string>('Slug', block, pageRecordMap) || pageId
          const technical = getPageProperty<string>('Technical', block, pageRecordMap)
          const tags = getPageProperty<string[]>('Tags', block, pageRecordMap)

          return {
            id: pageId,
            slug,
            title,
            date,
            description,
            recordMap: pageRecordMap,
            technical,
            tags,
            type
          }
        } catch {
          return null
        }
      },
      { concurrency: 5 }
    )

    return items.filter(Boolean) as NotionContentItem[]
  } catch (err) {
    console.error(`Error fetching Notion content for type ${type}:`, err)
    return []
  }
}

export async function getNotionContentItem(slug: string): Promise<NotionContentItem | null> {
  // 1. Check if the slug is already a Page ID
  try {
    const recordMap = await getPage(slug)
    const block = recordMap.block[slug]?.value
    if (block) {
      const title = getPageTitle(recordMap)
      const date = getPageProperty<number>('Date', block, recordMap)
        ? new Date(getPageProperty<number>('Date', block, recordMap)).toISOString()
        : undefined
      const description = getPageProperty<string>('Description', block, recordMap)
      const technical = getPageProperty<string>('Technical', block, recordMap)
      const tags = getPageProperty<string[]>('Tags', block, recordMap)

      return {
        id: slug,
        slug,
        title,
        date,
        description,
        recordMap,
        technical,
        tags,
        type: 'unknown'
      }
    }
  } catch {
    // Slug is not a valid Page ID, or the page was not found.
  }

  // 2. Check if the slug exists in any of the databases.
  // This is expensive, so we'd ideally cache this mapping.
  const types = Object.keys(NOTION_COLLECTIONS)
  for (const type of types) {
    const items = await getNotionContentByType(type)
    const found = items.find(item => item.slug === slug)
    if (found) {
      return found
    }
  }

  return null
}
