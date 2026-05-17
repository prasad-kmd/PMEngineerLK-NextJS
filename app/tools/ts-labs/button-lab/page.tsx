"use client";

import React, { useState, useMemo, useCallback } from "react";
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
  ChevronRight,
  Package,
  Layout,
  Search as SearchIcon,
  X,
  ArrowUpDown,
  Star
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
import { 
  type ButtonConfig, 
  type PresetItem,
  DEFAULT_CONFIG, 
  PRESET_LIBRARY, 
  RECIPE_LIBRARY 
} from "./button-presets";


// --- Constants ---

const RADIUS_CLASSES = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
};

const ALL_TAGS = Array.from(
  new Set([...PRESET_LIBRARY, ...RECIPE_LIBRARY].flatMap((item) => item.tags))
).sort();

// --- Main Component ---

export default function ButtonLabPage() {
  const [config, setConfig, isLoaded] = usePersistentState<ButtonConfig>("ts-labs-button-config", DEFAULT_CONFIG);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"featured" | "name">("featured");
  const [customClasses, setCustomClasses] = useState<string>("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  // Filter and Sort Logic
  const filterAndSort = useCallback((items: PresetItem[]) => {
    return items
      .filter((item) => {
        const matchesSearch = 
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()) ||
          item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
        
        const matchesTag = !selectedTag || item.tags.includes(selectedTag);
        
        return matchesSearch && matchesTag;
      })
      .sort((a, b) => {
        if (sortBy === "featured") {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
        }
        return a.name.localeCompare(b.name);
      });
  }, [search, selectedTag, sortBy]);

  const filteredPresets = useMemo(() => filterAndSort(PRESET_LIBRARY), [filterAndSort]);
  const filteredRecipes = useMemo(() => filterAndSort(RECIPE_LIBRARY), [filterAndSort]);
  const featuredItems = useMemo(() => {
    const all = [...PRESET_LIBRARY, ...RECIPE_LIBRARY];
    return all.filter(item => item.isFeatured).slice(0, 10);
  }, []);

  // Apply recipe or library item
  const applyPreset = (preset: PresetItem) => {
    setConfig(preset.config);
    setCustomClasses(preset.customClasses || "");
    toast.success(`Applied: ${preset.name}`);
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
                      <SelectItem value="xl">X-Large (12px)</SelectItem>
                      <SelectItem value="2xl">2X-Large (16px)</SelectItem>
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

            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-64">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search styles..." 
                    className="pl-9 h-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search && (
                    <button 
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Select value={sortBy} onValueChange={(v: "featured" | "name") => setSortBy(v)}>
                    <SelectTrigger className="h-9 w-[140px]">
                      <ArrowUpDown className="h-3.5 w-3.5 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                    </SelectContent>
                  </Select>

                  {(search || selectedTag) && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setSearch("");
                        setSelectedTag(null);
                      }}
                      className="text-xs h-9"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto scrollbar-hide">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border",
                    !selectedTag 
                      ? "bg-primary text-primary-foreground border-primary" 
                      : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"
                  )}
                >
                  All
                </button>
                {ALL_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border whitespace-nowrap",
                      selectedTag === tag
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <Tabs defaultValue={featuredItems.length > 0 && !search && !selectedTag ? "featured" : "library"} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="featured" className="gap-2">
                    <Star className="h-4 w-4" /> Featured
                  </TabsTrigger>
                  <TabsTrigger value="library" className="gap-2">
                    <Package className="h-4 w-4" /> Library
                  </TabsTrigger>
                  <TabsTrigger value="recipes" className="gap-2">
                    <Layout className="h-4 w-4" /> Recipes
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="featured" className="mt-0">
                  <div className="grid gap-3 md:grid-cols-2">
                    {featuredItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => applyPreset(item)}
                        className="text-left p-4 rounded-xl border border-border bg-card/30 hover:border-primary/40 hover:bg-card transition-all group relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-sm google-sans group-hover:text-primary">{item.name}</h3>
                          <Star className="h-3 w-3 text-primary fill-primary" />
                        </div>
                        <p className="text-[11px] text-muted-foreground local-inter line-clamp-1">{item.description}</p>
                        <div className="flex gap-1 mt-2">
                          {item.tags.slice(0, 2).map(t => (
                            <span key={t} className="text-[8px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase">{t}</span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="library" className="mt-0">
                  <div className="grid gap-3 md:grid-cols-2 max-h-[500px] overflow-y-auto p-1 scrollbar-hide">
                    {filteredPresets.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => applyPreset(item)}
                        className="text-left p-4 rounded-xl border border-border bg-card/30 hover:border-primary/40 hover:bg-card transition-all group"
                      >
                        <h3 className="font-bold text-sm google-sans group-hover:text-primary">{item.name}</h3>
                        <p className="text-[11px] text-muted-foreground mt-1 local-inter line-clamp-1">{item.description}</p>
                      </button>
                    ))}
                    {filteredPresets.length === 0 && (
                      <div className="col-span-2 py-12 text-center text-muted-foreground">
                        No presets found matching your criteria.
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="recipes" className="mt-0">
                  <div className="grid gap-3 md:grid-cols-2 max-h-[500px] overflow-y-auto p-1 scrollbar-hide">
                    {filteredRecipes.map((recipe) => (
                      <button
                        key={recipe.id}
                        onClick={() => applyPreset(recipe)}
                        className="text-left p-4 rounded-xl border border-border bg-card/30 hover:border-primary/40 hover:bg-card transition-all group"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-sm google-sans group-hover:text-primary">{recipe.name}</h3>
                          {recipe.customClasses && <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono uppercase shrink-0 ml-2">Custom</span>}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1 local-inter line-clamp-1">{recipe.description}</p>
                      </button>
                    ))}
                    {filteredRecipes.length === 0 && (
                      <div className="col-span-2 py-12 text-center text-muted-foreground">
                        No recipes found matching your criteria.
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
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

            
          </div><Card className="p-4 border-primary/10 bg-primary/5 text-center">
              <p className="text-xs text-muted-foreground local-inter leading-relaxed">
                All styles are <span className="font-bold text-primary italic">accent-aware</span>. 
                Change the site theme to see how these buttons adapt automatically.
              </p>
            </Card>
        </div>
      </div>
    </div>
  );
}