import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { siteConfig } from "@/lib/config";

export const runtime = "edge";

/**
 * Strips HTML tags from a string using a simple state machine.
 */
function stripTags(html: string): string {
  if (typeof html !== "string") return "";
  let result = "";
  let inTag = false;
  for (let i = 0; i < html.length; i++) {
    const char = html[i];
    if (char === "<" && !inTag) {
      inTag = true;
    } else if (char === ">" && inTag) {
      inTag = false;
      continue;
    } else if (!inTag) {
      result += char;
    }
  }
  return result.trim();
}

/**
 * Sanitizes text for use in OG image generation.
 */
function sanitizeText(text: string | null, maxLength: number): string {
  if (!text) return "";
  const stripped = stripTags(text);
  const truncated = stripped.length > maxLength ? stripped.substring(0, maxLength) + "..." : stripped;
  return truncated
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Validates and fetches remote images with SSRF protection.
 */
async function fetchRemoteImage(url: string | null): Promise<string | null> {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url, siteConfig.url);
    
    // HTTPS only for absolute URLs
    if (parsedUrl.protocol !== "https:" && !url.startsWith("/")) {
      return null;
    }

    // Allowlist check
    const hostname = parsedUrl.hostname;
    const siteHostname = new URL(siteConfig.url).hostname;
    const isAllowed = hostname === siteHostname || siteConfig.customOgAllowlist.includes(hostname);

    if (!isAllowed) return null;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const response = await fetch(parsedUrl.toString(), {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) return null;

    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.startsWith("image/")) return null;

    const contentLength = response.headers.get("Content-Length");
    if (contentLength && parseInt(contentLength) > 4 * 1024 * 1024) return null;

    // We convert to arrayBuffer and then to base64 to be safe for ImageResponse
    const arrayBuffer = await response.arrayBuffer();
    if (arrayBuffer.byteLength > 4 * 1024 * 1024) return null;

    const base64 = Buffer.from(arrayBuffer).toString("base64");
    return `data:${contentType};base64,${base64}`;
  } catch (e) {
    return null;
  }
}

const ACCENTS: Record<string, string> = {
  blue: "#3b82f6",
  emerald: "#10b981",
  violet: "#8b5cf6",
  amber: "#f59e0b",
  rose: "#f43f5e",
  indigo: "#6366f1",
  cyan: "#06b6d4",
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const title = sanitizeText(searchParams.get("title"), 100);
  const description = sanitizeText(searchParams.get("description"), 200);
  const category = sanitizeText(searchParams.get("category"), 30);
  const tags = sanitizeText(searchParams.get("tags"), 100).split(",").map(t => t.trim()).filter(Boolean);
  const siteName = sanitizeText(searchParams.get("siteName") || "PrasadM Blogfolio", 40);
  const siteUrl = sanitizeText(searchParams.get("siteUrl") || "prasadm.vercel.app", 50);
  const author = sanitizeText(searchParams.get("author") || "Prasad Madhuranga", 40);
  const accentKey = searchParams.get("accent") || "indigo";
  const accentColor = ACCENTS[accentKey] || ACCENTS.indigo;

  const iconUrl = await fetchRemoteImage(searchParams.get("icon") || "/favicon.ico");
  const imageUrl = await fetchRemoteImage(searchParams.get("image"));

  const hasImage = !!imageUrl;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Decorative Elements */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `linear-gradient(${accentColor}08 1px, transparent 1px), linear-gradient(90deg, ${accentColor}08 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 20% 30%, ${accentColor}15 0%, transparent 40%), radial-gradient(circle at 80% 70%, ${accentColor}10 0%, transparent 40%)`,
          }}
        />

        {/* Floating circles for depth */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "15%",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: `1px solid ${accentColor}20`,
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "40%",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: `${accentColor}05`,
            border: `1px solid ${accentColor}10`,
          }}
        />
        
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "8px",
            backgroundColor: accentColor,
            boxShadow: `0 0 20px ${accentColor}`,
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
            padding: "60px 80px",
            zIndex: 10,
          }}
        >
          {/* Left Side: Text Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: hasImage ? "60%" : "100%",
              height: "100%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {category && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "6px",
                      backgroundColor: `${accentColor}20`,
                      color: accentColor,
                      fontSize: "20px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      border: `1px solid ${accentColor}40`,
                    }}
                  >
                    {category}
                  </span>
                </div>
              )}

              <h1
                style={{
                  fontSize: hasImage ? "72px" : "84px",
                  fontWeight: 800,
                  margin: 0,
                  lineHeight: 1.1,
                  color: "#ffffff",
                  maxWidth: "90%",
                }}
              >
                {title}
              </h1>

              <p
                style={{
                  fontSize: "28px",
                  color: "#a3a3a3",
                  lineHeight: 1.4,
                  margin: 0,
                  maxWidth: "90%",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {description}
              </p>

              {tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
                  {tags.slice(0, 4).map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: "18px",
                        color: "#737373",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginTop: "auto",
              }}
            >
              {iconUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={iconUrl}
                  alt="Icon"
                  width={48}
                  height={48}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "10px",
                  }}
                />
              )}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "24px", fontWeight: 700, color: "#f5f5f5" }}>
                  {siteName}
                </span>
                <span style={{ fontSize: "16px", color: "#737373" }}>
                  {siteUrl} • By {author}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Image or Decorative Element */}
          <div
            style={{
              display: "flex",
              width: hasImage ? "40%" : "30%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: hasImage ? "40px" : "auto",
            }}
          >
            {hasImage ? (
              <div
                style={{
                  width: "100%",
                  height: "80%",
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: `2px solid ${accentColor}40`,
                  padding: "4px",
                  background: `linear-gradient(135deg, ${accentColor}40, transparent)`,
                  boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 20px ${accentColor}20`,
                  display: "flex",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "18px",
                    overflow: "hidden",
                    display: "flex",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Feature"
                    width={512}
                    height={512}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            ) : (
              <div
                style={{
                  width: "280px",
                  height: "280px",
                  borderRadius: "60px",
                  background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}40 100%)`,
                  transform: "rotate(15deg)",
                  opacity: 0.8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 80px ${accentColor}30`,
                }}
              >
                <div
                  style={{
                    width: "180px",
                    height: "180px",
                    borderRadius: "40px",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    {
      width: 1280,
      height: 720,
    }
  );
}
