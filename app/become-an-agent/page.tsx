"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { cleanPhone } from "../../lib/phone";
import {
  AREA_CODE,
  MANAGER_NAME,
  MANAGER_TITLE,
  WHATSAPP_NUMBER,
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
    if (!formData.city.trim()) nextErrors.city = "City ya tehsil ka naam likhein.";
    if (!formData.age.trim()) nextErrors.age = "Apni umar likhein.";
    else if (Number(formData.age) < 18 || Number(formData.age) > 65) {
      nextErrors.age = "Umar 18 aur 65 saal ke darmian honi chahiye.";
    }
    if (!formData.consent) nextErrors.consent = "Aage barhne ke liye consent zaroori hai.";
    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website) return;

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "career_inquiry",
          name: formData.name,
          phone: cleanPhone(formData.phone),
          city: formData.city,
          age: formData.age,
          education: formData.education,
          experience: formData.experience,
          preferred_time: formData.contactTime,
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

        {/* ── Header Section ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-10 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Tracking Eyebrow Badge */}
            <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-[#d7b875]/35 bg-[#0c0d0e]/80 px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] uppercase text-[#e2cca0] shadow-[0_2px_12px_rgba(0,0,0,0.4)] backdrop-blur-md sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d7b875] shadow-[0_0_10px_rgba(215,184,117,0.8)]" />
              <span className="truncate">
                STATE LIFE • SUKKUR AREA OFFICE {AREA_CODE} • CAREER DESK
              </span>
            </div>

            {/* Authoritative Serif Headline matching Home Page */}
            <h1
              className="mt-6 text-3xl sm:text-5xl lg:text-6xl text-[#f7f4ed] tracking-normal"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400 }}
            >
              Build a Prestigious Career in<br />
              <span className="text-[#d7b875] italic sm:not-italic">
                Sovereign Financial Advisory
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#a6a6a1] sm:text-base md:text-lg">
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
              <div className="rounded-3xl border border-white/[0.12] bg-[#121314]/90 p-6 shadow-[0_12px_38px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-7 space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d7b875]">
                    Career Advantages
                  </span>
                  <span className="text-[10px] font-semibold uppercase text-[#aaa9a3]">
                    Sukkur Area {AREA_CODE}
                  </span>
                </div>

                {/* Advantage 01 */}
                <div className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition hover:border-[#d7b875]/50 hover:bg-white/[0.04]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d7b875]/30 bg-[#d7b875]/10 font-serif text-sm font-bold text-[#e8d5a4]">
                    01
                  </div>
                  <div>
                    <h2
                      className="text-sm font-semibold text-[#f5f2ea]"
                      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                    >
                      Unlimited Earning Potential
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-[#aaa9a3]">
                      Attractive commission structures, annual performance bonuses, aur car/travel incentive schemes.
                    </p>
                  </div>
                </div>

                {/* Advantage 02 */}
                <div className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition hover:border-[#d7b875]/50 hover:bg-white/[0.04]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d7b875]/30 bg-[#d7b875]/10 font-serif text-sm font-bold text-[#e8d5a4]">
                    02
                  </div>
                  <div>
                    <h2
                      className="text-sm font-semibold text-[#f5f2ea]"
                      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                    >
                      Professional Training &amp; Mentorship
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-[#aaa9a3]">
                      State Life Zonal Academy aur Area Manager Fayyaz Ahmed ki direct supervision mein complete sales training.
                    </p>
                  </div>
                </div>

                {/* Advantage 03 */}
                <div className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition hover:border-[#d7b875]/50 hover:bg-white/[0.04]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d7b875]/30 bg-[#d7b875]/10 font-serif text-sm font-bold text-[#e8d5a4]">
                    03
                  </div>
                  <div>
                    <h2
                      className="text-sm font-semibold text-[#f5f2ea]"
                      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                    >
                      Official Government Agent Code
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-[#aaa9a3]">
                      State Life Insurance Act ke tehat legal registration, official code allotment, aur sovereign izzat.
                    </p>
                  </div>
                </div>

                {/* Advantage 04 */}
                <div className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition hover:border-[#d7b875]/50 hover:bg-white/[0.04]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d7b875]/30 bg-[#d7b875]/10 font-serif text-sm font-bold text-[#e8d5a4]">
                    04
                  </div>
                  <div>
                    <h2
                      className="text-sm font-semibold text-[#f5f2ea]"
                      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                    >
                      Autonomous Working Flexibility
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-[#aaa9a3]">
                      Apna schedule khud tay karein. Full-time professionals ya ambitious youth ke liye ideal career.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Zonal Mentorship Card */}
              <div className="flex items-center gap-4 rounded-3xl border border-[#d7b875]/30 bg-[#121314]/90 p-5 backdrop-blur-2xl">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-[#d7b875]/30 bg-black">
                  <Image
                    src="/area-manager.jpg"
                    alt={MANAGER_NAME}
                    fill
                    sizes="56px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#d7b875]">
                    Direct Zonal Mentorship
                  </span>
                  <p
                    className="text-sm font-semibold text-[#f5f2ea]"
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                  >
                    {MANAGER_NAME}
                  </p>
                  <p className="text-xs text-[#aaa9a3]">
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
                className="group flex items-center justify-between rounded-2xl border border-[#d7b875]/60 bg-[#d7b875]/10 p-4 transition-all duration-300 hover:bg-[#d7b875] hover:text-[#0c0d0e] hover:shadow-[0_4px_20px_rgba(215,184,117,0.3)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d7b875] text-[#0c0d0e] shadow-md transition group-hover:scale-105">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#f5f2ea] group-hover:text-[#0c0d0e]">Ask Career Questions on WhatsApp</p>
                    <p className="font-mono text-[11px] text-[#e6d3a6] group-hover:text-[#0c0d0e]">+92 317 0941821</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-[#d7b875] transition group-hover:translate-x-1 group-hover:text-[#0c0d0e]" />
              </a>

            </div>

            {/* RIGHT COLUMN: Advisor Pre-Registration Desk Form (Span 7) */}
            <div className="rounded-3xl border border-white/[0.12] bg-[#121314]/90 p-7 shadow-[0_12px_38px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-9 lg:col-span-7">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#d7b875]">
                  Application Portal
                </span>
                <h2
                  className="mt-1 text-2xl sm:text-3xl font-normal text-[#f5f2ea]"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  Advisor Pre-Registration Desk
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-[#aaa9a3] sm:text-sm">
                  Apni basic information darj karein. Sukkur Area Office 5405 recruitment team
                  official documentation (Form 01) aur interview ke liye rabta karegi.
                </p>
              </div>

              {/* Status Alert Messages */}
              {status === "success" && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#d7b875]/40 bg-[#d7b875]/10 p-4 text-[#ecd9aa]">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#d7b875]" />
                  <div>
                    <p className="text-sm font-bold">Pre-registration kamyabi se submit ho gayi!</p>
                    <p className="mt-1 text-xs text-[#d6d2c7]">
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
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#d6d2c7]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Muhammad Ali"
                      className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm text-[#f7f4ed] placeholder-[#7a7974] outline-none transition focus:border-[#d7b875] focus:bg-[#181918] focus:ring-1 focus:ring-[#d7b875]/50"
                    />
                    {errors.name && (
                      <span className="mt-1 block text-xs text-red-400">{errors.name}</span>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#d6d2c7]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="0300-1234567"
                      className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm text-[#f7f4ed] placeholder-[#7a7974] outline-none transition focus:border-[#d7b875] focus:bg-[#181918] focus:ring-1 focus:ring-[#d7b875]/50"
                    />
                    {errors.phone && (
                      <span className="mt-1 block text-xs text-red-400">{errors.phone}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* City */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#d6d2c7]">
                      City / Tehsil *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      placeholder="Sukkur / Rohri / Khairpur"
                      className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm text-[#f7f4ed] placeholder-[#7a7974] outline-none transition focus:border-[#d7b875] focus:bg-[#181918] focus:ring-1 focus:ring-[#d7b875]/50"
                    />
                    {errors.city && (
                      <span className="mt-1 block text-xs text-red-400">{errors.city}</span>
                    )}
                  </div>

                  {/* Age */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#d6d2c7]">
                      Your Age (Years) *
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleChange("age", e.target.value)}
                      placeholder="25"
                      className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-sm text-[#f7f4ed] placeholder-[#7a7974] outline-none transition focus:border-[#d7b875] focus:bg-[#181918] focus:ring-1 focus:ring-[#d7b875]/50"
                    />
                    {errors.age && (
                      <span className="mt-1 block text-xs text-red-400">{errors.age}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Education */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#d6d2c7]">
                      Education Level *
                    </label>
                    <select
                      value={formData.education}
                      onChange={(e) => handleChange("education", e.target.value)}
                      className="h-12 w-full rounded-xl border border-white/15 bg-[#141514] px-4 text-sm text-[#f7f4ed] outline-none transition focus:border-[#d7b875]"
                    >
                      <option className="bg-[#141514]">Intermediate (FA / FSc / I.Com)</option>
                      <option className="bg-[#141514]">Graduation (BA / BSc / B.Com / BS)</option>
                      <option className="bg-[#141514]">Master&apos;s (MA / MSc / MBA)</option>
                      <option className="bg-[#141514]">Matriculation</option>
                    </select>
                  </div>

                  {/* Prior Experience */}
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#d6d2c7]">
                      Sales / Insurance Experience
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => handleChange("experience", e.target.value)}
                      className="h-12 w-full rounded-xl border border-white/15 bg-[#141514] px-4 text-sm text-[#f7f4ed] outline-none transition focus:border-[#d7b875]"
                    >
                      <option className="bg-[#141514]">No prior experience (Fresh)</option>
                      <option className="bg-[#141514]">1 - 2 Years in Sales / Banking</option>
                      <option className="bg-[#141514]">3+ Years in Insurance / Marketing</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Contact Time */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#d6d2c7]">
                    Preferred Time to Contact
                  </label>
                  <select
                    value={formData.contactTime}
                    onChange={(e) => handleChange("contactTime", e.target.value)}
                    className="h-12 w-full rounded-xl border border-white/15 bg-[#141514] px-4 text-sm text-[#f7f4ed] outline-none transition focus:border-[#d7b875]"
                  >
                    <option className="bg-[#141514]">Morning (9:00 AM - 1:00 PM)</option>
                    <option className="bg-[#141514]">Afternoon (1:00 PM - 5:00 PM)</option>
                    <option className="bg-[#141514]">Evening (After 5:00 PM)</option>
                  </select>
                </div>

                {/* Message / Motivation */}
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#d6d2c7]">
                    Why do you want to join State Life? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Apna background aur career ambitions share karein..."
                    className="w-full rounded-xl border border-white/15 bg-white/[0.04] p-4 text-sm text-[#f7f4ed] placeholder-[#7a7974] outline-none transition focus:border-[#d7b875] focus:bg-[#181918] focus:ring-1 focus:ring-[#d7b875]/50"
                  />
                </div>

                {/* Consent */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) => handleChange("consent", e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 accent-[#d7b875]"
                    />
                    <span className="text-xs leading-relaxed text-[#aaa9a3]">
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
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d7b875] py-4 text-xs font-bold uppercase tracking-wider text-[#0c0d0e] shadow-lg shadow-[#d7b875]/20 transition-all duration-200 hover:bg-[#e6cca0] hover:scale-[1.01] disabled:opacity-60 cursor-pointer"
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

                <p className="text-[11px] text-center text-[#898984] pt-2">
                  🏛️ Official State Life Corporation Recruitment • Sukkur Area Office {AREA_CODE}
                </p>
              </form>
            </div>

          </div>
        </section>

        {/* ── 4-Step Onboarding Roadmap ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/[0.12] bg-[#121314]/90 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_12px_38px_rgba(0,0,0,0.35)]">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d7b875]">
                The Roadmap
              </span>
              <h2
                className="mt-1 text-2xl sm:text-4xl font-normal text-[#f5f2ea]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                4-Step Onboarding Process
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-[#aaa9a3] sm:text-sm">
                Application submission se lekar official government agent code number allotment tak ka clear process:
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition hover:border-[#d7b875]/50 hover:bg-white/[0.04]"
                >
                  <span className="font-serif text-xs font-bold text-[#d7b875]">
                    STEP {step.step}
                  </span>
                  <h3
                    className="mt-2 text-base font-semibold text-[#f5f2ea]"
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#aaa9a3]">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQs Accordion Section ── */}
        <section className="relative z-10 mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d7b875]">
              Common Questions
            </span>
            <h2
              className="mt-1 text-2xl sm:text-3xl font-normal text-[#f5f2ea]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Career &amp; Recruitment FAQs
            </h2>
          </div>

          <div className="mt-8 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-white/[0.1] bg-[#121314]/90 transition backdrop-blur-xl hover:border-[#d7b875]/40"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-[#f5f2ea] transition hover:text-[#d7b875]"
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[#d7b875] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/[0.08] px-5 pb-5 pt-2 text-xs leading-relaxed text-[#aaa9a3]">
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
          <div className="grid grid-cols-2 gap-6 rounded-2xl border border-white/[0.1] bg-[#121314]/90 p-6 text-center backdrop-blur-xl sm:p-8 md:grid-cols-4 shadow-[0_12px_38px_rgba(0,0,0,0.35)]">
            <div>
              <p
                className="text-2xl sm:text-4xl font-normal text-[#d7b875]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                100%
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#aaa9a3]">
                Sovereign Institution
              </p>
            </div>
            <div>
              <p
                className="text-2xl sm:text-4xl font-normal text-[#d7b875]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                50+ Years
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#aaa9a3]">
                National Legacy
              </p>
            </div>
            <div>
              <p
                className="text-2xl sm:text-4xl font-normal text-[#d7b875]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                {AREA_CODE}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#aaa9a3]">
                Sukkur Area Code
              </p>
            </div>
            <div>
              <p
                className="text-2xl sm:text-4xl font-normal text-[#d7b875]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                Direct
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#aaa9a3]">
                Executive Mentorship
              </p>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="relative z-10 border-t border-white/10 px-4 py-8 text-xs text-[#aaa9a3] sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p>State Life Insurance Corporation of Pakistan • Sukkur Area Office {AREA_CODE}</p>
            <div className="flex items-center gap-5">
              <Link href="/products" className="hover:text-[#d7b875] transition">Products</Link>
              <Link href="/services" className="hover:text-[#d7b875] transition">Services</Link>
              <Link href="/about" className="hover:text-[#d7b875] transition">About Us</Link>
              <Link href="/contact" className="hover:text-[#d7b875] transition">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
