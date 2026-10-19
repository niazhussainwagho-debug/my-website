"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Phone,
  Mail,
  ArrowUpRight,
  MessageSquare,
  Building2,
  ChevronDown,
  User,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Loader2,
  LogOut,
  Sparkles,
  Lock,
} from "lucide-react";
import {
  AREA_CODE,
  CONTACT_EMAIL,
  MANAGER_NAME,
  MANAGER_TITLE,
  PHONE_DISPLAY,
  LANDLINE_NUMBER,
  WHATSAPP_NUMBER,
  emailLink,
  landlineLink,
  telLink,
} from "../../lib/contact";

type UserProfile = {
  name: string;
  phone: string;
  email: string;
  city?: string;
  policyNumber?: string | null;
  joinedAt?: string;
};

export default function AboutPage() {
  // ── Portal State ──
  const [portalOpen, setPortalOpen] = useState(false);
  const [portalTab, setPortalTab] = useState<"login" | "register">("login");
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCity, setRegCity] = useState("Sukkur");
  const [regPolicy, setRegPolicy] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");

  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  // Check saved session on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("statelife_client_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        queueMicrotask(() => {
          setCurrentUser(parsed);
        });
      }
    } catch {
      // ignore storage error
    }
  }, []);

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    setFormMessage("");

    try {
      const res = await fetch("/api/user/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login fail ho gaya.");
      }

      setCurrentUser(data.user);
      localStorage.setItem("statelife_client_user", JSON.stringify(data.user));
      setFormStatus("success");
      setFormMessage(data.message || "Login kamyab!");
    } catch (err: unknown) {
      setFormStatus("error");
      setFormMessage(err instanceof Error ? err.message : "Login fail ho gaya.");
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    setFormMessage("");

    if (regPassword !== regConfirmPassword) {
      setFormStatus("error");
      setFormMessage("Dono passwords aapas mein match nahi kar rahe.");
      return;
    }

    try {
      const res = await fetch("/api/user/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          name: regName,
          email: regEmail,
          phone: regPhone,
          city: regCity,
          policyNumber: regPolicy,
          password: regPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Registration fail ho gayi.");
      }

      setCurrentUser(data.user);
      localStorage.setItem("statelife_client_user", JSON.stringify(data.user));
      setFormStatus("success");
      setFormMessage(data.message || "Account kamyabi se ban gaya!");
    } catch (err: unknown) {
      setFormStatus("error");
      setFormMessage(err instanceof Error ? err.message : "Registration fail ho gayi.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("statelife_client_user");
    setFormStatus("idle");
    setFormMessage("");
  };

  return (
    <main
      className="sub-page min-h-screen"
      style={{
        backgroundColor: "#0c0d0e",
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.024) 1px, transparent 1px), linear-gradient(90deg, rgba(215, 184, 117, 0.035) 1px, transparent 1px)",
        backgroundSize: "100% 72px, 72px 100%",
        color: "#f7f4ed",
      }}
    >
      {/* ── Ambient Luxury Glows ── */}
      <div className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#d7b875]/[0.08] blur-[140px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-10 h-[450px] w-[450px] rounded-full bg-[#d7b875]/[0.05] blur-[140px]"
        />

        {/* ── Top Header Section ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-8 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Tracking Eyebrow Badge */}
            <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-[#d7b875]/35 bg-[#0c0d0e]/80 px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] uppercase text-[#e2cca0] shadow-[0_2px_12px_rgba(0,0,0,0.4)] backdrop-blur-md sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d7b875] shadow-[0_0_10px_rgba(215,184,117,0.8)]" />
              <span className="truncate">
                STATE LIFE • SUKKUR AREA OFFICE {AREA_CODE}
              </span>
            </div>

            {/* Authoritative Editorial Serif Headline */}
            <h1
              className="mt-6 text-3xl sm:text-5xl lg:text-6xl text-[#f7f4ed] tracking-normal"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400 }}
            >
              Protecting Generations.<br />
              <span className="text-[#d7b875] italic sm:not-italic">
                Backed by the State.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#a6a6a1] sm:text-base md:text-lg">
              For over half a century, safeguarding Pakistani families with sovereign trust,
              generational financial planning, and unwavering local leadership in Northern Sindh.
            </p>
          </div>
        </section>

        {/* ── Expandable Client Portal Dropdown Section (All Devices) ── */}
        <section className="relative z-20 mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#d7b875]/40 bg-[#121314]/95 shadow-[0_12px_45px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300">
            {/* Dropdown Header Trigger Bar */}
            <button
              type="button"
              onClick={() => setPortalOpen(!portalOpen)}
              className="flex w-full items-center justify-between p-5 sm:p-7 text-left cursor-pointer transition-colors hover:bg-white/[0.02]"
              aria-expanded={portalOpen}
            >
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#d7b875]/40 bg-[#d7b875]/10 text-[#d7b875] shadow-inner">
                  <User size={22} />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#d7b875]/30 bg-[#d7b875]/10 px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-[#e8d5a4]">
                    <Lock size={10} className="text-[#d7b875]" />
                    <span>Client &amp; Policyholder Portal</span>
                  </div>
                  <h2
                    className="mt-1 text-base sm:text-xl font-normal text-[#f5f2ea]"
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                  >
                    {currentUser ? `Welcome back, ${currentUser.name}` : "Member Sign In &amp; Registration Desk"}
                  </h2>
                  <p className="text-[11px] text-[#aaa9a3] hidden sm:block">
                    {currentUser
                      ? "Aapka verified client portal active hai. Manage policies & direct advisory."
                      : "Apna account login karein ya naya register karein (instant email confirmation & database sync)."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden md:inline-flex rounded-xl border border-[#d7b875]/40 bg-[#d7b875]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#e6d3a6]">
                  {portalOpen ? "Close Portal" : currentUser ? "View Portal" : "Access Login"}
                </span>
                <div className={`flex h-9 w-9 items-center justify-center rounded-full border border-[#d7b875]/35 bg-[#d7b875]/10 text-[#d7b875] transition-transform duration-300 ${portalOpen ? "rotate-180" : ""}`}>
                  <ChevronDown size={18} />
                </div>
              </div>
            </button>

            {/* Expandable Dropdown Drawer Body */}
            {portalOpen && (
              <div className="border-t border-white/[0.08] p-5 sm:p-8 animate-fadeIn">
                {/* LOGGED IN DASHBOARD VIEW */}
                {currentUser ? (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-[#d7b875]/30 bg-[#161716] p-5">
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d7b875] text-[#0c0d0e] font-serif text-lg font-bold">
                          {currentUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#d7b875]">
                            Verified Member • Sukkur {AREA_CODE}
                          </span>
                          <h3
                            className="text-lg font-semibold text-[#f5f2ea]"
                            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                          >
                            {currentUser.name}
                          </h3>
                          <p className="text-xs text-[#aaa9a3]">
                            {currentUser.email} • {currentUser.phone}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#f7f4ed] hover:border-red-400/50 hover:text-red-300 transition"
                      >
                        <LogOut size={13} />
                        <span>Sign Out</span>
                      </button>
                    </div>

                    {/* Quick Member Action Cards */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          `Salam State Life Sukkur! Main registered client ${currentUser.name} (${currentUser.phone}) hoon aur mujhe policy verification/guidance chahiye.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4.5 transition hover:border-[#d7b875]/50 hover:bg-white/[0.04]"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 mb-3">
                          <MessageSquare size={16} />
                        </div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#f5f2ea]">
                          WhatsApp Advisory Desk
                        </h4>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#aaa9a3]">
                          Direct priority assistance with Area Office representative.
                        </p>
                      </a>

                      <a
                        href={telLink()}
                        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4.5 transition hover:border-[#d7b875]/50 hover:bg-white/[0.04]"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d7b875]/20 text-[#d7b875] mb-3">
                          <Phone size={16} />
                        </div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#f5f2ea]">
                          Schedule Phone Meeting
                        </h4>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#aaa9a3]">
                          Connect directly with {MANAGER_NAME} ({PHONE_DISPLAY}).
                        </p>
                      </a>

                      <Link
                        href="/products"
                        className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4.5 transition hover:border-[#d7b875]/50 hover:bg-white/[0.04]"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 mb-3">
                          <ShieldCheck size={16} />
                        </div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#f5f2ea]">
                          Review Policy Tables
                        </h4>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#aaa9a3]">
                          Explore Table 01, Sadabahar, Child &amp; Special plans.
                        </p>
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* SIGN IN & REGISTER TABS */
                  <div>
                    {/* Tab Switcher */}
                    <div className="flex items-center justify-center gap-2 mb-6 border-b border-white/[0.08] pb-4">
                      <button
                        type="button"
                        onClick={() => {
                          setPortalTab("login");
                          setFormStatus("idle");
                          setFormMessage("");
                        }}
                        className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                          portalTab === "login"
                            ? "border border-[#d7b875] bg-[#d7b875]/15 text-[#ecd9aa] shadow-[inset_0_-2px_0_#d7b875]"
                            : "border border-white/15 bg-white/[0.02] text-[#aaa9a3] hover:text-white"
                        }`}
                      >
                        🔑 Sign In (Login)
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setPortalTab("register");
                          setFormStatus("idle");
                          setFormMessage("");
                        }}
                        className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                          portalTab === "register"
                            ? "border border-[#d7b875] bg-[#d7b875]/15 text-[#ecd9aa] shadow-[inset_0_-2px_0_#d7b875]"
                            : "border border-white/15 bg-white/[0.02] text-[#aaa9a3] hover:text-white"
                        }`}
                      >
                        ✨ Create Account (Register)
                      </button>
                    </div>

                    {/* Feedback Alert */}
                    {formMessage && (
                      <div
                        className={`mb-5 flex items-start gap-2.5 rounded-2xl p-3.5 text-xs ${
                          formStatus === "success"
                            ? "border border-[#d7b875]/40 bg-[#d7b875]/10 text-[#ecd9aa]"
                            : "border border-red-500/30 bg-red-500/10 text-red-300"
                        }`}
                      >
                        {formStatus === "success" ? (
                          <CheckCircle2 size={16} className="shrink-0 text-[#d7b875] mt-0.5" />
                        ) : (
                          <AlertCircle size={16} className="shrink-0 text-red-400 mt-0.5" />
                        )}
                        <span>{formMessage}</span>
                      </div>
                    )}

                    {/* TAB 1: LOGIN FORM */}
                    {portalTab === "login" && (
                      <form onSubmit={handleLoginSubmit} className="space-y-4 max-w-lg mx-auto">
                        <div>
                          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#d6d2c7]">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            placeholder="ali@example.com"
                            required
                            className="h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-xs font-medium text-[#f7f4ed] placeholder-[#7a7974] outline-none transition focus:border-[#d7b875] focus:bg-[#181918] focus:ring-1 focus:ring-[#d7b875]/50"
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#d6d2c7]">
                            Password *
                          </label>
                          <input
                            type="password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                            className="h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-xs font-medium text-[#f7f4ed] placeholder-[#7a7974] outline-none transition focus:border-[#d7b875] focus:bg-[#181918] focus:ring-1 focus:ring-[#d7b875]/50"
                          />
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={formStatus === "loading"}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d7b875] py-3 text-xs font-bold uppercase tracking-wider text-[#0c0d0e] shadow-md transition-all hover:bg-[#e6cca0] hover:scale-[1.01] disabled:opacity-60 cursor-pointer"
                          >
                            {formStatus === "loading" ? (
                              <>
                                <Loader2 size={15} className="animate-spin" />
                                <span>Verifying Account...</span>
                              </>
                            ) : (
                              <>
                                <span>Sign In to Client Portal</span>
                                <KeyRound size={14} />
                              </>
                            )}
                          </button>
                        </div>

                        <p className="text-center text-[11px] text-[#898984] pt-1">
                          Naya account banana hai? Upar <strong>&quot;Create Account&quot;</strong> tab select karein.
                        </p>
                      </form>
                    )}

                    {/* TAB 2: REGISTER FORM */}
                    {portalTab === "register" && (
                      <form onSubmit={handleRegisterSubmit} className="space-y-4 max-w-xl mx-auto">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#d6d2c7]">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              value={regName}
                              onChange={(e) => setRegName(e.target.value)}
                              placeholder="Muhammad Ali"
                              required
                              className="h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-xs font-medium text-[#f7f4ed] placeholder-[#7a7974] outline-none transition focus:border-[#d7b875] focus:bg-[#181918] focus:ring-1 focus:ring-[#d7b875]/50"
                            />
                          </div>

                          <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#d6d2c7]">
                              Mobile Number *
                            </label>
                            <input
                              type="tel"
                              value={regPhone}
                              onChange={(e) => setRegPhone(e.target.value)}
                              placeholder="0300-1234567"
                              required
                              className="h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-xs font-medium text-[#f7f4ed] placeholder-[#7a7974] outline-none transition focus:border-[#d7b875] focus:bg-[#181918] focus:ring-1 focus:ring-[#d7b875]/50"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#d6d2c7]">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              value={regEmail}
                              onChange={(e) => setRegEmail(e.target.value)}
                              placeholder="ali@example.com"
                              required
                              className="h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-xs font-medium text-[#f7f4ed] placeholder-[#7a7974] outline-none transition focus:border-[#d7b875] focus:bg-[#181918] focus:ring-1 focus:ring-[#d7b875]/50"
                            />
                          </div>

                          <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#d6d2c7]">
                              City / Tehsil
                            </label>
                            <input
                              type="text"
                              value={regCity}
                              onChange={(e) => setRegCity(e.target.value)}
                              placeholder="Sukkur / Rohri / Khairpur"
                              className="h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-xs font-medium text-[#f7f4ed] placeholder-[#7a7974] outline-none transition focus:border-[#d7b875] focus:bg-[#181918] focus:ring-1 focus:ring-[#d7b875]/50"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#d6d2c7]">
                            State Life Policy Number (Optional)
                          </label>
                          <input
                            type="text"
                            value={regPolicy}
                            onChange={(e) => setRegPolicy(e.target.value)}
                            placeholder="Agar pehle se koi policy hai (e.g. 5405-XXXXX)"
                            className="h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-xs font-medium text-[#f7f4ed] placeholder-[#7a7974] outline-none transition focus:border-[#d7b875] focus:bg-[#181918] focus:ring-1 focus:ring-[#d7b875]/50"
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#d6d2c7]">
                              Password *
                            </label>
                            <input
                              type="password"
                              value={regPassword}
                              onChange={(e) => setRegPassword(e.target.value)}
                              placeholder="Kam az kam 6 characters"
                              required
                              className="h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-xs font-medium text-[#f7f4ed] placeholder-[#7a7974] outline-none transition focus:border-[#d7b875] focus:bg-[#181918] focus:ring-1 focus:ring-[#d7b875]/50"
                            />
                          </div>

                          <div>
                            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#d6d2c7]">
                              Confirm Password *
                            </label>
                            <input
                              type="password"
                              value={regConfirmPassword}
                              onChange={(e) => setRegConfirmPassword(e.target.value)}
                              placeholder="Dobara password enter karein"
                              required
                              className="h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 text-xs font-medium text-[#f7f4ed] placeholder-[#7a7974] outline-none transition focus:border-[#d7b875] focus:bg-[#181918] focus:ring-1 focus:ring-[#d7b875]/50"
                            />
                          </div>
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={formStatus === "loading"}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d7b875] py-3 text-xs font-bold uppercase tracking-wider text-[#0c0d0e] shadow-md transition-all hover:bg-[#e6cca0] hover:scale-[1.01] disabled:opacity-60 cursor-pointer"
                          >
                            {formStatus === "loading" ? (
                              <>
                                <Loader2 size={15} className="animate-spin" />
                                <span>Registering &amp; Syncing Database...</span>
                              </>
                            ) : (
                              <>
                                <span>Register &amp; Access Portal</span>
                                <Sparkles size={14} />
                              </>
                            )}
                          </button>
                        </div>

                        <p className="text-center text-[10.5px] text-[#898984] pt-1">
                          Registration par Area Office ko instant alert aur aapke email par confirmation send ki jati hai.
                        </p>
                      </form>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── 2 Main Cards ── */}
        <section className="relative z-10 mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">

            {/* CARD 1 (LEFT): Architectural Manifesto Card */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/[0.12] bg-[#121314]/90 p-7 shadow-[0_12px_38px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-10 transition-all duration-300 hover:border-[#d7b875]/50">
              <div className="space-y-8">
                {/* 01. Sovereign Federal Guarantee */}
                <div className="border-b border-white/[0.08] pb-7">
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-2xl font-bold text-[#d7b875]"
                      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                    >
                      01.
                    </span>
                    <div>
                      <h2
                        className="text-xl sm:text-2xl font-normal text-[#f5f2ea]"
                        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                      >
                        Sovereign Federal Guarantee
                      </h2>
                      <p className="mt-1 text-xs font-semibold text-[#d7b875]">
                        (100% State Backed)
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-[#aaa9a3]">
                        Full financial security guaranteed by the Government of Pakistan under the State Life Insurance Act.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 02. 50+ Years Unbroken Trust */}
                <div className="border-b border-white/[0.08] pb-7">
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-2xl font-bold text-[#d7b875]"
                      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                    >
                      02.
                    </span>
                    <div>
                      <h2
                        className="text-xl sm:text-2xl font-normal text-[#f5f2ea]"
                        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                      >
                        50+ Years Unbroken Trust
                      </h2>
                      <p className="mt-2 text-xs leading-relaxed text-[#aaa9a3]">
                        Generational stability and uninterrupted claims settlement since 1972 across Pakistan.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 03. Ethical Stewardship */}
                <div>
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-2xl font-bold text-[#d7b875]"
                      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                    >
                      03.
                    </span>
                    <div>
                      <h2
                        className="text-xl sm:text-2xl font-normal text-[#f5f2ea]"
                        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                      >
                        Ethical Stewardship
                      </h2>
                      <p className="mt-2 text-xs leading-relaxed text-[#aaa9a3]">
                        Transparent policy illustrations, zero hidden clauses, and committed family welfare guidance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Office Footnote */}
              <div className="mt-8 flex items-center justify-between border-t border-white/[0.08] pt-5 text-xs text-[#aaa9a3]">
                <span>Sukkur Zone Region</span>
                <span className="font-semibold text-[#d7b875]">Active Office {AREA_CODE}</span>
              </div>
            </div>

            {/* CARD 2 (RIGHT): Executive Leadership with area-manager.jpg */}
            <div className="relative flex flex-col justify-between rounded-3xl border border-[#d7b875]/30 bg-[#121314]/90 p-7 shadow-[0_12px_38px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-10 transition-all duration-300 hover:border-[#d7b875]/60">

              {/* Top Credential Seals */}
              <div className="flex items-center justify-between">
                {/* Executive Credentials Laurel Badge */}
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d7b875]/40 bg-[#d7b875]/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-[#e8d5a4]">
                  <Award size={14} className="text-[#d7b875]" />
                  <span>Executive Credentials</span>
                </div>

                {/* 5405 Official Circular Seal */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d7b875]/30 bg-white/[0.03] p-1 text-center shadow-inner">
                  <div className="flex flex-col items-center justify-center leading-none">
                    <span className="text-[7.5px] font-bold tracking-wider text-[#aaa9a3] uppercase">SUKKUR</span>
                    <span className="text-[11px] font-bold text-[#d7b875] font-serif">{AREA_CODE}</span>
                    <span className="text-[7px] text-[#aaa9a3] uppercase">OFFICE</span>
                  </div>
                </div>
              </div>

              {/* Area Manager Portrait */}
              <div className="relative my-6 mx-auto w-full max-w-[280px] sm:max-w-[320px]">
                <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-2xl border border-[#d7b875]/30 bg-black shadow-2xl">
                  <Image
                    src="/area-manager.jpg"
                    alt={MANAGER_NAME}
                    fill
                    priority
                    sizes="(max-width: 640px) 280px, 320px"
                    className="object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
              </div>

              {/* Bottom Area Manager Info & WhatsApp Concierge Pill */}
              <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-white/[0.08] pt-5">
                <div>
                  <h3
                    className="text-xl font-normal text-[#f5f2ea]"
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                  >
                    {MANAGER_NAME}
                  </h3>
                  <p className="text-xs font-semibold text-[#d7b875] uppercase tracking-wider mt-0.5">
                    {MANAGER_TITLE}
                  </p>
                  <p className="text-[11px] text-[#aaa9a3]">
                    Sukkur Area Office {AREA_CODE}
                  </p>
                </div>

                {/* WhatsApp Concierge Gold Pill */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Salam Mr. Fayyaz Ahmed! Mujhe State Life Sukkur Area Office se guidance chahiye."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d7b875] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0c0d0e] shadow-lg shadow-[#d7b875]/25 transition-all duration-200 hover:bg-[#e6cca0] hover:scale-105"
                >
                  <MessageSquare size={14} />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>

            </div>

          </div>
        </section>

        {/* ── Bottom Metrics Ribbon ── */}
        <section className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 rounded-2xl border border-white/[0.1] bg-[#121314]/90 p-6 text-center backdrop-blur-xl sm:grid-cols-3 sm:p-8 shadow-[0_12px_38px_rgba(0,0,0,0.35)]">
            <div>
              <p
                className="text-3xl sm:text-5xl font-normal text-[#d7b875]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                5,000+
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#aaa9a3]">
                Policies Protected
              </p>
            </div>
            <div className="border-y border-white/[0.08] py-4 sm:border-y-0 sm:border-x sm:py-0">
              <p
                className="text-3xl sm:text-5xl font-normal text-[#d7b875]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                100%
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#aaa9a3]">
                Sovereign Guarantee
              </p>
            </div>
            <div>
              <p
                className="text-3xl sm:text-5xl font-normal text-[#d7b875]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                50+
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#aaa9a3]">
                Years Legacy
              </p>
            </div>
          </div>
        </section>

        {/* ── Comprehensive Branch Contact Desk ── */}
        <section className="relative z-10 mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#d7b875]/30 bg-[#121314]/90 p-6 sm:p-8 backdrop-blur-xl shadow-[0_12px_38px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#d7b875]">
                  Sukkur Area Office {AREA_CODE} Desk
                </p>
                <h3
                  className="mt-1 text-lg sm:text-xl font-normal text-[#f5f2ea]"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  Station Road / Main Branch, Sukkur, Sindh
                </h3>
                <p className="text-xs text-[#aaa9a3] mt-1">
                  Timings: Monday to Friday (9:00 AM – 5:00 PM) • Direct official channels
                </p>
              </div>

              {/* Quick Contact Links */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={telLink()}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-[#f7f4ed] hover:border-[#d7b875]/50 transition"
                >
                  <Phone size={14} className="text-[#d7b875]" />
                  <span>{PHONE_DISPLAY}</span>
                </a>
                <a
                  href={landlineLink()}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-[#f7f4ed] hover:border-[#d7b875]/50 transition"
                >
                  <Building2 size={14} className="text-[#d7b875]" />
                  <span>{LANDLINE_NUMBER}</span>
                </a>
                <a
                  href={emailLink()}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-[#f7f4ed] hover:border-[#d7b875]/50 transition"
                >
                  <Mail size={14} className="text-[#d7b875]" />
                  <span>{CONTACT_EMAIL}</span>
                </a>
                <Link
                  href="/contact#contact-form"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#d7b875] hover:bg-[#e6cca0] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0c0d0e] transition shadow-md shadow-[#d7b875]/20"
                >
                  <span>Book Consultation</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="relative z-10 border-t border-white/10 px-4 py-8 text-xs text-[#aaa9a3] sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p>State Life Insurance Corporation of Pakistan • Sukkur Area Office {AREA_CODE}</p>
            <div className="flex items-center gap-5">
              <Link href="/products" className="hover:text-[#d7b875] transition">Products</Link>
              <Link href="/become-an-agent" className="hover:text-[#d7b875] transition">Careers</Link>
              <Link href="/contact" className="hover:text-[#d7b875] transition">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
