"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, BookOpen, Bot, FileWarning, FlaskConical, Globe, Wrench } from "lucide-react";

import { LegalLayout } from "@/components/legal/legal-layout";

const sections = [
  {
    id: "general",
    icon: AlertTriangle,
    title: "General Information",
    content: (
      <>
        <p>
          The information provided on this engineering documentation and blogfolio
          platform is for <strong>general informational and educational purposes
          only</strong>. All information is provided in good faith; however, we
          make no representation or warranty of any kind — express or implied —
          regarding the accuracy, adequacy, validity, reliability, availability,
          or completeness of any information on the site.
        </p>
        <p>
          <strong>
            UNDER NO CIRCUMSTANCE SHALL WE BE LIABLE FOR ANY LOSS OR DAMAGE OF
            ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON
            ANY INFORMATION PROVIDED.
          </strong>
        </p>
      </>
    ),
  },
  {
    id: "ai-content",
    icon: Bot,
    title: "AI-Generated & AI-Assisted Content",
    content: (
      <>
        <p>
          Some content on this platform is written with the assistance of
          AI tools (large language models). Pages or sections containing
          AI-assisted content are marked with an{" "}
          <strong>AI Content Indicator</strong> badge.
        </p>
        <p>
          AI-generated content may contain inaccuracies, hallucinated facts, or
          outdated information. We review AI-assisted drafts before publishing
          but cannot guarantee their absolute accuracy. You should independently
          verify any technical claims before acting on them.
        </p>
        <p>
          The presence of an AI indicator does not diminish the educational value
          of the content; it is provided in the spirit of transparency.
        </p>
      </>
    ),
  },
  {
    id: "notion-content",
    icon: BookOpen,
    title: "Notion CMS — Content Accuracy",
    content: (
      <>
        <p>
          Blog posts, tutorials, wiki entries, cheat sheets, and articles are
          managed in <strong>Notion</strong> and fetched via the Notion API at
          build or request time. Because content is authored and updated
          externally, there may be a propagation delay between an edit in Notion
          and its appearance on the live site.
        </p>
        <p>
          We do not guarantee that Notion-sourced content is current, error-free,
          or complete at any given moment. If you notice stale or incorrect
          content, please{" "}
          <Link href="/contact" className="text-primary underline">
            let us know
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "professional",
    icon: FileWarning,
    title: "Professional Disclaimer",
    content: (
      <>
        <p>
          This site does <strong>not</strong> provide licensed engineering,
          legal, medical, financial, or any other form of regulated professional
          advice. All technical content is shared for educational purposes only
          and is not a substitute for consultation with a qualified professional.
        </p>
        <p>
          <strong>
            THE USE OR RELIANCE ON ANY INFORMATION CONTAINED ON THIS SITE IS
            SOLELY AT YOUR OWN RISK.
          </strong>
        </p>
      </>
    ),
  },
  {
    id: "tools",
    icon: Wrench,
    title: "Engineering Workspace & Admin Tools",
    content: (
      <>
        <p>
          The <strong>Engineering Workspace</strong> and admin tools available
          on this platform (including but not limited to invoice generators, OG
          image generators, and monitoring dashboards) are provided as utilities
          for demonstration and personal use. These tools are offered "as-is"
          without any guarantee of fitness for a particular purpose.
        </p>
        <p>
          Output produced by these tools — such as PDF invoices or generated
          images — should be reviewed before use in any official or commercial
          context. We accept no liability for errors in tool output.
        </p>
      </>
    ),
  },
  {
    id: "entertainment",
    icon: FlaskConical,
    title: "Third-Party Entertainment & Media APIs",
    content: (
      <>
        <p>
          Certain sections of the platform may surface data from third-party
          media APIs (such as <strong>OMDB</strong>, <strong>TMDB</strong>, or{" "}
          <strong>YTS</strong>). This data is sourced externally and may be
          incomplete, inaccurate, or unavailable at times due to API rate limits
          or service outages.
        </p>
        <p>
          We do not host, distribute, or endorse any copyrighted media files.
          Any media information displayed is fetched from publicly available APIs
          and is subject to those APIs' respective terms of service.
        </p>
      </>
    ),
  },
  {
    id: "external-links",
    icon: Globe,
    title: "External Links Disclaimer",
    content: (
      <>
        <p>
          The site may contain links to external websites or content originating
          from third parties. Such links are not investigated, monitored, or
          checked for accuracy, adequacy, validity, reliability, availability, or
          completeness by us.
        </p>
        <p>
          We do not warrant, endorse, guarantee, or assume responsibility for the
          accuracy or reliability of any information offered by third-party
          websites linked through this site. Inclusion of a link does not imply
          endorsement of that website.
        </p>
      </>
    ),
  },
  {
    id: "errors",
    icon: AlertTriangle,
    title: "Errors and Omissions Disclaimer",
    content: (
      <>
        <p>
          While we make every attempt to ensure that the information on this
          site has been obtained from reliable sources, we are not responsible
          for any errors or omissions, or for the results obtained from the use
          of this information. All information is provided without any express or
          implied warranty of completeness, accuracy, timeliness, or of the
          results obtained from its use.
        </p>
        <p>
          Technical articles and tutorials reflect the knowledge and tooling
          available at the time of writing. Software ecosystems evolve rapidly;
          code examples, API usages, or configuration snippets may become
          outdated. Always check the official documentation of the relevant
          technology.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    icon: FileWarning,
    title: "Changes to This Disclaimer",
    content: (
      <p>
        We reserve the right to update this disclaimer at any time. The "Last
        updated" date at the top of this page reflects the most recent revision.
        Continued use of the site after changes are posted constitutes your
        acceptance of the updated disclaimer.
      </p>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <LegalLayout
      title="Disclaimer"
      subtitle="Legal information and limitations regarding our content."
      lastUpdated="12 May 2024"
      imageSrc="/img/page/diary.webp"
      breadcrumbs={[
        { label: "Directory", href: "/pages" },
        { label: "Disclaimer", href: "/disclaimer", active: true },
      ]}
      sections={sections}
    >
      <section className="rounded-3xl border border-border bg-card/50 p-8 backdrop-blur-sm shadow-sm transition-all hover:border-primary/30">
        <h2 className="mb-4 text-xl font-bold google-sans">Found an inaccuracy?</h2>
        <p className="text-muted-foreground leading-relaxed">
          Please report it via the{" "}
          <Link href="/contact" className="text-primary underline">
            contact page
          </Link>
          . We take content quality seriously and will correct errors promptly.
        </p>
      </section>
    </LegalLayout>
  );
}
