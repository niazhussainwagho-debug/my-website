"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  GraduationCap,
  Clock,
  Sparkles,
  Users,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Headphones,
  FileText,
  Search,
  Building2,
  BookOpen,
} from "lucide-react";
import { policyTables, type PolicyTable } from "../../data/policy-tables";
import { WHATSAPP_NUMBER, whatsappLink } from "../../lib/contact";

type FilterTab = "all" | "popular" | "child" | "special";

function getIcon(table: PolicyTable) {
  if (table.category === "child")
    return <GraduationCap size={20} className="text-cyan-400" />;
  if (table.number === "08")
    return <Sparkles size={20} className="text-emerald-400" />;
  if (table.category === "special")
    return <Clock size={20} className="text-purple-400" />;
  if (table.number === "14")
    return <Users size={20} className="text-amber-400" />;
  return <ShieldCheck size={20} className="text-blue-400" />;
}

function getIconBg(table: PolicyTable) {
  if (table.category === "child") return "bg-cyan-500/15 border-cyan-400/20";
  if (table.number === "08") return "bg-emerald-500/15 border-emerald-400/20";
  if (table.category === "special") return "bg-purple-500/15 border-purple-400/20";
  if (table.number === "14") return "bg-amber-500/15 border-amber-400/20";
  return "bg-blue-500/15 border-blue-400/20";
}

function getBadgeColor(table: PolicyTable) {
  if (table.category === "child")
    return "bg-cyan-500/15 border-cyan-400/30 text-cyan-300";
  if (table.number === "08")
    return "bg-emerald-500/15 border-emerald-400/30 text-emerald-300";
  if (table.category === "special")
    return "bg-purple-500/15 border-purple-400/30 text-purple-300";
  if (table.number === "14")
    return "bg-amber-500/15 border-amber-400/30 text-amber-300";
  return "bg-blue-500/15 border-blue-400/30 text-blue-300";
}

