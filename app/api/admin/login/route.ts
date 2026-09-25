import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE_NAME, compareSecrets, createAdminSessionToken, isValidAdminSessionCookie } from "../../../../lib/admin-auth";

export async function POST(request: NextRequest) {
  let body: { password?: unknown };

  try {
    body = (await request.json()) as { password?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const submittedPassword = typeof body?.password === "string" ? body.password : "";
  const configuredPassword = process.env.ADMIN_PASSWORD ?? "";

  if (!configuredPassword) {
    return NextResponse.json({ error: "Admin access is not configured." }, { status: 500 });
  }

  if (!compareSecrets(submittedPassword, configuredPassword)) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const sessionToken = createAdminSessionToken();

  if (!sessionToken || !isValidAdminSessionCookie(sessionToken)) {
    return NextResponse.json({ error: "Unable to create session." }, { status: 500 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE_NAME,
    value: sessionToken,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 8 * 60 * 60,
  });

  return response;
}
