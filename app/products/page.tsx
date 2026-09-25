import type { Metadata } from "next";
import Link from "next/link";
import PolicyTableGuide from "../../components/PolicyTableGuide";

export const metadata: Metadata = {
  title: "Plans & Products | Sukkur Area Office 5405",
  description: "State Life Sukkur Area Office ke plans aur product categories ke bare mein guidance.",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="bg-(--brand-blue-900) px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">Plans & products</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Aapke goals ke liye protection aur planning options.</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">Har family ki zaroorat alag hoti hai. Neeche categories ka overview dekhein aur apne liye relevant plan par office se detail guidance lein.</p>
        </div>
      </section>

      <PolicyTableGuide />

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-3xl bg-(--brand-blue-100) p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-(--brand-blue-900)">Plan choose karne mein guidance chahiye?</h2>
            <p className="mt-2 text-slate-600">Apne goals aur zaroorat office ke saath share karein.</p>
          </div>
          <Link href="/contact#contact-form" className="inline-flex min-h-11 items-center justify-center rounded-full bg-(--brand-blue-700) px-6 py-3 font-semibold text-white transition hover:bg-(--brand-blue-900)">Contact office</Link>
        </div>
      </section>
    </main>
  );
}
