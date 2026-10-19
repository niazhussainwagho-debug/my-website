"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore, useTransition } from "react";
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
const listeners = new Set<() => void>();

function updateDocAttributes(lang: Language) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  // Keep consistent LTR alignment as requested so elements and buttons do not flip sides
  document.documentElement.dir = "ltr";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved === "en" || saved === "ur" || saved === "sd") {
      return saved;
    }
  } catch {
    // localStorage may fail in restricted browser modes
  }
  return "en";
}

function getServerSnapshot(): Language {
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [, startTransition] = useTransition();

  useEffect(() => {
    updateDocAttributes(language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    startTransition(() => {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // ignore
      }
      updateDocAttributes(lang);
      listeners.forEach((l) => l());
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
