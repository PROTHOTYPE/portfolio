"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AppWindow,
  Bot,
  Camera,
  Cpu,
  HardDrive,
  Monitor,
  Pause,
  Play,
  Search,
  SkipBack,
  SkipForward,
  SlidersHorizontal,
  Sparkles,
  Wifi,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type IslandTab = "tasks" | "launcher" | "media";

const INDEXED_APPS = [
  { name: "Visual Studio Code", cat: "Desenvolvimento", catEn: "Development" },
  { name: "Terminal / PowerShell", cat: "Desenvolvimento", catEn: "Development" },
  { name: "Cafofo Desktop", cat: "Comunicação", catEn: "Communication" },
  { name: "Explorador de Arquivos", cat: "Sistema", catEn: "System" },
  { name: "Gerenciador de Tarefas", cat: "Sistema", catEn: "System" },
  { name: "Configurações do Windows", cat: "Sistema", catEn: "System" },
];

const REAL_SHOTS = [
  {
    src: "/projects/island-compact.png",
    label: { pt: "Cápsula Compacta", en: "Compact Pill" },
  },
  {
    src: "/projects/island-launcher.png",
    label: { pt: "Lançador (78+ Apps)", en: "Launcher (78+ Apps)" },
  },
  {
    src: "/projects/island-media.png",
    label: { pt: "Controles & Mídia", en: "Controls & Media" },
  },
  {
    src: "/projects/island-tasks.png",
    label: { pt: "Tarefas Ativas", en: "Active Tasks" },
  },
];

