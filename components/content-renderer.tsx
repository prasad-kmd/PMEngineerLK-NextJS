"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import "katex/dist/katex.min.css";
import { Quiz } from "@/components/quiz";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { posthog } from "@/lib/posthog-client";
import { useTheme } from "next-themes";

interface ContentRendererProps {
  content: string;
  id?: string;
}

export function ContentRenderer({ content, id }: ContentRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const toastShown = useRef(false);
  const pathname = usePathname();
  const { theme, resolvedTheme } = useTheme();
  const renderedContent = content;

  // Track active tabs state
  const [activeTabs, setActiveTabs] = useState<Record<string, number>>({});

  useEffect(() => {
    // Process images to be lazy-loaded and optimized if possible
    if (contentRef.current) {
      const images = contentRef.current.querySelectorAll("img");
      images.forEach((img) => {
        if (!img.getAttribute("loading")) {
          img.setAttribute("loading", "lazy");
        }
        if (!img.getAttribute("decoding")) {
          img.setAttribute("decoding", "async");
        }
      });
    }
  }, [renderedContent]);

  useEffect(() => {
    // Reset toast state when content changes
    toastShown.current = false;
  }, [content]);

  useEffect(() => {
    const hasQuiz = content.includes('class="interactive-quiz-placeholder"');
    const isQuizPage = pathname?.startsWith("/quiz");

    if (hasQuiz && !isQuizPage && !toastShown.current) {
      toastShown.current = true;
      toast("Let's take a quiz!", {
        description: "Check your knowledge on this topic.",
        action: {
          label: "Take Quiz",
          onClick: () => {
            const quizElement = contentRef.current?.querySelector(
              ".interactive-quiz-card",
            );
            if (quizElement) {
              quizElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            } else if (id) {
              window.location.href = `/quiz/${id}`;
            }
          },
        },
        duration: 5000,
      });
    }
  }, [content, pathname, id]);

  useEffect(() => {
    if (!contentRef.current) return;

    const addCopyButtons = () => {
      const preBlocks = contentRef.current?.querySelectorAll("pre");
      preBlocks?.forEach((pre) => {
        // Skip if already has a copy button OR is part of a Shiki enhanced block
        if (
          pre.querySelector(".copy-button") ||
          pre.closest(".code-block-wrapper") ||
          pre.classList.contains("mermaid")
        )
          return;

        pre.style.position = "relative";
        const button = document.createElement("button");
        button.className =
          "copy-button absolute right-4 top-4 p-2 rounded-xl bg-white/5 text-white/50 hover:text-white hover:bg-white/10 backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 z-10";
        button.setAttribute("aria-label", "Copy code");
        button.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';

        pre.classList.add("group");

        button.onclick = (event) => {
          event.preventDefault();
          event.stopPropagation();
          const code =
            pre.querySelector("code")?.innerText || pre.innerText || "";
          navigator.clipboard
            .writeText(code)
            .then(() => {
              button.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
              button.classList.add("text-green-500");
              setTimeout(() => {
                button.innerHTML =
                  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
                button.classList.remove("text-green-500");
              }, 2000);
            })
            .catch((err) => {
              console.error("Failed to copy text: ", err);
            });
        };

        pre.appendChild(button);
      });
    };

    const processExternalLinks = () => {
      const links = contentRef.current?.querySelectorAll("a");
      links?.forEach((link) => {
        if (link.classList.contains("skip-external-icon")) return;

        const href = link.getAttribute("href");
        if (href && (href.startsWith("http") || href.startsWith("//"))) {
          try {
            const url = new URL(href, window.location.href);
            if (url.hostname !== window.location.hostname) {
              link.setAttribute(
                "href",
                `/external-link?url=${encodeURIComponent(href)}`,
              );
              link.setAttribute("target", "_blank");
              link.setAttribute("rel", "noopener noreferrer");

              link.classList.add(
                "text-blue-600",
                "dark:text-blue-400",
                "underline-offset-4",
                "hover:underline",
                "inline-flex",
                "items-center",
                "gap-0.5",
              );

              if (!link.querySelector(".external-link-icon")) {
                const icon = document.createElement("span");
                icon.className = "external-link-icon";
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;
                link.appendChild(icon);
              }

              link.onclick = () => {
                if (posthog) {
                  posthog.capture("outgoing_link_clicked", {
                    target_domain: url.hostname,
                    link_url: href,
                    source_page: window.location.pathname,
                  });
                }
              };
            }
          } catch {
            // Ignore invalid URLs
          }
        }
      });
    };

    const renderMath = async () => {
      if (!contentRef.current) return;
      try {
        const renderMathInElement = (await import("katex/contrib/auto-render"))
          .default;
        renderMathInElement(contentRef.current, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
          ],
          ignoredTags: [
            "script",
            "noscript",
            "style",
            "textarea",
            "pre",
            "code",
          ],
          throwOnError: false,
        });
      } catch (error) {
        console.error("KaTeX auto-render error:", error);
      }
    };

    const renderMermaid = async () => {
      if (!contentRef.current) return;
      const mermaidElements = contentRef.current.querySelectorAll(".mermaid");
      if (mermaidElements.length === 0) return;

      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === "dark" ? "dark" : "default",
          securityLevel: "loose",
        });
        await mermaid.run({
          nodes: Array.from(mermaidElements),
        });
      } catch (error) {
        console.error("Mermaid render error:", error);
      }
    };

    renderMath();
    renderMermaid();
    addCopyButtons();
    processExternalLinks();
  }, [renderedContent, resolvedTheme]);

  const parts = useMemo(() => {
    return renderedContent.split(
      /(<div class="interactive-quiz-placeholder" data-quiz='[\s\S]*?'>\s*<\/div>|<div class="notion-tabs-placeholder my-8" data-tabs(?:-code|-base64)?='[\s\S]*?'>\s*<\/div>)/g,
    );
  }, [renderedContent]);

  return (
    <div
      ref={contentRef}
      className="prose prose-neutral dark:prose-invert max-w-none 
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h1:text-4xl prose-h1:mb-6 amoriaregular
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-2 prose-h2:scroll-mt-24 amoriaregular
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:scroll-mt-24 amoriaregular
        prose-p:leading-relaxed prose-p:text-muted-foreground google-sans
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
        prose-strong:text-foreground prose-strong:font-semibold
        prose-code:rounded-md prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-transparent prose-pre:border-none prose-pre:p-0 prose-pre:m-0 prose-pre:overflow-visible
        prose-img:rounded-[2.5rem] prose-img:border-4 prose-img:border-card prose-img:shadow-2xl
        prose-table:border-collapse prose-table:border prose-table:border-border
        prose-th:border prose-th:border-border prose-th:bg-muted prose-th:px-4 prose-th:py-2 prose-th:font-semibold
        prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2
        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic
        prose-ul:list-disc prose-ul:pl-6
        prose-ol:list-decimal prose-ol:pl-6
        prose-li:text-muted-foreground prose-li:my-1"
    >
      {parts.map((part, index) => {
        if (part.includes('class="interactive-quiz-placeholder"')) {
          const match = part.match(/data-quiz='([\s\S]*?)'/);
          if (match && match[1]) {
            try {
              const decodedJson = match[1].replace(/&apos;/g, "'");
              const quizData = JSON.parse(decodedJson);
              return <Quiz key={index} id={id} {...quizData} />;
            } catch (e) {
              console.error("Failed to parse quiz data:", e);
              return (
                <div key={index} className="text-red-500">
                  Error loading quiz
                </div>
              );
            }
          }
        }

        if (part.includes('class="notion-tabs-placeholder"')) {
          const match =
            part.match(/data-tabs='([\s\S]*?)'/) ||
            part.match(/data-tabs-code='([\s\S]*?)'/) ||
            part.match(/data-tabs-base64="([\s\S]*?)"/);
          const isCode = part.includes("data-tabs-code");
          const isBase64 = part.includes("data-tabs-base64");

          if (match && match[1]) {
            try {
              let tabsData: Array<{ title: string; content: string }> = [];

              if (isBase64) {
                const decoded = atob(match[1]);
                const segments = decoded.split(/^\[(.+?)\]/m).filter(Boolean);
                for (let i = 0; i < segments.length; i += 2) {
                  tabsData.push({
                    title: segments[i],
                    content: segments[i + 1]?.trim() || "",
                  });
                }
              } else if (isCode) {
                const decoded = match[1].replace(/&apos;/g, "'");
                const segments = decoded.split(/^\[(.+?)\]/m).filter(Boolean);
                for (let i = 0; i < segments.length; i += 2) {
                  tabsData.push({
                    title: segments[i],
                    content: segments[i + 1]?.trim() || "",
                  });
                }
              } else {
                const decoded = match[1].replace(/&apos;/g, "'");
                tabsData = JSON.parse(decoded);
              }

              const activeIndex = activeTabs[index] || 0;

              return (
                <div
                  key={index}
                  className="notion-tabs-container my-8 border border-border/50 rounded-3xl overflow-hidden bg-card/30"
                >
                  <div className="flex border-b border-border/10 overflow-x-auto no-scrollbar bg-muted/20">
                    {tabsData.map((tab, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          setActiveTabs((prev) => ({ ...prev, [index]: i }))
                        }
                        className={`px-6 py-4 text-sm font-black amoriaregular tracking-widest uppercase transition-all whitespace-nowrap border-b-2 ${
                          activeIndex === i
                            ? "text-primary border-primary bg-primary/5"
                            : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/10"
                        }`}
                      >
                        {tab.title}
                      </button>
                    ))}
                  </div>
                  <div className="p-6 md:p-8">
                    <div
                      className="prose-direct"
                      dangerouslySetInnerHTML={{
                        __html: tabsData[activeIndex].content,
                      }}
                    />
                  </div>
                </div>
              );
            } catch (e) {
              console.error("Failed to parse tabs data:", e);
              return (
                <div key={index} className="text-red-500">
                  Error loading tabs
                </div>
              );
            }
          }
        }

        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: part }}
            style={{ display: "contents" }}
          />
        );
      })}
    </div>
  );
}
