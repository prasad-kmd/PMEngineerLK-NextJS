import type { Metadata } from "next";
import DisclaimerPage from "./disclaimer-client";
import { AIContentIndicator } from "@/components/ai-content-indicator";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Legal disclaimer for the engineering documentation platform.",
};

export default function Page() {
  return (
    <>
      <DisclaimerPage />
      <AIContentIndicator />
    </>
  );
}
