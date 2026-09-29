"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PhoneIcon, WhatsAppIcon } from "./icons";
import ThemeToggle from "./ThemeToggle";
import { telLink, whatsappLink } from "../lib/contact";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "Products", href: "/products#products" },
  { name: "Services", href: "/services#services" },
  { name: "About Us", href: "/about#about" },
  { name: "Contact", href: "/contact#contact" },
  { name: "Join Us", href: "/become-an-agent#join" },
];

function isActiveRoute(pathname: string, href: string) {
  const route = href.split("#", 1)[0];
  if (route === "/") return pathname === "/";
  return pathname === route || pathname.startsWith(`${route}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[60] m-0 block w-full max-w-full overflow-x-clip border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-colors duration-200 dark:border-slate-800/80 dark:bg-slate-950/90 shadow-xs">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Info */}
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 transition-opacity hover:opacity-95"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/logo area.png"
            alt="State Life Insurance Corporation of Pakistan logo"
            width={420}
            height={144}
            priority
            className="h-12 w-auto shrink-0 object-contain sm:h-14 transition-transform group-hover:scale-[1.02]"
          />
          <span className="flex min-w-0 flex-col">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-sky-400 sm:text-xs">
              Sukkur Area Office 5405
            </span>
            <span className="text-base font-black leading-tight tracking-tight text-slate-900 dark:text-white sm:text-lg">
              State Life Insurance
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:text-[11px]">
              Corporation of Pakistan
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
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-sky-300 font-bold shadow-xs"
                    : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Action Area */}
        <div className="hidden shrink-0 items-center gap-2.5 sm:flex">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 transition hover:bg-emerald-100 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:hover:bg-emerald-900/50"
          >
            <WhatsAppIcon />
          </a>
          <a
            href={telLink()}
            title="Call Office"
            aria-label="Call Office"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600 transition hover:bg-blue-100 dark:border-blue-800/60 dark:bg-blue-950/40 dark:text-sky-400 dark:hover:bg-blue-900/50"
          >
            <PhoneIcon />
          </a>
          <ThemeToggle />
          <Link
            href="/contact#contact-form"
            className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-2 text-sm font-bold text-white shadow-md shadow-blue-700/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-800 hover:to-blue-700 hover:shadow-lg hover:shadow-blue-700/30"
          >
            Get Policy Quote
          </Link>
        </div>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="flex shrink-0 items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
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
          className="border-t border-slate-200/80 bg-white/95 px-4 pt-3 pb-6 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 lg:hidden shadow-xl"
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
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-sky-300 font-bold"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-200 pt-3 dark:border-slate-800">
              <a
                href={telLink()}
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 dark:border-blue-900 dark:bg-blue-950/60 dark:text-sky-300"
              >
                <PhoneIcon /> Call Office
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300"
              >
                <WhatsAppIcon /> WhatsApp
              </a>
              <Link
                href="/contact#contact-form"
                onClick={() => setMenuOpen(false)}
                className="col-span-2 inline-flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-700/20"
              >
                Get Policy Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
