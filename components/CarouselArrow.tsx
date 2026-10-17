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
      style={{ backgroundColor: "rgba(12, 13, 14, 0.85)", borderColor: "rgba(212, 175, 55, 0.3)" }}
      className={`group inline-flex h-12 min-h-11 w-12 min-w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#0c0d0e]/85 text-[#e7cd88] shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-200 hover:border-[#d4af37]/65 hover:bg-[#17231f] hover:shadow-[0_0_18px_rgba(212,175,55,0.12)] disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      <Icon size={21} strokeWidth={2.25} aria-hidden="true" className="transition-transform group-hover:scale-110" />
    </motion.button>
  );
}