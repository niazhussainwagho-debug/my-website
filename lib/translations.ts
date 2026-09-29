export type Language = "en" | "ur" | "sd";

export interface TranslationDictionary {
  // Brand & Header
  brandArea: string;
  brandCompany: string;
  brandSub: string;

  // Nav links
  navHome: string;
  navProducts: string;
  navServices: string;
  navAbout: string;
  navContact: string;
  navJoin: string;
  navQuoteBtn: string;
  callOffice: string;
  chatWhatsapp: string;

  // Hero Section
  heroBadge: string;
  heroPhrases: string[];
  heroSubtitle: string;
  heroConsultBtn: string;
  heroWhatsappBtn: string;
  heroSearchLabel: string;
  heroSearchPlaceholder: string;
  heroFilterLabel: string;
  heroFilterAll: string;
  heroFilterEducation: string;
  heroFilterMarriage: string;
  heroFilterRetirement: string;
  heroFilterHealth: string;
  heroExploreBtn: string;
  heroPillGovt: string;
  heroPillPolicies: string;
  heroPillClaims: string;

  // Overview Statistics
  statsPolicies: string;
  statsSecurity: string;
  statsClaims: string;
  statsSupport: string;

  // Milestones / Protection Section
  milestonesTag: string;
  milestonesHeading: string;
  allProductsBtn: string;
  learnMoreBtn: string;

  // Products Carousel
  productsTag: string;
  productsHeading: string;
  officialWebsiteBtn: string;

  // Services & Process Steps
  servicesTag: string;
  servicesHeading: string;
  servicesSubtitle: string;

  // About Section
  aboutTag: string;
  aboutHeading: string;
  aboutSubtitle: string;
  aboutAddress: string;
  aboutHours: string;
  getDirections: string;
  deskActive: string;

  // Testimonials
  reviewsTag: string;
  reviewsHeading: string;

  // Consultation & Contact Form
  formHeading: string;
  formSubtitle: string;
  formName: string;
  formPhone: string;
  formCity: string;
  formAge: string;
  formPlan: string;
  formMessage: string;
  formSubmit: string;
  formConsent: string;

  // Footer
  footerAbout: string;
  footerExplore: string;
  footerContact: string;
  footerDisclaimer: string;

  // Subpage Hero
  subpageAreaOffice: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    brandArea: "Sukkur Area Office 5405",
    brandCompany: "State Life Insurance",
    brandSub: "Corporation of Pakistan",

    navHome: "Home",
    navProducts: "Products",
    navServices: "Services",
    navAbout: "About Us",
    navContact: "Contact",
    navJoin: "Join Us",
    navQuoteBtn: "Get Policy Quote",
    callOffice: "Call Office",
    chatWhatsapp: "WhatsApp",

    heroBadge: "SUKKUR AREA OFFICE 5405",
    heroPhrases: [
      "Securing Your Family's Future with Confidence",
      "Savings for Children's Education and Marriage",
      "Complete Retirement & Health Protection Plans",
    ],
    heroSubtitle:
      "Understand State Life insurance plans for your family's future, and get expert guidance from our local Sukkur team.",
    heroConsultBtn: "Free Consultation",
    heroWhatsappBtn: "WhatsApp Us",
    heroSearchLabel: "Search Policy Goal",
    heroSearchPlaceholder: "Search education, health, family...",
    heroFilterLabel: "Choose Category",
    heroFilterAll: "All goals",
    heroFilterEducation: "Child Education",
    heroFilterMarriage: "Marriage Planning",
    heroFilterRetirement: "Retirement",
    heroFilterHealth: "Health Protection",
    heroExploreBtn: "Explore Plans",
    heroPillGovt: "100% Federal Govt. Guarantee",
    heroPillPolicies: "5,000+ Sukkur Policies",
    heroPillClaims: "Fast Claims Assistance",

    statsPolicies: "Active Sukkur Policies",
    statsSecurity: "State-Backed Security",
    statsClaims: "Claims Facilitated",
    statsSupport: "Area Office Support Desk",

    milestonesTag: "Plans for life's milestones",
    milestonesHeading: "Protection for what matters",
    allProductsBtn: "All products",
    learnMoreBtn: "Learn More",

