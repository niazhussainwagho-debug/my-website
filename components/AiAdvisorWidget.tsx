"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Phone, CheckCircle, ExternalLink } from "lucide-react";
import { AREA_CODE, MANAGER_NAME, WHATSAPP_NUMBER } from "../lib/contact";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const quickQuestions = [
  "Takaful Endowment Plan kya hai?",
  "Meeadi Policy (Table 03) kya hai?",
  "Titanium Family kya hai?",
  "Golden Endowment Plan kya hai?",
  "Child Education Plan ki tafseel?",
];

export default function AiAdvisorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: `Main AI Advisor hoon. Final faisle aur tafseelat ke liye Area Office se tasdeeq karein.\n\nAssalam-o-Alaikum! Main **State Life Sukkur Area Office ${AREA_CODE}** ka AI Advisor hoon.\n\nAap mujhse Takaful Endowment, Meeadi Policy (Table 03), Titanium Family, Golden Endowment, Jeevan Saathi, Child Education plans aur office ke bare mein pooch sakte hain. Main aapki kya madad kar sakta hoon?`,
      timestamp: "Now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: textToSend },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("API response error");
      }

      const data = await response.json();
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        role: "assistant",
        content: data.reply || `Sukkur Area Office ${AREA_CODE} se mazeed rahnumai ke liye aap office waqt mein tashreef la sakte hain.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          role: "assistant",
          content: `Maazrat, thodi si takneeki masla pesh aa gayi. Aap seedha **${MANAGER_NAME}** se rabta kar sakte hain ya Sukkur Area Office 5405 tashreef la sakte hain.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Trigger - Clean State Life 3D Robot Image ONLY (No text/pill) */}
      <div className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-[75]">
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
          whileTap={{ scale: 0.92 }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          aria-label="Open State Life AI Advisor"
          className="group relative flex items-center justify-center rounded-full p-0 border-0 bg-transparent focus:outline-none"
        >
          {/* Subtle Outer Cyan Glow Halo */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-400/40 via-blue-500/30 to-cyan-400/40 blur-md opacity-70 group-hover:opacity-100 transition-opacity"></span>

          {/* Clean Circular State Life Robot Image */}
          <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden shadow-[0_10px_25px_rgba(2,132,199,0.45)] ring-2 ring-sky-400/60 group-hover:ring-sky-300 transition-all bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/state-life-bot.png"
              alt="State Life AI Advisor"
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>

          {/* Active Online Status Badge */}
          <span className="absolute top-0.5 right-0.5 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-[#070d19]"></span>
          </span>
        </motion.button>
      </div>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 left-4 sm:left-6 z-[80] w-[calc(100vw-2rem)] sm:w-[410px] max-h-[80vh] h-[580px] flex flex-col rounded-2xl border border-sky-500/40 bg-[#070d19]/98 text-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(14,165,233,0.3)] backdrop-blur-2xl overflow-hidden"
          >
            {/* Header with Blue / Sky gradient */}
            <div className="flex items-center justify-between border-b border-sky-500/25 bg-gradient-to-r from-[#0b162c] via-[#081224] to-[#040814] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full overflow-hidden border border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.35)] bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/state-life-bot.png"
                    alt="AI Advisor"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#070d19]"></span>
                </div>
                <div>
                  <h3 className="font-sans text-sm font-bold tracking-wide text-white flex items-center gap-1.5">
                    State Life AI Advisor
                    <span className="rounded-md border border-sky-400/30 bg-sky-500/20 px-1.5 py-0.5 text-[9px] font-mono font-semibold text-sky-300">
                      Office {AREA_CODE}
                    </span>
                  </h3>
                  <p className="text-[11px] text-sky-300/70">Official Smart Assistant • 24/7 Active</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp Direct Desk"
                  className="rounded-lg p-1.5 text-sky-300/80 hover:text-[#25D366] hover:bg-white/5 transition-colors"
                >
                  <Phone size={16} />
                </a>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-sky-300/80 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close AI Advisor"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Quick Questions Pills */}
            <div className="border-b border-sky-500/15 bg-[#050a14] px-3 py-2 overflow-x-auto no-scrollbar flex gap-2">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(q)}
                  disabled={loading}
                  className="shrink-0 rounded-full border border-sky-500/30 bg-[#0c1527] px-2.5 py-1 text-[11px] text-sky-200 hover:border-sky-400 hover:text-white hover:bg-sky-950/60 transition-all disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden border border-sky-400/40 bg-white mt-0.5 shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/state-life-bot.png"
                        alt="Bot"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-md ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium rounded-tr-sm shadow-sky-500/20"
                        : "border border-sky-500/25 bg-[#0e192e] text-slate-100 rounded-tl-sm whitespace-pre-wrap"
                    }`}
                  >
                    {msg.content}

                    <div
                      className={`mt-1.5 text-[9px] ${
                        msg.role === "user" ? "text-white/70 text-right" : "text-sky-300/60"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.role === "user" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-sky-300 mt-0.5 border border-sky-400/30">
                      <User size={14} />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-sky-300 text-xs py-1">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden border border-sky-400/40 bg-white shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/state-life-bot.png"
                      alt="Thinking"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-[#0e192e] px-3.5 py-1.5 shadow-sm">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-400"></span>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-400 [animation-delay:0.2s]"></span>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-400 [animation-delay:0.4s]"></span>
                    <span className="text-[11px] text-sky-200 ml-1">AI Advisor soch raha hai...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Direct WhatsApp Callout Banner */}
            <div className="border-t border-sky-500/20 bg-[#050a14] px-3 py-2 flex items-center justify-between text-[11px]">
              <span className="text-sky-300/80 flex items-center gap-1.5">
                <CheckCircle size={12} className="text-emerald-400" />
                Official Sukkur 5405 Desk
              </span>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Salam%20State%20Life%20Sukkur%20Area%20Office%205405`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-300 hover:text-white font-medium flex items-center gap-1 transition-colors"
              >
                WhatsApp Helpline <ExternalLink size={11} />
              </a>
            </div>

            {/* Input Form */}
            <div className="border-t border-sky-500/25 bg-[#070d19] p-3">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Apna sawal yahan likhein (e.g. Sadabahar plan)..."
                  className="w-full rounded-xl border border-sky-500/30 bg-[#0c1527] px-3.5 py-2.5 text-xs sm:text-sm text-sky-50 placeholder-sky-300/40 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                />
                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 text-white font-semibold shadow-[0_4px_15px_rgba(14,165,233,0.4)] transition-transform hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
