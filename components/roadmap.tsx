import React from "react";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface Milestone {
  title: string;
  description: string;
  date: string;
  status: "completed" | "in-progress" | "planned";
}

const milestones: Milestone[] = [
  {
    title: "-",
    description:
      "-",
    date: "-",
    status: "completed",
  },
  {
    title: "-",
    description:
      "-",
    date: "-",
    status: "completed",
  },
  {
    title: "-",
    description:
      "-",
    date: "-",
    status: "completed",
  },
  {
    title: "-",
    description:
      "-",
    date: "-",
    status: "in-progress",
  },
  {
    title: "-",
    description:
      "-",
    date: "-",
    status: "planned",
  },
  {
    title: "-",
    description:
      "-",
    date: "-",
    status: "planned",
  },
  {
    title: "-",
    description:
      "-",
    date: "-",
    status: "planned",
  },
];

export default function Roadmap() {
  return (
    <div className="space-y-8">
      {milestones.map((milestone, index) => (
        <div key={index} className="relative flex gap-6 pb-8 last:pb-0">
          {/* Vertical Line */}
          {index !== milestones.length - 1 && (
            <div className="absolute left-[11px] top-6 h-full w-[2px] bg-border" />
          )}

          <div className="relative z-10 mt-1">
            {milestone.status === "completed" ? (
              <CheckCircle2 className="h-6 w-6 text-primary bg-background" />
            ) : milestone.status === "in-progress" ? (
              <Clock className="h-6 w-6 text-blue-500 bg-background animate-pulse" />
            ) : (
              <Circle className="h-6 w-6 text-muted-foreground bg-background" />
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-foreground">
                {milestone.title}
              </h3>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                  milestone.status === "completed"
                    ? "bg-primary/10 text-primary border-primary/20"
                    : milestone.status === "in-progress"
                      ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                      : "bg-muted text-muted-foreground border-border"
                }`}
              >
                {milestone.status.replace("-", " ")}
              </span>
            </div>
            <span className="text-xs font-semibold text-primary/70 mb-2">
              {milestone.date}
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {milestone.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
