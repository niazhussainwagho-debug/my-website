"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Search,
  LogOut,
  Phone,
  MessageSquare,
  AlertCircle,
  Clock,
  Lock,
  ArrowRight,
  Database,
} from "lucide-react";
import { AREA_CODE } from "../../lib/contact";

type Lead = {
  id: number;
  type: string;
  name: string;
  phone: string;
  city?: string | null;
  plan?: string | null;
  message?: string | null;
  status?: string | null;
  created_at?: string;
};

const statusOptions = ["New", "Contacted", "Done"] as const;

function formatDate(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function truncateText(value?: string | null, maxLength = 80) {
  if (!value) return "-";
  return value.length > maxLength ? `${value.slice(0, maxLength).trim()}...` : value;
}

function getCategory(lead: Lead) {
  return lead.city || lead.plan || "-";
}

function whatsappLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("03") ? `92${digits.slice(1)}` : digits;
  return `https://wa.me/${normalized}`;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedMessages, setExpandedMessages] = useState<Record<number, boolean>>({});

  const filteredLeads = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return leads;

    return leads.filter((lead) => {
      const haystack = [
        lead.name,
        lead.phone,
        lead.city ?? "",
        lead.plan ?? "",
        lead.message ?? "",
        lead.type ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [leads, search]);

  async function loadLeads() {
    const response = await fetch("/api/admin/leads", { credentials: "same-origin" });

    if (response.status === 401) {
      setIsAuthenticated(false);
      return;
    }

    if (!response.ok) {
      throw new Error("Unable to fetch leads.");
    }

    const data = (await response.json()) as Lead[];
    setLeads(data);
    setIsAuthenticated(true);
  }

  useEffect(() => {
    async function bootstrap() {
      try {
        await loadLeads();
      } catch {
        setError("Database se leads load nahi huin (Supabase connection check karein).");
      } finally {
        setIsLoading(false);
      }
    }

    void bootstrap();
  }, []);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setError("Galat password. Barah-e-karam dobara enter karein.");
      return;
    }

    setPassword("");
    setIsAuthenticated(true);

    try {
      await loadLeads();
    } catch {
      setError("Login kamyab raha, lekin database se leads fetch nahi ho sakin (Supabase keys check karein).");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "same-origin",
    });

    setIsAuthenticated(false);
    setLeads([]);
    setSearch("");
    setError("");
  }

  async function updateLeadStatus(id: number, status: string) {
    const response = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      setError("Status update failed.");
      return;
    }

    setLeads((current) =>
      current.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
    );
    setError("");
  }

  // ── Login Screen (Luxury Obsidian-Gold Theme) ──
  if (!isAuthenticated) {
    return (
      <main
        className="flex min-h-screen items-center justify-center px-4 pt-24 pb-12"
        style={{
          backgroundColor: "#0c0d0e",
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.024) 1px, transparent 1px), linear-gradient(90deg, rgba(215, 184, 117, 0.035) 1px, transparent 1px)",
          backgroundSize: "100% 72px, 72px 100%",
          color: "#f7f4ed",
        }}
      >
        <div className="relative w-full max-w-md rounded-3xl border border-[#d7b875]/35 bg-[#121314]/95 p-8 shadow-[0_12px_45px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          <div className="mb-6 text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#d7b875]/40 bg-[#d7b875]/10 px-3.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-[#e8d5a4]">
              <Lock size={12} className="text-[#d7b875]" />
              <span>Area Office {AREA_CODE} • Private Portal</span>
            </div>
            <h1
              className="mt-4 text-2xl sm:text-3xl font-normal text-[#f5f2ea]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Office Access Desk
            </h1>
            <p className="mt-2 text-xs text-[#aaa9a3]">
              State Life Sukkur Area Office confidential management login.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#d6d2c7]">
                Master Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm text-[#f7f4ed] placeholder-[#7a7974] outline-none transition focus:border-[#d7b875] focus:bg-[#181918] focus:ring-1 focus:ring-[#d7b875]/50"
                placeholder="Enter admin password"
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                <AlertCircle size={15} className="shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d7b875] py-3.5 text-xs font-bold uppercase tracking-wider text-[#0c0d0e] shadow-lg shadow-[#d7b875]/20 transition-all hover:bg-[#e6cca0] hover:scale-[1.01] cursor-pointer"
            >
              <span>Login to Dashboard</span>
              <ArrowRight size={14} />
            </button>
          </form>

          <p className="mt-6 text-center text-[10px] text-[#7a7974]">
            Protected Area • Government of Pakistan Sovereign Records
          </p>
        </div>
      </main>
    );
  }

  // ── Authenticated Leads Dashboard (Luxury Obsidian-Gold Theme) ──
  return (
    <main
      className="min-h-screen px-4 pt-28 pb-12 sm:px-6 lg:px-8"
      style={{
        backgroundColor: "#0c0d0e",
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.024) 1px, transparent 1px), linear-gradient(90deg, rgba(215, 184, 117, 0.035) 1px, transparent 1px)",
        backgroundSize: "100% 72px, 72px 100%",
        color: "#f7f4ed",
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Top Control Bar */}
        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-[#d7b875]/30 bg-[#121314]/90 p-5 shadow-[0_12px_38px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:flex-row md:items-center md:justify-between sm:p-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d7b875]/35 bg-[#d7b875]/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-[#e2cca0]">
              <ShieldCheck size={12} className="text-[#d7b875]" />
              <span>Sukkur Area Office {AREA_CODE} • CRM Desk</span>
            </div>
            <h1
              className="mt-2 text-2xl sm:text-3xl font-normal text-[#f5f2ea]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Office Enquiries &amp; Leads
            </h1>
            <p className="text-xs text-[#aaa9a3] mt-0.5">
              Real-time enquiries received from website contact and career forms.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search Input */}
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#d7b875]" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, phone, city..."
                className="h-10 w-full rounded-xl border border-white/15 bg-white/[0.04] pl-10 pr-4 text-xs font-medium text-[#f7f4ed] placeholder-[#7a7974] outline-none transition focus:border-[#d7b875] focus:bg-[#181918] sm:w-72"
              />
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/[0.04] px-4 text-xs font-bold uppercase tracking-wider text-[#f7f4ed] transition hover:border-[#d7b875] hover:text-[#ecd9aa] cursor-pointer"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Database Notice Alert Banner if Leads failed to load */}
        {error && (
          <div className="mb-6 rounded-2xl border border-amber-500/40 bg-amber-950/20 p-4 text-xs text-[#e8d5a4]">
            <div className="flex items-start gap-2.5">
              <Database size={16} className="shrink-0 mt-0.5 text-[#d7b875]" />
              <div>
                <p className="font-bold text-[#f5f2ea]">Database Connectivity Status:</p>
                <p className="mt-0.5 text-[#d6d2c7]">
                  {error}
                </p>
                <p className="mt-1 text-[11px] text-[#aaa9a3]">
                  💡 <strong>Tip:</strong> Agar aapka Supabase project free tier par tha aur 7 din se inactive raha ho, toh Supabase dashboard (supabase.com) par jakar <strong>&quot;Restore / Unpause Project&quot;</strong> par click karein.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Leads Table Container */}
        <div className="overflow-hidden rounded-3xl border border-white/[0.12] bg-[#121314]/90 shadow-[0_12px_38px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                  <th className="px-4 py-3.5 font-bold uppercase tracking-wider text-[#d7b875]">Date</th>
                  <th className="px-4 py-3.5 font-bold uppercase tracking-wider text-[#d7b875]">Type</th>
                  <th className="px-4 py-3.5 font-bold uppercase tracking-wider text-[#d7b875]">Name</th>
                  <th className="px-4 py-3.5 font-bold uppercase tracking-wider text-[#d7b875]">Phone &amp; Direct Chat</th>
                  <th className="px-4 py-3.5 font-bold uppercase tracking-wider text-[#d7b875]">City / Category</th>
                  <th className="px-4 py-3.5 font-bold uppercase tracking-wider text-[#d7b875]">Message</th>
                  <th className="px-4 py-3.5 font-bold uppercase tracking-wider text-[#d7b875]">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.06]">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center text-[#aaa9a3]">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Clock size={20} className="animate-spin text-[#d7b875]" />
                        <span>Loading enquiries from database...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center text-[#aaa9a3]">
                      <div className="flex flex-col items-center justify-center gap-1.5">
                        <ShieldCheck size={28} className="text-[#d7b875]/40" />
                        <p className="font-semibold text-[#f5f2ea]">No enquiries found right now.</p>
                        <p className="text-[11px] text-[#7a7974]">
                          Naye inquiries aane par table automatically update ho jayegi.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const isExpanded = Boolean(expandedMessages[lead.id]);
                    const messageText = lead.message || "-";

                    return (
                      <tr key={lead.id} className="transition hover:bg-white/[0.02]">
                        {/* Date */}
                        <td className="px-4 py-3.5 align-top whitespace-nowrap text-[#aaa9a3] font-mono text-[11px]">
                          {formatDate(lead.created_at)}
                        </td>

                        {/* Type */}
                        <td className="px-4 py-3.5 align-top whitespace-nowrap">
                          <span className="inline-flex rounded-full border border-[#d7b875]/35 bg-[#d7b875]/10 px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-[#e8d5a4]">
                            {lead.type}
                          </span>
                        </td>

                        {/* Name */}
                        <td
                          className="px-4 py-3.5 align-top font-semibold text-[#f5f2ea]"
                          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                        >
                          {lead.name}
                        </td>

                        {/* Phone + Action buttons */}
                        <td className="px-4 py-3.5 align-top whitespace-nowrap">
                          <div className="flex flex-col gap-1.5">
                            <span className="font-mono text-xs text-[#d6d2c7]">{lead.phone}</span>
                            <div className="flex items-center gap-1.5">
                              <a
                                href={whatsappLink(lead.phone)}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 rounded-lg bg-[#25D366] px-2 py-0.5 text-[10.5px] font-bold text-black transition hover:brightness-110 shadow-sm"
                              >
                                <MessageSquare size={11} />
                                <span>WhatsApp</span>
                              </a>
                              <a
                                href={`tel:${lead.phone}`}
                                className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-2 py-0.5 text-[10.5px] font-bold text-white transition hover:bg-white/20"
                              >
                                <Phone size={10} />
                                <span>Call</span>
                              </a>
                            </div>
                          </div>
                        </td>

                        {/* City / Category */}
                        <td className="px-4 py-3.5 align-top text-[#aaa9a3]">
                          {getCategory(lead)}
                        </td>

                        {/* Message */}
                        <td className="px-4 py-3.5 align-top max-w-xs text-[#d6d2c7]">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedMessages((current) => ({
                                ...current,
                                [lead.id]: !current[lead.id],
                              }))
                            }
                            className="text-left hover:text-[#d7b875] transition"
                          >
                            {isExpanded ? messageText : truncateText(messageText)}
                          </button>
                        </td>

                        {/* Status Dropdown */}
                        <td className="px-4 py-3.5 align-top whitespace-nowrap">
                          <select
                            value={lead.status ?? "New"}
                            onChange={(event) => void updateLeadStatus(lead.id, event.target.value)}
                            className="rounded-lg border border-white/20 bg-[#161716] px-2.5 py-1 text-xs font-semibold text-[#f5f2ea] outline-none transition focus:border-[#d7b875]"
                          >
                            {statusOptions.map((option) => (
                              <option key={option} value={option} className="bg-[#161716] text-[#f5f2ea]">
                                {option}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Help Footnote */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#7a7974] px-2">
          <p>State Life Sukkur 5405 • Private Area Office Management</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#d7b875] transition">Home</Link>
            <Link href="/products" className="hover:text-[#d7b875] transition">Products</Link>
            <Link href="/contact" className="hover:text-[#d7b875] transition">Contact</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
