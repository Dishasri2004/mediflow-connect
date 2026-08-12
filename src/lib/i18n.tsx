import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "hi";

/**
 * Full UI localisation: every visible string on the six screens has an
 * English and a Hindi value, so switching language never leaves mixed copy.
 */
const dict = {
  brand: { en: "MediFlow", hi: "मेडीफ़्लो" },
  findDoctor: { en: "Find a doctor", hi: "डॉक्टर खोजें" },
  bookAppointment: { en: "Book appointment", hi: "अपॉइंटमेंट बुक करें" },
  myAppointments: { en: "My appointment", hi: "मेरी अपॉइंटमेंट" },
  confirm: { en: "Confirm appointment", hi: "अपॉइंटमेंट पक्का करें" },
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

  // Shared
  skipToMain: { en: "Skip to main content", hi: "मुख्य सामग्री पर जाएँ" },
  mainNav: { en: "Main", hi: "मुख्य मेनू" },
  bookingProgress: { en: "Booking progress", hi: "बुकिंग की प्रगति" },
  stepOf: { en: "Step {n} of 4", hi: "चरण {n} / 4" },
  searchLabel: { en: "Search doctors or specialties", hi: "डॉक्टर या विशेषज्ञता खोजें" },
  tryAgain: { en: "Try again", hi: "फिर कोशिश करें" },
  connectionTitle: { en: "Your connection was interrupted.", hi: "आपका कनेक्शन टूट गया।" },
  connectionBody: {
    en: "Your information is still here. Nothing was lost.",
    hi: "आपकी जानकारी सुरक्षित है। कुछ भी नहीं खोया।",
  },
  disclaimer: {
    en: "MediFlow is a UX / human-centered design concept built for a portfolio. Doctors, availability and appointments are fictional. No real patient research is represented and the product is not deployed.",
    hi: "मेडीफ़्लो एक पोर्टफ़ोलियो के लिए बनाया गया UX / मानव-केंद्रित डिज़ाइन कॉन्सेप्ट है। डॉक्टर, उपलब्धता और अपॉइंटमेंट काल्पनिक हैं। इसमें कोई वास्तविक रोगी शोध शामिल नहीं है और यह उत्पाद लाइव नहीं है।",
  },

  // Home
  homeEyebrow: { en: "Appointment booking concept", hi: "अपॉइंटमेंट बुकिंग कॉन्सेप्ट" },
  homeTitle: { en: "Find the right care, without the confusion.", hi: "सही इलाज, बिना किसी उलझन के।" },
  homeSubtitle: {
    en: "Find a doctor and choose a convenient appointment time in a few simple steps.",
    hi: "कुछ आसान चरणों में डॉक्टर चुनें और अपने लिए सुविधाजनक समय तय करें।",
  },
  orChooseSpecialty: { en: "Or choose a specialty", hi: "या विशेषज्ञता चुनें" },
  howDesigned: { en: "How this concept is designed", hi: "यह कॉन्सेप्ट कैसे डिज़ाइन किया गया है" },
  hcd1Title: { en: "One action per screen", hi: "हर स्क्रीन पर एक ही काम" },
  hcd1Body: {
    en: "Each step has a single clear next step, so people always know what to do next.",
    hi: "हर चरण में आगे बढ़ने का एक ही साफ़ रास्ता है, ताकि हमेशा पता रहे कि अब क्या करना है।",
  },
  hcd2Title: { en: "Plain language", hi: "आसान भाषा" },
  hcd2Body: {
    en: "Labels and errors describe what happened and how to fix it, without medical jargon.",
    hi: "लेबल और त्रुटि संदेश बताते हैं कि क्या हुआ और उसे कैसे ठीक करें, बिना कठिन चिकित्सकीय शब्दों के।",
  },
  hcd3Title: { en: "Accessible by default", hi: "शुरू से सुलभ" },
  hcd3Body: {
    en: "Keyboard focus, large touch targets, readable type and no colour-only signals.",
    hi: "कीबोर्ड फ़ोकस, बड़े टैप क्षेत्र, पढ़ने योग्य टेक्स्ट और केवल रंग पर निर्भर संकेत नहीं।",
  },
  conceptNote: { en: "MediFlow is a design concept with fictional data.", hi: "मेडीफ़्लो काल्पनिक डेटा वाला एक डिज़ाइन कॉन्सेप्ट है।" },
  readDesignNotes: {
    en: "Read the design system and research notes",
    hi: "डिज़ाइन सिस्टम और शोध नोट्स पढ़ें",
  },

  // Search
  chooseDoctor: { en: "Choose a doctor", hi: "डॉक्टर चुनें" },
  doctorsAvailable: {
    en: "{n} doctors available. Open a profile to see full details.",
    hi: "{n} डॉक्टर उपलब्ध हैं। पूरी जानकारी के लिए प्रोफ़ाइल खोलें।",
  },
  doctorAvailable: {
    en: "1 doctor available. Open a profile to see full details.",
    hi: "1 डॉक्टर उपलब्ध है। पूरी जानकारी के लिए प्रोफ़ाइल खोलें।",
  },
  filterSpecialty: { en: "Specialty", hi: "विशेषज्ञता" },
  filterLanguage: { en: "Language", hi: "भाषा" },
  filterAvailability: { en: "Availability", hi: "उपलब्धता" },
  availableToday: { en: "Available today", hi: "आज उपलब्ध" },
  noMatchTitle: { en: "No doctors match these filters.", hi: "इन फ़िल्टर से कोई डॉक्टर नहीं मिला।" },
  noMatchBody: {
    en: "Try removing a filter — for example, choose a different language or allow any day.",
    hi: "कोई फ़िल्टर हटाकर देखें — जैसे दूसरी भाषा चुनें या किसी भी दिन की अनुमति दें।",
  },
  yearsExperience: { en: "years experience", hi: "साल का अनुभव" },
  languagesLabel: { en: "Languages", hi: "भाषाएँ" },
  consultationType: { en: "Consultation type", hi: "परामर्श का प्रकार" },
  nextAvailable: { en: "Next available", hi: "अगली उपलब्धता" },
  nextAvailablePrefix: { en: "Next available:", hi: "अगली उपलब्धता:" },

  // Doctor profile
  backToDoctors: { en: "Back to doctors", hi: "डॉक्टरों की सूची पर वापस" },
  howConsultation: { en: "How the consultation happens", hi: "परामर्श कैसे होगा" },
  consultationFee: { en: "Consultation fee", hi: "परामर्श शुल्क" },
  about: { en: "About", hi: "परिचय" },
  usualTimes: { en: "Usual appointment times", hi: "आमतौर पर उपलब्ध समय" },
  usualTimesNote: {
    en: "You will pick an exact date and time on the next screen.",
    hi: "अगली स्क्रीन पर आप ठीक तारीख़ और समय चुनेंगे।",
  },

  // Time
  backToProfile: { en: "Back to profile", hi: "प्रोफ़ाइल पर वापस" },
  chooseDoctorFirst: { en: "Choose a doctor first", hi: "पहले डॉक्टर चुनें" },
  chooseDoctorFirstBody: {
    en: "To pick a time, start by choosing the doctor you would like to see.",
    hi: "समय चुनने के लिए पहले वह डॉक्टर चुनें जिनसे आप मिलना चाहते हैं।",
  },
  timeTitle: { en: "When would you like to be seen?", hi: "आप कब मिलना चाहेंगे?" },
  chooseDate: { en: "Choose a date", hi: "तारीख़ चुनें" },
  chooseTime: { en: "Choose a time", hi: "समय चुनें" },
  slotLegend: {
    en: "Crossed-out times with a “no entry” icon are already taken. Selected times are marked with a tick.",
    hi: "काटे हुए और “मना” चिह्न वाले समय पहले से बुक हैं। चुना हुआ समय सही के निशान से दिखाया जाता है।",
  },
  slotUnavailable: { en: "Unavailable", hi: "उपलब्ध नहीं" },
  slotSelected: { en: "Selected", hi: "चुना गया" },
  slotError: {
    en: "Choose a time slot to continue. Times marked with a tick are selected.",
    hi: "आगे बढ़ने के लिए एक समय चुनें। सही के निशान वाला समय चुना हुआ है।",
  },
  today: { en: "Today", hi: "आज" },
  tomorrow: { en: "Tomorrow", hi: "कल" },

  // Details
  backToDateTime: { en: "Back to date and time", hi: "तारीख़ और समय पर वापस" },
  detailsTitle: { en: "Who is this appointment for?", hi: "यह अपॉइंटमेंट किसके लिए है?" },
  detailsSubtitle: {
    en: "Four short questions. You can book for yourself or for someone else.",
    hi: "चार छोटे सवाल। आप अपने लिए या किसी और के लिए बुक कर सकते हैं।",
  },
  savedNote: {
    en: "Your answers are saved on this device as you type, so nothing is lost if you get interrupted.",
    hi: "आपके जवाब लिखते ही इस डिवाइस पर सेव हो जाते हैं, इसलिए बीच में रुकने पर कुछ नहीं खोता।",
  },
  fullName: { en: "Full name", hi: "पूरा नाम" },
  age: { en: "Age", hi: "उम्र" },
  ageHint: { en: "In years.", hi: "सालों में।" },
  phone: { en: "Phone number", hi: "फ़ोन नंबर" },
  phoneHint: {
    en: "We use this only to confirm the appointment.",
    hi: "इसका उपयोग केवल अपॉइंटमेंट पक्का करने के लिए होगा।",
  },
  phonePlaceholder: { en: "10-digit number", hi: "10 अंकों का नंबर" },
  reason: { en: "Reason for visit", hi: "मिलने का कारण" },
  reasonHint: { en: "A few words are enough.", hi: "कुछ शब्द ही काफ़ी हैं।" },
  errName: {
    en: "Enter the patient's full name, as you would like it on the appointment.",
    hi: "मरीज़ का पूरा नाम लिखें, जैसा आप अपॉइंटमेंट पर चाहते हैं।",
  },
  errAge: {
    en: "Enter an age between 1 and 120, in numbers.",
    hi: "1 से 120 के बीच उम्र अंकों में लिखें।",
  },
  errPhone: {
    en: "Enter a 10-digit phone number, without spaces or country code.",
    hi: "10 अंकों का फ़ोन नंबर लिखें, बिना स्पेस या देश कोड।",
  },
  errReason: {
    en: "Tell us briefly why you want to see the doctor, for example “skin rash”.",
    hi: "संक्षेप में बताएँ कि आप डॉक्टर से क्यों मिलना चाहते हैं, जैसे “त्वचा पर चकत्ते”।",
  },

  // Review
  backToDetails: { en: "Back to patient details", hi: "मरीज़ के विवरण पर वापस" },
  reviewTitle: { en: "Please check these details", hi: "कृपया ये विवरण जाँच लें" },
  reviewSubtitle: {
    en: "Nothing is booked yet. You can go back and change any answer.",
    hi: "अभी कुछ बुक नहीं हुआ है। आप पीछे जाकर कोई भी जवाब बदल सकते हैं।",
  },
  finishEarlierTitle: { en: "Let's finish the earlier steps", hi: "पहले के चरण पूरे कर लें" },
  finishEarlierBody: {
    en: "We still need a doctor, a time and the patient's details before you can review the appointment.",
    hi: "अपॉइंटमेंट जाँचने से पहले हमें डॉक्टर, समय और मरीज़ का विवरण चाहिए।",
  },
  doctorLabel: { en: "Doctor", hi: "डॉक्टर" },
  dateLabel: { en: "Date", hi: "तारीख़" },
  timeLabel: { en: "Time", hi: "समय" },
  typeLabel: { en: "Type", hi: "प्रकार" },
  feeLabel: { en: "Fee", hi: "शुल्क" },
  patientLabel: { en: "Patient", hi: "मरीज़" },
  phoneLabel: { en: "Phone", hi: "फ़ोन" },
  reasonLabel: { en: "Reason", hi: "कारण" },
  ageInline: { en: "age", hi: "उम्र" },
  bookingNow: { en: "Booking your appointment…", hi: "आपका अपॉइंटमेंट बुक हो रहा है…" },
  demoPoorConnection: {
    en: "Demo: confirm with a poor connection",
    hi: "डेमो: कमज़ोर कनेक्शन के साथ पुष्टि करें",
  },

  // Confirmation
  loadingAppointment: { en: "Loading your appointment…", hi: "आपका अपॉइंटमेंट लोड हो रहा है…" },
  noAppointmentTitle: { en: "You have no appointment yet", hi: "अभी आपका कोई अपॉइंटमेंट नहीं है" },
  noAppointmentBody: {
    en: "When you book an appointment, the details will appear here.",
    hi: "जब आप अपॉइंटमेंट बुक करेंगे, विवरण यहाँ दिखेगा।",
  },
  bookedTitle: { en: "Your appointment is booked.", hi: "आपका अपॉइंटमेंट बुक हो गया।" },
  bookedBody: {
    en: "We have saved these details. Please arrive or join five minutes early.",
    hi: "ये विवरण सेव कर लिए गए हैं। कृपया पाँच मिनट पहले पहुँचें या जुड़ें।",
  },
  confirmed: { en: "Confirmed", hi: "पुष्ट" },
  appointmentId: { en: "Appointment ID", hi: "अपॉइंटमेंट आईडी" },
  dateAndTime: { en: "Date and time", hi: "तारीख़ और समय" },
} satisfies Record<string, Record<Lang, string>>;

