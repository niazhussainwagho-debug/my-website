---
name: ui-ux-design
description: >-
  Use this skill when the user wants to improve, redesign, or build UI/UX
  components for the Next.js website at D:\my-website. Covers design tokens,
  component patterns, animations, accessibility, and 21st.dev component usage.
---

# UI/UX Design Skill — my-website

This skill guides the agent in improving the visual design and user experience
of the Next.js + TailwindCSS v4 website at D:\my-website.

---

## Project Design System

### Color Palette (CSS Variables in globals.css)
| Token | Value | Usage |
|---|---|---|
| --brand-blue-900 | #061224 | Primary background |
| --brand-blue-700 | #0B1E3B | Card / section backgrounds |
| --brand-blue-500 | #1D4ED8 | Primary accent / CTA buttons |
| --brand-blue-100 | #E6EEFB | Light text on dark backgrounds |
| --background | #061224 | Default bg (dark mode: #040c18) |
| --foreground | #f8fafc | Default text |

### Typography
- Font: Geist Sans (--font-geist-sans) + Geist Mono (--font-mono)
- Loaded via next/font/google in app/layout.tsx

### Existing Global Utility Classes
- .glass — glassmorphism card (backdrop-blur, border, hover lift)
- .scroll-reveal — scroll-triggered fade+slide in (via ScrollReveal.tsx)
- .site-glow — ambient background glow effect

---

## Component Architecture

### Key Components
| File | Purpose |
|---|---|
| components/Navbar.tsx | Top navigation with language switcher + theme toggle |
| components/Hero.tsx | Landing hero section with CTA |
| components/Products.tsx | Insurance product cards |
| components/Testimonials.tsx | Customer reviews carousel |
| components/PlanApplicationForm.tsx | Multi-step application form |
| components/PolicyTableGuide.tsx | Coverage comparison table |
| components/SiteFrame.tsx | Root layout wrapper |
| components/ThemeToggle.tsx | Light/dark theme switcher |
| components/LanguageSwitcher.tsx | Urdu/English language toggle |
| components/ScrollReveal.tsx | Intersection Observer scroll animation |

### State and Context
- context/LanguageContext.tsx — provides lang + setLang (ur/en)
- lib/translations.ts — all UI strings in Urdu + English

---

## Design Principles for This Project

1. Dark-first: All designs should look excellent on dark backgrounds
2. Glassmorphism: Use .glass utility for cards; add backdrop-blur sparingly
3. Micro-animations: Use CSS transitions (200-800ms ease-out), framer-motion for complex sequences
4. Bilingual UI: All text must use translations.ts — never hardcode strings
5. Insurance context: Professional, trustworthy aesthetic
6. Mobile-first responsive: Use TailwindCSS v4 breakpoints (sm:, md:, lg:)

---

## How to Use 21st.dev MCP

When the user asks to add or improve a component:
1. Use the 21st_magic_component_builder MCP tool to search for relevant components
2. Specify the component type and style requirements
3. Adapt the returned component to use project design tokens
4. Replace hardcoded colors with CSS variables
5. Add bilingual support via useLanguage() hook
6. Wrap static elements with ScrollReveal for entrance animations

---

## Animation Guidelines

Standard transitions:
- hover states: transition all 200ms ease
- layout shifts: transition all 400ms ease-out
- scroll reveals: transition all 800ms ease-out

---

## Accessibility Checklist

- All interactive elements have aria-label or visible text
- Color contrast ratio >= 4.5:1 for body text
- Focus rings visible (focus-visible:ring-2)
- prefers-reduced-motion respected (already in globals.css)
- Language lang attribute set in html (set in layout.tsx)
