import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Precision Engineering Calculator",
    description: "Comprehensive computational engine with support for trigonometric, logarithmic, and advanced algebraic functions.",
};

export default function ScientificCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
