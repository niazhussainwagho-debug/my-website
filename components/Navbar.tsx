"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PhoneIcon, WhatsAppIcon } from "./icons";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { telLink, whatsappLink } from "../lib/contact";
import { useLanguage } from "../context/LanguageContext";

function isActiveRoute(pathname: string, href: string) {
  const route = href.split("#", 1)[0];
  if (route === "/") return pathname === "/";
  return pathname === route || pathname.startsWith(`${route}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { name: t.navHome, href: "/#home" },
    { name: t.navProducts, href: "/products#products" },
    { name: t.navServices, href: "/services#services" },
    { name: t.navAbout, href: "/about#about" },
    { name: t.navContact, href: "/contact#contact" },
    { name: t.navJoin, href: "/become-an-agent#join" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-[60] pointer-events-none px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
      {/* Floating Glassmorphic Capsule Bar */}
      <div className="pointer-events-auto mx-auto flex h-16 sm:h-20 w-full max-w-7xl items-center justify-between gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-white/20 bg-slate-950/50 px-4 sm:px-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-200">
        {/* Brand Logo & Info */}
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 sm:gap-3 transition-opacity hover:opacity-95"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/logo area.png"
            alt="State Life Insurance Corporation of Pakistan logo"
            width={420}
            height={144}
            priority
            className="h-10 w-auto shrink-0 object-contain sm:h-12 transition-transform group-hover:scale-[1.02]"
          />
          <span className="flex min-w-0 flex-col">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400 sm:text-xs">
              {t.brandArea}
            </span>
            <span className="text-sm font-black leading-tight tracking-tight text-white sm:text-base md:text-lg">
              {t.brandCompany}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-white dark:text-white sm:text-[10px]">
              {t.brandSub}
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = isActiveRoute(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center px-3.5 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                  active
                    ? "bg-white/20 text-white font-bold shadow-xs"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Action Area */}
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/20 text-emerald-300 transition hover:bg-emerald-500/30"
          >
            <WhatsAppIcon />
          </a>
          <a
            href={telLink()}
            title="Call Office"
            aria-label="Call Office"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/20 text-sky-300 transition hover:bg-blue-500/30"
          >
            <PhoneIcon />
          </a>
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            href="/contact#contact-form"
            className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-blue-600/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/50"
          >
            {t.navQuoteBtn}
          </Link>
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="flex shrink-0 items-center gap-1.5 sm:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
          >
            <span className="space-y-1.5" aria-hidden="true">
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition ${
                  menuOpen ? "-translate-y-2 -rotate-45" : ""
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
          className="pointer-events-auto mx-auto mt-2 max-w-7xl rounded-2xl border border-white/20 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-2xl lg:hidden"
        >
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const active = isActiveRoute(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-white/20 text-white font-bold"
                      : "text-slate-200 hover:bg-white/10"
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
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-blue-400/30 bg-blue-500/20 px-3 py-2 text-xs font-bold text-sky-200"
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
                href="/contact#contact-form"
                onClick={() => setMenuOpen(false)}
                className="col-span-2 inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/40"
              >
                {t.navQuoteBtn}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
