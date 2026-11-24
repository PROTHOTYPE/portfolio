"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  Briefcase,
  Check,
  Clock,
  Copy,
  Cpu,
  Layers,
  Mail,
  Sparkles,
  Wrench,
} from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "@/components/BrandIcons";
import { PROFILE } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";
import { SpotlightCard } from "@/components/SpotlightCard";
import { RichText } from "@/components/RichText";
import { CafofoSandbox } from "@/components/lab/CafofoSandbox";
import { DynamicIslandSandbox } from "@/components/lab/DynamicIslandSandbox";
import { PrismaSandbox } from "@/components/lab/PrismaSandbox";
import { GpuHunterSandbox } from "@/components/lab/GpuHunterSandbox";

export function LabView() {
  const { locale, t, showToast } = useLanguage();
  const [pointer, setPointer] = useState({ x: 50, y: 20 });
  const [localTime, setLocalTime] = useState("--:--:--");
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const tick = () => {
      try {
        const formatted = new Intl.DateTimeFormat("pt-BR", {
          timeZone: "America/Fortaleza",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date());
        setLocalTime(formatted);
      } catch {
        setLocalTime(new Date().toLocaleTimeString());
      }
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const handleHeroMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPointer({ x, y });
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopiedEmail(true);
    showToast(
      locale === "pt"
        ? "E-mail copiado para a área de transferência!"
        : "Email copied to clipboard!"
    );
    window.setTimeout(() => setCopiedEmail(false), 2000);
  };

  const pillars = [
    {
      num: "01",
      icon: Layers,
      title: {
        pt: "Restrições Reais como Combustível",
        en: "Real Constraints as Design Fuel",
      },
      body: {
        pt: "Cada projeto nasce de uma dor concreta: menos de 25 MB de RAM na Dynamic Island, proteção elétrica da fonte CV650 no GPU Hunter, latência GRU no Cafofo e 15 setores reais no PRISMA.",
        en: "Every build starts from a concrete constraint: < 25 MB RAM on Dynamic Island, Corsair CV650 PSU safety in GPU Hunter, GRU latency in Cafofo, and 15 real public sectors in PRISMA.",
      },
    },
    {
      num: "02",
      icon: Bot,
      title: {
        pt: "Orquestração Pragmática de Agentes de IA",
        en: "Pragmatic AI-Agent Orchestration",
      },
      body: {
        pt: "Nos projetos em Python, orquestro agentes de IA para acelerar automações, scraping estruturado e validação multi-DPI — mantendo direção arquitetural, testes e controle total de custos (loop local 0-tokens).",
        en: "Across Python builds, I orchestrate AI agents to accelerate automation, structured scraping, and multi-DPI testing — while owning architecture, automated tests, and 0-token local loops.",
      },
    },
    {
      num: "03",
      icon: Wrench,
      title: {
        pt: "Software Entregue, Não Só Protótipo",
        en: "Shipped Software, Not Just Mockups",
      },
      body: {
        pt: "Do binário `.exe` assinado no Cloudflare R2 ao relatório A4 usado em secretaria pública: o objetivo do laboratório é colocar ideias nas mãos de pessoas reais.",
        en: "From signed `.exe` releases on Cloudflare R2 to official A4 accountability PDFs in public administration: the studio exists to ship software people actually run.",
      },
    },
  ];

  return (
    <div className="relative">
      {/* KINETIC INTERACTIVE HERO */}
      <section
        onMouseMove={handleHeroMove}
        className="relative overflow-hidden border-b border-white/[0.07]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 studio-grid opacity-80"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(640px circle at ${pointer.x}% ${pointer.y}%, rgba(255,94,26,0.16), transparent 62%)`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-14 sm:pb-20 space-y-10">
          {/* Top Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF5E1A]/12 border border-[#FF5E1A]/35 text-[#FF5E1A]">
                <Sparkles className="w-3 h-3" />
                {locale === "pt"
                  ? "MODELO 02 · VITRINE & LABORATÓRIO CRIATIVO"
                  : "MODEL 02 · PERSONAL SHOWCASE & CREATIVE LAB"}
              </span>
              <span className="hidden sm:inline text-zinc-500">
                {PROFILE.coordinates}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                NATAL/RN · {localTime}
              </span>
              <span className="hidden sm:inline text-emerald-400">
                ● 04 EXHIBITS ONLINE
              </span>
            </div>
          </div>

          {/* Giant Editorial Display Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <h1 className="font-display text-[clamp(2.75rem,7.2vw,5.6rem)] font-extrabold tracking-[-0.045em] leading-[0.95] text-white break-words">
              <span className="inline-block">
                PROTHO
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E1A] via-amber-400 to-white">
                  TYPE
                </span>
              </span>
              <span className="font-serif italic font-normal text-[clamp(1.75rem,4vw,3.4rem)] text-zinc-300 tracking-normal block mt-2">
                {locale === "pt" ? "— laboratório de builds." : "— creative software lab."}
              </span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pt-2">
              <p className="lg:col-span-7 text-base sm:text-lg text-zinc-300 leading-relaxed">
                {t(PROFILE.labBio)}
              </p>

              <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-2.5">
                <a
                  href="#exhibits"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FF5E1A] hover:bg-[#ff7338] text-white text-sm font-semibold transition-all shadow-[0_0_28px_rgba(255,94,26,0.35)]"
                >
                  <Cpu className="w-4 h-4" />
                  {locale === "pt"
                    ? "Testar 4 Simuladores"
                    : "Play 4 Live Sandboxes"}
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#14141B] hover:bg-[#1C1C26] border border-white/[0.1] text-zinc-200 text-sm font-medium transition-colors"
                >
                  <Briefcase className="w-4 h-4 text-[#FF5E1A]" />
                  {locale === "pt" ? "Versão Recrutadores" : "Recruiter Version"}
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Interactive Exhibit Quick-Jump Dock */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
            {[
              {
                href: "#cafofo",
                num: "01",
                name: "Cafofo",
                sub: "Rust · Tauri · LiveKit",
                dot: "bg-red-500",
              },
              {
                href: "#dynamic-island",
                num: "02",
                name: "Dynamic Island",
                sub: "Python · Win32 · AI",
                dot: "bg-sky-400",
              },
              {
                href: "#prisma",
                num: "03",
                name: "PRISMA",
                sub: "Expo · Supabase · A4",
                dot: "bg-blue-500",
              },
              {
                href: "#gpu-hunter",
                num: "04",
                name: "GPU Hunter BR",
                sub: "Python · CV650 · AI",
                dot: "bg-amber-400",
              },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group rounded-2xl bg-[#101015]/90 hover:bg-[#17171F] border border-white/[0.08] hover:border-white/20 p-4 transition-all flex items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                    <span>EXHIBIT {item.num}</span>
                  </div>
                  <div className="font-display font-bold text-sm sm:text-base text-white mt-1 truncate group-hover:text-[#FF5E1A] transition-colors">
                    {item.name}
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 truncate mt-0.5">
                    {item.sub}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE EXHIBITS */}
      <section
        id="exhibits"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5E1A]">
              {locale === "pt"
                ? "PLAYGROUND INTERATIVO"
                : "INTERACTIVE PLAYGROUND"}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              {locale === "pt" ? (
                <>
                  Experimente cada projeto{" "}
                  <span className="font-serif italic font-normal text-zinc-300">
                    em tempo real
                  </span>
                </>
              ) : (
                <>
                  Experience each build{" "}
                  <span className="font-serif italic font-normal text-zinc-300">
                    hands-on
                  </span>
                </>
              )}
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-500 max-w-xs sm:text-right">
            {locale === "pt"
              ? "Clique nos botões, alterne abas, teste filtros e inspecione a arquitetura técnica completa."
              : "Click controls, switch views, toggle guardrails, and open full technical deep dives."}
          </p>
        </div>

        <div className="space-y-10">
          <CafofoSandbox />
          <DynamicIslandSandbox />
          <PrismaSandbox />
          <GpuHunterSandbox />
        </div>
      </section>

      {/* STUDIO MANIFESTO: HUMAN ARCHITECTURE x AI-AGENT ORCHESTRATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-white/[0.07]">
        <div className="max-w-2xl space-y-2 mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400">
            {locale === "pt" ? "MANIFESTO DO ESTÚDIO" : "STUDIO MANIFESTO"}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            {locale === "pt" ? (
              <>
                Arquitetura humana{" "}
                <span className="font-serif italic font-normal text-[#FF5E1A]">
                  × agentes de IA
                </span>
              </>
            ) : (
              <>
                Human architecture{" "}
                <span className="font-serif italic font-normal text-[#FF5E1A]">
                  × AI agents
                </span>
              </>
            )}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <SpotlightCard key={pillar.num} className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#FF5E1A]">
                    {pillar.num}
                  </span>
                  <Icon className="w-4 h-4 text-zinc-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  {t(pillar.title)}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  <RichText text={t(pillar.body)} />
                </p>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* LAB FOOTER + BRIDGE BACK TO MODEL 01 */}
      <footer className="border-t border-white/[0.07] bg-[#060608]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs text-[#FF5E1A] hover:underline underline-offset-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {locale === "pt"
                ? "Voltar ao Modelo 01 (Engenharia & Currículo)"
                : "Back to Model 01 (Engineering & Career)"}
            </Link>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {PROFILE.fullName} ·{" "}
              <span className="font-serif italic font-normal text-zinc-300">
                PROTHOTYPE
              </span>
            </h2>
            <p className="text-sm text-zinc-400">{t(PROFILE.location)}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#14141A] hover:bg-[#1C1C26] border border-white/[0.1] text-sm text-white transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#FF5E1A]" />
              <span>{PROFILE.email}</span>
              {copiedEmail ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
              )}
            </button>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#14141A] hover:bg-[#1C1C26] border border-white/[0.1] text-sm text-zinc-200 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#14141A] hover:bg-[#1C1C26] border border-white/[0.1] text-sm text-zinc-200 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-sky-400" />
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
