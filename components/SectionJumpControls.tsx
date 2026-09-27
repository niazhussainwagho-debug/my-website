"use client";

import { useEffect, useState } from "react";
import CarouselArrow from "./CarouselArrow";

const pageSections = [
  { id: "home", label: "Home" },
  { id: "overview", label: "Overview" },
  { id: "policies", label: "Coverage options" },
  { id: "products", label: "Products" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export default function SectionJumpControls() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveSection = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const marker = window.innerHeight * 0.55;
        let nextIndex = 0;

        pageSections.forEach((section, index) => {
          const element = document.getElementById(section.id);
          if (element && element.getBoundingClientRect().top <= marker) nextIndex = index;
        });

        setActiveIndex(nextIndex);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const jumpTo = (index: number) => {
    const section = pageSections[index];
    if (section) document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const previousSection = pageSections[activeIndex - 1];
  const nextSection = pageSections[activeIndex + 1];

  return (
    <nav aria-label="Page section navigation" className="fixed bottom-20 right-3 z-40 flex gap-2 md:bottom-5 md:right-5">
      <CarouselArrow
        direction="previous"
        label={previousSection ? `Previous section: ${previousSection.label}` : "First section"}
        disabled={!previousSection}
        onClick={() => jumpTo(activeIndex - 1)}
      />
      <CarouselArrow
        direction="next"
        label={nextSection ? `Next section: ${nextSection.label}` : "Last section"}
        disabled={!nextSection}
        onClick={() => jumpTo(activeIndex + 1)}
      />
    </nav>
  );
}