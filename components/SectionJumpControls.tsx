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
  const isJoinRouteTarget = pathname === "/" && activeAnchor === "contact";
  const returnHome = activeAnchor === "join" || (activeAnchor === "contact" && pathname !== "/");
  const targetAnchor = returnHome ? "home" : isJoinRouteTarget ? "join" : anchors[activeIndex + 1];
  const targetPath = allowedAnchors.includes(targetAnchor) ? pathname : anchorPath[targetAnchor];
  const targetLabel = targetAnchor === "join" ? "Join Us" : targetAnchor[0].toUpperCase() + targetAnchor.slice(1);
  const DirectionIcon = returnHome ? ArrowUp : isJoinRouteTarget ? ArrowRight : ArrowDown;

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
      className="fixed bottom-6 right-6 z-50 flex gap-2"
    >
      <motion.button
        type="button"
        aria-label={returnHome ? "Return to Home" : `${isJoinRouteTarget ? "Go to" : "Next section"}: ${targetLabel}`}
        title={returnHome ? "Return to Home" : `${isJoinRouteTarget ? "Go to" : "Next section"}: ${targetLabel}`}
        onClick={jumpToTarget}
        whileTap={{ scale: 0.95 }}
        className="group flex min-h-12 min-w-11 touch-manipulation items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/80 px-2.5 py-1.5 text-left shadow-lg backdrop-blur-md transition-colors hover:bg-slate-800 sm:px-3"
      >
        <span className="flex h-9 w-9 min-w-9 items-center justify-center rounded-full bg-slate-800/90">
          <DirectionIcon size={20} aria-hidden="true" className="text-blue-500 transition-transform group-hover:scale-110 dark:text-blue-400" />
        </span>
        <span className="max-w-36 truncate pr-1 text-xs font-semibold text-slate-100 sm:max-w-44">
          {returnHome ? "Back to Home" : isJoinRouteTarget ? "Join Us" : `Next: ${targetLabel}`}
        </span>
      </motion.button>
    </nav>
  );
}