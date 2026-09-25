"use client";

import Link from "next/link";
import { Calculator, FileText, RefreshCw, ShieldCheck, UsersRound } from "lucide-react";
import { whatsappLink } from "../../lib/contact";
import { useLanguage } from "../../context/LanguageContext";

const services = [
  {
    title: "Policy Documentation Support",
    detail: "Application forms, required documents aur policy paperwork ko samajhne mein practical guidance.",
    icon: FileText,
    tone: "bg-blue-50 text-blue-700",
  },
  {
    title: "Claim Guidance & Settlement Assistance",
    detail: "Claim process ke steps, documentation aur next action ko clear tareeqe se samajhne mein madad.",
    icon: ShieldCheck,
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Policy Renewal & Premium Payment Help",
    detail: "Renewal dates, payment guidance aur policy records ke hawale se office support hasil karein.",
    icon: RefreshCw,
    tone: "bg-amber-50 text-amber-700",
  },
  {
    title: "Financial Planning Consultation",
    detail: "Family goals, protection needs aur long-term planning ke liye suitable options par mashwara.",
    icon: Calculator,
    tone: "bg-cyan-50 text-cyan-700",
  },
  {
    title: "Group Health & Individual Coverage Guidance",
    detail: "Families, individuals aur organizations ke liye coverage categories ko samajhne mein rehnumai.",
    icon: UsersRound,
    tone: "bg-indigo-50 text-indigo-700",
  },
];

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="bg-(--brand-blue-900) px-4 pb-16 pt-6 text-white sm:px-6 sm:pt-8 lg:px-8 lg:pb-20 lg:pt-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">{t("services.eyebrow")}</p>
          <h1 className="mt-4 max-w-full break-words overflow-hidden text-4xl font-bold tracking-tight sm:text-5xl">{t("services.title")}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">{t("services.subtitle")}</p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1f8a67]">{t("services.support")}</p>
            <h2 className="mt-3 max-w-full break-words overflow-hidden text-3xl font-bold tracking-tight text-(--brand-blue-900) sm:text-4xl">Practical help, without the paperwork guesswork.</h2>
            <p className="mt-4 leading-7 text-slate-600">Apni existing policy ya service need select karein. Representative aapko required documents, next steps aur official process samjhayega.</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-start justify-between gap-4">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${service.tone}`} aria-hidden="true">
                      <Icon size={20} strokeWidth={2} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Support</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold leading-7 text-(--brand-blue-900)">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{service.detail}</p>
                  <Link href={`/checkout?service=${encodeURIComponent(service.title)}`} className="mt-5 inline-flex min-h-10 items-center justify-center rounded-full bg-(--brand-blue-700) px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-(--brand-blue-900)">
                    {t("services.request")}
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-3xl bg-(--brand-blue-100) p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-(--brand-blue-900)">Policy tables dekhna chahte hain?</h2>
            <p className="mt-2 text-slate-600">Products page par State Life tables ka structured comparison dekhein.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/products" className="inline-flex min-h-11 items-center justify-center rounded-full bg-(--brand-blue-700) px-6 py-3 font-semibold text-white transition hover:bg-(--brand-blue-900)">{t("services.tables")}</Link>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border border-(--brand-blue-700) bg-white px-6 py-3 font-semibold text-(--brand-blue-700) transition hover:bg-slate-50">WhatsApp office</a>
          </div>
        </div>
      </section>
    </main>
  );
}
