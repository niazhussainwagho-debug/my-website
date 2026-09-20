export type Plan = {
  type: string;
  name: string;
  bestFor: string;
  term: string;
  ageLimit: string;
  details: string;
};

// Sample plan names placeholder hain; inhein official source se verify karna hai before live deployment.
export const plans: Plan[] = [
  {
    type: "Life Insurance",
    name: "Secure Future Plan",
    bestFor: "Family breadwinner",
    term: "Office se confirm karein",
    ageLimit: "Office se confirm karein",
    details: "Long-term financial protection ke liye flexible coverage option. Office se confirm karein.",
  },
  {
    type: "Life Insurance",
    name: "Family Shield Plan",
    bestFor: "Dependents ke sath family",
    term: "Office se confirm karein",
    ageLimit: "Office se confirm karein",
    details: "Family security aur peace of mind ke liye suitable option. Office se confirm karein.",
  },
  {
    type: "Health",
    name: "Care Plus Plan",
    bestFor: "Medical support needs",
    term: "Office se confirm karein",
    ageLimit: "Office se confirm karein",
    details: "Health-related uncertainty ke liye guidance aur plan details office se confirm karien.",
  },
  {
    type: "Health",
    name: "Emergency Support Plan",
    bestFor: "Unexpected medical expenses",
    term: "Office se confirm karein",
    ageLimit: "Office se confirm karein",
    details: "Quick assistance aur practical support options ke liye office se confirm karein.",
  },
  {
    type: "Takaful",
    name: "Takaful Care Basic",
    bestFor: "Faith-conscious protection",
    term: "Office se confirm karein",
    ageLimit: "Office se confirm karein",
    details: "Sharia-compliant protection approach ke liye suitable option. Office se confirm karein.",
  },
  {
    type: "Takaful",
    name: "Takaful Family Secure",
    bestFor: "Family-focused long-term care",
    term: "Office se confirm karein",
    ageLimit: "Office se confirm karein",
    details: "Family protection aur ethical coverage options. Office se confirm karein.",
  },
  {
    type: "Family Protection",
    name: "Family Protector",
    bestFor: "Household protection",
    term: "Office se confirm karein",
    ageLimit: "Office se confirm karein",
    details: "Family members ko extended support ke liye suitable option. Office se confirm karein.",
  },
  {
    type: "Family Protection",
    name: "Secure Household Plan",
    bestFor: "Joint family setup",
    term: "Office se confirm karein",
    ageLimit: "Office se confirm karein",
    details: "Household-level protection ke liye flexible plan guidance. Office se confirm karein.",
  },
  {
    type: "Retirement",
    name: "Retirement Builder",
    bestFor: "Future financial stability",
    term: "Office se confirm karein",
    ageLimit: "Office se confirm karein",
    details: "Retirement goals ke liye strategic planning aur guidance. Office se confirm karein.",
  },
  {
    type: "Retirement",
    name: "Golden Years Plan",
    bestFor: "Long-term planning",
    term: "Office se confirm karein",
    ageLimit: "Office se confirm karein",
    details: "Future peace aur stability ke liye suitable retirement planning. Office se confirm karein.",
  },
  {
    type: "Child Education",
    name: "Education Dream Plan",
    bestFor: "Future education goals",
    term: "Office se confirm karein",
    ageLimit: "Office se confirm karein",
    details: "Bachon ki education aur future dreams ke liye appropriate planning. Office se confirm karein.",
  },
  {
    type: "Child Education",
    name: "Future Scholar Plan",
    bestFor: "Education savings planning",
    term: "Office se confirm karein",
    ageLimit: "Office se confirm karein",
    details: "Education-focused long-term support plan. Office se confirm karein.",
  },
];
