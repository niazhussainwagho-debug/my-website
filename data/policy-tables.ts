export type PolicyCategory = "popular" | "child" | "special";

export type PolicyTable = {
  category: PolicyCategory;
  number: string;
  title: string;
  purpose: string;
  eligibility: string;
  ageLimits: string;
  terms: number[];
  payout: string;
  benefits: string[];
};

export const policyTables: PolicyTable[] = [
  {
    category: "popular",
    number: "01",
    title: "Endowment Assurance",
    purpose: "Bachon ki taleem, shadi aur disciplined savings goals.",
    eligibility: "Health, income profile aur financial need ki official assessment.",
    ageLimits: "Entry aur maturity age official illustration se confirm karein.",
    terms: [10, 15, 20, 25],
    payout: "Protection ke saath planned maturity benefit; exact illustration office se lein.",
    benefits: ["Family protection", "Goal-based savings", "Education aur marriage planning"],
  },
  {
    category: "popular",
    number: "03",
    title: "Whole Life Assurance",
    purpose: "Lifetime protection aur family security.",
    eligibility: "Underwriting, health details aur applicant profile par depend.",
    ageLimits: "Entry aur maturity limits current product rules se confirm hongi.",
    terms: [10, 15, 20, 25],
    payout: "Long-term protection value aur applicable declared bonuses; fixed amount assume na karein.",
    benefits: ["Long-term family cover", "Nominee planning", "Structured policy review"],
  },
  {
    category: "popular",
    number: "08",
    title: "Sadabahar Plan",
    purpose: "3-year interval withdrawable liquidity planning.",
    eligibility: "Withdrawal conditions aur approval official product documents se verify karein.",
    ageLimits: "Entry age, maturity age aur withdrawal eligibility profile ke mutabiq.",
    terms: [10, 15, 20, 25],
    payout: "Periodic liquidity option policy terms, declared rates aur applicable conditions par depend.",
    benefits: ["Planned liquidity", "Protection discussion", "Periodic access needs review"],
  },
  {
    category: "popular",
    number: "14",
    title: "Family Protection Assurance",
    purpose: "Household income protection aur dependents ki security.",
    eligibility: "Applicant ki health, family need aur policy assessment ke mutabiq.",
    ageLimits: "Entry aur maximum maturity age office se confirm karein.",
    terms: [10, 15, 20, 25],
    payout: "Family protection benefit aur applicable policy values official illustration par depend.",
    benefits: ["Dependents support", "Family risk planning", "Beneficiary guidance"],
  },
  {
    category: "child",
    number: "11",
    title: "Child Education & Marriage Assurance",
    purpose: "Aulad ke education aur marriage milestones ke liye fund planning.",
    eligibility: "Parent/guardian, child details aur proposed goal ki assessment.",
    ageLimits: "Parent/child age criteria current official rules se confirm karein.",
    terms: [10, 15, 20, 25],
    payout: "Goal-date planning aur applicable maturity benefits; exact fund value guaranteed na samjhein.",
    benefits: ["Education planning", "Marriage milestone", "Goal-date mapping"],
  },
  {
    category: "child",
    number: "12",
    title: "Child Future Assurance",
    purpose: "Child ke long-term education aur future security goals.",
    eligibility: "Guardian details, child information aur underwriting requirements apply.",
    ageLimits: "Child age aur maturity limit official product sheet se confirm karein.",
    terms: [10, 15, 20, 25],
    payout: "Future goal ke liye planned maturity structure; official illustration zaroor lein.",
    benefits: ["Early planning", "Guardian-led protection", "Flexible goal discussion"],
  },
  {
    category: "child",
    number: "36",
    title: "Education Support Plan",
    purpose: "Higher education aur family education commitments ke liye planning.",
    eligibility: "Family profile, health disclosure aur policy purpose ki review.",
    ageLimits: "Entry age aur maturity age case-by-case confirm hoti hai.",
    terms: [10, 15, 20, 25],
    payout: "Education goal ke liye applicable policy benefit; terms aur bonus office se verify karein.",
    benefits: ["Education focus", "Long-term discipline", "Milestone planning"],
  },
  {
    category: "special",
    number: "05",
    title: "Anticipated Endowment",
    purpose: "Long-term protection ke saath scheduled benefit planning.",
    eligibility: "Health, age, income aur official underwriting assessment.",
    ageLimits: "Product-specific entry aur maturity limits confirm karein.",
    terms: [10, 15, 20, 25],
    payout: "Scheduled benefit structure policy terms aur official illustration par depend.",
    benefits: ["Planned benefits", "Family protection", "Long-term goal review"],
  },
  {
    category: "special",
    number: "22",
    title: "Retirement & Savings Plan",
    purpose: "Retirement readiness aur long-term financial stability.",
    eligibility: "Age, income, target retirement horizon aur policy assessment.",
    ageLimits: "Entry age aur retirement/maturity limits office se confirm karein.",
    terms: [10, 15, 20, 25],
    payout: "Retirement planning illustration; returns ya bonus fixed/guaranteed assume na karein.",
    benefits: ["Retirement horizon", "Savings discipline", "Family continuity planning"],
  },
  {
    category: "special",
    number: "70+",
    title: "Special & Retirement Options",
    purpose: "Special needs, retirement aur extended financial planning categories.",
    eligibility: "Product availability, health, age aur financial objective ke mutabiq.",
    ageLimits: "Exact age criteria aur availability office se confirm karein.",
    terms: [10, 15, 20],
    payout: "Applicable policy benefit, bonus aur maturity terms official quote se confirm honge.",
    benefits: ["Specialist consultation", "Retirement review", "Needs-based comparison"],
  },
];
