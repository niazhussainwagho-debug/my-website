"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CarouselArrow from "./CarouselArrow";
import ScrollReveal from "./ScrollReveal";
import { cardContentVariants, softSpringTransition, staggerContainerVariants, staticCardVariants } from "./card-motion";

const testimonials = [
  {
    initials: "AK",
    name: "Ayesha K.",
    text: "Office team ne bahut clear tarike se policy samjhayi. Family protection plan ka option bohat useful tha.",
  },
  {
    initials: "NH",
    name: "Nadir Hussain",
    text: "Premium guidance aur claim process bahut professional tha. Team ne har sawal ka jawab politely diya.",
  },
  {
    initials: "SA",
    name: "Sameer Ahmed",
    text: "Life insurance ka decision lene mein help mili. Overall experience smooth aur trustworthy raha.",
  },
];

export default function Testimonials() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const updateScrollState = () => {
      setCanScrollPrevious(carousel.scrollLeft > 1);
      setCanScrollNext(carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 1);
    };

    updateScrollState();
    carousel.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      carousel.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollBy = (direction: -1 | 1) => carouselRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="scroll-mt-30 bg-[#020617] px-4 py-14 text-white sm:px-6 sm:py-16 lg:scroll-mt-34 lg:px-8">
      <ScrollReveal className="mb-8 max-w-xl">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">Community feedback</p>
        <h2 id="testimonials-heading" className="mt-2 text-3xl font-black leading-tight text-white sm:text-4xl">Families value clear guidance</h2>
      </ScrollReveal>

      <div className="mb-3 flex justify-end gap-2">
        <CarouselArrow direction="previous" label="Previous testimonial" disabled={!canScrollPrevious} onClick={() => scrollBy(-1)} />
        <CarouselArrow direction="next" label="Next testimonial" disabled={!canScrollNext} onClick={() => scrollBy(1)} />
      </div>

      <motion.div
        ref={carouselRef}
        role="region"
        aria-label="Community testimonials"
        aria-roledescription="carousel"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((review) => (
          <motion.article
            key={review.name}
            variants={staticCardVariants}
            whileHover={{ y: -4, scale: 1.01, boxShadow: "0px 16px 24px rgba(0,0,0,0.10)" }}
            transition={softSpringTransition}
            className="group flex min-w-0 flex-[0_0_88%] snap-start flex-col overflow-hidden rounded-xl border border-slate-800/80 bg-[#0b1328] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.16)] backdrop-blur-md sm:flex-[0_0_70%] sm:p-6 md:flex-[0_0_calc((100%_-_1rem)/2)] lg:flex-[0_0_calc((100%_-_2rem)/3)]"
          >
            <motion.div variants={cardContentVariants} className="flex h-full min-w-0 flex-col">
              <div aria-label="5 out of 5 stars" className="text-sm leading-none tracking-[0.12em] text-amber-500">★★★★★</div>
              <blockquote className="mt-4 flex-1 text-sm font-semibold leading-6 text-slate-200">“{review.text}”</blockquote>
              <div className="mt-5 flex min-w-0 items-center gap-3 border-t border-slate-700 pt-4">
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e7f3ec] text-xs font-black text-[#176b55]">{review.initials}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-white">{review.name}</p>
                  <p className="mt-0.5 text-xs font-semibold text-slate-300">Verified Client <span aria-hidden="true">·</span> Sukkur</p>
                </div>
              </div>
            </motion.div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}