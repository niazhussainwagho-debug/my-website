import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteFrame from "../components/SiteFrame";
import ThemeProvider from "../components/ThemeProvider";
import { LanguageProvider } from "../context/LanguageContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "State Life Sukkur Area Office 5405 | Family Insurance Guidance",
  description: "Explore State Life insurance options and contact Sukkur Area Office 5405 for local policy guidance, consultation, and claims support.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-auto min-h-screen w-full max-w-[100vw] overflow-x-hidden antialiased`}
    >
      <body className="flex h-auto min-h-screen w-full max-w-[100vw] flex-col overflow-x-clip">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <SiteFrame>{children}</SiteFrame>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
