"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  MousePointer2, 
  Copy, 
  Check, 
  RotateCcw, 
  Plus, 
  Settings2, 
  Code2, 
  Eye,
  Info,
  ExternalLink,
  ChevronRight,
  Package,
  Layout,
  Type,
  Maximize
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { usePersistentState } from "@/hooks/use-persistent-state";

// --- Types & Constants ---

type ButtonConfig = {
  label: string;
  variant: "default" | "outline" | "ghost" | "link" | "secondary" | "destructive";
  size: "default" | "sm" | "lg" | "icon";
  radius: "none" | "sm" | "md" | "lg" | "full";
  fullWidth: boolean;
  hasShadow: boolean;
  uppercase: boolean;
  hasIcon: "none" | "leading" | "trailing";
  isDisabled: boolean;
};

const DEFAULT_CONFIG: ButtonConfig = {
  label: "Click Me",
  variant: "default",
  size: "default",
  radius: "md",
  fullWidth: false,
  hasShadow: false,
  uppercase: false,
  hasIcon: "none",
  isDisabled: false,
};

const RADIUS_CLASSES = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

// --- Library & Recipes ---

const LIBRARY_ITEMS = [
  {
    name: "Classic Solid",
    description: "Standard primary button style.",
    config: { ...DEFAULT_CONFIG, variant: "default" as const },
  },
  {
    name: "Soft Secondary",
    description: "Subtle secondary background.",
    config: { ...DEFAULT_CONFIG, variant: "secondary" as const },
  },
  {
    name: "Clean Outline",
    description: "Bordered button with transparent background.",
    config: { ...DEFAULT_CONFIG, variant: "outline" as const },
  },
  {
    name: "Subtle Ghost",
    description: "No border or background until hover.",
    config: { ...DEFAULT_CONFIG, variant: "ghost" as const },
  },
];

const RECIPES = [
  {
    name: "Primary CTA",
    description: "High emphasis call-to-action.",
    config: { 
      ...DEFAULT_CONFIG, 
      label: "Get Started", 
      size: "lg" as const, 
      radius: "full" as const, 
      hasShadow: true,
      hasIcon: "trailing" as const 
    },
  },
  {
    name: "Soft Accent",
    description: "Accent-tinted button using opacity.",
    config: { 
      ...DEFAULT_CONFIG, 
      variant: "ghost" as const,
      label: "View More",
      // We'll handle custom class in the logic if needed, 
      // but for now we stick to standard variants.
    },
    customClasses: "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary border-none shadow-none",
  },
  {
    name: "Modern Pill",
    description: "Fully rounded with uppercase tracking.",
    config: { 
      ...DEFAULT_CONFIG, 
      label: "Subscribe", 
      radius: "full" as const, 
      uppercase: true,
    },
  },
  {
    name: "Minimal Icon Link",
    description: "Link style with leading icon.",
    config: { 
      ...DEFAULT_CONFIG, 
      variant: "link" as const, 
      label: "Documentation", 
      hasIcon: "leading" as const 
    },
  },
];

// --- Main Component ---

