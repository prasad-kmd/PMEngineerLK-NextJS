import { notFound } from "next/navigation";
import { getContentByType, getContentItem } from "@/lib/content";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContentRenderer } from "@/components/content-renderer";
import { ScrollProgress } from "@/components/scroll-progress";
import { Badge } from "@/components/ui/badge";
import { AIContentIndicator } from "@/components/ai-content-indicator";

export async function generateStaticParams() {
  const quizzes = await getContentByType("quizzes");
  return quizzes.map((quiz) => ({
    slug: quiz.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quiz = await getContentItem("quizzes", slug);

  if (!quiz) {
    return {};
  }

  return {
    title: quiz.title,
    description: quiz.description,
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quiz = await getContentItem("quizzes", slug);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="min-h-screen px-6 py-12 lg:px-8 bg-background">
      <ScrollProgress />
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "Quizzes", href: "/quiz" },
            { label: quiz.title, href: `/quiz/${quiz.slug}`, active: true },
          ]}
          className="mb-8"
        />

        <article className="min-w-0">
          <header className="mb-8 border-b border-border pb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {quiz.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-[10px] uppercase tracking-wider px-2"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="mb-4 text-4xl font-bold text-balance lg:text-5xl font-google-sans">
              {quiz.title}
            </h1>
            <p className="text-xl text-muted-foreground font-google-sans mb-4">
              {quiz.description}
            </p>
          </header>

          <ContentRenderer content={quiz.content} id={quiz.slug} />
        </article>
      </div>
      {quiz.aiAssisted && <AIContentIndicator />}
    </div>
  );
}
