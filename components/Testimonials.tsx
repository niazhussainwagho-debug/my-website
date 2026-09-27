"use client";

import { motion } from "framer-motion";
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
  return (
    <section aria-labelledby="testimonials-heading" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <ScrollReveal className="mb-8 max-w-xl">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#176b55] dark:text-emerald-300">Community feedback</p>
        <h2 id="testimonials-heading" className="mt-2 text-3xl font-black leading-tight text-[#17332e] dark:text-white sm:text-4xl">Families value clear guidance</h2>
      </ScrollReveal>

      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid min-w-0 gap-4 md:grid-cols-3"
      >
        {testimonials.map((review) => (
          <motion.article
            key={review.name}
            variants={staticCardVariants}
            whileHover={{ y: -4, scale: 1.01, boxShadow: "0px 16px 24px rgba(0,0,0,0.10)" }}
            transition={softSpringTransition}
            className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200/60 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/80 sm:p-6"
          >
            <motion.div variants={cardContentVariants} className="flex h-full min-w-0 flex-col">
              <div aria-label="5 out of 5 stars" className="text-sm leading-none tracking-[0.12em] text-amber-500">★★★★★</div>
              <blockquote className="mt-4 flex-1 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200">“{review.text}”</blockquote>
              <div className="mt-5 flex min-w-0 items-center gap-3 border-t border-slate-100 pt-4">
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e7f3ec] text-xs font-black text-[#176b55]">{review.initials}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#17332e] dark:text-white">{review.name}</p>
                    <p className="mt-0.5 text-xs font-semibold text-slate-600 dark:text-slate-300">Verified Client <span aria-hidden="true">·</span> Sukkur</p>
                </div>
              </div>
            </motion.div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}