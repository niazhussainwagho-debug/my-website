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
      className={`group inline-flex h-12 min-h-11 w-12 min-w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/80 text-blue-500 shadow-lg backdrop-blur-md transition-colors hover:bg-slate-800 dark:text-blue-400 dark:hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      <Icon size={21} strokeWidth={2.25} aria-hidden="true" className="transition-transform group-hover:scale-110" />
    </motion.button>
  );
}