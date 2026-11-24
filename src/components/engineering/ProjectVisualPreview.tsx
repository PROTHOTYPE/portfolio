"use client";

import React from "react";
import {
  BellRing,
  Cpu,
  FileText,
  Mic,
  MonitorUp,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { ProjectItem } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";

export function ProjectVisualPreview({ project }: { project: ProjectItem }) {
  const { locale } = useLanguage();

  if (project.id === "cafofo") {
    return (
      <div className="relative h-56 sm:h-60 w-full overflow-hidden rounded-xl bg-[#09090C] border border-white/[0.08] p-4 flex flex-col justify-between group-hover:border-red-500/30 transition-colors">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-red-600/18 blur-3xl"
        />
        <div className="flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>cafofo-desktop.exe</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            14 ms · GRU
          </span>
        </div>

        <div className="relative z-10 flex items-center justify-center gap-5 my-2">
          <div className="w-24 h-24 rounded-2xl bg-[#101015] border border-red-500/25 p-2.5 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.18)]">
            <img
              src="/projects/cafofo-logo-full.png"
              alt="Cafofo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="hidden sm:flex flex-col gap-2 flex-1 max-w-[230px]">
            <div className="rounded-lg bg-[#121218] border border-white/[0.07] px-3 py-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs text-zinc-200">
                <MonitorUp className="w-3.5 h-3.5 text-red-400" />
                <span>{locale === "pt" ? "Palco 16:9 Live" : "16:9 Live Stage"}</span>
              </span>
              <span className="font-mono text-[10px] text-red-400">60 FPS</span>
            </div>
            <div className="rounded-lg bg-[#121218] border border-white/[0.07] px-3 py-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs text-zinc-300">
                <Mic className="w-3.5 h-3.5 text-emerald-400" />
                <span>RNNoise · Rust DSP</span>
              </span>
              <span className="flex items-end gap-0.5 h-3">
                {[0.5, 0.9, 0.65, 1, 0.45].map((d, i) => (
                  <span
                    key={i}
                    className="w-0.5 h-full bg-red-400 rounded-full eq-bar"
                    style={{ animationDelay: `${i * 0.14}s`, opacity: d }}
                  />
                ))}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 border-t border-white/[0.06] pt-2.5">
          <span>TAURI v2 · AXUM · LIVEKIT · R2</span>
          <span className="text-zinc-300">cafofo.pages.dev</span>
        </div>
      </div>
    );
  }

  if (project.id === "prisma") {
    return (
      <div className="relative h-56 sm:h-60 w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#0F172A] via-[#101827] to-[#0B1120] border border-blue-400/20 p-4 flex flex-col justify-between group-hover:border-blue-400/40 transition-colors">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 -right-10 w-48 h-48 rounded-full bg-blue-500/20 blur-3xl"
        />
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-blue-200/80">SMEC TOUROS · RN</span>
          <span className="px-2 py-0.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300">
            Web · iOS · Android
          </span>
        </div>

        <div className="relative z-10 flex items-center gap-4 my-1">
          <div className="w-20 h-20 rounded-2xl bg-white p-2.5 shadow-[0_12px_32px_rgba(37,99,235,0.28)] shrink-0 flex items-center justify-center">
            <img
              src="/projects/prisma-logo.png"
              alt="PRISMA"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1 space-y-2 min-w-0">
            <div className="rounded-xl bg-[#F4F6FA] text-slate-900 p-2.5 shadow-lg">
              <div className="flex items-center justify-between text-[10px] font-mono text-blue-700 font-semibold">
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {locale === "pt" ? "RELATÓRIO ANUAL A4" : "ANNUAL A4 PDF"}
                </span>
                <span className="text-amber-600">
                  {locale === "pt" ? "15 SETORES" : "15 SECTORS"}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="h-1.5 flex-1 rounded-full bg-blue-600" />
                <span className="h-1.5 w-8 rounded-full bg-amber-400" />
                <span className="h-1.5 w-4 rounded-full bg-slate-300" />
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-slate-600">
                <span>{locale === "pt" ? "Ofícios + Demandas" : "Letters + Tasks"}</span>
                <span className="font-semibold text-slate-900">RBAC · TI</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-blue-200/60 border-t border-white/[0.08] pt-2.5">
          <span>EXPO · REACT NATIVE WEB · SUPABASE</span>
          <span className="text-amber-300">30+ {locale === "pt" ? "Escolas" : "Schools"}</span>
        </div>
      </div>
    );
  }

  if (project.id === "dynamic-island") {
    return (
      <div className="relative h-56 sm:h-60 w-full overflow-hidden rounded-xl bg-[#07090E] border border-sky-400/20 p-4 flex flex-col justify-between group-hover:border-sky-400/40 transition-colors">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-56 h-24 rounded-full bg-sky-500/20 blur-3xl"
        />
        {/* Real compact pill capture floating at top center */}
        <div className="relative z-10 flex flex-col items-center gap-2.5">
          <img
            src="/projects/island-compact.png"
            alt="Dynamic Island compact pill"
            className="h-7 w-auto object-contain rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.85)] border border-white/10"
          />
          <div className="w-full max-w-[300px] rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A0D14]">
            <img
              src="/projects/island-launcher.png"
              alt="Dynamic Island launcher real capture"
              className="w-full h-[112px] object-cover object-top"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 border-t border-white/[0.07] pt-2">
          <span className="inline-flex items-center gap-1 text-sky-300">
            <Sparkles className="w-3 h-3" />
            {locale === "pt" ? "Capturas reais Win11" : "Real Win11 captures"}
          </span>
          <span>&lt; 25 MB RAM · WEBVIEW2</span>
        </div>
      </div>
    );
  }

  // gpu-hunter
  return (
    <div className="relative h-56 sm:h-60 w-full overflow-hidden rounded-xl bg-[#0A0908] border border-amber-500/20 p-4 flex flex-col justify-between group-hover:border-amber-500/40 transition-colors">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-14 -right-12 w-52 h-52 rounded-full bg-amber-500/15 blur-3xl"
      />
      <div className="flex items-center justify-between text-[11px] font-mono">
        <span className="inline-flex items-center gap-1.5 text-amber-300">
          <Cpu className="w-3.5 h-3.5" />
          gpu-hunter.py --ranking
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">
          <BellRing className="w-3 h-3" />
          ntfy.sh
        </span>
      </div>

      <div className="space-y-1.5 font-mono text-[11px] my-1">
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/25">
          <span className="text-zinc-100">RX 6800 (16GB)</span>
          <span className="text-emerald-400 font-semibold">R$ 2.490 · OK</span>
        </div>
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.07]">
          <span className="text-zinc-300">RTX 4070 (12GB)</span>
          <span className="text-amber-300">R$ 2.899 · -9%</span>
        </div>
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-red-500/[0.06] border border-red-500/20 opacity-80">
          <span className="text-zinc-400 line-through">RX 6800 XT (16GB)</span>
          <span className="inline-flex items-center gap-1 text-red-400 text-[10px]">
            <ShieldCheck className="w-3 h-3" />
            CV650 BLOCK
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 border-t border-white/[0.07] pt-2">
        <span>0 TOKENS LOCAL + AI BROWSER INGEST</span>
        <span className="text-amber-400">&lt; R$ 3.000</span>
      </div>
    </div>
  );
}