    productsTag: "More ways to plan",
    productsHeading: "Explore all coverage options",
    officialWebsiteBtn: "Official website",

    servicesTag: "From first question to ongoing care",
    servicesHeading: "Support at every step",
    servicesSubtitle:
      "Clear local guidance for policy services, claims, and health support. Open a step to see where to start.",

    aboutTag: "Your local point of contact",
    aboutHeading: "Personal guidance, right here in Sukkur",
    aboutSubtitle:
      "Meet the Area Office team for policy questions, documentation guidance, and in-person assistance.",
    aboutAddress: "Shahlimar Road, near Session Court, Sukkur",
    aboutHours: "Monday to Friday, 9:00 AM to 5:00 PM",
    getDirections: "Get directions",
    deskActive: "Sukkur Area Desk Active",

    reviewsTag: "Client Experiences",
    reviewsHeading: "Trusted by Sukkur families",

    formHeading: "Get a Personalised Policy Quote",
    formSubtitle:
      "Leave your details and our Sukkur team will guide you on the best plan options.",
    formName: "Full Name",
    formPhone: "Phone Number",
    formCity: "City",
    formAge: "Age",
    formPlan: "Interested Plan",
    formMessage: "Message (Optional)",
    formSubmit: "Submit Enquiry",
    formConsent: "I agree to receive guidance from Sukkur Area Office.",

    footerAbout:
      "Local policy guidance and in-person support for families in Sukkur.",
    footerExplore: "Explore",
    footerContact: "Contact Office",
    footerDisclaimer:
      "This website is managed by Sukkur Area Office 5405. For official central services, visit statelife.com.pk",

