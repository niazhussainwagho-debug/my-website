"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cleanPhone } from "../../lib/phone";

const processSteps = [
  "Pre-registration form bharein ya office aayein.",
  "Office mein asli Application Form (Form 01) aur zaroori documents jama karwayein.",
  "Sales Manager/Senior Sales Manager ki introducer declaration aur Area Manager ki recommendation.",
  "Zonal Certification Committee ka review, phir registration aur code number ki allotment.",
];

const faqs = [
  {
    question: "Kya poori registration online ho jati hai?",
    answer: "Nahi, office mein forms aur attestation hoti hai.",
  },
  {
    question: "Kaunse documents chahiye?",
    answer: "Recent attested passport size photographs, attested CNIC copy, aur taleemi qualifications ki attested copies chahiye. Professional qualification ho to uski attested copy bhi jama karwayein.",
  },
  {
    question: "Kya kisi aur company ke sath kaam kar sakte hain?",
    answer: "Form ke mutabiq nahi.",
  },
  {
    question: "Fees ya commission?",
    answer: "Office se confirm karein.",
  },
];

type FormData = {
  name: string;
  phone: string;
  city: string;
  age: string;
  education: string;
  experience: string;
  contactTime: string;
  message: string;
  consent: boolean;
  website: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  name: "",
  phone: "",
  city: "",
  age: "",
  education: "",
  experience: "",
  contactTime: "",
  message: "",
  consent: false,
  website: "",
};

async function submitLead(payload: Record<string, unknown>) {
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return response.ok;
  } catch {
    return false;
  }
}

