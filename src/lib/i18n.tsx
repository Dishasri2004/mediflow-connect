import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "hi";

/**
 * Partial localisation on purpose: navigation and primary actions only.
 * A real product would validate wording with native speakers and users.
 */
const dict = {
  brand: { en: "MediFlow", hi: "मेडीफ़्लो" },
  findDoctor: { en: "Find a doctor", hi: "डॉक्टर खोजें" },
  bookAppointment: { en: "Book appointment", hi: "अपॉइंटमेंट बुक करें" },
  myAppointments: { en: "My appointment", hi: "मेरी अपॉइंटमेंट" },
  confirm: { en: "Confirm appointment", hi: "पुष्टि करें" },
  continueLabel: { en: "Continue", hi: "आगे बढ़ें" },
  back: { en: "Back", hi: "पीछे" },
  home: { en: "Home", hi: "होम" },
  viewProfile: { en: "View profile", hi: "प्रोफ़ाइल देखें" },
  chooseAppointment: { en: "Choose appointment", hi: "अपॉइंटमेंट चुनें" },
  review: { en: "Review appointment", hi: "अपॉइंटमेंट जाँचें" },
  designNotes: { en: "Design notes", hi: "डिज़ाइन नोट्स" },
  language: { en: "Language", hi: "भाषा" },
  stepDoctor: { en: "Doctor", hi: "डॉक्टर" },
  stepTime: { en: "Time", hi: "समय" },
  stepDetails: { en: "Details", hi: "विवरण" },
  stepConfirm: { en: "Confirm", hi: "पुष्टि" },
} satisfies Record<string, Record<Lang, string>>;

export type TKey = keyof typeof dict;

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => dict[k].en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("mediflow:lang");
    if (stored === "hi" || stored === "en") setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("mediflow:lang", l);
  }, []);

  const t = useCallback((k: TKey) => dict[k][lang], [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
