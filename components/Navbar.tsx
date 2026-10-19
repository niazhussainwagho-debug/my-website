"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { PhoneIcon, WhatsAppIcon } from "./icons";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { telLink, whatsappLink, AREA_CODE } from "../lib/contact";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { id: "about", name: "About", href: "/about" },
    { id: "products", name: "Plans Portfolio", href: "/products" },
    { id: "join", name: "Careers", href: "/become-an-agent" },
    { id: "contact", name: "Contact", href: "/contact" },
  ];

  const isLinkActive = (link: { id: string; href: string }) => {
    if (link.href === "/") {
      return pathname === "/";
    }
    return pathname === link.href || pathname.startsWith(`${link.href}/`);
  };

  const quoteHref = "/about";

  // Lock body scroll when mobile side drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[60] pointer-events-none px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
      {/* Floating Glassmorphic Capsule Bar */}
      <div
        className="pointer-events-auto mx-auto flex h-[68px] sm:h-20 w-full max-w-7xl items-center justify-between gap-2 sm:gap-4 rounded-2xl sm:rounded-3xl border border-slate-300/80 dark:border-[#d4af37]/20 bg-white/90 dark:bg-[#0c0d0e]/85 px-3 sm:px-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.08),0_0_24px_rgba(212,175,55,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.45),0_0_24px_rgba(212,175,55,0.06)] backdrop-blur-2xl transition-all duration-200"
      >
        {/* Brand Logo & Info */}
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2 sm:gap-3 transition-opacity hover:opacity-95"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/logo area.png"
            alt="State Life Insurance Corporation of Pakistan logo"
            width={420}
            height={144}
            priority
            className="h-9 w-auto shrink-0 object-contain sm:h-11 md:h-12 transition-transform group-hover:scale-[1.02]"
          />
          <span className="flex min-w-0 flex-col justify-center leading-tight">
            <span className="truncate text-[9px] font-black leading-tight tracking-wide text-slate-900 dark:text-white sm:text-xs">
              STATE LIFE SUKKUR 5405
            </span>
            <span className="mt-1 inline-flex w-fit items-center gap-1.5 border border-amber-300/60 dark:border-amber-200/30 bg-amber-100/60 dark:bg-amber-100/10 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-[0.12em] text-amber-900 dark:text-amber-100 sm:text-[8px]">
              <span className="h-1 w-1 rounded-full bg-amber-500 dark:bg-amber-300" /> Area Office
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden items-center gap-0.5 xl:gap-1.5 lg:flex shrink-0"
          aria-label="Main navigation"
        >
          <details className="relative">
            <summary className="inline-flex cursor-pointer list-none items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-white/80 transition hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-950 dark:hover:text-white xl:px-3.5 xl:py-2 xl:text-sm">
              Home <ChevronDown size={14} aria-hidden="true" />
            </summary>
            <div
              className="absolute left-0 top-full z-50 mt-2 grid min-w-44 gap-1 rounded-xl border border-slate-200 dark:border-[#d4af37]/20 bg-white dark:bg-[#0c0d0e]/95 p-2 shadow-xl backdrop-blur-2xl"
            >
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-950 dark:hover:text-white"
              >
                Home page
              </Link>

            </div>
          </details>
          {navLinks.map((link) => {
            const active = isLinkActive(link);
            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center shrink-0 whitespace-nowrap px-2.5 py-1.5 xl:px-3.5 xl:py-2 text-xs xl:text-sm font-semibold rounded-full transition-all duration-200 ${
                  active
                    ? "bg-[#d4af37]/15 text-[#926004] dark:text-[#f2dfa5] font-bold shadow-[inset_0_0_0_1px_rgba(212,175,55,0.3)] backdrop-blur-md"
                    : "text-slate-700 dark:text-white/80 hover:text-[#926004] dark:hover:text-[#f2dfa5] hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Action Area */}
        <div className="hidden shrink-0 items-center gap-1.5 xl:gap-2 lg:flex">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
            className="inline-flex h-8.5 w-8.5 xl:h-10 xl:w-10 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 transition hover:bg-emerald-500/25 shrink-0"
          >
            <WhatsAppIcon />
          </a>
          <a
            href={telLink()}
            title="Call Office"
            aria-label="Call Office"
            className="inline-flex h-8.5 w-8.5 xl:h-10 xl:w-10 items-center justify-center rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 text-[#926004] dark:text-[#e7cd88] transition hover:bg-[#d4af37]/20 shrink-0"
          >
            <PhoneIcon />
          </a>
          <LanguageSwitcher />
          <ThemeToggle
            className="inline-flex h-8.5 w-8.5 xl:h-10 xl:w-10 shrink-0 items-center justify-center rounded-full border border-slate-300 dark:border-[#d4af37]/30 bg-white/90 dark:bg-[#14171a]/90 text-slate-800 dark:text-amber-300 transition-colors hover:bg-slate-100 dark:hover:bg-[#1c2024] shadow-xs backdrop-blur-md"
            iconSize={15}
          />
          <Link
            href={quoteHref}
            onClick={() => setMenuOpen(false)}
            className="inline-flex h-8.5 xl:h-10 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#d4af37]/10 px-3.5 py-1.5 text-xs font-bold text-[#926004] dark:text-[#f2dfa5] shadow-[0_0_18px_rgba(212,175,55,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d4af37]/20 xl:px-5 xl:py-2 xl:text-sm whitespace-nowrap"
          >
            Client Portal
          </Link>
        </div>

        {/* Mobile & Tablet Trigger Controls (< lg) */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 lg:hidden">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
            className="inline-flex h-8 w-8 sm:h-8.5 sm:w-8.5 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/20 text-emerald-300 transition hover:bg-emerald-500/30 shrink-0"
          >
            <WhatsAppIcon />
          </a>
          <LanguageSwitcher />
          <ThemeToggle
            className="inline-flex h-8 w-8 sm:h-8.5 sm:w-8.5 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 shadow-xs backdrop-blur-md"
            iconSize={14}
          />
          {/* Hamburger Menu Button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-8.5 w-8.5 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#e8d5a4] transition hover:bg-[#d4af37]/20 cursor-pointer"
          >
            <span className="space-y-1.5" aria-hidden="true">
              <span
                className={`block h-0.5 w-4.5 rounded-full bg-current transition-transform duration-300 ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-4.5 rounded-full bg-current transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-4.5 rounded-full bg-current transition-transform duration-300 ${
                  menuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile Side Drawer (Soft Slide-In from Right) ── */}
      {/* 1. Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-[70] bg-black/65 backdrop-blur-sm transition-opacity duration-300 lg:hidden pointer-events-auto ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* 2. Side Panel */}
      <aside
        id="mobile-navigation"
        className={`fixed inset-y-0 right-0 z-[80] w-[84vw] max-w-sm flex flex-col justify-between border-l border-slate-200 dark:border-[#d4af37]/35 bg-white dark:bg-[#0c0d0e]/98 p-6 shadow-[-16px_0_40px_rgba(0,0,0,0.2)] dark:shadow-[-16px_0_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-transform duration-300 ease-out lg:hidden pointer-events-auto overflow-y-auto ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation side drawer"
      >
        <div>
          {/* Drawer Top Bar: Brand & Close Button */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/[0.08] pb-4">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo area.png"
                alt="State Life Logo"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
              <div className="leading-tight">
                <p className="text-[10px] font-black tracking-wide text-slate-900 dark:text-white">SUKKUR 5405</p>
                <span className="text-[8px] font-bold uppercase tracking-wider text-[#926004] dark:text-[#d7b875]">Area Office</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex h-8.5 w-8.5 items-center justify-center rounded-full border border-slate-300 dark:border-white/15 bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-[#aaa9a3] hover:border-[#d7b875] hover:text-[#d7b875] transition"
              aria-label="Close side menu"
            >
              <X size={16} />
            </button>
          </div>

          {/* Navigation Links List */}
          <nav className="mt-5 flex flex-col gap-1.5" aria-label="Mobile links">
            {/* Home details accordion */}
            <details className="rounded-xl overflow-hidden group">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 dark:text-[#f5f2ea] transition hover:bg-slate-100 dark:hover:bg-white/[0.04]">
                <span>Home</span>
                <ChevronDown size={15} className="text-[#926004] dark:text-[#d7b875] transition group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="ml-3 my-1 grid gap-1 border-l border-[#d7b875]/25 pl-3">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-xs font-medium text-slate-600 dark:text-[#aaa9a3] hover:text-slate-900 dark:hover:text-[#f5f2ea] hover:bg-slate-100 dark:hover:bg-white/[0.04] transition"
                >
                  Home page
                </Link>

              </div>
            </details>

            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`flex min-h-12 items-center rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    active
                      ? "border border-[#d7b875]/50 bg-[#d7b875]/15 text-[#926004] dark:text-[#ecd9aa] font-bold shadow-sm"
                      : "text-slate-700 dark:text-[#d6d2c7] hover:bg-slate-100 dark:hover:bg-white/[0.04] hover:text-[#926004] dark:hover:text-[#ecd9aa]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Drawer Bottom Action Desk */}
        <div className="mt-6 border-t border-slate-200 dark:border-white/[0.08] pt-5 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={telLink()}
              onClick={() => setMenuOpen(false)}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-[#d7b875]/35 bg-[#d7b875]/10 px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#926004] dark:text-[#f2dfa5] transition hover:bg-[#d7b875]/20"
            >
              <PhoneIcon /> <span>Call Office</span>
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-emerald-400/30 bg-emerald-500/20 px-3 py-2 text-xs font-bold uppercase tracking-wider text-emerald-200 transition hover:bg-emerald-500/30"
            >
              <WhatsAppIcon /> <span>WhatsApp</span>
            </a>
          </div>

          <Link
            href={quoteHref}
            onClick={() => setMenuOpen(false)}
            className="flex min-h-11 w-full items-center justify-center rounded-xl bg-[#d7b875] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0c0d0e] shadow-md shadow-[#d7b875]/25 transition hover:bg-[#e6cca0]"
          >
            Client Portal &amp; Sign In
          </Link>

          <p className="text-center text-[10px] text-[#7a7974] pt-1">
            State Life Sukkur Area Office {AREA_CODE}
          </p>
        </div>
      </aside>
    </header>
  );
}
