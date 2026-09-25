'use client';

import Link from 'next/link';
import { useState } from 'react';
import { policyTables, type PolicyTable } from '../data/policy-tables';

function PolicyTableCard({ table }: { table: PolicyTable }) {
  const [age, setAge] = useState('30');
  const [term, setTerm] = useState(String(table.terms[0]));
  const [estimate, setEstimate] = useState(false);
  const planName = `Table ${table.number}: ${table.title}`;

  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1f8a67]">Table {table.number}</p>
          <h3 className="mt-2 text-2xl font-bold text-(--brand-blue-900)">{table.title}</h3>
        </div>
        <span className="rounded-full bg-(--brand-blue-100) px-3 py-1 text-xs font-bold text-(--brand-blue-700)">Guide</span>
      </div>
      <p className="mt-4 leading-7 text-slate-600">{table.summary}</p>

      <div className="mt-6 space-y-5 text-sm">
        <div>
          <h4 className="font-bold text-(--brand-blue-900)">Key Benefits & Features</h4>
          <ul className="mt-2 space-y-2 text-slate-600">
            {table.benefits.map((benefit) => <li key={benefit} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1f8a67]" />{benefit}</li>)}
          </ul>
        </div>
        <div className="grid gap-4 border-y border-slate-200 py-4 sm:grid-cols-2">
          <div>
            <h4 className="font-bold text-(--brand-blue-900)">Policy Term Options</h4>
            <p className="mt-2 leading-6 text-slate-600">{table.terms.join(', ')} years discussion options; availability office se confirm karein.</p>
          </div>
          <div>
            <h4 className="font-bold text-(--brand-blue-900)">Eligibility & Age Limits</h4>
            <p className="mt-2 leading-6 text-slate-600">{table.eligibility} {table.ageLimits}</p>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-(--brand-blue-900)">Bonus & Profit Structure</h4>
          <p className="mt-2 leading-6 text-slate-600">{table.bonus}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <h4 className="font-bold text-(--brand-blue-900)">Who Should Choose This Plan?</h4>
          <p className="mt-2 leading-6 text-slate-600">{table.choose}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-(--brand-blue-100) bg-(--brand-blue-100)/50 p-4">
        <p className="text-sm font-bold text-(--brand-blue-900)">Quick planning calculator</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-semibold text-slate-600">Applicant age
            <input type="number" min="18" max="65" value={age} onChange={(event) => { setAge(event.target.value); setEstimate(false); }} className="mt-1 min-h-10 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-(--brand-blue-500)" />
          </label>
          <label className="text-xs font-semibold text-slate-600">Desired duration
            <select value={term} onChange={(event) => { setTerm(event.target.value); setEstimate(false); }} className="mt-1 min-h-10 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-(--brand-blue-500)">
              {table.terms.map((option) => <option key={option} value={option}>{option} years</option>)}
            </select>
          </label>
        </div>
        <button type="button" onClick={() => setEstimate(true)} className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full border border-(--brand-blue-700) px-4 py-2 text-sm font-semibold text-(--brand-blue-700) transition hover:bg-white">Calculate Plan Estimate</button>
        {estimate && <p className="mt-3 text-sm leading-6 text-(--brand-blue-900)" role="status">Age {age} par {term}-year planning horizon selected hai. Official premium, eligibility aur illustration office se confirm karein.</p>}
      </div>

      <Link href={`/checkout?plan=${encodeURIComponent(planName)}`} className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-(--brand-blue-700) px-6 py-3.5 text-center font-semibold text-white transition hover:bg-(--brand-blue-900)">
        Apply for Table {table.number}
      </Link>
    </article>
  );
}

export default function PolicyTableGuide() {
  return (
    <section className="bg-slate-50 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1f8a67]">State Life policy guide</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-(--brand-blue-900) sm:text-4xl">Policy tables ko compare karke apna next step plan karein.</h2>
          <p className="mt-5 leading-8 text-slate-600">Yeh guide discussion aur planning ke liye hai. Exact premium, bonus, eligibility, exclusions aur official policy illustration State Life Sukkur Area Office se confirm karein.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {policyTables.map((table) => <PolicyTableCard key={table.number} table={table} />)}
        </div>
      </div>
    </section>
  );
}
