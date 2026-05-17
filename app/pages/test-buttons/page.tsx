"use client";

import * as React from "react";
import { AccentPicker } from "@/components/accent-picker";
import {
  Button,
  buttonVariants,
  type ButtonProps,
} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/breadcrumbs";


import {
  ArrowRight,
  Check,
  Copy,
  Loader2,
  RefreshCcw,
  Sparkles,
} from "lucide-react";

type BuiltInVariant = NonNullable<ButtonProps["variant"]>;
type BuiltInSize = NonNullable<ButtonProps["size"]>;

type Surface = "background" | "muted" | "card" | "invert";

type Recipe = {
  id: string;
  name: string;
  description: string;
  classes: string;
  suggestedSize?: BuiltInSize;
  suggestedVariant?: BuiltInVariant; // the base CVA variant we layer on top of
  iconOnly?: boolean;
  needsKeyframes?: boolean;
};

const BUILTIN_VARIANTS: BuiltInVariant[] = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "link",
  "destructive",
];

const BUILTIN_SIZES: BuiltInSize[] = ["default", "sm", "lg", "icon"];

const SURFACES: { id: Surface; name: string; wrapperClass: string }[] = [
  {
    id: "background",
    name: "Background",
    wrapperClass: "bg-background text-foreground border border-border",
  },
  {
    id: "muted",
    name: "Muted",
    wrapperClass: "bg-muted text-foreground border border-border",
  },
  {
    id: "card",
    name: "Card",
    wrapperClass: "bg-card text-card-foreground border border-border",
  },
  {
    id: "invert",
    name: "Inverted",
    wrapperClass: "bg-foreground text-background border border-border/20",
  },
];

