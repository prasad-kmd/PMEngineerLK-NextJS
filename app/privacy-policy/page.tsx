import type { Metadata } from "next";
import PrivacyPolicyPage from "./privacy-policy-client";
import { AIContentIndicator } from "@/components/ai-content-indicator";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How we collect, use, and protect your personal information.",
};

export default function Page() {
  return (
    <>
      <PrivacyPolicyPage />
      <AIContentIndicator />
    </>
  );
}
