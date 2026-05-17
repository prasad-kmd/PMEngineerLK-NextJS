import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sensor Scaling Calculator | Engineering Tools | PrasadM Blogfolio",
  description:
    "Map analog voltage or current signals to physical engineering units for sensor calibration.",
  openGraph: {
    title: "Sensor Scaling Calculator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Map analog voltage or current signals to physical engineering units for sensor calibration.",
    url: "/tools/sensor-scaling-calculator",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Sensor Scaling Calculator")}`,
        width: 1200,
        height: 630,
        alt: "Map analog voltage or current signals to physical engineering units for sensor calibration.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sensor Scaling Calculator | Engineering Tools | PrasadM Blogfolio",
    description:
      "Map analog voltage or current signals to physical engineering units for sensor calibration.",
    images: [
      `/api/og?title=${encodeURIComponent("Sensor Scaling Calculator")}`,
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
