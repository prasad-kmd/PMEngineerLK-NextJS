import type React from "react";
import "katex/dist/katex.min.css";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
