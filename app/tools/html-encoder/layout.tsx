import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Security & Syntax Escaper",
    description: "Enterprise-grade HTML entity encoder/decoder designed for secure code presentation and XSS prevention.",
}

export default function HtmlEncoderLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
