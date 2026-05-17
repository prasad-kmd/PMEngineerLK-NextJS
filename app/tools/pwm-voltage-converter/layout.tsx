import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PWM to Voltage Converter | Engineering Tools | PrasadM Blogfolio",
  description:
    "Convert duty cycle to average voltage for microcontroller and signal processing projects.",
  openGraph: {
    title: "PWM to Voltage Converter | Engineering Tools | PrasadM Blogfolio",
    description:
      "Convert duty cycle to average voltage for microcontroller and signal processing projects.",
    url: "/tools/pwm-voltage-converter",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("PWM to Voltage Converter")}`,
        width: 1200,
        height: 630,
        alt: "Convert duty cycle to average voltage for microcontroller and signal processing projects.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PWM to Voltage Converter | Engineering Tools | PrasadM Blogfolio",
    description:
      "Convert duty cycle to average voltage for microcontroller and signal processing projects.",
    images: [`/api/og?title=${encodeURIComponent("PWM to Voltage Converter")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
