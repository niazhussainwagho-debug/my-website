"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, Calculator, ShieldCheck } from "lucide-react";
import { useState } from "react";
import styles from "./Hero.module.css";

type HeroProps = {
  policyGoals: string[];
  policySearch: string;
  onPolicySearchChange: (value: string) => void;
  policyFilter: string;
  onPolicyFilterChange: (value: string) => void;
  onRequestConsultation: (budget: number) => void;
};

export default function Hero({
  policyGoals,
  policySearch,
  onPolicySearchChange,
  policyFilter,
  onPolicyFilterChange,
  onRequestConsultation,
}: HeroProps) {
  const [monthlySavings, setMonthlySavings] = useState(10000);
  const [tenure, setTenure] = useState(15);
  const contributionTotal = monthlySavings * 12 * tenure;
  const formattedSavings = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(monthlySavings);
  const formattedTotal = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(contributionTotal);

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroImage} aria-hidden="true">
        <Image
          src="/products/family.png"
          alt=""
          fill
          loading="eager"
          priority
          sizes="(max-width: 760px) 100vw, 52vw"
        />
      </div>
      <div className={styles.blueprint} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.heroGrid}>
          <div className={styles.story}>
            <div className={styles.eyebrow}><span /> Bespoke Financial Protection</div>
            <h1>Securing Futures,<br /><span>Building Legacies.</span></h1>
            <p className={styles.intro}>
              Thoughtful protection for the people you love, with long-term guidance from your State Life Sukkur Area Office.
            </p>

            <div className={styles.actions}>
              <a className={styles.primaryAction} href="#policies">
                Explore plans <ArrowRight size={16} aria-hidden="true" />
              </a>
              <button className={styles.secondaryAction} type="button" onClick={() => onRequestConsultation(monthlySavings)}>
                Schedule advisory call <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            </div>

            <div className={styles.trustGrid} aria-label="State Life trust indicators">
              <div className={styles.trustItem}><strong>PKR 10B+</strong><span>Claims settled</span></div>
              <div className={styles.trustItem}><strong>50K+</strong><span>Active families</span></div>
              <div className={styles.trustItem}><strong>A++</strong><span>Financial rating</span></div>
            </div>
          </div>

          <aside id="estimator" className={styles.estimator} aria-labelledby="estimator-title">
            <div className={styles.estimatorTop}>
              <div className={styles.estimatorIcon}><Calculator size={17} aria-hidden="true" /></div>
              <span className={styles.estimatorLabel}>Planning studio <i /></span>
            </div>
            <h2 id="estimator-title">Maturity estimator</h2>
            <p className={styles.estimatorIntro}>Shape a contribution schedule around your plans.</p>

            <div className={styles.rangeHeading}>
              <label htmlFor="monthly-savings">Monthly savings</label>
              <output htmlFor="monthly-savings">PKR {formattedSavings}</output>
            </div>
            <input
              className={styles.range}
              id="monthly-savings"
              type="range"
              min="3000"
              max="100000"
              step="1000"
              value={monthlySavings}
              onChange={(event) => setMonthlySavings(Number(event.target.value))}
              style={{ "--range-progress": `${((monthlySavings - 3000) / 97000) * 100}%` } as React.CSSProperties}
            />
            <div className={styles.rangeLimits}><span>PKR 3,000</span><span>PKR 100,000</span></div>

            <fieldset className={styles.tenureFieldset}>
              <legend>Policy tenure</legend>
              <div className={styles.tenureOptions}>
                {[10, 15, 20].map((years) => (
                  <button
                    className={tenure === years ? styles.tenureActive : styles.tenureButton}
                    key={years}
                    type="button"
                    aria-pressed={tenure === years}
                    onClick={() => setTenure(years)}
                  >
                    {years} years
                  </button>
                ))}
              </div>
            </fieldset>

            <div className={styles.estimateBox} aria-live="polite">
              <span>Scheduled contributions</span>
              <strong>PKR {formattedTotal}</strong>
              <small>Across {tenure} years · contributions only</small>
            </div>

            <button className={styles.quoteAction} type="button" onClick={() => onRequestConsultation(monthlySavings)}>
              Get customized quote <ArrowUpRight size={16} aria-hidden="true" />
            </button>
            <p className={styles.disclaimer}>Illustrative contribution total only. Policy benefits and maturity values depend on the selected plan and official quotation.</p>
          </aside>
        </div>

        <form className={styles.planFinder} action="#policies" onSubmit={(event) => event.preventDefault()}>
          <label className={styles.finderTitle} htmlFor="policy-search"><ShieldCheck size={16} aria-hidden="true" /> Find your plan</label>
          <input
            id="policy-search"
            type="search"
            value={policySearch}
            onChange={(event) => onPolicySearchChange(event.target.value)}
            placeholder="Search by goal or plan"
          />
          <label className={styles.visuallyHidden} htmlFor="policy-filter">Filter plans by goal</label>
          <select id="policy-filter" value={policyFilter} onChange={(event) => onPolicyFilterChange(event.target.value)}>
            <option>All goals</option>
            {policyGoals.map((goal) => <option key={goal}>{goal}</option>)}
          </select>
          <a href="#policies">Browse portfolio <ArrowUpRight size={15} aria-hidden="true" /></a>
        </form>
      </div>
    </section>
  );
}