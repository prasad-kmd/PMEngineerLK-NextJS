import React from "react";
import type { Metadata } from "next";
import { History, GitCommit, Tag, ArrowRight } from "lucide-react";

const title = "Changelog";
const description = "A timeline of updates and improvements to this website.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/changelog",
  },
};

const updates = [
  {
    version: "0.1.6",
    date: "October 07, 2025",
    title: "Refactor Some pages",
    description: "",
    changes: [
      "Refactor About and Contact pages to enhance layout and accessibility; add HeroSlideshow component for dynamic visuals; create sample ideas document for project brainstorming.",
    ],
    type: "improvement",
  },
  {
    version: "0.1.5",
    date: "October 07, 2025",
    title: "Add placeholder images in various formats",
    description: "",
    changes: [
      "Add placeholder images in various formats (PNG, JPEG, SVG, WebP) to the public folder.",
      "Update README.md.",
    ],
    type: "improvement",
  },
  {
    version: "0.1.4",
    date: "October 07, 2025",
    title: "Refactor diary, ideas, posts, and workflow pages",
    description: "",
    changes: [
      "Refactor diary, ideas, posts, and workflow pages to highlight the first entry with a distinct border color and improve content structure",
    ],
    type: "improvement",
  },
  {
    version: "0.1.3",
    date: "October 07, 2025",
    title: "Enhance documentation and layout:",
    description: "",
    changes: [
      "Update README.md for improved code block formatting.",
      "Add About and Contact pages with team information and contact details.",
      "Update navigation to include About and Contact links.",
      "Modify layout metadata and icons for better project representation.",
    ],
    type: "improvement",
  },
  {
    version: "0.1.2",
    date: "October 07, 2025",
    title: "Add introductory post for Engineering Project 02",
    description: "",
    changes: [
      "Created a new markdown file for the project overview",
      "Included sections on team background, project vision, approach, and how to get involved",
      "Emphasized the importance of addressing local challenges in Sri Lanka",
      "Provided a structure for documenting the project's journey and progress",
    ],
    type: "feature",
  },
  {
    version: "0.1.1",
    date: "October 07, 2025",
    title: "Add Improvements",
    description: "Update dependencies and improve font imports in layout",
    changes: ["Updated dependencies", "Improved font imports in layout"],
    type: "improvement",
  },
  {
    version: "0.1.0",
    date: "October 07, 2025",
    title: "Initialize the foundation",
    description:
      "The first version of the PMEngineer portfolio goes on work as MechEngineerLK.",
    changes: ["Initialized repository for project Engineering project webapp"],
    type: "Start",
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen pb-20 px-6 lg:px-8 pt-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4 amoriaregular">
            Changelog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Following the evolution of this platform as it grows into a
            comprehensive engineering workspace.
          </p>
        </header>

        <div className="relative space-y-12 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border lg:before:left-1/2 lg:before:-ml-[1px]">
          {updates.map((update, idx) => (
            <div
              key={idx}
              className="relative flex flex-col lg:flex-row lg:justify-between lg:items-start group"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 z-10 h-9 w-9 rounded-full border-4 border-background bg-primary flex items-center justify-center lg:left-1/2 lg:-ml-[18px]">
                <GitCommit className="h-5 w-5 text-primary-foreground" />
              </div>

              <div
                className={`lg:w-[45%] ${idx % 2 === 0 ? "lg:order-1" : "lg:order-2 lg:text-right"}`}
              >
                <div className="pl-12 lg:pl-0">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-2">
                    <Tag className="h-3 w-3" />v{update.version}
                  </span>
                  <h3 className="text-2xl font-bold mb-1 philosopher">
                    {update.title}
                  </h3>
                  <p className="text-sm text-primary/70 font-semibold mb-4">
                    {update.date}
                  </p>
                </div>
              </div>

              <div
                className={`lg:w-[45%] mt-4 lg:mt-0 ${idx % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}
              >
                <div className="pl-12 lg:pl-0">
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow group-hover:shadow-md">
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed googleSans">
                      {update.description}
                    </p>
                    <ul className="space-y-2">
                      {update.changes.map((change, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-foreground/80"
                        >
                          <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
