"use client";

import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  MessageSquare,
  Building2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
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
import { cleanPhone } from "../../lib/phone";
import { useLanguage } from "../../context/LanguageContext";

type ContactForm = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  consent: boolean;
  website: string;
};

type FormErrors = Partial<Record<keyof ContactForm, string>>;

const initialForm: ContactForm = {
  name: "",
  phone: "",
  email: "",
  service: "Endowment Assurance (Table 01)",
  message: "",
  consent: true,
  website: "",
};

const serviceOptions = [
  "Endowment Assurance (Table 01)",
  "Sadabahar Plan (Table 08)",
  "Child Education & Marriage (Table 12)",
  "Whole Life Protection (Table 03)",
  "Family Protection (Table 14)",
  "Health & Hospitalization Support",
  "Takaful / Sharia-Compliant Plans",
  "Claim Settlement Guidance",
  "Premium Payment & e-Polis Help",
  "General Consultation",
];

function validateForm(form: ContactForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Poora naam darj karein.";
  if (!cleanPhone(form.phone)) errors.phone = "Sahi phone number likhein (e.g. 0300-1234567).";
  if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Durust email address likhein.";
  if (!form.service) errors.service = "Plan ya service category select karein.";
  if (!form.consent) errors.consent = "Rabtay ke liye ijazat par tick karein.";
  return errors;
}

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const updateField = <Field extends keyof ContactForm>(field: Field, value: ContactForm[Field]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: form.name,
          phone: cleanPhone(form.phone),
          email: form.email || null,
          plan: form.service,
          message: form.message,
          consent: form.consent,
          website: form.website,
        }),
      });

      if (!response.ok) throw new Error("Contact request failed");
      setForm(initialForm);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#040914] text-white">
      {/* ── Ambient Luxury Prismatic Glows ── */}
      <div className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[650px] w-[650px] rounded-full bg-emerald-600/10 blur-[180px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-20 h-[600px] w-[600px] rounded-full bg-cyan-600/10 blur-[180px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/3 bottom-0 h-[450px] w-[500px] rounded-full bg-blue-600/10 blur-[170px]"
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

        {/* ── Header Section ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-10 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Top Minimalist Tracking Badge */}
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-emerald-400 backdrop-blur-md sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="truncate">
                STATE LIFE • SUKKUR AREA OFFICE {AREA_CODE}
              </span>
            </div>

            {/* Authoritative Editorial Headline */}
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Direct Advisory &amp;<br />
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-200 to-amber-200 bg-clip-text text-transparent">
                Executive Concierge
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base md:text-lg">
              Connect directly with State Life Sukkur Area Office for confidential consultations,
              policy reviews, official illustrations, and priority branch assistance.
            </p>
          </div>
        </section>

        {/* ── Main Split-Screen Architecture ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">

            {/* LEFT COLUMN: Executive Concierge & Verified Channels (Span 5) */}
            <div className="space-y-6 lg:col-span-5">

              {/* Instant WhatsApp Concierge Card */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Salam State Life Sukkur! Mujhe policy consultation aur guidance chahiye."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-3xl border border-emerald-500/30 bg-emerald-950/20 p-6 backdrop-blur-2xl transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-900/30 hover:shadow-xl hover:shadow-emerald-900/20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition group-hover:scale-105">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Instant Live Desk
                      </span>
                      <p className="mt-1 text-base font-bold text-white">WhatsApp Concierge</p>
                      <p className="font-mono text-xs text-slate-400">+92 317 0941821</p>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-emerald-400 transition group-hover:translate-x-1" />
                </div>
              </a>

              {/* Verified Contact Details Card */}
              <div className="space-y-4 rounded-3xl border border-white/[.08] bg-white/[.03] p-6 shadow-xl backdrop-blur-2xl sm:p-7">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Direct Official Hotlines
                  </span>
                  <span className="text-[10px] font-semibold uppercase text-slate-500">
                    Sukkur Office
                  </span>
                </div>

                {/* Mobile Hotline */}
                <a
                  href={telLink()}
                  className="group flex items-center gap-3.5 rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 transition hover:border-emerald-500/30 hover:bg-white/[0.05]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 transition group-hover:scale-105">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Direct Mobile Hotline
                    </p>
                    <p className="font-mono text-sm font-bold text-white">
                      {PHONE_DISPLAY}
                    </p>
                  </div>
                </a>

                {/* Landline */}
                <a
                  href={landlineLink()}
                  className="group flex items-center gap-3.5 rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 transition hover:border-blue-500/30 hover:bg-white/[0.05]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 transition group-hover:scale-105">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Sukkur Branch Landline
                    </p>
                    <p className="font-mono text-sm font-bold text-white">
                      {LANDLINE_NUMBER}
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={emailLink()}
                  className="group flex items-center gap-3.5 rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 transition hover:border-cyan-500/30 hover:bg-white/[0.05]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 transition group-hover:scale-105">
                    <Mail size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Official Correspondence
                    </p>
                    <p className="truncate text-xs font-semibold text-white">
                      {CONTACT_EMAIL}
                    </p>
                  </div>
                </a>

                {/* Physical Location & Visiting Hours */}
                <div className="space-y-2 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="mt-0.5 shrink-0 text-amber-400" />
                    <div>
                      <p className="text-xs font-bold text-white">
                        Sukkur Area Office {AREA_CODE}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        Station Road / Main Branch, Sukkur, Sindh
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-[11px] font-medium text-emerald-400">
                        <Clock size={14} />
                        <span>Mon – Fri, 9:00 AM – 5:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Area Manager Assurance Card with area-manager.jpg */}
              <div className="flex items-center gap-4 rounded-3xl border border-white/[.08] bg-white/[.03] p-4 backdrop-blur-2xl">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                  <Image
                    src="/area-manager.jpg"
                    alt={MANAGER_NAME}
                    fill
                    sizes="56px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{MANAGER_NAME}</p>
                  <p className="text-xs font-semibold text-emerald-400">
                    {MANAGER_TITLE} • Area Code {AREA_CODE}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    State Life Insurance Corporation of Pakistan
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Sovereign Consultation & Inquiry Form (Span 7) */}
            <div id="contact-form" className="scroll-mt-28 rounded-3xl border border-white/[.08] bg-white/[.035] p-7 shadow-2xl backdrop-blur-2xl sm:p-9 lg:col-span-7">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Confidential Desk
                </span>
                <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                  Request Policy Consultation
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                  Apni details darj karein. Hamara representative customized policy illustration
                  aur next steps ke sath direct rabta karega.
                </p>
              </div>

              {/* Status messages */}
              {status === "success" && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-300">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-400" />
                  <div>
                    <p className="text-sm font-bold">Shukriya! Enquiry recieve ho gayi hai.</p>
                    <p className="mt-1 text-xs text-emerald-200/90">
                      Sukkur Area Office team jald hi aap se official number par rabta karegi.
                    </p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
                  <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-400" />
                  <div>
                    <p className="text-sm font-bold">Form send nahi ho saka.</p>
                    <p className="mt-1 text-xs text-red-200/90">
                      Barah-e-karam dobara koshish karein ya direct WhatsApp par rabta karein.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
                {/* Honeypot field for anti-spam */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={(e) => updateField("website", e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Muhammad Ali"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-emerald-400 focus:bg-white/[0.07]"
                    />
                    {errors.name && (
                      <span className="mt-1 block text-xs text-red-400">{errors.name}</span>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="0300-1234567"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-emerald-400 focus:bg-white/[0.07]"
                    />
                    {errors.phone && (
                      <span className="mt-1 block text-xs text-red-400">{errors.phone}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Email */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="ali@example.com"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-emerald-400 focus:bg-white/[0.07]"
                    />
                    {errors.email && (
                      <span className="mt-1 block text-xs text-red-400">{errors.email}</span>
                    )}
                  </div>

                  {/* Service Interest Dropdown */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                      Plan / Inquiry Category *
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => updateField("service", e.target.value)}
                      className="h-12 w-full rounded-xl border border-white/10 bg-[#071324] px-4 text-sm text-white outline-none transition focus:border-emerald-400"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#071324] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <span className="mt-1 block text-xs text-red-400">{errors.service}</span>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Your Question / Financial Goal
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    placeholder="Aap kis coverage ya plan ke baray mein janna chahte hain?"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-emerald-400 focus:bg-white/[0.07]"
                  />
                </div>

                {/* Privacy Consent */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => updateField("consent", e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-400"
                    />
                    <span className="text-xs leading-relaxed text-slate-400">
                      Main State Life Sukkur Area Office representative ko official guidance aur rabtay ke liye consent deta hoon.
                    </span>
                  </label>
                  {errors.consent && (
                    <span className="mt-1 block text-xs text-red-400">{errors.consent}</span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-900/30 transition-all duration-200 hover:scale-[1.01] hover:from-emerald-500 hover:to-teal-400 disabled:opacity-60 cursor-pointer"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Consultation Request</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 pt-2 text-[11px] text-slate-500">
                  <Lock size={12} />
                  <span>100% Confidential • Official Government-Backed Assistance • Zero Obligation</span>
                </div>
              </form>
            </div>

          </div>
        </section>

        {/* ── Bottom High-Fashion Metrics Strip ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 rounded-2xl border border-white/[.08] bg-white/[.03] p-6 text-center backdrop-blur-xl sm:p-8 md:grid-cols-4">
            <div>
              <p className="text-2xl font-black text-white sm:text-4xl">5,000+</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Families Protected
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-400 sm:text-4xl">100%</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Sovereign Guarantee
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-cyan-300 sm:text-4xl">50+ Years</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                National Legacy
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-amber-300 sm:text-4xl">{AREA_CODE}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Dedicated Area Code
              </p>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="relative z-10 border-t border-white/10 px-4 py-8 text-xs text-slate-400 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p>State Life Insurance Corporation of Pakistan • Sukkur Area Office {AREA_CODE}</p>
            <div className="flex items-center gap-5">
              <Link href="/products" className="hover:text-white transition">Products</Link>
              <Link href="/services" className="hover:text-white transition">Services</Link>
              <Link href="/about" className="hover:text-white transition">About Us</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
