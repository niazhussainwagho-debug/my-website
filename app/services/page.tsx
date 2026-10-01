"use client";

import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  Clock,
  CheckCircle2,
  CreditCard,
  Users,
  ArrowRight,
  ArrowUpRight,
  Phone,
  MessageSquare,
  Building2,
  FileCheck,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import {
  WHATSAPP_NUMBER,
  PHONE_DISPLAY,
  LANDLINE_NUMBER,
  MANAGER_NAME,
  MANAGER_TITLE,
  AREA_CODE,
} from "../../lib/contact";
import { useLanguage } from "../../context/LanguageContext";

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <main className="sub-page min-h-screen" style={{ background: 'var(--page-bg)', color: 'var(--foreground)' }}>
      {/* ── Ambient Background Lighting ── */}
      <div className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-48 -top-48 h-[700px] w-[700px] rounded-full bg-blue-600/[.15] blur-[160px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-32 h-[600px] w-[600px] rounded-full bg-[#2BB6C4]/[.12] blur-[150px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 bottom-0 h-[450px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/[.07] blur-[140px]"
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
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/[.12] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md sm:text-xs">
              <ShieldCheck size={14} className="shrink-0 text-emerald-400" />
              <span className="truncate">
                State Life Sukkur Area Office {AREA_CODE} • Official Assistance Portal
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Comprehensive Policyholder{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                Services &amp; Claims Concierge
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base md:text-lg">
              Sukkur Area Office 5405 aapko claims settlement, digital e-Polis verification,
              policy renewal aur personalized financial advisory mein mukammal rehnumai faraham karta hai.
            </p>
          </div>
        </section>

        {/* ── 4 High-Fidelity Service Modules (Matching Approved Mockup) ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Card 1: Fast-Track Claim Assistance */}
            <div className="group relative flex flex-col justify-between rounded-3xl border border-white/[.1] bg-gradient-to-b from-white/[.07] to-white/[.02] p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-2xl hover:shadow-emerald-900/20">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/15 shadow-inner backdrop-blur-md">
                    <Clock size={22} className="text-emerald-400" />
                  </div>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                    Fast-Track
                  </span>
                </div>

                <h2 className="mt-5 text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
                  Fast-Track Claim Assistance
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Death claim ya maturity settlement ke zaroori documents aur processing ke liye step-by-step guidance.
                </p>

                {/* Checklist */}
                <ul className="mt-5 space-y-2.5 border-t border-white/[.08] pt-4 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="shrink-0 text-emerald-400" />
                    <span>Download Claim Form 1A</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="shrink-0 text-emerald-400" />
                    <span>Submit CNIC &amp; Policy Document</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="shrink-0 text-emerald-400" />
                    <span>Proof of Event / Hospital Record</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-2">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Salam State Life Sukkur! Mujhe Claim Process aur required documents ke baray mein rehnumai chahiye."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 text-xs font-bold text-white shadow-md shadow-emerald-900/30 transition-all duration-200 hover:from-emerald-500 hover:to-teal-500 hover:shadow-lg"
                >
                  Initiate Claim Guidance <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Card 2: e-Polis Digital Services */}
            <div className="group relative flex flex-col justify-between rounded-3xl border border-white/[.1] bg-gradient-to-b from-white/[.07] to-white/[.02] p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-2xl hover:shadow-blue-900/20">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-500/15 shadow-inner backdrop-blur-md">
                    <FileText size={22} className="text-blue-400" />
                  </div>
                  <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-300">
                    e-Services
                  </span>
                </div>

                <h2 className="mt-5 text-lg font-black text-white group-hover:text-blue-300 transition-colors">
                  e-Polis Digital Portal
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  State Life digital portal access, policy status check aur online certificates ki tasdeeq.
                </p>

                {/* Inner Mockup Box */}
                <div className="mt-5 rounded-2xl border border-white/[.08] bg-white/[.04] p-3 backdrop-blur-md">
                  <div className="flex items-center justify-between text-[11px] text-slate-300">
                    <span className="font-semibold text-white">State Life e-Portal</span>
                    <span className="text-emerald-400 font-mono text-[10px]">VERIFIED</span>
                  </div>
                  <p className="mt-1 text-[10px] text-slate-400">Policy Certificate &amp; Premium Slip</p>
                  <div className="mt-2.5 flex items-center justify-between text-[10px] text-blue-300">
                    <span>View Policy Status</span>
                    <ArrowRight size={11} />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-2">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Salam State Life Sukkur! Mujhe e-Polis digital portal access karne mein madad chahiye."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3 text-xs font-bold text-white shadow-md shadow-blue-900/30 transition-all duration-200 hover:from-blue-500 hover:to-cyan-500 hover:shadow-lg"
                >
                  e-Polis Guidance <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Card 3: Premium Renewal & Payment Support */}
            <div className="group relative flex flex-col justify-between rounded-3xl border border-white/[.1] bg-gradient-to-b from-white/[.07] to-white/[.02] p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-900/20">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/15 shadow-inner backdrop-blur-md">
                    <CreditCard size={22} className="text-cyan-400" />
                  </div>
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                    Payment
                  </span>
                </div>

                <h2 className="mt-5 text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                  Premium Renewal &amp; Payments
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Annual, half-yearly ya quarterly premium payment schedules aur verified bank channels ki maloomat.
                </p>

                {/* Verified Channels */}
                <div className="mt-5 border-t border-white/[.08] pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Verified Channels:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {["NBP", "HBL", "UBL", "Bank Alfalah", "1Link"].map((bank) => (
                      <span
                        key={bank}
                        className="rounded-lg border border-white/[.08] bg-white/[.05] px-2 py-1 text-[10px] font-semibold text-slate-300"
                      >
                        {bank}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-2">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Salam State Life Sukkur! Mujhe apni policy ki premium payment/renewal procedure ki maloomat chahiye."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-4 py-3 text-xs font-bold text-white shadow-md shadow-teal-900/30 transition-all duration-200 hover:from-teal-500 hover:to-cyan-500 hover:shadow-lg"
                >
                  Payment Methods <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Card 4: Family Policy Review & Advisory */}
            <div className="group relative flex flex-col justify-between rounded-3xl border border-white/[.1] bg-gradient-to-b from-white/[.07] to-white/[.02] p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:shadow-2xl hover:shadow-purple-900/20">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-500/15 shadow-inner backdrop-blur-md">
                    <Users size={22} className="text-purple-400" />
                  </div>
                  <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-300">
                    Advisory
                  </span>
                </div>

                <h2 className="mt-5 text-lg font-black text-white group-hover:text-purple-300 transition-colors">
                  Policy Review &amp; Advisory
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Beneficiaries/Nominee ki tabdeeli, additional coverage riders aur portfolio audit ki free mashwara.
                </p>

                {/* Checklist */}
                <ul className="mt-5 space-y-2.5 border-t border-white/[.08] pt-4 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="shrink-0 text-purple-400" />
                    <span>Update Nominee / Beneficiaries</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="shrink-0 text-purple-400" />
                    <span>Check Existing Coverage Status</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="shrink-0 text-purple-400" />
                    <span>Consult Area Representative</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-2">
                <Link
                  href="/contact#contact-form"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 text-xs font-bold text-white shadow-md shadow-purple-900/30 transition-all duration-200 hover:from-purple-500 hover:to-indigo-500 hover:shadow-lg"
                >
                  Consult Advisor <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ── Split Layout: 3-Phase Claim Process Timeline & Concierge Support ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

            {/* Left Box (Span 2): Claim Process Timeline */}
            <div className="rounded-3xl border border-white/[.12] bg-gradient-to-br from-white/[.06] via-slate-900/60 to-white/[.02] p-6 shadow-2xl backdrop-blur-2xl sm:p-8 lg:col-span-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
                <FileCheck size={14} />
                <span>Claim Lifecycle</span>
              </div>

              <h2 className="mt-4 text-2xl font-black text-white sm:text-3xl">
                Claim Process Timeline
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                State Life Sukkur office claim settlement ko transparent aur aasan banata hai.
                Teen aasan marhale:
              </p>

              {/* Interactive Timeline Progression Bar */}
              <div className="mt-10">
                {/* Horizontal Bar for Desktop, Stacked for Mobile */}
                <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4">
                  {/* Connecting Line (Desktop) */}
                  <div
                    aria-hidden="true"
                    className="hidden md:block absolute top-5 left-10 right-10 h-0.5 bg-gradient-to-r from-emerald-500 via-cyan-400 to-blue-500 opacity-60"
                  />

                  {/* Step 1 */}
                  <div className="relative flex flex-col items-start md:items-center text-left md:text-center">
                    <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald-400 bg-[#061224] text-xs font-black text-emerald-300 shadow-lg shadow-emerald-500/40">
                      1
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-white">1. Submit Documents</h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                      Intimation form, CNIC copies aur required proof documents office mein jama karwayein.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex flex-col items-start md:items-center text-left md:text-center">
                    <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-cyan-400 bg-[#061224] text-xs font-black text-cyan-300 shadow-lg shadow-cyan-500/40">
                      2
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-white">2. Scrutiny &amp; Verification</h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                      Area Office aur Zonal claim committee ki janib se dastavez ki janch aur tezi se approval.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex flex-col items-start md:items-center text-left md:text-center">
                    <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-400 bg-[#061224] text-xs font-black text-blue-300 shadow-lg shadow-blue-500/40">
                      3
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-white">3. Disbursement</h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                      Approved raqam ka cheque ya direct bank transfer legal beneficiary ko timely delivered.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Assurance Note */}
              <div className="mt-10 rounded-2xl border border-white/[.08] bg-white/[.03] p-4 text-xs text-slate-300 flex items-center gap-3">
                <Sparkles size={18} className="shrink-0 text-cyan-400" />
                <span>
                  Tamam claims Government of Pakistan ke State Life Insurance Act ke tehat legal tahaffuz aur scrutiny ke mutabiq hal kiye jaate hain.
                </span>
              </div>
            </div>

            {/* Right Box (Span 1): Dedicated Support Concierge */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/[.12] bg-gradient-to-br from-white/[.07] via-slate-900/70 to-white/[.03] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
                  <Building2 size={13} />
                  <span>Branch Desk</span>
                </div>

                <h2 className="mt-4 text-xl font-black text-white sm:text-2xl">
                  Dedicated Support Concierge
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Sukkur Area Office ki team directly policyholders aur claims ke liye hazir hai:
                </p>

                {/* Direct Action 1: WhatsApp */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 transition-all hover:bg-emerald-500/20 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-600/40">
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-300">Direct WhatsApp Help</p>
                      <p className="text-[11px] font-mono text-slate-300">+92 317 0941821</p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-emerald-400" />
                </a>

                {/* Direct Action 2: Phone Hotline */}
                <a
                  href={`tel:${LANDLINE_NUMBER}`}
                  className="mt-3 flex items-center justify-between rounded-2xl border border-white/[.08] bg-white/[.04] p-4 transition-all hover:bg-white/[.08] hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-700/40">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Sukkur Office Hotline</p>
                      <p className="text-[11px] font-mono text-slate-300">{PHONE_DISPLAY}</p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-blue-400" />
                </a>

                {/* Management Details */}
                <div className="mt-6 border-t border-white/[.08] pt-4 text-xs text-slate-300">
                  <p className="font-bold text-white">{MANAGER_NAME}</p>
                  <p className="text-[11px] text-slate-400">{MANAGER_TITLE} • Area Code {AREA_CODE}</p>
                  <p className="mt-2 text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-300">Timings:</span> Mon – Fri, 9:00 AM – 5:00 PM
                  </p>
                </div>
              </div>

              {/* Bottom Quick Visit Link */}
              <div className="mt-6 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-bold text-white transition hover:bg-white/20"
                >
                  Visit Sukkur Office <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}
