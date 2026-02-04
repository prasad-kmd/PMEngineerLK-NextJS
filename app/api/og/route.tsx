import { ImageResponse } from "@vercel/og"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get("title") || "Blogfolio"
  const description = searchParams.get("description") || "Personal blogfolio documenting my engineering and development journey."
  const type = searchParams.get("type") || "default"

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          background: "linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)",
          color: "white",
          fontFamily: '"Inter", "sans-serif"',
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)
            `,
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "60px",
            zIndex: 1,
            gap: "24px",
            width: "100%",
          }}
        >
          {/* Content Type Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              borderRadius: "50px",
              padding: "12px 24px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              fontSize: "20px",
              color: "white",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {type === "research" ? "Research Article" :
              type === "articles" ? "Articles" :
                type === "blog" ? "Blog" :
                  type === "projects" ? "Projects" : "Update"}
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: "68px",
              fontWeight: "bold",
              margin: 0,
              lineHeight: 1.1,
              textWrap: "balance",
              maxWidth: "90%",
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            {title}
          </h1>

          {/* Description */}
          {description && (
            <div
              style={{
                fontSize: "28px",
                color: "rgba(255, 255, 255, 0.9)",
                lineHeight: 1.4,
                maxWidth: "80%",
                fontWeight: 500,
                marginTop: "8px",
              }}
            >
              {description.length > 120 ? description.substring(0, 120) + "..." : description}
            </div>
          )}

          {/* Footer Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "40px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {/* Project Logo/Badge */}
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "10px",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  color: "white",
                  fontWeight: "bold",
                  backdropFilter: "blur(5px)",
                }}
              >
                Eng.
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  Blogfolio
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  Documenting the Engineering Journey
                </div>
              </div>
            </div>

            {/* Website URL */}
            <div
              style={{
                fontSize: "18px",
                color: "rgba(255, 255, 255, 0.8)",
                fontWeight: 500,
                background: "rgba(255, 255, 255, 0.1)",
                padding: "8px 16px",
                borderRadius: "6px",
                backdropFilter: "blur(5px)",
              }}
            >
              PrasadM
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "40px",
            width: "100px",
            height: "100px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            backdropFilter: "blur(5px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "100px",
            right: "100px",
            width: "60px",
            height: "60px",
            background: "rgba(255, 255, 255, 0.15)",
            borderRadius: "15px",
            transform: "rotate(45deg)",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}