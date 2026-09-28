"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../../lib/supabase/server";

export type LoginState = { error: string } | null;

export async function loginStaff(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "Email aur password dono zaroori hain." };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { error: "Staff login abhi configure nahi hai. Admin se rabta karein." };

  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
  if (signInError) return { error: "Email ya password durust nahi hai." };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Login verify nahi ho saka. Dobara koshish karein." };

  const { data: profile } = await supabase
    .from("staff_profiles")
    .select("user_id, is_active")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile?.is_active) {
    await supabase.auth.signOut();
    return { error: "Is account ko staff dashboard ki ijazat nahi hai." };
  }

  redirect("/staff");
}

export async function logoutStaff() {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect("/staff/login");
}

export async function updateLeadStatus(formData: FormData) {
  const leadId = String(formData.get("leadId") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!/^\d+$/.test(leadId) || !["New", "Contacted", "Done"].includes(status)) {
    redirect("/staff?update=failed");
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/staff/login");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/staff/login");

  const { data, error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", leadId)
    .eq("assigned_to", user.id)
    .select("id")
    .maybeSingle();

  if (error || !data) redirect("/staff?update=failed");

  revalidatePath("/staff");
  redirect("/staff?updated=1");
}