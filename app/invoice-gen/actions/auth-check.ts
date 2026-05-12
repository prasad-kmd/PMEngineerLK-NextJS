"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function checkAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/sign-in?callbackUrl=/invoice-gen`);
  }

  if (session.user.role !== "admin") {
    redirect("/not-authorized");
  }

  return session.user;
}