    subpageAreaOffice: "SUKKUR AREA OFFICE 5405",
  },

  ur: {
    brandArea: "سکھر ایریا آفس 5405",
    brandCompany: "اسٹیٹ لائف انشورنس",
    brandSub: "کارپوریشن آف پاکستان",

    navHome: "ہوم",
    navProducts: "پروڈکٹس",
    navServices: "سروسز",
    navAbout: "ہمارے بارے میں",
    navContact: "رابطہ",
    navJoin: "ہم سے جڑیں",
    navQuoteBtn: "پالیسی کوٹیشن لیں",
    callOffice: "کال آفس",
    chatWhatsapp: "واٹس ایپ",

    heroBadge: "سکھر ایریا آفس 5405",
    heroPhrases: [
      "آپ کی فیملی کا مستقبل محفوظ اور پُراعتماد",
      "بچوں کی تعلیم اور شادی کے لیے محفوظ بچت",
      "ریٹائرمنٹ اور صحت کی مکمل پروٹیکشن",
    ],
    heroSubtitle:
      "اپنی فیملی کے مستقبل کے لیے اسٹیٹ لائف کے بہترین منصوبے سمجھیں، اور ہماری سکھر ٹیم سے مفت اور ماہرانہ رہنمائی حاصل کریں۔",
    heroConsultBtn: "مفت مشورہ حاصل کریں",
    heroWhatsappBtn: "واٹس ایپ پر رابطہ",
    heroSearchLabel: "پالیسی کا مقصد تلاش کریں",
    heroSearchPlaceholder: "تعلیم، صحت، فیملی پروٹیکشن...",
    heroFilterLabel: "کیٹیگری منتخب کریں",
    heroFilterAll: "تمام منصوبے",
    heroFilterEducation: "بچوں کی تعلیم",
    heroFilterMarriage: "شادی پلاننگ",
    heroFilterRetirement: "ریٹائرمنٹ",
    heroFilterHealth: "صحت پروٹیکشن",
    heroExploreBtn: "منصوبے دیکھیں",
    heroPillGovt: "100% وفاقی حکومتی گارنٹی",
    heroPillPolicies: "5,000+ سکھر پالیسیز",
    heroPillClaims: "فوری کلیمز سہولت",

    statsPolicies: "فعال سکھر پالیسیاں",
    statsSecurity: "حکومتی گارنٹی تحفظ",
    statsClaims: "کلیمز سہولت",
    statsSupport: "ایریا آفس سپورٹ ڈیسک",

    milestonesTag: "زندگی کے اہم سنگ میل کے منصوبے",
    milestonesHeading: "جس کی آپ کو قدر ہے، اس کا تحفظ",
    allProductsBtn: "تمام پراڈکٹس",
    learnMoreBtn: "مزید جانیں",

    productsTag: "منصوبہ بندی کے مزید طریقے",
    productsHeading: "تمام انشورنس آپشنز دیکھیں",
    officialWebsiteBtn: "سرکاری ویب سائٹ",

    servicesTag: "پہلے سوال سے لے کر مسلسل رہنمائی تک",
    servicesHeading: "ہر قدم پر مکمل رہنمائی",
    servicesSubtitle:
      "پالیسی سروسز، کلیمز اور صحت سہولیات کے لیے مقامی رہنمائی۔ جاننے کے لیے مرحلہ کھولیں۔",

    aboutTag: "آپ کا مقامی رابطہ مرکز",
    aboutHeading: "سکھر میں ذاتی اور براہِ راست رہنمائی",
    aboutSubtitle:
      "پالیسی کے سوالات، کاغذی کارروائی اور بالمشافہ رہنمائی کے لیے ایریا آفس ٹیم سے ملیں۔",
    aboutAddress: "شالیمار روڈ، نزد سیشن کورٹ، سکھر",
    aboutHours: "پیر تا جمعہ، صبح 9:00 تا شام 5:00",
    getDirections: "راستہ دیکھیں",
    deskActive: "سکھر ایریا ڈیسک فعال",

    reviewsTag: "صارفین کے تاثرات",
    reviewsHeading: "سکھر کی فیملیز کا قابل اعتماد انتخاب",

    formHeading: "ذاتی پالیسی کوٹیشن حاصل کریں",
    formSubtitle:
      "اپنی معلومات درج کریں، ہماری سکھر ٹیم آپ کو بہترین منصوبے کی رہنمائی فراہم کرے گی۔",
    formName: "پورا نام",
    formPhone: "فون نمبر",
    formCity: "شہر",
    formAge: "عمر",
    formPlan: "مطلوبہ منصوبہ",
    formMessage: "پیغام (اختیاری)",
    formSubmit: "درخواست جمع کروائیں",
    formConsent: "میں سکھر ایریا آفس سے رہنمائی حاصل کرنے پر رضامند ہوں۔",

    footerAbout:
      "سکھر میں فیملیز کے لیے مقامی پالیسی رہنمائی اور بالمشافہ سپورٹ۔",
    footerExplore: "منصوبے اور معلومات",
    footerContact: "دفتر سے رابطہ",
    footerDisclaimer:
      "یہ ویب سائٹ سکھر ایریا آفس 5405 کے زیر انتظام ہے۔ مرکزی خدمات کے لیے statelife.com.pk وزٹ کریں۔",

    subpageAreaOffice: "سکھر ایریا آفس 5405",
  },

  sd: {
    brandArea: "سکر ايريا آفيس 5405",
    brandCompany: "اسٽيٽ لائيف انشورنس",
    brandSub: "ڪارپوريشن آف پاڪستان",

    navHome: "هوم",
    navProducts: "پراڊڪٽس",
    navServices: "سروسز",
    navAbout: "اسان بابت",
    navContact: "رابطو",
    navJoin: "اسان سان شامل ٿيو",
    navQuoteBtn: "پاليسي ڪوٽيشن وٺو",
    callOffice: "آفيس ڪال",
    chatWhatsapp: "واٽس ايپ",

    heroBadge: "سکر ايريا آفيس 5405",
    heroPhrases: [
      "توهان جي خاندان جو مستقبل محفوظ ۽ پُراعتماد",
      "ٻارن جي تعليم ۽ شاديءَ لاءِ محفوظ بچت",
      "رٽائرمنٽ ۽ صحت جي مڪمل تحفظ وارا منصوبا",
    ],
    heroSubtitle:
      "پنهنجي ڪٽنب جي محفوظ سڀاڻي لاءِ اسٽيٽ لائيف منصوبا سمجھو، ۽ اسان جي سکر ٽيم کان ماهرانه رهنمائي حاصل ڪريو.",
    heroConsultBtn: "مفت صلاح مشورو",
    heroWhatsappBtn: "واٽس ايپ تي رابطو",
    heroSearchLabel: "پاليسي مقصد ڳوليو",
    heroSearchPlaceholder: "تعليم، صحت، خاندان...",
    heroFilterLabel: "ڪيٽيگري چونڊيو",
    heroFilterAll: "سڀ مقصد",
    heroFilterEducation: "ٻارن جي تعليم",
    heroFilterMarriage: "شادي پلاننگ",
    heroFilterRetirement: "رٽائرمنٽ",
    heroFilterHealth: "صحت تحفظ",
    heroExploreBtn: "منصوبا ڏسو",
    heroPillGovt: "100% وفاقي حڪومتي گارنٽي",
    heroPillPolicies: "5,000+ سکر پاليسيون",
    heroPillClaims: "تيز ترين ڪليمز سهولت",

    statsPolicies: "فعال سکر پاليسيون",
    statsSecurity: "حڪومتي گارنٽي تحفظ",
    statsClaims: "ڪليمز سهولت",
    statsSupport: "ايريا آفيس سپورٽ ڊيسڪ",

    milestonesTag: "زندگي جي اهم سنگ ميل جا منصوبا",
    milestonesHeading: "جنهن جو توهان کي قدر آهي، ان جو تحفظ",
    allProductsBtn: "سڀ پراڊڪٽس",
    learnMoreBtn: "وڌيڪ ڄاڻو",

    productsTag: "منصوبه بندي جا وڌيڪ طريقا",
    productsHeading: "سڀ انشورنس آپشنز ڏسو",
    officialWebsiteBtn: "سرڪاري ويب سائيٽ",

    servicesTag: "پهرئين سوال کان مسلسل رهنمائي تائين",
    servicesHeading: "هر قدم تي مڪمل سهڪار",
    servicesSubtitle:
      "پاليسي سروسز، ڪليمز ۽ صحت سهولتن لاءِ مڪاني رهنمائي. ڄاڻڻ لاءِ قدم کولي ڏسو.",

    aboutTag: "توهان جو مڪاني رابطو مرڪز",
    aboutHeading: "سکر ۾ ذاتي ۽ سڌي رهنمائي",
    aboutSubtitle:
      "پاليسي سوالن، دستاويز رهنمائي ۽ روبرو مدد لاءِ ايريا آفيس ٽيم سان ملو.",
    aboutAddress: "شاليمار روڊ، ويجهو سيشن ڪورٽ، سکر",
    aboutHours: "سومر کان جمعو، صبح 9:00 کان شام 5:00",
    getDirections: "رستو ڏسو",
    deskActive: "سکر ايريا ڊيسڪ فعال",

    reviewsTag: "صارفين جا تاثرات",
    reviewsHeading: "سکر جي خاندانن جو ڀروسو",

    formHeading: "پنهنجي پاليسي ڪوٽيشن وٺو",
    formSubtitle:
      "پنهنجي معلومات داخل ڪريو، اسان جي سکر ٽيم توهان کي بهترين منصوبي جي رهنمائي ڪندي.",
    formName: "پورو نالو",
    formPhone: "فون نمبر",
    formCity: "شهر",
    formAge: "عمر",
    formPlan: "گهربل منصوبو",
    formMessage: "پيغام (اختياري)",
    formSubmit: "درخواست جمع ڪرايو",
    formConsent: "مان سکر ايريا آفيس مان رهنمائي حاصل ڪرڻ لاءِ راضي آهيان.",

    footerAbout:
      "سکر ۾ خاندانن لاءِ مڪاني پاليسي رهنمائي ۽ سڌي مدد.",
    footerExplore: "منصوبا ۽ ڄاڻ",
    footerContact: "آفيس سان رابطو",
    footerDisclaimer:
      "هي ويب سائيٽ سکر ايريا آفيس 5405 جي انتظام هيٺ آهي. مکيه پورٽل لاءِ statelife.com.pk وزٽ ڪريو.",

    subpageAreaOffice: "سکر ايريا آفيس 5405",
  },
};
