"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BellRing,
  Bot,
  CheckCircle2,
  Cpu,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SimulatedOffer {
  id: string;
  title: string;
  price: number;
  avg7d: number;
  source: "Hardmob RSS" | "Mercado Livre OAuth" | "AI Agent · OLX" | "AI Agent · Enjoei";
  is6800Xt?: boolean;
  is8gb?: boolean;
  isMobile?: boolean;
}

const SAMPLE_OFFERS: SimulatedOffer[] = [
  {
    id: "1",
    title: "Sapphire Pulse RX 6800 16GB GDDR6",
    price: 2490,
    avg7d: 2820,
    source: "AI Agent · OLX",
  },
  {
    id: "2",
    title: "ASUS Dual RTX 4070 12GB OC",
    price: 2899,
    avg7d: 3190,
    source: "Hardmob RSS",
  },
  {
    id: "3",
    title: "XFX Speedster RX 6800 XT 16GB",
    price: 2790,
    avg7d: 3050,
    source: "Mercado Livre OAuth",
    is6800Xt: true,
  },
  {
    id: "4",
    title: "PowerColor RX 9060 XT 8GB",
    price: 2399,
    avg7d: 2550,
    source: "Hardmob RSS",
    is8gb: true,
  },
  {
    id: "5",
    title: "Gigabyte RX 7700 XT 12GB Gaming OC",
    price: 2649,
    avg7d: 2940,
    source: "AI Agent · Enjoei",
  },
  {
    id: "6",
    title: "RTX 4070 12GB (Promoção Acima do Teto)",
    price: 3299,
    avg7d: 3350,
    source: "Mercado Livre OAuth",
  },
];

