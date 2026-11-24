"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Download,
  Layers,
  Lock,
  Sparkles,
  X,
} from "lucide-react";
import { GithubIcon as Github } from "@/components/BrandIcons";
import { useLanguage } from "@/context/LanguageContext";

export function ProjectModal() {
  const { activeProject, closeProject, locale, t } = useLanguage();
  const [shotSelection, setShotSelection] = useState<{ id: string; index: number }>({
    id: "",
    index: 0,
  });

  const activeShot =
    activeProject && shotSelection.id === activeProject.id
      ? shotSelection.index
      : 0;

  useEffect(() => {
    if (!activeProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeProject, closeProject]);

  return (
    <AnimatePresence>
      {activeProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeProject}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6"
        >
          <motion.article
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0D0D11] hairline-strong shadow-[0_32px_120px_rgba(0,0,0,0.9)]"
          >
            {/* Top accent bar */}
            <div
              className="h-1 w-full"
              style={{
                background: `linear-gradient(90deg, ${activeProject.accentHex}, #FF5E1A, transparent)`,
              }}
            />

            {/* Sticky modal header */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/[0.07] bg-[#0D0D11]/95 backdrop-blur-xl px-6 py-4">
              <div className="flex items-center gap-3 min-w-0">
                {activeProject.logo ? (
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shrink-0 ${
                      activeProject.logoLightSurface
                        ? "bg-white p-1.5"
                        : "bg-[#16161C] border border-white/10 p-1"
                    }`}
                  >
                    <img
                      src={activeProject.logo}
                      alt={activeProject.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 border border-white/10"
                    style={{
                      backgroundColor: `${activeProject.accentHex}18`,
                      color: activeProject.accentHex,
                    }}
                  >
                    {activeProject.index}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-lg sm:text-xl font-bold text-white truncate">
                      {activeProject.name}
                    </h2>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-white/[0.06] text-zinc-300">
                      {activeProject.year}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 truncate">
                    {t(activeProject.subtitle)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeProject}
                aria-label={locale === "pt" ? "Fechar case" : "Close case study"}
                className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.12] text-zinc-300 hover:text-white transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Summary + Action links */}
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1 rounded-full border"
                    style={{
                      borderColor: `${activeProject.accentHex}40`,
                      backgroundColor: `${activeProject.accentHex}14`,
                      color: activeProject.accentHex,
                    }}
                  >
                    {t(activeProject.categoryLabel)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1 rounded-full bg-white/[0.04] text-zinc-300 border border-white/10">
                    {activeProject.visibility === "private" && (
                      <Lock className="w-3 h-3 text-zinc-400" />
                    )}
                    {t(activeProject.status)}
                  </span>
                </div>

                <p className="text-base sm:text-lg text-zinc-200 leading-relaxed">
                  {t(activeProject.summary)}
                </p>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-3">
                  {activeProject.metrics.map((metric, mIdx) => (
                    <div
                      key={mIdx}
                      className="rounded-xl bg-[#131319] hairline p-3.5 sm:p-4"
                    >
                      <div className="font-display text-lg sm:text-2xl font-bold text-white">
                        {typeof metric.value === "string"
                          ? metric.value
                          : t(metric.value)}
                      </div>
                      <div className="text-xs text-zinc-400 mt-0.5">
                        {t(metric.label)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Links */}
                {activeProject.links.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {activeProject.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          link.kind === "download" || link.kind === "live"
                            ? "bg-[#FF5E1A] hover:bg-[#ff7338] text-white shadow-[0_0_24px_rgba(255,94,26,0.3)]"
                            : "bg-white/[0.06] hover:bg-white/[0.12] text-zinc-100 border border-white/10"
                        }`}
                      >
                        {link.kind === "github" ? (
                          <Github className="w-4 h-4" />
                        ) : link.kind === "download" ? (
                          <Download className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                        {t(link.label)}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Transparent AI-Agent Orchestration Callout (Python Projects) */}
              {activeProject.aiOrchestrated && activeProject.aiNote && (
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.06] p-5 flex gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-amber-300">
                      <Sparkles className="w-3.5 h-3.5" />
                      {locale === "pt"
                        ? "Transparência de Engenharia · Orquestração com Agentes de IA"
                        : "Engineering Transparency · AI-Agent Orchestration"}
                    </div>
                    <p className="text-sm text-zinc-200 leading-relaxed">
                      {t(activeProject.aiNote)}
                    </p>
                  </div>
                </div>
              )}

              {/* Real Screenshot Gallery when available */}
              {activeProject.screenshots && activeProject.screenshots.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                      {locale === "pt"
                        ? "Capturas Reais do Projeto"
                        : "Real Project Captures"}
                    </h3>
                    <span className="font-mono text-[11px] text-zinc-500">
                      {activeShot + 1} / {activeProject.screenshots.length}
                    </span>
                  </div>

                  <div className="rounded-2xl bg-[#070709] hairline p-4 sm:p-6 flex flex-col items-center justify-center min-h-[240px]">
                    <img
                      src={activeProject.screenshots[activeShot].src}
                      alt={t(activeProject.screenshots[activeShot].caption)}
                      className="max-h-[320px] w-auto object-contain rounded-xl shadow-2xl"
                    />
                    <p className="text-xs text-zinc-400 mt-4 text-center">
                      {t(activeProject.screenshots[activeShot].caption)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {activeProject.screenshots.map((shot, idx) => (
                      <button
                        key={shot.src}
                        type="button"
                        onClick={() =>
                          setShotSelection({ id: activeProject.id, index: idx })
                        }
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                          activeShot === idx
                            ? "bg-[#FF5E1A] text-white"
                            : "bg-white/[0.04] text-zinc-400 hover:bg-white/[0.09] hover:text-zinc-200"
                        }`}
                      >
                        0{idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Problem vs Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#131319] hairline p-5 space-y-2">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-400">
                    {locale === "pt" ? "01 · O Problema" : "01 · The Problem"}
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {t(activeProject.problem)}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#131319] hairline p-5 space-y-2">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-[#FF5E1A]">
                    {locale === "pt"
                      ? "02 · Solução & Arquitetura"
                      : "02 · Solution & Architecture"}
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {t(activeProject.solution)}
                  </p>
                </div>
              </div>

              {/* Architecture Layers */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400">
                  <Layers className="w-3.5 h-3.5 text-[#FF5E1A]" />
                  {locale === "pt" ? "Mapa da Arquitetura" : "Architecture Map"}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeProject.architecture.map((node) => (
                    <div
                      key={node.layer}
                      className="rounded-xl bg-[#121218] hairline p-4 space-y-1.5"
                    >
                      <div className="font-mono text-xs font-semibold text-white">
                        {node.layer}
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {t(node.detail)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                  {locale === "pt"
                    ? "Destaques de Engenharia"
                    : "Engineering Highlights"}
                </h3>
                <ul className="space-y-2.5">
                  {activeProject.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-zinc-300 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#FF5E1A] shrink-0 mt-0.5" />
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack */}
              <div className="space-y-2.5 pt-2 border-t border-white/[0.07]">
                <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                  Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-3 py-1 rounded-lg bg-white/[0.04] text-zinc-200 border border-white/[0.07]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