export default function BecomeAnAgentPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setIsSubmitted(false);
    setSubmitError(false);
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Poora naam likhein.";
    if (!cleanPhone(formData.phone)) nextErrors.phone = "Sahi number likhein (kam se kam 7 digits).";
    if (!formData.city.trim()) nextErrors.city = "Shehar likhein.";
    if (!formData.age.trim()) nextErrors.age = "Umar likhein.";
    if (!formData.education) nextErrors.education = "Taleem select karein.";
    if (!formData.experience) nextErrors.experience = "Experience select karein.";
    if (!formData.contactTime) nextErrors.contactTime = "Rabta ka behtar waqt select karein.";
    if (!formData.consent) nextErrors.consent = "Ijazat lena zaroori hai.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    void submitLead({
      type: "agent_prereg",
      name: formData.name,
      phone: formData.phone,
      city: formData.city,
      age: formData.age,
      education: formData.education,
      experience: formData.experience,
      best_time: formData.contactTime,
      message: formData.message,
      consent: formData.consent,
      website: formData.website,
    }).then((success) => {
      setIsSubmitting(false);
      setIsSubmitted(success);
      setSubmitError(!success);
    });
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-transparent pb-24 text-slate-800 md:pb-0">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <Image
              src="/area%20logo.png"
              alt="Sukkur Area Office logo"
              width={210}
              height={74}
              className="h-12 w-[150px] max-w-full shrink-0 rounded-full object-contain sm:h-14 sm:w-[190px]"
              priority
            />
          </Link>

          <div className="hidden items-center gap-7 text-sm font-medium text-slate-700 md:flex">
            <Link href="/" className="transition hover:text-[#0b2240]">Home</Link>
            <Link href="/#products" className="transition hover:text-[#0b2240]">Products</Link>
            <Link href="/#services" className="transition hover:text-[#0b2240]">Services</Link>
            <Link href="/#about" className="transition hover:text-[#0b2240]">About</Link>
            <Link href="/#contact" className="transition hover:text-[#0b2240]">Contact</Link>
            <Link href="/become-an-agent" className="font-semibold text-[#1f8a67]">Join Us</Link>
          </div>

          <div className="flex items-center gap-2">
            <a href="tel:+923132894151" className="hidden rounded-full bg-[var(--brand-blue-700)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-blue-900)] md:inline-flex">
              Call Now
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm md:hidden"
            >
              <span className="space-y-1.5">
                <span className="block h-0.5 w-5 rounded-full bg-current" />
                <span className="block h-0.5 w-5 rounded-full bg-current" />
                <span className="block h-0.5 w-5 rounded-full bg-current" />
              </span>
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="border-t border-slate-200 bg-white md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:px-6">
              {[
                ["Home", "/"],
                ["Products", "/#products"],
                ["Services", "/#services"],
                ["About", "/#about"],
                ["Contact", "/#contact"],
                ["Join Us", "/become-an-agent"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-base font-medium text-slate-700 transition hover:bg-slate-100 hover:text-[#0b2240]"
                >
                  {label}
                </Link>
              ))}
              <a href="tel:+923132894151" onClick={() => setMenuOpen(false)} className="mt-1 inline-flex justify-center rounded-full bg-[var(--brand-blue-700)] px-4 py-3 text-sm font-semibold text-white">
                Call Now
              </a>
            </div>
          </div>
        )}
      </header>

      <div className="fixed inset-x-4 bottom-4 z-50 flex gap-3 md:hidden">
        <a href="https://wa.me/923132894151" target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center rounded-full bg-[#1f8a67] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1f8a67]/25">
          WhatsApp
        </a>
        <a href="tel:+923132894151" className="flex flex-1 items-center justify-center rounded-full bg-[var(--brand-blue-700)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/25">
          Call
        </a>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Join our team</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            State Life Sukkur Area Office ke sath Insurance Advisor banein
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
            Insurance advisor registration ke liye apni basic maloomat share karein. Asli registration aur forms ka process office mein mukammal hoga.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#pre-registration" className="inline-flex items-center justify-center rounded-full bg-[var(--brand-blue-500)] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:bg-[var(--brand-blue-700)]">
              Pre-Registration Form
            </a>
            <a href="https://wa.me/923132894151" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white px-6 py-3.5 text-base font-semibold text-[#0b2240] shadow-sm transition hover:bg-slate-100">
              WhatsApp Par Poochein
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-transparent py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Process</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Registration ka process</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-300">Har step office ki guidance ke mutabiq complete hoga. Muddat office se confirm karein.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eafaf4] text-sm font-bold text-[#1f8a67]">0{index + 1}</div>
                <p className="text-base leading-7 text-slate-600">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Documents</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Documents Checklist</h2>
            <div className="mt-8 space-y-4">
              {[
                "2 recent passport size photographs (attested)",
                "CNIC ki attested copy",
                "Taleemi qualifications ki attested copies",
                "Professional qualification ki attested copies (agar ho)",
              ].map((document) => (
                <div key={document} className="flex gap-3 text-base leading-7 text-gray-300">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-300" />
                  <span>{document}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f8a67]">Important Note</p>
            <p className="mt-4 text-lg leading-8 text-slate-600">Tamam documents Sector Head / Area Manager se attest hone chahiye.</p>
          </div>
        </div>
      </section>

      <section className="bg-transparent py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Requirements</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Zaroori Shartein</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#0b2240]">Form ke mutabiq</h3>
              <ul className="mt-5 space-y-4 text-base leading-7 text-slate-600">
                <li>Maloomat durust honi chahiye.</li>
                <li>Insurance Ordinance 2000 aur Insurance Rules 2017 ki pabandi zaroori hai.</li>
                <li>Kisi aur insurer ke liye kaam nahi kar sakte.</li>
              </ul>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#0b2240]">Eligibility</h3>
              <p className="mt-5 text-base leading-7 text-slate-600">Umar aur taleem ke hawale se details office se confirm karein.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f8a67]">Forms</p>
          <h2 className="mt-3 text-3xl font-bold text-[#0b2240] sm:text-4xl">Registration forms office se hasil karein</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Asli Application Form (Form 01) aur registration ki rehnumai ke liye office se rabta karein.</p>
          <a href="https://wa.me/923132894151" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--brand-blue-500)] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[var(--brand-blue-700)]">
            WhatsApp Par Poochein
          </a>
        </div>
      </section>

      <section id="pre-registration" className="bg-transparent py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Start here</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Pre-Registration Form</h2>
            <p className="mt-4 text-base leading-7 text-gray-300">Basic maloomat share karein. Asli registration office mein forms par mukammal hogi.</p>
          </div>

          {isSubmitted ? (
            <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 p-6 text-center sm:p-10">
              <p className="text-xl font-bold text-[#0b2240]">Shukriya! Hamari office aap se rabta karegi. Asli registration office mein forms par mukammal hogi.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Poora Naam" error={errors.name}>
                  <input type="text" value={formData.name} onChange={(event) => handleChange("name", event.target.value)} placeholder="Aapka poora naam" className={inputClass} />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <input type="tel" inputMode="tel" autoComplete="tel" value={formData.phone} onChange={(event) => handleChange("phone", event.target.value)} placeholder="Apna phone number likhein" className={inputClass} />
                </Field>
                <Field label="Shehar" error={errors.city}>
                  <input type="text" value={formData.city} onChange={(event) => handleChange("city", event.target.value)} placeholder="Aapka shehar" className={inputClass} />
                </Field>
                <Field label="Umar" error={errors.age}>
                  <input type="number" value={formData.age} onChange={(event) => handleChange("age", event.target.value)} placeholder="Umar" className={inputClass} />
                </Field>
                <Field label="Taleem" error={errors.education}>
                  <select value={formData.education} onChange={(event) => handleChange("education", event.target.value)} className={inputClass}>
                    <option value="">Select karein</option>
                    <option value="Matric">Matric</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Post-Graduation">Post-Graduation</option>
                  </select>
                </Field>
                <Field label="Sales/Insurance experience" error={errors.experience}>
                  <select value={formData.experience} onChange={(event) => handleChange("experience", event.target.value)} className={inputClass}>
                    <option value="">Select karein</option>
                    <option value="Nahi">Nahi</option>
                    <option value="1 saal se kam">1 saal se kam</option>
                    <option value="1 se 3 saal">1 se 3 saal</option>
                    <option value="3 saal se zyada">3 saal se zyada</option>
                  </select>
                </Field>
                <Field label="Rabta ka behtar waqt" error={errors.contactTime}>
                  <select value={formData.contactTime} onChange={(event) => handleChange("contactTime", event.target.value)} className={inputClass}>
                    <option value="">Select karein</option>
                    <option value="Subah">Subah</option>
                    <option value="Dopahar">Dopahar</option>
                    <option value="Shaam">Shaam</option>
                    <option value="Koi bhi waqt">Koi bhi waqt</option>
                  </select>
                </Field>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-slate-700">Message (optional)</label>
                <textarea rows={4} value={formData.message} onChange={(event) => handleChange("message", event.target.value)} placeholder="Aap apni query likhein" className={inputClass} />
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <label className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                  <input type="checkbox" checked={formData.consent} onChange={(event) => handleChange("consent", event.target.checked)} className="mt-1 h-4 w-4 accent-[#1f8a67]" />
                  <span>Main apni info office ko dene ki ijazat deta hun.</span>
                </label>
                {errors.consent && <p className="mt-2 text-sm text-red-600">{errors.consent}</p>}
              </div>

              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={formData.website}
                onChange={(event) => handleChange("website", event.target.value)}
                className="hidden"
              />

              <button type="submit" disabled={isSubmitting} className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[var(--brand-blue-500)] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[var(--brand-blue-700)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                {isSubmitting ? "Bhej rahe hain..." : "Submit Pre-Registration"}
              </button>
              {submitError && <p className="mt-3 text-sm font-medium text-red-600">Kuch masla aa gaya, baraye meherbani WhatsApp par rabta karein</p>}
            </form>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">FAQ</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Common questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="rounded-[22px] border border-slate-200 bg-white shadow-sm">
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index} className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left">
                <span className="text-base font-semibold text-[#0b2240]">{faq.question}</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eafaf4] text-lg font-bold text-[#1f8a67]">{openFaq === index ? "-" : "+"}</span>
              </button>
              {openFaq === index && <div className="px-5 pb-5 text-base leading-7 text-slate-600">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-[var(--brand-blue-900)] py-12 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/area%20logo.png" alt="Sukkur Area Office logo" width={210} height={74} className="h-14 w-[190px] rounded-full object-contain" />
              <div>
                <p className="text-lg font-bold text-white">Sukkur Area Office</p>
                <p className="text-sm text-slate-400">Life Insurance</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm leading-7 text-slate-300">Shahlimar Road, near Session Court, Sukkur. Family protection, consultation, aur local support ke liye hum aapke paas hain.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/#products" className="hover:text-white">Products</Link></li>
              <li><Link href="/#services" className="hover:text-white">Services</Link></li>
              <li><Link href="/become-an-agent" className="hover:text-white">Join Us</Link></li>
              <li><Link href="/#contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li>Call / WhatsApp</li>
              <li>Mon-Fri: 9:00 AM - 5:00 PM</li>
              <li>Saturday &amp; Sunday off</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-4 pt-6 text-center text-sm text-slate-400 sm:px-6 lg:px-8">Ye website Sukkur Area Office ki taraf se hai.</div>
      </footer>
    </main>
  );
}

const inputClass = "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-[#1f8a67] focus:bg-white";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
