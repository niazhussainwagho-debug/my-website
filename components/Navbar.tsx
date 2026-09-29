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
    <header className="fixed inset-x-0 top-0 z-[60] m-0 block w-full max-w-full overflow-x-clip bg-white p-0 shadow-md dark:bg-slate-950">
      <div className="m-0 w-full max-w-full overflow-hidden">
        <div className="mx-auto flex min-h-[60px] w-full max-w-7xl items-center justify-between gap-3 px-4 pt-2 pb-2 md:px-8 lg:min-h-[88px]">
          <Link href="/" className="flex min-w-0 flex-1 items-center gap-3 rounded-lg bg-white p-3 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100" onClick={() => setMenuOpen(false)}>
            <Image src="/area-logo.png" alt="State Life Insurance Corporation of Pakistan logo" width={420} height={144} priority className="h-14 w-auto shrink-0 object-contain" />
            <span className="flex min-w-0 flex-col">
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-sky-400 sm:text-sm">Sukkur Area Office 5405</span>
              <span className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-xl">State Life Insurance</span>
              <span className="text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-slate-300 sm:text-sm">Corporation of Pakistan</span>
            </span>
          </Link>

          <div className="hidden shrink-0 items-center gap-2 text-sm font-semibold md:flex">
            <ThemeToggle />
            <Link href="/contact#contact-form" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-(--brand-blue-700) px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-(--brand-blue-900)">Get Policy Quote</Link>
          </div>

          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <ThemeToggle />
            <button type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              <span className="space-y-1.5" aria-hidden="true">
                <span className={`block h-0.5 w-5 rounded-full bg-current transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-5 rounded-full bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 rounded-full bg-current transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <nav className="m-0 w-full max-w-full overflow-x-clip bg-[#0052cc]" aria-label="Main navigation">
        <div className="mx-auto flex min-h-12 w-full max-w-7xl items-center px-4 md:px-8">
          <div className="hidden w-full min-w-0 flex-nowrap items-center justify-between gap-1 md:flex">
            {navLinks.map((link) => {
              const active = isActiveRoute(pathname, link.href);
              return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={`inline-flex min-h-12 shrink-0 items-center whitespace-nowrap border-b-2 px-2 text-sm font-semibold text-white transition hover:bg-white/10 lg:px-3 ${active ? "border-white" : "border-transparent"}`}>{link.name}</Link>;
            })}
          </div>
          <div className="md:hidden"><p className="w-full max-w-full m-0 py-1.5 px-3 bg-[#0052cc] overflow-hidden text-ellipsis text-center text-xs font-semibold text-white whitespace-nowrap truncate">Sukkur Area Office 5405</p></div>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-navigation" className="absolute inset-x-0 top-full max-h-[calc(100dvh-7rem)] w-full max-w-full overflow-x-clip overflow-y-auto border-t border-blue-400/30 bg-[#0052cc] shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map((link) => {
              const active = isActiveRoute(pathname, link.href);
              return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} onClick={() => setMenuOpen(false)} className={`rounded-xl px-3 py-3 text-base font-medium text-white transition hover:bg-white/10 ${active ? "bg-white/15 font-semibold" : ""}`}>{link.name}</Link>;
            })}
            <div className="mt-2 grid gap-2 border-t border-white/20 pt-3 sm:grid-cols-2">
              <a href={telLink()} onClick={() => setMenuOpen(false)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-(--brand-blue-900)"><PhoneIcon />Call</a>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1f8a67] px-4 py-3 text-sm font-semibold text-white"><WhatsAppIcon />WhatsApp</a>
              <Link href="/contact#contact-form" onClick={() => setMenuOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-full bg-white/15 px-4 py-3 text-sm font-semibold text-white sm:col-span-2">Get Policy Quote</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
