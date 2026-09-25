import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE_NAME, isValidAdminSessionCookie } from "../../../../lib/admin-auth";
import { supabaseAdmin } from "../../../../lib/supabase";

export async function GET(request: NextRequest) {
  const cookieValue = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;

  if (!isValidAdminSessionCookie(cookieValue)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Lead service is unavailable." }, { status: 503 });
  }

  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch admin leads:", error);
    return NextResponse.json({ error: "Unable to load leads." }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}
