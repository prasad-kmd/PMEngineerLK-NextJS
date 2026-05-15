"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowLeft,
  Shield,
  UserX,
  Laptop,
  Palette,
  Bookmark,
  Ban,
  ChevronDown,
  Check,
  X,
  Database,
  BarChart2,
  KeyRound,
  BellRing,
  Bot,
  Lock,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
// import { siteConfig } from "@/lib/config";
import { AIContentIndicator } from "@/components/ai-content-indicator";

// ---------------------------------------------------------------------------
// Storage / Data items we actually collect
// ---------------------------------------------------------------------------
const storageData = {
  theme: {
    title: "Theme Preference",
    key: "theme_mode",
    type: "Local Storage",
    purpose:
      "Remembers if you prefer Dark Mode or Light Mode so you don't have to switch it every time you visit.",
    privacy: "Safe. Stored only on your device. Not synced to our database.",
    icon: Palette,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    scope: "local",
  },
  bookmarks: {
    title: "User Bookmarks",
    key: "user_bookmarks",
    type: "Local Storage → Supabase (authenticated users)",
    purpose:
      'Stores the IDs of posts you have marked as "Saved". For signed-in users this list is synced to your account so it persists across devices.',
    privacy:
      "Guest bookmarks live only in your browser. Signed-in bookmarks are stored in your account record in our Supabase database.",
    icon: Bookmark,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    scope: "hybrid",
  },
  authSession: {
    title: "Auth Session (JWT)",
    key: "better-auth.session_token",
    type: "HTTP-Only Cookie",
    purpose:
      "Keeps you signed in after authenticating via Google or GitHub OAuth. Contains a signed JWT — no password is stored.",
    privacy:
      "HTTP-only, so it is inaccessible to JavaScript. Expires automatically. Delete by signing out.",
    icon: KeyRound,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    scope: "server",
  },
  posthog: {
    title: "PostHog Analytics",
    key: "__ph_opt_in_out_*",
    type: "Cookie + Server-side event",
    purpose:
      "Collects anonymised page-view and interaction events to help us understand how users navigate the site. No ad-targeting data is shared.",
    privacy:
      "Data is processed by PostHog (EU cloud). No personally identifiable information is included in events. You can opt out below.",
    icon: BarChart2,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    scope: "third-party",
  },
  pushNotif: {
    title: "Push Notification Subscription",
    key: "push-subscription",
    type: "Browser Push API / VAPID",
    purpose:
      "If you choose to subscribe, your browser endpoint is stored so we can send you update notifications. Opt-in only.",
    privacy:
      "Subscription endpoint is stored in our database only if you actively grant notification permission.",
    icon: BellRing,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    scope: "optional",
  },
};

type StorageKey = keyof typeof storageData;

// Scope badge helper
function ScopeBadge({ scope }: { scope: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    local: { label: "Local Only", cls: "bg-emerald-500/15 text-emerald-600" },
    hybrid: { label: "Hybrid", cls: "bg-amber-500/15 text-amber-600" },
    server: { label: "Server-side", cls: "bg-sky-500/15 text-sky-600" },
    "third-party": {
      label: "3rd Party",
      cls: "bg-purple-500/15 text-purple-600",
    },
    optional: { label: "Optional", cls: "bg-rose-500/15 text-rose-600" },
  };
  const { label, cls } = map[scope] ?? { label: scope, cls: "bg-muted" };
  return (
    <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", cls)}>
      {label}
    </span>
  );
}

