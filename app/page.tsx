"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { plans, type Plan } from "../data/plans";

const products = [
  { name: "Life Insurance", short: "Long-term safety aur family protection ke liye ideal coverage.", badge: "LI" },
  { name: "Health", short: "Medical emergencies aur hospital expenses ka trusted backup.", badge: "HE" },
  { name: "Takaful", short: "Sharia-compliant protection options jahan faith aur security dono.", badge: "TA" },
  { name: "Family Protection", short: "Aapki family ka future secure karne ke liye balanced plan.", badge: "FP" },
  { name: "Retirement", short: "Aaj ki savings se future peace aur stability banao.", badge: "RT" },
  { name: "Child Education", short: "Bachon ki education aur future goals ke liye smart planning.", badge: "CE" },
];

const services = [
  "Premium Payment Guide",
  "Claim Help",
  "Policy Forms",
  "Free Consultation",
];

const reasons = [
  { number: "01", title: "Trusted Guidance", text: "Expert team aapke needs ke mutabiq suitable options explain karti hai." },
  { number: "02", title: "Simple Process", text: "Policy selection aur documentation process easy aur transparent rakha gaya hai." },
  { number: "03", title: "Local Support", text: "Sukkur-based office se face-to-face guidance aur direct assistance milti hai." },
  { number: "04", title: "Long-Term Care", text: "Aapki family ke liye protection plans jo future ke liye stability dete hain." },
];

const testimonials = [
  {
    name: "Ayesha K.",
    text: "Office team ne bahut clear tarike se policy samjhayi. Family protection plan ka option bohat useful tha.",
  },
  {
    name: "Muhammad Ali",
    text: "Premium guidance aur claim process bahut professional tha. Team ne har sawal ka jawab politely diya.",
  },
  {
    name: "Zahid R.",
    text: "Life insurance ka decision lene mein help mili. Overall experience smooth aur trustworthy raha.",
  },
];

const faqs = [
  {
    question: "Kya main office mein direct consultation kar sakta hoon?",
    answer: "Haan, aap local office visit kar ke free consultation le sakte hain. Team aapke coverage needs ke hisaab se guidance dega.",
  },
  {
    question: "Premium payment kaise hoti hai?",
    answer: "Premium payment details aur process staff ke zariye samjha diya jata hai. Aap official channels aur guidance ke mutabiq payment kar sakte hain.",
  },
  {
    question: "Kya claim support available hai?",
    answer: "Haan, claim help ke liye team aapko required forms, process, aur documentation guidance provide karti hai.",
  },
  {
    question: "Kya family protection plans available hain?",
    answer: "Bilkul. Family Protection, Life Insurance, aur Retirement plans ke options available hain taake aap apni family ke liye strong coverage bana sakein.",
  },
  {
    question: "Office timings kya hain?",
    answer: "Office timing Monday se Friday, subah 9 baje se shaam 5 baje tak hai. Saturday aur Sunday off rahte hain.",
  },
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  city: "",
  age: "",
  message: "",
  consent: false,
  selectedPlan: "",
  website: "",
};

const initialContactForm = {
  name: "",
  phone: "",
  email: "",
  message: "",
  consent: false,
  website: "",
};

