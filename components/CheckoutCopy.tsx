'use client';

import Link from 'next/link';

export function CheckoutHeader() {
  return (
    <section className="bg-(--brand-blue-900) px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-18">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">Plan application</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Apni plan request submit karein.</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">Basic details share karein. Sukkur Area Office ka representative aap se jald rabta karke policy documentation process samjhayega.</p>
      </div>
    </section>
  );
}

export function CheckoutBackLink({ isServiceRequest }: { isServiceRequest: boolean }) {
  return <Link href={isServiceRequest ? '/services' : '/products'} className="mt-6 inline-flex font-semibold text-(--brand-blue-700) underline underline-offset-4">{isServiceRequest ? 'Back to services' : 'Back to plans'}</Link>;
}
