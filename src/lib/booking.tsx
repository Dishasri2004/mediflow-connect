import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Booking = {
  doctorId?: string;
  dateKey?: string;
  slot?: string;
  fullName?: string;
  age?: string;
  phone?: string;
  reason?: string;
  appointmentId?: string;
};

const KEY = "mediflow:booking";

const BookingContext = createContext<{
  booking: Booking;
  update: (patch: Booking) => void;
  reset: () => void;
  hydrated: boolean;
}>({ booking: {}, update: () => {}, reset: () => {}, hydrated: false });

/** Form data is kept in localStorage so an interrupted session keeps its answers. */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<Booking>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setBooking(JSON.parse(raw) as Booking);
    } catch {
      /* ignore corrupt state */
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: Booking) => {
    setBooking(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable — the flow still works in memory */
    }
  }, []);

  const update = useCallback(
    (patch: Booking) => {
      setBooking((prev) => {
        const next = { ...prev, ...patch };
        try {
          window.localStorage.setItem(KEY, JSON.stringify(next));
        } catch {
          /* noop */
        }
        return next;
      });
    },
    [],
  );

  const reset = useCallback(() => persist({}), [persist]);

  return (
    <BookingContext.Provider value={{ booking, update, reset, hydrated }}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}

export function makeAppointmentId() {
  return "MF-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}
