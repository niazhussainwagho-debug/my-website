"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  className?: string;
  iconSize?: number;
}

const emptySubscribe = () => () => {};

export default function ThemeToggle({ className, iconSize = 17 }: ThemeToggleProps) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <div
        className={
          className ??
          "inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-[#d4af37]/30 bg-white/80 dark:bg-white/10 opacity-60"
        }
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      type="button"
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={
        className ??
        "relative inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-slate-300/80 dark:border-[#d4af37]/35 bg-white/90 dark:bg-[#14171a]/90 text-slate-800 dark:text-amber-300 shadow-sm backdrop-blur-md transition-colors hover:bg-slate-100 dark:hover:bg-[#1c2024]"
      }
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ rotate: -45, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 45, opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun size={iconSize} className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
        ) : (
          <Moon size={iconSize} className="text-indigo-600 drop-shadow-[0_0_8px_rgba(79,70,229,0.3)]" />
        )}
      </motion.div>
    </motion.button>
  );
}