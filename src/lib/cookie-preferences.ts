"use client";

import { useSyncExternalStore } from "react";

const KEY = "etites-cookie-preferences";
const CHANGE_EVENT = "etites-cookie-preferences-change";
const COOKIE_PREFERENCE_DAYS = 180;
let inMemoryPreference: boolean | null = null;

export function readMapPreference(): boolean {
  if (inMemoryPreference !== null) return inMemoryPreference;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return true;
    const saved = JSON.parse(raw) as { version?: number; maps?: boolean; expiresAt?: number };
    if (saved.version === 2 && typeof saved.maps === "boolean" && typeof saved.expiresAt === "number" && saved.expiresAt > Date.now()) return saved.maps;
    return true;
  } catch {
    return true;
  }
}

export function saveMapPreference(maps: boolean): boolean {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({
      version: 2,
      maps,
      expiresAt: Date.now() + COOKIE_PREFERENCE_DAYS * 24 * 60 * 60 * 1000,
    }));
    inMemoryPreference = null;
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return true;
  } catch {
    inMemoryPreference = maps;
    window.dispatchEvent(new Event(CHANGE_EVENT));
    return false;
  }
}

function subscribe(listener: () => void) {
  window.addEventListener(CHANGE_EVENT, listener);
  window.addEventListener("storage", listener);
  window.addEventListener("focus", listener);
  return () => {
    window.removeEventListener(CHANGE_EVENT, listener);
    window.removeEventListener("storage", listener);
    window.removeEventListener("focus", listener);
  };
}

export function useMapPreference() {
  return useSyncExternalStore(subscribe, readMapPreference, () => true);
}
