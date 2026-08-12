export type Specialty = "General Physician" | "Dermatologist" | "Pediatrician" | "Dentist";

export type Doctor = {
  id: string;
  name: string;
  specialty: Specialty;
  experience: number;
  languages: string[];
  consultation: "Video consultation" | "In-person visit";
  nextAvailable: string;
  fee: number;
  bio: string;
  bioHi: string;
  initials: string;
};

/** Fictional data for a design concept. No real clinicians or patients. */
export const doctors: Doctor[] = [
  {
    id: "ananya-sharma",
    name: "Dr. Ananya Sharma",
    specialty: "Dermatologist",
    experience: 8,
    languages: ["English", "Hindi"],
    consultation: "Video consultation",
    nextAvailable: "Today, 5:30 PM",
    fee: 600,
    bio: "Dr. Sharma treats everyday skin concerns such as acne, rashes and hair fall. She explains each step in plain language and shares a short written summary after every consultation.",
    bioHi:
      "डॉ. शर्मा मुँहासे, चकत्ते और बाल झड़ने जैसी रोज़मर्रा की त्वचा समस्याओं का इलाज करती हैं। वे हर चरण आसान भाषा में समझाती हैं और परामर्श के बाद संक्षिप्त लिखित सारांश देती हैं।",
    initials: "AS",
  },
  {
    id: "rohit-menon",
    name: "Dr. Rohit Menon",
    specialty: "General Physician",
    experience: 12,
    languages: ["English", "Hindi", "Malayalam"],
    consultation: "In-person visit",
    nextAvailable: "Tomorrow, 10:30 AM",
    fee: 450,
    bio: "Dr. Menon sees adults for fever, blood pressure, diabetes reviews and general check-ups. He often helps first-time patients understand which tests are actually needed.",
    bioHi:
      "डॉ. मेनन बुखार, ब्लड प्रेशर, डायबिटीज़ जाँच और सामान्य चेक-अप के लिए वयस्कों को देखते हैं। वे नए मरीज़ों को समझाते हैं कि कौन-सी जाँच वाकई ज़रूरी है।",
    initials: "RM",
  },
  {
    id: "meera-iyer",
    name: "Dr. Meera Iyer",
    specialty: "Dermatologist",
    experience: 5,
    languages: ["English", "Tamil"],
    consultation: "Video consultation",
    nextAvailable: "Tomorrow, 12:00 PM",
    fee: 500,
    bio: "Dr. Iyer focuses on skin allergies and long-term skin care routines. She prefers simple, low-cost treatment plans that are easy to follow at home.",
    bioHi:
      "डॉ. आयर त्वचा की एलर्जी और लंबे समय की त्वचा देखभाल पर ध्यान देती हैं। वे आसान और कम खर्च वाली उपचार योजनाएँ पसंद करती हैं जिन्हें घर पर निभाना सरल हो।",
    initials: "MI",
  },
  {
    id: "sunil-verma",
    name: "Dr. Sunil Verma",
    specialty: "Pediatrician",
    experience: 15,
    languages: ["English", "Hindi"],
    consultation: "In-person visit",
    nextAvailable: "Today, 3:30 PM",
    fee: 550,
    bio: "Dr. Verma cares for children from birth to 14 years, including vaccinations and growth reviews. He speaks directly to parents about what to watch for at home.",
    bioHi:
      "डॉ. वर्मा जन्म से 14 वर्ष तक के बच्चों की देखभाल करते हैं, जिसमें टीकाकरण और विकास जाँच शामिल है। वे माता-पिता को साफ़ बताते हैं कि घर पर किन बातों का ध्यान रखें।",
    initials: "SV",
  },
  {
    id: "farah-qureshi",
    name: "Dr. Farah Qureshi",
    specialty: "Dentist",
    experience: 9,
    languages: ["English", "Hindi", "Urdu"],
    consultation: "In-person visit",
    nextAvailable: "Tomorrow, 9:00 AM",
    fee: 400,
    bio: "Dr. Qureshi handles cleanings, fillings and tooth pain. She walks nervous patients through the procedure before starting, step by step.",
    bioHi:
      "डॉ. क़ुरैशी सफ़ाई, फ़िलिंग और दाँत के दर्द का इलाज करती हैं। वे घबराए मरीज़ों को शुरू करने से पहले पूरी प्रक्रिया चरण-दर-चरण समझाती हैं।",
    initials: "FQ",
  },
];

export const specialties: Specialty[] = [
  "General Physician",
  "Dermatologist",
  "Pediatrician",
  "Dentist",
];

export const languages = ["English", "Hindi", "Tamil", "Malayalam", "Urdu"];

export const timeSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "3:30 PM", "5:30 PM"];

/** Deterministic "unavailable" slots so states are visible without a backend. */
export function slotAvailability(doctorId: string, dateKey: string, slot: string) {
  const seed = (doctorId + dateKey + slot).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return seed % 4 !== 0;
}

export function getDoctor(id: string) {
  return doctors.find((d) => d.id === id);
}

export type BookingDate = { key: string; label: string; weekday: string; day: string; month: string };

export function upcomingDates(count = 6): BookingDate[] {
  const out: BookingDate[] = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(base.getTime() + i * 86400000);
    const weekday = d.toLocaleDateString("en-IN", { weekday: "short" });
    out.push({
      key: d.toISOString().slice(0, 10),
      label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-IN", { weekday: "long" }),
      weekday: i === 0 ? "Today" : i === 1 ? "Tomorrow" : weekday,
      day: String(d.getDate()),
      month: d.toLocaleDateString("en-IN", { month: "short" }),
    });
  }
  return out;
}

export function formatFullDate(key: string) {
  const d = new Date(key + "T00:00:00");
  return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
}
