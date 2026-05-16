"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EditablePanelProps {
  title: string;
  subtitle?: string;
  period?: string;
  children: React.ReactNode;
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  defaultExpanded?: boolean;
}

export function EditablePanel({
  title,
  subtitle,
  period,
  children,
  onRemove,
  onMoveUp,
  onMoveDown,
  defaultExpanded = false,
}: EditablePanelProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card/30 transition-all hover:border-primary/20 hover:bg-card/50">
      <div
        className={cn(
          "flex items-center justify-between p-4 cursor-pointer",
          isExpanded && "border-b border-border bg-muted/20"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-2">
            <h4 className="truncate font-bold text-sm google-sans">{title || "Untitled"}</h4>
            {period && (
              <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary font-local-jetbrains-mono">
                {period}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="truncate text-xs text-muted-foreground mt-0.5 font-google-sans">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onMoveUp && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          )}
          {onMoveDown && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <div className="text-muted-foreground">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="p-4 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}