export default function PrivacyPolicyPage() {
  const [selectedItem, setSelectedItem] = useState<Storage | null>(null);
  const [expandedCompliance, setExpandedCompliance] = useState<string | null>(
    null,
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative border-b border-border h-[40vh] min-h-[300px]">
        <Image
          src="/img/page/workflow.webp"
          alt="Privacy Policy"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl amoriaregular">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-gray-200">
              How we collect, use, and protect your personal information.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <Link
          href="/pages"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Link>

        {/* ── Transparency Dashboard ── */}
        <section className="rounded-2xl border border-border bg-card p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Shield className="size-5 text-primary" />
                Transparency Dashboard
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1.5 rounded-full">
              Privacy Reviewed Architecture
            </span>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "OAuth Providers",
                value: "2",
                sub: "Google & GitHub (opt-in)",
                icon: KeyRound,
                color: "text-amber-500",
              },
              {
                label: "Analytics",
                value: "1",
                sub: "PostHog — anonymised",
                icon: BarChart2,
                color: "text-sky-500",
              },
              {
                label: "DB Storage",
                value: "↑",
                sub: "Supabase for accounts",
                icon: Database,
                color: "text-violet-500",
              },
              {
                label: "Ad Trackers",
                value: "0",
                sub: "No ad pixels ever",
                icon: Ban,
                color: "text-rose-500",
              },
            ].map(({ label, value, sub, icon: Icon, color }) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-background p-4 flex flex-col gap-2"
              >
                <Icon className={cn("size-5", color)} />
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── What We Collect ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">What Information We Collect</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            This site has grown to include authenticated user accounts, server-side
            analytics, and optional push notifications. The table below is a
            complete and honest picture of every data point we touch.
          </p>

          <div className="rounded-2xl border border-border overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[1fr_auto] bg-muted/50 px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              <span>Data Item</span>
              <span>Scope</span>
            </div>

            {/* Rows */}
            {(Object.keys(storageData) as StorageKey[]).map((key) => {
              const item = storageData[key];
              const Icon = item.icon;
              const isSelected = selectedItem === key;
              return (
                <div key={key} className="border-t border-border">
                  <button
                    onClick={() => setSelectedItem(isSelected ? null : key)}
                    className={cn(
                      "w-full grid grid-cols-[1fr_auto] items-center px-5 py-4 text-left transition-colors",
                      isSelected
                        ? "bg-muted"
                        : "bg-card hover:bg-muted/50",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "p-1.5 rounded-lg",
                          item.bgColor,
                        )}
                      >
                        <Icon className={cn("size-4", item.color)} />
                      </span>
                      <span className="font-medium text-sm">{item.title}</span>
                    </span>
                    <span className="flex items-center gap-3">
                      <ScopeBadge scope={item.scope} />
                      <ChevronDown
                        className={cn(
                          "size-4 text-muted-foreground transition-transform",
                          isSelected && "rotate-180",
                        )}
                      />
                    </span>
                  </button>

                  {isSelected && (
                    <div className="px-5 pb-5 pt-2 bg-muted/30 space-y-3 text-sm">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="rounded-lg bg-card border border-border p-3 space-y-1">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                            Storage Key
                          </p>
                          <code className="text-xs font-mono">{item.key}</code>
                        </div>
                        <div className="rounded-lg bg-card border border-border p-3 space-y-1">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                            Technology
                          </p>
                          <p className="text-xs">{item.type}</p>
                        </div>
                      </div>
                      <div className="rounded-lg bg-card border border-border p-3 space-y-1">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                          Purpose
                        </p>
                        <p className="text-xs leading-relaxed">{item.purpose}</p>
                      </div>
                      <div className="rounded-lg bg-card border border-border p-3 space-y-1">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                          Privacy Impact
                        </p>
                        <p className="text-xs leading-relaxed">{item.privacy}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Ad identifiers row – always "not present" */}
            <div className="border-t border-border grid grid-cols-[1fr_auto] items-center px-5 py-4 bg-card opacity-60">
              <span className="flex items-center gap-3">
                <span className="p-1.5 rounded-lg bg-rose-500/10">
                  <Ban className="size-4 text-rose-500" />
                </span>
                <span className="font-medium text-sm">Ad Identifiers</span>
              </span>
              <span className="flex items-center gap-2 text-xs text-rose-500 font-semibold">
                <X className="size-3" /> Not Present
              </span>
            </div>
          </div>
        </section>

        {/* ── OAuth & Accounts ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <KeyRound className="size-5 text-primary" />
            OAuth & User Accounts
          </h2>
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              You may optionally sign in using your{" "}
              <strong className="text-foreground">Google</strong> or{" "}
              <strong className="text-foreground">GitHub</strong> account via OAuth
              2.0, powered by{" "}
              <strong className="text-foreground">Better Auth</strong>. We never
              see or store your password — authentication tokens are issued directly
              by the OAuth provider.
            </p>
            <p>
              Upon sign-in the following data is stored in our{" "}
              <strong className="text-foreground">Supabase</strong> database:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Your display name and profile picture URL (from the provider)</li>
              <li>Your email address (used solely for account identification)</li>
              <li>
                Your saved bookmarks and theme preference (synced from local
                storage)
              </li>
              <li>
                Your assigned role:{" "}
                <code className="text-xs bg-muted px-1 rounded">user</code> or{" "}
                <code className="text-xs bg-muted px-1 rounded">admin</code>
              </li>
            </ul>
            <p>
              Sessions are maintained via a signed{" "}
              <strong className="text-foreground">JWT stored in an HTTP-only
              cookie</strong>. You can sign out at any time to immediately invalidate
              your session. Account linking is enabled — if you sign in with two
              providers sharing the same email they are merged into one account.
            </p>
          </div>
        </section>

        {/* ── Analytics ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BarChart2 className="size-5 text-primary" />
            Analytics — PostHog
          </h2>
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              We use <strong className="text-foreground">PostHog</strong> (EU cloud)
              to collect anonymised page-view and feature-interaction events. This
              helps us understand which content is useful and where the UI can be
              improved.
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>No personally identifiable information is sent in events.</li>
              <li>IP addresses are masked before storage.</li>
              <li>Data is never sold or shared with advertising networks.</li>
              <li>
                You can opt out by enabling your browser's{" "}
                <em>Do Not Track</em> flag or by contacting us.
              </li>
            </ul>
          </div>
        </section>

        {/* ── CAPTCHA ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Bot className="size-5 text-primary" />
            CAPTCHA — Cloudflare Turnstile
          </h2>
          <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground leading-relaxed">
            <p>
              Our contact form and other interactive endpoints use{" "}
              <strong className="text-foreground">Cloudflare Turnstile</strong> to
              protect against bots. Turnstile runs a privacy-preserving challenge
              and does not use cookies or collect browsing history. The challenge
              result (a one-time token) is validated server-side; no data is stored
              by us.
            </p>
          </div>
        </section>

        {/* ── Push Notifications ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BellRing className="size-5 text-primary" />
            Push Notifications (Optional)
          </h2>
          <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground leading-relaxed">
            <p>
              If you choose to subscribe to push notifications, your browser's push
              endpoint (a URL generated by your browser vendor, not us) is stored
              securely in our database via the{" "}
              <strong className="text-foreground">Web Push / VAPID</strong>{" "}
              protocol. You can unsubscribe at any time through your browser
              settings, which automatically removes your endpoint from our records.
            </p>
          </div>
        </section>

        {/* ── Telegram ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Lock className="size-5 text-primary" />
            Contact Form & Telegram Bot
          </h2>
          <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground leading-relaxed">
            <p>
              Messages submitted through the contact form are forwarded to a private
              Telegram group via a bot. Your message content and any name/email you
              voluntarily provide are transmitted only to that private group and are
              not stored in any database. We will respond to you directly and will
              not use your contact details for marketing.
            </p>
          </div>
        </section>

        {/* ── Legal Compliance ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary" />
            Legal Compliance
          </h2>
          <p className="text-sm text-muted-foreground">
            Our architecture is designed to respect both local and international law.
          </p>
          <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
            {[
              {
                id: "pdpa",
                title: "Sri Lanka PDPA Compliance",
                body: "We operate in accordance with the Personal Data Protection Act (PDPA) No. 9 of 2022. Data collected through OAuth and analytics is processed under legitimate interest and explicit consent principles. You may request deletion of your account data at any time by contacting us.",
              },
              {
                id: "gdpr",
                title: "International Standards (GDPR)",
                body: "While we are a Sri Lankan entity, we follow GDPR best practices. PostHog is hosted on EU infrastructure. OAuth data is processed only upon your explicit consent (sign-in). You retain the right to access, correct, or erase your personal data.",
              },
              {
                id: "withdrawal",
                title: "Right to Withdraw Consent",
                body: "You can delete all server-stored data by deleting your account (when that feature is available) or by contacting us directly. Guest data (theme, bookmarks) is removed instantly by clearing your browser's local storage.",
              },
              {
                id: "children",
                title: "Children's Privacy",
                body: "This site is not directed at children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with data, please contact us immediately.",
              },
            ].map((item) => (
              <div key={item.id} className="bg-card">
                <button
                  onClick={() =>
                    setExpandedCompliance(
                      expandedCompliance === item.id ? null : item.id,
                    )
                  }
                  className="w-full flex items-center justify-between p-6 text-left bg-card hover:bg-muted/50 transition-colors"
                >
                  <span className="font-semibold text-sm">{item.title}</span>
                  <ChevronDown
                    className={cn(
                      "size-4 text-muted-foreground transition-transform shrink-0",
                      expandedCompliance === item.id && "rotate-180",
                    )}
                  />
                </button>
                {expandedCompliance === item.id && (
                  <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground space-y-2">
          <h2 className="text-base font-semibold text-foreground">
            Questions about your privacy?
          </h2>
          <p>
            Reach out via the{" "}
            <Link href="/contact" className="text-primary underline">
              contact page
            </Link>{" "}.
          </p>
        </section>
        <AIContentIndicator />
      </div>
    </div>
  );
}
