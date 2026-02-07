export const siteConfig = {
  title: "PrasadM | Engineering Blogfolio",
  description: "Personal blogfolio documenting my engineering projects, technical insights, and development journey.",
  author: "PrasadM",
  url: process.env.SITE_URL || "http://localhost:3000/",
  socialLinks: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    email: "mailto:engineering.project@example.lk",
  },
}

export const ogConfig = {
  baseUrl: "/api/og",
  defaultTitle: "PrasadM Blogfolio",
  defaultDescription: "Personal blogfolio documenting my engineering and development journey.",
  // Domain for display in OG images (extracted from SITE_URL)
  domain: process.env.SITE_URL
    ? process.env.SITE_URL.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : "preview.dmx4102.lk",
}