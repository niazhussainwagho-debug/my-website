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
} from "lucide-react";
import { policyTables, type PolicyTable } from "../../data/policy-tables";
import { WHATSAPP_NUMBER, whatsappLink } from "../../lib/contact";

type FilterTab = "all" | "popular" | "child" | "special";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter logic
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
    <main className="sub-page min-h-screen" style={{ background: 'var(--page-bg)', color: 'var(--foreground)' }}>
      {/* ── Ambient Background Glows ── */}
      <div className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[650px] w-[650px] rounded-full bg-blue-600/[.15] blur-[150px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-20 h-[550px] w-[550px] rounded-full bg-[#2BB6C4]/[.12] blur-[140px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* ── Top Header Section ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/[.12] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300 backdrop-blur-md">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>State Life Insurance Corporation of Pakistan</span>
            </div>

            {/* Main Title */}
            <h1 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Comprehensive Life &amp;{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                Savings Plans
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Apne aur apni family ke mustaqbil ko secure banayein. Government of Pakistan ke
              zer-e-saya tahaffuz aur disciplined investment planning options.
            </p>

            {/* Search Input Bar */}
            <div className="mx-auto mt-8 max-w-lg">
              <div className="relative flex items-center">
                <Search
                  size={18}
                  className="absolute left-4 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search plan by name (e.g. Sadabahar, Child, Table 01)..."
                  className="h-12 w-full rounded-2xl border border-white/[.15] bg-white/[.07] pl-11 pr-4 text-sm text-white placeholder-slate-400 backdrop-blur-md outline-none transition focus:border-cyan-400 focus:bg-white/[.1] focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>
            </div>

            {/* Category Filter Pills (Matching Approved Mockup) */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
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
                    className={`cursor-pointer rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-200 sm:text-sm ${
                      isActive
                        ? "bg-white text-slate-900 shadow-lg shadow-white/20"
                        : "border border-white/[.12] bg-white/[.05] text-slate-300 hover:border-white/25 hover:bg-white/[.09] hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Product Cards Grid (Glassmorphism & Neon Glow) ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTables.map((table) => {
              const getIcon = () => {
                if (table.category === "child")
                  return <GraduationCap size={22} className="text-cyan-400" />;
                if (table.number === "08")
                  return <Sparkles size={22} className="text-emerald-400" />;
                if (table.category === "special")
                  return <Clock size={22} className="text-purple-400" />;
                if (table.number === "14")
                  return <Users size={22} className="text-amber-400" />;
                return <ShieldCheck size={22} className="text-blue-400" />;
              };

              const getBadgeColor = () => {
                if (table.category === "child")
                  return "bg-cyan-500/15 border-cyan-400/30 text-cyan-300";
                if (table.number === "08")
                  return "bg-emerald-500/15 border-emerald-400/30 text-emerald-300";
                if (table.category === "special")
                  return "bg-purple-500/15 border-purple-400/30 text-purple-300";
                return "bg-blue-500/15 border-blue-400/30 text-blue-300";
              };

              return (
                <div
                  key={table.number}
                  className="group relative flex flex-col justify-between rounded-3xl border border-white/[.1] bg-gradient-to-b from-white/[.07] to-white/[.02] p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-900/20"
                >
                  {/* Top Bar with Icon & Badge */}
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[.12] bg-white/[.05] shadow-inner backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                        {getIcon()}
                      </div>
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide uppercase ${getBadgeColor()}`}
                      >
                        Table {table.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="mt-5 text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
                      {table.title}
                    </h2>

                    {/* Purpose */}
                    <p className="mt-2 text-xs leading-relaxed text-slate-300">
                      {table.purpose}
                    </p>

                    {/* Benefits List */}
                    <div className="mt-5 space-y-2 border-t border-white/[.08] pt-4">
                      {table.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                          <CheckCircle2
                            size={14}
                            className="shrink-0 text-emerald-400"
                            aria-hidden="true"
                          />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Terms info */}
                    <div className="mt-4 rounded-xl border border-white/[.06] bg-white/[.03] p-3 text-[11px] text-slate-400">
                      <span className="font-semibold text-slate-300">Terms: </span>
                      {table.terms.join(", ")} years
                    </div>
                  </div>

                  {/* Bottom Action Button */}
                  <div className="mt-6 pt-2">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        `Salam State Life Sukkur! Mujhe Table ${table.number} (${table.title}) ke baray mein details chahiyein.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3 text-xs font-bold text-white shadow-md shadow-blue-800/30 transition-all duration-200 hover:from-blue-500 hover:to-cyan-500 hover:shadow-lg"
                    >
                      Inquire Details <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTables.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg font-semibold text-slate-400">
                Koi plan match nahi hua. Search clear karein ya koi dusra tab select karein.
              </p>
            </div>
          )}
        </section>

        {/* ── Digital Services & Claims Support Section (Matching Approved Mockup) ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/[.12] bg-gradient-to-br from-white/[.06] via-slate-900/60 to-white/[.02] p-8 shadow-2xl backdrop-blur-2xl sm:p-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/[.15] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-300">
                <Building2 size={13} />
                <span>Office Assistance</span>
              </div>
              <h2 className="mt-3 text-2xl font-black text-white sm:text-4xl">
                Digital Services &amp; Claims Support
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                Sukkur Area Office 5405 aapko har marhalay par mukammal rehnumai aur asani faraham
                karta hai.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Service 1: e-Polis */}
              <div className="rounded-2xl border border-white/[.08] bg-white/[.04] p-6 backdrop-blur-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                  <FileText size={24} />
                </div>
                <h3 className="mt-4 text-base font-bold text-white">e-Polis Portal Guidance</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  State Life ki digital services aur policy information portal access karne ke liye
                  office team se guidance lein.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-blue-400">
                  <span>Portal Assistance</span>
                  <ArrowRight size={13} />
                </div>
              </div>

              {/* Service 2: Claim Assistance */}
              <div className="rounded-2xl border border-white/[.08] bg-white/[.04] p-6 backdrop-blur-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="mt-4 text-base font-bold text-white">Claim Settlement Assistance</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  Death claim ya maturity settlement ke zaroori documents aur processing ke liye step-by-step
                  sahulat.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <span>Settlement Guidance</span>
                  <ArrowRight size={13} />
                </div>
              </div>

              {/* Service 3: Customer Care */}
              <div className="rounded-2xl border border-white/[.08] bg-white/[.04] p-6 backdrop-blur-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
                  <Headphones size={24} />
                </div>
                <h3 className="mt-4 text-base font-bold text-white">Direct Branch Customer Care</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  Mon-Fri 9:00 AM se 5:00 PM tak Sukkur branch par physical consultation ya WhatsApp
                  par live rabta karein.
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-purple-400">
                  <span>Contact Office</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>

            {/* Bottom Contact Callout */}
            <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/[.08] bg-white/[.03] p-5 sm:flex-row sm:p-6">
              <div>
                <p className="text-sm font-bold text-white">Kisi specific plan ka premium jaan&apos;na chahte hain?</p>
                <p className="text-xs text-slate-400">Hamara representative official schedule ke mutabiq aapko guide karega.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition"
                >
                  Contact Branch
                </Link>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-[#0f7a52] hover:bg-[#0c6645] px-5 py-2.5 text-xs font-bold text-white transition shadow-md shadow-emerald-900/30"
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
