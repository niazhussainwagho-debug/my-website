"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import SectionJumpControls from "./SectionJumpControls";

export default function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isStaffRoute = pathname === "/staff" || pathname.startsWith("/staff/");

  if (isStaffRoute) {
    return <div className="min-h-screen bg-[#f4f5f1] text-[#18231d]">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <SectionJumpControls />
      <div className="relative m-0 w-full max-w-[100vw] overflow-x-clip p-0 pt-20 sm:pt-24">{children}</div>
    </>
  );
}