"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface ThemeToggleProps {
  className?: string;
  iconSize?: number;
}

export default function ThemeToggle({ className, iconSize = 16 }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      title="Toggle color theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={
        className ??
        "inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 shadow-xs backdrop-blur-md"
      }
    >
      <Moon size={iconSize} aria-hidden="true" className="block dark:hidden text-amber-200" />
      <Sun size={iconSize} aria-hidden="true" className="hidden dark:block text-amber-300" />
    </button>
  );
}