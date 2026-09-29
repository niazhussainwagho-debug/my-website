"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { WHATSAPP_NUMBER } from "../lib/contact";

const heroPhrases = [
  "Aapki Family Ka Mustaqbil Mehfooz",
  "Bachon Ki Taleem Aur Shadi Ke Liye Mehfooz Bachat",
  "Retirement Aur Sehat Ki Mukammal Protection",
];

type HeroProps = {
  policyGoals: string[];
  policySearch: string;
  onPolicySearchChange: (value: string) => void;
  policyFilter: string;
  onPolicyFilterChange: (value: string) => void;
};

export default function Hero({
  policyGoals,
  policySearch,
  onPolicySearchChange,
  policyFilter,
  onPolicyFilterChange,
}: HeroProps) {
  const [displayedText, setDisplayedText] = useState(heroPhrases[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let phraseIndex = 0;
    let displayedLength = heroPhrases[phraseIndex].length;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const phrase = heroPhrases[phraseIndex];

      if (deleting) {
        displayedLength = Math.max(0, displayedLength - 1);
        setDisplayedText(phrase.slice(0, displayedLength));

        if (displayedLength === 0) {
          phraseIndex = (phraseIndex + 1) % heroPhrases.length;
          deleting = false;
          timer = window.setTimeout(tick, 100);
        } else {
          timer = window.setTimeout(tick, 55);
        }
        return;
      }

      displayedLength = Math.min(phrase.length, displayedLength + 1);
      setDisplayedText(phrase.slice(0, displayedLength));

      if (displayedLength === phrase.length) {
        deleting = true;
        timer = window.setTimeout(tick, 4500);
      } else {
        timer = window.setTimeout(tick, 110);
      }
    };

    timer = window.setTimeout(() => {
      deleting = true;
      tick();
    }, 4500);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="scroll-mt-20 lg:scroll-mt-24 relative isolate min-h-[85vh] w-full max-w-full overflow-hidden bg-cover bg-center text-white">
      {/* Background Image & Gradient Mesh */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/products/family.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-blue-950/75"
      />

      <ScrollReveal className="relative z-10 mx-auto flex min-h-[85vh] w-full max-w-7xl items-center px-4 pt-8 pb-16 sm:px-6 sm:pt-12 sm:pb-20 lg:px-8">
        <div className="min-w-0 w-full max-w-3xl">
          {/* Official Branch Trust Pill */}
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100/30 bg-emerald-950/40 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-50 backdrop-blur-sm">
            <ShieldCheck size={15} aria-hidden="true" /> SUKKUR AREA OFFICE 5405
          </span>

          {/* Dynamic Headline with Premium Contrast */}
          <h1
            aria-label={heroPhrases[0]}
            aria-live="off"
            className="mt-5 min-h-[2.4em] max-w-3xl text-3xl font-black leading-[1.12] tracking-tight sm:min-h-[2.2em] sm:text-5xl md:min-h-[2.6em] md:text-6xl text-white"
          >
            {displayedText}
            <span
              aria-hidden="true"
              className="ml-1 inline-block h-[0.82em] border-r-3 border-emerald-400 align-[-0.06em] motion-safe:animate-pulse"
            />
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-100 sm:text-lg">
            Family ke mustaqbil ke liye State Life plans samjhein, aur hamari Sukkur team se mahirana rehnumai hasil karein.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="mt-8 flex min-w-0 flex-wrap items-center gap-3.5">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 px-7 py-3 text-sm sm:text-base font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-800 hover:to-blue-600 hover:shadow-xl hover:shadow-blue-600/40"
            >
              Free Consultation <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/60 px-7 py-3 text-sm sm:text-base font-bold text-emerald-200 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-900/80 hover:text-white hover:border-emerald-300 shadow-md shadow-emerald-950/30"
            >
              WhatsApp Us
            </a>
          </div>

          {/* Interactive Policy Goal Quick-Matcher Card */}
          <div className="mt-10 hidden w-full max-w-full min-w-0 flex-col gap-3 rounded-2xl border border-white/20 bg-slate-900/70 p-4 sm:p-5 backdrop-blur-xl shadow-2xl md:flex sm:flex-row sm:items-end">
            <div className="w-full min-w-0 sm:flex-1">
              <label htmlFor="policy-search" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-200">
                Search Policy Goal
              </label>
              <input
                id="policy-search"
                type="search"
                value={policySearch}
                onChange={(event) => onPolicySearchChange(event.target.value)}
                placeholder="Search education, health, family..."
                className="h-11 w-full min-w-0 rounded-xl border border-white/30 bg-white/95 px-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-400/30"
              />
            </div>
            <div className="w-full min-w-0 sm:flex-1">
              <label htmlFor="policy-filter" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-200">
                Choose Category
              </label>
              <select
                id="policy-filter"
                value={policyFilter}
                onChange={(event) => onPolicyFilterChange(event.target.value)}
                className="h-11 w-full min-w-0 rounded-xl border border-white/30 bg-white/95 px-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-400/30"
              >
                <option>All goals</option>
                {policyGoals.map((goal) => (
                  <option key={goal}>{goal}</option>
                ))}
              </select>
            </div>
            <a
              href="#policies"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-700/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-800 hover:to-blue-700 sm:w-auto"
            >
              Explore Plans <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          {/* Quick Trust Badges Strip */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              100% Federal Govt. Guarantee
            </span>
            <span className="text-slate-600">•</span>
            <span>5,000+ Sukkur Policies</span>
            <span className="text-slate-600">•</span>
            <span>Fast Claims Guidance</span>
            <span className="text-slate-600">•</span>
            <span>Sukkur Dedicated Desk</span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}