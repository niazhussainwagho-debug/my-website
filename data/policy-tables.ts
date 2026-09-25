export type PolicyTable = {
  number: string;
  title: string;
  summary: string;
  benefits: string[];
  terms: number[];
  eligibility: string;
  ageLimits: string;
  bonus: string;
  choose: string;
};

export const policyTables: PolicyTable[] = [
  {
    number: "01",
    title: "Endowment Assurance",
    summary: "Bachon ki taleem, shadi aur disciplined savings goals ke liye protection-oriented plan category.",
    benefits: [
      "Family protection ke saath planned savings goal par focus.",
      "Maturity planning ko education ya marriage milestone ke saath align karne ki guidance.",
      "Policy documentation aur beneficiary details ko samajhne mein office support.",
    ],
    terms: [10, 15, 20, 25],
    eligibility: "Applicant ki health, income profile aur financial need ki official assessment hoti hai.",
    ageLimits: "Entry age aur maximum maturity age official illustration se confirm karein.",
    bonus: "Participating policy ho to declared bonuses policy rules ke mutabiq add ho sakte hain; exact bonus guaranteed nahi samjha jaye.",
    choose: "Yeh un families ke liye suitable discussion point hai jo protection ke saath education, shadi ya future savings goal plan karna chahti hain.",
  },
  {
    number: "03",
    title: "Whole Life Assurance",
    summary: "Lifetime protection aur family security ke liye long-term assurance category.",
    benefits: [
      "Family financial security aur long-term protection par focus.",
      "Nominee aur beneficiary planning ko clear karne ki guidance.",
      "Long horizon walay customers ke liye structured policy review.",
    ],
    terms: [10, 15, 20, 25],
    eligibility: "Policy approval underwriting, health details aur applicant profile par depend karti hai.",
    ageLimits: "Entry aur maturity age limits applicant ke case aur official product rules se confirm hongi.",
    bonus: "Applicable participating bonuses State Life ke declared rates aur policy terms ke mutabiq ho sakte hain; office se current illustration lein.",
    choose: "Agar aapka primary goal lifetime family protection hai aur aap long-term commitment samajhte hain, is table par consultation lein.",
  },
  {
    number: "08",
    title: "Sadabahar Plan",
    summary: "3-year interval withdrawable liquidity plan ke taur par samjhi jane wali flexible planning category.",
    benefits: [
      "Long-term planning ke saath periodic liquidity needs discuss karne ka option.",
      "Withdrawal timing, conditions aur policy value ko office illustration se samajhne ki sahulat.",
      "Family protection aur access needs ko ek conversation mein review karna.",
    ],
    terms: [10, 15, 20, 25],
    eligibility: "Eligibility, withdrawal conditions aur policy approval official product documents se verify karein.",
    ageLimits: "Entry age, maturity age aur withdrawal eligibility customer profile ke mutabiq confirm hoti hai.",
    bonus: "Bonus/profit declaration aur withdrawal value policy terms, declared rates aur applicable deductions par depend kar sakti hai.",
    choose: "Agar aapko protection ke saath future mein planned liquidity ki zaroorat ho, Table 08 ko representative ke saath compare karein.",
  },
  {
    number: "11",
    title: "Child Education & Marriage Assurance",
    summary: "Aulad ke future education aur marriage milestones ke liye dedicated fund-planning discussion.",
    benefits: [
      "Child ke important future milestones ke liye time-based planning.",
      "Parent/guardian ko nominee aur documentation requirements samajhne ki guidance.",
      "Goal date aur policy duration ko ek structured plan mein map karna.",
    ],
    terms: [10, 15, 20, 25],
    eligibility: "Parent/guardian, child details aur proposed policy purpose official assessment ka hissa ho sakte hain.",
    ageLimits: "Parent/child age criteria aur maturity limits current official rules se confirm karein.",
    bonus: "Participating policy mein declared bonuses apply ho sakte hain; future bonus ya fund value ko guaranteed amount na samjhein.",
    choose: "Parents jo education ya marriage goal ke liye disciplined, long-term preparation chahte hain unke liye yeh useful starting point hai.",
  },
  {
    number: "Health",
    title: "Health Insurance & Group Coverage",
    summary: "Individual, family aur employer group health coverage needs ke liye protection guidance.",
    benefits: [
      "Individual aur family medical cover categories ko compare karne ki guidance.",
      "Organizations ke liye group coverage, member eligibility aur documentation review.",
      "Hospital network, exclusions, waiting periods aur claim process par practical questions.",
    ],
    terms: [1, 3, 5],
    eligibility: "Eligibility age, health disclosure, group size aur selected coverage rules par depend karti hai.",
    ageLimits: "Individual, family aur group plans ki age limits product-specific hoti hain; office se confirm karein.",
    bonus: "Health cover mein bonus/profit structure life participating plans se different hota hai; benefits, limits aur renewals official schedule se verify karein.",
    choose: "Agar aap medical expense risk, family cover ya employee benefit plan kar rahe hain, Health/Group category se start karein.",
  },
];
