import { Container } from "@/components/container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";

export default function AdminToolsPage() {
  const tools = [
    {
      title: "OG Image Generator",
      description: "Generate custom Open Graph images with a rich customization UI.",
      href: "/admin-tools/og-image",
      icon: <ImageIcon className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <Container className="py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Admin Tools", href: "/admin-tools", active: true },
        ]}
      />

      <div className="mt-8 space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Admin Tools</h1>
          <p className="mt-2 text-muted-foreground">
            A suite of tools for managing and enhancing the blogfolio.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Card key={tool.href} className="group hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="mb-4">{tool.icon}</div>
                <CardTitle>{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link href={tool.href}>
                    Open Tool
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
