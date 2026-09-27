"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { softSpringTransition } from "./card-motion";

type CarouselArrowProps = {
  direction: "previous" | "next";
  label: string;
  disabled: boolean;
  onClick: () => void;
  className?: string;
};

export default function CarouselArrow({ direction, label, disabled, onClick, className = "" }: CarouselArrowProps) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;

  return (
    <motion.button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      transition={softSpringTransition}
      className={`inline-flex h-12 w-12 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white/60 bg-white/75 text-slate-800 shadow-md backdrop-blur-md transition-colors hover:bg-white dark:border-slate-600/70 dark:bg-slate-900/75 dark:text-slate-100 dark:hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      <Icon size={21} strokeWidth={2.25} aria-hidden="true" />
    </motion.button>
  );
}