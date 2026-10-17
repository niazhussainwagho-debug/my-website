import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SiteFrame from "../components/SiteFrame";
import ThemeProvider from "../components/ThemeProvider";
import { LanguageProvider } from "../context/LanguageContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sukkur-area-office-5405.vercel.app"),
  title: "State Life Sukkur Area Office 5405 | Official Life & Savings Guidance",
  description:
    "Official State Life Insurance Sukkur Area Office 5405. Sovereign protection, Child Education, Sadabahar Table 08, and retirement planning under Area Manager Fayyaz Ahmed.",
  keywords: [
    "State Life Sukkur",
    "State Life Area Office 5405",
    "State Life Insurance Sukkur",
    "Fayyaz Ahmed State Life",
    "State Life Insurance Corporation Pakistan",
    "Life Insurance Sukkur",
    "Child Education Plan Sukkur",
    "Sadabahar Plan Sukkur Table 08",
    "State Life Agent Sukkur",
    "Insurance in Sindh",
    "Sukkur Zone State Life",
    "State Life Building Minara Road Sukkur",
  ],
  authors: [{ name: "State Life Sukkur Area Office 5405" }],
  creator: "State Life Insurance Corporation of Pakistan",
  publisher: "State Life Sukkur Area Office 5405",
  alternates: {
    canonical: "https://sukkur-area-office-5405.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://sukkur-area-office-5405.vercel.app",
    siteName: "State Life Sukkur Area Office 5405",
    title: "State Life Sukkur Area Office 5405 | Official Life & Savings Guidance",
    description:
      "Sovereign financial security & life insurance guidance from State Life Sukkur Area Office 5405. Connect directly with Area Manager Fayyaz Ahmed.",
    images: [
      {
        url: "/products/family.png",
        width: 1200,
        height: 630,
        alt: "State Life Insurance Sukkur Area Office 5405",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "State Life Sukkur Area Office 5405",
    description: "Government backed sovereign insurance protection in Sukkur & Northern Sindh.",
    images: ["/products/family.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "State Life Insurance Corporation - Sukkur Area Office 5405",
  image: "https://sukkur-area-office-5405.vercel.app/products/family.png",
  url: "https://sukkur-area-office-5405.vercel.app",
  telephone: "+92-317-0941821",
  priceRange: "PKR",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Station Road / Minara Road Area",
    addressLocality: "Sukkur",
    addressRegion: "Sindh",
    postalCode: "65200",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 27.7052,
    longitude: 68.8574,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  areaServed: ["Sukkur", "Rohri", "Khairpur", "Ghotki", "Larkana", "Shikarpur"],
  founder: {
    "@type": "Person",
    name: "Fayyaz Ahmed",
    jobTitle: "Area Manager",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} h-auto min-h-screen w-full max-w-[100vw] overflow-x-hidden antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex h-auto min-h-screen w-full max-w-[100vw] flex-col overflow-x-clip">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="slic-theme" disableTransitionOnChange={false}>
          <LanguageProvider>
            <SiteFrame>{children}</SiteFrame>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
