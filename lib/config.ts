export const siteConfig = {
  title: "PrasadM | Engineering Blogfolio",
  description:
    "Personal blogfolio documenting my engineering projects, technical insights, and development journey.",
  author: "PrasadM",
  url:
    process.env.SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000/"),
  socialLinks: {
    github: "https://github.com/prasad-kmd",
    twitter: "https://twitter.com/prasadmadhuran1",
    linkedin: "https://linkedin.com/in/prasad-madhuranga",
    email: "mailto:contact@prasadm.vercel.app",
  },
};

export const ogConfig = {
  baseUrl: "/api/og",
  defaultTitle: "PrasadM Blogfolio",
  defaultDescription:
    "Personal blogfolio documenting my engineering and development journey.",
  // Domain for display in OG images (extracted from SITE_URL)
  domain: process.env.SITE_URL
    ? process.env.SITE_URL.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "prasadm.vercel.app",
};
