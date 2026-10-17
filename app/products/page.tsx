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
import { WHATSAPP_NUMBER } from "../../lib/contact";

type FilterTab = "all" | "popular" | "child" | "special";

function getIcon(table: PolicyTable) {
  if (table.category === "child")
    return <GraduationCap size={18} className="text-[#d7b875]" />;
  if (table.number === "08")
    return <Sparkles size={18} className="text-[#d7b875]" />;
  if (table.category === "special")
    return <Clock size={18} className="text-[#d7b875]" />;
  if (table.number === "14")
    return <Users size={18} className="text-[#d7b875]" />;
  return <ShieldCheck size={18} className="text-[#d7b875]" />;
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
      style={{
        backgroundColor: "#0c0d0e",
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.024) 1px, transparent 1px), linear-gradient(90deg, rgba(215, 184, 117, 0.035) 1px, transparent 1px)",
        backgroundSize: "100% 72px, 72px 100%",
        color: "#f7f4ed",
      }}
    >
      {/* ── Ambient Background Glows ── */}
      <div className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#d7b875]/[0.08] blur-[140px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-10 h-[450px] w-[450px] rounded-full bg-[#d7b875]/[0.05] blur-[140px]"
        />

        {/* ── Hero Section ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-10 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Trust Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#d7b875]/35 bg-[#0c0d0e]/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#e2cca0] shadow-[0_2px_12px_rgba(0,0,0,0.4)] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d7b875] shadow-[0_0_10px_rgba(215,184,117,0.8)]" />
              <span>State Life Insurance Corporation of Pakistan</span>
            </div>

            {/* Heading in Georgia Serif matching Home Page */}
            <h1
              className="mt-6 text-3xl sm:text-5xl lg:text-6xl text-[#f7f4ed] tracking-normal"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400 }}
            >
              Comprehensive Life &amp;{" "}
              <span className="text-[#d7b875] italic sm:not-italic">
                Savings Plans
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#a6a6a1] sm:text-base">
              Apne aur apni family ke mustaqbil ko secure banayein. Government
              of Pakistan ke zer-e-saya tahaffuz aur disciplined investment
              planning options.
            </p>

            {/* Search Bar matching dark luxury theme */}
            <div className="mx-auto mt-7 max-w-md">
              <div className="relative flex items-center">
                <Search
                  size={16}
                  className="absolute left-4 text-[#d7b875]"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search plan (e.g. Sadabahar, Child, Table 01)..."
                  className="h-11 w-full rounded-full border border-white/15 bg-[#141514]/90 pl-11 pr-4 text-xs font-medium text-[#f7f4ed] placeholder-[#7a7974] backdrop-blur-md outline-none transition-all focus:border-[#d7b875] focus:bg-[#181918] focus:ring-1 focus:ring-[#d7b875]/50"
                />
              </div>
            </div>

            {/* Filter Tabs matching Home Page Capsule Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
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
                    className={`cursor-pointer rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                      isActive
                        ? "border border-[#d7b875] bg-[#d7b875]/15 text-[#ecd9aa] shadow-[inset_0_-2px_0_#d7b875]"
                        : "border border-white/15 bg-white/[0.025] text-[#aaa9a3] hover:border-[#d7b875]/60 hover:bg-[#d7b875]/[0.08] hover:text-[#ecd9aa]"
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
        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTables.map((table) => (
              <div
                key={table.number}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.12] bg-[#121314]/90 p-5 shadow-[0_12px_38px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#d7b875]/60 hover:shadow-[0_20px_48px_rgba(0,0,0,0.55)]"
              >
                {/* Top: Icon + Table Badge */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d7b875]/30 bg-[#d7b875]/10 text-[#d7b875] transition-transform duration-300 group-hover:scale-105">
                      {getIcon(table)}
                    </div>
                    <span className="inline-flex rounded-full border border-[#d7b875]/40 bg-[#d7b875]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#e8d5a4]">
                      Table {table.number}
                    </span>
                  </div>

                  {/* Title in Serif */}
                  <h2
                    className="mt-3.5 text-base font-normal text-[#f5f2ea] transition-colors group-hover:text-[#d7b875]"
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                  >
                    {table.title}
                  </h2>

                  {/* Purpose */}
                  <p className="mt-1.5 text-[11px] leading-relaxed text-[#aaa9a3]">
                    {table.purpose}
                  </p>

                  {/* Benefits */}
                  <div className="mt-3.5 space-y-1.5 border-t border-white/[0.09] pt-3">
                    {table.benefits.map((benefit, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 text-[11px] text-[#d6d2c7]"
                      >
                        <CheckCircle2
                          size={12}
                          className="shrink-0 text-[#d7b875]"
                          aria-hidden="true"
                        />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Terms */}
                  <div className="mt-3 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[10px] text-[#aaa9a3]">
                    <span className="font-semibold text-[#d7b875]">Terms: </span>
                    {table.terms.join(", ")} years
                  </div>
                </div>

                {/* Bottom CTA Button matching Home page gold action style */}
                <div className="mt-4">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `Salam State Life Sukkur! Mujhe Table ${table.number} (${table.title}) ke baray mein details chahiyein.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-between rounded-xl border border-[#d7b875]/60 bg-[#d7b875]/10 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#e6d3a6] transition-all duration-200 hover:bg-[#d7b875] hover:text-[#0c0d0e] shadow-sm hover:shadow-[0_4px_16px_rgba(215,184,117,0.3)]"
                  >
                    <span>Inquire Details</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredTables.length === 0 && (
            <div className="rounded-2xl border border-white/[0.12] bg-[#121314]/80 py-16 text-center">
              <p className="text-sm font-semibold text-[#aaa9a3]">
                Koi plan match nahi hua. Search clear karein ya koi dusra tab
                select karein.
              </p>
            </div>
          )}
        </section>

        {/* ── Digital Services & Claims Support (Matched to Home luxury theme) ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#d7b875]/30 bg-gradient-to-b from-[#141514] to-[#0e0f0e] p-7 sm:p-10 shadow-2xl backdrop-blur-2xl">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d7b875]/35 bg-[#d7b875]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#e2cca0]">
                <Building2 size={12} className="text-[#d7b875]" />
                <span>Office Assistance</span>
              </div>
              <h2
                className="mt-3.5 text-xl sm:text-3xl font-normal text-[#f5f2ea]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Digital Services &amp; Claims Support
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#aaa9a3]">
                Sukkur Area Office 5405 aapko har marhalay par mukammal
                rehnumai aur asani faraham karta hai.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* e-Polis */}
              <div className="rounded-2xl border border-white/[0.1] bg-white/[0.025] p-5 backdrop-blur-lg hover:border-[#d7b875]/50 transition-all duration-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d7b875]/30 bg-[#d7b875]/10 text-[#d7b875]">
                  <FileText size={18} />
                </div>
                <h3
                  className="mt-3.5 text-sm font-semibold text-[#f5f2ea]"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  e-Polis Portal Guidance
                </h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-[#aaa9a3]">
                  State Life ki digital services aur policy information portal
                  access karne ke liye office team se guidance lein.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#d7b875] hover:text-[#f7f4ed]">
                  <span>Portal Assistance</span>
                  <ArrowRight size={12} />
                </div>
              </div>

              {/* Claim */}
              <div className="rounded-2xl border border-white/[0.1] bg-white/[0.025] p-5 backdrop-blur-lg hover:border-[#d7b875]/50 transition-all duration-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d7b875]/30 bg-[#d7b875]/10 text-[#d7b875]">
                  <ShieldCheck size={18} />
                </div>
                <h3
                  className="mt-3.5 text-sm font-semibold text-[#f5f2ea]"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  Claim Settlement Assistance
                </h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-[#aaa9a3]">
                  Death claim ya maturity settlement ke zaroori documents aur
                  processing ke liye step-by-step sahulat.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#d7b875] hover:text-[#f7f4ed]">
                  <span>Settlement Guidance</span>
                  <ArrowRight size={12} />
                </div>
              </div>

              {/* Customer Care */}
              <div className="rounded-2xl border border-white/[0.1] bg-white/[0.025] p-5 backdrop-blur-lg hover:border-[#d7b875]/50 transition-all duration-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d7b875]/30 bg-[#d7b875]/10 text-[#d7b875]">
                  <Headphones size={18} />
                </div>
                <h3
                  className="mt-3.5 text-sm font-semibold text-[#f5f2ea]"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  Direct Branch Customer Care
                </h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-[#aaa9a3]">
                  Mon-Fri 9:00 AM se 5:00 PM tak Sukkur branch par physical
                  consultation ya WhatsApp par live rabta karein.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#d7b875] hover:text-[#f7f4ed]">
                  <span>Contact Office</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            </div>

            {/* Contact Callout */}
            <div className="mt-7 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:flex-row sm:p-5">
              <div>
                <p className="text-sm font-bold text-[#f5f2ea]">
                  Kisi specific plan ka premium jan&apos;na chahte hain?
                </p>
                <p className="text-[11px] text-[#aaa9a3]">
                  Hamara representative official schedule ke mutabiq aapko guide
                  karega.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href="/contact"
                  className="rounded-xl border border-white/20 bg-white/[0.05] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[#f7f4ed] transition-all hover:border-[#d7b875] hover:text-[#ecd9aa]"
                >
                  Contact Branch
                </Link>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-[#d7b875] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[#0c0d0e] shadow-md transition-all hover:bg-[#ecd9aa]"
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
