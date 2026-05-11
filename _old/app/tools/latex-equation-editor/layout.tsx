import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Mathematical Formula Architect",
    description: "Advanced LaTeX authoring environment with dynamic block mathematical rendering and formula templates.",
}

export default function LatexEquationEditorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
