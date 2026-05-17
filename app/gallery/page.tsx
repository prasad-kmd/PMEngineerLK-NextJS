import { Metadata } from "next";
import GalleryClient from "@/components/gallery-client";
import { generateContentMetadata } from "@/lib/seo/metadata";
import { getGalleryItems } from "@/lib/notion/gallery";

export const generateMetadata = async (): Promise<Metadata> => {
  return generateContentMetadata({
    title: "Project Gallery",
    description: "A visual showcase of my engineering projects, research, and technical visualizations.",
    slug: "gallery",
    type: "website",
  });
};

export default async function GalleryPage() {
  // Fetch initial data directly on the server
  let initialData = { items: [], nextCursor: null, hasMore: false };
  
  try {
    initialData = await getGalleryItems(undefined, 9);
  } catch (error) {
    console.error("Failed to fetch initial gallery data:", error);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Project Gallery
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          A visual collection of engineering milestones, design iterations, and 
          technical explorations. Managed dynamically via Notion.
        </p>
      </div>

      <GalleryClient 
        initialItems={initialData.items} 
        initialNextCursor={initialData.nextCursor}
        initialHasMore={initialData.hasMore}
      />
    </div>
  );
}
