import type { Metadata } from "next"
import Image from "next/image"

const title = "Project Gallery"
const description = "Visual documentation of our engineering journey, prototypes, and field work."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/gallery",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(title)}`,
        width: 1200,
        height: 630,
        alt: description,
      },
    ],
  },
}

const galleryImages = [
  {
    src: "/img/page/ideas.webp",
    alt: "Ideation Process",
    title: "Initial Ideation",
    category: "Planning",
  },
  {
    src: "/img/page/ideas_2.webp",
    alt: "Brainstorming Session",
    title: "Brainstorming",
    category: "Planning",
  },
  {
    src: "/img/page/workflow.webp",
    alt: "Engineering Workflow",
    title: "Design Methodology",
    category: "Workflow",
  },
  {
    src: "/img/page/diary.webp",
    alt: "Project Diary",
    title: "Field Documentation",
    category: "Research",
  },
  {
    src: "/img/page/blackhole.webp",
    alt: "Technical Visualization",
    title: "Simulation & Modeling",
    category: "Technical",
  },
  {
    src: "/img/page/posts.webp",
    alt: "Updates and Announcements",
    title: "Community Outreach",
    category: "Outreach",
  },
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen py-20 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold philosopher lg:text-5xl mb-4">Project Gallery</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visual highlights from our engineering journey. From early concepts to technical implementations and field work.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted transition-all hover:shadow-2xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-xs font-bold text-primary uppercase tracking-widest mb-1 block">
                  {image.category}
                </span>
                <h3 className="text-xl font-bold text-white">{image.title}</h3>
                <p className="text-sm text-gray-300 mt-2">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
