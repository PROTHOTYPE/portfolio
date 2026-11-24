"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { BiText, Locale, ProjectItem } from "@/data/portfolio";
import { PROJECTS } from "@/data/portfolio";

const STORAGE_KEY = "prothotype_locale";
const LOCALE_EVENT = "prothotype-locale-change";

function readClientLocale(): Locale {
  if (typeof window === "undefined") return "pt";
  try {
    const urlLang = new URLSearchParams(window.location.search).get("lang");
    if (urlLang === "en" || urlLang === "pt") return urlLang;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "pt") return saved;
  } catch {
    return "pt";
  }
  return "pt";
}

function subscribeLocale(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(LOCALE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(LOCALE_EVENT, onStoreChange);
  };
}

function writeClientLocale(next: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
    const url = new URL(window.location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.set("lang", next);
      window.history.replaceState({}, "", url.toString());
    }
  } catch {
    // storage indisponivel
  }
  window.dispatchEvent(new Event(LOCALE_EVENT));
}

interface LanguageContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
  t: (text: BiText) => string;
  activeProject: ProjectItem | null;
  openProject: (id: ProjectItem["id"]) => void;
  closeProject: () => void;
  commandOpen: boolean;
  setCommandOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toast: string | null;
  showToast: (message: string) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore<Locale>(
    subscribeLocale,
    readClientLocale,
    () => "pt"
  );
  const [activeProjectId, setActiveProjectId] = useState<ProjectItem["id"] | null>(
    null
  );
  const [commandOpen, setCommandOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    writeClientLocale(next);
  }, []);

  const toggleLocale = useCallback(() => {
    const next: Locale = readClientLocale() === "pt" ? "en" : "pt";
    writeClientLocale(next);
  }, []);

  const t = useCallback(
    (text: BiText) => (locale === "pt" ? text.pt : text.en),
    [locale]
  );

  const openProject = useCallback((id: ProjectItem["id"]) => {
    setActiveProjectId(id);
  }, []);

  const closeProject = useCallback(() => {
    setActiveProjectId(null);
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => {
      setToast((current) => (current === message ? null : current));
    }, 2600);
  }, []);

  const activeProject = useMemo(
    () => PROJECTS.find((p) => p.id === activeProjectId) ?? null,
    [activeProjectId]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t,
      activeProject,
      openProject,
      closeProject,
      commandOpen,
      setCommandOpen,
      toast,
      showToast,
    }),
    [
      locale,
      setLocale,
      toggleLocale,
      t,
      activeProject,
      openProject,
      closeProject,
      commandOpen,
      toast,
      showToast,
    ]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
