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
  },
};
