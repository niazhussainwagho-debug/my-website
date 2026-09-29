"use client";

import Image from "next/image";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

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
  return (
    <section id="home" className="scroll-mt-30 relative isolate min-h-[42rem] w-full max-w-full overflow-hidden bg-slate-950 text-white sm:min-h-[44rem] lg:scroll-mt-34 lg:min-h-[46rem]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 z-0 bg-linear-to-br from-slate-950/95 via-slate-950/75 to-blue-950/70 dark:from-black/95 dark:via-slate-950/80 dark:to-blue-950/75" />

      <ScrollReveal className="relative z-10 mx-auto flex min-h-[42rem] w-full max-w-7xl items-center px-4 pb-10 pt-28 sm:min-h-[44rem] sm:px-6 sm:pb-12 sm:pt-28 lg:min-h-[46rem] lg:px-8 lg:pb-16 lg:pt-28">
        <div className="w-full max-w-2xl">
          <span className="glass inline-flex items-center gap-2 rounded-full border-white/25 bg-white/10 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-xl shadow-black/10 sm:text-sm">
            <ShieldCheck size={15} aria-hidden="true" /> SUKKUR AREA OFFICE 5405
          </span>
          <h1 className="mt-5 max-w-2xl text-3xl font-black leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Securing Your Future,
            <span className="mt-2 block bg-linear-to-r from-cyan-200 via-sky-300 to-emerald-300 bg-clip-text text-transparent">Empowering Generations</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
            Family ke mustaqbil ke liye State Life plans samjhein, aur Sukkur Area Office 5405 se mahirana rehnumai hasil karein.
          </p>

          <div className="mt-6 flex min-w-0 flex-wrap gap-3">
            <a href="/staff/login" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-cyan-50">
              Staff Portal Access <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a href="#policies" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20">
              Explore Plans <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>

          <div className="mt-6 hidden w-full max-w-2xl min-w-0 flex-col gap-3 rounded-2xl border border-white/25 bg-slate-950/35 p-4 backdrop-blur-md md:flex sm:flex-row sm:items-end">
            <div className="w-full min-w-0 sm:flex-1">
              <label htmlFor="policy-search" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.08em] text-slate-100">Find a policy goal</label>
              <input id="policy-search" type="search" value={policySearch} onChange={(event) => onPolicySearchChange(event.target.value)} placeholder="Search education, health..." className="h-11 w-full min-w-0 rounded-xl border border-white/40 bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/30" />
            </div>
            <div className="w-full min-w-0 sm:flex-1">
              <label htmlFor="policy-filter" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.08em] text-slate-100">Choose a goal</label>
              <select id="policy-filter" value={policyFilter} onChange={(event) => onPolicyFilterChange(event.target.value)} className="h-11 w-full min-w-0 rounded-xl border border-white/40 bg-white px-3 text-sm text-slate-900 outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/30">
                <option>All goals</option>
                {policyGoals.map((goal) => <option key={goal}>{goal}</option>)}
              </select>
            </div>
            <a href="#policies" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600 sm:w-auto">
              Explore <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}