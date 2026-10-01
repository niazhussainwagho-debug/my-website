"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  MessageSquare,
  Building2,
  Sparkles,
} from "lucide-react";
import {
  AREA_CODE,
  CONTACT_EMAIL,
  MANAGER_NAME,
  MANAGER_TITLE,
  PHONE_DISPLAY,
  LANDLINE_NUMBER,
  WHATSAPP_NUMBER,
  emailLink,
  landlineLink,
  telLink,
} from "../../lib/contact";
import { useLanguage } from "../../context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="sub-page min-h-screen" style={{ background: 'var(--page-bg)', color: 'var(--foreground)' }}>
      {/* ── Ambient Prismatic Light Refractions ── */}
      <div className="relative isolate overflow-hidden">
        {/* Subtle diagonal laser/prism sheen matching mockup */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-[600px] w-[500px] -rotate-45 bg-gradient-to-b from-emerald-500/15 via-cyan-400/10 to-transparent blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-40 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[160px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* ── Top Header Section ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-10 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Minimalist Tracking Brand Header */}
            <p className="text-[11px] font-semibold tracking-[0.25em] text-slate-400 uppercase sm:text-xs">
              STATE LIFE • SUKKUR AREA OFFICE {AREA_CODE}
            </p>

            {/* Authoritative Editorial Headline */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Protecting Generations.<br />
              <span className="text-slate-100">
                Backed by the State.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              For over half a century, safeguarding Pakistani families with sovereign trust,
              generational financial planning, and unwavering local leadership in Northern Sindh.
            </p>
          </div>
        </section>

        {/* ── 2 Main Cards (Exact Match to Approved Mockup) ── */}
        <section className="relative z-10 mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">

            {/* CARD 1 (LEFT): Architectural Manifesto Card */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/[.08] bg-white/[.03] p-7 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-emerald-500/30 sm:p-10">
              <div className="space-y-8">
                {/* 01. Sovereign Federal Guarantee */}
                <div className="border-b border-white/[.08] pb-7">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-2xl font-bold text-slate-300">01.</span>
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                        Sovereign Federal Guarantee
                      </h2>
                      <p className="mt-1 text-xs font-semibold text-emerald-400">
                        (100% State Backed)
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-slate-400">
                        Full financial security guaranteed by the Government of Pakistan under the State Life Insurance Act.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 02. 50+ Years Unbroken Trust */}
                <div className="border-b border-white/[.08] pb-7">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-2xl font-bold text-slate-300">02.</span>
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                        50+ Years Unbroken Trust
                      </h2>
                      <p className="mt-2 text-xs leading-relaxed text-slate-400">
                        Generational stability and uninterrupted claims settlement since 1972 across Pakistan.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 03. Ethical Stewardship */}
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-2xl font-bold text-slate-300">03.</span>
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                        Ethical Stewardship
                      </h2>
                      <p className="mt-2 text-xs leading-relaxed text-slate-400">
                        Transparent policy illustrations, zero hidden clauses, and committed family welfare guidance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Office Footnote */}
              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-slate-400">
                <span>Sukkur Zone Region</span>
                <span className="font-semibold text-emerald-400">Active Office {AREA_CODE}</span>
              </div>
            </div>

            {/* CARD 2 (RIGHT): Executive Leadership with area-manager.jpg */}
            <div className="relative flex flex-col justify-between rounded-3xl border border-white/[.08] bg-white/[.03] p-7 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-emerald-500/30 sm:p-10">

              {/* Top Credential Seals */}
              <div className="flex items-center justify-between">
                {/* Executive Credentials Laurel Badge */}
                <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/[.08] px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-amber-300">
                  <Award size={14} className="text-amber-400" />
                  <span>Executive Credentials</span>
                </div>

                {/* 5405 Official Circular Seal */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[.05] p-1 text-center shadow-inner">
                  <div className="flex flex-col items-center justify-center leading-none">
                    <span className="text-[7.5px] font-bold tracking-wider text-slate-400 uppercase">SUKKUR</span>
                    <span className="text-[11px] font-black text-amber-300 font-mono">{AREA_CODE}</span>
                    <span className="text-[7px] text-slate-400 uppercase">OFFICE</span>
                  </div>
                </div>
              </div>

              {/* Real Area Manager Portrait (public/area-manager.jpg) */}
              <div className="relative my-6 mx-auto w-full max-w-[280px] sm:max-w-[320px]">
                <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-2xl border border-white/[.12] bg-[#071324] shadow-2xl ring-1 ring-white/10">
                  <Image
                    src="/area-manager.jpg"
                    alt={MANAGER_NAME}
                    fill
                    priority
                    sizes="(max-width: 640px) 280px, 320px"
                    className="object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040914]/80 via-transparent to-transparent" />
                </div>
              </div>

              {/* Bottom Area Manager Info & WhatsApp Concierge Pill */}
              <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-white/[.08] pt-5">
                <div>
                  <h3 className="text-xl font-black text-white">
                    {MANAGER_NAME}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mt-0.5">
                    - {MANAGER_TITLE}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Sukkur Area Office {AREA_CODE}
                  </p>
                </div>

                {/* WhatsApp Concierge Champagne Pill */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Salam Mr. Fayyaz Ahmed! Mujhe State Life Sukkur Area Office se guidance chahiye."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-300/40 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 px-5 py-2.5 text-xs font-bold text-slate-900 shadow-lg shadow-amber-300/20 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-amber-300/30"
                >
                  <MessageSquare size={14} className="text-slate-900" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>

            </div>

          </div>
        </section>

        {/* ── Bottom Metrics Ribbon (Matching Mockup) ── */}
        <section className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 rounded-2xl border border-white/[.08] bg-white/[.03] p-6 text-center backdrop-blur-xl sm:grid-cols-3 sm:p-8">
            <div>
              <p className="text-3xl font-black text-white sm:text-5xl">5,000+</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Policies Protected
              </p>
            </div>
            <div className="border-y border-white/[.06] py-4 sm:border-y-0 sm:border-x sm:py-0">
              <p className="text-3xl font-black text-emerald-400 sm:text-5xl">100%</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Sovereign Guarantee
              </p>
            </div>
            <div>
              <p className="text-3xl font-black text-cyan-300 sm:text-5xl">50+</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Years Legacy
              </p>
            </div>
          </div>
        </section>

        {/* ── Comprehensive Branch Contact Desk (Ensuring All Contact Info is Accessible) ── */}
        <section className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/[.08] bg-white/[.02] p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Sukkur Area Office {AREA_CODE} Desk
                </p>
                <h3 className="mt-1 text-lg font-bold text-white sm:text-xl">
                  Station Road / Main Branch, Sukkur, Sindh
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Timings: Monday to Friday (9:00 AM – 5:00 PM) • Direct official channels
                </p>
              </div>

              {/* Quick Contact Links */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={telLink()}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition"
                >
                  <Phone size={14} className="text-emerald-400" />
                  <span>{PHONE_DISPLAY}</span>
                </a>
                <a
                  href={landlineLink()}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition"
                >
                  <Building2 size={14} className="text-blue-400" />
                  <span>{LANDLINE_NUMBER}</span>
                </a>
                <a
                  href={emailLink()}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition"
                >
                  <Mail size={14} className="text-cyan-400" />
                  <span>{CONTACT_EMAIL}</span>
                </a>
                <Link
                  href="/contact#contact-form"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-xs font-bold text-white transition shadow-md shadow-blue-800/30"
                >
                  <span>Book Consultation</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="relative z-10 border-t border-white/10 px-4 py-8 text-xs text-slate-400 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p>State Life Insurance Corporation of Pakistan • Sukkur Area Office {AREA_CODE}</p>
            <div className="flex items-center gap-5">
              <Link href="/products" className="hover:text-white transition">Products</Link>
              <Link href="/services" className="hover:text-white transition">Services</Link>
              <Link href="/contact" className="hover:text-white transition">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
