"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import { Language, TranslationDictionary, translations } from "../lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  isRTL: false,
  t: translations.en,
});

const STORAGE_KEY = "sl_sukkur_preferred_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [, startTransition] = useTransition();

  // Load persisted language preference on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved && (saved === "en" || saved === "ur" || saved === "sd")) {
        setLanguageState(saved);
        updateDocAttributes(saved);
      }
    } catch {
      // localStorage may fail in restricted browser modes
    }
  }, []);

  const updateDocAttributes = (lang: Language) => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    // Keep consistent LTR alignment as requested so elements and buttons do not flip sides
    document.documentElement.dir = "ltr";
  };

  const setLanguage = (lang: Language) => {
    startTransition(() => {
      setLanguageState(lang);
      updateDocAttributes(lang);
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // ignore
      }
    });
  };

  const isRTL = language === "ur" || language === "sd";
  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
