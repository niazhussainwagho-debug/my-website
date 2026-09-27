"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import CarouselArrow from "./CarouselArrow";
import ScrollReveal from "./ScrollReveal";

export type HomePolicy = {
  title: string;
  planCategory: string;
  category: string;
  description: string;
  image: string;
  alt: string;
};

export const homePolicies: HomePolicy[] = [
  {
    title: "Child Education",
    planCategory: "Child Education",
    category: "Education",
    description: "Bachon ki taleem ke liye pehle se sochi samjhi planning.",
    image: "/products/education.png",
    alt: "Child learning with books",
  },
  {
    title: "Marriage Planning",
    planCategory: "Life Insurance",
    category: "Family",
    description: "Aane wale family milestones ke liye protection options samjhein.",
    image: "/products/family.png",
    alt: "Family planning for future milestones",
  },
  {
    title: "Retirement",
    planCategory: "Retirement",
    category: "Future",
    description: "Apne long-term goals ke mutabiq retirement options explore karein.",
    image: "/products/retirement.png",
    alt: "Couple planning for retirement",
  },
  {
    title: "Health Protection",
    planCategory: "Health",
    category: "Health",
    description: "Health cover aur available support ke baare mein guidance lein.",
    image: "/products/health.png",
    alt: "Family health planning",
  },
];

type ProductsProps = {
  policies: HomePolicy[];
  onLearnMore: (policy: HomePolicy) => void;
};

export default function Products({ policies, onLearnMore }: ProductsProps) {
  const [activeTitle, setActiveTitle] = useState(homePolicies[0].title);
  const activePolicy = policies.find((policy) => policy.title === activeTitle) ?? policies[0];
  const activeIndex = Math.max(0, policies.findIndex((policy) => policy.title === activePolicy?.title));

  return (
    <section id="policies" className="scroll-mt-30 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:scroll-mt-34 lg:px-8">
      <ScrollReveal className="mb-8 flex min-w-0 flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#176b55]">Plans for life&apos;s milestones</p>
          <h2 className="mt-2 text-3xl font-black leading-tight text-[#17332e] sm:text-4xl">Protection for what matters</h2>
        </div>
        <a href="/products" className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#176b55] transition-colors hover:text-[#0b493b]">All products <ArrowRight size={16} aria-hidden="true" /></a>
      </ScrollReveal>

      {activePolicy ? (
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          <ScrollReveal>
          <article className="group relative flex min-h-[380px] min-w-0 overflow-hidden rounded-2xl bg-slate-950 text-white sm:min-h-[440px] lg:min-h-[500px]">
            <Image key={activePolicy.title} src={activePolicy.image} alt={activePolicy.alt} fill sizes="(max-width: 1023px) 100vw, 44vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/35 to-transparent" />
            <CarouselArrow
              direction="previous"
              label="Previous coverage option"
              disabled={activeIndex === 0}
              onClick={() => setActiveTitle(policies[activeIndex - 1].title)}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2"
            />
            <CarouselArrow
              direction="next"
              label="Next coverage option"
              disabled={activeIndex >= policies.length - 1}
              onClick={() => setActiveTitle(policies[activeIndex + 1].title)}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2"
            />
            <div className="relative z-10 mt-auto w-full p-5 sm:p-7">
              <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">{activePolicy.category}</span>
              <h3 className="mt-4 text-2xl font-black leading-tight sm:text-3xl">{activePolicy.title}</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-100 sm:text-base">{activePolicy.description}</p>
              <button type="button" onClick={() => onLearnMore(activePolicy)} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition-colors hover:bg-emerald-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Learn More <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </article>
          </ScrollReveal>

          <div className="min-w-0 self-center">
            <div className="border-t border-slate-200 dark:border-slate-800">
              {policies.map((policy, index) => {
                const isActive = policy.title === activePolicy.title;
                const Icon = isActive ? Minus : Plus;
                return (
                  <ScrollReveal key={policy.title} delayMs={index * 150} className="border-b border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      aria-expanded={isActive}
                      onClick={() => setActiveTitle(policy.title)}
                      onMouseEnter={() => setActiveTitle(policy.title)}
                      onFocus={() => setActiveTitle(policy.title)}
                      className="flex min-h-16 w-full min-w-0 items-center gap-3 py-4 text-left sm:gap-4"
                    >
                      <span className={`min-w-0 flex-1 text-base font-bold leading-snug transition-colors sm:text-lg ${isActive ? "text-[#17332e]" : "text-slate-600 hover:text-[#17332e]"}`}>{policy.title}</span>
                      <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 dark:bg-slate-900 dark:text-slate-300">{policy.category}</span>
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${isActive ? "bg-[#17332e] text-white" : "bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300"}`}>
                        <Icon size={17} aria-hidden="true" />
                      </span>
                    </button>
                    <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        <p className="max-w-xl pb-5 pr-12 text-sm leading-6 text-slate-600 dark:text-slate-400">{policy.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <ScrollReveal><p className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">No policy goals match that search. Try another keyword.</p></ScrollReveal>
      )}
    </section>
  );
}