import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "MathML Integration Engine",
    description: "Seamlessly transform LaTeX syntax into standards-compliant MathML for high-fidelity web-based mathematical rendering.",
}

export default function LatexToMathmlLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
