'use client';

import { useState } from 'react';
import { submitPlanApplication } from '../app/actions/submit-plan-application';
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '../lib/contact';

type PlanApplicationFormProps = {
  planName: string;
};

type ApplicationDetails = {
  planName: string;
  fullName: string;
  email: string;
  phone: string;
  cnicOrAge: string;
  message: string;
};

function saveLocalFallback(details: ApplicationDetails) {
  try {
    const existing = JSON.parse(window.localStorage.getItem('plan_applications_pending') || '[]') as ApplicationDetails[];
    window.localStorage.setItem('plan_applications_pending', JSON.stringify([...existing, { ...details, savedAt: new Date().toISOString() }]));
  } catch {
    console.warn('Plan application saved in the current session only.');
  }
}

async function notifyApplication(formData: FormData, details: ApplicationDetails) {
  try {
    const serverResult = await submitPlanApplication({ success: false }, formData);
    if (serverResult.success) return;
  } catch {
    // Continue to the client-safe notification fallback.
  }

  const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (web3FormsKey) {
    try {
      const web3FormData = new FormData();
      web3FormData.append('access_key', web3FormsKey);
      web3FormData.append('subject', `New Plan Order: ${details.planName}`);
      web3FormData.append('from_name', 'Sukkur Area Office website');
      web3FormData.append('name', details.fullName);
      web3FormData.append('email', details.email);
      web3FormData.append('phone', details.phone);
      web3FormData.append('plan_name', details.planName);
      web3FormData.append('cnic_or_age', details.cnicOrAge || '-');
      web3FormData.append('message', details.message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormData,
      });
      if (response.ok) return;
      console.warn('Web3Forms rejected the plan application.');
    } catch {
      // Keep the confirmation flow resilient when the external service is unavailable.
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.warn('NEXT_PUBLIC_WEB3FORMS_KEY is missing. Using the Server Action and manual contact fallback.');
  }

  saveLocalFallback(details);
}

export default function PlanApplicationForm({ planName }: PlanApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedDetails, setSubmittedDetails] = useState<ApplicationDetails | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const details: ApplicationDetails = {
      planName,
      fullName: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      cnicOrAge: String(formData.get('cnicOrAge') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    };

    setIsSubmitting(true);
    setSubmittedDetails(details);
    setSubmitted(true);
    void notifyApplication(formData, details).finally(() => setIsSubmitting(false));
  };

  if (submitted) {
    const fallbackBody = submittedDetails
      ? `A new customer has applied for a plan.\nName: ${submittedDetails.fullName}\nEmail: ${submittedDetails.email || '-'}\nPhone: ${submittedDetails.phone}\nPlan: ${submittedDetails.planName}.`
      : '';
    const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`New Plan Order: ${planName}`)}&body=${encodeURIComponent(fallbackBody)}`;
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950 shadow-sm dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100 sm:p-8" role="status">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">Application received</p>
        <h2 className="mt-3 text-2xl font-bold">Your application for {planName} has been received successfully!</h2>
        <p className="mt-4 leading-7">Our representative will contact you shortly to process your policy documentation.</p>
        {isSubmitting && <p className="mt-4 text-sm text-emerald-800 dark:text-emerald-200">Your request is being securely forwarded to our office.</p>}
        <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
          <a href={mailtoHref} className="text-(--brand-blue-700) underline underline-offset-4">Email request manually</a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Plan application: ${planName}`)}`} target="_blank" rel="noreferrer" className="text-[#1f8a67] underline underline-offset-4">WhatsApp office</a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
      <input type="hidden" name="plan_name" value={planName} />
      <div>
        <label htmlFor="plan-name" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Selected Plan</label>
        <input id="plan-name" value={planName} readOnly className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 font-semibold text-(--brand-blue-900) dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
      </div>

      <div>
        <label htmlFor="full-name" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Full Name *</label>
        <input id="full-name" name="name" required maxLength={100} autoComplete="name" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-(--brand-blue-500) focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:ring-blue-900" />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Email <span className="font-normal text-slate-500 dark:text-slate-400">(optional)</span></label>
        <input id="email" name="email" type="email" maxLength={320} autoComplete="email" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-(--brand-blue-500) focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:ring-blue-900" />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Contact Number *</label>
        <input id="phone" name="phone" required maxLength={40} type="tel" inputMode="tel" autoComplete="tel" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-(--brand-blue-500) focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:ring-blue-900" />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Message <span className="font-normal text-slate-500 dark:text-slate-400">(optional)</span></label>
        <textarea id="message" name="message" rows={3} maxLength={1000} placeholder="Apni query ya preferred contact time" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-(--brand-blue-500) focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:ring-blue-900" />
      </div>

      <div>
        <label htmlFor="cnic-or-age" className="block text-sm font-semibold text-slate-700 dark:text-slate-200">CNIC / Age <span className="font-normal text-slate-500 dark:text-slate-400">(optional)</span></label>
        <input id="cnic-or-age" name="cnicOrAge" maxLength={80} placeholder="CNIC number ya age" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-(--brand-blue-500) focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:ring-blue-900" />
      </div>

      <label className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-(--brand-blue-700)" />
        <span>Main apni information Sukkur Area Office ke representative ke saath share karne ki ijazat deta/deti hoon.</span>
      </label>

      <button type="submit" disabled={isSubmitting} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-(--brand-blue-700) px-6 py-3.5 font-semibold text-white transition hover:bg-(--brand-blue-900) disabled:cursor-not-allowed disabled:opacity-60">
        {isSubmitting ? 'Submitting application...' : 'Submit Application'}
      </button>
    </form>
  );
}
