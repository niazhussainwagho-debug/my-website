import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Staff login | Sukkur Area Office",
};

export default function StaffLoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.82fr)]">
      <section className="relative hidden overflow-hidden bg-[#174e3d] px-12 py-14 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">
        <div className="absolute inset-0 opacity-20" aria-hidden="true" style={{ backgroundImage: "radial-gradient(#d4e3d7 0.7px, transparent 0.7px)", backgroundSize: "18px 18px" }} />
        <p className="relative text-xs font-bold uppercase tracking-[0.16em] text-[#d3e5d8]">Sukkur Area Office 5405</p>
        <div className="relative max-w-xl pb-10">
          <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-md border border-white/25 bg-white/10"><ShieldCheck size={24} /></div>
          <h1 className="max-w-lg text-5xl font-semibold leading-[1.08]">Good service starts with a timely follow-up.</h1>
          <p className="mt-5 max-w-md text-base leading-7 text-[#d3e5d8]">Your assigned enquiries, in one focused workspace.</p>
        </div>
        <p className="relative text-xs text-[#d3e5d8]">Staff workspace · Secure access</p>
      </section>
      <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-[410px]">
          <div className="mb-9 flex h-11 w-11 items-center justify-center rounded-md bg-[#e2eee6] text-[#24664f] lg:hidden"><ShieldCheck size={22} /></div>
          <p className="text-sm font-bold text-[#24664f]">STAFF WORKSPACE</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#18231d]">Sign in to continue</h2>
          <p className="mt-2 text-sm leading-6 text-[#69766d]">Use the work account provided by your office administrator.</p>
          <LoginForm />
          <p className="mt-7 border-t border-[#dfe4de] pt-5 text-xs leading-5 text-[#69766d]">Access is limited to active staff accounts.</p>
        </div>
      </section>
    </main>
  );
}