// Tailwind “recipes” (accent-aware via bg-primary/text-primary/ring-primary, etc.)
const RECIPES: Recipe[] = [
  {
    id: "accentSolid",
    name: "Accent Solid",
    description: "Clean modern primary CTA.",
    classes:
      "bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/25 active:shadow-primary/15",
    suggestedVariant: "default",
  },
  {
    id: "accentSoft",
    name: "Accent Soft",
    description: "Tinted fill, low-ink secondary emphasis.",
    classes:
      "bg-primary/12 text-primary border border-primary/20 hover:bg-primary/16 hover:border-primary/28 active:bg-primary/20",
    suggestedVariant: "default",
  },
  {
    id: "accentOutline",
    name: "Accent Outline",
    description: "Crisp outline that still tracks accent.",
    classes:
      "bg-transparent text-primary border border-primary/35 hover:bg-primary/10 hover:border-primary/45 active:bg-primary/14",
    suggestedVariant: "default",
  },
  {
    id: "accentGhost",
    name: "Accent Ghost",
    description: "No border; hover tint only.",
    classes:
      "bg-transparent text-foreground hover:bg-primary/10 hover:text-primary active:bg-primary/15",
    suggestedVariant: "ghost",
  },
  {
    id: "accentLink",
    name: "Accent Link",
    description: "Inline action style (but still a Button).",
    classes:
      "bg-transparent text-primary px-0 h-auto py-1 hover:underline underline-offset-4 decoration-primary/60",
    suggestedVariant: "link",
    suggestedSize: "sm",
  },

  {
    id: "ctaGlow",
    name: "CTA Glow",
    description: "Hero CTA with accent halo shadow.",
    classes:
      "bg-primary text-primary-foreground shadow-[0_10px_30px_-10px_hsl(var(--primary-h)_var(--primary-s)_var(--primary-l)/0.55)] hover:shadow-[0_14px_38px_-14px_hsl(var(--primary-h)_var(--primary-s)_var(--primary-l)/0.70)]",
    suggestedVariant: "default",
  },
  {
    id: "ctaGradient",
    name: "CTA Gradient",
    description: "Accent gradient (no hard-coded colors).",
    classes:
      "text-primary-foreground bg-gradient-to-b from-primary to-primary/75 shadow-sm shadow-primary/25 hover:from-primary/95 hover:to-primary/65",
    suggestedVariant: "default",
  },
  {
    id: "ctaGlass",
    name: "CTA Glass",
    description: "Glassmorphism + accent edge for floating UIs.",
    classes:
      "bg-background/50 text-foreground backdrop-blur-md border border-primary/25 shadow-lg shadow-black/5 dark:shadow-black/30 hover:bg-background/60 hover:border-primary/35",
    suggestedVariant: "default",
  },
  {
    id: "ctaBorderGlow",
    name: "CTA Border Glow",
    description: "Neutral fill with glowing outline.",
    classes:
      "bg-background text-foreground border border-primary/35 shadow-[0_0_0_1px_hsl(var(--primary-h)_var(--primary-s)_var(--primary-l)/0.25)] hover:shadow-[0_0_0_3px_hsl(var(--primary-h)_var(--primary-s)_var(--primary-l)/0.22)]",
    suggestedVariant: "default",
  },

  {
    id: "press3D",
    name: "Press 3D",
    description: "Tactile raised button with press-down motion.",
    classes:
      "bg-primary text-primary-foreground shadow-[0_6px_0_0_hsl(var(--primary-h)_var(--primary-s)_calc(var(--primary-l)-10%))] hover:brightness-[1.02] active:translate-y-[2px] active:shadow-none",
    suggestedVariant: "default",
  },
  {
    id: "tiltSheen",
    name: "Tilt Sheen",
    description: "Hover sheen / reflective swipe.",
    classes:
      "relative overflow-hidden bg-primary text-primary-foreground before:absolute before:inset-0 before:translate-x-[-120%] before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.22),transparent)] before:transition-transform before:duration-500 hover:before:translate-x-[120%]",
    suggestedVariant: "default",
  },
  {
    id: "pixelCut",
    name: "Pixel Cut",
    description: "Hard cut-corner for a technical aesthetic.",
    classes:
      "bg-primary text-primary-foreground [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))] hover:bg-primary/92",
    suggestedVariant: "default",
  },
  {
    id: "dashedTech",
    name: "Dashed Tech",
    description: "Dashed border for integrations/import actions.",
    classes:
      "bg-transparent text-primary border border-dashed border-primary/50 hover:bg-primary/10 hover:border-primary/70",
    suggestedVariant: "default",
  },
  {
    id: "underlineSlide",
    name: "Underline Slide",
    description: "Underline grows on hover (nav-like button).",
    classes:
      "relative bg-transparent text-foreground after:absolute after:left-3 after:right-3 after:bottom-2 after:h-px after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:text-primary hover:after:scale-x-100",
    suggestedVariant: "ghost",
  },
  {
    id: "iconHalo",
    name: "Icon Halo",
    description: "Circular icon button with accent halo.",
    classes:
      "rounded-full bg-primary/12 text-primary ring-1 ring-primary/20 hover:bg-primary/16 hover:ring-primary/30 active:bg-primary/22",
    suggestedVariant: "ghost",
    suggestedSize: "icon",
    iconOnly: true,
  },

  {
    id: "dangerSolid",
    name: "Danger Solid",
    description: "Destructive with consistent depth.",
    classes:
      "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive/30",
    suggestedVariant: "destructive",
  },
  {
    id: "dangerOutline",
    name: "Danger Outline",
    description: "Outline destructive.",
    classes:
      "bg-transparent text-destructive border border-destructive/40 hover:bg-destructive/10 hover:border-destructive/55",
    suggestedVariant: "outline",
  },

  {
    id: "loadingShimmer",
    name: "Loading Shimmer",
    description: "Animated shimmer (good for loading states).",
    classes:
      "relative overflow-hidden bg-primary text-primary-foreground before:absolute before:inset-0 before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] before:translate-x-[-120%] motion-safe:before:animate-[btnShimmer_1.2s_linear_infinite]",
    suggestedVariant: "default",
    needsKeyframes: true,
  },
  {
    id: "kbd",
    name: "KBD Key",
    description: "Keyboard-like keycap button.",
    classes:
      "bg-muted text-foreground border border-border shadow-[0_2px_0_0_rgba(0,0,0,0.12)] hover:bg-muted/80 active:translate-y-[1px] active:shadow-none",
    suggestedVariant: "secondary",
  },
  {
    id: "chip",
    name: "Chip Pill",
    description: "Pill chip for tags/filters.",
    classes:
      "rounded-full h-8 px-3 text-xs bg-primary/12 text-primary border border-primary/20 hover:bg-primary/18",
    suggestedVariant: "default",
    suggestedSize: "sm",
  },
];

function surfaceWrapperClass(surface: Surface) {
  return (
    SURFACES.find((s) => s.id === surface)?.wrapperClass ??
    SURFACES[0]!.wrapperClass
  );
}

function safeCopy(text: string) {
  if (typeof navigator === "undefined") return;
  if (!navigator.clipboard?.writeText) return;
  void navigator.clipboard.writeText(text);
}

