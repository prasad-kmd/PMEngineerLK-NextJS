import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Technical Document Editor",
    description: "High-performance Markdown environment with real-time GitHub-flavored preview and direct export capabilities.",
}

export default function MarkdownEditorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
