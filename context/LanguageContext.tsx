'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type Language = 'EN' | 'UR';

type TranslationKey =
  | 'nav.home' | 'nav.products' | 'nav.services' | 'nav.about' | 'nav.contact' | 'nav.join'
  | 'utility.call' | 'utility.whatsapp' | 'utility.quote' | 'utility.toggle'
  | 'blueBar.en' | 'blueBar.ur'
  | 'home.eyebrow' | 'home.title' | 'home.subtitle' | 'home.consultation' | 'home.whatsapp'
  | 'products.eyebrow' | 'products.title' | 'products.subtitle' | 'products.compare' | 'products.contact'
  | 'products.tab.popular' | 'products.tab.child' | 'products.tab.special' | 'products.guideEyebrow' | 'products.guideTitle' | 'products.applyTable' | 'products.suitable' | 'products.eligibility' | 'products.terms' | 'products.payout' | 'products.estimate'
  | 'table.01.title' | 'table.03.title' | 'table.08.title' | 'table.14.title' | 'table.11.title' | 'table.12.title' | 'table.36.title' | 'table.05.title' | 'table.22.title' | 'table.70.title'
  | 'services.eyebrow' | 'services.title' | 'services.subtitle' | 'services.support' | 'services.request' | 'services.tables'
  | 'about.eyebrow' | 'about.title' | 'about.subtitle' | 'about.consultation' | 'about.whatsapp' | 'about.leadership' | 'about.values' | 'about.contact'
  | 'contact.eyebrow' | 'contact.title' | 'contact.subtitle' | 'contact.submit' | 'contact.sending' | 'contact.whatsapp' | 'contact.call'
  | 'join.eyebrow' | 'join.title' | 'join.subtitle' | 'join.form' | 'join.whatsapp'
  | 'checkout.eyebrow' | 'checkout.title' | 'checkout.subtitle' | 'checkout.backPlans' | 'checkout.backServices'
  | 'footer.office' | 'footer.contact';

type TranslationDictionary = Record<TranslationKey, string>;