const phonePattern = /^03\d{2}-\d{7}$/;

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

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [contactData, setContactData] = useState(initialContactForm);
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [planStatus, setPlanStatus] = useState<"idle" | "sending" | "error">("idle");

  const plansForCategory = selectedCategory
    ? plans.filter((item: Plan) => item.type === selectedCategory)
    : [];

  useEffect(() => {
    if (!selectedCategory) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCategory(null);
        setShowForm(false);
        setIsSubmitted(false);
        setFormData({ ...initialForm, selectedPlan: formData.selectedPlan });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCategory, formData.selectedPlan]);

  const resetModalState = () => {
    setSelectedCategory(null);
    setShowForm(false);
    setIsSubmitted(false);
    setFormData(initialForm);
    setErrors({});
  };

  const openConsultation = (planName: string) => {
    setFormData({
      ...initialForm,
      selectedPlan: planName,
    });
    setPlanStatus("idle");
    setErrors({});
    setIsSubmitted(false);
    setShowForm(true);
  };

  const handleInputChange = (field: keyof typeof initialForm, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const nextErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) nextErrors.name = "Poora naam likhein.";
    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number zaroori hai.";
    } else if (!phonePattern.test(formData.phone)) {
      nextErrors.phone = "Phone format: 03XX-XXXXXXX.";
    }
    if (!formData.city.trim()) nextErrors.city = "Shehar likhein.";
    if (!formData.age.trim()) {
      nextErrors.age = "Umar likhein.";
    } else {
      const ageNumber = Number(formData.age);
      if (Number.isNaN(ageNumber) || ageNumber <= 0 || ageNumber > 120) {
        nextErrors.age = "Umar valid hona chahiye.";
      }
    }
    if (!formData.consent) nextErrors.consent = "Ijazat lena zaroori hai.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    setPlanStatus("sending");
    void submitLead({
      type: "plan_enquiry",
      ...formData,
      plan: formData.selectedPlan || selectedCategory || "",
    }).then((success) => {
      setPlanStatus(success ? "idle" : "error");
      if (success) setIsSubmitted(true);
    });
  };

  const handleContactChange = (field: keyof typeof initialContactForm, value: string | boolean) => {
    setContactData((current) => ({ ...current, [field]: value }));
    setContactStatus("idle");
  };

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactStatus("sending");
    void submitLead({ type: "contact", ...contactData }).then((success) => {
      setContactStatus(success ? "success" : "error");
      if (success) setContactData(initialContactForm);
    });
  };

  return (
    <main className="overflow-x-hidden bg-transparent pb-24 text-slate-800 md:pb-0">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Sukkur Area Office logo"
              width={46}
              height={46}
              className="h-11 w-11 rounded-xl object-cover shadow-sm ring-1 ring-slate-200"
              priority
            />
            <div>
              <p className="text-sm font-semibold tracking-[0.14em] text-slate-700 uppercase">Sukkur Area Office</p>
              <p className="text-xs text-slate-500">Life Insurance</p>
            </div>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
            <a href="#home" className="transition hover:text-[#0b2240]">Home</a>
            <a href="#products" className="transition hover:text-[#0b2240]">Products</a>
            <a href="#services" className="transition hover:text-[#0b2240]">Services</a>
            <a href="#about" className="transition hover:text-[#0b2240]">About</a>
            <a href="#contact" className="transition hover:text-[#0b2240]">Contact</a>
            <a href="/become-an-agent" className="font-semibold text-[#1f8a67] transition hover:text-[#177454]">Join Us</a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:+923132894151"
              className="hidden items-center justify-center rounded-full bg-[var(--brand-blue-700)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-blue-900)] md:inline-flex"
            >
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
                ["Home", "#home"],
                ["Products", "#products"],
                ["Services", "#services"],
                ["About", "#about"],
                ["Contact", "#contact"],
                ["Join Us", "/become-an-agent"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-base font-medium text-slate-700 transition hover:bg-slate-100 hover:text-[#0b2240]"
                >
                  {label}
                </a>
              ))}
              <a
                href="tel:+923132894151"
                onClick={() => setMenuOpen(false)}
                className="mt-1 inline-flex items-center justify-center rounded-full bg-[var(--brand-blue-700)] px-4 py-3 text-sm font-semibold text-white"
              >
                Call Now
              </a>
            </div>
          </div>
        )}
      </header>

      <div className="fixed inset-x-4 bottom-4 z-50 flex gap-3 md:hidden">
        <a
          href="https://wa.me/923132894151"
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center rounded-full bg-[#1f8a67] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1f8a67]/25"
        >
          WhatsApp
        </a>
        <a
          href="tel:+923132894151"
          className="flex flex-1 items-center justify-center rounded-full bg-[var(--brand-blue-700)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/25"
        >
          Call
        </a>
      </div>

      <section id="home" className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="inline-flex rounded-full border border-[#1f8a67]/30 bg-[#eafaf4] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1f8a67]">
              Family protection starts here
            </span>
            <h1 className="mt-6 max-w-xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Apki Family Ka Mustaqbil Mehfooz
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-gray-300">
              Trusted insurance guidance, smart protection plans, aur local support jo aapke family ke liye peace of mind banae. Simple, clear, aur reliable solutions.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-[var(--brand-blue-500)] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-[var(--brand-blue-700)]"
              >
                Free Consultation
              </a>
              <a
                href="https://wa.me/923132894151"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#0b2240]/15 bg-white px-6 py-3.5 text-base font-semibold text-[#0b2240] shadow-sm transition hover:-translate-y-0.5 hover:border-[#0b2240]/25"
              >
                WhatsApp Us
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-8 text-sm text-gray-300">
              <div>
                <div className="text-2xl font-bold text-white">25+</div>
                <div>Protection plans</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div>Local guidance</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div>Support intent</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 h-36 w-36 rounded-full bg-[#d8f0e8] blur-3xl" />
            <div className="absolute -right-6 bottom-8 h-40 w-40 rounded-full bg-[#dfeafe] blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              <div className="rounded-[24px] bg-gradient-to-br from-[#0b2240] to-[#143a66] p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-300">Coverage Snapshot</p>
                    <p className="mt-2 text-3xl font-bold">Smart Protection</p>
                  </div>
                  <div className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-emerald-300">Live</div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="rounded-2xl bg-white/8 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Monthly Plan</p>
                    <div className="mt-3 flex items-end justify-between">
                      <span className="text-3xl font-bold">PKR 12,500</span>
                      <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-semibold text-emerald-300">+8.4%</span>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white/8 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Family</p>
                      <p className="mt-2 text-2xl font-bold">4 Members</p>
                    </div>
                    <div className="rounded-2xl bg-white/8 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Support</p>
                      <p className="mt-2 text-2xl font-bold">24/7</p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#d8f0e8] p-4 text-[#0b2240]">
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span>Growth Outlook</span>
                      <span className="font-bold">Strong</span>
                    </div>
                    <div className="mt-5 flex h-20 items-end gap-2">
                      {[45, 52, 48, 66, 74, 82, 96].map((height, index) => (
                        <span
                          key={index}
                          className="w-full rounded-t-xl bg-gradient-to-t from-[#1f8a67] to-[#7ad5b0]"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f8a67]">Products</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Coverage options designed for every need</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <button
              key={product.name}
              type="button"
              onClick={() => {
                setSelectedCategory(product.name);
                setShowForm(false);
                setIsSubmitted(false);
                setErrors({});
                setFormData({ ...initialForm, selectedPlan: product.name });
              }}
              className="group rounded-[28px] border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eafaf4] text-sm font-bold text-[#1f8a67]">
                {product.badge}
              </div>
              <h3 className="text-xl font-bold text-[#0b2240]">{product.name}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{product.short}</p>
            </button>
          ))}
        </div>
      </section>

      <section id="services" className="bg-transparent py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f8a67]">Services</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Support jo aapko har stage par milay</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <div key={service} className="rounded-[24px] border border-slate-200 bg-[#f7faf8] p-6 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-blue-700)] text-sm font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold text-[#0b2240]">{service}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Clear assistance, friendly guidance, aur step-by-step support ke liye hum yahan hain.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f8a67]">Why Choose Us</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Aapki protection ka trusted local partner</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.number} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 text-3xl font-black text-[#1f8a67]">{reason.number}</div>
              <h3 className="text-xl font-bold text-[#0b2240]">{reason.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{reason.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--brand-blue-900)] py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Office Info</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Visit our office for personal assistance</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Address</p>
              <p className="mt-4 text-lg leading-8 text-slate-200">Shahlimar Road, near Session Court, Sukkur</p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Phone / WhatsApp</p>
              <a href="tel:03132894151" className="mt-4 block text-lg font-medium text-white">0313-2894151</a>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 md:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Timings</p>
              <p className="mt-4 text-lg leading-8 text-slate-200">Monday se Friday, subah 9 baje se shaam 5 baje tak. Saturday aur Sunday off.</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-lg">
            <iframe
              title="Sukkur Area Office location"
              src="https://www.google.com/maps?q=Shahlimar%20Road,%20near%20Session%20Court,%20Sukkur,%20Pakistan&output=embed"
              className="h-[260px] w-full border-0 md:h-[340px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f8a67]">Testimonials</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">What our clients say</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((review) => (
            <div key={review.name} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-base leading-7 text-slate-600">“{review.text}”</p>
              <div className="mt-6 border-t border-slate-200 pt-4 text-sm font-semibold text-[#0b2240]">{review.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-transparent py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f8a67]">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Common questions, clear answers</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={faq.question} className="rounded-[22px] border border-slate-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={openFaq === index}
                >
                  <span className="text-base font-semibold text-[#0b2240]">{faq.question}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eafaf4] text-lg font-bold text-[#1f8a67]">
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>

                {openFaq === index && (
                  <div className="px-5 pb-5 text-base leading-7 text-slate-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f8a67]">Contact</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0b2240] sm:text-4xl">Free consultation ke liye rabta karein</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Aap humse message, call, ya WhatsApp ke zariye contact kar sakte hain. Team aapke sawalat ka jawab dene ke liye ready hai.
            </p>

            <div className="mt-8 space-y-4 text-slate-700">
              <p><span className="font-semibold text-[#0b2240]">Address:</span> Shahlimar Road, near Session Court, Sukkur</p>
              <p><span className="font-semibold text-[#0b2240]">Phone:</span> 0313-2894151</p>
              <p><span className="font-semibold text-[#0b2240]">Timings:</span> Mon-Fri, 9:00 AM to 5:00 PM</p>
            </div>

            <div className="mt-8">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Shahlimar+Road,+near+Session+Court,+Sukkur,+Pakistan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[var(--brand-blue-500)] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:bg-[var(--brand-blue-700)]"
              >
                Get Directions
              </a>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Naam</label>
                <input
                  type="text"
                  value={contactData.name}
                  onChange={(event) => handleContactChange("name", event.target.value)}
                  placeholder="Aapka naam"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-[#1f8a67] focus:bg-white"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
                <input
                  type="tel"
                  value={contactData.phone}
                  onChange={(event) => handleContactChange("phone", event.target.value)}
                  placeholder="03xx-xxxxxxx"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-[#1f8a67] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email (optional)</label>
              <input
                type="email"
                value={contactData.email}
                onChange={(event) => handleContactChange("email", event.target.value)}
                placeholder="Aapki email"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-[#1f8a67] focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
              <textarea
                rows={5}
                value={contactData.message}
                onChange={(event) => handleContactChange("message", event.target.value)}
                placeholder="Aap apni query likhein..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-[#1f8a67] focus:bg-white"
              />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={contactData.consent}
                  onChange={(event) => handleContactChange("consent", event.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#1f8a67]"
                />
                <span>Main apni info office ko dene ki ijazat deta hun.</span>
              </label>
            </div>

            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={contactData.website}
              onChange={(event) => handleContactChange("website", event.target.value)}
              className="hidden"
            />

            <button
              type="submit"
              disabled={contactStatus === "sending"}
              className="inline-flex items-center justify-center rounded-full bg-[var(--brand-blue-700)] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[var(--brand-blue-900)]"
            >
              {contactStatus === "sending" ? "Bhej rahe hain..." : "Send"}
            </button>
            {contactStatus === "success" && <p className="text-sm font-medium text-emerald-700">Shukriya! Hamari office aap se jald rabta karegi.</p>}
            {contactStatus === "error" && <p className="text-sm font-medium text-red-600">Kuch masla aa gaya, baraye meherbani WhatsApp par rabta karein</p>}
          </form>
        </div>
      </section>

      <footer className="bg-[var(--brand-blue-900)] py-12 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Sukkur Area Office logo"
                width={46}
                height={46}
                className="h-11 w-11 rounded-xl object-cover ring-1 ring-white/10"
              />
              <div>
                <p className="text-lg font-bold text-white">Sukkur Area Office</p>
                <p className="text-sm text-slate-400">Life Insurance</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm leading-7 text-slate-300">
              Shahlimar Road, near Session Court, Sukkur. Family protection, consultation, aur local support ke liye hum aapke paas hain.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li><a href="#home" className="hover:text-white">Home</a></li>
              <li><a href="#products" className="hover:text-white">Products</a></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="/become-an-agent" className="hover:text-white">Join Us</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li>0313-2894151</li>
              <li>Mon-Fri: 9:00 AM – 5:00 PM</li>
              <li>Saturday & Sunday off</li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-4 pt-6 text-center text-sm text-slate-400 sm:px-6 lg:px-8">
          Ye website Sukkur Area Office ki taraf se hai. Policy payment aur login ke liye official channels use karein.
        </div>
      </footer>

      {selectedCategory && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60" onClick={resetModalState} />
          <div className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[28px] border border-slate-200 bg-white p-5 shadow-2xl sm:p-6">
            <button
              type="button"
              onClick={resetModalState}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-600 transition hover:bg-slate-200"
              aria-label="Close modal"
            >
              ×
            </button>

            {!showForm ? (
              <>
                <div className="pr-12">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f8a67]">Products</p>
                  <h3 className="mt-3 text-3xl font-bold text-[#0b2240]">{selectedCategory}</h3>
                </div>

                <div className="mt-6 hidden overflow-x-auto md:block">
                  <table className="min-w-full overflow-hidden rounded-2xl border border-slate-200">
                    <thead className="bg-[#edf7f3] text-left text-sm text-[#0b2240]">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Plan Name</th>
                        <th className="px-4 py-3 font-semibold">Best For</th>
                        <th className="px-4 py-3 font-semibold">Term</th>
                        <th className="px-4 py-3 font-semibold">Age Limit</th>
                        <th className="px-4 py-3 font-semibold">Details</th>
                        <th className="px-4 py-3 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plansForCategory.map((plan) => (
                        <tr key={plan.name} className="border-t border-slate-200 align-top">
                          <td className="px-4 py-3 font-medium text-[#0b2240]">{plan.name}</td>
                          <td className="px-4 py-3 text-slate-600">{plan.bestFor}</td>
                          <td className="px-4 py-3 text-slate-600">{plan.term}</td>
                          <td className="px-4 py-3 text-slate-600">{plan.ageLimit}</td>
                          <td className="px-4 py-3 text-slate-600">{plan.details}</td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={() => openConsultation(plan.name)}
                              className="inline-flex items-center justify-center rounded-full bg-[var(--brand-blue-700)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--brand-blue-900)]"
                            >
                              Apply for Consultation
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 space-y-4 md:hidden">
                  {plansForCategory.map((plan) => (
                    <div key={plan.name} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                      <div className="mb-3">
                        <p className="text-sm text-slate-500">Plan Name</p>
                        <p className="text-lg font-bold text-[#0b2240]">{plan.name}</p>
                      </div>
                      <div className="grid gap-3 text-sm text-slate-600">
                        <p><span className="font-semibold text-[#0b2240]">Best For:</span> {plan.bestFor}</p>
                        <p><span className="font-semibold text-[#0b2240]">Term:</span> {plan.term}</p>
                        <p><span className="font-semibold text-[#0b2240]">Age Limit:</span> {plan.ageLimit}</p>
                        <p><span className="font-semibold text-[#0b2240]">Details:</span> {plan.details}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => openConsultation(plan.name)}
                        className="mt-4 inline-flex items-center justify-center rounded-full bg-[var(--brand-blue-700)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-blue-900)]"
                      >
                        Apply for Consultation
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="pr-12">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f8a67]">Consultation</p>
                  <h3 className="mt-3 text-2xl font-bold text-[#0b2240]">{formData.selectedPlan || selectedCategory}</h3>
                </div>

                {isSubmitted ? (
                  <div className="mt-8 rounded-[24px] border border-emerald-200 bg-emerald-50 p-6 text-center">
                    <p className="text-xl font-bold text-[#0b2240]">Shukriya! Hamari office aap se jald rabta karegi.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Poora Naam</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(event) => handleInputChange("name", event.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-[#1f8a67] focus:bg-white"
                          placeholder="Aapka poora naam"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(event) => handleInputChange("phone", event.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-[#1f8a67] focus:bg-white"
                          placeholder="03XX-XXXXXXX"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Email (optional)</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(event) => handleInputChange("email", event.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-[#1f8a67] focus:bg-white"
                          placeholder="Aapki email"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Shehar</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(event) => handleInputChange("city", event.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-[#1f8a67] focus:bg-white"
                          placeholder="Aapka shehar"
                        />
                        {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Umar</label>
                        <input
                          type="number"
                          min="1"
                          max="120"
                          value={formData.age}
                          onChange={(event) => handleInputChange("age", event.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-[#1f8a67] focus:bg-white"
                          placeholder="Umar"
                        />
                        {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(event) => handleInputChange("message", event.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-[#1f8a67] focus:bg-white"
                        placeholder="Aap apni query likhein (optional)"
                      />
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <label className="flex items-start gap-3 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={formData.consent}
                          onChange={(event) => handleInputChange("consent", event.target.checked)}
                          className="mt-1 h-4 w-4 accent-[#1f8a67]"
                        />
                        <span>Main apni info office ko dene ki ijazat deta hun.</span>
                      </label>
                      {errors.consent && <p className="mt-2 text-sm text-red-600">{errors.consent}</p>}
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={planStatus === "sending"}
                        className="inline-flex items-center justify-center rounded-full bg-[var(--brand-blue-500)] px-5 py-3 text-base font-semibold text-white transition hover:bg-[var(--brand-blue-700)]"
                      >
                        {planStatus === "sending" ? "Bhej rahe hain..." : "Submit"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Back
                      </button>
                    </div>
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={formData.website}
                      onChange={(event) => handleInputChange("website", event.target.value)}
                      className="hidden"
                    />
                    {planStatus === "error" && <p className="text-sm font-medium text-red-600">Kuch masla aa gaya, baraye meherbani WhatsApp par rabta karein</p>}
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
