"use client"

import dynamic from "next/dynamic"

interface MagicBentoClientProps {
  blogCount: number
  articlesCount: number
  projectsCount: number
  tutorialsCount: number
}

const MagicBento = dynamic(() => import("@/components/MagicBento"), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-muted/50 rounded-lg animate-pulse" />,
})

export default function MagicBentoClient({
  blogCount,
  articlesCount,
  projectsCount,
  tutorialsCount,
}: MagicBentoClientProps) {
  return (
    <MagicBento
      blogCount={blogCount}
      articlesCount={articlesCount}
      projectsCount={projectsCount}
      tutorialsCount={tutorialsCount}
    />
  )
}