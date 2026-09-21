"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cleanPhone } from "../../lib/phone";

const categories = [
  { name: "Individual", description: "Sirf apni sehat ke liye cover dekhne walon ke liye." },
  { name: "Family", description: "Miyan biwi, bachon aur walidain ki sehat ki planning ke liye." },
  { name: "Corporate", description: "Company ya idare ke mulazimeen ke liye group health cover." },
  { name: "Takaful", description: "Sharia ke usoolon par mabni health cover chahne walon ke liye." },
];

const faqs = [
  ["Kya yahan se seedha policy mil jati hai?", "Nahi, office guide karti hai aur apply official process se hota hai."],
  ["Kaunse documents chahiye?", "Office se confirm karein."],
  ["Hospitals ki list kahan milegi?", "Official State Health website par."],
  ["Premium kitna hoga?", "Office se confirm karein."],
];

type FormData = { name: string; phone: string; city: string; category: string; familyMembers: string; message: string; consent: boolean; website: string };
const initialForm: FormData = { name: "", phone: "", city: "", category: "", familyMembers: "", message: "", consent: false, website: "" };
const inputClass = "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-[var(--brand-blue-500)] focus:bg-white";
async function submitLead(payload: Record<string, unknown>) {
  try {
    const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    return response.ok;
  } catch {
    return false;
  }
}

