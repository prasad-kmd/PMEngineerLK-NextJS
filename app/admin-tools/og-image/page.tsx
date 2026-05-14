"use client";

import { useState } from "react";
import { Container } from "@/components/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, Copy, Check, Wand2 } from "lucide-react";
import { siteConfig } from "@/lib/config";

const ACCENTS = [
  { name: "Blue", value: "blue" },
  { name: "Emerald", value: "emerald" },
  { name: "Violet", value: "violet" },
  { name: "Amber", value: "amber" },
  { name: "Rose", value: "rose" },
  { name: "Indigo", value: "indigo" },
  { name: "Cyan", value: "cyan" },
];

export default function OgImageGeneratorPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Technical Insight",
    tags: "",
    siteName: siteConfig.title.split(" | ")[0],
    siteUrl: siteConfig.url.replace(/^https?:\/\//, "").replace(/\/$/, ""),
    author: siteConfig.author,
    accent: "indigo",
    icon: "https://prasadm.vercel.app/img/prasadm-title-img-512.png",
    image: "",
  });

  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = "Title is required";

    const isValidUrl = (url: string) => {
      if (!url) return true;
      if (url.startsWith("/")) return true;
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    if (!isValidUrl(formData.icon)) newErrors.icon = "Invalid icon URL";
    if (formData.image && !isValidUrl(formData.image)) newErrors.image = "Invalid image URL";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateUrl = () => {
    const params = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return `/api/og-custom?${params.toString()}`;
  };

  const handleGenerate = () => {
    if (validate()) {
      window.open(generateUrl(), "_blank");
    }
  };

  const handleCopy = () => {
    if (validate()) {
      const fullUrl = new URL(generateUrl(), window.location.origin).toString();
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  return (
    <Container className="py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Admin Tools", href: "/admin-tools" },
          { label: "OG Image Generator", href: "/admin-tools/og-image", active: true },
        ]}
      />

      <div className="mt-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">OG Image Generator</h1>
          <p className="mt-2 text-muted-foreground">
            Configure and generate custom Open Graph images. Generation occurs only when you click "Generate".
          </p>
        </div>

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <CardDescription>
                Fill in the details below to customize your OG image.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter the main title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief summary of the content"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g. Tutorial, Research"
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accent">Accent Color</Label>
                  <Select
                    value={formData.accent}
                    onValueChange={(value) => handleChange("accent", value)}
                  >
                    <SelectTrigger id="accent">
                      <SelectValue placeholder="Select accent color" />
                    </SelectTrigger>
                    <SelectContent>
                      {ACCENTS.map((accent) => (
                        <SelectItem key={accent.value} value={accent.value}>
                          {accent.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    placeholder="engineering, typescript, nextjs"
                    value={formData.tags}
                    onChange={(e) => handleChange("tags", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleChange("author", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={formData.siteName}
                    onChange={(e) => handleChange("siteName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Display URL</Label>
                  <Input
                    id="siteUrl"
                    value={formData.siteUrl}
                    onChange={(e) => handleChange("siteUrl", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon">Website Icon URL</Label>
                  <Input
                    id="icon"
                    placeholder="/favicon.ico"
                    value={formData.icon}
                    onChange={(e) => handleChange("icon", e.target.value)}
                    className={errors.icon ? "border-destructive" : ""}
                  />
                  {errors.icon && <p className="text-xs text-destructive">{errors.icon}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Custom Image URL (Optional)</Label>
                  <Input
                    id="image"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={(e) => handleChange("image", e.target.value)}
                    className={errors.image ? "border-destructive" : ""}
                  />
                  {errors.image && <p className="text-xs text-destructive">{errors.image}</p>}
                  <p className="text-[10px] text-muted-foreground italic">
                    Ensure hostname is in the allowlist.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4 border-t pt-6">
              <Button onClick={handleGenerate} className="w-full sm:flex-1">
                <Wand2 className="mr-2 w-4 h-4" />
                Generate Image
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={handleCopy} className="w-full sm:w-auto">
                {copied ? (
                  <>
                    <Check className="mr-2 w-4 h-4 text-emerald-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 w-4 h-4" />
                    Copy URL
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <div className="bg-muted/30 border rounded-lg p-4 text-sm text-muted-foreground">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Usage Note
            </h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Title and description are automatically truncated in the generated image.</li>
              <li>Only HTTPS absolute URLs or relative root-level paths are allowed for images.</li>
              <li>Remote images must come from allowlisted hostnames (e.g., Unsplash, Cloudinary).</li>
              <li>Total image size should be under 4MB for successful processing.</li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
