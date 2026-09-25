import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE_NAME, isValidAdminSessionCookie } from "../../../../../lib/admin-auth";
import { supabaseAdmin } from "../../../../../lib/supabase";

const validStatuses = ["New", "Contacted", "Done"];

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const cookieValue = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;

  if (!isValidAdminSessionCookie(cookieValue)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { status?: unknown };

  try {
    body = (await request.json()) as { status?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const status = typeof body?.status === "string" ? body.status : "";

  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Lead service is unavailable." }, { status: 503 });
  }

  const { id } = await context.params;
  const numericId = Number(id);

  if (!Number.isFinite(numericId)) {
    return NextResponse.json({ error: "Invalid lead id." }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("leads")
    .update({ status })
    .eq("id", numericId);

  if (error) {
    console.error("Failed to update lead status:", error);
    return NextResponse.json({ error: "Unable to update status." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