export default function HealthInsurancePage() {
  const [activeCategory, setActiveCategory] = useState("Individual");
  const [openFaq, setOpenFaq] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setStatus("idle");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!formData.name.trim()) nextErrors.name = "Poora naam likhein.";
    if (!cleanPhone(formData.phone)) nextErrors.phone = "Sahi number likhein (kam se kam 7 digits).";
    if (!formData.city.trim()) nextErrors.city = "Shehar likhein.";
    if (!formData.category) nextErrors.category = "Category select karein.";
    if (!formData.consent) nextErrors.consent = "Ijazat lena zaroori hai.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("sending");
    void submitLead({ type: "health_enquiry", name: formData.name, phone: formData.phone, city: formData.city, plan: formData.category, message: formData.message, consent: formData.consent, website: formData.website, family_members: formData.familyMembers }).then((success) => {
      setStatus(success ? "success" : "error");
      if (success) setFormData(initialForm);
    });
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-transparent text-slate-800">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3"><Image src="/area%20logo.png" alt="Sukkur Area Office logo" width={210} height={74} className="h-12 w-[150px] max-w-full shrink-0 rounded-full object-contain sm:h-14 sm:w-[190px]" priority /></Link>
          <Link href="/" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--brand-blue-700)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-blue-900)]">Home</Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Health Insurance</p><h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">Family Ki Sehat, Sukoon Ke Sath</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">Ilaaj ke akhrajaat achanak aa jate hain. Sukkur Area Office aap ko sahi health insurance category samajhne aur agla qadam chunne mein rehnumai deti hai.</p><a href="#health-enquiry" className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--brand-blue-500)] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[var(--brand-blue-700)]">Free Consultation</a></div>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/20 bg-[var(--brand-blue-100)] shadow-xl">{!imageFailed ? <Image src="/health-hero.png" alt="Khush family ghar mein sofa par" fill priority className="object-cover object-[center_right]" onError={() => setImageFailed(true)} /> : <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-blue-100)] via-sky-100 to-[var(--brand-blue-500)]" aria-label="Health insurance visual" />}</div>
      </section>

      <section className="border-y border-white/10 bg-transparent py-16"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><h2 className="text-3xl font-bold text-white sm:text-4xl">Aap ke liye kaunsa cover?</h2><div className="mt-8 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Health cover categories">{categories.map((category) => <button key={category.name} type="button" role="tab" aria-selected={activeCategory === category.name} onClick={() => setActiveCategory(category.name)} className={`min-h-11 shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${activeCategory === category.name ? "bg-white text-[#0b2240]" : "border border-white/30 text-white hover:bg-white/10"}`}>{category.name}</button>)}</div>{categories.filter((category) => category.name === activeCategory).map((category) => <div key={category.name} role="tabpanel" className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><h3 className="text-2xl font-bold text-[#0b2240]">{category.name}</h3><p className="mt-3 text-base leading-7 text-slate-600">{category.description}</p><p className="mt-6 font-semibold text-[#0b2240]">Office se pooch lein:</p><ul className="mt-3 space-y-3 text-slate-600">{["Cover kin logon par lagega?", "Pehle se koi bimari ho to office ko bata dein", "Aap ki tarjeeh aur budget ke mutabiq kya suit karega?"].map((point) => <li key={point} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--brand-blue-500)]" />{point}</li>)}</ul><p className="mt-6 text-sm font-semibold text-[var(--brand-blue-700)]">Tafseelat office se confirm karein.</p></div>)}</div></section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><h2 className="text-3xl font-bold text-white sm:text-4xl">Kaise kaam karta hai</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{["Apni zaroorat batayein", "Office aap ko guide karegi", "Apply official process se hota hai"].map((step, index) => <div key={step} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm"><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eafaf4] font-bold text-[#1f8a67]">{index + 1}</div><p className="text-lg font-semibold text-[#0b2240]">{step}</p></div>)}</div></section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"><div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><h2 className="text-2xl font-bold text-[#0b2240]">Official Links</h2><p className="mt-4 max-w-3xl leading-7 text-slate-600">Apply karne, eligibility check karne aur hospitals ki list dekhne ke liye State Health ki official website dekhein. Ye alag official website hai.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><a href="https://www.statehealth.com.pk/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--brand-blue-500)] px-6 py-3.5 font-semibold text-white transition hover:bg-[var(--brand-blue-700)]">State Health ki official website</a><a href="tel:+923132894151" className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 font-semibold text-[#0b2240] transition hover:bg-slate-50">Contact Office</a></div></div></section>

      <section id="health-enquiry" className="bg-transparent py-16"><div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"><h2 className="text-3xl font-bold text-white sm:text-4xl">Health Plan Enquiry</h2>{status === "success" ? <div className="mt-8 rounded-[28px] border border-emerald-200 bg-emerald-50 p-6 text-center"><p className="font-bold text-[#0b2240]">Shukriya! Hamari office aap se jald rabta karegi.</p></div> : <form onSubmit={handleSubmit} className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><HealthField label="Poora Naam" error={errors.name}><input type="text" value={formData.name} onChange={(event) => updateField("name", event.target.value)} className={inputClass} placeholder="Aapka poora naam" /></HealthField><HealthField label="Phone" error={errors.phone}><input type="tel" inputMode="tel" autoComplete="tel" value={formData.phone} onChange={(event) => updateField("phone", event.target.value)} className={inputClass} placeholder="Apna phone number likhein" /></HealthField><HealthField label="Shehar" error={errors.city}><input type="text" value={formData.city} onChange={(event) => updateField("city", event.target.value)} className={inputClass} placeholder="Aapka shehar" /></HealthField><HealthField label="Category" error={errors.category}><select value={formData.category} onChange={(event) => updateField("category", event.target.value)} className={inputClass}><option value="">Select karein</option>{categories.map((category) => <option key={category.name} value={category.name}>{category.name}</option>)}</select></HealthField><HealthField label="Family members ki tadaad (optional)"><input type="text" value={formData.familyMembers} onChange={(event) => updateField("familyMembers", event.target.value)} className={inputClass} placeholder="Optional" /></HealthField></div><div className="mt-5"><label className="mb-2 block text-sm font-medium text-slate-700">Message (optional)</label><textarea rows={4} value={formData.message} onChange={(event) => updateField("message", event.target.value)} className={inputClass} placeholder="Aap apni query likhein" /></div><div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4"><label className="flex items-start gap-3 text-sm leading-6 text-slate-700"><input type="checkbox" checked={formData.consent} onChange={(event) => updateField("consent", event.target.checked)} className="mt-1 h-4 w-4 accent-[var(--brand-blue-500)]" /><span>Main apni info office ko dene ki ijazat deta hun.</span></label>{errors.consent && <p className="mt-2 text-sm text-red-600">{errors.consent}</p>}</div><input type="text" value={formData.website} onChange={(event) => updateField("website", event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" /><button type="submit" disabled={status === "sending"} className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[var(--brand-blue-500)] px-6 py-3.5 font-semibold text-white transition hover:bg-[var(--brand-blue-700)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">{status === "sending" ? "Bhej rahe hain..." : "Submit Enquiry"}</button>{status === "error" && <p className="mt-3 text-sm font-medium text-red-600">Kuch masla aa gaya, baraye meherbani WhatsApp par rabta karein</p>}</form>}</div></section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"><h2 className="text-3xl font-bold text-white sm:text-4xl">Common questions</h2><div className="mt-8 space-y-4">{faqs.map(([question, answer], index) => <div key={question} className="rounded-[22px] border border-slate-200 bg-white shadow-sm"><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left"><span className="font-semibold text-[#0b2240]">{question}</span><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eafaf4] text-lg font-bold text-[#1f8a67]">{openFaq === index ? "-" : "+"}</span></button>{openFaq === index && <div className="px-5 pb-5 leading-7 text-slate-600">{answer}</div>}</div>)}</div></section>
      <footer className="bg-[var(--brand-blue-900)] py-10 text-center text-sm text-slate-300">Ye website Sukkur Area Office ki taraf se hai.</footer>
    </main>
  );
}

function HealthField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <div><label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>{children}{error && <p className="mt-1 text-sm text-red-600">{error}</p>}</div>;
}
