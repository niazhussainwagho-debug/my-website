import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";

type SubpageHeroProps = {
  sectionId?: string;
  category: string;
  title: ReactNode;
  subtitle: string;
  actions?: ReactNode;
};

export default function SubpageHero({ sectionId = "hero", category, title, subtitle, actions }: SubpageHeroProps) {
  return (
    <section id={sectionId} className="scroll-mt-30 bg-slate-900 px-4 py-14 text-slate-100 dark:bg-slate-950 sm:px-6 lg:scroll-mt-34 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100/30 bg-emerald-950/35 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-50">
          <ShieldCheck size={15} aria-hidden="true" />
          SUKKUR AREA OFFICE 5405 <span aria-hidden="true">·</span> {category}
        </span>
        <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-slate-200 sm:text-lg sm:leading-8">{subtitle}</p>
        {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>}
      </div>
    </section>
  );
}