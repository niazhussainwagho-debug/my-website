'use client';

import Link from 'next/link';
import { useState } from 'react';
import { policyTables, type PolicyCategory, type PolicyTable } from '../data/policy-tables';
import { useLanguage, type TranslationKey } from '../context/LanguageContext';

const categoryTabs: Array<{ key: PolicyCategory; label: string; tables: string }> = [
  { key: 'popular', label: 'products.tab.popular', tables: 'Tables 01, 03, 08, 14' },
  { key: 'child', label: 'products.tab.child', tables: 'Tables 11, 12, 36' },
  { key: 'special', label: 'products.tab.special', tables: 'Tables 05, 22, 70+' },
];

function PolicyTableCard({ table }: { table: PolicyTable }) {
  const { t } = useLanguage();
  const [age, setAge] = useState('30');
  const [term, setTerm] = useState(String(table.terms[0]));
  const [estimate, setEstimate] = useState(false);
  const badge = table.number === '08' ? 'Table 08 - Sadabahar' : `Table ${table.number}`;
  const tableTitle = t(`table.${table.number === '70+' ? '70' : table.number}.title` as TranslationKey);
  const planName = `${badge} - ${tableTitle}`;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex rounded-full bg-(--brand-blue-100) px-3 py-1 text-xs font-bold text-(--brand-blue-700)">{badge}</span>
        <span className="text-xs font-bold uppercase tracking-[0.13em] text-[#1f8a67]">State Life</span>
      </div>
      <h3 className="mt-4 text-xl font-bold leading-7 text-(--brand-blue-900)">{tableTitle}</h3>

      <dl className="mt-5 space-y-3 text-sm">
        <div>
          <dt className="font-bold text-(--brand-blue-900)">{t('products.suitable')}</dt>
          <dd className="mt-1 leading-6 text-slate-600">{table.purpose}</dd>
        </div>
        <div>
          <dt className="font-bold text-(--brand-blue-900)">{t('products.eligibility')}</dt>
          <dd className="mt-1 leading-6 text-slate-600">{table.eligibility} {table.ageLimits}</dd>
        </div>
        <div>
          <dt className="font-bold text-(--brand-blue-900)">{t('products.terms')}</dt>
          <dd className="mt-1 leading-6 text-slate-600">{table.terms.join(', ')} years; final availability office se confirm karein.</dd>
        </div>
        <div>
          <dt className="font-bold text-(--brand-blue-900)">{t('products.payout')}</dt>
          <dd className="mt-1 leading-6 text-slate-600">{table.payout}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        {table.benefits.map((benefit) => <span key={benefit} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{benefit}</span>)}
      </div>

      <details className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <summary className="cursor-pointer text-sm font-bold text-(--brand-blue-900)">{t('products.estimate')}</summary>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-semibold text-slate-600">Applicant age
            <input type="number" min="18" max="65" value={age} onChange={(event) => { setAge(event.target.value); setEstimate(false); }} className="mt-1 min-h-9 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-(--brand-blue-500)" />
          </label>
          <label className="text-xs font-semibold text-slate-600">Duration
            <select value={term} onChange={(event) => { setTerm(event.target.value); setEstimate(false); }} className="mt-1 min-h-9 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-(--brand-blue-500)">
              {table.terms.map((option) => <option key={option} value={option}>{option} years</option>)}
            </select>
          </label>
        </div>
        <button type="button" onClick={() => setEstimate(true)} className="mt-3 inline-flex min-h-9 items-center justify-center rounded-full border border-(--brand-blue-700) px-3 py-1.5 text-xs font-semibold text-(--brand-blue-700) transition hover:bg-white">Show estimate</button>
        {estimate && <p className="mt-2 text-xs leading-5 text-(--brand-blue-900)" role="status">Age {age} aur {term}-year horizon selected. Official premium aur illustration office se confirm karein.</p>}
      </details>

      <Link href={`/checkout?plan=${encodeURIComponent(planName)}`} className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-(--brand-blue-700) px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-(--brand-blue-900)">
        Apply for Table {table.number}
      </Link>
    </article>
  );
}

export default function PolicyTableGuide() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<PolicyCategory>('popular');
  const activeTables = policyTables.filter((table) => table.category === activeCategory);

  return (
    <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1f8a67]">{t('products.guideEyebrow')}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-(--brand-blue-900) sm:text-4xl">{t('products.guideTitle')}</h2>
          <p className="mt-4 leading-7 text-slate-600">Apni family ki zaroorat ke mutabiq best policy table chunain aur official premium structure ki maloomat hasil karein.</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-b border-slate-200 pb-4" role="tablist" aria-label="Policy table categories">
          {categoryTabs.map((tab) => (
            <button key={tab.key} type="button" role="tab" aria-selected={activeCategory === tab.key} onClick={() => setActiveCategory(tab.key)} className={`rounded-full px-4 py-2.5 text-left text-sm font-semibold transition ${activeCategory === tab.key ? 'bg-(--brand-blue-700) text-white' : 'bg-white text-slate-600 hover:bg-(--brand-blue-100)'}`}>
              <span className="block">{t(tab.label as TranslationKey)}</span>
              <span className={`mt-0.5 block text-xs font-normal ${activeCategory === tab.key ? 'text-blue-100' : 'text-slate-400'}`}>{tab.tables}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" role="tabpanel">
          {activeTables.map((table) => <PolicyTableCard key={table.number} table={table} />)}
        </div>
      </div>
    </section>
  );
}
