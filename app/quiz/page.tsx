import { getContentByType } from "@/lib/content";
import { QuizList } from "@/components/quiz-library/quiz-list";
import { Breadcrumbs } from "@/components/breadcrumbs";
import type { Metadata } from "next";

const title = "Quiz Library";
const description =
  "Challenge your engineering knowledge with our interactive quizzes.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/quiz",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(title)}`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`/api/og?title=${encodeURIComponent(title)}`],
  },
};

export default async function QuizListPage() {
  const quizzes = await getContentByType("quizzes");

  return (
    <div className="min-h-screen px-6 py-12 lg:px-8 bg-background">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs
          items={[{ label: "Quizzes", href: "/quiz", active: true }]}
          className="mb-8"
        />
        <header className="mb-12">
          <h1 className="mb-4 text-4xl font-bold mozilla-headline lg:text-5xl">
            Quiz Library
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl google-sans">
            Challenge your engineering knowledge with our interactive quizzes.
            Track your progress and master new concepts.
          </p>
        </header>

        <QuizList quizzes={quizzes} />
      </div>
    </div>
  );
}
