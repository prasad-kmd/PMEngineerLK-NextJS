"use client";

import Link from "next/link";
import {
  Github,
  Twitter,
  Linkedin,
  Rss,
  Mail,
  Clapperboard,
  ShieldCheck
} from "lucide-react";
import { siteConfig } from "@/lib/config";

const footerLinks = {
  explore: [
    { name: "Movies", href: "/entertainment" },
    { name: "TV Shows", href: "/entertainment" },
    { name: "Search", href: "/entertainment/search" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/entertainment" },
    { name: "Terms of Service", href: "/entertainment" },
    { name: "Disclaimer", href: "/entertainment" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/30 py-12 px-6 lg:px-8 local-inter">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Clapperboard className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold amoriaregular tracking-widest uppercase">GSC HUB</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 google-sans">
              Experience cinema like never before. High-fidelity streaming for true cinephiles.
            </p>
            <div className="flex gap-4">
              <a href={siteConfig.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href={siteConfig.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6 amoriaregular">Explore</h3>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors google-sans">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6 amoriaregular">Legal</h3>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors google-sans">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6 amoriaregular">Support</h3>
            <p className="text-sm text-muted-foreground mb-4 google-sans">
              Need help? Reach out to us.
            </p>
            <a
              href={siteConfig.socialLinks.email}
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline google-sans"
            >
              <Mail className="h-4 w-4" />
              Contact Us
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground google-sans">
            © {currentYear} GSC HUB. Premium Entertainment Experience.
          </p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
