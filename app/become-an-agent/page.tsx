"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ShieldCheck,
  Award,
  Sparkles,
  TrendingUp,
  GraduationCap,
  Briefcase,
  Clock,
  ArrowRight,
  ArrowUpRight,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  Building2,
  Phone,
  Users,
} from "lucide-react";
import { cleanPhone } from "../../lib/phone";
import {
  AREA_CODE,
  MANAGER_NAME,
  MANAGER_TITLE,
  PHONE_DISPLAY,
  WHATSAPP_NUMBER,
  telLink,
} from "../../lib/contact";

const processSteps = [
  {
    step: "01",
    title: "Pre-Registration",
    detail: "Online pre-registration form submit karein ya direct Sukkur Area Office tashreef layein.",
  },
  {
    step: "02",
    title: "Form 01 & Verification",
    detail: "Attested CNIC, photographs aur educational certificates ke sath official Form 01 jama karwayein.",
  },
  {
    step: "03",
    title: "Area Manager Endorsement",
    detail: "Mr. Fayyaz Ahmed ki janib se initial briefing, career roadmapping aur recommendation.",
  },
  {
    step: "04",
    title: "Agent Code Allotment",
    detail: "Zonal Certification Committee se official government agent code number allotment.",
  },
];

const faqs = [
  {
    question: "Kya poori registration online ho sakti hai?",
    answer: "Online portal se aapki pre-registration ho jaati hai, jiske baad Sukkur Area Office 5405 mein zaroori dastavez ki attestation aur official Form 01 sign hota hai.",
  },
  {
    question: "Kaunse documents darkaar hain?",
    answer: "Attested CNIC copy, 4 adad passport-size photographs, aur educational certificates (Matric, Inter ya Graduation) ki attested copies darkaar hoti hain.",
  },
  {
    question: "Kya part-time ya student ke tor par join kar sakte hain?",
    answer: "Haan, State Life flexible working hours faraham karta hai. Students, job holders aur energetic youth apni availability ke mutabiq autonomous schedule par kaam kar sakte hain.",
  },
  {
    question: "Commission structure aur training ka kya procedure hai?",
    answer: "Sukkur Area Office 5405 aur Zonal Academy ki janib se complete professional sales training free faraham ki jaati hai, sath mein attractive commission aur performance bonuses milte hain.",
  },
];

type FormData = {
  name: string;
  phone: string;
  city: string;
  age: string;
  education: string;
  experience: string;
  contactTime: string;
  message: string;
  consent: boolean;
  website: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  name: "",
  phone: "",
  city: "",
  age: "",
  education: "Intermediate (FA / FSc / I.Com)",
  experience: "No prior experience (Fresh)",
  contactTime: "Morning (9:00 AM - 1:00 PM)",
  message: "",
  consent: true,
  website: "",
};

