"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Copy,
  FlaskConical,
  FolderCode,
  Globe,
  Search,
  Terminal,
  X,
} from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "@/components/BrandIcons";
import { PROFILE, PROJECTS } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";

interface CommandAction {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  run: () => void;
}

export function CommandPalette() {
  const {
    commandOpen,
    setCommandOpen,
    locale,
    toggleLocale,
    openProject,
    showToast,
  } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = useMemo<CommandAction[]>(() => {
    const isPt = locale === "pt";
    const list: CommandAction[] = [
      {
        id: "mode-eng",
        group: isPt ? "Modelos do Portfólio" : "Portfolio Models",
        label: isPt
          ? "Modelo 01 — Engenharia & Carreira (Vagas Full Stack)"
          : "Model 01 — Software Engineering & Career",
        hint: pathname === "/" ? (isPt ? "Atual" : "Active") : "/",
        icon: <Briefcase className="w-4 h-4 text-[#FF5E1A]" />,
        run: () => router.push("/"),
      },
      {
        id: "mode-lab",
        group: isPt ? "Modelos do Portfólio" : "Portfolio Models",
        label: isPt
          ? "Modelo 02 — PROTHOTYPE Lab (Vitrine Criativa Interativa)"
          : "Model 02 — PROTHOTYPE Lab (Interactive Creative Showcase)",
        hint: pathname === "/lab" ? (isPt ? "Atual" : "Active") : "/lab",
        icon: <FlaskConical className="w-4 h-4 text-amber-400" />,
        run: () => router.push("/lab"),
      },
      {
        id: "lang-toggle",
        group: isPt ? "Preferências" : "Preferences",
        label: isPt
          ? "Trocar idioma para Inglês (EN)"
          : "Switch language to Portuguese (PT-BR)",
        hint: isPt ? "PT → EN" : "EN → PT",
        icon: <Globe className="w-4 h-4 text-sky-400" />,
        run: () => {
          toggleLocale();
          showToast(isPt ? "Language switched to English" : "Idioma alterado para Português");
        },
      },
      ...PROJECTS.map((project) => ({
        id: `proj-${project.id}`,
        group: isPt ? "Abrir Case Técnico" : "Open Case Study",
        label: `${project.index} · ${project.name}`,
        hint: isPt ? project.categoryLabel.pt : project.categoryLabel.en,
        icon: <FolderCode className="w-4 h-4 text-zinc-300" />,
        run: () => openProject(project.id),
      })),
      {
        id: "copy-email",
        group: isPt ? "Contato & Links" : "Contact & Links",
        label: isPt
          ? `Copiar e-mail (${PROFILE.email})`
          : `Copy email (${PROFILE.email})`,
        hint: "Clipboard",
        icon: <Copy className="w-4 h-4 text-emerald-400" />,
        run: () => {
          navigator.clipboard?.writeText(PROFILE.email);
          showToast(isPt ? "E-mail copiado!" : "Email copied!");
        },
      },
      {
        id: "open-github",
        group: isPt ? "Contato & Links" : "Contact & Links",
        label: "GitHub — github.com/PROTHOTYPE",
        hint: "↗",
        icon: <Github className="w-4 h-4 text-zinc-300" />,
        run: () => window.open(PROFILE.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "open-linkedin",
        group: isPt ? "Contato & Links" : "Contact & Links",
        label: "LinkedIn — linkedin.com/in/pedrocartneto",
        hint: "↗",
        icon: <Linkedin className="w-4 h-4 text-sky-400" />,
        run: () => window.open(PROFILE.linkedin, "_blank", "noopener,noreferrer"),
      },
    ];
    return list;
  }, [locale, pathname, router, toggleLocale, openProject, showToast]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.group.toLowerCase().includes(q) ||
        (a.hint && a.hint.toLowerCase().includes(q))
    );
  }, [actions, query]);

  const safeIndex =
    filtered.length > 0 && selectedIndex < filtered.length ? selectedIndex : 0;

  useEffect(() => {
    if (!commandOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCommandOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(filtered.length, 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev <= 0 ? Math.max(filtered.length - 1, 0) : prev - 1
        );
      } else if (e.key === "Enter" && filtered[safeIndex]) {
        e.preventDefault();
        filtered[safeIndex].run();
        setCommandOpen(false);
        setQuery("");
        setSelectedIndex(0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [commandOpen, filtered, safeIndex, setCommandOpen]);

  return (
    <AnimatePresence>
      {commandOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCommandOpen(false)}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] bg-black/75 backdrop-blur-md px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl bg-[#0E0E13] hairline-strong shadow-[0_32px_100px_rgba(0,0,0,0.88)] overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08]">
              <Search className="w-4 h-4 text-[#FF5E1A] shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder={
                  locale === "pt"
                    ? "Buscar projeto, trocar modelo, idioma ou contato..."
                    : "Search projects, switch models, language, or links..."
                }
                className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setCommandOpen(false)}
                className="p-1 rounded-md text-zinc-500 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-10 text-center text-sm text-zinc-500 font-mono">
                  {locale === "pt" ? "Nenhum comando encontrado." : "No matching commands."}
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const prevGroup = idx > 0 ? filtered[idx - 1].group : null;
                  const showGroup = item.group !== prevGroup;
                  const active = idx === safeIndex;

                  return (
                    <React.Fragment key={item.id}>
                      {showGroup && (
                        <div className="px-3 pt-2.5 pb-1 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                          {item.group}
                        </div>
                      )}
                      <button
                        type="button"
                        onMouseEnter={() => setSelectedIndex(idx)}
                        onClick={() => {
                          item.run();
                          setCommandOpen(false);
                          setQuery("");
                        }}
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-colors cursor-pointer ${
                          active
                            ? "bg-white/[0.08] text-white"
                            : "text-zinc-300 hover:bg-white/[0.04]"
                        }`}
                      >
                        <span className="flex items-center gap-3 min-w-0">
                          {item.icon}
                          <span className="truncate">{item.label}</span>
                        </span>
                        {item.hint && (
                          <span className="font-mono text-[11px] text-zinc-500 shrink-0">
                            {item.hint}
                          </span>
                        )}
                      </button>
                    </React.Fragment>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.07] bg-[#0A0A0E] font-mono text-[11px] text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#FF5E1A]" />
                PROTHOTYPE Studio Palette
              </span>
              <span>↑↓ · Enter · Esc</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