function RecipePicker({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (v: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a recipe..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="__custom">Custom (free edit)</SelectItem>
        {RECIPES.map((r) => (
          <SelectItem key={r.id} value={r.id}>
            {r.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function MiniSwatch() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-3 w-3 rounded-full bg-primary" />
      <span className="text-xs text-muted-foreground">accent = primary</span>
    </div>
  );
}

export default function TestButtonsPage() {
  const [selectedRecipeId, setSelectedRecipeId] =
    React.useState<string>("ctaGlow");

  const selectedRecipe = React.useMemo(() => {
    if (selectedRecipeId === "__custom") return null;
    return RECIPES.find((r) => r.id === selectedRecipeId) ?? null;
  }, [selectedRecipeId]);

  const [baseVariant, setBaseVariant] =
    React.useState<BuiltInVariant>("default");
  const [size, setSize] = React.useState<BuiltInSize>("default");
  const [surface, setSurface] = React.useState<Surface>("background");

  const [label, setLabel] = React.useState<string>("Button");
  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [asChild, setAsChild] = React.useState(false);

  const [leftIcon, setLeftIcon] = React.useState(true);
  const [rightIcon, setRightIcon] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(false);

  const [recipeClasses, setRecipeClasses] = React.useState<string>(
    RECIPES.find((r) => r.id === "ctaGlow")?.classes ?? "",
  );
  const [extraClasses, setExtraClasses] = React.useState<string>("");

  const [clicks, setClicks] = React.useState(0);

  // When picking a recipe, auto-load its classes + suggested size/variant.
  React.useEffect(() => {
    if (!selectedRecipe) return;

    setRecipeClasses(selectedRecipe.classes);
    if (selectedRecipe.suggestedVariant)
      setBaseVariant(selectedRecipe.suggestedVariant);
    if (selectedRecipe.suggestedSize) setSize(selectedRecipe.suggestedSize);
    if (selectedRecipe.iconOnly) {
      setLeftIcon(true);
      setRightIcon(false);
      setLabel("Icon");
    }
  }, [selectedRecipe]);

  const computedClassName = React.useMemo(() => {
    return cn(
      buttonVariants({ variant: baseVariant, size }),
      recipeClasses,
      extraClasses,
      fullWidth && "w-full",
    );
  }, [baseVariant, size, recipeClasses, extraClasses, fullWidth]);

  const jsxSnippet = React.useMemo(() => {
    const props: string[] = [];
    if (baseVariant !== "default") props.push(`variant="${baseVariant}"`);
    if (size !== "default") props.push(`size="${size}"`);
    if (disabled) props.push("disabled");
    if (asChild) props.push("asChild");
    if (recipeClasses.trim() || extraClasses.trim())
      props.push(`className="${cn(recipeClasses, extraClasses)}"`);

    const inner = [
      leftIcon ? '<Sparkles className="h-4 w-4" />' : null,
      loading ? '<Loader2 className="h-4 w-4 animate-spin" />' : null,
      selectedRecipe?.iconOnly ? null : label,
      rightIcon ? '<ArrowRight className="h-4 w-4" />' : null,
    ]
      .filter(Boolean)
      .join(" ");

    if (asChild) {
      return `<Button ${props.join(" ")}>\n  <a href="#">${inner}</a>\n</Button>`;
    }

    return `<Button ${props.join(" ")}>${inner}</Button>`;
  }, [
    asChild,
    baseVariant,
    size,
    disabled,
    label,
    leftIcon,
    rightIcon,
    loading,
    recipeClasses,
    extraClasses,
    selectedRecipe?.iconOnly,
  ]);

  function resetPlayground() {
    setSelectedRecipeId("ctaGlow");
    setBaseVariant("default");
    setSize("default");
    setSurface("background");
    setLabel("Button");
    setDisabled(false);
    setLoading(false);
    setAsChild(false);
    setLeftIcon(true);
    setRightIcon(false);
    setFullWidth(false);
    setExtraClasses("");
    setClicks(0);

    const r = RECIPES.find((x) => x.id === "ctaGlow");
    setRecipeClasses(r?.classes ?? "");
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-7xl mb-8">
        <Breadcrumbs
          items={[
            { label: "Directory", href: "/pages" },
            { label: "Button Lab", href: "/pages/test-buttons", active: true },
          ]}
          className="mb-0"
        />
      </div>
      {/* Local keyframes for the shimmer recipe (keeps this page self-contained). */}
      <style jsx global>{`
        @keyframes btnShimmer {
          to {
            transform: translateX(120%);
          }
        }
      `}</style>

      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">
              Button Lab (Still on Development)
            </h1>
            <p className="text-sm text-muted-foreground">
              A sandbox for creating/testing Tailwind button recipes
              (accent-aware). Use{" "}
              <code className="px-1 py-0.5 rounded bg-muted">
                /pages/test-buttons
              </code>
              .
            </p>
            <MiniSwatch />
          </div>

          <div className="flex items-center gap-3">
            {/* Accent picker exists in your repo and updates CSS vars used by Tailwind tokens. */}
            <AccentPicker side="bottom" />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[420px_1fr]">
          {/* LEFT: PLAYGROUND */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Playground</CardTitle>
              <CardDescription>
                Pick a recipe, then tweak classes and states.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Recipe</Label>
                <RecipePicker
                  value={selectedRecipeId}
                  onValueChange={(v) => setSelectedRecipeId(v)}
                />
                {selectedRecipe?.needsKeyframes ? (
                  <p className="text-xs text-muted-foreground">
                    This recipe uses shimmer keyframes (included in this page
                    via global style).
                  </p>
                ) : null}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Base variant</Label>
                  <Select
                    value={baseVariant}
                    onValueChange={(v) => setBaseVariant(v as BuiltInVariant)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {BUILTIN_VARIANTS.map((v) => (
                        <SelectItem key={v} value={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Size</Label>
                  <Select
                    value={size}
                    onValueChange={(v) => setSize(v as BuiltInSize)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {BUILTIN_SIZES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Surface</Label>
                <Select
                  value={surface}
                  onValueChange={(v) => setSurface(v as Surface)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SURFACES.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Label</Label>
                  <Input
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Extra classes</Label>
                  <Input
                    value={extraClasses}
                    onChange={(e) => setExtraClasses(e.target.value)}
                    placeholder="e.g. rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Recipe classes (edit freely)</Label>
                <Textarea
                  value={recipeClasses}
                  onChange={(e) => setRecipeClasses(e.target.value)}
                  rows={6}
                  className="font-mono text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <Label className="text-sm">Disabled</Label>
                  <Switch checked={disabled} onCheckedChange={setDisabled} />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <Label className="text-sm">Loading</Label>
                  <Switch checked={loading} onCheckedChange={setLoading} />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <Label className="text-sm">As child (&lt;a&gt;)</Label>
                  <Switch checked={asChild} onCheckedChange={setAsChild} />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <Label className="text-sm">Full width</Label>
                  <Switch checked={fullWidth} onCheckedChange={setFullWidth} />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <Label className="text-sm">Left icon</Label>
                  <Switch checked={leftIcon} onCheckedChange={setLeftIcon} />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <Label className="text-sm">Right icon</Label>
                  <Switch checked={rightIcon} onCheckedChange={setRightIcon} />
                </div>
              </div>

              <div
                className={cn("rounded-xl p-4", surfaceWrapperClass(surface))}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-xs font-medium opacity-80">Preview</div>
                  <div className="text-xs text-muted-foreground">
                    Clicks: {clicks}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant={baseVariant}
                    size={size}
                    className={cn(
                      recipeClasses,
                      extraClasses,
                      fullWidth && "w-full",
                    )}
                    disabled={disabled || loading}
                    asChild={asChild}
                    onClick={() => setClicks((c) => c + 1)}
                  >
                    {asChild ? (
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        {leftIcon ? <Sparkles /> : null}
                        {loading ? <Loader2 className="animate-spin" /> : null}
                        {selectedRecipe?.iconOnly ? null : label}
                        {rightIcon ? <ArrowRight /> : null}
                      </a>
                    ) : (
                      <>
                        {leftIcon ? <Sparkles /> : null}
                        {loading ? <Loader2 className="animate-spin" /> : null}
                        {selectedRecipe?.iconOnly ? null : label}
                        {rightIcon ? <ArrowRight /> : null}
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setClicks(0)}
                    className="gap-2"
                    type="button"
                  >
                    <RefreshCcw />
                    Reset clicks
                  </Button>
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  Tip: press{" "}
                  <kbd className="px-1 py-0.5 rounded bg-muted text-foreground">
                    Tab
                  </kbd>{" "}
                  to check focus rings.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Computed className</Label>
                <div className="rounded-lg border bg-muted/40 p-3">
                  <pre className="whitespace-pre-wrap wrap-break-word text-xs font-mono leading-relaxed">
                    {computedClassName}
                  </pre>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    className="gap-2"
                    onClick={() => safeCopy(computedClassName)}
                    type="button"
                  >
                    <Copy />
                    Copy className
                  </Button>

                  <Button
                    variant="secondary"
                    className="gap-2"
                    onClick={() => safeCopy(jsxSnippet)}
                    type="button"
                  >
                    <Copy />
                    Copy JSX
                  </Button>

                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={resetPlayground}
                    type="button"
                  >
                    <RefreshCcw />
                    Full reset
                  </Button>
                </div>

                <div className="rounded-lg border bg-muted/40 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-xs font-medium text-muted-foreground">
                      JSX snippet
                    </div>
                    <div className="text-xs text-muted-foreground">
                      paste into your codebase
                    </div>
                  </div>
                  <pre className="whitespace-pre-wrap wrap-break-word text-xs font-mono leading-relaxed">
                    {jsxSnippet}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT: GALLERY */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Built-in Button variants</CardTitle>
                <CardDescription>
                  These come from{" "}
                  <code className="px-1 py-0.5 rounded bg-muted">
                    components/ui/button.tsx
                  </code>
                  .
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                {BUILTIN_VARIANTS.map((v) => (
                  <Button key={v} variant={v}>
                    <Check />
                    {v}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recipe Library (accent-aware)</CardTitle>
                <CardDescription>
                  Each recipe is just a Tailwind class string layered on top of
                  your Button base.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  {RECIPES.map((r) => {
                    const previewVariant = r.suggestedVariant ?? "default";
                    const previewSize = r.suggestedSize ?? "default";

                    return (
                      <div key={r.id} className="rounded-xl border p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-semibold">{r.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {r.description}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="gap-2"
                              onClick={() => {
                                setSelectedRecipeId(r.id);
                                setSurface("background");
                              }}
                              type="button"
                            >
                              Use
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="gap-2"
                              onClick={() => safeCopy(r.classes)}
                              type="button"
                            >
                              <Copy />
                            </Button>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {/* normal surface */}
                          <div className="rounded-xl border bg-background p-4">
                            <div className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                              background
                            </div>
                            <Button
                              variant={previewVariant}
                              size={r.iconOnly ? "icon" : previewSize}
                              className={cn(r.classes)}
                              type="button"
                            >
                              {r.iconOnly ? (
                                <Sparkles />
                              ) : (
                                <>
                                  <Sparkles /> {r.name}
                                </>
                              )}
                            </Button>
                          </div>

                          {/* inverted surface */}
                          <div className="rounded-xl border bg-foreground p-4 text-background">
                            <div className="mb-2 text-[10px] font-medium uppercase tracking-wider text-background/70">
                              inverted
                            </div>
                            <Button
                              variant={previewVariant}
                              size={r.iconOnly ? "icon" : previewSize}
                              className={cn(r.classes)}
                              type="button"
                            >
                              {r.iconOnly ? (
                                <Sparkles />
                              ) : (
                                <>
                                  <Sparkles /> {r.name}
                                </>
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="mt-3 rounded-lg border bg-muted/40 p-3">
                          <pre className="whitespace-pre-wrap wrap-break-word text-[11px] font-mono leading-relaxed">
                            {r.classes}
                          </pre>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Size Matrix (quick check)</CardTitle>
                <CardDescription>Same recipe across all sizes.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {["ctaGlow", "accentSoft", "press3D", "tiltSheen", "kbd"].map(
                  (id) => {
                    const r = RECIPES.find((x) => x.id === id);
                    if (!r) return null;

                    return (
                      <div key={id} className="rounded-xl border p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="font-semibold">{r.name}</div>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="gap-2"
                            onClick={() => {
                              setSelectedRecipeId(r.id);
                              setRecipeClasses(r.classes);
                            }}
                            type="button"
                          >
                            <Sparkles />
                            Load
                          </Button>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <Button
                            variant="default"
                            size="sm"
                            className={r.classes}
                          >
                            sm
                          </Button>
                          <Button
                            variant="default"
                            size="default"
                            className={r.classes}
                          >
                            default
                          </Button>
                          <Button
                            variant="default"
                            size="lg"
                            className={r.classes}
                          >
                            lg
                          </Button>
                          <Button
                            variant="default"
                            size="icon"
                            className={cn(r.classes, "rounded-full")}
                          >
                            <Sparkles />
                          </Button>
                        </div>
                      </div>
                    );
                  },
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="text-xs text-muted-foreground">
          If you want these as official variants (e.g.{" "}
          <code>variant="ctaGlow"</code>), add them into
          <code className="px-1 py-0.5 rounded bg-muted">
            components/ui/button.tsx
          </code>{" "}
          under the CVA variant map.
        </footer>
      </div>
    </div>
  );
}