export default function BecomeAnAgentPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setStatus("idle");
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};
    if (!formData.name.trim()) nextErrors.name = "Poora naam likhein.";
    if (!cleanPhone(formData.phone)) nextErrors.phone = "Sahi phone number likhein (kam se kam 7 digits).";
    if (!formData.city.trim()) nextErrors.city = "Apna shehar / tehsil darj karein.";
    if (!formData.age.trim()) nextErrors.age = "Apni umar likhein.";
    if (!formData.education) nextErrors.education = "Taleem select karein.";
    if (!formData.consent) nextErrors.consent = "Ijazat lena zaroori hai.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "agent_prereg",
          name: formData.name,
          phone: cleanPhone(formData.phone),
          city: formData.city,
          age: formData.age,
          education: formData.education,
          experience: formData.experience,
          best_time: formData.contactTime,
          message: formData.message,
          consent: formData.consent,
          website: formData.website,
        }),
      });

      if (!response.ok) throw new Error("Lead submission failed.");
      setFormData(initialForm);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen" style={{ background: 'var(--page-bg)', color: 'var(--foreground)' }}>
      {/* ── Ambient Modern Prismatic Halos ── */}
      <div className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full bg-emerald-500/[.12] blur-[170px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-20 h-[650px] w-[650px] rounded-full bg-cyan-500/[.12] blur-[170px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/3 bottom-10 h-[500px] w-[500px] rounded-full bg-blue-600/[.08] blur-[160px]"
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
            {/* Tracking Badge */}
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-300 backdrop-blur-md sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="truncate">
                STATE LIFE • SUKKUR AREA OFFICE {AREA_CODE} • CAREER DESK
              </span>
            </div>

            {/* Authoritative Modern Headline */}
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Build a Prestigious Career in<br />
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-200 to-amber-200 bg-clip-text text-transparent">
                Sovereign Financial Advisory
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base md:text-lg">
              Pakistan ke sab se baray aur qabil-e-etemad idaray ka hissa banein. Unlimited earning
              potential, professional corporate training, aur Sukkur Zone mein sovereign pehchan.
            </p>
          </div>
        </section>

        {/* ── Split-Screen Architecture ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">

            {/* LEFT COLUMN: 4 Advantages & Executive Mentorship (Span 5) */}
            <div className="space-y-6 lg:col-span-5">

              {/* 4 Advantage Pillars Card */}
              <div className="rounded-3xl border border-white/[.08] bg-white/[.03] p-6 shadow-2xl backdrop-blur-2xl sm:p-7 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Career Advantages
                  </span>
                  <span className="text-[10px] font-semibold uppercase text-slate-500">
                    Sukkur Area {AREA_CODE}
                  </span>
                </div>

                {/* Advantage 01 */}
                <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-emerald-500/30 hover:bg-white/[0.04]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 font-mono text-sm font-bold text-emerald-400">
                    01
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Unlimited Earning Potential</h2>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">
                      Attractive commission structures, annual performance bonuses, aur car/travel incentive schemes.
                    </p>
                  </div>
                </div>

                {/* Advantage 02 */}
                <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-cyan-500/30 hover:bg-white/[0.04]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 font-mono text-sm font-bold text-cyan-400">
                    02
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Professional Training &amp; Mentorship</h2>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">
                      State Life Zonal Academy aur Area Manager Fayyaz Ahmed ki direct supervision mein complete sales training.
                    </p>
                  </div>
                </div>

                {/* Advantage 03 */}
                <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-amber-500/30 hover:bg-white/[0.04]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 font-mono text-sm font-bold text-amber-400">
                    03
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Official Government Agent Code</h2>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">
                      State Life Insurance Act ke tehat legal registration, official code allotment, aur sovereign izzat.
                    </p>
                  </div>
                </div>

                {/* Advantage 04 */}
                <div className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-purple-500/30 hover:bg-white/[0.04]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 font-mono text-sm font-bold text-purple-400">
                    04
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Autonomous Working Flexibility</h2>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">
                      Apna schedule khud tay karein. Full-time professionals ya ambitious youth ke liye ideal career.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Zonal Mentorship Card with area-manager.jpg */}
              <div className="flex items-center gap-4 rounded-3xl border border-emerald-500/25 bg-emerald-950/15 p-5 backdrop-blur-2xl">
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
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Direct Zonal Mentorship
                  </span>
                  <p className="text-sm font-bold text-white">{MANAGER_NAME}</p>
                  <p className="text-xs text-slate-400">
                    {MANAGER_TITLE} • Sukkur Area Office {AREA_CODE}
                  </p>
                </div>
              </div>

              {/* Instant WhatsApp Career Help Action */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Salam Mr. Fayyaz Ahmed! Main State Life Sukkur mein Insurance Agent / Financial Advisor banne ke baray mein rehnumai chahta hoon."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-900/30 hover:shadow-xl hover:shadow-emerald-900/20"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/30 transition group-hover:scale-105">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Ask Career Questions on WhatsApp</p>
                    <p className="font-mono text-[11px] text-emerald-400">+92 317 0941821</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-emerald-400 transition group-hover:translate-x-1" />
              </a>

            </div>

            {/* RIGHT COLUMN: Advisor Pre-Registration Desk Form (Span 7) */}
            <div className="rounded-3xl border border-white/[.08] bg-white/[.035] p-7 shadow-2xl backdrop-blur-2xl sm:p-9 lg:col-span-7">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Application Portal
                </span>
                <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                  Advisor Pre-Registration Desk
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                  Apni basic information darj karein. Sukkur Area Office 5405 recruitment team
                  official documentation (Form 01) aur interview ke liye rabta karegi.
                </p>
              </div>

              {/* Status Alert Messages */}
              {status === "success" && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-300">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-400" />
                  <div>
                    <p className="text-sm font-bold">Pre-registration kamyabi se submit ho gayi!</p>
                    <p className="mt-1 text-xs text-emerald-200/90">
                      Sukkur Area Office 5405 team aapse foran rabta karke Form 01 aur next steps samjhayegi.
                    </p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
                  <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-400" />
                  <div>
                    <p className="text-sm font-bold">Registration submit nahi ho saki.</p>
                    <p className="mt-1 text-xs text-red-200/90">
                      Barah-e-karam dobara koshish karein ya direct WhatsApp desk par rabta karein.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
                {/* Honeypot field */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={(e) => handleChange("website", e.target.value)}
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
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
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
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="0300-1234567"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-emerald-400 focus:bg-white/[0.07]"
                    />
                    {errors.phone && (
                      <span className="mt-1 block text-xs text-red-400">{errors.phone}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* City */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                      City / Tehsil *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      placeholder="Sukkur / Rohri / Khairpur"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-emerald-400 focus:bg-white/[0.07]"
                    />
                    {errors.city && (
                      <span className="mt-1 block text-xs text-red-400">{errors.city}</span>
                    )}
                  </div>

                  {/* Age */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                      Your Age (Years) *
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleChange("age", e.target.value)}
                      placeholder="25"
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-emerald-400 focus:bg-white/[0.07]"
                    />
                    {errors.age && (
                      <span className="mt-1 block text-xs text-red-400">{errors.age}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Education */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                      Education Level *
                    </label>
                    <select
                      value={formData.education}
                      onChange={(e) => handleChange("education", e.target.value)}
                      className="h-12 w-full rounded-xl border border-white/10 bg-[#071324] px-4 text-sm text-white outline-none transition focus:border-emerald-400"
                    >
                      <option className="bg-[#071324]">Intermediate (FA / FSc / I.Com)</option>
                      <option className="bg-[#071324]">Graduation (BA / BSc / B.Com / BS)</option>
                      <option className="bg-[#071324]">Master&apos;s (MA / MSc / MBA)</option>
                      <option className="bg-[#071324]">Matriculation</option>
                    </select>
                  </div>

                  {/* Prior Experience */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                      Sales / Insurance Experience
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => handleChange("experience", e.target.value)}
                      className="h-12 w-full rounded-xl border border-white/10 bg-[#071324] px-4 text-sm text-white outline-none transition focus:border-emerald-400"
                    >
                      <option className="bg-[#071324]">No prior experience (Fresh)</option>
                      <option className="bg-[#071324]">1 - 2 Years in Sales / Banking</option>
                      <option className="bg-[#071324]">3+ Years in Insurance / Marketing</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Contact Time */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Preferred Time to Contact
                  </label>
                  <select
                    value={formData.contactTime}
                    onChange={(e) => handleChange("contactTime", e.target.value)}
                    className="h-12 w-full rounded-xl border border-white/10 bg-[#071324] px-4 text-sm text-white outline-none transition focus:border-emerald-400"
                  >
                    <option className="bg-[#071324]">Morning (9:00 AM - 1:00 PM)</option>
                    <option className="bg-[#071324]">Afternoon (1:00 PM - 5:00 PM)</option>
                    <option className="bg-[#071324]">Evening (After 5:00 PM)</option>
                  </select>
                </div>

                {/* Message / Motivation */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Why do you want to join State Life? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Apna background aur career ambitions share karein..."
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-emerald-400 focus:bg-white/[0.07]"
                  />
                </div>

                {/* Consent */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => handleChange("consent", e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-400"
                    />
                    <span className="text-xs leading-relaxed text-slate-400">
                      Main tasdeeq karta hoon ke di gayi maloomat sahi hain aur State Life recruitment team ke rabtay ki ijazat deta hoon.
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
                    disabled={status === "submitting"}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-900/30 transition-all duration-200 hover:scale-[1.01] hover:from-emerald-500 hover:to-teal-400 disabled:opacity-60 cursor-pointer"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Pre-Registration</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-center text-slate-500 pt-2">
                  🏛️ Official State Life Corporation Recruitment • Sukkur Area Office {AREA_CODE}
                </p>
              </form>
            </div>

          </div>
        </section>

        {/* ── 4-Step Onboarding Roadmap ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/[.08] bg-white/[.03] p-8 sm:p-12 backdrop-blur-2xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                The Roadmap
              </span>
              <h2 className="mt-1 text-2xl font-black text-white sm:text-4xl">
                4-Step Onboarding Process
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                Application submission se lekar official government agent code number allotment tak ka clear process:
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition hover:border-emerald-500/30 hover:bg-white/[0.04]"
                >
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    STEP {step.step}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQs Accordion Section ── */}
        <section className="relative z-10 mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Common Questions
            </span>
            <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
              Career &amp; Recruitment FAQs
            </h2>
          </div>

          <div className="mt-8 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-white/[.08] bg-white/[.03] transition backdrop-blur-xl"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-white transition hover:text-emerald-300"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-emerald-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/5 px-5 pb-5 pt-2 text-xs leading-relaxed text-slate-400">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Bottom High-Fashion Metrics Strip ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 rounded-2xl border border-white/[.08] bg-white/[.03] p-6 text-center backdrop-blur-xl sm:p-8 md:grid-cols-4">
            <div>
              <p className="text-2xl font-black text-white sm:text-4xl">100%</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Sovereign Institution
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-400 sm:text-4xl">50+ Years</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                National Legacy
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-cyan-300 sm:text-4xl">{AREA_CODE}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Sukkur Area Code
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-amber-300 sm:text-4xl">Direct</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Executive Mentorship
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
              <Link href="/contact" className="hover:text-white transition">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
