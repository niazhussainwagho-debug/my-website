import type { Variants } from "framer-motion";

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export const staticCardVariants: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 18, staggerChildren: 0.12 },
  },
};

export const cardContentVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 18 },
  },
};
