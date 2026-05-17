import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voltage Divider Designer | Engineering Tools | PrasadM Blogfolio",
  description:
    "Find the best standard resistor values (E12/E24) for your desired output voltage.",
  openGraph: {
    title: "Voltage Divider Designer | Engineering Tools | PrasadM Blogfolio",
    description:
      "Find the best standard resistor values (E12/E24) for your desired output voltage.",
    url: "/tools/voltage-divider-designer",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Voltage Divider Designer")}`,
        width: 1200,
        height: 630,
        alt: "Find the best standard resistor values (E12/E24) for your desired output voltage.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voltage Divider Designer | Engineering Tools | PrasadM Blogfolio",
    description:
      "Find the best standard resistor values (E12/E24) for your desired output voltage.",
    images: [`/api/og?title=${encodeURIComponent("Voltage Divider Designer")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
