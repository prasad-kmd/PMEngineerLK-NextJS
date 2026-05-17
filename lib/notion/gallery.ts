import { notion, DATABASE_IDS, getPlainText, getImageUrl, getSelect, getDate } from "@/lib/notion";
import { isNotionEnabled } from "@/lib/notion";

// Fallback data
export const fallbackGallery = [
  {
    id: "1",
    src: "/img/page/ideas.webp",
    thumbnail: "/img/page/ideas.webp",
    alt: "Ideation Process",
    title: "Initial Ideation",
    category: "Planning",
    date: "2024-01-01",
  },
  {
    id: "2",
    src: "/img/page/ideas_2.webp",
    thumbnail: "/img/page/ideas_2.webp",
    alt: "Brainstorming Session",
    title: "Brainstorming",
    category: "Planning",
    date: "2024-01-02",
  },
  {
    id: "3",
    src: "/img/page/workflow.webp",
    thumbnail: "/img/page/workflow.webp",
    alt: "Engineering Workflow",
    title: "Design Methodology",
    category: "Workflow",
    date: "2024-01-03",
  },
  {
    id: "4",
    src: "/img/page/diary.webp",
    thumbnail: "/img/page/diary.webp",
    alt: "Project Diary",
    title: "Field Documentation",
    category: "Research",
    date: "2024-01-04",
  },
  {
    id: "5",
    src: "/img/page/blackhole.webp",
    thumbnail: "/img/page/blackhole.webp",
    alt: "Technical Visualization",
    title: "Simulation & Modeling",
    category: "Technical",
    date: "2024-01-05",
  },
  {
    id: "6",
    src: "/img/page/posts.webp",
    thumbnail: "/img/page/posts.webp",
    alt: "Updates and Announcements",
    title: "Community Outreach",
    category: "Outreach",
    date: "2024-01-06",
  },
];

export interface GalleryItem {
  id: string;
  src: string;
  thumbnail: string;
  alt: string;
  title: string;
  category: string;
  date: string | null;
}

export interface GalleryResponse {
  items: GalleryItem[];
  nextCursor: string | null;
  hasMore: boolean;
}

export async function getGalleryItems(cursor?: string, limit: number = 9): Promise<GalleryResponse> {
  if (!isNotionEnabled || !DATABASE_IDS.gallery) {
    // Basic local pagination for fallback
    const start = cursor ? parseInt(cursor) : 0;
    const end = start + limit;
    const items = fallbackGallery.slice(start, end);
    const nextCursor = end < fallbackGallery.length ? end.toString() : null;

    return {
      items,
      nextCursor,
      hasMore: !!nextCursor,
    };
  }

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.gallery,
      filter: {
        property: "Status",
        select: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "Order",
          direction: "ascending",
        },
        {
          property: "Date",
          direction: "descending",
        },
      ],
      start_cursor: cursor,
      page_size: limit,
    });

    const items = response.results.map((page: any) => {
      const props = page.properties;
      const title = getPlainText(props.Name || props.Title);
      const description = getPlainText(props.Description);
      const src = getImageUrl(props.Image);
      const thumbnail = getImageUrl(props.Thumbnail) || src;
      const category = getSelect(props.Category);
      const date = getDate(props.Date);

      return {
        id: page.id,
        src,
        thumbnail,
        alt: description || title,
        title,
        category,
        date,
      };
    });

    return {
      items,
      nextCursor: response.next_cursor,
      hasMore: response.has_more,
    };
  } catch (error) {
    console.error("Gallery Fetch Error:", error);
    throw new Error("Failed to fetch gallery items");
  }
}
