export type ProductAction = "modal" | "health" | "corporate" | "digital";

export type Product = {
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  action: ProductAction;
};

export const products: Product[] = [
  {
    slug: "life-insurance",
    title: "Life Insurance",
    description: "Zindagi ke utaar chadhao mein apne ghar walon ko maali sahara dene ki soch. Sahi plan chunne mein hum aap ki rehnumai karte hain.",
    image: "/products/life.jpg",
    alt: "Khush family ghar mein",
    action: "modal",
  },
  {
    slug: "health-insurance",
    title: "Health Insurance",
    description: "Achanak bimari ka kharcha budget hila deta hai. Apne aur family ke liye munasib cover samajhne mein madad lein.",
    image: "/products/health.jpg",
    alt: "Family ki sehat ki planning",
    action: "health",
  },
  {
    slug: "takaful",
    title: "Takaful",
    description: "Sharia ke usoolon ke mutabiq mehfooz mustaqbil chahne walon ke liye options ki wazahat.",
    image: "/products/takaful.jpg",
    alt: "Mil kar mashwara karte log",
    action: "modal",
  },
  {
    slug: "family-protection",
    title: "Family Protection",
    description: "Kamane wale ke baad bhi ghar ka chulha jalta rahe, iski planning ka aasan tareeqa.",
    image: "/products/family.jpg",
    alt: "Walidain aur bache",
    action: "modal",
  },
  {
    slug: "retirement",
    title: "Retirement",
    description: "Aaj chhoti chhoti bachat, kal be-fikr budhapa. Apni umar aur zaroorat ke mutabiq mansooba banayein.",
    image: "/products/retirement.jpg",
    alt: "Sukoon se retire hone wala jora",
    action: "modal",
  },
  {
    slug: "child-education",
    title: "Child Education",
    description: "Bachon ki taleem aur bade khwabon ke liye pehle se tayyari. Sahi waqt par shuruat mein rehnumai.",
    image: "/products/education.jpg",
    alt: "Bacha kitaabon ke saath",
    action: "modal",
  },
  {
    slug: "corporate-plans",
    title: "Corporate Plans",
    description: "Apne idare ke mulazimeen ki sehat aur hifazat ke liye group cover ke baare mein mashwara.",
    image: "/products/corporate.jpg",
    alt: "Office mein kaam karta team",
    action: "corporate",
  },
  {
    slug: "digital-services",
    title: "Digital Services",
    description: "Online policy services aur maloomat ke liye official State Life website dekhein.",
    image: "/products/digital.jpg",
    alt: "Laptop par online services",
    action: "digital",
  },
];
