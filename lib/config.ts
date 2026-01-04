export const siteConfig = {
  title: "Engineering Project - Mechanical & Mechatronics",
  description: "Undergraduate group project documentation for identifying and solving engineering challenges in Sri Lanka.",
  url: process.env.SITE_URL || "http://localhost:3000/",
}

export const ogConfig = {
  baseUrl: "/api/og",
  defaultTitle: "Engineering Project",
  defaultDescription: "Undergraduate group project documentation for engineering challenges in Sri Lanka.",
  // Domain for display in OG images (extracted from SITE_URL)
  domain: process.env.SITE_URL 
    ? process.env.SITE_URL.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : "preview.dmx4102.lk",
}