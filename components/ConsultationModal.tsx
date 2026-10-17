"use client";

import { Check, LoaderCircle, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type FormEvent } from "react";
import styles from "./Hero.module.css";

type ConsultationModalProps = {
  onOpenChange: (open: boolean) => void;
  initialPolicy: string;
  initialBudget: number;
};

const policyTypes = ["Savings", "Health Insurance", "Child Education", "Marriage Endowment", "Retirement Plan", "Wealth Growth"];

export default function ConsultationModal({ onOpenChange, initialPolicy, initialBudget }: ConsultationModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [policy, setPolicy] = useState(policyTypes.includes(initialPolicy) ? initialPolicy : policyTypes[0]);
  const [budget, setBudget] = useState(Math.min(100000, Math.max(5000, initialBudget)));
  const [mode, setMode] = useState("In-Person at Sukkur Office");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [initialPolicy, initialBudget, onOpenChange]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "plan_enquiry",
          name: name.trim(),
          phone: phone.trim(),
          plan: policy,
          best_time: mode,
          message: `Estimated monthly budget: PKR ${budget.toLocaleString("en-PK")}. Consultation mode: ${mode}.`,
          consent: true,
          website: "",
        }),
      });

      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return createPortal(
    <div
      className={styles.modalOverlay}
      role="presentation"
      style={{ backdropFilter: "blur(14px) saturate(85%)", WebkitBackdropFilter: "blur(14px) saturate(85%)" }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <div
        ref={dialogRef}
        className={styles.modalDialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-title"
      >
        <button
          ref={closeButtonRef}
          className={styles.modalClose}
          type="button"
          aria-label="Close consultation form"
          onClick={() => onOpenChange(false)}
        >
          <X size={18} aria-hidden="true" />
        </button>

        {status === "success" ? (
          <div className={styles.successState} role="status">
            <div className={styles.successIcon}><Check size={22} aria-hidden="true" /></div>
            <p className={styles.modalBadge}>STATE LIFE SUKKUR 5405</p>
            <h2 id="consultation-title">Request received</h2>
            <p>Our Sukkur Area Office team will contact you to arrange your private consultation.</p>
            <button className={styles.modalSubmit} type="button" onClick={() => onOpenChange(false)}>Close</button>
          </div>
        ) : (
          <>
            <p className={styles.modalBadge}>STATE LIFE SUKKUR 5405</p>
            <h2 className={styles.modalTitle} id="consultation-title">Schedule Private Consultation</h2>
            <p className={styles.modalIntro}>Share a few details and our local team will help you explore suitable options.</p>

            <form className={styles.consultationForm} onSubmit={handleSubmit}>
              <div className={styles.modalFields}>
                <div className={styles.modalField}>
                  <label htmlFor="consultation-name">Full name</label>
                  <input
                    id="consultation-name"
                    name="name"
                    autoComplete="name"
                    maxLength={100}
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div className={styles.modalField}>
                  <label htmlFor="consultation-phone">Phone number / WhatsApp</label>
                  <input
                    id="consultation-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    minLength={7}
                    maxLength={25}
                    required
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="03XX XXXXXXX"
                  />
                </div>
                <div className={styles.modalField}>
                  <label htmlFor="consultation-plan">Preferred policy type</label>
                  <select id="consultation-plan" value={policy} onChange={(event) => setPolicy(event.target.value)}>
                    {policyTypes.map((policyType) => <option key={policyType}>{policyType}</option>)}
                  </select>
                </div>
                <div className={styles.budgetField}>
                  <div className={styles.budgetHeading}>
                    <label htmlFor="consultation-budget">Estimated monthly budget</label>
                    <output htmlFor="consultation-budget">PKR {budget.toLocaleString("en-PK")}{budget === 100000 ? "+" : ""}</output>
                  </div>
                  <input
                    className={styles.budgetRange}
                    id="consultation-budget"
                    type="range"
                    min="5000"
                    max="100000"
                    step="1000"
                    value={budget}
                    onChange={(event) => setBudget(Number(event.target.value))}
                    style={{ "--range-progress": `${((budget - 5000) / 95000) * 100}%` } as React.CSSProperties}
                  />
                  <div className={styles.budgetLimits}><span>PKR 5,000</span><span>PKR 100,000+</span></div>
                </div>
                <fieldset className={styles.modeField}>
                  <legend>Preferred consultation mode</legend>
                  <div className={styles.modeOptions}>
                    {["In-Person at Sukkur Office", "Phone / WhatsApp Call"].map((consultationMode) => (
                      <label className={mode === consultationMode ? styles.modeOptionActive : styles.modeOption} key={consultationMode}>
                        <input
                          type="radio"
                          name="consultation-mode"
                          value={consultationMode}
                          checked={mode === consultationMode}
                          onChange={() => setMode(consultationMode)}
                        />
                        <span>{consultationMode}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <label className={styles.consentField}>
                <input type="checkbox" required />
                <span>I agree to be contacted by State Life Sukkur Area Office 5405 about this request.</span>
              </label>

              {status === "error" && <p className={styles.formError} role="alert">We couldn&apos;t send your request. Please try again or contact the Sukkur office.</p>}

              <button className={styles.modalSubmit} type="submit" disabled={status === "sending"}>
                {status === "sending" ? <><LoaderCircle className={styles.spinner} size={16} aria-hidden="true" /> Sending request</> : "Confirm request"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}