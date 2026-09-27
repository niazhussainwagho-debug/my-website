"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { useState } from "react";
import { AREA_CODE, CONTACT_EMAIL, emailLink, landlineLink, telLink, whatsappLink } from "../../lib/contact";
import { cleanPhone } from "../../lib/phone";

type ContactForm = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  consent: boolean;
  website: string;
};

type FormErrors = Partial<Record<keyof ContactForm, string>>;

const initialForm: ContactForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
  consent: false,
  website: "",
};

const serviceOptions = [
  "Life Insurance",
  "Health Insurance",
  "Family Protection",
  "Retirement Planning",
  "Claim Support",
  "Premium Payment Guidance",
  "General Consultation",
];

function validateForm(form: ContactForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Poora naam likhein.";
  if (!cleanPhone(form.phone)) errors.phone = "Sahi phone number likhein.";
  if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Email address check karein.";
  if (!form.service) errors.service = "Service select karein.";
  if (!form.message.trim()) errors.message = "Apna message likhein.";
  if (!form.consent) errors.consent = "Info share karne ki ijazat zaroori hai.";
  return errors;
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const updateField = <Field extends keyof ContactForm>(field: Field, value: ContactForm[Field]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: form.name,
          phone: cleanPhone(form.phone),
          email: form.email || null,
          plan: form.service,
          message: form.message,
          consent: form.consent,
          website: form.website,
        }),
      });

      if (!response.ok) throw new Error("Contact request failed");
      setForm(initialForm);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <section className="bg-(--brand-blue-900) px-4 py-14 text-white sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">Contact Sukkur Office 5405</p>
          <h1 className="mt-4 max-w-3xl break-words text-4xl font-bold tracking-tight sm:text-5xl">Hum Se Rabta Karein - Sukkur Area Office 5405</h1>
          <p className="mt-5 max-w-2xl break-words text-base leading-8 text-blue-100 sm:text-lg">Apni kisi bhi policy enquiry ya new policy guidance ke liye hamari office team se direct rabta karein.</p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1f8a67]">Send an enquiry</p>
                <h2 className="mt-2 text-2xl font-bold text-(--brand-blue-900) dark:text-white sm:text-3xl">Contact form</h2>
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400">Fields marked * required</span>
            </div>

            <form id="contact-form" onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Name *
                  <input value={form.name} onChange={(event) => updateField("name", event.target.value)} type="text" autoComplete="name" placeholder="Aapka naam" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-(--brand-blue-500) focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:bg-slate-800" />
                  {errors.name && <span className="mt-1 block text-xs font-normal text-red-600">{errors.name}</span>}
                </label>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Phone Number *
                  <input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} type="tel" autoComplete="tel" placeholder="03xx-xxxxxxx" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-(--brand-blue-500) focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:bg-slate-800" />
                  {errors.phone && <span className="mt-1 block text-xs font-normal text-red-600">{errors.phone}</span>}
                </label>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Email
                  <input value={form.email} onChange={(event) => updateField("email", event.target.value)} type="email" autoComplete="email" placeholder="name@example.com" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-(--brand-blue-500) focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:bg-slate-800" />
                  {errors.email && <span className="mt-1 block text-xs font-normal text-red-600">{errors.email}</span>}
                </label>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Service Interest *
                  <select value={form.service} onChange={(event) => updateField("service", event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal text-slate-900 outline-none transition focus:border-(--brand-blue-500) focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                    <option value="">Service select karein</option>
                    {serviceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                  {errors.service && <span className="mt-1 block text-xs font-normal text-red-600">{errors.service}</span>}
                </label>
              </div>

              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                Message *
                <textarea value={form.message} onChange={(event) => updateField("message", event.target.value)} rows={5} placeholder="Aap kis information ya guidance ke liye rabta kar rahe hain?" className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-(--brand-blue-500) focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:bg-slate-800" />
                {errors.message && <span className="mt-1 block text-xs font-normal text-red-600">{errors.message}</span>}
              </label>

              <label className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                <input checked={form.consent} onChange={(event) => updateField("consent", event.target.checked)} type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[#1f8a67]" />
                <span>Main apni information Sukkur Area Office se rabtay ke liye share karne ki ijazat deta/deti hoon. *</span>
              </label>
              {errors.consent && <p className="-mt-3 text-xs text-red-600">{errors.consent}</p>}

              <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={(event) => updateField("website", event.target.value)} className="hidden" />
              <button type="submit" disabled={status === "sending"} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-(--brand-blue-700) px-6 py-3 font-bold text-white transition hover:bg-(--brand-blue-900) disabled:cursor-wait disabled:opacity-70 sm:w-auto">
                {status === "sending" ? "Bhej rahe hain..." : "Send Enquiry"}
              </button>
              {status === "success" && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="font-bold">Thank You for Contacting Us!</p>
                  <p className="mt-1 text-sm leading-6">We have received your message. Our representative from State Life Sukkur Area Office 5405 will contact you shortly.</p>
                </div>
              )}
              {status === "error" && <p className="text-sm font-semibold text-red-600">Kuch masla aa gaya. Baraye meherbani WhatsApp ya call par rabta karein.</p>}
            </form>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#1f8a67] px-5 py-3 font-bold text-white shadow-sm transition hover:bg-[#177454]">WhatsApp Us</a>
              <a href={telLink()} className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-(--brand-blue-700) px-5 py-3 font-bold text-white shadow-sm transition hover:bg-(--brand-blue-900)">Call Now</a>
            </div>

              <div className="rounded-3xl bg-(--brand-blue-900) p-6 text-white shadow-lg sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-cyan-200">Office details</p>
              <h2 className="mt-3 text-2xl font-bold">Sukkur Area Office {AREA_CODE}</h2>
              <address className="mt-5 not-italic leading-7 text-blue-100">Shahlimar Road, near Session Court,<br />Sukkur, Sindh, Pakistan</address>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex gap-4 border-t border-white/15 pt-4"><dt className="w-28 shrink-0 text-blue-200">Hours</dt><dd className="font-semibold">Monday - Friday, 9 AM - 5 PM</dd></div>
                <div className="flex gap-4 border-t border-white/15 pt-4"><dt className="w-28 shrink-0 text-blue-200">Phone</dt><dd><a href={landlineLink()} className="font-bold text-emerald-300 transition-colors hover:text-emerald-200">{landlineLink().replace("tel:", "")}</a></dd></div>
                <div className="flex gap-4 border-t border-white/15 pt-4"><dt className="w-28 shrink-0 text-blue-200">Email</dt><dd className="min-w-0"><a href={emailLink()} className="break-all font-bold text-cyan-200 transition-colors hover:text-emerald-200">{CONTACT_EMAIL}</a></dd></div>
              </dl>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <div className="aspect-4/3 min-h-64 w-full bg-slate-200 dark:bg-slate-800">
                <iframe title="Sukkur Area Office location map" src="https://www.google.com/maps?q=Shahlimar+Road+near+Session+Court+Sukkur&output=embed" className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-600 dark:text-slate-300">Office location dekhne ke liye map use karein.</p>
                <a href="https://www.google.com/maps/search/?api=1&query=Shahlimar+Road+near+Session+Court+Sukkur" target="_blank" rel="noopener noreferrer" className="font-semibold text-(--brand-blue-700) hover:text-(--brand-blue-900)">Open in Maps</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-(--brand-blue-900) px-4 py-8 text-center text-sm text-slate-300 sm:px-6 lg:px-8">
        <p>State Life Sukkur Area Office 5405 · <Link href="/about" className="text-white hover:text-cyan-200">About Us</Link> · <a href={emailLink()} className="text-white hover:text-cyan-200">{CONTACT_EMAIL}</a></p>
      </footer>
    </main>
  );
}
