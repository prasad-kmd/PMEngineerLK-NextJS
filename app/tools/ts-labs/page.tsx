import type { Metadata } from "next";
import Link from "next/link";
import {
  FlaskConical,
  ArrowRight,
  MousePointer2,
  Construction,
  Layout,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Tailwind Labs | PrasadM Blogfolio",
  description:
    "Interactive Tailwind CSS labs for building accent-aware UI patterns quickly.",
};

const labs = [
  {
    name: "Button LAB",
    slug: "button-lab",
    description:
      "Create, modify, and design accent-aware buttons using Tailwind CSS. Includes library and recipes.",
    icon: MousePointer2,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export default function TailwindLabsPage() {
  return (
    <div className="min-h-screen px-6 py-12 lg:px-8 img_grad_pm">
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "Tools", href: "/tools" },
            {
              label: "Tailwind Labs",
              href: "/tools/ts-labs",
              active: true,
            },
          ]}
          className="mb-8"
        />

        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold mozilla-headline tracking-tight flex items-center gap-3">
            <FlaskConical className="h-10 w-10 text-primary" />
            Tailwind Labs
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed roboto">
            Interactive Tailwind CSS utilities and labs designed for building
            high-fidelity, accent-aware UI patterns quickly.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {labs.map((lab) => (
            <Link
              key={lab.slug}
              href={`/tools/ts-labs/${lab.slug}`}
              className="group block rounded-2xl border border-border bg-card/50 p-6 transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:bg-card"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`rounded-xl ${lab.bgColor} p-4 ${lab.color} shrink-0`}
                >
                  <lab.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold group-hover:text-primary transition-colors google-sans">
                      {lab.name}
                    </h2>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed local-inter">
                    {lab.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}

          {/* Coming Soon Card */}
          <Card className="flex flex-col items-center justify-center border-dashed border-2 border-border/50 bg-muted/20 p-8 text-center backdrop-blur-sm">
            <Construction className="h-10 w-10 text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground google-sans">
              More Labs Coming
            </h3>
            <p className="text-xs text-muted-foreground/60 mt-1 local-inter">
              We are cooking more interactive utilities for layouts, typography,
              and complex components.
            </p>
          </Card>
        </div>

        <div className="mt-24 rounded-3xl border border-primary/10 bg-primary/5 p-8 text-center backdrop-blur-sm">
          <Layout className="mx-auto h-10 w-10 text-primary mb-4" />
          <h2 className="text-2xl font-bold mozilla-headline mb-2">
            Why Tailwind Labs?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-sm font-local-inter">
            Building modern web interfaces requires rapid prototyping and
            consistent design tokens. Tailwind Labs provides a sandbox to
            experiment with UI patterns that automatically inherit your
            project's accent theme, ensuring seamless integration.
          </p>
        </div>
      </div>
    </div>
  );
}
