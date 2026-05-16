"use client";

import React, { useState, useMemo } from "react";
import {
  ShieldCheck,
  Shield,
  Palette,
  Bookmark,
  Ban,
  ChevronDown,
  X,
  Database,
  BarChart2,
  KeyRound,
  BellRing,
  Bot,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LegalLayout } from "@/components/legal/legal-layout";

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
    <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md", cls)}>
      {label}
    </span>
  );
}

export default function PrivacyPolicyPage() {
  const [selectedItem, setSelectedItem] = useState<StorageKey | null>(null);
  const [expandedCompliance, setExpandedCompliance] = useState<string | null>(
    null,
  );

  const sections = useMemo(() => [
    {
      id: "collection",
      title: "What Information We Collect",
      icon: Database,
      content: (
        <div className="space-y-6">
          <p>
            This site has grown to include authenticated user accounts, server-side
            analytics, and optional push notifications. The table below is a
            complete and honest picture of every data point we touch.
          </p>

          <div className="rounded-2xl border border-border overflow-hidden bg-background/50 backdrop-blur-sm">
            {/* Header */}
            <div className="grid grid-cols-[1fr_auto] bg-muted/50 px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground local-jetbrains-mono">
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
                    type="button"
                    onClick={() => setSelectedItem(isSelected ? null : key)}
                    className={cn(
                      "w-full grid grid-cols-[1fr_auto] items-center px-5 py-4 text-left transition-colors",
                      isSelected
                        ? "bg-muted/80"
                        : "bg-transparent hover:bg-muted/40",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "p-2 rounded-xl",
                          item.bgColor,
                        )}
                      >
                        <Icon className={cn("size-4", item.color)} />
                      </span>
                      <span className="font-bold text-sm google-sans">{item.title}</span>
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
                    <div className="px-5 pb-5 pt-2 bg-muted/20 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="rounded-xl bg-card/80 border border-border p-4 space-y-2 shadow-inner">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black local-jetbrains-mono">
                            Storage Key
                          </p>
                          <code className="text-[11px] font-mono bg-muted/50 px-2 py-1 rounded border border-border/50 block overflow-x-auto whitespace-nowrap scrollbar-hide">
                            {item.key}
                          </code>
                        </div>
                        <div className="rounded-xl bg-card/80 border border-border p-4 space-y-2 shadow-inner">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black local-jetbrains-mono">
                            Technology
                          </p>
                          <p className="text-xs font-medium">{item.type}</p>
                        </div>
                      </div>
                      <div className="rounded-xl bg-card/80 border border-border p-4 space-y-2 shadow-inner">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black local-jetbrains-mono">
                          Purpose
                        </p>
                        <p className="text-xs leading-relaxed">{item.purpose}</p>
                      </div>
                      <div className="rounded-xl bg-card/80 border border-border p-4 space-y-2 shadow-inner">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black local-jetbrains-mono">
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
            <div className="border-t border-border grid grid-cols-[1fr_auto] items-center px-5 py-4 bg-background/30 opacity-60">
              <span className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-rose-500/10">
                  <Ban className="size-4 text-rose-500" />
                </span>
                <span className="font-bold text-sm google-sans">Ad Identifiers</span>
              </span>
              <span className="flex items-center gap-2 text-[10px] text-rose-500 font-black uppercase tracking-widest">
                <X className="size-3" /> Not Present
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "accounts",
      title: "OAuth & User Accounts",
      icon: KeyRound,
      content: (
        <div className="space-y-4">
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
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Your display name and profile picture URL (from the provider)</li>
            <li>Your email address (used solely for account identification)</li>
            <li>
              Your saved bookmarks and theme preference (synced from local
              storage)
            </li>
            <li>
              Your assigned role:{" "}
              <code className="text-xs bg-muted/80 px-1.5 py-0.5 rounded border border-border">user</code> or{" "}
              <code className="text-xs bg-muted/80 px-1.5 py-0.5 rounded border border-border">admin</code>
            </li>
          </ul>
          <p>
            Sessions are maintained via a signed{" "}
            <strong className="text-foreground">JWT stored in an HTTP-only
            cookie</strong>. You can sign out at any time to immediately invalidate
            your session.
          </p>
        </div>
      ),
    },
    {
      id: "analytics",
      title: "Analytics — PostHog",
      icon: BarChart2,
      content: (
        <div className="space-y-3">
          <p>
            We use <strong className="text-foreground">PostHog</strong> (EU cloud)
            to collect anonymised page-view and feature-interaction events. This
            helps us understand which content is useful and where the UI can be
            improved.
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>No personally identifiable information is sent in events.</li>
            <li>IP addresses are masked before storage.</li>
            <li>Data is never sold or shared with advertising networks.</li>
            <li>
              You can opt out by enabling your browser's{" "}
              <em>Do Not Track</em> flag.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "captcha",
      title: "CAPTCHA — Cloudflare Turnstile",
      icon: Bot,
      content: (
        <p>
          Our contact form and other interactive endpoints use{" "}
          <strong className="text-foreground">Cloudflare Turnstile</strong> to
          protect against bots. Turnstile runs a privacy-preserving challenge
          and does not use cookies or collect browsing history. The challenge
          result (a one-time token) is validated server-side; no data is stored
          by us.
        </p>
      ),
    },
    {
      id: "notifications",
      title: "Push Notifications",
      icon: BellRing,
      content: (
        <p>
          If you choose to subscribe to push notifications, your browser's push
          endpoint (a URL generated by your browser vendor, not us) is stored
          securely in our database via the{" "}
          <strong className="text-foreground">Web Push / VAPID</strong>{" "}
          protocol. You can unsubscribe at any time through your browser
          settings, which automatically removes your endpoint from our records.
        </p>
      ),
    },
    {
      id: "contact-form",
      title: "Contact Form & Telegram Bot",
      icon: Lock,
      content: (
        <p>
          Messages submitted through the contact form are forwarded to a private
          Telegram group via a bot. Your message content and any name/email you
          voluntarily provide are transmitted only to that private group and are
          not stored in any database. We will respond to you directly and will
          not use your contact details for marketing.
        </p>
      ),
    },
    {
      id: "compliance",
      title: "Legal Compliance",
      icon: ShieldCheck,
      content: (
        <div className="space-y-4">
          <p>
            Our architecture is designed to respect both local and international law.
          </p>
          <div className="rounded-2xl border border-border overflow-hidden divide-y divide-border bg-background/50">
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
              <div key={item.id} className="bg-transparent">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedCompliance(
                      expandedCompliance === item.id ? null : item.id,
                    )
                  }
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/40 transition-colors"
                >
                  <span className="font-bold text-sm google-sans">{item.title}</span>
                  <ChevronDown
                    className={cn(
                      "size-4 text-muted-foreground transition-transform shrink-0",
                      expandedCompliance === item.id && "rotate-180",
                    )}
                  />
                </button>
                {expandedCompliance === item.id && (
                  <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                    {item.body}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ], [selectedItem, expandedCompliance]);

  const atGlance = useMemo(() => (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-3 amoriaregular">
            <Shield className="size-7 text-primary" />
            At a Glance
          </h2>
          <p className="text-sm text-muted-foreground google-sans">
            A high-level summary of our privacy-first architecture.
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary shadow-inner shadow-primary/20 local-jetbrains-mono">
          Privacy Reviewed
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            label: "OAuth Providers",
            value: "2",
            sub: "Google & GitHub",
            icon: KeyRound,
            color: "text-amber-500",
            bgColor: "bg-amber-500/10",
          },
          {
            label: "Analytics",
            value: "1",
            sub: "Anonymised PostHog",
            icon: BarChart2,
            color: "text-sky-500",
            bgColor: "bg-sky-500/10",
          },
          {
            label: "Cloud Storage",
            value: "DB",
            sub: "Secure Supabase",
            icon: Database,
            color: "text-violet-500",
            bgColor: "bg-violet-500/10",
          },
          {
            label: "Ad Trackers",
            value: "0",
            sub: "Zero Ad Tracking",
            icon: Ban,
            color: "text-rose-500",
            bgColor: "bg-rose-500/10",
          },
        ].map(({ label, value, sub, icon: Icon, color, bgColor }) => (
          <div
            key={label}
            className="group relative rounded-2xl border border-border bg-background/50 p-5 transition-all hover:border-primary/30 hover:-translate-y-1"
          >
            <div className={cn("mb-3 flex h-10 w-10 items-center justify-center rounded-xl shadow-inner", bgColor)}>
              <Icon className={cn("size-5", color)} />
            </div>
            <p className="text-3xl font-black tracking-tight amoriaregular">{value}</p>
            <p className="mt-1 text-[10px] font-black uppercase tracking-widest local-jetbrains-mono">{label}</p>
            <p className="mt-1 text-[11px] text-muted-foreground google-sans">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  ), []);

  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Transparent protocols for data collection and protection."
      lastUpdated="20 May 2024"
      imageSrc="/img/page/workflow.webp"
      breadcrumbs={[
        { label: "Directory", href: "/pages" },
        { label: "Privacy Policy", href: "/privacy-policy", active: true },
      ]}
      sections={sections}
      atGlance={atGlance}
    >
    </LegalLayout>
  );
}
