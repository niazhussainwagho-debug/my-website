export type ProductAction = "modal" | "health" | "corporate" | "digital";

export type Product = {
  slug: string;
  title: string;
  description: string;
  image: string | null;
  alt: string;
  imagePosition: string;
  action: ProductAction;
};

export const products: Product[] = [
  {
    slug: "life-insurance",
    title: "Life Insurance",
    description: "Zindagi ke utaar chadhao mein apne ghar walon ko maali sahara dene ki soch. Sahi plan chunne mein hum aap ki rehnumai karte hain.",
    image: "/products/life.png",
    alt: "Khush family ghar mein",
    imagePosition: "center",
    action: "modal",
  },
  {
    slug: "health-insurance",
    title: "Health Insurance",
    description: "Achanak bimari ka kharcha budget hila deta hai. Apne aur family ke liye munasib cover samajhne mein madad lein.",
    image: "/products/health.png",
    alt: "Family ki sehat ki planning",
    imagePosition: "center",
    action: "health",
  },
  {
    slug: "takaful",
    title: "Takaful",
    description: "Sharia ke usoolon ke mutabiq mehfooz mustaqbil chahne walon ke liye options ki wazahat.",
    image: "/products/takaful.png",
    alt: "Mil kar mashwara karte log",
    imagePosition: "center",
    action: "modal",
  },
  {
    slug: "family-protection",
    title: "Family Protection",
    description: "Kamane wale ke baad bhi ghar ka chulha jalta rahe, iski planning ka aasan tareeqa.",
    image: "/products/family.png",
    alt: "Walidain aur bache",
    imagePosition: "center",
    action: "modal",
  },
  {
    slug: "retirement",
    title: "Retirement",
    description: "Aaj chhoti chhoti bachat, kal be-fikr budhapa. Apni umar aur zaroorat ke mutabiq mansooba banayein.",
    image: "/products/retirement.png",
    alt: "Sukoon se retire hone wala jora",
    imagePosition: "center",
    action: "modal",
  },
  {
    slug: "child-education",
    title: "Child Education",
    description: "Bachon ki taleem aur bade khwabon ke liye pehle se tayyari. Sahi waqt par shuruat mein rehnumai.",
    image: "/products/education.png",
    alt: "Bacha kitaabon ke saath",
    imagePosition: "center",
    action: "modal",
  },
  {
    slug: "corporate-plans",
    title: "Corporate Plans",
    description: "Apne idare ke mulazimeen ki sehat aur hifazat ke liye group cover ke baare mein mashwara.",
    image: "/products/corporate.png",
    alt: "Office mein kaam karta team",
    imagePosition: "center",
    action: "corporate",
  },
  {
    slug: "digital-services",
    title: "Digital Services",
    description: "Online policy services aur maloomat ke liye official State Life website dekhein.",
    image: "/products/digital.png",
    alt: "Laptop par online services",
    imagePosition: "center",
    action: "digital",
  },
];
