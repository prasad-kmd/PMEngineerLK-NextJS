"use client";

import dynamic from "next/dynamic";
import { SidebarProvider } from "@/components/sidebar-context";
import { ThemeProvider } from "@/components/theme-provider";
import { FloatingNavbar } from "@/components/floating-navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BookmarksProvider } from "@/hooks/use-bookmarks";
import { Footer } from "@/components/footer";
import { ViewTransitions } from "@/components/view-transitions";
import { PostHogProvider } from "@/components/posthog-provider";
import { AccessibilityProvider } from "@/providers/AccessibilityProvider";
import { Navigation } from "@/components/navigation";
import { AgentationToolbar } from "@/components/dev/AgentationToolbar";

const Toaster = dynamic(() => import("sonner").then((mod) => mod.Toaster), {
  ssr: false,
});
const CustomContextMenu = dynamic(
  () =>
    import("@/components/custom-context-menu").then(
      (mod) => mod.CustomContextMenu,
    ),
  { ssr: false },
);
const ClickSpark = dynamic(() => import("@/components/ClickSpark"), {
  ssr: false,
});
const FloatingButton = dynamic(
  () =>
    import("@/components/accessibility/FloatingButton").then(
      (mod) => mod.FloatingButton,
    ),
  { ssr: false },
);
const ControlPanel = dynamic(
  () =>
    import("@/components/accessibility/ControlPanel").then(
      (mod) => mod.ControlPanel,
    ),
  { ssr: false },
);
const ScrollToTop = dynamic(
  () => import("@/components/scroll-to-top").then((mod) => mod.ScrollToTop),
  { ssr: false },
);
const ConnectivityListener = dynamic(
  () =>
    import("@/components/connectivity-listener").then(
      (mod) => mod.ConnectivityListener,
    ),
  { ssr: false },
);
const ServiceWorkerRegistrar = dynamic(
  () => import("@/components/service-worker-registrar"),
  { ssr: false },
);
const PostHogPageviewWrapper = dynamic(
  () => import("@/components/analytics/PostHogPageview"),
  { ssr: false },
);
const AccentColorInitializer = dynamic(
  () =>
    import("@/components/accent-color-initializer").then(
      (mod) => mod.AccentColorInitializer,
    ),
  { ssr: false },
);
const AuthInitializer = dynamic(
  () =>
    import("@/components/auth/auth-initializer").then(
      (mod) => mod.AuthInitializer,
    ),
  { ssr: false },
);

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <PostHogProvider>
        <AccessibilityProvider>
          <PostHogPageviewWrapper />
          <AccentColorInitializer />
          <AuthInitializer />
          <TooltipProvider>
            <SidebarProvider>
              <BookmarksProvider>
                <ViewTransitions>
                  <ClickSpark
                    sparkSize={10}
                    sparkRadius={15}
                    sparkCount={8}
                    duration={400}
                    easing="linear"
                    extraScale={1.5}
                  >
                    <CustomContextMenu />
                    <FloatingNavbar className="hidden lg:flex" />
                    <Navigation />
                    <main className="transition-[padding] duration-300 lg:pl-(--sidebar-width,256px) overflow-x-clip">
                      {children}
                      <Footer />
                    </main>
                    <FloatingButton />
                    <ControlPanel />
                    <ScrollToTop />
                    <Toaster position="bottom-right" richColors />
                    <ConnectivityListener />
                    <ServiceWorkerRegistrar />
                    <AgentationToolbar />
                  </ClickSpark>
                </ViewTransitions>
              </BookmarksProvider>
            </SidebarProvider>
          </TooltipProvider>
        </AccessibilityProvider>
      </PostHogProvider>
    </ThemeProvider>
  );
}
