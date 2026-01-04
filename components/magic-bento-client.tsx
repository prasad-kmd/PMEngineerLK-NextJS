"use client"

import dynamic from "next/dynamic"

interface MagicBentoClientProps {
  ideasCount: number
  diaryCount: number
  workflowCount: number
  postsCount: number
}

const MagicBento = dynamic(() => import("@/components/MagicBento"), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-muted/50 rounded-lg animate-pulse" />,
})

export default function MagicBentoClient({
  ideasCount,
  diaryCount,
  workflowCount,
  postsCount,
}: MagicBentoClientProps) {
  return (
    <MagicBento
      ideasCount={ideasCount}
      diaryCount={diaryCount}
      workflowCount={workflowCount}
      postsCount={postsCount}
    />
  )
}