export function GpuHunterSandbox() {
  const { locale, openProject } = useLanguage();
  const [ceilingOn, setCeilingOn] = useState(true);
  const [cv650Guard, setCv650Guard] = useState(true);
  const [vramGuard, setVramGuard] = useState(true);
  const [sweeping, setSweeping] = useState(false);
  const [pushPreview, setPushPreview] = useState<string | null>(null);

  const evaluate = (offer: SimulatedOffer) => {
    if (cv650Guard && offer.is6800Xt) {
      return {
        pass: false,
        reason: locale === "pt" ? "BLOQ · CV650 (6800 XT)" : "BLOCKED · CV650 PSU",
      };
    }
    if (vramGuard && offer.is8gb) {
      return {
        pass: false,
        reason: locale === "pt" ? "BLOQ · Exige 16GB" : "BLOCKED · 16GB Req",
      };
    }
    if (ceilingOn && offer.price >= 3000) {
      return {
        pass: false,
        reason: locale === "pt" ? "BLOQ · >= R$ 3.000" : "BLOCKED · >= R$ 3,000",
      };
    }
    const diffPct = Math.round(((offer.avg7d - offer.price) / offer.avg7d) * 100);
    return {
      pass: true,
      reason: `-${diffPct}% vs 7d`,
    };
  };

  const handleRunSweep = () => {
    setSweeping(true);
    window.setTimeout(() => {
      setSweeping(false);
      setPushPreview(
        locale === "pt"
          ? "ntfy.sh -> ALERTA GPU: RX 6800 16GB por R$ 2.490 (-12% vs média 7d) · Compatível CV650!"
          : "ntfy.sh -> GPU ALERT: RX 6800 16GB at R$ 2,490 (-12% vs 7d avg) · CV650 Safe!"
      );
      window.setTimeout(() => setPushPreview(null), 4200);
    }, 650);
  };

  const passedCount = SAMPLE_OFFERS.filter((o) => evaluate(o).pass).length;

  return (
    <div
      id="gpu-hunter"
      className="rounded-3xl bg-[#0D0D12] border border-amber-500/25 overflow-hidden shadow-[0_28px_90px_rgba(0,0,0,0.75)]"
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#101016]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-amber-400">EXHIBIT 04</span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
              PYTHON · SQLITE · PLAYWRIGHT · NTFY.SH
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <Bot className="w-3 h-3" />
              {locale === "pt" ? "Orquestrado com Agentes IA" : "AI-Agent Orchestrated"}
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
            GPU Hunter BR —{" "}
            <span className="font-serif italic font-normal text-zinc-300">
              {locale === "pt"
                ? "Radar de Ofertas & Guardrails de Fonte CV650"
                : "Deal Radar & CV650 PSU Hardware Guardrails"}
            </span>
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleRunSweep}
            disabled={sweeping}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${sweeping ? "animate-spin" : ""}`} />
            {locale === "pt" ? "Simular Varredura + Push" : "Run Sweep + Push"}
          </button>
          <button
            type="button"
            onClick={() => openProject("gpu-hunter")}
            className="px-3 py-2 rounded-xl border border-white/10 hover:border-white/25 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            {locale === "pt" ? "Case Técnico →" : "Case Study →"}
          </button>
        </div>
      </div>

      {/* Console Body */}
      <div className="p-4 sm:p-6 bg-[#080809] space-y-4">
        {/* Guardrail Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#111116] border border-white/[0.07] p-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] text-zinc-400 mr-1">
              config.yaml:
            </span>
            <button
              type="button"
              onClick={() => setCeilingOn((v) => !v)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] border transition-colors cursor-pointer ${
                ceilingOn
                  ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                  : "bg-white/[0.04] border-white/10 text-zinc-500"
              }`}
            >
              &lt; R$ 3.000 {ceilingOn ? "✓" : "OFF"}
            </button>
            <button
              type="button"
              onClick={() => setCv650Guard((v) => !v)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] border transition-colors cursor-pointer ${
                cv650Guard
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                  : "bg-white/[0.04] border-white/10 text-zinc-500"
              }`}
            >
              CV650 Block 6800 XT {cv650Guard ? "✓" : "OFF"}
            </button>
            <button
              type="button"
              onClick={() => setVramGuard((v) => !v)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] border transition-colors cursor-pointer ${
                vramGuard
                  ? "bg-sky-500/15 border-sky-500/40 text-sky-300"
                  : "bg-white/[0.04] border-white/10 text-zinc-500"
              }`}
            >
              Block 9060 XT 8GB {vramGuard ? "✓" : "OFF"}
            </button>
          </div>

          <div className="font-mono text-[11px] text-zinc-400">
            <span className="text-emerald-400 font-semibold">{passedCount}</span> /{" "}
            {SAMPLE_OFFERS.length} {locale === "pt" ? "aprovadas" : "passed"}
          </div>
        </div>

        {/* Simulated Push Notification Banner */}
        <AnimatePresence>
          {pushPreview && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="rounded-xl bg-amber-500/15 border border-amber-400/40 px-4 py-3 flex items-center gap-3 text-xs font-mono text-amber-200"
            >
              <BellRing className="w-4 h-4 text-amber-400 shrink-0 animate-bounce" />
              <span>{pushPreview}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Filtered Offers Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {SAMPLE_OFFERS.map((offer) => {
            const verdict = evaluate(offer);
            return (
              <div
                key={offer.id}
                className={`rounded-xl border p-3.5 transition-all ${
                  verdict.pass
                    ? "bg-[#121218] border-white/[0.09]"
                    : "bg-red-950/15 border-red-500/20 opacity-65"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                      <Cpu className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className={verdict.pass ? "" : "line-through text-zinc-400"}>
                        {offer.title}
                      </span>
                    </div>
                    <div className="font-mono text-[10px] text-zinc-500 mt-1 flex items-center gap-2">
                      <span>{offer.source}</span>
                      <span>·</span>
                      <span>
                        7d avg: R$ {offer.avg7d.toLocaleString("pt-BR")}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-mono text-sm font-bold text-white">
                      R$ {offer.price.toLocaleString("pt-BR")}
                    </div>
                    <span
                      className={`mt-1 inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-full ${
                        verdict.pass
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                          : "bg-red-500/15 text-red-300 border border-red-500/30"
                      }`}
                    >
                      {verdict.pass ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <ShieldAlert className="w-3 h-3" />
                      )}
                      {verdict.reason}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hybrid Zero-Token + AI Agent Architecture Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs font-mono">
          <div className="rounded-xl bg-[#111116] border border-white/[0.06] px-3.5 py-2.5 flex items-center gap-2.5 text-zinc-300">
            <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {locale === "pt"
                ? "Loop 10 min local = 0 tokens"
                : "10-min local loop = 0 tokens"}
            </span>
          </div>
          <div className="rounded-xl bg-[#111116] border border-white/[0.06] px-3.5 py-2.5 flex items-center gap-2.5 text-zinc-300">
            <Bot className="w-4 h-4 text-amber-400 shrink-0" />
            <span>--ingest ofertas.json (AI Agent)</span>
          </div>
          <div className="rounded-xl bg-[#111116] border border-white/[0.06] px-3.5 py-2.5 flex items-center gap-2.5 text-zinc-300">
            <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
            <span>i5-12400 + Corsair CV650</span>
          </div>
        </div>
      </div>
    </div>
  );
}
