import type { Variants } from "framer-motion";

export const softSpringTransition = {
  type: "spring" as const,
  stiffness: 60,
  damping: 25,
  mass: 1.2,
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export const staticCardVariants: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...softSpringTransition, staggerChildren: 0.15 },
  },
};

export const cardContentVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: softSpringTransition,
  },
};
