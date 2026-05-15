import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Scale, ArrowLeft, FileText, UserCog, Globe, ShieldCheck, BarChart2, KeyRound } from "lucide-react";
import { AIContentIndicator } from "@/components/ai-content-indicator";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and conditions for the engineering documentation platform.",
};

const sections = [
  {
    id: "acknowledgment",
    icon: Scale,
    title: "Acknowledgment",
    content: (
      <>
        <p>
          These Terms and Conditions govern the use of this service and set out
          the agreement between you and <strong>Prasad Madhuranga</strong> (the
          operator of <em>prasadm.vercel.app</em>). By accessing or using the
          service in any way — including browsing content, creating an account,
          or using any interactive tool — you agree to be bound by these Terms.
        </p>
        <p>
          If you do not agree with any part of these Terms, you must discontinue
          use of the service immediately.
        </p>
      </>
    ),
  },
  {
    id: "accounts",
    icon: KeyRound,
    title: "User Accounts & OAuth Authentication",
    content: (
      <>
        <p>
          The service offers optional account registration via OAuth 2.0
          providers (<strong>Google</strong> and <strong>GitHub</strong>). By
          signing in you:
        </p>
        <ul>
          <li>
            Authorise us to receive your public profile information (name,
            email, and avatar) from the chosen provider.
          </li>
          <li>
            Agree that your email address will be used as a unique account
            identifier and may be used to contact you about significant service
            changes.
          </li>
          <li>
            Acknowledge that your bookmarks and theme preference stored locally
            may be synced to our database upon sign-in.
          </li>
        </ul>
        <p>
          You are responsible for maintaining the security of your OAuth
          provider credentials. We are not liable for any loss resulting from
          unauthorised access to your third-party account.
        </p>
        <p>
          Accounts are assigned a default role of{" "}
          <code className="text-xs bg-muted px-1.5 py-0.5 rounded">user</code>.
          Admin roles are granted exclusively by the site operator. Any attempt
          to escalate privileges without authorisation is prohibited and may
          result in account termination.
        </p>
      </>
    ),
  },
  {
    id: "analytics",
    icon: BarChart2,
    title: "Analytics & Tracking",
    content: (
      <>
        <p>
          The service uses <strong>PostHog</strong> to collect anonymised
          behavioural analytics (page views, feature interactions). By using the
          service you acknowledge this collection. No personally identifiable
          information is included in analytics events and your data is never
          sold or shared with advertising networks.
        </p>
        <p>
          Cloudflare <strong>Turnstile</strong> CAPTCHA is used on interactive
          forms to distinguish humans from bots. Turnstile does not use cookies
          or fingerprint your browsing history.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    icon: FileText,
    title: "Intellectual Property",
    content: (
      <>
        <p>
          Original written content (blog posts, articles, tutorials, wiki
          entries, and project write-ups) published on this platform is the
          intellectual property of the respective author(s) and is licensed
          under the terms stated on each piece of content. Where no explicit
          licence is stated, all rights are reserved.
        </p>
        <p>
          The site's source code is released under the{" "}
          <strong>GNU Affero General Public License v3</strong> (AGPL-3.0).
          Refer to the{" "}
          <a
            href="https://github.com/prasad-kmd/PMEngineerLK-NextJS/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            LICENSE file
          </a>{" "}
          for details.
        </p>
        <p>
          Content sourced from <strong>Notion</strong> via the Notion API is
          displayed under the applicable content rights of its authors. Third-party
          logos, trademarks, and brand assets referenced on this platform remain
          the property of their respective owners.
        </p>
        <p>
          Our name, logo, and trade dress may not be used in connection with any
          product or service without the prior written consent of the operator.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    icon: ShieldCheck,
    title: "Acceptable Use",
    content: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>
            Use the service to transmit harmful, offensive, or illegal content.
          </li>
          <li>
            Attempt to gain unauthorised access to any part of the service,
            including admin-protected routes, other users' accounts, or the
            underlying infrastructure.
          </li>
          <li>
            Scrape, crawl, or automate requests in a way that places
            unreasonable load on our servers or exceeds Notion API rate limits.
          </li>
          <li>
            Reverse-engineer or misuse the API endpoints exposed by this service.
          </li>
          <li>
            Impersonate another person or entity, or misrepresent your
            affiliation with any entity.
          </li>
        </ul>
        <p>
          Violation of these policies may result in immediate termination of
          your account and/or access to the service.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    icon: Globe,
    title: "Third-Party Services",
    content: (
      <>
        <p>
          The service integrates with the following third-party services, each
          governed by their own terms and privacy policies:
        </p>
        <ul>
          <li>
            <strong>Notion</strong> — Content management & CMS
          </li>
          <li>
            <strong>Supabase</strong> — Database & backend infrastructure
          </li>
          <li>
            <strong>Better Auth</strong> — Authentication middleware
          </li>
          <li>
            <strong>Google OAuth & GitHub OAuth</strong> — Identity providers
          </li>
          <li>
            <strong>PostHog</strong> — Product analytics
          </li>
          <li>
            <strong>Cloudflare Turnstile</strong> — Bot protection / CAPTCHA
          </li>
          <li>
            <strong>Vercel</strong> — Hosting & edge delivery
          </li>
          <li>
            <strong>Telegram Bot API</strong> — Contact form relay
          </li>
        </ul>
        <p>
          We are not responsible for the availability, accuracy, or privacy
          practices of these third-party services. Links to external websites on
          this platform are provided for convenience and do not constitute
          endorsement.
        </p>
      </>
    ),
  },
  {
    id: "user-content",
    icon: UserCog,
    title: "User-Generated & Submitted Content",
    content: (
      <>
        <p>
          If you submit content (e.g. contact form messages), you grant us a
          non-exclusive, royalty-free licence to use that content solely for
          the purpose of responding to your inquiry. We do not publish or
          redistribute user-submitted content.
        </p>
        <p>
          By submitting a message via the contact form you acknowledge it will
          be forwarded to a private Telegram group operated by the site owner.
        </p>
      </>
    ),
  },
  {
    id: "limitation",
    icon: Scale,
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, in no event shall
          the operator or its suppliers be liable for any special, incidental,
          indirect, or consequential damages whatsoever — including, but not
          limited to, damages for loss of profits, loss of data, business
          interruption, or personal injury — arising out of or in any way
          related to the use of or inability to use the service.
        </p>
        <p>
          The service is provided on an <strong>"AS IS"</strong> and{" "}
          <strong>"AS AVAILABLE"</strong> basis without warranties of any kind,
          either express or implied.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    icon: Scale,
    title: "Governing Law",
    content: (
      <>
        <p>
          These Terms are governed by and construed in accordance with the laws
          of <strong>Sri Lanka</strong>, without regard to its conflict-of-law
          provisions. Disputes shall be subject to the exclusive jurisdiction of
          the courts of Sri Lanka.
        </p>
        <p>
          Your use of the service may also be subject to local, state, national,
          or international laws applicable in your jurisdiction.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    icon: FileText,
    title: "Changes to These Terms",
    content: (
      <>
        <p>
          We reserve the right to modify or replace these Terms at any time. If
          a revision is material — such as changes affecting data collection,
          account rights, or liability — we will make reasonable efforts to
          provide at least <strong>30 days' notice</strong> before the new terms
          take effect, either via a site notice or by email where we hold your
          contact details.
        </p>
        <p>
          Continued use of the service after changes become effective constitutes
          your acceptance of the revised Terms.
        </p>
      </>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative border-b border-border h-[40vh] min-h-[300px]">
        <Image
          src="/img/page/ideas.webp"
          alt="Terms and Conditions"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl amoriaregular">
              Terms and Conditions
            </h1>
            <p className="mt-4 text-lg text-gray-200">
              The rules, guidelines, and agreements for using our platform.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <Link
          href="/pages"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Link>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <p className="text-sm m-0 italic text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <Scale className="h-6 w-6 text-blue-500" />
          </div>

          {/* Sections */}
        {sections.map(({ id, icon: Icon, title, content }) => (
          <section
            key={id}
            id={id}
            className="rounded-2xl border border-border bg-card p-6 space-y-4"
          >
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Icon className="size-5 text-primary shrink-0" />
              {title}
            </h2>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-1 [&_ul]:pl-2">
              {content}
            </div>
          </section>
        ))}
        </div>
      </div>
      <AIContentIndicator />
    </div>
  );
}
