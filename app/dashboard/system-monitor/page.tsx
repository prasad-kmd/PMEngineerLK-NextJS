import React from "react";
import { requireAdmin } from "@/lib/auth-utils";
import { SystemMonitorManager } from "@/components/system/SystemMonitorManager";
import { db } from "@/lib/db";
import { systemLogs } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { Container } from "@/components/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TechnicalBackground } from "@/components/technical-background";

export default async function SystemMonitorPage() {
  await requireAdmin();

  // Fetch only logs on server side to speed up initial load
  // Health checks will be handled by the client-side component or loaded progressively
  const logs = await db
    .select()
    .from(systemLogs)
    .orderBy(desc(systemLogs.createdAt))
    .limit(15);

  const initialStatus = {
    timestamp: new Date().toISOString(),
  };

  return (
    <div className="relative min-h-screen">
      <TechnicalBackground />
      <Container className="pt-12 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto space-y-6">
          <Breadcrumbs
            items={[
              { label: "Dashboard", href: "/dashboard" },
              {
                label: "System Monitor",
                href: "/dashboard/system-monitor",
                active: true,
              },
            ]}
            className="mb-4 font-local-inter"
            prefetch={false}
          />

          <SystemMonitorManager
            initialStatus={initialStatus}
            initialLogs={logs}
          />
        </div>
      </Container>
    </div>
  );
}
