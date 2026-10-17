"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";

const anchors = ["home", "products", "services", "about", "contact", "join"] as const;
type AnchorId = (typeof anchors)[number];

const routeAnchors: Record<string, AnchorId[]> = {
  "/": ["home", "products", "services", "about", "contact"],
  "/about": ["about", "contact"],
  "/products": ["products"],
  "/services": ["services"],
  "/contact": ["contact"],
  "/become-an-agent": ["join"],
};

const anchorPath: Record<AnchorId, string> = {
  home: "/",
  products: "/",
  services: "/",
  about: "/",
  contact: "/",
  join: "/become-an-agent",
};

const noRouteAnchors: AnchorId[] = [];

function getVisibleAnchor(allowedAnchors: AnchorId[]) {
  let currentAnchor = allowedAnchors[0] ?? "home";
  const marker = Math.min(window.innerHeight * 0.55, 240);
  for (const anchorId of allowedAnchors) {
    const element = document.getElementById(anchorId);
    if (element && element.getBoundingClientRect().top <= marker) currentAnchor = anchorId;
  }
  return currentAnchor;
}

function getHashAnchor(allowedAnchors: AnchorId[]) {
  const hashId = decodeURIComponent(window.location.hash.slice(1)) as AnchorId;
  return allowedAnchors.includes(hashId) && document.getElementById(hashId) ? hashId : undefined;
}

export default function SectionJumpControls() {
  const pathname = usePathname();
  const router = useRouter();
  const allowedAnchors = routeAnchors[pathname] ?? noRouteAnchors;
  const [activeSectionId, setActiveSectionId] = useState<AnchorId>(allowedAnchors[0] ?? "home");
  const activeAnchor = allowedAnchors.includes(activeSectionId) ? activeSectionId : allowedAnchors[0];

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveSection = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        setActiveSectionId(getVisibleAnchor(allowedAnchors));
      });
    };

    const syncHashAnchor = () => {
      setActiveSectionId(getHashAnchor(allowedAnchors) ?? getVisibleAnchor(allowedAnchors));
    };

    syncHashAnchor();

    const handlePopState = () => {
      if (window.location.pathname !== pathname) {
        router.replace(`${window.location.pathname}${window.location.search}${window.location.hash}`);
        return;
      }
      syncHashAnchor();
    };

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", syncHashAnchor);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("hashchange", syncHashAnchor);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [allowedAnchors, pathname, router]);

  const activeIndex = anchors.indexOf(activeAnchor);
  const isHomePage = pathname === "/";
  const isHomeContact = isHomePage && activeAnchor === "contact";
  const isJoinRouteTarget = pathname === "/" && activeAnchor === "contact";
  const returnHome = activeAnchor === "join" || (activeAnchor === "contact" && pathname !== "/") || isHomeContact;
  const targetAnchor = isHomePage ? (isHomeContact ? "home" : "contact") : returnHome ? "home" : isJoinRouteTarget ? "join" : anchors[activeIndex + 1];
  const targetPath = allowedAnchors.includes(targetAnchor) ? pathname : anchorPath[targetAnchor];
  const targetLabel = targetAnchor === "join" ? "Join Us" : targetAnchor[0].toUpperCase() + targetAnchor.slice(1);
  const DirectionIcon = returnHome ? ArrowUp : isJoinRouteTarget ? ArrowRight : ArrowDown;
  const controlLabel = isHomePage ? (isHomeContact ? "Scroll to Top" : "Next: Contact") : returnHome ? "Back to Home" : isJoinRouteTarget ? "Join Us" : `Next: ${targetLabel}`;

  const jumpToTarget = () => {
    if (!targetAnchor) return;
    if (targetPath !== pathname) {
      router.push(`${targetPath}#${targetAnchor}`);
      return;
    }

    window.history.pushState(null, "", `#${targetAnchor}`);
    document.getElementById(targetAnchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSectionId(targetAnchor);
  };

  if (!activeAnchor || !targetAnchor) return null;

  return (
    <nav
      aria-label="Page section navigation"
      className={`fixed bottom-20 right-4 z-[70] flex gap-2 sm:bottom-6 sm:right-6 ${isHomePage ? "" : "hidden lg:flex"}`}
    >
      <motion.button
        type="button"
        aria-label={controlLabel}
        title={controlLabel}
        onClick={jumpToTarget}
        whileTap={{ scale: 0.95 }}
        className="group flex min-h-12 min-w-11 touch-manipulation items-center gap-2 rounded-full border border-slate-300 dark:border-[#d4af37]/30 bg-white/90 dark:bg-[#0c0d0e]/85 px-2.5 py-1.5 text-left shadow-[0_10px_30px_rgba(0,0,0,0.1),0_0_20px_rgba(212,175,55,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35),0_0_20px_rgba(212,175,55,0.08)] backdrop-blur-xl transition-colors hover:border-[#d4af37]/55 hover:bg-slate-50 dark:hover:bg-[#17231f] sm:px-3"
      >
        <span className="flex h-9 w-9 min-w-9 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10">
          <DirectionIcon size={20} aria-hidden="true" className="text-[#926004] dark:text-[#e7cd88] transition-transform group-hover:scale-110" />
        </span>
        <span className="max-w-36 truncate pr-1 text-xs font-semibold text-slate-800 dark:text-[#f2dfa5] sm:max-w-44">
          {controlLabel}
        </span>
      </motion.button>
    </nav>
  );
}