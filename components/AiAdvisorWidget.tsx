"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageSquare, X, Send, Bot, User, Phone, CheckCircle, ExternalLink } from "lucide-react";
import { AREA_CODE, MANAGER_NAME, WHATSAPP_NUMBER } from "../lib/contact";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const quickQuestions = [
  "Sadabahar Plan (Table 08) kya hai?",
  "Bachon ki taleem aur shadi plans (Table 12)",
  "Endowment Assurance (Table 01)",
  "Sukkur Office ki location aur timings?",
  "Agent / Advisor banne ka tareeqa?",
  "Area Manager Fayyaz Ahmed se rabta",
];

export default function AiAdvisorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: `Assalam-o-Alaikum! Main **State Life Sukkur Area Office ${AREA_CODE}** ka AI Advisor hoon.

Aap mujhse State Life ke popular plans (Sadabahar Table 08, Child Education, Endowment), branch timings, ya careers ke mutaliq pooch sakte hain. Main aapki kya madad kar sakta hoon?`,
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
        content: data.reply || `Sukkur Area Office ${AREA_CODE} se rabta karne ke liye aap WhatsApp (+92 317 0941821) par direct call kar sakte hain.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          role: "assistant",
          content: `Maazrat, rabta kayam karne mein masla pesh aaya. Aap direct Area Manager **${MANAGER_NAME}** se WhatsApp par rabta kar sakte hain: [WhatsApp Chat](https://wa.me/${WHATSAPP_NUMBER}).`,
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
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 left-4 sm:left-6 z-[75]">
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open State Life AI Advisor"
          className="group relative flex items-center gap-2.5 rounded-full border border-[#d4af37]/40 bg-[#0c0d0e]/95 px-3.5 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_25px_rgba(212,175,55,0.2)] backdrop-blur-xl transition-all hover:border-[#d4af37]/80 hover:shadow-[0_10px_35px_rgba(212,175,55,0.3)] sm:px-4 sm:py-3"
        >
          {/* Pulsing indicator */}
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34d399] opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#10b981]"></span>
          </span>

          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/15 text-[#e7cd88] transition-transform group-hover:scale-110">
            <Bot size={18} />
          </span>

          <div className="flex flex-col text-left">
            <span className="text-xs font-bold tracking-wide text-[#f2dfa5] flex items-center gap-1">
              AI Advisor 5405
              <Sparkles size={11} className="text-[#d4af37]" />
            </span>
            <span className="text-[10px] text-slate-400 hidden sm:block">Ask State Life Guide</span>
          </div>
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
            className="fixed bottom-20 left-4 sm:left-6 z-[80] w-[calc(100vw-2rem)] sm:w-[410px] max-h-[82vh] h-[580px] flex flex-col rounded-2xl border border-[#d4af37]/40 bg-[#0c0d0e]/95 text-[#f7f4ed] shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_35px_rgba(212,175,55,0.15)] backdrop-blur-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#d4af37]/20 bg-gradient-to-r from-[#17231f] via-[#111915] to-[#0c0d0e] px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#d4af37]/15 text-[#e7cd88]">
                  <Bot size={22} />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#10b981] ring-2 ring-[#0c0d0e]"></span>
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold tracking-wide text-[#f2dfa5] flex items-center gap-1.5">
                    State Life AI Advisor
                    <span className="rounded bg-[#d4af37]/20 px-1.5 py-0.5 text-[9px] font-mono text-[#e7cd88] font-normal">
                      Office {AREA_CODE}
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">Official Smart Guidance • Online</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp Direct Desk"
                  className="rounded-lg p-1.5 text-slate-400 hover:text-[#25D366] hover:bg-white/5 transition-colors"
                >
                  <Phone size={16} />
                </a>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close AI Advisor"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Quick Questions Pills */}
            <div className="border-b border-white/5 bg-[#090b0d] px-3 py-2 overflow-x-auto no-scrollbar flex gap-2">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(q)}
                  disabled={loading}
                  className="shrink-0 rounded-full border border-[#d4af37]/20 bg-[#161a1d] px-2.5 py-1 text-[11px] text-slate-300 hover:border-[#d4af37]/60 hover:text-[#f2dfa5] hover:bg-[#1f2529] transition-all disabled:opacity-50"
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
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/15 text-[#e7cd88] mt-0.5">
                      <Bot size={14} />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-[#d4af37] text-[#0c0d0e] font-medium rounded-tr-sm"
                        : "border border-[#d4af37]/25 bg-[#14171a] text-slate-200 rounded-tl-sm whitespace-pre-wrap"
                    }`}
                  >
                    {msg.content}

                    <div
                      className={`mt-1.5 text-[9px] ${
                        msg.role === "user" ? "text-black/60 text-right" : "text-slate-500"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.role === "user" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#f2dfa5] mt-0.5 border border-[#d4af37]/30">
                      <User size={14} />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/15 text-[#e7cd88]">
                    <Bot size={14} />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#14171a] px-3 py-1.5">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#d4af37]"></span>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#d4af37] [animation-delay:0.2s]"></span>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#d4af37] [animation-delay:0.4s]"></span>
                    <span className="text-[11px] text-slate-400 ml-1">AI Advisor soch raha hai...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Direct WhatsApp Callout Banner */}
            <div className="border-t border-white/5 bg-[#0e1215] px-3 py-2 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 flex items-center gap-1.5">
                <CheckCircle size={12} className="text-[#10b981]" />
                Official Sukkur 5405 Desk
              </span>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Salam%20State%20Life%20Sukkur%20Area%20Office%205405`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e7cd88] hover:text-[#d4af37] font-medium flex items-center gap-1 transition-colors"
              >
                WhatsApp Helpline <ExternalLink size={11} />
              </a>
            </div>

            {/* Input Form */}
            <div className="border-t border-[#d4af37]/20 bg-[#0c0d0e] p-3">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Apna sawal yahan likhein (e.g. Sadabahar plan)..."
                  className="w-full rounded-xl border border-white/15 bg-[#161a1d] px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                />
                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#d4af37] to-[#b89327] text-black font-semibold shadow-md transition-transform hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
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
