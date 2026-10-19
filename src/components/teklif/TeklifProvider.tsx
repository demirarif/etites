"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultWhatsappMessage } from "@/data/site";
import TeklifPanel from "./TeklifPanel";

type Ctx = {
  message: string;
  setMessage: (m: string | null) => void;
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const TeklifContext = createContext<Ctx | null>(null);

export function TeklifProvider({ children }: { children: ReactNode }) {
  const [pageMessage, setPageMessage] = useState<string | null>(null);
  const [isOpen, setOpen] = useState(false);
  const message = pageMessage ?? defaultWhatsappMessage;

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const setMessage = useCallback((m: string | null) => setPageMessage(m), []);

  const value = useMemo(() => ({ message, setMessage, open, close, isOpen }), [message, setMessage, open, close, isOpen]);

  return (
    <TeklifContext.Provider value={value}>
      {children}
      <TeklifPanel />
    </TeklifContext.Provider>
  );
}

export function useTeklif() {
  const ctx = useContext(TeklifContext);
  if (!ctx) throw new Error("useTeklif, TeklifProvider içinde kullanılmalı");
  return ctx;
}

/** Sayfaya özel WhatsApp ilk mesajı. Sayfadan çıkınca varsayılana döner. */
export function TeklifMesaji({ text }: { text: string }) {
  const { setMessage } = useTeklif();
  useEffect(() => {
    setMessage(text);
    return () => setMessage(null);
  }, [text, setMessage]);
  return null;
}
