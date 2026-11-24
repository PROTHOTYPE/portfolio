"use client";

import React, { useState } from "react";
import {
  Building2,
  CheckCircle2,
  FileCheck2,
  FilePlus2,
  Monitor,
  Shield,
  Smartphone,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const SECTORS = [
  {
    code: "TI-SMEC",
    name: "Suporte e Manutenção de TI",
    role: "SUPER_ADMIN_TI · Pedro Carlos",
    done: 42,
    pending: 3,
  },
  {
    code: "ADM-RH",
    name: "Setor Administrativo / RH",
    role: "TRIAGEM_ADMIN_RH",
    done: 89,
    pending: 7,
  },
  {
    code: "PED-SMEC",
    name: "Setor Pedagógico (DEI / EJA)",
    role: "COORD_MEMBRO_SETOR",
    done: 64,
    pending: 5,
  },
  {
    code: "TRANS-SMEC",
    name: "Transporte Escolar & Univ.",
    role: "COORD_MEMBRO_SETOR",
    done: 37,
    pending: 2,
  },
  {
    code: "PREST-SMEC",
    name: "Prestação de Contas & Convênios",
    role: "EXECUTIVO_GESTAO",
    done: 28,
    pending: 1,
  },
];

export function PrismaSandbox() {
  const { locale, openProject, showToast } = useLanguage();
  const [viewport, setViewport] = useState<"web" | "mobile">("web");
  const [selectedSector, setSelectedSector] = useState(0);
  const [oficiosCount, setOficiosCount] = useState(118);
  const [pdfCompiled, setPdfCompiled] = useState(false);

  const sector = SECTORS[selectedSector];

  const handleRegisterOficio = () => {
    setOficiosCount((c) => c + 1);
    showToast(
      locale === "pt"
        ? `Ofício #2026/${oficiosCount + 1} protocolado pelo ADM-RH`
        : `Official Letter #2026/${oficiosCount + 1} registered by Admin/HR`
    );
  };

  const handleCompilePdf = () => {
    setPdfCompiled(true);
    showToast(
      locale === "pt"
        ? "Relatório Anual A4 PDF consolidado (15 setores)"
        : "Annual Official A4 PDF compiled (15 sectors)"
    );
  };

  return (
    <div
      id="prisma"
      className="rounded-3xl bg-[#0D0D12] border border-blue-500/20 overflow-hidden shadow-[0_28px_90px_rgba(0,0,0,0.75)]"
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#101016]">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
            <img
              src="/projects/prisma-logo.png"
              alt="PRISMA"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-blue-400">EXHIBIT 03</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                EXPO · REACT NATIVE WEB · SUPABASE
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
              PRISMA · SMEC Touros —{" "}
              <span className="font-serif italic font-normal text-zinc-300">
                {locale === "pt"
                  ? "Gestão Pública Multiplataforma"
                  : "Multi-Platform Municipal Ops"}
              </span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex p-0.5 rounded-lg bg-[#09090D] border border-white/[0.08] font-mono text-[11px]">
            <button
              type="button"
              onClick={() => setViewport("web")}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewport === "web"
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Monitor className="w-3 h-3" />
              Web
            </button>
            <button
              type="button"
              onClick={() => setViewport("mobile")}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewport === "mobile"
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-3 h-3" />
              Mobile
            </button>
          </div>

          <button
            type="button"
            onClick={() => openProject("prisma")}
            className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            {locale === "pt" ? "Case Técnico →" : "Case Study →"}
          </button>
        </div>
      </div>

      {/* Frosted Institutional Light Preview inside Dark Studio Frame */}
      <div className="p-4 sm:p-6 bg-[#080A10] flex justify-center">
        <div
          className={`transition-all duration-300 rounded-2xl overflow-hidden border border-blue-200/30 bg-gradient-to-br from-[#F4F6FA] via-[#EEF3FC] to-[#FEF9E7] text-slate-900 shadow-2xl ${
            viewport === "mobile" ? "w-full max-w-[360px]" : "w-full"
          }`}
        >
          {/* Institutional Topbar */}
          <div className="px-4 py-3 bg-white/85 backdrop-blur-md border-b border-slate-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/projects/prisma-logo.png"
                alt="PRISMA"
                className="w-7 h-7 object-contain"
              />
              <div>
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  PRISMA · SMEC Touros/RN
                </div>
                <div className="text-[10px] text-slate-500">
                  {locale === "pt"
                    ? "15 Setores Oficiais · Frosted Glass UI"
                    : "15 Official Sectors · Frosted Glass UI"}
                </div>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono text-[10px] font-semibold">
              <Shield className="w-3 h-3" />
              RBAC
            </span>
          </div>

          <div
            className={`p-4 grid gap-4 ${
              viewport === "mobile" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-12"
            }`}
          >
            {/* Sectors List */}
            <div className={viewport === "mobile" ? "" : "md:col-span-5 space-y-1.5"}>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <Building2 className="w-3 h-3 text-blue-700" />
                {locale === "pt"
                  ? "Organograma SMEC (selecione)"
                  : "SMEC Org Chart (select)"}
              </div>
              <div className="space-y-1.5">
                {SECTORS.map((s, idx) => {
                  const isActive = selectedSector === idx;
                  return (
                    <button
                      key={s.code}
                      type="button"
                      onClick={() => {
                        setSelectedSector(idx);
                        setPdfCompiled(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl border transition-colors duration-150 cursor-pointer ${
                        isActive
                          ? "bg-[#1D4ED8] text-white border-[#1E40AF] shadow-md"
                          : "bg-white text-slate-900 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className={isActive ? "text-white" : "text-slate-900"}>
                          {s.code}
                        </span>
                        <span
                          className={`font-mono text-[10px] px-1.5 py-0.5 rounded-md ${
                            isActive
                              ? "bg-white/15 text-amber-200"
                              : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          {s.done} OK
                        </span>
                      </div>
                      <div
                        className={`text-[11px] truncate mt-0.5 ${
                          isActive ? "text-blue-100" : "text-slate-600"
                        }`}
                      >
                        {s.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Sector Detail + Actions */}
            <div
              className={`${
                viewport === "mobile" ? "" : "md:col-span-7"
              } flex flex-col justify-between gap-3`}
            >
              <div className="rounded-xl bg-white/90 border border-slate-200 p-4 space-y-3 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-mono text-[10px] text-blue-700 font-semibold">
                      {sector.code} · {sector.role}
                    </div>
                    <h4 className="font-display font-bold text-base text-slate-900 mt-0.5">
                      {sector.name}
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-mono text-[10px] font-semibold">
                    {locale === "pt" ? "Homologado" : "Approved"}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-slate-50 border border-slate-200/80 p-2.5">
                    <div className="font-display font-bold text-lg text-blue-700">
                      {sector.done}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {locale === "pt" ? "Concluídas" : "Completed"}
                    </div>
                  </div>
                  <div className="rounded-lg bg-slate-50 border border-slate-200/80 p-2.5">
                    <div className="font-display font-bold text-lg text-amber-600">
                      {sector.pending}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {locale === "pt" ? "Em Trâmite" : "In Progress"}
                    </div>
                  </div>
                  <div className="rounded-lg bg-slate-50 border border-slate-200/80 p-2.5">
                    <div className="font-display font-bold text-lg text-slate-900">
                      {oficiosCount}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {locale === "pt" ? "Ofícios RH" : "HR Letters"}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleRegisterOficio}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <FilePlus2 className="w-3.5 h-3.5" />
                    {locale === "pt" ? "Protocolar Ofício" : "Log Official Letter"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCompilePdf}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <FileCheck2 className="w-3.5 h-3.5" />
                    {locale === "pt" ? "Compilar PDF A4" : "Compile A4 PDF"}
                  </button>
                </div>
              </div>

              {/* Simulated A4 Output Card */}
              <div
                className={`rounded-xl border p-3.5 transition-all ${
                  pdfCompiled
                    ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                    : "bg-white/75 border-slate-200 text-slate-600"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        pdfCompiled ? "text-emerald-600" : "text-slate-400"
                      }`}
                    />
                    {pdfCompiled
                      ? locale === "pt"
                        ? `Relatorio_Anual_${sector.code}_A4.pdf pronto`
                        : `Annual_Report_${sector.code}_A4.pdf ready`
                      : locale === "pt"
                      ? "Prévia do Relatório Anual de Prestação de Contas"
                      : "Annual Accountability PDF Export Preview"}
                  </span>
                  <span className="font-mono text-[10px]">expo-print</span>
                </div>
                <p className="text-[11px] mt-1 opacity-80">
                  {locale === "pt"
                    ? "Consolida ofícios do ADM-RH, demandas concluídas/parciais, justificativas formais e termo de assinatura oficial da SMEC."
                    : "Consolidates HR formal letters, completed/partial outcomes, formal justifications, and official SMEC signature lines."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
