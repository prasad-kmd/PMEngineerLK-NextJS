import type { Metadata } from "next";
import {
  Github,
  Star,
  GitFork,
  ExternalLink,
  Code,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SafeLink } from "@/components/ui/safe-link";

const title = "Open Source Projects";
const description =
  "Showcasing my contributions to the open-source community, including README previews and live project documentation.";

export const metadata: Metadata = {
  title,
  description,
};

const repos = [
  {
    name: "Engineering-Toolbox",
    description:
      "A comprehensive suite of web-based engineering calculators and simulators for mechatronics students.",
    stars: 12,
    forks: 4,
    language: "TypeScript",
    url: "https://github.com/PrasadM/engineering-toolbox",
  },
  {
    name: "PID-Simulator",
    description:
      "Interactive real-time PID controller simulator with visual feedback and tuning guides.",
    stars: 8,
    forks: 2,
    language: "JavaScript",
    url: "https://github.com/PrasadM/pid-simulator",
  },
  {
    name: "Resistor-Solver-API",
    description:
      "Lightweight API for calculating resistor color codes and series/parallel combinations.",
    stars: 5,
    forks: 1,
    language: "Go",
    url: "https://github.com/PrasadM/resistor-solver-api",
  },
];

export default function OpenSourcePage() {
  return (
    <div className="min-h-screen px-6 py-12 lg:px-8 img_grad_pm">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold mozilla-headline flex items-center gap-3">
            <Github className="h-10 w-10" />
            Open Source
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            I believe in sharing knowledge and building tools that help the
            community. Explore my GitHub repositories, contribute to ongoing
            projects, or fork them for your own needs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <Card
              key={repo.name}
              className="flex flex-col border-border bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Code className="h-5 w-5 text-primary" />
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" /> {repo.forks}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-xl google-sans">
                  {repo.name}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {repo.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-xs font-medium text-muted-foreground">
                    {repo.language}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  variant="outline"
                  className="w-full gap-2 group"
                  asChild
                >
                  <SafeLink href={repo.url}>
                    View Repository
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </SafeLink>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-dashed border-border p-12 text-center bg-muted/20">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-30" />
          <h3 className="text-xl font-bold mb-2">Want to contribute?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            I'm always looking for collaborators on my mechatronics and software
            projects. Check out the contribution guides in each repository.
          </p>
          <Button variant="default" asChild>
            <SafeLink href="https://github.com/PrasadM">
              Follow me on GitHub
            </SafeLink>
          </Button>
        </div>
      </div>
    </div>
  );
}
