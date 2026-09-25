"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-slate-900" onClick={() => setMenuOpen(false)}>
          <span className="flex h-11 w-[140px] shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-sm ring-1 ring-slate-200 sm:h-12 sm:w-[160px]">
            <Image src="/area-logo.png" alt="Sukkur Area Office logo" width={320} height={110} priority className="h-full w-full object-contain" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold sm:text-base">Sukkur Area Office</span>
            <span className="block text-xs text-slate-500">State Life Guidance</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
          {navLinks.map((link) => {
            const active = isActiveRoute(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`transition hover:text-(--brand-blue-700) ${active ? "text-(--brand-blue-700)" : ""} ${link.name === "Join Us" ? "text-[#1f8a67] hover:text-[#177454]" : ""}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a href="tel:+923132894151" className="hidden min-h-11 items-center justify-center rounded-full bg-(--brand-blue-700) px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-(--brand-blue-900) md:inline-flex">
            Call Now
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm md:hidden"
          >
            <span className="space-y-1.5" aria-hidden="true">
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:px-6">
            {navLinks.map((link) => {
              const active = isActiveRoute(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-3 py-2.5 text-base font-medium transition hover:bg-slate-100 hover:text-(--brand-blue-700) ${active ? "bg-(--brand-blue-100) font-semibold text-(--brand-blue-700)" : "text-slate-700"}`}
                >
                  {link.name}
                </Link>
              );
            })}
            <a href="tel:+923132894151" onClick={() => setMenuOpen(false)} className="mt-1 inline-flex min-h-11 items-center justify-center rounded-full bg-(--brand-blue-700) px-4 py-3 text-sm font-semibold text-white">
              Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
