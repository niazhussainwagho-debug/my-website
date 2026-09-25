"use client";

import { useEffect, useMemo, useState } from "react";

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

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function truncateText(value?: string | null, maxLength = 100) {
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

    if (!term) {
      return leads;
    }

    return leads.filter((lead) => {
      const haystack = [
        lead.name,
        lead.phone,
        lead.city ?? "",
        lead.plan ?? "",
        lead.message ?? "",
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
        setError("Unable to load leads right now.");
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
      setError("Invalid password.");
      return;
    }

    setPassword("");
    setIsAuthenticated(true);

    try {
      await loadLeads();
    } catch {
      setError("Login succeeded, but leads could not be loaded.");
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

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10 text-slate-900">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Admin</p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Office Access</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />
            </label>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Dashboard</p>
            <h1 className="mt-1 text-2xl font-bold">Office Enquiries</h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or phone"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:w-72"
            />

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        </div>

        {error ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="border-b border-slate-200 px-3 py-3 font-semibold">Date</th>
                  <th className="border-b border-slate-200 px-3 py-3 font-semibold">Type</th>
                  <th className="border-b border-slate-200 px-3 py-3 font-semibold">Name</th>
                  <th className="border-b border-slate-200 px-3 py-3 font-semibold">Phone</th>
                  <th className="border-b border-slate-200 px-3 py-3 font-semibold">City/Category</th>
                  <th className="border-b border-slate-200 px-3 py-3 font-semibold">Message</th>
                  <th className="border-b border-slate-200 px-3 py-3 font-semibold">Status</th>
                  <th className="border-b border-slate-200 px-3 py-3 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="px-3 py-10 text-center text-slate-500">
                      Loading enquiries...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-3 py-10 text-center text-slate-500">
                      No enquiries found.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const isExpanded = Boolean(expandedMessages[lead.id]);
                    const messageText = lead.message || "-";

                    return (
                      <tr key={lead.id} className="align-top text-slate-700 hover:bg-slate-50">
                        <td className="border-b border-slate-200 px-3 py-3 align-top">{formatDate(lead.created_at)}</td>
                        <td className="border-b border-slate-200 px-3 py-3 align-top uppercase tracking-wide text-slate-600">
                          {lead.type}
                        </td>
                        <td className="border-b border-slate-200 px-3 py-3 align-top font-medium text-slate-900">
                          {lead.name}
                        </td>
                        <td className="border-b border-slate-200 px-3 py-3 align-top">
                          <div className="flex flex-col gap-2">
                            <span>{lead.phone}</span>
                            <div className="flex gap-2">
                              <a
                                href={whatsappLink(lead.phone)}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-md bg-emerald-500 px-2 py-1 text-xs font-medium text-white hover:bg-emerald-600"
                              >
                                WhatsApp
                              </a>
                              <a
                                href={`tel:${lead.phone}`}
                                className="rounded-md bg-blue-700 px-2 py-1 text-xs font-medium text-white hover:bg-blue-800"
                              >
                                Call
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="border-b border-slate-200 px-3 py-3 align-top">{getCategory(lead)}</td>
                        <td className="border-b border-slate-200 px-3 py-3 align-top">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedMessages((current) => ({
                                ...current,
                                [lead.id]: !current[lead.id],
                              }))
                            }
                            className="text-left text-slate-700 underline decoration-slate-300 underline-offset-2"
                          >
                            {isExpanded ? messageText : truncateText(messageText)}
                          </button>
                        </td>
                        <td className="border-b border-slate-200 px-3 py-3 align-top">
                          <select
                            value={lead.status ?? "New"}
                            onChange={(event) => void updateLeadStatus(lead.id, event.target.value)}
                            className="w-32 rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 outline-none focus:border-blue-600"
                          >
                            {statusOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="border-b border-slate-200 px-3 py-3 align-top">
                          <div className="flex flex-col gap-2">
                            <a
                              href={whatsappLink(lead.phone)}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-center text-xs font-medium text-emerald-700 hover:bg-emerald-100"
                            >
                              WhatsApp
                            </a>
                            <a
                              href={`tel:${lead.phone}`}
                              className="rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-center text-xs font-medium text-blue-700 hover:bg-blue-100"
                            >
                              Call
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
