import { NextRequest, NextResponse } from "next/server";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword || !process.env.AUTH_SECRET) {
    return NextResponse.json(
      { error: "Server authentication is not configured" },
      { status: 500 }
    );
  }

  const usernameMatch = crypto.timingSafeEqual(
    crypto.createHash("sha256").update(username).digest(),
    crypto.createHash("sha256").update(adminUsername).digest()
  );
  const passwordMatch = crypto.timingSafeEqual(
    crypto.createHash("sha256").update(password).digest(),
    crypto.createHash("sha256").update(adminPassword).digest()
  );

  if (usernameMatch && passwordMatch) {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ username, expires: expires.getTime() });

    (await cookies()).set("session", session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
