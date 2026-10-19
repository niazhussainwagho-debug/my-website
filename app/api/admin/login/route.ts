import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE_NAME, compareSecrets, createAdminSessionToken, isValidAdminSessionCookie } from "../../../../lib/admin-auth";

type RateEntry = {
  count: number;
  resetAt: number;
};

const loginAttempts = new Map<string, RateEntry>();
const RATE_WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function getClientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || entry.resetAt <= now) {
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(ip: string) {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || entry.resetAt <= now) {
    loginAttempts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
  } else {
    entry.count += 1;
  }
}

function resetAttempts(ip: string) {
  loginAttempts.delete(ip);
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many failed login attempts. Please wait 15 minutes before trying again." },
      { status: 429 }
    );
  }

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
    recordFailedAttempt(ip);
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  resetAttempts(ip);

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