function getButtonGradient(table: PolicyTable) {
  if (table.category === "child")
    return "from-cyan-600 to-blue-600 shadow-cyan-900/30 hover:from-cyan-500 hover:to-blue-500";
  if (table.number === "08")
    return "from-emerald-600 to-teal-600 shadow-emerald-900/30 hover:from-emerald-500 hover:to-teal-500";
  if (table.category === "special")
    return "from-purple-600 to-indigo-600 shadow-purple-900/30 hover:from-purple-500 hover:to-indigo-500";
  if (table.number === "14")
    return "from-blue-600 to-indigo-600 shadow-blue-900/30 hover:from-blue-500 hover:to-indigo-500";
  return "from-blue-600 to-cyan-600 shadow-blue-900/30 hover:from-blue-500 hover:to-cyan-500";
}

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTables = policyTables.filter((table) => {
    const matchesTab = activeTab === "all" || table.category === activeTab;
    const matchesSearch =
      searchQuery.trim() === "" ||
      table.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      table.number.includes(searchQuery) ||
      table.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <main
      className="sub-page min-h-screen"
      style={{ background: "var(--page-bg)", color: "var(--foreground)" }}
    >
      {/* ── Ambient Background ── */}
      <div className="relative isolate overflow-hidden">
        {/* Glow blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/[.18] blur-[130px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-cyan-500/[.13] blur-[120px]"
        />
        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* ── Hero Section ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-10 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/[.12] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-300 backdrop-blur-md">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>State Life Insurance Corporation of Pakistan</span>
            </div>

            {/* Heading */}
            <h1 className="mt-5 text-3xl font-black tracking-tight text-[#0d2548] dark:text-white sm:text-5xl lg:text-6xl">
              Comprehensive Life &{" "}
              <span className="bg-gradient-to-r from-[#1d4ed8] via-[#0ea5e9] to-[#0f766e] bg-clip-text text-transparent">
                Savings Plans
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#425d83] dark:text-slate-400 sm:text-base">
              Apne aur apni family ke mustaqbil ko secure banayein. Government
              of Pakistan ke zer-e-saya tahaffuz aur disciplined investment
              planning options.
            </p>

            {/* Search Bar */}
            <div className="mx-auto mt-7 max-w-md">
              <div className="relative flex items-center">
                <Search
                  size={16}
                  className="absolute left-3.5 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search plan (e.g. Sadabahar, Child, Table 01)..."
                  className="h-11 w-full rounded-2xl border border-[#9ec5ff] bg-white/90 pl-10 pr-4 text-sm text-[#173b63] placeholder-[#6c88b2] backdrop-blur-md outline-none transition focus:border-[#1d4ed8] focus:bg-white focus:ring-2 focus:ring-blue-200 dark:border-white/[.12] dark:bg-white/[.06] dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:bg-white/[.09]"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {[
                { id: "all", label: "All Plans" },
                { id: "popular", label: "Savings & Endowment" },
                { id: "child", label: "Child Education & Marriage" },
                { id: "special", label: "Retirement & Special" },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as FilterTab)}
                    className={`cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-[#0d4f9d] text-white shadow-lg shadow-blue-900/40"
                        : "border border-[#9ec5ff] bg-[#edf5ff] text-[#173b63] hover:border-[#7aaaf8] hover:bg-[#e3f0ff] dark:border-white/[.12] dark:bg-white/[.05] dark:text-slate-300 dark:hover:border-white/25 dark:hover:bg-white/[.09] dark:hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Product Cards Grid ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTables.map((table) => (
              <div
                key={table.number}
                className="group relative flex flex-col justify-between rounded-2xl border border-[#9ec5ff] bg-gradient-to-b from-[#edf5ff] to-[#e8f1ff] p-5 shadow-lg shadow-blue-100/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#7aaaf8] hover:shadow-xl hover:shadow-blue-200/70 dark:border-white/[.1] dark:bg-gradient-to-b dark:from-white/[.07] dark:to-white/[.02] dark:hover:border-cyan-400/40 dark:hover:shadow-cyan-900/20"
              >
                {/* Top: Icon + Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border ${getIconBg(table)} backdrop-blur-md transition-transform duration-300 group-hover:scale-105`}
                    >
                      {getIcon(table)}
                    </div>
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${getBadgeColor(table)}`}
                    >
                      Table {table.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="mt-3.5 text-base font-black text-[#0d2548] transition-colors group-hover:text-[#1d4ed8] dark:text-white dark:group-hover:text-cyan-300">
                    {table.title}
                  </h2>

                  {/* Purpose */}
                  <p className="mt-1 text-[11px] leading-relaxed text-[#45648a] dark:text-slate-400">
                    {table.purpose}
                  </p>

                  {/* Benefits */}
                  <div className="mt-3.5 space-y-1.5 border-t border-[#b8d6ff] pt-3 dark:border-white/[.08]">
                    {table.benefits.map((benefit, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 text-[11px] text-[#355073] dark:text-slate-300"
                      >
                        <CheckCircle2
                          size={12}
                          className="shrink-0 text-emerald-500 dark:text-emerald-400"
                          aria-hidden="true"
                        />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Terms */}
                  <div className="mt-3 rounded-lg border border-[#b8d6ff] bg-[#f7fbff] px-3 py-2 text-[10px] text-[#44678e] dark:border-white/[.06] dark:bg-white/[.03] dark:text-slate-400">
                    <span className="font-semibold text-[#173b63] dark:text-slate-300">
                      Terms:{" "}
                    </span>
                    {table.terms.join(", ")} years
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-4">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `Salam State Life Sukkur! Mujhe Table ${table.number} (${table.title}) ke baray mein details chahiyein.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r ${getButtonGradient(table)} px-4 py-2.5 text-[11px] font-bold text-white shadow-md transition-all duration-200 hover:shadow-lg`}
                  >
                    Inquire Details <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredTables.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-base font-semibold text-slate-400">
                Koi plan match nahi hua. Search clear karein ya koi dusra tab
                select karein.
              </p>
            </div>
          )}
        </section>

        {/* ── Digital Services & Claims Support ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#9ec5ff] bg-gradient-to-br from-[#edf5ff] via-[#eaf3ff] to-[#eef7ff] p-7 shadow-2xl shadow-blue-100/80 backdrop-blur-2xl dark:border-white/[.12] dark:bg-gradient-to-br dark:from-white/[.06] dark:via-slate-900/60 dark:to-white/[.02] sm:p-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-300 bg-blue-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1d4ed8] dark:border-blue-400/30 dark:bg-blue-500/[.15] dark:text-blue-300">
                <Building2 size={12} />
                <span>Office Assistance</span>
              </div>
              <h2 className="mt-3 text-xl font-black text-[#0d2548] sm:text-3xl dark:text-white">
                Digital Services &amp; Claims Support
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#44678e] dark:text-slate-400">
                Sukkur Area Office 5405 aapko har marhalay par mukammal
                rehnumai aur asani faraham karta hai.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* e-Polis */}
              <div className="rounded-2xl border border-[#b8d6ff] bg-white/60 p-5 backdrop-blur-lg dark:border-white/[.08] dark:bg-white/[.04]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-500 dark:text-blue-400">
                  <FileText size={20} />
                </div>
                <h3 className="mt-3 text-sm font-bold text-[#0d2548] dark:text-white">
                  e-Polis Portal Guidance
                </h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-[#45648a] dark:text-slate-400">
                  State Life ki digital services aur policy information portal
                  access karne ke liye office team se guidance lein.
                </p>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-blue-500 dark:text-blue-400">
                  <span>Portal Assistance</span>
                  <ArrowRight size={12} />
                </div>
              </div>

              {/* Claim */}
              <div className="rounded-2xl border border-[#b8d6ff] bg-white/60 p-5 backdrop-blur-lg dark:border-white/[.08] dark:bg-white/[.04]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500 dark:text-emerald-400">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="mt-3 text-sm font-bold text-[#0d2548] dark:text-white">
                  Claim Settlement Assistance
                </h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-[#45648a] dark:text-slate-400">
                  Death claim ya maturity settlement ke zaroori documents aur
                  processing ke liye step-by-step sahulat.
                </p>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-emerald-500 dark:text-emerald-400">
                  <span>Settlement Guidance</span>
                  <ArrowRight size={12} />
                </div>
              </div>

              {/* Customer Care */}
              <div className="rounded-2xl border border-[#b8d6ff] bg-white/60 p-5 backdrop-blur-lg dark:border-white/[.08] dark:bg-white/[.04]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-500 dark:text-purple-400">
                  <Headphones size={20} />
                </div>
                <h3 className="mt-3 text-sm font-bold text-[#0d2548] dark:text-white">
                  Direct Branch Customer Care
                </h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-[#45648a] dark:text-slate-400">
                  Mon-Fri 9:00 AM se 5:00 PM tak Sukkur branch par physical
                  consultation ya WhatsApp par live rabta karein.
                </p>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-purple-500 dark:text-purple-400">
                  <span>Contact Office</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            </div>

            {/* Contact Callout */}
            <div className="mt-7 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#b8d6ff] bg-white/40 p-4 sm:flex-row sm:p-5 dark:border-white/[.08] dark:bg-white/[.03]">
              <div>
                <p className="text-sm font-bold text-[#0d2548] dark:text-white">
                  Kisi specific plan ka premium jan&apos;na chahte hain?
                </p>
                <p className="text-[11px] text-[#45648a] dark:text-slate-400">
                  Hamara representative official schedule ke mutabiq aapko guide
                  karega.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href="/contact"
                  className="rounded-xl border border-[#9ec5ff] bg-white/70 px-4 py-2 text-[11px] font-bold text-[#173b63] transition hover:bg-white dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                >
                  Contact Branch
                </Link>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-[#0f7a52] px-4 py-2 text-[11px] font-bold text-white shadow-md shadow-emerald-900/20 transition hover:bg-[#0c6645]"
                >
                  WhatsApp Inquire
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
