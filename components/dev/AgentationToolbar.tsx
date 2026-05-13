'use client'

import dynamic from 'next/dynamic'

const Agentation = dynamic(
  () => import('agentation').then((m) => m.Agentation),
  { ssr: false }
)

export function AgentationToolbar() {
  // Ensures it only shows up in `pnpm dev`
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <Agentation
      // If the button overlaps with your bottom-right UI,
      // use className to tweak positioning/z-index.
      // className="z-[9999]"
    />
  )
}