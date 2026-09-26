"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
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
          timer = window.setTimeout(tick, 15);
        }
        return;
      }

      displayedLength = Math.min(phrase.length, displayedLength + 1);
      setDisplayedText(phrase.slice(0, displayedLength));

      if (displayedLength === phrase.length) {
        deleting = true;
        timer = window.setTimeout(tick, 2400);
      } else {
        timer = window.setTimeout(tick, 30);
      }
    };

    timer = window.setTimeout(() => {
      deleting = true;
      tick();
    }, 4500);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative isolate min-h-[85vh] w-full overflow-hidden bg-cover bg-center text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/products/family.png"
          alt=""
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 z-0 bg-linear-to-r from-slate-950/85 via-slate-950/60 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[85vh] w-full max-w-7xl items-center px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="min-w-0 w-full max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100/30 bg-emerald-950/35 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-50 backdrop-blur-sm">
            <ShieldCheck size={15} aria-hidden="true" /> SUKKUR AREA OFFICE 5405
          </span>
          <h1 aria-label={heroPhrases[0]} aria-live="off" className="mt-5 min-h-[4.2em] max-w-3xl text-[2.5rem] font-black leading-[1.05] text-white sm:min-h-[2.8em] sm:text-5xl lg:min-h-[3.2em] lg:text-[3.65rem]">
            {displayedText}
            <span aria-hidden="true" className="ml-1 inline-block h-[0.85em] border-r-2 border-emerald-300 align-[-0.06em] motion-safe:animate-pulse" />
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-100 sm:text-lg">
            Family ke mustaqbil ke liye State Life options samjhein, aur Sukkur ki local team se seedhi rehnumai hasil karein.
          </p>

          <div className="mt-7 flex min-w-0 flex-wrap gap-3">
            <a href="#contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600">
              Free consultation <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20">
              WhatsApp us
            </a>
          </div>

          <div className="mt-8 grid min-w-0 gap-3 rounded-2xl border border-white/20 bg-slate-950/35 p-3 backdrop-blur-md sm:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_auto] sm:items-end sm:p-4">
            <div className="min-w-0">
              <label htmlFor="policy-search" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.08em] text-slate-100">Find a policy goal</label>
              <input id="policy-search" type="search" value={policySearch} onChange={(event) => onPolicySearchChange(event.target.value)} placeholder="Search education, health..." className="h-11 w-full min-w-0 rounded-xl border border-white/40 bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/30" />
            </div>
            <div className="min-w-0">
              <label htmlFor="policy-filter" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.08em] text-slate-100">Choose a goal</label>
              <select id="policy-filter" value={policyFilter} onChange={(event) => onPolicyFilterChange(event.target.value)} className="h-11 w-full min-w-0 rounded-xl border border-white/40 bg-white px-3 text-sm text-slate-900 outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/30">
                <option>All goals</option>
                {policyGoals.map((goal) => <option key={goal}>{goal}</option>)}
              </select>
            </div>
            <a href="#policies" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600">
              Explore <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}