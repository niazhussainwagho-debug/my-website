import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | Sukkur Area Office 5405",
  description: "State Life Sukkur Area Office ki policy, claims, payments aur financial guidance services.",
};

const services = [
  {
    title: "Policy Documentation Support",
    detail: "Application forms, required documents aur policy paperwork ko samajhne mein practical guidance.",
  },
  {
    title: "Claim Guidance & Settlement Assistance",
    detail: "Claim process ke steps, documentation aur next action ko clear tareeqe se samajhne mein madad.",
  },
  {
    title: "Policy Renewal & Premium Payment Help",
    detail: "Renewal dates, payment guidance aur policy records ke hawale se office support hasil karein.",
  },
  {
    title: "Financial Planning Consultation",
    detail: "Family goals, protection needs aur long-term planning ke liye suitable options par mashwara.",
  },
  {
    title: "Group Health & Individual Coverage Guidance",
    detail: "Families, individuals aur organizations ke liye coverage categories ko samajhne mein rehnumai.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="bg-(--brand-blue-900) px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">Sukkur Area Office 5405</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Aapki policy journey ke har qadam par local guidance.</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">Documentation se claims aur payment support tak, hamari office team aapko process ko simple andaaz mein samajhne mein madad karti hai.</p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1f8a67]">Our services</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-(--brand-blue-900) sm:text-4xl">Seedhi, local aur samajhne wali assistance.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-(--brand-blue-100) text-lg font-bold text-(--brand-blue-700)" aria-hidden="true">+</div>
                <h3 className="mt-5 text-xl font-bold text-(--brand-blue-900)">{service.title}</h3>
                <p className="mt-3 flex-1 leading-7 text-slate-600">{service.detail}</p>
                <Link href={`/checkout?plan=${encodeURIComponent(service.title)}`} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-(--brand-blue-700) px-5 py-3 text-sm font-semibold text-white transition hover:bg-(--brand-blue-900)">
                  Apply for this Plan
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-3xl bg-(--brand-blue-100) p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-(--brand-blue-900)">Apni zaroorat share karein</h2>
            <p className="mt-2 text-slate-600">Office team aapki query ke mutabiq next step samjhayegi.</p>
          </div>
          <Link href="/contact#contact-form" className="inline-flex min-h-11 items-center justify-center rounded-full bg-(--brand-blue-700) px-6 py-3 font-semibold text-white transition hover:bg-(--brand-blue-900)">Contact office</Link>
        </div>
      </section>
    </main>
  );
}
