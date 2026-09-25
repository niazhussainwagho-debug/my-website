"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { WHATSAPP_NUMBER, whatsappLink } from "../lib/contact";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Join Us", href: "/become-agent" },
];

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [urduMode, setUrduMode] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:min-h-[88px] lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-slate-900" onClick={() => setMenuOpen(false)}>
          <Image src="/area-logo.png" alt="State Life Insurance Corporation of Pakistan logo" width={420} height={144} priority className="h-12 w-auto shrink-0 object-contain object-left md:h-14" />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-bold sm:text-base">State Life Insurance</span>
            <span className="hidden truncate text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 sm:block">Corporation of Pakistan</span>
            <span className="block truncate text-xs text-(--brand-blue-700)">Sukkur Area Office 5405</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 text-sm font-semibold md:flex">
          <a href={`tel:+${WHATSAPP_NUMBER}`} className="inline-flex min-h-10 items-center rounded-full px-3 text-slate-700 transition hover:bg-slate-100 hover:text-(--brand-blue-700)">Quick Call: +92 317 0941821</a>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center rounded-full border border-[#1f8a67]/25 px-3 text-[#177454] transition hover:bg-[#eafaf4]">WhatsApp</a>
          <button type="button" aria-pressed={urduMode} onClick={() => setUrduMode((enabled) => !enabled)} className="inline-flex min-h-9 min-w-12 items-center justify-center rounded-full border border-slate-200 px-3 text-xs font-bold text-slate-600 transition hover:bg-slate-100" title="Toggle Urdu label">
            {urduMode ? "اردو" : "EN"}
          </button>
          <Link href="/contact#contact-form" className="inline-flex min-h-11 items-center justify-center rounded-full bg-(--brand-blue-700) px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-(--brand-blue-900)">Get Policy Quote</Link>
        </div>

        <button type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 md:hidden">
          <span className="space-y-1.5" aria-hidden="true">
            <span className={`block h-0.5 w-5 rounded-full bg-current transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 rounded-full bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 rounded-full bg-current transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <nav className="w-full bg-[#0052cc]" aria-label="Main navigation">
        <div className="mx-auto flex min-h-12 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="hidden w-full items-center justify-between md:flex">
            {navLinks.map((link) => {
              const active = isActiveRoute(pathname, link.href);
              return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={`inline-flex min-h-12 items-center border-b-2 px-3 text-sm font-semibold text-white transition hover:bg-white/10 ${active ? "border-white" : "border-transparent"}`}>{link.name}</Link>;
            })}
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100 md:hidden">State Life Sukkur 5405</p>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-blue-400/30 bg-[#0052cc] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map((link) => {
              const active = isActiveRoute(pathname, link.href);
              return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} onClick={() => setMenuOpen(false)} className={`rounded-xl px-3 py-3 text-base font-medium text-white transition hover:bg-white/10 ${active ? "bg-white/15 font-semibold" : ""}`}>{link.name}</Link>;
            })}
            <div className="mt-2 grid gap-2 border-t border-white/20 pt-3 sm:grid-cols-2">
              <a href={`tel:+${WHATSAPP_NUMBER}`} onClick={() => setMenuOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-(--brand-blue-900)">Quick Call</a>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1f8a67] px-4 py-3 text-sm font-semibold text-white">WhatsApp</a>
              <Link href="/contact#contact-form" onClick={() => setMenuOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-full bg-white/15 px-4 py-3 text-sm font-semibold text-white sm:col-span-2">Get Policy Quote</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
