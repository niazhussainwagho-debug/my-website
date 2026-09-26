import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/Navbar";
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full w-full max-w-full flex-col overflow-x-hidden">
        <Navbar />
        <div className="relative m-0 w-full max-w-full overflow-x-hidden p-0 pt-30 lg:pt-34">{children}</div>
      </body>
    </html>
  );
}
