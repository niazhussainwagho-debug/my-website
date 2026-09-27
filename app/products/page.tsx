"use client";

import Link from "next/link";
import PolicyTableGuide from "../../components/PolicyTableGuide";
import SubpageHero from "../../components/SubpageHero";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <SubpageHero
        category="Plans & products"
        title={<><span className="text-blue-500 dark:text-blue-400">State Life Insurance Plans</span> Aur <span className="text-blue-500 dark:text-blue-400">Life Policies</span></>}
        subtitle="Apni family ki zaroorat ke mutabiq best policy table chunain aur official premium structure ki maloomat hasil karein."
      />

      <PolicyTableGuide />

      <section id="contact" className="scroll-mt-30 bg-white px-4 py-14 dark:bg-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-3xl bg-(--brand-blue-100) p-6 dark:bg-slate-800 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-(--brand-blue-900) dark:text-white">Compare tables. Choose your next step.</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Apne goals aur zaroorat office ke saath share karein.</p>
          </div>
          <Link href="/contact#contact-form" className="inline-flex min-h-11 items-center justify-center rounded-full bg-(--brand-blue-700) px-6 py-3 font-semibold text-white transition hover:bg-(--brand-blue-900)">Contact office</Link>
        </div>
      </section>
    </main>
  );
}
