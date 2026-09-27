"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Clock3, MapPin } from "lucide-react";
import { FacebookIcon, LinkedInIcon, MailIcon, PhoneIcon } from "../components/icons";
import Hero from "../components/Hero";
import Products, { homePolicies, type HomePolicy } from "../components/Products";
import ScrollReveal from "../components/ScrollReveal";
import Testimonials from "../components/Testimonials";
import { plans, type Plan } from "../data/plans";
import { products } from "../data/products";
import { supabase } from "@/lib/supabase";
import { AREA_CODE, CONTACT_EMAIL, FACEBOOK_URL, LINKEDIN_URL, MANAGER_NAME, MANAGER_TITLE, WHATSAPP_DISPLAY, WHATSAPP_NUMBER, emailLink, landlineLink, telLink } from "../lib/contact";
import { cleanPhone } from "../lib/phone";
import { cardContentVariants, softSpringTransition, staggerContainerVariants, staticCardVariants } from "../components/card-motion";

const processSteps = [
  {
    title: "e-Polis aur policy services",
    description: "Official digital services ke zariye policy information dekhein. Zaroorat par Sukkur office aapko sahi channel tak guide karega.",
  },
  {
    title: "Claim ki rehnumai",
    description: "Required documents aur claim ke aglay steps samajhne ke liye local team se rabta karein.",
  },
  {
    title: "Cashless support",
    description: "Health-related cashless support aur eligibility ki tafseel policy aur provider ke mutabiq office se confirm karein.",
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
    question: "Kya family coverage options available hain?",
    answer: "Bilkul. Family Protection, Life Insurance, aur Retirement ke options ke liye office se guidance lein.",
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
  category: "",
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

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const [openProcess, setOpenProcess] = useState(0);
  const [statsProgress, setStatsProgress] = useState(0);
  const [policySearch, setPolicySearch] = useState("");
  const [policyFilter, setPolicyFilter] = useState("All goals");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [contactData, setContactData] = useState(initialContactForm);
  const [contactPhoneError, setContactPhoneError] = useState("");
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [planStatus, setPlanStatus] = useState<"idle" | "sending" | "error">("idle");
  const [managerImageFailed, setManagerImageFailed] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  const [productPaused, setProductPaused] = useState(false);
  const [productVisibleCount, setProductVisibleCount] = useState(1);
  const [failedProductImages, setFailedProductImages] = useState<string[]>([]);
  const productCarouselRef = useRef<HTMLDivElement>(null);
  const productResumeTimerRef = useRef<number | null>(null);
  const router = useRouter();

  const plansForCategory = selectedCategory
    ? plans.filter((item: Plan) => item.type === selectedCategory)
    : [];
  const visibleHomePolicies = homePolicies.filter((policy) => {
    const matchesFilter = policyFilter === "All goals" || policy.title === policyFilter;
    const query = policySearch.trim().toLowerCase();
    const matchesSearch = !query || `${policy.title} ${policy.description}`.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    const updateVisibleCount = () => {
      setProductVisibleCount(window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 2 : 1);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const scrollToProduct = (index: number) => {
    const nextIndex = (index + products.length) % products.length;
    const carousel = productCarouselRef.current;
    const card = carousel?.children[nextIndex] as HTMLElement | undefined;
    setProductIndex(nextIndex);
    if (card) carousel?.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  };

  const pauseProductCarousel = () => {
    setProductPaused(true);
    if (productResumeTimerRef.current) window.clearTimeout(productResumeTimerRef.current);
    productResumeTimerRef.current = window.setTimeout(() => setProductPaused(false), 6000);
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let startTime = 0;
    let animationFrame = 0;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 1100, 1);
      setStatsProgress(progress);
      if (progress < 1) animationFrame = window.requestAnimationFrame(animate);
    };
    animationFrame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    const carousel = productCarouselRef.current;
    if (!carousel) return;

    const updateIndexFromScroll = () => {
      const cards = Array.from(carousel.children) as HTMLElement[];
      const nearestIndex = cards.reduce((closest, card, index) => {
        const closestDistance = Math.abs(cards[closest].offsetLeft - carousel.scrollLeft);
        const distance = Math.abs(card.offsetLeft - carousel.scrollLeft);
        return distance < closestDistance ? index : closest;
      }, 0);
      setProductIndex(nearestIndex);
    };

    carousel.addEventListener("scroll", updateIndexFromScroll, { passive: true });
    return () => carousel.removeEventListener("scroll", updateIndexFromScroll);
  }, [productVisibleCount]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || productPaused) return;

    const timer = window.setInterval(() => scrollToProduct(productIndex + 1), 4000);
    return () => window.clearInterval(timer);
  }, [productIndex, productPaused]);

  useEffect(() => {
    const handleVisibility = () => setProductPaused(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

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

  const openProductCategory = (category: string) => {
    setSelectedCategory(category);
    setShowForm(false);
    setIsSubmitted(false);
    setErrors({});
    setFormData({ ...initialForm, selectedPlan: category });
  };

  const openHomePolicy = (policy: HomePolicy) => {
    if (policy.planCategory === "Health") {
      router.push("/health-insurance");
      return;
    }
    openProductCategory(policy.planCategory);
  };

  const handleProductOpen = (product: (typeof products)[number]) => {
    if (product.action === "health") {
      router.push("/health-insurance");
      return;
    }

    if (product.action === "corporate") {
      setContactData((current) => ({ ...current, category: "Corporate" }));
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (product.action === "digital") {
      window.open("https://www.statelife.com.pk/en", "_blank", "noopener,noreferrer");
      return;
    }
    openProductCategory(product.title);
  };

  const handleInputChange = (field: keyof typeof initialForm, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const nextErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) nextErrors.name = "Poora naam likhein.";
    if (!cleanPhone(formData.phone)) nextErrors.phone = "Sahi number likhein (kam se kam 7 digits).";
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
    if (field === "phone") setContactPhoneError("");
    setContactStatus("idle");
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cleanPhone(contactData.phone)) {
      setContactPhoneError("Sahi number likhein (kam se kam 7 digits).");
      return;
    }
    setContactPhoneError("");
    setContactStatus("sending");

    const payload = {
      type: "contact",
      name: contactData.name,
      phone: cleanPhone(contactData.phone),
      email: contactData.email || null,
      plan: contactData.category || null,
      message: contactData.message || null,
      consent: contactData.consent,
      website: contactData.website || null,
    };

    const apiSuccess = await submitLead(payload);
    let directSuccess = false;

    if (!supabase) {
      console.error(
        "Supabase client is unavailable. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY before direct insert.",
      );
    } else {
      try {
        const { error } = await supabase.from("leads").insert([payload]);

        if (error) {
          throw error;
        }

        directSuccess = true;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Supabase contact insert failed:", message);
      }
    }

    const success = apiSuccess || directSuccess;
    setContactStatus(success ? "success" : "error");
    if (success) setContactData(initialContactForm);
  };

  return (
    <main className="relative z-10 min-w-0 max-w-full overflow-x-clip bg-[#f5f7f3] pb-24 text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:pb-0">
      <div className="fixed inset-x-3 bottom-3 z-50 flex gap-3 md:hidden">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center rounded-full bg-[#1f8a67] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1f8a67]/25"
        >
          WhatsApp
        </a>
        <a
          href={telLink()}
          className="flex flex-1 items-center justify-center rounded-full bg-[var(--brand-blue-700)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/25"
        >
          Call
        </a>
      </div>

      <Hero
        policyGoals={homePolicies.map((policy) => policy.title)}
        policySearch={policySearch}
        onPolicySearchChange={setPolicySearch}
        policyFilter={policyFilter}
        onPolicyFilterChange={setPolicyFilter}
      />

      <section aria-label="Sukkur Area Office at a glance" className="border-y border-[#e1e8e2] bg-white dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-[#e6ece7] px-4 sm:px-6 lg:grid-cols-4 lg:divide-y-0 lg:px-8 dark:divide-slate-700">
          <ScrollReveal className="px-3 py-5 sm:px-6 sm:py-7">
            <span className="sr-only">5,000+ Active Sukkur Policies</span><p aria-hidden="true" className="text-2xl font-black tabular-nums text-[#163c35] sm:text-3xl motion-reduce:hidden dark:text-slate-100">{Math.floor(5000 * statsProgress).toLocaleString("en-US")}+</p><p aria-hidden="true" className="hidden text-2xl font-black tabular-nums text-[#163c35] sm:text-3xl motion-reduce:block dark:text-slate-100">5,000+</p><p className="mt-1 text-xs font-medium leading-5 text-[#64756e] sm:text-sm dark:text-slate-300">Active Sukkur Policies</p>
          </ScrollReveal>
          <ScrollReveal delayMs={120} className="px-3 py-5 sm:px-6 sm:py-7">
            <span className="sr-only">100% State-Backed Security</span><p aria-hidden="true" className="text-2xl font-black tabular-nums text-[#163c35] sm:text-3xl motion-reduce:hidden dark:text-slate-100">{Math.floor(100 * statsProgress)}%</p><p aria-hidden="true" className="hidden text-2xl font-black tabular-nums text-[#163c35] sm:text-3xl motion-reduce:block dark:text-slate-100">100%</p><p className="mt-1 text-xs font-medium leading-5 text-[#64756e] sm:text-sm dark:text-slate-300">State-Backed Security</p>
          </ScrollReveal>
          <ScrollReveal delayMs={240} className="px-3 py-5 sm:px-6 sm:py-7">
            <span className="sr-only">PKR 50M+ Claims Facilitated</span><p aria-hidden="true" className="text-2xl font-black tabular-nums text-[#163c35] sm:text-3xl motion-reduce:hidden dark:text-slate-100">PKR {Math.floor(50 * statsProgress)}M+</p><p aria-hidden="true" className="hidden text-2xl font-black tabular-nums text-[#163c35] sm:text-3xl motion-reduce:block dark:text-slate-100">PKR 50M+</p><p className="mt-1 text-xs font-medium leading-5 text-[#64756e] sm:text-sm dark:text-slate-300">Claims Facilitated</p>
          </ScrollReveal>
          <ScrollReveal delayMs={360} className="px-3 py-5 sm:px-6 sm:py-7">
            <span className="sr-only">24/7 Area Office Support Desk</span><p aria-hidden="true" className="text-2xl font-black tabular-nums text-[#163c35] sm:text-3xl motion-reduce:hidden dark:text-slate-100">{Math.floor(24 * statsProgress)}/7</p><p aria-hidden="true" className="hidden text-2xl font-black tabular-nums text-[#163c35] sm:text-3xl motion-reduce:block dark:text-slate-100">24/7</p><p className="mt-1 text-xs font-medium leading-5 text-[#64756e] sm:text-sm dark:text-slate-300">Area Office Support Desk</p>
          </ScrollReveal>
        </div>
      </section>

      <Products policies={visibleHomePolicies} onLearnMore={openHomePolicy} />

      <section id="products" className="scroll-mt-30 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:scroll-mt-34 lg:px-8">
        <ScrollReveal className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#176b55]">More ways to plan</p>
          <h2 className="mt-3 text-3xl font-bold text-[#17332e] sm:text-4xl dark:text-white">Explore all coverage options</h2>
        </ScrollReveal>

        <ScrollReveal delayMs={100}>
        <div
          className="relative"
          role="region"
          aria-roledescription="carousel"
          aria-label="Products"
          onMouseEnter={() => setProductPaused(true)}
          onMouseLeave={() => setProductPaused(false)}
          onFocusCapture={() => setProductPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setProductPaused(false);
          }}
          onTouchStart={() => setProductPaused(true)}
          onTouchEnd={pauseProductCarousel}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              pauseProductCarousel();
              scrollToProduct(productIndex - 1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              pauseProductCarousel();
              scrollToProduct(productIndex + 1);
            }
          }}
        >
          <button type="button" aria-label="Pichla product" onClick={() => { pauseProductCarousel(); scrollToProduct(productIndex - 1); }} className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-2xl leading-none text-[var(--brand-blue-700)] shadow-lg transition hover:bg-[var(--brand-blue-100)]">
            ‹
          </button>
          <button type="button" aria-label="Agla product" onClick={() => { pauseProductCarousel(); scrollToProduct(productIndex + 1); }} className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-2xl leading-none text-[var(--brand-blue-700)] shadow-lg transition hover:bg-[var(--brand-blue-100)]">
            ›
          </button>

          <div ref={productCarouselRef} className="flex touch-pan-x touch-pan-y snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden overscroll-x-contain px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {products.map((product) => (
              <article
                key={product.slug}
                onClick={() => handleProductOpen(product)}
                className="group relative flex h-full min-w-0 flex-[0_0_85%] snap-start flex-col overflow-hidden rounded-bl-[64px] rounded-br-xl rounded-tl-xl rounded-tr-[64px] border border-slate-200 bg-[#F5F5F5] p-4 text-left text-[#0b2240] shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 sm:flex-[0_0_45%] lg:flex-[0_0_calc((100%_-_4.5rem)/4)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-tr-[64px] rounded-tl-xl bg-gradient-to-br from-blue-100 to-sky-200">
                  {product.image && !failedProductImages.includes(product.image) && <Image src={product.image} alt={product.alt} fill sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 25vw" className="object-cover" style={{ objectPosition: product.imagePosition }} onError={() => setFailedProductImages((current) => [...current, product.image as string])} />}
                </div>
                <div className="flex flex-1 flex-col p-3 pb-16">
                  <h3 className="text-xl font-bold">{product.title}</h3>
                  <p className="mt-3 line-clamp-3 text-base leading-7 text-slate-600 dark:text-slate-300">{product.description}</p>
                  {product.action === "digital" && <span className="mt-3 text-sm font-semibold text-[var(--brand-blue-700)]">Official website</span>}
                </div>
                {product.action === "digital" ? (
                  <a href="https://www.statelife.com.pk/en" target="_blank" rel="noopener noreferrer" aria-label={`${product.title} kholein`} onClick={(event) => event.stopPropagation()} className="absolute bottom-0 right-0 flex h-12 w-14 items-center justify-center rounded-tl-3xl bg-[#0A4DB3] text-3xl leading-none text-white transition hover:bg-[var(--brand-blue-700)]">›</a>
                ) : (
                  <button type="button" aria-label={`${product.title} kholein`} onClick={(event) => { event.stopPropagation(); handleProductOpen(product); }} className="absolute bottom-0 right-0 flex h-12 w-14 items-center justify-center rounded-tl-3xl bg-[#0A4DB3] text-3xl leading-none text-white transition hover:bg-[var(--brand-blue-700)]">›</button>
                )}
              </article>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-3">
            {products.map((product, index) => <button key={product.slug} type="button" aria-label={`${product.title} par jayein`} aria-current={productIndex === index ? "true" : undefined} onClick={() => { pauseProductCarousel(); scrollToProduct(index); }} className={`h-2.5 rounded-full transition-all ${productIndex === index ? "w-7 bg-[var(--brand-blue-500)]" : "w-2.5 bg-white/60 hover:bg-white"}`} />)}
            <button type="button" aria-label={productPaused ? "Products carousel play karein" : "Products carousel pause karein"} onClick={() => setProductPaused((paused) => !paused)} className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-bold text-[var(--brand-blue-700)] shadow-sm">
              {productPaused ? "▶" : "Ⅱ"}
            </button>
          </div>
        </div>
        </ScrollReveal>
      </section>

      <section id="services" className="scroll-mt-30 bg-[#eaf0ea] py-14 sm:py-16 dark:bg-slate-900 lg:scroll-mt-34">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:px-8">
          <ScrollReveal className="max-w-lg">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#176b55]">From first question to ongoing care</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#17332e] sm:text-4xl dark:text-white">Support at every step</h2>
            <p className="mt-4 text-base leading-7 text-[#60736b] dark:text-slate-300">Clear local guidance for policy services, claims, and health support. Open a step to see where to start.</p>
          </ScrollReveal>

          <div className="divide-y divide-[#d5e0d7] border-y border-[#d5e0d7]">
            {processSteps.map((step, index) => (
              <ScrollReveal key={step.title} delayMs={index * 150}>
                <button type="button" onClick={() => setOpenProcess(openProcess === index ? -1 : index)} aria-expanded={openProcess === index} className="flex min-h-16 w-full min-w-0 items-center gap-4 py-4 text-left">
                  <span className="w-8 shrink-0 font-mono text-sm font-bold text-[#7a9186]">0{index + 1}</span>
                  <span className="min-w-0 flex-1 text-base font-bold text-[#183630] sm:text-lg dark:text-slate-100">{step.title}</span>
                  <ChevronDown size={19} className={`shrink-0 text-[#176b55] transition-transform ${openProcess === index ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {openProcess === index && <p className="max-w-2xl pb-5 pl-12 pr-2 text-sm leading-6 text-[#60736b] sm:text-base dark:text-slate-300">{step.description}</p>}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-30 overflow-hidden bg-[#143a35] py-14 text-white sm:py-16 lg:scroll-mt-34">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a6d4bb]">Your local point of contact</p>
            <h2 className="mt-3 max-w-xl text-3xl font-black leading-tight sm:text-4xl">Personal guidance, right here in Sukkur</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#d0e0d7]">Meet the Area Office team for policy questions, documentation guidance, and in-person assistance.</p>
            <div className="mt-7 flex items-start gap-3 text-sm leading-6 text-[#e2ede7]">
              <MapPin size={19} className="mt-0.5 shrink-0 text-[#a6d4bb]" aria-hidden="true" />
              <span>Shahlimar Road, near Session Court, Sukkur</span>
            </div>
            <div className="mt-3 flex items-start gap-3 text-sm leading-6 text-[#e2ede7]">
              <Clock3 size={19} className="mt-0.5 shrink-0 text-[#a6d4bb]" aria-hidden="true" />
              <span>Monday to Friday, 9:00 AM to 5:00 PM</span>
            </div>
            <a href="https://www.google.com/maps/dir/?api=1&destination=Shahlimar+Road,+near+Session+Court,+Sukkur,+Pakistan" target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10">Get directions <ArrowUpRight size={16} aria-hidden="true" /></a>
          </ScrollReveal>

          <ScrollReveal delayMs={150} className="glass grid min-w-0 items-center gap-5 rounded-2xl p-4 text-white sm:grid-cols-[minmax(130px,0.75fr)_1.25fr] sm:p-5">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-[#355b50]">
              {!managerImageFailed && <Image src="/area-manager.jpg" alt="Mr. Fayyaz Ahmed, Area Manager" fill sizes="(max-width: 639px) 100vw, 24vw" className="object-cover object-top" onError={() => setManagerImageFailed(true)} />}
            </div>
            <div className="min-w-0 py-2">
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-200/25 bg-emerald-300/10 px-3 py-2 text-xs font-bold leading-5 text-emerald-100">
                <span className="relative flex h-2.5 w-2.5 shrink-0"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" /></span>
                <span>Sukkur Area Desk Active</span>
              </span>
              <p className="mt-5 wrap-break-word text-2xl font-black leading-tight sm:text-3xl">{MANAGER_NAME}</p>
              <p className="mt-2 text-sm font-semibold text-[#c5d9ce]">{MANAGER_TITLE} · Sukkur Area Office {AREA_CODE}</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Testimonials />

      <section className="bg-transparent py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f8a67]">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Common questions, clear answers</h2>
          </ScrollReveal>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                variants={staticCardVariants}
                whileHover={{ y: -4, scale: 1.01, boxShadow: "0px 16px 24px rgba(0,0,0,0.10)" }}
                transition={softSpringTransition}
                className="overflow-hidden rounded-xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80"
              >
                <motion.div variants={cardContentVariants}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={openFaq === index}
                >
                  <span className="text-base font-semibold text-slate-900 dark:text-slate-100 dark:group-hover:text-blue-400">{faq.question}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eafaf4] text-lg font-bold text-[#1f8a67]">
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>

                {openFaq === index && (
                  <div className="px-5 pb-5 text-base leading-7 text-slate-600 dark:text-slate-300">{faq.answer}</div>
                )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-30 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:scroll-mt-34 lg:px-8">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ y: -4, scale: 1.01, boxShadow: "0px 16px 24px rgba(0,0,0,0.10)" }}
          transition={softSpringTransition}
          className="grid gap-8 rounded-[32px] border border-slate-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80 lg:grid-cols-[0.9fr_1.1fr] lg:p-10"
        >
          <motion.div variants={staticCardVariants}>
          <motion.div variants={cardContentVariants}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f8a67]">Contact</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Free consultation ke liye rabta karein</h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-700 dark:text-slate-200">
              Aap humse message, call, ya WhatsApp ke zariye contact kar sakte hain. Team aapke sawalat ka jawab dene ke liye ready hai.
            </p>

            <div className="mt-8 space-y-4 font-semibold text-slate-700 dark:text-slate-200">
              <p><span className="font-semibold text-slate-800 dark:text-slate-200">Address:</span> Shahlimar Road, near Session Court, Sukkur</p>
              <p><span className="font-semibold text-slate-800 dark:text-slate-200">Phone:</span> Call / WhatsApp</p>
              <p><span className="font-semibold text-slate-800 dark:text-slate-200">Timings:</span> Mon-Fri, 9:00 AM to 5:00 PM</p>
            </div>

            <div className="mt-8">
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Shahlimar+Road,+near+Session+Court,+Sukkur,+Pakistan"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--brand-blue-500)] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:bg-[var(--brand-blue-700)]"
                >
                  Get Directions
                </a>
                <a
                  href={landlineLink()}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-6 py-3.5 text-base font-bold text-emerald-800 transition hover:border-emerald-400 hover:bg-emerald-100 dark:border-emerald-400/50 dark:bg-emerald-950 dark:text-emerald-200 dark:hover:bg-emerald-900"
                >
                  <PhoneIcon />
                  Office Landline
                </a>
              </div>
            </div>
          </motion.div>
          </motion.div>

          <motion.div variants={staticCardVariants}>
          <form onSubmit={handleContactSubmit}>
            <motion.div variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="space-y-5">
            <motion.div variants={staticCardVariants} className="grid gap-5 sm:grid-cols-2">
              <motion.div variants={cardContentVariants}>
                <label className="mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200">Naam</label>
                <input
                  type="text"
                  value={contactData.name}
                  onChange={(event) => handleContactChange("name", event.target.value)}
                  placeholder="Aapka naam"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-[#1f8a67] focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:bg-slate-800"
                />
              </motion.div>
              <motion.div variants={cardContentVariants}>
                <label className="mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200">Phone</label>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={contactData.phone}
                  onChange={(event) => handleContactChange("phone", event.target.value)}
                  placeholder="Apna phone number likhein"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-[#1f8a67] focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:bg-slate-800"
                />
                {contactPhoneError && <p className="mt-1 text-sm text-red-600">{contactPhoneError}</p>}
              </motion.div>
            </motion.div>

            <motion.div variants={cardContentVariants}>
              <label className="mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200">Email (optional)</label>
              <input
                type="email"
                value={contactData.email}
                onChange={(event) => handleContactChange("email", event.target.value)}
                placeholder="Aapki email"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-[#1f8a67] focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:bg-slate-800"
              />
            </motion.div>

            <motion.div variants={cardContentVariants}>
              <label className="mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200">Category (optional)</label>
              <select
                value={contactData.category}
                onChange={(event) => handleContactChange("category", event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-[#1f8a67] focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:bg-slate-800"
              >
                <option value="">Select karein</option>
                <option value="Corporate">Corporate</option>
                <option value="Individual">Individual</option>
                <option value="Family">Family</option>
              </select>
            </motion.div>

            <motion.div variants={cardContentVariants}>
              <label className="mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200">Message</label>
              <textarea
                rows={5}
                value={contactData.message}
                onChange={(event) => handleContactChange("message", event.target.value)}
                placeholder="Aap apni query likhein..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-[#1f8a67] focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:bg-slate-800"
              />
            </motion.div>

            <motion.div variants={cardContentVariants} className="rounded-2xl border border-slate-200/60 bg-white/80 p-4 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80">
              <label className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={contactData.consent}
                  onChange={(event) => handleContactChange("consent", event.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#1f8a67]"
                />
                <span>Main apni info office ko dene ki ijazat deta hun.</span>
              </label>
            </motion.div>

            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={contactData.website}
              onChange={(event) => handleContactChange("website", event.target.value)}
              className="hidden"
            />

            <motion.button
              variants={cardContentVariants}
              type="submit"
              disabled={contactStatus === "sending"}
              className="inline-flex items-center justify-center rounded-full bg-[var(--brand-blue-700)] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[var(--brand-blue-900)]"
            >
              {contactStatus === "sending" ? "Bhej rahe hain..." : "Send"}
            </motion.button>
            {contactStatus === "success" && (
              <motion.div variants={cardContentVariants} className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                <p className="font-bold">Thank You for Contacting Us!</p>
                <p className="mt-1 text-sm leading-6">We have received your message. Our representative from State Life Sukkur Area Office 5405 will contact you shortly.</p>
              </motion.div>
            )}
            {contactStatus === "error" && <motion.p variants={cardContentVariants} className="text-sm font-medium text-red-600">Kuch masla aa gaya, baraye meherbani WhatsApp par rabta karein</motion.p>}
            </motion.div>
          </form>
          </motion.div>
        </motion.div>
      </section>

      <section className="px-4 pb-6 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto flex max-w-7xl min-w-0 flex-col justify-between gap-6 rounded-2xl bg-[#dcebe1] p-5 sm:p-8 lg:flex-row lg:items-center lg:px-10">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#176b55]">Talk to a local advisor</p>
            <h2 className="mt-2 max-w-2xl text-2xl font-black leading-tight text-[#17332e] sm:text-3xl">A clear first conversation can make planning easier.</h2>
          </div>
          <div className="flex min-w-0 flex-wrap gap-3">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#087653] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#056346]">WhatsApp <ArrowUpRight size={16} aria-hidden="true" /></a>
            <a href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#a7c4b1] bg-white/80 px-5 py-3 text-sm font-bold text-[#17332e] transition hover:bg-white">Book a consultation</a>
          </div>
        </ScrollReveal>
      </section>

      <footer className="px-4 pb-5 pt-2 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ y: -4, scale: 1.01, boxShadow: "0px 16px 24px rgba(0,0,0,0.10)" }}
          transition={softSpringTransition}
          className="mx-auto grid max-w-7xl min-w-0 gap-9 rounded-2xl bg-[#132d2a] p-5 text-[#d7e2dc] sm:p-8 lg:grid-cols-[1.25fr_0.7fr_1.15fr_0.9fr] lg:gap-8 lg:p-10"
        >
          <motion.div variants={staticCardVariants} className="min-w-0">
          <motion.div variants={cardContentVariants}>
            <div className="flex min-w-0 items-center gap-3">
              <Image src="/area-logo.png" alt="Sukkur Area Office logo" width={210} height={74} className="h-11 w-32 shrink-0 rounded-md bg-white p-1 object-contain" />
              <div className="min-w-0"><p className="text-base font-bold text-white">Sukkur Area Office</p><p className="text-xs leading-5 text-[#aabbb2]">State Life Insurance · {AREA_CODE}</p></div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[#b9c9c1]">Local policy guidance and in-person support for families in Sukkur.</p>
          </motion.div>
          </motion.div>

          <motion.div variants={staticCardVariants}>
          <motion.div variants={cardContentVariants}>
            <h3 className="text-sm font-bold text-white">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#b9c9c1]">
              <li><a href="/products" className="hover:text-white">Products</a></li>
              <li><a href="/services" className="hover:text-white">Services</a></li>
              <li><a href="/about" className="hover:text-white">About us</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </motion.div>
          </motion.div>

          <motion.div variants={staticCardVariants} className="min-w-0">
          <motion.div variants={cardContentVariants}>
            <h3 className="text-sm font-bold text-white">Official contact</h3>
            <ul className="mt-4 space-y-3 wrap-break-word text-sm leading-6 text-[#b9c9c1]">
              <li>Shahlimar Road, near Session Court, Sukkur</li>
              <li><a href={landlineLink()} className="inline-flex min-h-10 items-center rounded-full border border-emerald-300/40 px-3 font-semibold text-emerald-300 transition-colors hover:bg-emerald-300/10 hover:text-emerald-200">Office Landline</a></li>
              <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="font-semibold text-emerald-300 transition-colors hover:text-emerald-200">WhatsApp: {WHATSAPP_DISPLAY}</a></li>
              <li><a href={emailLink()} className="font-semibold text-cyan-200 transition-colors hover:text-emerald-200">{CONTACT_EMAIL}</a></li>
              <li>Monday to Friday · 9 AM to 5 PM</li>
            </ul>
          </motion.div>
          </motion.div>

          <motion.div variants={staticCardVariants}>
          <motion.div variants={cardContentVariants}>
            <h3 className="text-sm font-bold text-white">Connect</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#b9c9c1]">
              <li><a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white"><FacebookIcon /> Facebook</a></li>
              <li><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white"><LinkedInIcon /> LinkedIn</a></li>
              <li><a href={emailLink()} className="inline-flex items-center gap-2 hover:text-white"><MailIcon /> Email us</a></li>
            </ul>
          </motion.div>
          </motion.div>
        </motion.div>

        <motion.p
          variants={cardContentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-5 max-w-7xl px-1 text-center text-xs leading-5 text-[#687b71]"
        >Ye website Sukkur Area Office ki taraf se hai. Policy payment aur login ke liye official channels use karein.</motion.p>
      </footer>

      {selectedCategory && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60" onClick={resetModalState} />
          <div className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[28px] border border-slate-200 bg-white p-5 text-slate-900 shadow-2xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 sm:p-6">
            <button
              type="button"
              onClick={resetModalState}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              aria-label="Close modal"
            >
              ×
            </button>

            {!showForm ? (
              <>
                <div className="pr-12">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1f8a67]">Products</p>
                  <h3 className="mt-3 text-3xl font-bold text-[#0b2240] dark:text-white">{selectedCategory}</h3>
                </div>

                <div className="mt-6 hidden overflow-x-auto md:block">
                  <table className="min-w-full overflow-hidden rounded-2xl border border-slate-200">
                    <thead className="bg-[#edf7f3] text-left text-sm text-[#0b2240] dark:bg-slate-800 dark:text-slate-100">
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
                        <tr key={plan.name} className="border-t border-slate-200 align-top dark:border-slate-700">
                          <td className="px-4 py-3 font-medium text-[#0b2240] dark:text-slate-100">{plan.name}</td>
                          <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{plan.bestFor}</td>
                          <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{plan.term}</td>
                          <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{plan.ageLimit}</td>
                          <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{plan.details}</td>
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
                    <div key={plan.name} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                      <div className="mb-3">
                        <p className="text-sm text-slate-500">Plan Name</p>
                        <p className="text-lg font-bold text-[#0b2240] dark:text-slate-100">{plan.name}</p>
                      </div>
                      <div className="grid gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <p><span className="font-semibold text-[#0b2240] dark:text-slate-100">Best For:</span> {plan.bestFor}</p>
                        <p><span className="font-semibold text-[#0b2240] dark:text-slate-100">Term:</span> {plan.term}</p>
                        <p><span className="font-semibold text-[#0b2240] dark:text-slate-100">Age Limit:</span> {plan.ageLimit}</p>
                        <p><span className="font-semibold text-[#0b2240] dark:text-slate-100">Details:</span> {plan.details}</p>
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
                  <h3 className="mt-3 text-2xl font-bold text-[#0b2240] dark:text-white">{formData.selectedPlan || selectedCategory}</h3>
                </div>

                {isSubmitted ? (
                  <div className="mt-8 rounded-[24px] border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-900 dark:bg-emerald-950">
                    <p className="text-xl font-bold text-[#0b2240] dark:text-emerald-100">Thank You for Contacting Us!</p>
                    <p className="mt-2 leading-7 text-slate-600 dark:text-emerald-200">We have received your message. Our representative from State Life Sukkur Area Office 5405 will contact you shortly.</p>
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
                          inputMode="tel"
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={(event) => handleInputChange("phone", event.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-[#1f8a67] focus:bg-white"
                          placeholder="Apna phone number likhein"
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

