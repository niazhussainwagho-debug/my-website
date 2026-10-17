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
      {/* ── Ambient Luxury Glows ── */}
      <div className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#d7b875]/[0.08] blur-[140px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-10 h-[450px] w-[450px] rounded-full bg-[#d7b875]/[0.05] blur-[140px]"
        />

        {/* ── Top Header Section ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-10 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Tracking Eyebrow Badge */}
            <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-[#d7b875]/35 bg-[#0c0d0e]/80 px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] uppercase text-[#e2cca0] shadow-[0_2px_12px_rgba(0,0,0,0.4)] backdrop-blur-md sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d7b875] shadow-[0_0_10px_rgba(215,184,117,0.8)]" />
              <span className="truncate">
                STATE LIFE • SUKKUR AREA OFFICE {AREA_CODE}
              </span>
            </div>

            {/* Authoritative Editorial Serif Headline */}
            <h1
              className="mt-6 text-3xl sm:text-5xl lg:text-6xl text-[#f7f4ed] tracking-normal"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400 }}
            >
              Protecting Generations.<br />
              <span className="text-[#d7b875] italic sm:not-italic">
                Backed by the State.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#a6a6a1] sm:text-base md:text-lg">
              For over half a century, safeguarding Pakistani families with sovereign trust,
              generational financial planning, and unwavering local leadership in Northern Sindh.
            </p>
          </div>
        </section>

        {/* ── 2 Main Cards ── */}
        <section className="relative z-10 mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">

            {/* CARD 1 (LEFT): Architectural Manifesto Card */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/[0.12] bg-[#121314]/90 p-7 shadow-[0_12px_38px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-10 transition-all duration-300 hover:border-[#d7b875]/50">
              <div className="space-y-8">
                {/* 01. Sovereign Federal Guarantee */}
                <div className="border-b border-white/[0.08] pb-7">
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-2xl font-bold text-[#d7b875]"
                      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                    >
                      01.
                    </span>
                    <div>
                      <h2
                        className="text-xl sm:text-2xl font-normal text-[#f5f2ea]"
                        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                      >
                        Sovereign Federal Guarantee
                      </h2>
                      <p className="mt-1 text-xs font-semibold text-[#d7b875]">
                        (100% State Backed)
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-[#aaa9a3]">
                        Full financial security guaranteed by the Government of Pakistan under the State Life Insurance Act.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 02. 50+ Years Unbroken Trust */}
                <div className="border-b border-white/[0.08] pb-7">
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-2xl font-bold text-[#d7b875]"
                      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                    >
                      02.
                    </span>
                    <div>
                      <h2
                        className="text-xl sm:text-2xl font-normal text-[#f5f2ea]"
                        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                      >
                        50+ Years Unbroken Trust
                      </h2>
                      <p className="mt-2 text-xs leading-relaxed text-[#aaa9a3]">
                        Generational stability and uninterrupted claims settlement since 1972 across Pakistan.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 03. Ethical Stewardship */}
                <div>
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-2xl font-bold text-[#d7b875]"
                      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                    >
                      03.
                    </span>
                    <div>
                      <h2
                        className="text-xl sm:text-2xl font-normal text-[#f5f2ea]"
                        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                      >
                        Ethical Stewardship
                      </h2>
                      <p className="mt-2 text-xs leading-relaxed text-[#aaa9a3]">
                        Transparent policy illustrations, zero hidden clauses, and committed family welfare guidance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Office Footnote */}
              <div className="mt-8 flex items-center justify-between border-t border-white/[0.08] pt-5 text-xs text-[#aaa9a3]">
                <span>Sukkur Zone Region</span>
                <span className="font-semibold text-[#d7b875]">Active Office {AREA_CODE}</span>
              </div>
            </div>

            {/* CARD 2 (RIGHT): Executive Leadership with area-manager.jpg */}
            <div className="relative flex flex-col justify-between rounded-3xl border border-[#d7b875]/30 bg-[#121314]/90 p-7 shadow-[0_12px_38px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-10 transition-all duration-300 hover:border-[#d7b875]/60">

              {/* Top Credential Seals */}
              <div className="flex items-center justify-between">
                {/* Executive Credentials Laurel Badge */}
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d7b875]/40 bg-[#d7b875]/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-[#e8d5a4]">
                  <Award size={14} className="text-[#d7b875]" />
                  <span>Executive Credentials</span>
                </div>

                {/* 5405 Official Circular Seal */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7b875]/30 bg-white/[0.03] p-1 text-center shadow-inner">
                  <div className="flex flex-col items-center justify-center leading-none">
                    <span className="text-[7.5px] font-bold tracking-wider text-[#aaa9a3] uppercase">SUKKUR</span>
                    <span className="text-[11px] font-bold text-[#d7b875] font-serif">{AREA_CODE}</span>
                    <span className="text-[7px] text-[#aaa9a3] uppercase">OFFICE</span>
                  </div>
                </div>
              </div>

              {/* Area Manager Portrait */}
              <div className="relative my-6 mx-auto w-full max-w-[280px] sm:max-w-[320px]">
                <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-2xl border border-[#d7b875]/30 bg-black shadow-2xl">
                  <Image
                    src="/area-manager.jpg"
                    alt={MANAGER_NAME}
                    fill
                    priority
                    sizes="(max-width: 640px) 280px, 320px"
                    className="object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
              </div>

              {/* Bottom Area Manager Info & WhatsApp Concierge Pill */}
              <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-white/[0.08] pt-5">
                <div>
                  <h3
                    className="text-xl font-normal text-[#f5f2ea]"
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                  >
                    {MANAGER_NAME}
                  </h3>
                  <p className="text-xs font-semibold text-[#d7b875] uppercase tracking-wider mt-0.5">
                    {MANAGER_TITLE}
                  </p>
                  <p className="text-[11px] text-[#aaa9a3]">
                    Sukkur Area Office {AREA_CODE}
                  </p>
                </div>

                {/* WhatsApp Concierge Gold Pill */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Salam Mr. Fayyaz Ahmed! Mujhe State Life Sukkur Area Office se guidance chahiye."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d7b875] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0c0d0e] shadow-lg shadow-[#d7b875]/25 transition-all duration-200 hover:bg-[#e6cca0] hover:scale-105"
                >
                  <MessageSquare size={14} />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>

            </div>

          </div>
        </section>

        {/* ── Bottom Metrics Ribbon ── */}
        <section className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 rounded-2xl border border-white/[0.1] bg-[#121314]/90 p-6 text-center backdrop-blur-xl sm:grid-cols-3 sm:p-8 shadow-[0_12px_38px_rgba(0,0,0,0.35)]">
            <div>
              <p
                className="text-3xl sm:text-5xl font-normal text-[#d7b875]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                5,000+
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#aaa9a3]">
                Policies Protected
              </p>
            </div>
            <div className="border-y border-white/[0.08] py-4 sm:border-y-0 sm:border-x sm:py-0">
              <p
                className="text-3xl sm:text-5xl font-normal text-[#d7b875]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                100%
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#aaa9a3]">
                Sovereign Guarantee
              </p>
            </div>
            <div>
              <p
                className="text-3xl sm:text-5xl font-normal text-[#d7b875]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                50+
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#aaa9a3]">
                Years Legacy
              </p>
            </div>
          </div>
        </section>

        {/* ── Comprehensive Branch Contact Desk ── */}
        <section className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#d7b875]/30 bg-[#121314]/90 p-6 sm:p-8 backdrop-blur-xl shadow-[0_12px_38px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#d7b875]">
                  Sukkur Area Office {AREA_CODE} Desk
                </p>
                <h3
                  className="mt-1 text-lg sm:text-xl font-normal text-[#f5f2ea]"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  Station Road / Main Branch, Sukkur, Sindh
                </h3>
                <p className="text-xs text-[#aaa9a3] mt-1">
                  Timings: Monday to Friday (9:00 AM – 5:00 PM) • Direct official channels
                </p>
              </div>

              {/* Quick Contact Links */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={telLink()}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-[#f7f4ed] hover:border-[#d7b875]/50 transition"
                >
                  <Phone size={14} className="text-[#d7b875]" />
                  <span>{PHONE_DISPLAY}</span>
                </a>
                <a
                  href={landlineLink()}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-[#f7f4ed] hover:border-[#d7b875]/50 transition"
                >
                  <Building2 size={14} className="text-[#d7b875]" />
                  <span>{LANDLINE_NUMBER}</span>
                </a>
                <a
                  href={emailLink()}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-[#f7f4ed] hover:border-[#d7b875]/50 transition"
                >
                  <Mail size={14} className="text-[#d7b875]" />
                  <span>{CONTACT_EMAIL}</span>
                </a>
                <Link
                  href="/contact#contact-form"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#d7b875] hover:bg-[#e6cca0] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0c0d0e] transition shadow-md shadow-[#d7b875]/20"
                >
                  <span>Book Consultation</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="relative z-10 border-t border-white/10 px-4 py-8 text-xs text-[#aaa9a3] sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p>State Life Insurance Corporation of Pakistan • Sukkur Area Office {AREA_CODE}</p>
            <div className="flex items-center gap-5">
              <Link href="/products" className="hover:text-[#d7b875] transition">Products</Link>
              <Link href="/become-an-agent" className="hover:text-[#d7b875] transition">Careers</Link>
              <Link href="/contact" className="hover:text-[#d7b875] transition">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
