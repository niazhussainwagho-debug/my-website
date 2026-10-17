"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Calculator, CheckCircle2, ChevronRight, Download, FileText, LockKeyhole, ShieldCheck, X } from "lucide-react";
import styles from "./PolicyToolsSection.module.css";

const OFFICIAL_CALCULATOR_URL = "https://statelife.com.pk/en/premium-calculator";
const OFFICIAL_DOWNLOADS_URL = "https://statelife.com.pk/en/page/downloads";
const UNPAID_CLAIMS_URL = "https://statelife.com.pk/en/unpaid_claims";
const APP_STORE_URL = "https://apps.apple.com/us/app/myslic/id6642706192";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.mySlicApp&hl=en";

type PolicyToolsSectionProps = {
  onApplyNow: (policy: string) => void;
};

function CalculatorModal({ onClose, onApplyNow, initialTab }: { onClose: () => void; onApplyNow: (policy: string) => void; initialTab: "life" | "health" }) {
  const [activeTab, setActiveTab] = useState<"life" | "health">(initialTab);
  const [monthlySaving, setMonthlySaving] = useState(10000);
  const [duration, setDuration] = useState(15);
  const [healthTable, setHealthTable] = useState("");
  const [insuredAge, setInsuredAge] = useState("");
  const [planTier, setPlanTier] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const contributionTotal = monthlySaving * 12 * duration;
  const formattedMonthly = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(monthlySaving);
  const formattedTotal = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(contributionTotal);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
  }, [onClose]);

  return createPortal(
    <div
      className={styles.modalOverlay}
      style={{ backdropFilter: "blur(14px) saturate(85%)", WebkitBackdropFilter: "blur(14px) saturate(85%)" }}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div ref={dialogRef} className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="calculator-modal-title">
        <button ref={closeButtonRef} className={styles.closeButton} type="button" aria-label="Close calculator" onClick={onClose}>
          <X size={18} aria-hidden="true" />
        </button>
        <p className={styles.modalEyebrow}>State Life Sukkur 5405</p>
        <h2 id="calculator-modal-title">Planning calculators</h2>
        <div className={styles.tabs} role="tablist" aria-label="Calculator type">
          <button className={activeTab === "life" ? styles.activeTab : styles.tab} type="button" role="tab" aria-selected={activeTab === "life"} onClick={() => setActiveTab("life")}>
            Life &amp; savings
          </button>
          <button className={activeTab === "health" ? styles.activeTab : styles.tab} type="button" role="tab" aria-selected={activeTab === "health"} onClick={() => setActiveTab("health")}>
            Health rate book
          </button>
        </div>

        {activeTab === "life" ? (
          <div className={styles.calculatorPanel} role="tabpanel">
            <p className={styles.panelIntro}>Model a contribution schedule. Maturity values require an official policy illustration.</p>
            <div className={styles.sliderHeader}>
              <label htmlFor="life-monthly-saving">Monthly savings</label>
              <output htmlFor="life-monthly-saving">PKR {formattedMonthly}</output>
            </div>
            <input
              className={styles.slider}
              id="life-monthly-saving"
              type="range"
              min="5000"
              max="100000"
              step="1000"
              value={monthlySaving}
              onChange={(event) => setMonthlySaving(Number(event.target.value))}
              style={{ "--range-progress": `${((monthlySaving - 5000) / 95000) * 100}%` } as React.CSSProperties}
            />
            <div className={styles.rangeLimits}><span>PKR 5,000</span><span>PKR 100,000</span></div>

            <fieldset className={styles.durationFieldset}>
              <legend>Duration</legend>
              <div className={styles.durationOptions}>
                {[10, 15, 20].map((years) => (
                  <button className={duration === years ? styles.durationActive : styles.durationButton} key={years} type="button" aria-pressed={duration === years} onClick={() => setDuration(years)}>
                    {years} years
                  </button>
                ))}
              </div>
            </fieldset>

            <div className={styles.resultBox} aria-live="polite">
              <span>Total scheduled contributions</span>
              <strong>PKR {formattedTotal}</strong>
              <small>Contributions only - not an estimated maturity benefit</small>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.applyButton} type="button" onClick={() => onApplyNow("Savings")}>Apply Now <ChevronRight size={16} aria-hidden="true" /></button>
              <a className={styles.officialLink} href={OFFICIAL_CALCULATOR_URL} target="_blank" rel="noreferrer">Official premium calculator <ArrowUpRight size={14} aria-hidden="true" /></a>
            </div>
          </div>
        ) : (
          <div className={styles.calculatorPanel} role="tabpanel">
            <p className={styles.panelIntro}>Choose a table, insured age, and tier. Exact yearly rates must come from the current official Rate Book.</p>
            <div className={styles.healthFields}>
              <label className={styles.field} htmlFor="health-table">
                <span>Rate Book table</span>
                <select id="health-table" value={healthTable} onChange={(event) => setHealthTable(event.target.value)}>
                  <option value="">Select table</option>
                  {[82, 83, 84, 85, 86].map((table) => <option key={table} value={table}>Table {table}</option>)}
                </select>
              </label>
              <label className={styles.field} htmlFor="health-age">
                <span>Insured age (years)</span>
                <input id="health-age" type="number" min="1" max="120" value={insuredAge} onChange={(event) => setInsuredAge(event.target.value)} placeholder="Enter age" />
              </label>
            </div>
            <fieldset className={styles.tierFieldset}>
              <legend>Plan tier</legend>
              <div className={styles.tierOptions}>
                {["A", "B", "C", "D"].map((tier) => (
                  <button className={planTier === tier ? styles.tierActive : styles.tierButton} key={tier} type="button" aria-pressed={planTier === tier} onClick={() => setPlanTier(tier)}>
                    Plan {tier}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className={styles.rateNotice} role="status">
              <LockKeyhole size={17} aria-hidden="true" />
              <div>
                <strong>Exact premium not available in this preview</strong>
                <p>Tables 82-86 and Plan A-D rates were not present in the official downloads checked. No rate is estimated or invented here.</p>
                {healthTable && insuredAge && planTier && <small>Selected: Table {healthTable} / age {insuredAge} / Plan {planTier}</small>}
              </div>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.applyButton} type="button" onClick={() => onApplyNow("Health Insurance")}>Apply Now <ChevronRight size={16} aria-hidden="true" /></button>
              <a className={styles.officialLink} href={OFFICIAL_CALCULATOR_URL} target="_blank" rel="noreferrer">Use State Life calculator <ArrowUpRight size={14} aria-hidden="true" /></a>
            </div>
            <a className={styles.downloadLink} href={OFFICIAL_DOWNLOADS_URL} target="_blank" rel="noreferrer"><Download size={15} aria-hidden="true" /> Check official downloads for a Rate Book PDF <ArrowUpRight size={13} aria-hidden="true" /></a>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default function PolicyToolsSection({ onApplyNow }: PolicyToolsSectionProps) {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [calculatorTab, setCalculatorTab] = useState<"life" | "health">("life");
  const [policyNumber, setPolicyNumber] = useState("");
  const [showLookupNotice, setShowLookupNotice] = useState(false);

  const openCalculator = (tab: "life" | "health") => {
    setCalculatorTab(tab);
    setCalculatorOpen(true);
  };

  const handlePolicyLookup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowLookupNotice(true);
  };

  return (
    <>
      <section id="policy-tools" className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Private policy tools</p>
            <h2>Track &amp; plan with confidence</h2>
            <p>View private policy details through State Life&apos;s official channels, or explore a contribution schedule with local tools.</p>
          </div>

          <div className={styles.toolsGrid}>
            <article className={styles.toolCard} style={{ backdropFilter: "blur(18px) saturate(120%)", WebkitBackdropFilter: "blur(18px) saturate(120%)" }}>
              <div className={styles.cardHeader}>
                <span className={styles.iconFrame}><ShieldCheck size={18} aria-hidden="true" /></span>
                <span className={styles.liveBadge}><i /> Official account access</span>
              </div>
              <h3>Policy status tracker</h3>
              <p className={styles.cardIntro}>Active status, premium due, and maturity details are personal policy data. This preview does not query or store your policy number.</p>
              <form className={styles.trackerForm} onSubmit={handlePolicyLookup}>
                <label htmlFor="policy-number">Policy number</label>
                <div className={styles.policyInputRow}>
                  <input id="policy-number" inputMode="numeric" autoComplete="off" required value={policyNumber} onChange={(event) => { setPolicyNumber(event.target.value); setShowLookupNotice(false); }} placeholder="Enter policy number" />
                  <button type="submit">Check status <ChevronRight size={15} aria-hidden="true" /></button>
                </div>
              </form>

              {showLookupNotice ? (
                <div className={styles.lookupNotice} role="status">
                  <LockKeyhole size={17} aria-hidden="true" />
                  <p>Live lookup is not connected. Your policy number has not been sent. Use MySLIC to securely view your policy status and due details.</p>
                </div>
              ) : (
                <div className={styles.statusPreview}>
                  <div><span>Maturity date</span><strong>Private account lookup</strong></div>
                  <div><span>Premium due</span><strong>Private account lookup</strong></div>
                  <div><span>Active status</span><strong>Private account lookup</strong></div>
                </div>
              )}

              <div className={styles.appLinks}>
                <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer">MySLIC for Android <ArrowUpRight size={13} aria-hidden="true" /></a>
                <a href={APP_STORE_URL} target="_blank" rel="noreferrer">MySLIC for iPhone <ArrowUpRight size={13} aria-hidden="true" /></a>
                <a href={UNPAID_CLAIMS_URL} target="_blank" rel="noreferrer">Unclaimed maturity search <ArrowUpRight size={13} aria-hidden="true" /></a>
              </div>
            </article>

            <article className={styles.toolCard} style={{ backdropFilter: "blur(18px) saturate(120%)", WebkitBackdropFilter: "blur(18px) saturate(120%)" }}>
              <div className={styles.cardHeader}>
                <span className={styles.iconFrame}><Calculator size={18} aria-hidden="true" /></span>
                <span className={styles.liveBadge}><i /> Life &amp; health planning</span>
              </div>
              <h3>Premium &amp; savings calculators</h3>
              <p className={styles.cardIntro}>Explore a contribution schedule or open a health rate-book selection for official pricing.</p>
              <div className={styles.calculatorOptions}>
                <button type="button" className={styles.calculatorOption} onClick={() => openCalculator("life")}>
                  <span><strong>Life &amp; savings</strong><small>Monthly saving and duration</small></span><ChevronRight size={17} aria-hidden="true" />
                </button>
                <button type="button" className={styles.calculatorOption} onClick={() => openCalculator("health")}>
                  <span><strong>Health rate book</strong><small>Tables 82-86, age and Plan A-D</small></span><ChevronRight size={17} aria-hidden="true" />
                </button>
              </div>
              <button className={styles.openCalculator} type="button" onClick={() => openCalculator(calculatorTab)}>
                Open calculator <ArrowUpRight size={15} aria-hidden="true" />
              </button>
              <p className={styles.sourceNote}><FileText size={13} aria-hidden="true" /> Exact health premiums require the current official Rate Book.</p>
            </article>
          </div>

          <div className={styles.sectionFooter}>
            <span><CheckCircle2 size={15} aria-hidden="true" /> No policy status or maturity benefit is fabricated in this local preview.</span>
            <a href={OFFICIAL_DOWNLOADS_URL} target="_blank" rel="noreferrer">Official State Life downloads <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      {calculatorOpen && <CalculatorModal initialTab={calculatorTab} onClose={() => setCalculatorOpen(false)} onApplyNow={(policy) => { setCalculatorOpen(false); onApplyNow(policy); }} />}
    </>
  );
}