export default function ButtonLabPage() {
  const [config, setConfig, isLoaded] = usePersistentState<ButtonConfig>("ts-labs-button-config", DEFAULT_CONFIG);
  const [customClasses, setCustomClasses] = useState<string>("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  // Apply recipe or library item
  const applyPreset = (preset: { config: ButtonConfig; customClasses?: string }) => {
    setConfig(preset.config);
    setCustomClasses(preset.customClasses || "");
    toast.success("Preset applied");
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    setCustomClasses("");
    toast.info("Reset to defaults");
  };

  const generatedClasses = useMemo(() => {
    const parts = [];
    
    // Base classes (simplified for export)
    parts.push("inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50");
    
    // Variant
    if (customClasses) {
      parts.push(customClasses);
    } else {
      switch (config.variant) {
        case "default": parts.push("bg-primary text-primary-foreground shadow hover:bg-primary/90"); break;
        case "secondary": parts.push("bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80"); break;
        case "outline": parts.push("border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"); break;
        case "ghost": parts.push("hover:bg-accent hover:text-accent-foreground"); break;
        case "link": parts.push("text-primary underline-offset-4 hover:underline"); break;
        case "destructive": parts.push("bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"); break;
      }
    }

    // Size
    switch (config.size) {
      case "sm": parts.push("h-8 px-3 text-xs"); break;
      case "lg": parts.push("h-10 px-8"); break;
      case "icon": parts.push("h-9 w-9"); break;
      default: parts.push("h-9 px-4 py-2"); break;
    }

    // Radius
    parts.push(RADIUS_CLASSES[config.radius]);

    // Width
    if (config.fullWidth) parts.push("w-full");

    // Shadow
    if (config.hasShadow && !customClasses.includes("shadow-none")) parts.push("shadow-md");

    // Typography
    if (config.uppercase) parts.push("uppercase tracking-wider");

    return parts.join(" ");
  }, [config, customClasses]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus("copied");
    toast.success("Copied to clipboard");
    setTimeout(() => setCopyStatus("idle"), 2000);
  };

  const reactSnippet = `<Button 
  variant="${config.variant}" 
  size="${config.size}" 
  className="${cn(RADIUS_CLASSES[config.radius], config.fullWidth && "w-full", config.hasShadow && "shadow-md", config.uppercase && "uppercase tracking-wider", customClasses)}"
  ${config.isDisabled ? "disabled" : ""}
>
  ${config.hasIcon === 'leading' ? '<ChevronRight className="h-4 w-4" /> ' : ''}${config.label}${config.hasIcon === 'trailing' ? ' <ChevronRight className="h-4 w-4" />' : ''}
</Button>`;

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen px-6 py-12 lg:px-8 img_grad_pm">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/tools" },
            { label: "Tailwind Labs", href: "/tools/ts-labs" },
            { label: "Button LAB", href: "/tools/ts-labs/button-lab", active: true },
          ]}
          className="mb-8"
        />

        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mozilla-headline flex items-center gap-3">
              <MousePointer2 className="h-8 w-8 text-primary" />
              Button LAB
            </h1>
            <p className="mt-2 text-muted-foreground">
              Design and experiment with accent-aware Tailwind CSS buttons.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
            <RotateCcw className="h-4 w-4" /> Reset to Defaults
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left Column: Controls */}
          <div className="space-y-8">
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-6 text-primary">
                <Settings2 className="h-5 w-5" />
                <h2 className="font-bold text-lg google-sans">Builder Controls</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="label">Button Label</Label>
                  <Input 
                    id="label" 
                    value={config.label} 
                    onChange={(e) => setConfig({ ...config, label: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Variant</Label>
                  <Select 
                    value={config.variant} 
                    onValueChange={(v: ButtonConfig["variant"]) => {
                      setConfig({ ...config, variant: v });
                      setCustomClasses(""); // Clear custom classes if variant is manually changed
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select variant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default (Solid)</SelectItem>
                      <SelectItem value="secondary">Secondary</SelectItem>
                      <SelectItem value="outline">Outline</SelectItem>
                      <SelectItem value="ghost">Ghost</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                      <SelectItem value="destructive">Destructive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Size</Label>
                  <Select 
                    value={config.size} 
                    onValueChange={(v: ButtonConfig["size"]) => setConfig({ ...config, size: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sm">Small (sm)</SelectItem>
                      <SelectItem value="default">Medium (default)</SelectItem>
                      <SelectItem value="lg">Large (lg)</SelectItem>
                      <SelectItem value="icon">Icon only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Border Radius</Label>
                  <Select 
                    value={config.radius} 
                    onValueChange={(v: ButtonConfig["radius"]) => setConfig({ ...config, radius: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select radius" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None (0px)</SelectItem>
                      <SelectItem value="sm">Small (2px)</SelectItem>
                      <SelectItem value="md">Medium (4px)</SelectItem>
                      <SelectItem value="lg">Large (8px)</SelectItem>
                      <SelectItem value="full">Full (Pill)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between gap-4 p-3 rounded-lg border border-border bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Full Width</Label>
                    <p className="text-[10px] text-muted-foreground">Expand to container</p>
                  </div>
                  <Switch 
                    checked={config.fullWidth} 
                    onCheckedChange={(v) => setConfig({ ...config, fullWidth: v })} 
                  />
                </div>

                <div className="flex items-center justify-between gap-4 p-3 rounded-lg border border-border bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Shadow</Label>
                    <p className="text-[10px] text-muted-foreground">Add elevation</p>
                  </div>
                  <Switch 
                    checked={config.hasShadow} 
                    onCheckedChange={(v) => setConfig({ ...config, hasShadow: v })} 
                  />
                </div>

                <div className="flex items-center justify-between gap-4 p-3 rounded-lg border border-border bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Uppercase</Label>
                    <p className="text-[10px] text-muted-foreground">All caps + tracking</p>
                  </div>
                  <Switch 
                    checked={config.uppercase} 
                    onCheckedChange={(v) => setConfig({ ...config, uppercase: v })} 
                  />
                </div>

                <div className="flex items-center justify-between gap-4 p-3 rounded-lg border border-border bg-muted/30">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Disabled</Label>
                    <p className="text-[10px] text-muted-foreground">State simulation</p>
                  </div>
                  <Switch 
                    checked={config.isDisabled} 
                    onCheckedChange={(v) => setConfig({ ...config, isDisabled: v })} 
                  />
                </div>

                <div className="space-y-2">
                  <Label>Icon Placement</Label>
                  <Select 
                    value={config.hasIcon} 
                    onValueChange={(v: ButtonConfig["hasIcon"]) => setConfig({ ...config, hasIcon: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="leading">Leading Icon</SelectItem>
                      <SelectItem value="trailing">Trailing Icon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Tabs defaultValue="library" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="library" className="gap-2">
                  <Package className="h-4 w-4" /> Library
                </TabsTrigger>
                <TabsTrigger value="recipes" className="gap-2">
                  <Layout className="h-4 w-4" /> Recipes
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="library">
                <div className="grid gap-4 md:grid-cols-2">
                  {LIBRARY_ITEMS.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => applyPreset(item)}
                      className="text-left p-4 rounded-xl border border-border bg-card/30 hover:border-primary/40 hover:bg-card transition-all group"
                    >
                      <h3 className="font-bold text-sm google-sans group-hover:text-primary">{item.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1 local-inter">{item.description}</p>
                    </button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recipes">
                <div className="grid gap-4 md:grid-cols-2">
                  {RECIPES.map((recipe) => (
                    <button
                      key={recipe.name}
                      onClick={() => applyPreset(recipe)}
                      className="text-left p-4 rounded-xl border border-border bg-card/30 hover:border-primary/40 hover:bg-card transition-all group"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-sm google-sans group-hover:text-primary">{recipe.name}</h3>
                        {recipe.customClasses && <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono uppercase">Custom</span>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 local-inter">{recipe.description}</p>
                    </button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Preview & Export */}
          <div className="space-y-6">
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-primary">
                  <Eye className="h-5 w-5" />
                  <h2 className="font-bold text-lg google-sans">Live Preview</h2>
                </div>
              </div>

              <div className="min-h-[200px] flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-border bg-muted/10 mb-6">
                <div className={cn(config.fullWidth ? "w-full" : "w-auto")}>
                  <Button
                    variant={customClasses ? undefined : config.variant}
                    size={config.size}
                    disabled={config.isDisabled}
                    className={cn(
                      RADIUS_CLASSES[config.radius],
                      config.hasShadow && "shadow-md",
                      config.uppercase && "uppercase tracking-wider",
                      customClasses,
                      config.fullWidth && "w-full"
                    )}
                  >
                    {config.hasIcon === "leading" && <ChevronRight className="h-4 w-4" />}
                    {config.size === "icon" ? <Plus className="h-4 w-4" /> : config.label}
                    {config.hasIcon === "trailing" && <ChevronRight className="h-4 w-4" />}
                  </Button>
                </div>
                
                <p className="mt-6 text-[10px] text-muted-foreground flex items-center gap-1">
                  <Info className="h-3 w-3" /> Use Tab to test focus ring
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <Code2 className="h-3 w-3" /> Tailwind Classes
                    </Label>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={() => copyToClipboard(generatedClasses)}
                    >
                      {copyStatus === "copied" ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                  <div className="p-3 rounded-lg bg-black/10 border border-border/50 font-mono text-[10px] break-all leading-relaxed h-24 overflow-y-auto">
                    {generatedClasses}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <Layout className="h-3 w-3" /> React (Radix UI)
                    </Label>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={() => copyToClipboard(reactSnippet)}
                    >
                      {copyStatus === "copied" ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                  <div className="p-3 rounded-lg bg-black/10 border border-border/50 font-mono text-[10px] whitespace-pre break-all h-32 overflow-y-auto">
                    {reactSnippet}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-primary/10 bg-primary/5 text-center">
              <p className="text-xs text-muted-foreground local-inter leading-relaxed">
                All styles are <span className="font-bold text-primary italic">accent-aware</span>. 
                Change the site theme to see how these buttons adapt automatically.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
