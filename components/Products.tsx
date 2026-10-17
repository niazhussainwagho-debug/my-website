"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./Products.module.css";

export type PortfolioCategory = "EDUCATION" | "RETIREMENT" | "MARRIAGE" | "INVESTMENT";

export type HomePolicy = {
  title: string;
  planCategory: string;
  category: string;
  portfolioCategory: PortfolioCategory;
  consultationType: string;
  badge: string;
  coverageType: string;
  description: string;
  image: string;
  alt: string;
};

export const homePolicies: HomePolicy[] = [
  {
    title: "Child Education",
    planCategory: "Child Education",
    category: "Education",
    portfolioCategory: "EDUCATION",
    consultationType: "Child Education",
    badge: "EDUCATION GOAL",
    coverageType: "Education planning",
    description: "Plan ahead for a child's education with guidance on available policy options.",
    image: "/products/education.png",
    alt: "Child learning with books",
  },
  {
    title: "Marriage Planning",
    planCategory: "Life Insurance",
    category: "Family",
    portfolioCategory: "MARRIAGE",
    consultationType: "Marriage Endowment",
    badge: "FAMILY MILESTONE",
    coverageType: "Family protection",
    description: "Explore protection options for the milestones that matter to your family.",
    image: "/products/family.png",
    alt: "Family planning for future milestones",
  },
  {
    title: "Retirement",
    planCategory: "Retirement",
    category: "Future",
    portfolioCategory: "RETIREMENT",
    consultationType: "Retirement Plan",
    badge: "FUTURE PLANNING",
    coverageType: "Retirement planning",
    description: "Review retirement options in the context of your long-term goals.",
    image: "/products/retirement.png",
    alt: "Couple planning for retirement",
  },
  {
    title: "Wealth Growth",
    planCategory: "Life Insurance",
    category: "Investment",
    portfolioCategory: "INVESTMENT",
    consultationType: "Wealth Growth",
    badge: "LONG-TERM OPTIONS",
    coverageType: "Life protection",
    description: "Discuss policy options for longer-term financial goals with a local adviser.",
    image: "/products/life.png",
    alt: "Family considering long-term financial protection",
  },
];

type ProductsProps = {
  policies: HomePolicy[];
  onRequestConsultation: (policy: HomePolicy) => void;
};

const categories = ["ALL", "EDUCATION", "RETIREMENT", "MARRIAGE", "INVESTMENT"] as const;

export default function Products({ policies, onRequestConsultation }: ProductsProps) {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("ALL");
  const visiblePolicies = policies.filter((policy) => activeCategory === "ALL" || policy.portfolioCategory === activeCategory);

  return (
    <section id="policies" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headingRow}>
          <div>
            <p className={styles.eyebrow}>Curated insurance plans</p>
            <h2>Featured Policy Portfolio</h2>
          </div>
          <p className={styles.headingNote}>Thoughtful cover, shaped around the milestones ahead.</p>
        </div>

        <div className={styles.filters} role="tablist" aria-label="Filter policy portfolio">
          {categories.map((category) => (
            <button
              className={activeCategory === category ? styles.filterActive : styles.filter}
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {visiblePolicies.length > 0 ? (
          <div className={styles.grid} role="tabpanel" aria-live="polite">
            {visiblePolicies.map((policy) => (
              <article
                className={styles.card}
                key={policy.title}
                style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
              >
                <div className={styles.imageFrame}>
                  <Image src={policy.image} alt={policy.alt} fill sizes="(max-width: 680px) 100vw, (max-width: 1024px) 50vw, 33vw" className={styles.image} />
                  <span className={styles.badge}>{policy.badge}</span>
                  <span className={styles.cardNumber}>{String(homePolicies.indexOf(policy) + 1).padStart(2, "0")}</span>
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.category}>{policy.category}</span>
                  <h3>{policy.title}</h3>
                  <p className={styles.description}>{policy.description}</p>

                  <dl className={styles.specs}>
                    <div><dt>Minimum tenure</dt><dd>Confirm with office</dd></div>
                    <div><dt>Bonus / returns</dt><dd>Policy-specific</dd></div>
                    <div><dt>Coverage type</dt><dd>{policy.coverageType}</dd></div>
                  </dl>

                  <button className={styles.cardAction} type="button" onClick={() => onRequestConsultation(policy)}>
                    View plan details <ArrowUpRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState} role="tabpanel" aria-live="polite">
            <p>No plans match this category and search. Choose another category or update your plan search.</p>
          </div>
        )}

        <p className={styles.disclaimer}>Tenure, eligibility, bonuses, and policy values vary by product. Confirm current details with Sukkur Area Office 5405.</p>
      </div>
    </section>
  );
}