import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { cache } from "react";
import { ProfileOverview } from "@/components/dashboard/profile-overview";
import { StatsSummary } from "@/components/dashboard/stats-summary";
import { DashboardFeedback } from "@/components/dashboard/dashboard-feedback";
import { Container } from "@/components/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TechnicalBackground } from "@/components/technical-background";
import { Breadcrumbs } from "@/components/breadcrumbs";
import dynamic from "next/dynamic";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  Link as LinkIcon,
  Bookmark,
  Shield,
  LayoutDashboard,
  BarChart,
  ArrowUpRight,
  Activity,
  FileText,
} from "lucide-react";

const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});

const getUserAccounts = cache(async () => {
  return await auth.api.listUserAccounts({
    headers: await headers(),
  });
});

const LinkedAccounts = dynamic(
  () =>
    import("@/components/dashboard/linked-accounts").then(
      (mod) => mod.LinkedAccounts,
    ),
  {
    loading: () => (
      <div className="h-48 w-full animate-pulse bg-card/10 rounded-3xl border border-border/40" />
    ),
  },
);

const ActivityTab = dynamic(
  () =>
    import("@/components/dashboard/activity-tab").then((mod) => mod.ActivityTab),
  {
    loading: () => (
      <div className="h-48 w-full animate-pulse bg-card/10 rounded-3xl border border-border/40" />
    ),
  },
);

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const { user: sessionUser } = session;

  // Fetch fresh user data from DB to ensure preferences are up to date
  const dbUser = await db.query.user.findFirst({
    where: eq(user.id, sessionUser.id),
  });

  const displayUser = (dbUser || sessionUser) as unknown;

  // Fetch accounts for the user
  const accounts = await getUserAccounts();

  return (
    <div className="relative min-h-screen">
      <TechnicalBackground />

      <Container className="pt-12 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto space-y-6">
          <Breadcrumbs
            items={[{ label: "Dashboard", href: "/dashboard", active: true }]}
            className="mb-4 font-local-inter"
            prefetch={false}
          />

          <DashboardFeedback />

          {/* Simplified Header */}
          <header className="space-y-3">
            <h1 className="text-4xl font-bold google-sans tracking-tight">
              User Dashboard
            </h1>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base font-local-inter">
              Manage your profile, linked accounts, and view your activity.
            </p>
          </header>

          <Tabs
            defaultValue="overview"
            className="w-full space-y-8 font-local-inter"
          >
            <TabsList className="sticky top-20 z-10 w-full flex flex-wrap justify-center gap-2 p-2 rounded-2xl bg-background/50 backdrop-blur-xl border border-border/50 shadow-sm h-auto">
              <TabsTrigger
                value="overview"
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-muted-foreground local-jetbrains-mono h-auto group"
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-3.5 h-3.5 opacity-50 group-data-[state=active]:opacity-100 transition-opacity" />
                  <span>Overview</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="accounts"
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-muted-foreground local-jetbrains-mono h-auto group"
              >
                <div className="flex items-center gap-2.5">
                  <LinkIcon className="w-3.5 h-3.5 opacity-50 group-data-[state=active]:opacity-100 transition-opacity" />
                  <span>Accounts</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-muted-foreground local-jetbrains-mono h-auto group"
              >
                <div className="flex items-center gap-2.5">
                  <Bookmark className="w-3.5 h-3.5 opacity-50 group-data-[state=active]:opacity-100 transition-opacity" />
                  <span>Activity</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="overview"
              className="space-y-10 mt-0 focus-visible:outline-none"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <ProfileOverview user={displayUser as unknown} />
                  <StatsSummary
                    preferences={displayUser.preferences as unknown}
                  />
                </div>
                <div className="space-y-6">
                  <div className="p-6 rounded-3xl border border-border/40 bg-card/10 backdrop-blur-md space-y-4 shadow-sm">
                    <h3 className="text-xs font-bold google-sans uppercase tracking-[0.2em] flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      Security Panel
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Your account data is encrypted and protected. All
                      connections are verified for session integrity.
                    </p>
                    <div className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded-2xl flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                        Verified
                      </span>
                    </div>
                  </div>

                  {displayUser.role === "admin" && (
                    <div className="space-y-4">
                      <div className="relative group rounded-3xl overflow-hidden p-px">
                        <div className="absolute inset-0 bg-linear-to-r from-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                        <div className="relative bg-card/20 backdrop-blur-xl border border-border/40 hover:border-primary/30 rounded-3xl flex h-full transition-colors duration-500">
                          <Link
                            href="/dashboard/analytics"
                            className="flex flex-1 items-center justify-between p-4"
                          >
                            <div className="flex items-center gap-4">
                              <div className="relative flex items-center justify-center p-3 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.1)] group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] group-hover:scale-105 transition-all duration-300">
                                <BarChart className="w-4 h-4 z-10" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold google-sans group-hover:text-primary transition-colors">
                                  Analytics
                                </h4>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-local-inter mt-0.5">
                                  Admin Only
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0 group-hover:bg-primary group-hover:text-primary-foreground shadow-lg shadow-primary/20">
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </div>
                          </Link>
                        </div>
                      </div>

                      <div className="relative group rounded-3xl overflow-hidden p-px">
                        <div className="absolute inset-0 bg-linear-to-r from-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                        <div className="relative bg-card/20 backdrop-blur-xl border border-border/40 hover:border-primary/30 rounded-3xl flex h-full transition-colors duration-500">
                          <Link
                            href="/invoice-gen"
                            className="flex flex-1 items-center justify-between p-4"
                          >
                            <div className="flex items-center gap-4">
                              <div className="relative flex items-center justify-center p-3 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.1)] group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] group-hover:scale-105 transition-all duration-300">
                                <FileText className="w-4 h-4 z-10" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold google-sans group-hover:text-primary transition-colors">
                                  Invoice Generator
                                </h4>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-local-inter mt-0.5">
                                  Admin Only
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0 group-hover:bg-primary group-hover:text-primary-foreground shadow-lg shadow-primary/20">
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </div>
                          </Link>
                        </div>
                      </div>

                      <div className="relative group rounded-3xl overflow-hidden p-px">
                        <div className="absolute inset-0 bg-linear-to-r from-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                        <div className="relative bg-card/20 backdrop-blur-xl border border-border/40 hover:border-primary/30 rounded-3xl flex h-full transition-colors duration-500">
                          <Link
                            href="/dashboard/system-monitor"
                            className="flex flex-1 items-center justify-between p-4"
                          >
                            <div className="flex items-center gap-4">
                              <div className="relative flex items-center justify-center p-3 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.1)] group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] group-hover:scale-105 transition-all duration-300">
                                <Activity className="w-4 h-4 z-10" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold google-sans group-hover:text-primary transition-colors">
                                  System Monitor
                                </h4>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-local-inter mt-0.5">
                                  Admin Only
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0 group-hover:bg-primary group-hover:text-primary-foreground shadow-lg shadow-primary/20">
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="accounts"
              className="mt-0 focus-visible:outline-none"
            >
              <LinkedAccounts accounts={accounts} />
            </TabsContent>

            <TabsContent
              value="activity"
              className="mt-0 focus-visible:outline-none"
            >
              <ActivityTab
                bookmarkCount={
                  (displayUser.preferences as unknown)?.bookmarks?.length || 0
                }
              />
            </TabsContent>
          </Tabs>
        </div>
      </Container>

      {/* Background Decorations */}
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </div>
  );
}
