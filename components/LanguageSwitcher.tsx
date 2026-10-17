"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Language } from "../lib/translations";

const languages: { code: Language; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "ur", label: "Urdu", native: "اردو" },
  { code: "sd", label: "Sindhi", native: "سنڌي" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click or escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Select website language"
        style={{ backgroundColor: "rgba(212, 175, 55, 0.05)", borderColor: "rgba(212, 175, 55, 0.25)" }}
        className="inline-flex h-8 sm:h-8.5 xl:h-10 shrink-0 items-center gap-1 sm:gap-1.5 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/5 px-2 sm:px-2.5 xl:px-3 text-xs font-bold text-white shadow-xs backdrop-blur-md transition-all hover:bg-[#d4af37]/12 hover:border-[#d4af37]/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4e2a5] whitespace-nowrap"
      >
        <Globe size={13} className="text-[#e7cd88] shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline font-semibold tracking-wide text-xs">{currentLang.native}</span>
        <span className="inline sm:hidden font-bold tracking-wide uppercase text-[10px]">{currentLang.code}</span>
        <ChevronDown
          size={11}
          className={`text-[#e7cd88]/80 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
            style={{ backgroundColor: "rgba(12, 13, 14, 0.95)", borderColor: "rgba(212, 175, 55, 0.2)" }}
          className="absolute right-0 mt-2 w-40 sm:w-44 origin-top-right rounded-2xl border border-[#d4af37]/20 bg-[#0c0d0e]/95 p-1.5 shadow-2xl backdrop-blur-2xl z-[100] animate-in fade-in zoom-in-95 duration-150"
        >
          {languages.map((item) => {
            const isSelected = item.code === language;
            return (
              <button
                key={item.code}
                type="button"
                role="menuitem"
                onClick={() => {
                  setLanguage(item.code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition ${
                  isSelected
                    ? "bg-[#d4af37]/12 text-[#f2dfa5] font-bold border border-[#d4af37]/30"
                    : "text-slate-200 hover:bg-white/5 hover:text-[#f2dfa5]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{item.native}</span>
                  <span className="text-[10px] uppercase text-slate-400">({item.code})</span>
                </div>
                {isSelected && <Check size={14} className="text-[#e7cd88] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
