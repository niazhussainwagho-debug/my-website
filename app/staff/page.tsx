import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Check, CircleAlert, ClipboardList, LogOut, UserRound } from "lucide-react";
import { logoutStaff, updateLeadStatus } from "./actions";
import { createSupabaseServerClient } from "../../lib/supabase/server";

export const metadata: Metadata = {
  title: "Assigned leads | Staff workspace",
};

type StaffPageProps = {
  searchParams: Promise<{ updated?: string; update?: string }>;
};

const statusStyles: Record<string, string> = {
  New: "bg-[#e8f0ff] text-[#31588f]",
  Contacted: "bg-[#fff0d8] text-[#805717]",
  Done: "bg-[#e2eee6] text-[#24664f]",
};

export default async function StaffDashboardPage({ searchParams }: StaffPageProps) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/staff/login");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/staff/login");

  const { data: profile } = await supabase
    .from("staff_profiles")
    .select("display_name, is_active")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile?.is_active) redirect("/staff/login");

  const [{ data: leads, error }, query] = await Promise.all([
    supabase
      .from("leads")
      .select("id, type, name, phone, email, city, plan, message, status, created_at")
      .eq("assigned_to", user.id)
      .order("created_at", { ascending: false }),
    searchParams,
  ]);

  const leadRows = leads ?? [];
  const newCount = leadRows.filter((lead) => lead.status === "New").length;
  const contactedCount = leadRows.filter((lead) => lead.status === "Contacted").length;

  return (
    <main className="min-h-screen bg-[#f4f5f1]">
      <header className="border-b border-[#dce2db] bg-white">
        <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#e2eee6] text-[#24664f]"><ClipboardList size={20} /></div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#18231d]">Sukkur Area Office</p>
              <p className="text-xs text-[#69766d]">Staff workspace</p>
            </div>
          </div>
          <form action={logoutStaff}>
            <button type="submit" className="inline-flex h-10 items-center gap-2 rounded-md border border-[#d7ddd6] px-3 text-sm font-semibold text-[#34443a] transition hover:bg-[#f4f5f1]" aria-label="Sign out">
              <LogOut size={16} aria-hidden="true" /><span className="hidden sm:inline">Sign out</span>
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-9 sm:px-8 sm:pt-12">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-[#24664f]">LEAD FOLLOW-UP</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#18231d] sm:text-4xl">Assigned to you</h1>
            <p className="mt-2 flex items-center gap-2 text-sm text-[#69766d]"><UserRound size={15} aria-hidden="true" />{profile.display_name}</p>
          </div>
          <div className="flex gap-3 text-sm">
            <div className="min-w-[112px] border-l-2 border-[#31588f] pl-3"><p className="text-2xl font-semibold text-[#18231d]">{leadRows.length}</p><p className="text-xs text-[#69766d]">Total leads</p></div>
            <div className="min-w-[112px] border-l-2 border-[#b98531] pl-3"><p className="text-2xl font-semibold text-[#18231d]">{newCount}</p><p className="text-xs text-[#69766d]">New</p></div>
            <div className="min-w-[112px] border-l-2 border-[#28725b] pl-3"><p className="text-2xl font-semibold text-[#18231d]">{contactedCount}</p><p className="text-xs text-[#69766d]">Contacted</p></div>
          </div>
        </div>

        {query.updated && <p role="status" className="mt-8 rounded-md border border-[#c9ddce] bg-[#edf6ef] px-4 py-3 text-sm text-[#24664f]">Lead status updated.</p>}
        {query.update === "failed" && <p role="alert" className="mt-8 rounded-md border border-[#ecc7bd] bg-[#fff2ee] px-4 py-3 text-sm text-[#963f2c]">Status update nahi ho saka. Page refresh karke dobara koshish karein.</p>}

        <section aria-label="Assigned leads" className="mt-8">
          {error ? (
            <div className="flex items-start gap-3 border-y border-[#ecc7bd] bg-[#fff2ee] px-4 py-5 text-sm text-[#963f2c]"><CircleAlert size={18} className="mt-0.5 shrink-0" /><p>Leads load nahi ho sake. Configuration check karke dobara koshish karein.</p></div>
          ) : leadRows.length === 0 ? (
            <div className="border-y border-[#dce2db] bg-white px-5 py-14 text-center">
              <ClipboardList size={26} className="mx-auto text-[#829087]" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-semibold text-[#18231d]">Abhi koi assigned lead nahi</h2>
              <p className="mt-1 text-sm text-[#69766d]">Nayi assignment milne par yahan nazar aayegi.</p>
            </div>
          ) : (
            <ul className="divide-y divide-[#dce2db] border-y border-[#dce2db] bg-white">
              {leadRows.map((lead) => (
                <li key={lead.id} className="grid gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.7fr)] lg:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold text-[#18231d]">{lead.name}</h2>
                      <span className={`rounded-sm px-2 py-1 text-[11px] font-bold ${statusStyles[lead.status] ?? statusStyles.New}`}>{lead.status}</span>
                    </div>
                    <p className="mt-1 text-sm text-[#34443a]">{lead.phone}{lead.email ? ` · ${lead.email}` : ""}</p>
                    <p className="mt-2 text-xs text-[#69766d]">{lead.type.replaceAll("_", " ")} · {new Date(lead.created_at).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}{lead.city ? ` · ${lead.city}` : ""}{lead.plan ? ` · ${lead.plan}` : ""}</p>
                    {lead.message && <p className="mt-3 max-w-3xl text-sm leading-6 text-[#536158]">{lead.message}</p>}
                  </div>
                  <form action={updateLeadStatus} className="flex items-center gap-2 lg:justify-end">
                    <input type="hidden" name="leadId" value={lead.id} />
                    <label htmlFor={`status-${lead.id}`} className="sr-only">Update status for {lead.name}</label>
                    <select id={`status-${lead.id}`} name="status" defaultValue={lead.status} className="h-10 min-w-0 flex-1 rounded-md border border-[#d7ddd6] bg-white px-3 text-sm text-[#34443a] outline-none focus:border-[#28725b] focus:ring-3 focus:ring-[#28725b]/15 sm:flex-none">
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Done">Done</option>
                    </select>
                    <button type="submit" title="Save status" aria-label={`Save status for ${lead.name}`} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#24664f] text-white transition hover:bg-[#194e3c]"><Check size={17} aria-hidden="true" /></button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}