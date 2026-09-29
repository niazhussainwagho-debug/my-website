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
        className="inline-flex h-9 sm:h-10 items-center gap-1 sm:gap-1.5 rounded-full border border-white/20 bg-white/10 px-2 sm:px-3 text-xs font-bold text-white shadow-xs backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <Globe size={14} className="text-sky-300 shrink-0" aria-hidden="true" />
        <span className="font-semibold tracking-wide">{currentLang.native}</span>
        <ChevronDown
          size={12}
          className={`text-slate-300 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-40 sm:w-44 origin-top-right rounded-2xl border border-white/20 bg-slate-950/95 p-1.5 shadow-2xl backdrop-blur-2xl z-[100] animate-in fade-in zoom-in-95 duration-150"
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
                    ? "bg-blue-600/30 text-sky-200 font-bold border border-blue-500/30"
                    : "text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{item.native}</span>
                  <span className="text-[10px] uppercase text-slate-400">({item.code})</span>
                </div>
                {isSelected && <Check size={14} className="text-sky-300 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
