"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CarouselArrow from "./CarouselArrow";

type NavigationSection = { id: string; label: string };

const sectionIdsByRoute: Record<string, string[]> = {
  "/": ["hero", "overview", "policies", "products", "services", "about", "testimonials", "faq", "contact", "local-advisor", "footer"],
  "/about": ["hero", "about-intro", "mission", "contact", "footer"],
  "/products": ["hero", "policies", "contact"],
  "/services": ["hero", "services", "products"],
  "/contact": ["hero", "contact", "footer"],
  "/health-insurance": ["hero", "coverage-options", "how-it-works", "official-links", "health-enquiry", "faq", "footer"],
  "/become-an-agent": ["hero", "process", "documents", "requirements", "forms", "pre-registration", "faq", "footer"],
  "/checkout": ["hero", "application"],
};

function getNavigationSections(pathname: string): NavigationSection[] {
  const routeSectionIds = sectionIdsByRoute[pathname];
  return Array.from(document.querySelectorAll<HTMLElement>("main section, main footer"))
    .map((element, index) => {
      const id = routeSectionIds?.[index] || element.id || `${pathname.replaceAll("/", "-").replace(/^-|-$/g, "") || "page"}-section-${index + 1}`;
      if (element.id !== id) element.id = id;

      return {
        id,
      label: element.getAttribute("aria-label") || element.querySelector("h1, h2, h3")?.textContent?.trim() || element.id,
      };
    });
}

export default function SectionJumpControls() {
  const pathname = usePathname();
  const [sections, setSections] = useState<NavigationSection[]>([]);
  const [activeSectionId, setActiveSectionId] = useState("");

  useEffect(() => {
    const pageSections = getNavigationSections(pathname);
    let animationFrame = 0;
    let sectionFrame = 0;

    const updateActiveSection = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const marker = Math.min(window.innerHeight * 0.55, 180);
        let nextSectionId = pageSections[0]?.id ?? "";

        pageSections.forEach((section, index) => {
          const element = document.getElementById(section.id);
          if (element && element.getBoundingClientRect().top <= marker) nextSectionId = section.id;
          if (index === pageSections.length - 1 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
            nextSectionId = section.id;
          }
        });

        setActiveSectionId(nextSectionId);
      });
    };

    sectionFrame = window.requestAnimationFrame(() => {
      setSections(pageSections);
      updateActiveSection();
    });
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.cancelAnimationFrame(sectionFrame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [pathname]);

  const activeIndex = sections.findIndex((section) => section.id === activeSectionId);
  const previousSection = sections[activeIndex - 1];
  const nextSection = sections[activeIndex + 1];

  const jumpTo = (section?: NavigationSection) => {
    if (section) document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (sections.length < 2) return null;

  return (
    <nav
      aria-label="Page section navigation"
      className={`fixed right-3 z-40 flex gap-2 md:right-5 ${activeSectionId === "faq" ? "top-32 lg:top-36" : "bottom-[calc(env(safe-area-inset-bottom)+5rem)] md:bottom-5"}`}
    >
      {previousSection && <CarouselArrow direction="previous" label={`Previous section: ${previousSection.label}`} disabled={false} onClick={() => jumpTo(previousSection)} />}
      {nextSection && <CarouselArrow direction="next" label={`Next section: ${nextSection.label}`} disabled={false} onClick={() => jumpTo(nextSection)} />}
    </nav>
  );
}