"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";

interface MermaidRendererProps {
  content: string;
}

export default function MermaidRenderer({ content }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme || "light";

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: currentTheme === "dark" ? "dark" : "default",
      securityLevel: "loose",
      fontFamily: "var(--font-google-sans)",
    });

    const renderDiagram = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, content);
        setSvg(svg);
        setError(false);
      } catch (err) {
        console.error("Mermaid rendering failed:", err);
        setError(true);
      }
    };

    renderDiagram();
  }, [content, currentTheme]);

  if (error) {
    return (
      <div className="my-12 p-8 rounded-3xl border border-red-500/20 bg-red-500/5 text-red-500">
        <div className="flex items-center gap-3 mb-4">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span className="font-bold amoriaregular tracking-widest uppercase text-sm">Diagram Render Error</span>
        </div>
        <pre className="text-xs overflow-auto p-4 bg-background/50 rounded-xl border border-red-500/10 font-mono">
          {content}
        </pre>
      </div>
    );
  }

  return (
    <div className="mermaid-block-container my-12 group/mermaid relative">
      <div
        ref={containerRef}
        className="mermaid-preview rounded-[2.5rem] border border-border/50 bg-card/30 p-10 shadow-sm overflow-x-auto flex justify-center items-center transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(var(--primary-rgb),0.1)] hover:border-primary/20"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {!svg && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-xs rounded-[2.5rem]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Rendering Diagram</span>
          </div>
        </div>
      )}
      <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover/mermaid:opacity-100 transition-all duration-300">
        <button
          className="mermaid-copy-button p-3 rounded-2xl bg-background/80 backdrop-blur-md border border-border shadow-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all group/btn"
          title="Copy Mermaid Source"
          onClick={() => {
            navigator.clipboard.writeText(content);
            toast.success("Mermaid source copied!");
          }}
        >
          <svg className="w-4 h-4 transition-transform group-active/btn:scale-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
        </button>
      </div>
    </div>
  );
}

import { toast } from "sonner";
