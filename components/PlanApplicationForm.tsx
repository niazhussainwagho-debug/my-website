'use client';

import { useActionState } from 'react';
import { submitPlanApplication, type PlanApplicationState } from '../app/actions/submit-plan-application';

const initialState: PlanApplicationState = { success: false };

type PlanApplicationFormProps = {
  planName: string;
};

export default function PlanApplicationForm({ planName }: PlanApplicationFormProps) {
  const [state, formAction, isPending] = useActionState(submitPlanApplication, initialState);

  if (state.success) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950 shadow-sm sm:p-8" role="status">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Application received</p>
        <h2 className="mt-3 text-2xl font-bold">Your application for {state.planName} has been received successfully!</h2>
        <p className="mt-4 leading-7">Our representative will contact you shortly to process your policy documentation.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <input type="hidden" name="planName" value={planName} />
      <div>
        <label htmlFor="plan-name" className="block text-sm font-semibold text-slate-700">Selected Plan</label>
        <input id="plan-name" value={planName} readOnly className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 font-semibold text-(--brand-blue-900)" />
      </div>

      <div>
        <label htmlFor="full-name" className="block text-sm font-semibold text-slate-700">Full Name *</label>
        <input id="full-name" name="fullName" required maxLength={100} autoComplete="name" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-(--brand-blue-500) focus:ring-4 focus:ring-blue-100" />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-slate-700">Contact Number *</label>
        <input id="phone" name="phone" required maxLength={40} type="tel" inputMode="tel" autoComplete="tel" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-(--brand-blue-500) focus:ring-4 focus:ring-blue-100" />
      </div>

      <div>
        <label htmlFor="cnic-or-age" className="block text-sm font-semibold text-slate-700">CNIC / Age <span className="font-normal text-slate-500">(optional)</span></label>
        <input id="cnic-or-age" name="cnicOrAge" maxLength={80} placeholder="CNIC number ya age" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-(--brand-blue-500) focus:ring-4 focus:ring-blue-100" />
      </div>

      <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-(--brand-blue-700)" />
        <span>Main apni information Sukkur Area Office ke representative ke saath share karne ki ijazat deta/deti hoon.</span>
      </label>

      {state.error && <p className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700" role="alert">{state.error}</p>}

      <button type="submit" disabled={isPending} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-(--brand-blue-700) px-6 py-3.5 font-semibold text-white transition hover:bg-(--brand-blue-900) disabled:cursor-not-allowed disabled:opacity-60">
        {isPending ? 'Submitting application...' : 'Submit Application'}
      </button>
    </form>
  );
}