export function DynamicIslandSandbox() {
  const { locale, openProject, showToast } = useLanguage();
  const [viewMode, setViewMode] = useState<"simulator" | "screenshots">("simulator");
  const [expanded, setExpanded] = useState(true);
  const [tab, setTab] = useState<IslandTab>("launcher");
  const [query, setQuery] = useState("");
  const [taskbarHidden, setTaskbarHidden] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [cpu, setCpu] = useState(8);
  const [ram, setRam] = useState(61);
  const [shotIdx, setShotIdx] = useState(1);
  const [clock, setClock] = useState("21:42");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateClock();
    const id = window.setInterval(() => {
      updateClock();
      setCpu((prev) => Math.max(4, Math.min(28, prev + Math.round(Math.random() * 6 - 3))));
      setRam((prev) => Math.max(54, Math.min(72, prev + Math.round(Math.random() * 4 - 2))));
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  const filteredApps = INDEXED_APPS.filter((a) =>
    a.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div
      id="dynamic-island"
      className="rounded-3xl bg-[#0D0D12] border border-sky-400/20 overflow-hidden shadow-[0_28px_90px_rgba(0,0,0,0.75)]"
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#101016]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-sky-400">EXHIBIT 02</span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
              PYTHON · WIN32 API · WEBVIEW2
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <Bot className="w-3 h-3" />
              {locale === "pt" ? "Orquestrado com Agentes IA" : "AI-Agent Orchestrated"}
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
            Dynamic Island Win11 —{" "}
            <span className="font-serif italic font-normal text-zinc-300">
              {locale === "pt"
                ? "Overlay Nativo < 25 MB RAM"
                : "Native < 25 MB RAM Desktop Overlay"}
            </span>
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex p-0.5 rounded-lg bg-[#09090D] border border-white/[0.08] font-mono text-[11px]">
            <button
              type="button"
              onClick={() => setViewMode("simulator")}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === "simulator"
                  ? "bg-sky-500 text-slate-950 font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3 h-3" />
              {locale === "pt" ? "Simulador" : "Simulator"}
            </button>
            <button
              type="button"
              onClick={() => setViewMode("screenshots")}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === "screenshots"
                  ? "bg-sky-500 text-slate-950 font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Camera className="w-3 h-3" />
              {locale === "pt" ? "Capturas Reais" : "Real Captures"}
            </button>
          </div>

          <button
            type="button"
            onClick={() => openProject("dynamic-island")}
            className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            {locale === "pt" ? "Case Técnico →" : "Case Study →"}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-6 bg-[#07090F]">
        {viewMode === "simulator" ? (
          <div className="relative min-h-[410px] rounded-2xl border border-white/[0.08] bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.16),transparent_52%),linear-gradient(180deg,#0A0E17_0%,#07090E_100%)] p-4 sm:p-6 flex flex-col items-center justify-between overflow-hidden">
            {/* Top Instruction Hint */}
            <div className="w-full flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-3">
              <span>WINDOWS 11 · HWND_TOPMOST OVERLAY</span>
              <button
                type="button"
                onClick={() => setExpanded((e) => !e)}
                className="text-sky-300 hover:text-sky-200 underline underline-offset-4 cursor-pointer"
              >
                {expanded
                  ? locale === "pt"
                    ? "Recolher pílula"
                    : "Collapse pill"
                  : locale === "pt"
                  ? "Expandir ilha"
                  : "Expand island"}
              </button>
            </div>

            {/* Interactive Spring Dynamic Island */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 360, damping: 30 }}
              className={`relative z-10 bg-[#090B10]/95 backdrop-blur-2xl border border-white/15 shadow-[0_24px_70px_rgba(0,0,0,0.85)] overflow-hidden ${
                expanded
                  ? "w-full max-w-lg rounded-3xl p-4"
                  : "w-auto rounded-full px-5 py-2.5 cursor-pointer hover:border-sky-400/50"
              }`}
              onClick={() => {
                if (!expanded) setExpanded(true);
              }}
            >
              {!expanded ? (
                <div className="flex items-center gap-4 font-mono text-xs text-zinc-200 whitespace-nowrap">
                  <span className="inline-flex items-center gap-2 font-semibold text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    {clock}
                  </span>
                  <span className="text-zinc-600">|</span>
                  <span className="text-zinc-300">CPU {cpu}%</span>
                  <span className="text-zinc-600">|</span>
                  <span className="text-sky-400 font-semibold">RAM {ram}%</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Top Pill Tabs */}
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        {
                          id: "tasks",
                          icon: AppWindow,
                          label: locale === "pt" ? "Tarefas Ativas" : "Active Tasks",
                        },
                        {
                          id: "launcher",
                          icon: Search,
                          label: locale === "pt" ? "Lançador" : "Launcher",
                        },
                        {
                          id: "media",
                          icon: SlidersHorizontal,
                          label: locale === "pt" ? "Controles Mídia" : "Media & Stats",
                        },
                      ] as const
                    ).map((item) => {
                      const Icon = item.icon;
                      const active = tab === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setTab(item.id)}
                          className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                            active
                              ? "bg-sky-500/18 border-sky-400/45 text-white"
                              : "bg-white/[0.03] border-white/[0.06] text-zinc-400 hover:text-zinc-200"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Tab Panels */}
                  <AnimatePresence mode="wait">
                    {tab === "launcher" && (
                      <motion.div
                        key="launcher"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.16 }}
                        className="space-y-2.5"
                      >
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.09]">
                          <Search className="w-3.5 h-3.5 text-zinc-400" />
                          <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={
                              locale === "pt"
                                ? "Pesquisar entre 78+ programas reais..."
                                : "Search across 78+ indexed Windows apps..."
                            }
                            className="w-full bg-transparent text-xs text-white placeholder:text-zinc-500 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1.5 max-h-[168px] overflow-y-auto">
                          {filteredApps.map((app, i) => (
                            <button
                              key={app.name}
                              type="button"
                              onClick={() =>
                                showToast(
                                  locale === "pt"
                                    ? `Lançador Win32: abrindo ${app.name}`
                                    : `Win32 Launcher: opening ${app.name}`
                                )
                              }
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                                i === 0
                                  ? "bg-sky-500/15 border border-sky-400/35 text-white"
                                  : "bg-white/[0.03] border border-white/[0.05] text-zinc-300 hover:bg-white/[0.07]"
                              }`}
                            >
                              <span className="font-medium">{app.name}</span>
                              <span className="text-[11px] text-zinc-500">
                                {locale === "pt" ? app.cat : app.catEn}
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {tab === "tasks" && (
                      <motion.div
                        key="tasks"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.16 }}
                        className="space-y-2.5 py-2"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { app: "VS Code — portfolio-pedro", status: "Foco" },
                            { app: "Cafofo Desktop (Tauri)", status: "Em Call" },
                            { app: "Edge WebView2 Runtime", status: "21 MB" },
                            { app: "Windows Terminal (pwsh)", status: "Ativo" },
                          ].map((win) => (
                            <button
                              key={win.app}
                              type="button"
                              onClick={() =>
                                showToast(
                                  locale === "pt"
                                    ? `Foco alternado: ${win.app}`
                                    : `Switched window focus: ${win.app}`
                                )
                              }
                              className="text-left p-3 rounded-xl bg-white/[0.03] hover:bg-sky-500/12 border border-white/[0.07] hover:border-sky-400/35 transition-colors cursor-pointer"
                            >
                              <div className="text-xs font-medium text-white truncate">
                                {win.app}
                              </div>
                              <div className="font-mono text-[10px] text-sky-400 mt-1">
                                {win.status}
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {tab === "media" && (
                      <motion.div
                        key="media"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.16 }}
                        className="space-y-3"
                      >
                        <div className="grid grid-cols-4 gap-2 text-center font-mono">
                          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] py-2.5">
                            <div className="text-[10px] text-zinc-500 flex items-center justify-center gap-1">
                              <Cpu className="w-3 h-3" /> CPU
                            </div>
                            <div className="text-sm font-bold text-white mt-1">
                              {cpu}%
                            </div>
                          </div>
                          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] py-2.5">
                            <div className="text-[10px] text-zinc-500">RAM</div>
                            <div className="text-sm font-bold text-sky-400 mt-1">
                              {ram}%
                            </div>
                          </div>
                          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] py-2.5">
                            <div className="text-[10px] text-zinc-500 flex items-center justify-center gap-1">
                              <HardDrive className="w-3 h-3" /> C:
                            </div>
                            <div className="text-sm font-bold text-white mt-1">
                              64%
                            </div>
                          </div>
                          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] py-2.5">
                            <div className="text-[10px] text-zinc-500 flex items-center justify-center gap-1">
                              <Wifi className="w-3 h-3" /> NET
                            </div>
                            <div className="text-sm font-bold text-emerald-400 mt-1">
                              OK
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl bg-white/[0.03] border border-white/[0.07] p-3 flex items-center justify-between gap-3">
                          <div>
                            <div className="text-xs font-semibold text-white">
                              Windows Media Session
                            </div>
                            <div className="text-[11px] text-zinc-400">
                              Spotify · YouTube · Stremio
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => showToast("Previous Track")}
                              className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] text-zinc-200 cursor-pointer"
                            >
                              <SkipBack className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setPlaying((p) => !p)}
                              className="p-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 cursor-pointer"
                            >
                              {playing ? (
                                <Pause className="w-3.5 h-3.5" />
                              ) : (
                                <Play className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => showToast("Next Track")}
                              className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] text-zinc-200 cursor-pointer"
                            >
                              <SkipForward className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom Island Footer Controls */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px]">
                    <button
                      type="button"
                      onClick={() => setTaskbarHidden((h) => !h)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                        taskbarHidden
                          ? "bg-sky-500/15 border-sky-400/35 text-sky-300"
                          : "bg-white/[0.05] border-white/10 text-zinc-300"
                      }`}
                    >
                      <Monitor className="w-3 h-3" />
                      {locale === "pt"
                        ? `Barra Win11: ${taskbarHidden ? "Oculta" : "Visível"}`
                        : `Taskbar: ${taskbarHidden ? "Hidden" : "Visible"}`}
                    </button>

                    <button
                      type="button"
                      onClick={() => setExpanded(false)}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 cursor-pointer"
                    >
                      {locale === "pt" ? "Recolher" : "Collapse"}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Simulated Windows 11 Taskbar sliding in/out */}
            <div className="w-full mt-5 h-10 flex items-end justify-center">
              <AnimatePresence>
                {!taskbarHidden ? (
                  <motion.div
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 24, opacity: 0 }}
                    className="w-full rounded-xl bg-black/75 border border-white/10 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-zinc-400"
                  >
                    <span>Win11 Taskbar (Visível)</span>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded bg-sky-500/70" />
                      <span className="w-4 h-4 rounded bg-white/20" />
                      <span className="w-4 h-4 rounded bg-amber-400/60" />
                    </div>
                    <span>{clock}</span>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-mono text-[11px] text-zinc-500"
                  >
                    {locale === "pt"
                      ? "Barra de tarefas oculta nativamente — 100% de tela útil"
                      : "Native taskbar hidden — 100% clean vertical screen real estate"}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* Real Captures Gallery */
          <div className="rounded-2xl border border-white/[0.08] bg-[#06070B] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                {REAL_SHOTS.map((shot, idx) => (
                  <button
                    key={shot.src}
                    type="button"
                    onClick={() => setShotIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors cursor-pointer ${
                      shotIdx === idx
                        ? "bg-sky-500 text-slate-950 font-semibold"
                        : "bg-white/[0.05] text-zinc-300 hover:bg-white/[0.1]"
                    }`}
                  >
                    {locale === "pt" ? shot.label.pt : shot.label.en}
                  </button>
                ))}
              </div>
              <span className="font-mono text-[11px] text-zinc-500">
                100% Real DPI · Python + Edge WebView2
              </span>
            </div>

            <div className="min-h-[300px] flex items-center justify-center rounded-xl bg-[#0B0D14] border border-white/[0.06] p-6">
              <img
                src={REAL_SHOTS[shotIdx].src}
                alt={REAL_SHOTS[shotIdx].label.en}
                className="max-h-[310px] w-auto object-contain rounded-xl shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
