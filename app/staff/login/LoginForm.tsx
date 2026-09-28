"use client";

import { ArrowRight, LockKeyhole } from "lucide-react";
import { useActionState } from "react";
import { loginStaff } from "../actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginStaff, null);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#34443a]">Work email</label>
        <input id="email" name="email" type="email" autoComplete="username" required className="h-12 w-full rounded-md border border-[#d7ddd6] bg-white px-3.5 text-[15px] text-[#18231d] outline-none transition focus:border-[#28725b] focus:ring-3 focus:ring-[#28725b]/15" />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#34443a]">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="h-12 w-full rounded-md border border-[#d7ddd6] bg-white px-3.5 text-[15px] text-[#18231d] outline-none transition focus:border-[#28725b] focus:ring-3 focus:ring-[#28725b]/15" />
      </div>
      {state?.error && <p role="alert" className="rounded-md border border-[#ecc7bd] bg-[#fff2ee] px-3.5 py-3 text-sm text-[#963f2c]">{state.error}</p>}
      <button type="submit" disabled={pending} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#24664f] px-4 text-sm font-bold text-white transition hover:bg-[#194e3c] disabled:cursor-wait disabled:opacity-70">
        <LockKeyhole size={16} aria-hidden="true" />
        {pending ? "Signing in..." : "Sign in"}
        {!pending && <ArrowRight size={16} aria-hidden="true" />}
      </button>
    </form>
  );
}