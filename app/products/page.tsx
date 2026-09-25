import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plans & Products | Sukkur Area Office 5405",
  description: "State Life Sukkur Area Office ke plans aur product categories ke bare mein guidance.",
};

const products = [
  {
    title: "Whole Life Assurance",
    details: "Long-term family protection aur future security ke liye life assurance category.",
    terms: "Short-, medium- ya long-term options office se confirm karein.",
  },
  {
    title: "Endowment Assurance",
    details: "Protection aur planned financial goals ko samajhne ke liye endowment assurance guidance.",
    terms: "Mukhtalif policy term options available ho sakte hain; office se confirm karein.",
  },
  {
    title: "Child Education & Marriage Plans",
    details: "Bachon ki education aur future milestones ke liye pehle se planning support.",
    terms: "Goal aur child age ke mutabiq term options office se discuss karein.",
  },
  {
    title: "Shadabad Plan",
    details: "Shadabad category ke features, eligibility aur documentation ko office se samjhein.",
    terms: "Applicable term aur conditions office se confirm karein.",
  },
  {
    title: "Health Insurance Plans",
    details: "Individual, family aur group health cover categories ke liye initial guidance.",
    terms: "Cover period, eligibility aur available options office se confirm karein.",
  },
];

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

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1f8a67]">State Life categories</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-(--brand-blue-900) sm:text-4xl">Plan details office se verify karein.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.title} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#1f8a67]">Plan category</p>
                <h3 className="mt-3 text-xl font-bold text-(--brand-blue-900)">{product.title}</h3>
                <p className="mt-3 flex-1 leading-7 text-slate-600">{product.details}</p>
                <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Policy term options</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{product.terms}</p>
                </div>
                <Link href={`/contact?service=${encodeURIComponent(product.title)}#contact-form`} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-(--brand-blue-700) px-5 py-3 text-sm font-semibold text-white transition hover:bg-(--brand-blue-900)">
                  Get Plan Quote
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

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
