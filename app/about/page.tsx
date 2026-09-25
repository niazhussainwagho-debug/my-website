"use client";

import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import {
  AREA_CODE,
  CONTACT_EMAIL,
  MANAGER_NAME,
  MANAGER_TITLE,
  emailLink,
  landlineLink,
  whatsappLink,
} from "../../lib/contact";

const values = [
  {
    number: "01",
    title: "Transparency",
    text: "Har option, process aur documentation ko simple aur clear andaaz mein explain karte hain.",
  },
  {
    number: "02",
    title: "Community Support",
    text: "Sukkur aur nearby communities ke families ko local, accessible guidance provide karte hain.",
  },
  {
    number: "03",
    title: "Financial Security",
    text: "Aapke family goals ke mutabiq protection aur long-term financial planning samajhne mein madad.",
  },
  {
    number: "04",
    title: "Fast Claims Support",
    text: "Claim documentation aur next steps ke liye timely guidance, taake process behtar samajh aaye.",
  },
];

function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="bg-(--brand-blue-900) px-4 py-10 text-slate-300 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/15 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>{t("footer.office")}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a href={emailLink()} className="transition hover:text-white">{CONTACT_EMAIL}</a>
          <Link href="/contact" className="font-semibold text-white transition hover:text-cyan-200">{t("footer.contact")}</Link>
        </div>
      </div>
    </footer>
  );
}

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="relative overflow-hidden bg-(--brand-blue-900) px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">{t("about.eyebrow")}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{t("about.title")}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">{t("about.subtitle")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-(--brand-blue-900) transition hover:bg-cyan-50">{t("about.consultation")}</Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 py-3 font-bold text-white transition hover:bg-white/10">{t("about.whatsapp")}</a>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1f8a67]">{t("about.leadership")}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-(--brand-blue-900) sm:text-4xl">Aapki zaroorat, hamari guidance.</h2>
          </div>
          <div className="border-l-2 border-cyan-200 pl-5 sm:pl-8">
            <p className="text-2xl font-bold text-slate-900">{MANAGER_NAME}</p>
            <p className="mt-1 font-semibold text-(--brand-blue-700)">{MANAGER_TITLE}, Area Code {AREA_CODE}</p>
            <p className="mt-5 leading-8 text-slate-600">
              Mr. Fayyaz Ahmed ki leadership mein office ka maqsad yeh hai ke har visitor ko apne family goals aur financial priorities ke hawale se practical, understandable guidance mile. Unka approach listening, transparency aur responsible follow-through par based hai.
            </p>
            <blockquote className="mt-6 rounded-2xl bg-(--brand-blue-100) p-5 font-semibold leading-7 text-(--brand-blue-900)">
              “Behtar protection ka pehla qadam clear information hai. Hum har family ko decision samajhne ka waqt aur support dete hain.”
            </blockquote>
            <p className="mt-5 leading-8 text-slate-600">
              Vision yeh hai ke Sukkur region mein insurance aur financial security ki baat simple, accessible aur trust-based ho, jahan log apne future ke liye informed decisions le saken.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1f8a67]">{t("about.values")}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-(--brand-blue-900) sm:text-4xl">Service jo trust ko strong banaye.</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article key={value.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-md">
                <span className="text-sm font-bold text-[#1f8a67]">{value.number}</span>
                <h3 className="mt-5 text-xl font-bold text-(--brand-blue-900)">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-3xl bg-(--brand-blue-900) p-6 text-white sm:p-9 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-200">Visit our office</p>
            <h2 className="mt-3 text-3xl font-bold">Sukkur mein direct guidance.</h2>
            <p className="mt-4 max-w-xl leading-8 text-blue-100">Aap office visit kar ke apni needs discuss kar sakte hain. Team aapko available options aur process ko simple way mein explain karegi.</p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-slate-700 shadow-xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#1f8a67]">Sukkur Area Office 5405</p>
            <p className="mt-4 font-semibold text-slate-900">Shahlimar Road, near Session Court, Sukkur, Sindh</p>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-3"><dt>Working hours</dt><dd className="font-semibold text-slate-900">Mon-Fri, 9 AM - 5 PM</dd></div>
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-3"><dt>Area code</dt><dd className="font-semibold text-slate-900">{AREA_CODE}</dd></div>
              <div className="flex justify-between gap-4"><dt>Phone</dt><dd><a href={landlineLink()} className="font-semibold text-(--brand-blue-700)">{landlineLink().replace("tel:", "")}</a></dd></div>
            </dl>
            <Link href="/contact" className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-(--brand-blue-700) px-5 py-3 text-sm font-bold text-white transition hover:bg-(--brand-blue-900)">{t("about.contact")}</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
