import type { Metadata } from 'next';
import Link from 'next/link';
import PlanApplicationForm from '../../components/PlanApplicationForm';

export const metadata: Metadata = {
  title: 'Plan Application | Sukkur Area Office 5405',
  description: 'State Life plan application aur purchase request submit karein.',
};

type CheckoutPageProps = {
  searchParams: Promise<{ plan?: string; service?: string }>;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const params = await searchParams;
  const planName = params.plan?.trim() || params.service?.trim() || '';
  const isServiceRequest = Boolean(params.service?.trim() && !params.plan?.trim());

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <section className="bg-(--brand-blue-900) px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-18">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">Plan application</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Apni plan request submit karein.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">Basic details share karein. Sukkur Area Office ka representative aap se jald rabta karke policy documentation process samjhayega.</p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="rounded-3xl bg-(--brand-blue-100) p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1f8a67]">Next step</p>
            <h2 className="mt-3 text-2xl font-bold text-(--brand-blue-900)">{planName || 'Plan selection required'}</h2>
            <p className="mt-4 leading-7 text-slate-600">Yeh purchase request hai. Final eligibility, terms aur documentation office representative aap ke saath confirm karega.</p>
            <Link href={isServiceRequest ? "/services" : "/products"} className="mt-6 inline-flex font-semibold text-(--brand-blue-700) underline underline-offset-4">{isServiceRequest ? "Back to services" : "Back to plans"}</Link>
          </div>

          {planName ? <PlanApplicationForm planName={planName} /> : <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-900 shadow-sm"><h2 className="text-xl font-bold">Plan select karein</h2><p className="mt-3 leading-7">Application form kholne ke liye Products ya Services page se plan choose karein.</p><Link href="/products" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-(--brand-blue-700) px-5 py-3 font-semibold text-white">View plans</Link></div>}
        </div>
      </section>
    </main>
  );
}
