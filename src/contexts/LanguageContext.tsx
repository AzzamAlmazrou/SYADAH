import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    home: "الرئيسية",
    advisor: "المستشار صقر",
    inheritance: "حاسبة الورث",
    lawyers: "نخبة المحامين",
    contracts: "مولد العقود",
    login: "تسجيل الدخول",
    hero_title: "مستقبلك القانوني يبدأ مع سِيادَة",
    hero_subtitle: "أمانك القانوني، برؤية تقنية حديثة",
    hero_desc: "منصة قانونية سعودية متطورة تهدف لتمكين الأفراد والشركات من إدارة شؤونهم القانونية بذكاء، سرعة، وموثوقية عالية.",
    consult_now: "استشر صقر الآن",
    discover_services: "اكتشف الخدمات",
    advisor_desc: "مساعد قانوني ذكي للإجابة على استفساراتك وفق الأنظمة السعودية.",
    inheritance_desc: "تقسيم التركات آلياً وفق الشريعة الإسلامية ونظام الأحوال الشخصية.",
    lawyers_desc: "دليل المحامين المعتمدين والموثوقين في المملكة.",
    contracts_desc: "بناء عقود قانونية مخصصة وموثوقة بلمسة تقنية.",
    start_now: "ابدأ الآن",
    fast_speed: "سرعة فائقة",
    fast_desc: "إجابات قانونية فورية ومعالجة سريعة لطلباتك.",
    reliability: "موثوقية عالية",
    reliability_desc: "اعتماد كلي على الأنظمة واللوائح السعودية المحدثة.",
    comprehensive: "دعم شامل",
    comprehensive_desc: "تغطية واسعة لمختلف فروع القانون السعودي.",
    how_it_works: "كيف تعمل سِيادَة؟",
    step_1: "اختر الخدمة",
    step_1_desc: "حدد الخدمة القانونية التي تحتاجها من القائمة.",
    step_2: "أدخل البيانات",
    step_2_desc: "زودنا بالمعلومات اللازمة لمعالجة طلبك بدقة.",
    step_3: "احصل على النتيجة",
    step_3_desc: "استلم استشارتك أو عقدك فوراً بلمسة تقنية.",
    stats_users: "مستخدم نشط",
    stats_contracts: "عقد تم توليده",
    stats_consults: "استشارة قانونية",
    footer_rights: "جميع الحقوق محفوظة لمنصة سِيادَة © 2026",
    footer_about: "عن سِيادَة",
    footer_contact: "اتصل بنا",
    footer_privacy: "سياسة الخصوصية",
  },
  en: {
    home: "Home",
    advisor: "Saqr Advisor",
    inheritance: "Inheritance Calc",
    lawyers: "Elite Lawyers",
    contracts: "Contract Generator",
    login: "Login",
    hero_title: "Your Legal Future Starts with Siyadah",
    hero_subtitle: "Your Legal Security, with a Modern Tech Vision",
    hero_desc: "An advanced Saudi legal platform aimed at empowering individuals and companies to manage their legal affairs with intelligence, speed, and high reliability.",
    consult_now: "Consult Saqr Now",
    discover_services: "Discover Services",
    advisor_desc: "Smart legal assistant to answer your inquiries according to Saudi regulations.",
    inheritance_desc: "Automated division of estates according to Islamic Sharia and Saudi Personal Status Law.",
    lawyers_desc: "Directory of certified and trusted lawyers in the Kingdom.",
    contracts_desc: "Building customized and reliable legal contracts with a technical touch.",
    start_now: "Start Now",
    fast_speed: "High Speed",
    fast_desc: "Instant legal answers and fast processing of your requests.",
    reliability: "High Reliability",
    reliability_desc: "Total reliance on updated Saudi systems and regulations.",
    comprehensive: "Comprehensive Support",
    comprehensive_desc: "Wide coverage of various branches of Saudi law.",
    how_it_works: "How Siyadah Works?",
    step_1: "Choose Service",
    step_1_desc: "Select the legal service you need from the list.",
    step_2: "Enter Data",
    step_2_desc: "Provide us with the necessary information to process your request accurately.",
    step_3: "Get Result",
    step_3_desc: "Receive your consultation or contract instantly with a technical touch.",
    stats_users: "Active Users",
    stats_contracts: "Contracts Generated",
    stats_consults: "Legal Consultations",
    footer_rights: "All rights reserved to Siyadah Platform © 2026",
    footer_about: "About Siyadah",
    footer_contact: "Contact Us",
    footer_privacy: "Privacy Policy",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === "ar" ? "font-sans" : "font-sans"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
