const testimonials = [
  {
    initials: "AK",
    name: "Ayesha K.",
    text: "Office team ne bahut clear tarike se policy samjhayi. Family protection plan ka option bohat useful tha.",
  },
  {
    initials: "MA",
    name: "Muhammad Ali",
    text: "Premium guidance aur claim process bahut professional tha. Team ne har sawal ka jawab politely diya.",
  },
  {
    initials: "ZR",
    name: "Zahid R.",
    text: "Life insurance ka decision lene mein help mili. Overall experience smooth aur trustworthy raha.",
  },
];

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mb-8 max-w-xl">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#176b55]">Community feedback</p>
        <h2 id="testimonials-heading" className="mt-2 text-3xl font-black leading-tight text-[#17332e] sm:text-4xl">Families value clear guidance</h2>
      </div>

      <div className="grid min-w-0 gap-4 md:grid-cols-3">
        {testimonials.map((review) => (
          <article key={review.name} className="group flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg sm:p-6">
            <div aria-label="5 out of 5 stars" className="text-sm leading-none tracking-[0.12em] text-amber-500">★★★★★</div>
            <blockquote className="mt-4 flex-1 text-sm leading-6 text-slate-600">“{review.text}”</blockquote>
            <div className="mt-5 flex min-w-0 items-center gap-3 border-t border-slate-100 pt-4">
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e7f3ec] text-xs font-black text-[#176b55]">{review.initials}</span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#17332e]">{review.name}</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500">Verified Client <span aria-hidden="true">·</span> Sukkur</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}