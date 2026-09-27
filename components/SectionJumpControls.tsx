"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";

const sectionIdsByRoute: Record<string, string[]> = {
  "/": ["home", "overview", "policies", "products", "services", "about", "testimonials", "faq", "contact", "local-advisor", "footer"],
  "/about": ["hero", "about-intro", "mission", "contact", "footer"],
  "/products": ["hero", "policies", "contact"],
  "/services": ["hero", "services", "products"],
  "/contact": ["hero", "contact", "footer"],
  "/health-insurance": ["hero", "coverage-options", "how-it-works", "official-links", "health-enquiry", "faq", "footer"],
  "/become-an-agent": ["join", "process", "documents", "requirements", "forms", "pre-registration", "faq", "footer"],
  "/checkout": ["hero", "application"],
};

const navigationIdsByRoute: Record<string, string[]> = {
  "/": ["home", "products", "services", "about", "contact"],
  ...Object.fromEntries(Object.entries(sectionIdsByRoute).filter(([pathname]) => pathname !== "/")),
};

const sectionLabels: Record<string, string> = {
  home: "Home",
  hero: "Top of page",
  overview: "Office overview",
  policies: "Coverage options",
  products: "Products",
  services: "Services",
  about: "About Us",
  "about-intro": "About us",
  mission: "Our values",
  testimonials: "Community feedback",
  faq: "FAQ",
  contact: "Contact",
  "local-advisor": "Local advisor",
  footer: "Footer",
  join: "Join Us",
  process: "Registration process",
  documents: "Documents",
  requirements: "Requirements",
  forms: "Registration forms",
  "pre-registration": "Pre-registration",
  "coverage-options": "Coverage options",
  "how-it-works": "How it works",
  "official-links": "Official links",
  "health-enquiry": "Health enquiry",
  application: "Application",
};

function assignRouteSectionIds(pathname: string) {
  const sectionIds = sectionIdsByRoute[pathname];
  const main = document.querySelector("main");
  if (!sectionIds || !main) return;

  main.querySelectorAll<HTMLElement>("section, footer").forEach((element, index) => {
    const id = sectionIds[index];
    if (id) element.id = id;
  });
}

export default function SectionJumpControls() {
  const pathname = usePathname();
  const router = useRouter();
  const sections = (navigationIdsByRoute[pathname] ?? []).map((id) => ({ id, label: sectionLabels[id] ?? id }));
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id ?? "");
  const [isAtPageEnd, setIsAtPageEnd] = useState(false);

  useEffect(() => {
    assignRouteSectionIds(pathname);
    const pageSections = (navigationIdsByRoute[pathname] ?? []).map((id) => ({ id, label: sectionLabels[id] ?? id }));
    let animationFrame = 0;
    let sectionFrame = 0;

    const updateActiveSection = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const marker = Math.min(window.innerHeight * 0.55, 240);
        let nextSectionId = pageSections[0]?.id ?? "";

        pageSections.forEach((section) => {
          const element = document.getElementById(section.id);
          if (element && element.getBoundingClientRect().top <= marker) nextSectionId = section.id;
        });

        const reachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        if (reachedBottom) nextSectionId = pageSections[pageSections.length - 1]?.id ?? nextSectionId;
        setIsAtPageEnd(reachedBottom);
        setActiveSectionId(nextSectionId);
      });
    };

    sectionFrame = window.requestAnimationFrame(() => {
      const hashId = decodeURIComponent(window.location.hash.slice(1));
      const hashTarget = pageSections.find((section) => section.id === hashId);
      if (hashTarget) {
        router.replace(`${pathname}${window.location.search}#${hashTarget.id}`);
        setActiveSectionId(hashTarget.id);
        setIsAtPageEnd(hashTarget.id === pageSections[pageSections.length - 1]?.id);
      } else {
        const firstSection = pageSections[0];
        if (firstSection) router.replace(`${pathname}${window.location.search}#${firstSection.id}`, { scroll: false });
        updateActiveSection();
      }
    });

    const handlePopState = () => {
      if (window.location.pathname !== pathname) {
        router.replace(`${window.location.pathname}${window.location.search}${window.location.hash}`);
        return;
      }

      const hashId = decodeURIComponent(window.location.hash.slice(1));
      const hashTarget = pageSections.find((section) => section.id === hashId);
      if (hashTarget) {
        router.replace(`${pathname}${window.location.search}#${hashTarget.id}`);
        setActiveSectionId(hashTarget.id);
        setIsAtPageEnd(hashTarget.id === pageSections[pageSections.length - 1]?.id);
      } else {
        updateActiveSection();
      }
    };

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.cancelAnimationFrame(sectionFrame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname, router]);

  const activeIndex = Math.max(0, sections.findIndex((section) => section.id === activeSectionId));
  const nextSection = sections[activeIndex + 1];
  const moveToJoin = pathname === "/" && activeSectionId === "contact" && !isAtPageEnd;
  const returnHome = activeSectionId === "join" || isAtPageEnd || (pathname === "/contact" && activeSectionId === "contact") || (pathname !== "/" && activeIndex === sections.length - 1);
  const targetSection = returnHome
    ? { id: "home", label: "Home", pathname: "/" }
    : moveToJoin
      ? { id: "join", label: "Join Us", pathname: "/become-an-agent" }
      : nextSection
        ? { ...nextSection, pathname }
        : undefined;
  const DirectionIcon = returnHome ? ArrowUp : moveToJoin ? ArrowRight : ArrowDown;

  const jumpToTarget = () => {
    if (!targetSection) return;
    if (targetSection.pathname !== pathname) {
      router.push(`${targetSection.pathname}#${targetSection.id}`);
      return;
    }

    router.push(`${pathname}${window.location.search}#${targetSection.id}`);
    setActiveSectionId(targetSection.id);
    setIsAtPageEnd(false);
  };

  if (sections.length < 2 || !targetSection) return null;

  return (
    <nav
      aria-label="Page section navigation"
      className="fixed bottom-6 right-6 z-50 flex gap-2"
    >
      <motion.button
        type="button"
        aria-label={returnHome ? "Return to Home" : `${moveToJoin ? "Go to" : "Next section"}: ${targetSection.label}`}
        title={returnHome ? "Return to Home" : `${moveToJoin ? "Go to" : "Next section"}: ${targetSection.label}`}
        onClick={jumpToTarget}
        whileTap={{ scale: 0.95 }}
        className="group flex min-h-12 min-w-11 touch-manipulation items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/80 px-2.5 py-1.5 text-left shadow-lg backdrop-blur-md transition-colors hover:bg-slate-800 sm:px-3"
      >
        <span className="flex h-9 w-9 min-w-9 items-center justify-center rounded-full bg-slate-800/90">
          <DirectionIcon size={20} aria-hidden="true" className="text-blue-500 transition-transform group-hover:scale-110 dark:text-blue-400" />
        </span>
        <span className="max-w-36 truncate pr-1 text-xs font-semibold text-slate-100 sm:max-w-44">
          {returnHome ? "Back to Home" : moveToJoin ? "Join Us" : `Next: ${targetSection.label}`}
        </span>
      </motion.button>
    </nav>
  );
}