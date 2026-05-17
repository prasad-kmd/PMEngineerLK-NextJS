import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Linear Curve Fitter | Engineering Tools | PrasadM Blogfolio",
  description:
    "Fit linear models to data points using the least squares method with R-squared analysis.",
  openGraph: {
    title: "Linear Curve Fitter | Engineering Tools | PrasadM Blogfolio",
    description:
      "Fit linear models to data points using the least squares method with R-squared analysis.",
    url: "/tools/curve-fitter",
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Linear Curve Fitter")}`,
        width: 1200,
        height: 630,
        alt: "Fit linear models to data points using the least squares method with R-squared analysis.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linear Curve Fitter | Engineering Tools | PrasadM Blogfolio",
    description:
      "Fit linear models to data points using the least squares method with R-squared analysis.",
    images: [`/api/og?title=${encodeURIComponent("Linear Curve Fitter")}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