export type TKey = keyof typeof dict;

const dataDict: Record<string, Record<Lang, string>> = {
  "General Physician": { en: "General Physician", hi: "सामान्य चिकित्सक" },
  Dermatologist: { en: "Dermatologist", hi: "त्वचा रोग विशेषज्ञ" },
  Pediatrician: { en: "Pediatrician", hi: "बाल रोग विशेषज्ञ" },
  Dentist: { en: "Dentist", hi: "दंत चिकित्सक" },
  "Video consultation": { en: "Video consultation", hi: "वीडियो परामर्श" },
  "In-person visit": { en: "In-person visit", hi: "क्लिनिक में मुलाक़ात" },
  English: { en: "English", hi: "अंग्रेज़ी" },
  Hindi: { en: "Hindi", hi: "हिंदी" },
  Tamil: { en: "Tamil", hi: "तमिल" },
  Malayalam: { en: "Malayalam", hi: "मलयालम" },
  Urdu: { en: "Urdu", hi: "उर्दू" },
  Today: { en: "Today", hi: "आज" },
  Tomorrow: { en: "Tomorrow", hi: "कल" },
  AM: { en: "AM", hi: "सुबह" },
  PM: { en: "PM", hi: "शाम" },
};

/** Translate mock-data values (specialties, languages, day words, AM/PM). */
function translateData(value: string, lang: Lang): string {
  if (lang === "en") return value;
  return value.replace(
    /General Physician|Dermatologist|Pediatrician|Dentist|Video consultation|In-person visit|English|Hindi|Tamil|Malayalam|Urdu|Today|Tomorrow|AM|PM/g,
    (m) => dataDict[m]?.hi ?? m,
  );
}

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: TKey, vars?: Record<string, string | number>) => string;
  td: (value: string) => string;
  formatDate: (key: string) => string;
}>({
  lang: "en",
  setLang: () => {},
  t: (k) => dict[k].en,
  td: (v) => v,
  formatDate: (k) => k,
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

  const t = useCallback(
    (k: TKey, vars?: Record<string, string | number>) => {
      let out: string = dict[k][lang];
      if (vars) for (const [key, v] of Object.entries(vars)) out = out.replace(`{${key}}`, String(v));
      return out;
    },
    [lang],
  );

  const td = useCallback((value: string) => translateData(value, lang), [lang]);

  const formatDate = useCallback(
    (key: string) =>
      new Date(key + "T00:00:00").toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t, td, formatDate }), [lang, setLang, t, td, formatDate]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