const translations: Record<Language, TranslationDictionary> = {
  EN: {
    'nav.home': 'Home', 'nav.products': 'Products', 'nav.services': 'Services', 'nav.about': 'About Us', 'nav.contact': 'Contact', 'nav.join': 'Join Us',
    'utility.call': 'Call', 'utility.whatsapp': 'WhatsApp', 'utility.quote': 'Get Policy Quote', 'utility.toggle': 'Switch to Roman Urdu',
    'blueBar.en': 'Sukkur Area Office 5405', 'blueBar.ur': 'Sukkur Area Office 5405 - Khidmat',
    'home.eyebrow': 'Family protection starts here', 'home.title': 'Apki Family Ka Mustaqbil Mehfooz', 'home.subtitle': 'Trusted insurance guidance aur local support ke liye Sukkur Area Office se rabta karein. Simple aur clear information hasil karein.', 'home.consultation': 'Free Consultation', 'home.whatsapp': 'WhatsApp Us',
    'products.eyebrow': 'Plans & products', 'products.title': 'Protection aur planning options.', 'products.subtitle': 'Har family ki zaroorat alag hoti hai. Apne liye relevant State Life table par office se detail guidance lein.', 'products.compare': 'Compare tables. Choose your next step.', 'products.contact': 'Contact office',
    'products.tab.popular': 'Popular Plans', 'products.tab.child': 'Child Security', 'products.tab.special': 'Special & Retirement', 'products.guideEyebrow': 'State Life policy tables', 'products.guideTitle': 'Compare tables. Choose your next step.', 'products.applyTable': 'Apply for Table', 'products.suitable': 'Suitable for', 'products.eligibility': 'Eligibility / age limits', 'products.terms': 'Term options', 'products.payout': 'Financial benefit / payout', 'products.estimate': 'Calculate Plan Estimate',
    'table.01.title': 'Endowment Assurance', 'table.03.title': 'Whole Life Assurance', 'table.08.title': 'Sadabahar Plan', 'table.14.title': 'Family Protection Assurance', 'table.11.title': 'Child Education & Marriage Assurance', 'table.12.title': 'Child Future Assurance', 'table.36.title': 'Education Support Plan', 'table.05.title': 'Anticipated Endowment', 'table.22.title': 'Retirement & Savings Plan', 'table.70.title': 'Special & Retirement Options',
    'services.eyebrow': 'Sukkur Area Office 5405', 'services.title': 'Aapki policy journey ke har qadam par local guidance.', 'services.subtitle': 'Documentation se claims aur payment support tak, hamari office team process ko simple andaaz mein samajhne mein madad karti hai.', 'services.support': 'Office support', 'services.request': 'Request Assistance', 'services.tables': 'View policy tables',
    'about.eyebrow': 'About Area Office 5405', 'about.title': 'Trust ki legacy, Sukkur ke families ke qareeb.', 'about.subtitle': 'State Life Sukkur Area Office 5405 local families, professionals aur communities ko life protection aur financial security ke decisions samajhne mein guidance provide karta hai.', 'about.consultation': 'Free Consultation', 'about.whatsapp': 'WhatsApp Us', 'about.leadership': 'Leadership', 'about.values': 'Our values', 'about.contact': 'Contact Office',
    'contact.eyebrow': 'Contact Sukkur Office 5405', 'contact.title': 'Aapka sawal, hamari guidance.', 'contact.subtitle': 'Service interest share karein. Hamari office team aap se jald rabta karegi aur next steps simple way mein explain karegi.', 'contact.submit': 'Send Enquiry', 'contact.sending': 'Bhej rahe hain...', 'contact.whatsapp': 'WhatsApp Us', 'contact.call': 'Call Now',
    'join.eyebrow': 'Join our team', 'join.title': 'State Life Sukkur Area Office ke sath Insurance Advisor banein', 'join.subtitle': 'Insurance advisor registration ke liye apni basic maloomat share karein.', 'join.form': 'Pre-Registration Form', 'join.whatsapp': 'WhatsApp Par Poochein',
    'checkout.eyebrow': 'Plan application', 'checkout.title': 'Apni plan request submit karein.', 'checkout.subtitle': 'Basic details share karein. Sukkur Area Office ka representative aap se jald rabta karke policy documentation process samjhayega.', 'checkout.backPlans': 'Back to plans', 'checkout.backServices': 'Back to services',
    'footer.office': 'State Life Sukkur Area Office 5405', 'footer.contact': 'Contact office',
  },
  UR: {
    'nav.home': 'Ghar', 'nav.products': 'Products / Plans', 'nav.services': 'Khadmaat', 'nav.about': 'Humare Baare Mein', 'nav.contact': 'Rabta', 'nav.join': 'Agent Banayen',
    'utility.call': 'Rabta', 'utility.whatsapp': 'WhatsApp', 'utility.quote': 'Policy Quote Lein', 'utility.toggle': 'English par switch karein',
    'blueBar.en': 'Sukkur Area Office 5405', 'blueBar.ur': 'Sukkur Area Office 5405 - Khidmat',
    'home.eyebrow': 'Family protection yahan se shuru hoti hai', 'home.title': 'Apki Family Ka Mustaqbil Mehfooz', 'home.subtitle': 'Sukkur Area Office se trusted insurance guidance aur local support hasil karein. Maloomat simple aur clear andaaz mein lein.', 'home.consultation': 'Free Mashwara', 'home.whatsapp': 'WhatsApp Karein',
    'products.eyebrow': 'Plans aur products', 'products.title': 'Protection aur planning ke options.', 'products.subtitle': 'Har family ki zaroorat alag hoti hai. Apne liye State Life table par office se detail rehnumai lein.', 'products.compare': 'Tables ka muqabla karein aur agla qadam chunein.', 'products.contact': 'Office se rabta',
    'products.tab.popular': 'Mashhoor Plans', 'products.tab.child': 'Bachon ki Hifazat', 'products.tab.special': 'Khaas aur Retirement', 'products.guideEyebrow': 'State Life policy tables', 'products.guideTitle': 'Tables ka muqabla karein aur agla qadam chunein.', 'products.applyTable': 'Table ke liye apply karein', 'products.suitable': 'Kis ke liye', 'products.eligibility': 'Eligibility / umar ki had', 'products.terms': 'Muddat ke options', 'products.payout': 'Maali faida / payout', 'products.estimate': 'Plan ka estimate nikalein',
    'table.01.title': 'Endowment Assurance', 'table.03.title': 'Whole Life Assurance', 'table.08.title': 'Sadabahar Plan', 'table.14.title': 'Family Protection Assurance', 'table.11.title': 'Child Education aur Marriage Assurance', 'table.12.title': 'Child Future Assurance', 'table.36.title': 'Education Support Plan', 'table.05.title': 'Anticipated Endowment', 'table.22.title': 'Retirement aur Savings Plan', 'table.70.title': 'Khaas aur Retirement Options',
    'services.eyebrow': 'Sukkur Area Office 5405', 'services.title': 'Policy journey ke har qadam par local rehnumai.', 'services.subtitle': 'Documentation, claims aur payments ke process ko hamari office team simple banati hai.', 'services.support': 'Office ki khidmaat', 'services.request': 'Madad darkhwast karein', 'services.tables': 'Policy tables dekhein',
    'about.eyebrow': 'Area Office 5405 ka taaruf', 'about.title': 'Trust ki riwayat, Sukkur ke families ke qareeb.', 'about.subtitle': 'State Life Sukkur Area Office families aur communities ko life protection aur financial security ke faislon mein rehnumai deta hai.', 'about.consultation': 'Free Mashwara', 'about.whatsapp': 'WhatsApp Karein', 'about.leadership': 'Qayadat', 'about.values': 'Hamari qeematein', 'about.contact': 'Office se rabta',
    'contact.eyebrow': 'Sukkur Office 5405 se rabta', 'contact.title': 'Aapka sawal, hamari rehnumai.', 'contact.subtitle': 'Apni service interest share karein. Office team jald rabta karke aglay steps samjhayegi.', 'contact.submit': 'Darkhwast bhejein', 'contact.sending': 'Bhej rahe hain...', 'contact.whatsapp': 'WhatsApp Karein', 'contact.call': 'Call Karein',
    'join.eyebrow': 'Hamari team ka hissa banein', 'join.title': 'State Life Sukkur Area Office ke sath Insurance Advisor banein', 'join.subtitle': 'Registration ke liye apni basic maloomat share karein.', 'join.form': 'Pre-Registration Form', 'join.whatsapp': 'WhatsApp par poochein',
    'checkout.eyebrow': 'Plan application', 'checkout.title': 'Apni plan request jama karein.', 'checkout.subtitle': 'Basic details share karein. Representative aap se rabta karke policy documentation samjhayega.', 'checkout.backPlans': 'Plans par wapas', 'checkout.backServices': 'Khadmaat par wapas',
    'footer.office': 'State Life Sukkur Area Office 5405', 'footer.contact': 'Office se rabta',
  },
};

type LanguageContextValue = {
  lang: Language;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('EN');
  const value = useMemo(() => ({ lang, toggleLanguage: () => setLang((current) => current === 'EN' ? 'UR' : 'EN'), t: (key: TranslationKey) => translations[lang][key] }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}

export type { Language, TranslationKey };
