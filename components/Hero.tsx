"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { WHATSAPP_NUMBER } from "../lib/contact";
import { useLanguage } from "../context/LanguageContext";

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
  const { t, isRTL } = useLanguage();
  const heroPhrases = t.heroPhrases;
  const [displayedText, setDisplayedText] = useState(heroPhrases[0]);

  // Reset displayed text whenever language changes
  useEffect(() => {
    setDisplayedText(heroPhrases[0]);
  }, [heroPhrases]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let phraseIndex = 0;
    let displayedLength = heroPhrases[phraseIndex]?.length || 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const phrase = heroPhrases[phraseIndex] || heroPhrases[0];

      if (deleting) {
        displayedLength = Math.max(0, displayedLength - 1);
        setDisplayedText(phrase.slice(0, displayedLength));

        if (displayedLength === 0) {
          phraseIndex = (phraseIndex + 1) % heroPhrases.length;
          deleting = false;
          timer = window.setTimeout(tick, 100);
        } else {
          timer = window.setTimeout(tick, 50);
        }
        return;
      }

      displayedLength = Math.min(phrase.length, displayedLength + 1);
      setDisplayedText(phrase.slice(0, displayedLength));

      if (displayedLength === phrase.length) {
        deleting = true;
        timer = window.setTimeout(tick, 4500);
      } else {
        timer = window.setTimeout(tick, 90);
      }
    };

    timer = window.setTimeout(() => {
      deleting = true;
      tick();
    }, 4500);

    return () => window.clearTimeout(timer);
  }, [heroPhrases]);

  return (
    <section id="home" className="scroll-mt-24 relative isolate min-h-[85vh] w-full max-w-full overflow-hidden bg-[#061224] text-white">
      {/* Ambient background glow from demo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-blue-600/25 blur-[120px]"
      />

      {/* Right-side family imagery matching approved demo */}
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 bottom-0 z-0 h-full w-full lg:w-[56%] overflow-hidden">
        <Image
          src="/products/family.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 56vw"
          className="object-cover object-center lg:object-[center_20%]"
        />
        {/* Soft edge blend overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061224] via-[#061224]/75 to-transparent lg:from-[#061224] lg:via-[#061224]/30 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061224] via-transparent to-transparent opacity-85" />
      </div>

      <ScrollReveal className="relative z-10 mx-auto flex min-h-[85vh] w-full max-w-7xl items-center px-4 pt-10 pb-16 sm:px-6 sm:pt-14 sm:pb-20 lg:px-8">
        <div className="min-w-0 w-full max-w-3xl lg:max-w-2xl">
          {/* Official Branch Trust Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md">
            <ShieldCheck size={15} aria-hidden="true" />
            <span>{t.heroBadge}</span>
          </div>

          {/* Dynamic Headline matching approved demo */}
          <h1
            aria-label={heroPhrases[0]}
            aria-live="off"
            className="mt-5 min-h-[2.4em] max-w-3xl text-3xl font-black leading-[1.25] tracking-tight sm:min-h-[2.2em] sm:text-5xl md:min-h-[2.6em] md:text-6xl text-white"
          >
            {displayedText}
            <span
              aria-hidden="true"
              className="ml-1 rtl:mr-1 rtl:ml-0 inline-block h-[0.82em] border-r-3 rtl:border-l-3 rtl:border-r-0 border-emerald-400 align-[-0.06em] motion-safe:animate-pulse"
            />
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
            {t.heroSubtitle}
          </p>

          {/* Call-to-Action Buttons */}
          <div className="mt-8 flex min-w-0 flex-wrap items-center gap-3.5">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 px-7 py-3 text-sm sm:text-base font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/40"
            >
              {t.heroConsultBtn} <ArrowRight size={17} aria-hidden="true" className="rtl:rotate-180" />
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#108A5E] hover:bg-[#0D734E] px-7 py-3 text-sm sm:text-base font-bold text-white shadow-lg shadow-emerald-700/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-600/40"
            >
              {t.heroWhatsappBtn}
            </a>
          </div>

          {/* Interactive Policy Goal Quick-Matcher Card */}
          <div className="mt-9 flex w-full max-w-full min-w-0 flex-col gap-3 rounded-2xl border border-white/20 bg-slate-900/70 p-4 sm:p-5 backdrop-blur-xl shadow-2xl sm:flex-row sm:items-end">
            <div className="w-full min-w-0 sm:flex-1">
              <label htmlFor="policy-search" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-200">
                {t.heroSearchLabel}
              </label>
              <input
                id="policy-search"
                type="search"
                value={policySearch}
                onChange={(event) => onPolicySearchChange(event.target.value)}
                placeholder={t.heroSearchPlaceholder}
                className="h-11 w-full min-w-0 rounded-xl border border-white/30 bg-white/95 px-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-400/30"
              />
            </div>
            <div className="w-full min-w-0 sm:flex-1">
              <label htmlFor="policy-filter" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-200">
                {t.heroFilterLabel}
              </label>
              <select
                id="policy-filter"
                value={policyFilter}
                onChange={(event) => onPolicyFilterChange(event.target.value)}
                className="h-11 w-full min-w-0 rounded-xl border border-white/30 bg-white/95 px-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-400/30"
              >
                <option>{t.heroFilterAll}</option>
                {policyGoals.map((goal) => (
                  <option key={goal}>{goal}</option>
                ))}
              </select>
            </div>
            <a
              href="#policies"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-700/30 transition-all duration-200 hover:-translate-y-0.5 sm:w-auto"
            >
              {t.heroExploreBtn} <ArrowUpRight size={16} aria-hidden="true" className="rtl:rotate-270" />
            </a>
          </div>

          {/* Quick Trust Badges matching demo */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-200">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-xs">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>{t.heroPillGovt}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-xs">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>{t.heroPillPolicies}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-xs">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>{t.heroPillClaims}</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}