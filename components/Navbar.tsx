"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PhoneIcon, WhatsAppIcon } from "./icons";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { telLink, whatsappLink } from "../lib/contact";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { id: "products", name: "Plans Portfolio", href: "/products" },
    { id: "calculator", name: "Calculator", href: "/#estimator" },
    { id: "join", name: "Careers", href: "/become-an-agent" },
    { id: "contact", name: "Contact", href: "/contact" },
  ];

  const isLinkActive = (link: { id: string; href: string }) => {
    if (link.href === "/") {
      return pathname === "/";
    }
    return pathname === link.href || pathname.startsWith(`${link.href}/`);
  };

  const quoteHref = "/contact";

  return (
    <header className="fixed inset-x-0 top-0 z-[60] pointer-events-none px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
      {/* Floating Glassmorphic Capsule Bar */}
      <div style={{ backgroundColor: "rgba(12, 13, 14, 0.8)", borderColor: "rgba(212, 175, 55, 0.2)" }} className="pointer-events-auto mx-auto flex h-[68px] sm:h-20 w-full max-w-7xl items-center justify-between gap-2 sm:gap-4 rounded-2xl sm:rounded-3xl border border-[#d4af37]/20 bg-[#0c0d0e]/80 px-3 sm:px-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.45),0_0_24px_rgba(212,175,55,0.06)] backdrop-blur-2xl transition-all duration-200">
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
            <span className="truncate text-[9px] font-black leading-tight tracking-wide text-white sm:text-xs">
              STATE LIFE SUKKUR 5405
            </span>
            <span className="mt-1 inline-flex w-fit items-center gap-1.5 border border-amber-200/30 bg-amber-100/10 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-[0.12em] text-amber-100 sm:text-[8px]">
              <span className="h-1 w-1 rounded-full bg-amber-300" /> Area Office
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-0.5 xl:gap-1.5 lg:flex shrink-0" aria-label="Main navigation">
          <details className="relative">
            <summary className="inline-flex cursor-pointer list-none items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white xl:px-3.5 xl:py-2 xl:text-sm">
              Home <ChevronDown size={14} aria-hidden="true" />
            </summary>
            <div style={{ backgroundColor: "rgba(12, 13, 14, 0.95)", borderColor: "rgba(212, 175, 55, 0.2)" }} className="absolute left-0 top-full z-50 mt-2 grid min-w-44 gap-1 rounded-xl border border-[#d4af37]/20 bg-[#0c0d0e]/95 p-2 shadow-xl backdrop-blur-2xl">
              <Link href="/" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white">Home page</Link>
              <a href="/master.html" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white">Master page</a>
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
                    ? "bg-[#d4af37]/10 text-[#f2dfa5] font-bold shadow-[inset_0_0_0_1px_rgba(212,175,55,0.2)] backdrop-blur-md"
                    : "text-white/80 hover:text-[#f2dfa5] hover:bg-white/5"
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
            className="inline-flex h-8.5 w-8.5 xl:h-10 xl:w-10 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/20 text-emerald-300 transition hover:bg-emerald-500/30 shrink-0"
          >
            <WhatsAppIcon />
          </a>
          <a
            href={telLink()}
            title="Call Office"
            aria-label="Call Office"
            className="inline-flex h-8.5 w-8.5 xl:h-10 xl:w-10 items-center justify-center rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 text-[#e7cd88] transition hover:bg-[#d4af37]/20 shrink-0"
          >
            <PhoneIcon />
          </a>
          <LanguageSwitcher />
          <ThemeToggle
            className="inline-flex h-8.5 w-8.5 xl:h-10 xl:w-10 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/25 bg-[#d4af37]/5 text-[#e7cd88] transition-colors hover:bg-[#d4af37]/15 shadow-xs backdrop-blur-md"
            iconSize={15}
          />
          <Link
            href={quoteHref}
            onClick={() => setMenuOpen(false)}
            style={{ backgroundColor: "rgba(212, 175, 55, 0.1)", borderColor: "rgba(212, 175, 55, 0.5)" }}
            className="inline-flex h-8.5 xl:h-10 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#d4af37]/10 px-3.5 py-1.5 text-xs font-bold text-[#f2dfa5] shadow-[0_0_18px_rgba(212,175,55,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#d4af37]/20 xl:px-5 xl:py-2 xl:text-sm whitespace-nowrap"
          >
            Client Portal
          </Link>
        </div>

        {/* Mobile & Tablet Controls (< lg) */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 lg:hidden">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
            className="hidden sm:inline-flex h-8.5 w-8.5 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/20 text-emerald-300 transition hover:bg-emerald-500/30 shrink-0"
          >
            <WhatsAppIcon />
          </a>
          <LanguageSwitcher />
          <ThemeToggle
            className="inline-flex h-8 w-8 sm:h-8.5 sm:w-8.5 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 shadow-xs backdrop-blur-md"
            iconSize={14}
          />
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-8 w-8 sm:h-8.5 sm:w-8.5 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
          >
            <span className="space-y-1 sm:space-y-1.5" aria-hidden="true">
              <span
                className={`block h-0.5 w-4 sm:w-5 rounded-full bg-current transition ${
                  menuOpen ? "translate-y-1.5 sm:translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-4 sm:w-5 rounded-full bg-current transition ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-4 sm:w-5 rounded-full bg-current transition ${
                  menuOpen ? "-translate-y-1.5 sm:-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          style={{ backgroundColor: "rgba(12, 13, 14, 0.95)", borderColor: "rgba(212, 175, 55, 0.2)" }}
          className="pointer-events-auto mx-auto mt-2 max-w-7xl rounded-2xl border border-[#d4af37]/20 bg-[#0c0d0e]/95 p-4 shadow-2xl backdrop-blur-2xl lg:hidden"
        >
          <div className="flex flex-col gap-1.5">
              <details className="rounded-xl">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10">
                  Home <ChevronDown size={15} aria-hidden="true" />
                </summary>
                <div className="ml-3 grid gap-1 border-l border-amber-200/20 pl-2">
                  <Link href="/" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">Home page</Link>
                  <a href="/master.html" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">Master page</a>
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
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-[#d4af37]/10 text-[#f2dfa5] font-bold"
                      : "text-slate-200 hover:bg-white/5 hover:text-[#f2dfa5]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
              <a
                href={telLink()}
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#d4af37]/25 bg-[#d4af37]/10 px-3 py-2 text-xs font-bold text-[#f2dfa5]"
              >
                <PhoneIcon /> {t.callOffice}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/20 px-3 py-2 text-xs font-bold text-emerald-200"
              >
                <WhatsAppIcon /> {t.chatWhatsapp}
              </a>
              <Link
                href={quoteHref}
                onClick={() => setMenuOpen(false)}
                style={{ backgroundColor: "rgba(212, 175, 55, 0.1)", borderColor: "rgba(212, 175, 55, 0.5)" }}
                className="col-span-2 inline-flex min-h-11 items-center justify-center rounded-xl border border-[#d4af37]/50 bg-[#d4af37]/10 px-4 py-2.5 text-sm font-bold text-[#f2dfa5]"
              >
                Client Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
