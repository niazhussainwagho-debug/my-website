"use client";

import Link from "next/link";
import SubpageHero from "../../components/SubpageHero";
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
  return (
    <footer className="bg-(--brand-blue-900) px-4 py-10 text-slate-300 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/15 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>State Life Sukkur Area Office 5405</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a href={emailLink()} className="transition hover:text-white">{CONTACT_EMAIL}</a>
          <Link href="/contact" className="font-semibold text-white transition hover:text-cyan-200">Contact office</Link>
        </div>
      </div>
    </footer>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <SubpageHero
        category="About Area Office"
        title={<>Aapka <span className="text-blue-500 dark:text-blue-400">Etemad</span>, Hamari Pehchan - Sukkur Area Office 5405</>}
        subtitle="State Life Sukkur Area Office local families aur professionals ko financial security aur life protection plans samajhne mein mukammal rehnumai aur support faraham karta hai."
        actions={<>
          <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 font-bold text-(--brand-blue-900) transition hover:bg-cyan-50">Free Consultation</Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 py-3 font-bold text-white transition hover:bg-white/10">WhatsApp Us</a>
        </>}
      />

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1f8a67]">Leadership</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-(--brand-blue-900) sm:text-4xl">Aapki zaroorat, hamari guidance.</h2>
          </div>
          <div className="border-l-2 border-cyan-200 pl-5 sm:pl-8">
            <p className="text-2xl font-bold text-slate-900">{MANAGER_NAME}</p>
            <p className="mt-1 font-semibold text-(--brand-blue-700) dark:text-blue-300">{MANAGER_TITLE}, Sukkur Area Office {AREA_CODE}</p>
            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
              Mr. Fayyaz Ahmed ki leadership mein office ka maqsad yeh hai ke har visitor ko apne family goals aur financial priorities ke hawale se practical, understandable guidance mile. Unka approach listening, transparency aur responsible follow-through par based hai.
            </p>
            <blockquote className="mt-6 rounded-2xl bg-(--brand-blue-100) p-5 font-semibold leading-7 text-(--brand-blue-900) dark:bg-slate-800 dark:text-slate-100">
              “Behtar protection ka pehla qadam clear information hai. Hum har family ko decision samajhne ka waqt aur support dete hain.”
            </blockquote>
            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
              Vision yeh hai ke Sukkur region mein insurance aur financial security ki baat simple, accessible aur trust-based ho, jahan log apne future ke liye informed decisions le saken.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 dark:bg-slate-900 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1f8a67]">Our values</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-(--brand-blue-900) dark:text-white sm:text-4xl">Service jo trust ko strong banaye.</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article key={value.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
                <span className="text-sm font-bold text-[#1f8a67]">{value.number}</span>
                <h3 className="mt-5 text-xl font-bold text-(--brand-blue-900) dark:text-slate-100">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{value.text}</p>
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
          <div className="rounded-2xl bg-white p-6 text-slate-700 shadow-xl dark:bg-slate-800 dark:text-slate-200">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#1f8a67]">Sukkur Area Office 5405</p>
            <p className="mt-4 font-semibold text-slate-900 dark:text-slate-100">Shahlimar Road, near Session Court, Sukkur, Sindh</p>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-3 dark:border-slate-700"><dt>Working hours</dt><dd className="font-semibold text-slate-900 dark:text-slate-100">Mon-Fri, 9 AM - 5 PM</dd></div>
              <div className="flex justify-between gap-4 border-b border-slate-100 pb-3 dark:border-slate-700"><dt>Area Office</dt><dd className="font-semibold text-slate-900 dark:text-slate-100">{AREA_CODE}</dd></div>
              <div className="flex justify-between gap-4"><dt>Phone</dt><dd><a href={landlineLink()} className="font-bold text-(--brand-blue-700) transition-colors hover:underline dark:text-cyan-300 dark:hover:text-emerald-200">Office Landline</a></dd></div>
            </dl>
            <Link href="/contact" className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-(--brand-blue-700) px-5 py-3 text-sm font-bold text-white transition hover:bg-(--brand-blue-900)">Contact Office</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
