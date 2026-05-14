export const siteConfig = {
  title: "PrasadM | Engineering Blogfolio",
  description:
    "Personal blogfolio documenting my engineering projects, technical insights, and development journey.",
  author: "Prasad Madhuranga",
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "prasad-kmd",
  url:
    process.env.SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://prasadm.vercel.app/"),
  socialLinks: {
    github:
      process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/prasad-kmd",
    twitter:
      process.env.NEXT_PUBLIC_TWITTER_URL ||
      "https://twitter.com/prasadmadhuran1",
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ||
      "https://linkedin.com/in/prasad-madhuranga",
    email: process.env.NEXT_PUBLIC_EMAIL
      ? `mailto:${process.env.NEXT_PUBLIC_EMAIL}`
      : "mailto:prasad.madhuranga@pm.me",
    sponsorship:
      process.env.NEXT_PUBLIC_GITHUB_SPONSORS_URL ||
      "https://github.com/sponsors/prasad-kmd",
  },
  customOgAllowlist: process.env.CUSTOM_OG_IMAGE_HOST_ALLOWLIST
    ? process.env.CUSTOM_OG_IMAGE_HOST_ALLOWLIST.split(",").map((h) => h.trim())
    : ["images.unsplash.com", "res.cloudinary.com", "avatars.githubusercontent.com", "blogger.googleusercontent.com", "prasadm.vercel.app"],
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
