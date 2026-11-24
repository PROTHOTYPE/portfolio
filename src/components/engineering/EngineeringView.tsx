"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Briefcase,
  Check,
  Copy,
  Download,
  FlaskConical,
  GraduationCap,
  Layers,
  Lock,
  Mail,
  MapPin,
  Sparkles,
  Terminal,
} from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "@/components/BrandIcons";
import {
  CAPABILITIES,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  type ProjectItem,
} from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";
import { SpotlightCard } from "@/components/SpotlightCard";
import { ProjectVisualPreview } from "@/components/engineering/ProjectVisualPreview";

type FilterCategory = "all" | ProjectItem["category"];

export function EngineeringView() {
  const { locale, t, openProject, showToast } = useLanguage();
  const [filter, setFilter] = useState<FilterCategory>("all");
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Subtle 3D tilt for hero dossier card
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 170, damping: 24 });
  const sy = useSpring(my, { stiffness: 170, damping: 24 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-5, 5]);

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleCardLeave = () => {
    mx.set(0);
    my.set(0);
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

  const visibleProjects =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === filter);

  const filterOptions: { id: FilterCategory; label: { pt: string; en: string } }[] = [
    { id: "all", label: { pt: "Todos (04)", en: "All (04)" } },
    {
      id: "fullstack-desktop",
      label: { pt: "Rust & Desktop", en: "Rust & Desktop" },
    },
    { id: "mobile-web", label: { pt: "Web & Mobile", en: "Web & Mobile" } },
    {
      id: "python-ai",
      label: { pt: "Python + Agentes IA", en: "Python + AI Agents" },
    },
  ];

  return (
    <div className="relative">
      {/* Ambient top ember studio wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-[560px] studio-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_80%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[8%] w-[520px] h-[520px] rounded-full bg-[#FF5E1A]/[0.09] blur-[140px]"
      />

      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Editorial Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-7"
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#121217] border border-white/[0.09] text-xs text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{t(PROFILE.availability)}</span>
            </div>

            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                {PROFILE.fullName} · {t(PROFILE.role)}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl xl:text-[3.85rem] font-bold tracking-[-0.03em] leading-[1.03] text-white">
                {locale === "pt" ? (
                  <>
                    Construo software{" "}
                    <span className="font-serif italic font-normal text-[#FF5E1A] tracking-normal">
                      rápido, real
                    </span>{" "}
                    e feito para produção.
                  </>
                ) : (
                  <>
                    Building software that is{" "}
                    <span className="font-serif italic font-normal text-[#FF5E1A] tracking-normal">
                      fast, real
                    </span>{" "}
                    and production-ready.
                  </>
                )}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl">
              {t(PROFILE.bio)}
            </p>

            {/* Primary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FF5E1A] hover:bg-[#ff7338] text-white text-sm font-semibold transition-all shadow-[0_0_28px_rgba(255,94,26,0.35)]"
              >
                <span>
                  {locale === "pt" ? "Explorar Projetos" : "Explore Projects"}
                </span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <Link
                href="/lab"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#14141A] hover:bg-[#1C1C25] border border-white/[0.11] text-zinc-100 text-sm font-medium transition-all"
              >
                <FlaskConical className="w-4 h-4 text-amber-400" />
                <span>
                  {locale === "pt"
                    ? "Laboratório (PROTHOTYPE)"
                    : "Interactive Lab (PROTHOTYPE)"}
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </Link>

              <a
                href="/Pedro-Carlos-Teixeira-Neto-Curriculo.pdf"
                download="Pedro-Carlos-Teixeira-Neto-Curriculo.pdf"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.1] text-zinc-200 hover:text-white text-sm font-medium transition-all"
              >
                <Download className="w-4 h-4 text-[#FF5E1A]" />
                <span>{locale === "pt" ? "Currículo PDF" : "Resume PDF"}</span>
              </a>
            </div>

            {/* Direct Contact Strip */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 border-t border-white/[0.07] text-xs font-mono text-zinc-400">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                github.com/PROTHOTYPE
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                linkedin.com/in/pedrocartneto
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 hover:text-[#FF5E1A] transition-colors cursor-pointer"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {PROFILE.email}
              </button>
            </div>
          </motion.div>

          {/* Right Interactive Engineering Dossier Card */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            ref={cardRef}
            onMouseMove={handleCardMove}
            onMouseLeave={handleCardLeave}
            style={{ perspective: 1100 }}
            className="lg:col-span-5"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="rounded-3xl bg-[#101015] hairline-strong p-6 sm:p-7 shadow-[0_28px_90px_rgba(0,0,0,0.75)] space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#FF5E1A]">
                    {locale === "pt" ? "MODELO 01 · DOSSIÊ TÉCNICO" : "MODEL 01 · ENGINEER DOSSIER"}
                  </div>
                  <div className="font-display font-bold text-lg text-white mt-0.5">
                    {PROFILE.shortName}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] font-mono text-[11px] text-zinc-300">
                  PT-BR · EN
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#15151C] hairline p-4">
                  <div className="font-display text-2xl font-bold text-white">
                    {locale === "pt" ? "~3 Anos" : "~3 Years"}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">
                    {locale === "pt"
                      ? "TI, Infra & Desenvolvimento"
                      : "IT Ops & Software Dev"}
                  </div>
                </div>
                <div className="rounded-2xl bg-[#15151C] hairline p-4">
                  <div className="font-display text-2xl font-bold text-[#FF5E1A]">30+</div>
                  <div className="text-xs text-zinc-400 mt-1">
                    {locale === "pt"
                      ? "Escolas municipais atendidas"
                      : "Municipal schools supported"}
                  </div>
                </div>
                <div className="rounded-2xl bg-[#15151C] hairline p-4">
                  <div className="font-display text-xl font-bold text-white">Rust + TS</div>
                  <div className="text-xs text-zinc-400 mt-1">
                    Tauri v2 · Axum · React · Expo
                  </div>
                </div>
                <div className="rounded-2xl bg-[#15151C] hairline p-4">
                  <div className="font-display text-xl font-bold text-amber-400">SQL + Cloud</div>
                  <div className="text-xs text-zinc-400 mt-1">
                    PostgreSQL · Supabase · R2
                  </div>
                </div>
              </div>

              {/* Transparent AI-Assisted Python Workflow Highlight */}
              <div className="rounded-2xl bg-amber-500/[0.06] border border-amber-500/25 p-4 flex items-start gap-3">
                <Bot className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-zinc-300 leading-relaxed">
                  <span className="font-semibold text-amber-300">
                    {locale === "pt"
                      ? "Engenharia com Agentes de IA: "
                      : "AI-Agent Orchestration: "}
                  </span>
                  {locale === "pt"
                    ? "Os projetos em Python (Dynamic Island & GPU Hunter BR) são orquestrados com agentes de IA para automação, testes e coleta híbrida."
                    : "Python projects (Dynamic Island & GPU Hunter BR) are orchestrated with AI agents for automation, testing, and hybrid data sweeps."}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5E1A]" />
                  Natal / Touros, RN
                </span>
                <span className="font-mono text-[11px] text-zinc-500">
                  {PROFILE.coordinates}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SELECTED PROJECTS / CASE STUDIES */}
      <section
        id="projects"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-white/[0.07]"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5E1A]">
              {locale === "pt" ? "01 · VITRINE DE PROJETOS" : "01 · SELECTED WORK"}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {locale === "pt" ? (
                <>
                  Sistemas construídos{" "}
                  <span className="font-serif italic font-normal text-zinc-300">
                    de ponta a ponta
                  </span>
                </>
              ) : (
                <>
                  Systems engineered{" "}
                  <span className="font-serif italic font-normal text-zinc-300">
                    end to end
                  </span>
                </>
              )}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setFilter(opt.id)}
                className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                  filter === opt.id
                    ? "bg-[#FF5E1A] text-white shadow-[0_0_20px_rgba(255,94,26,0.3)]"
                    : "bg-[#121217] text-zinc-400 border border-white/[0.08] hover:text-white hover:border-white/20"
                }`}
              >
                {t(opt.label)}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Case Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {visibleProjects.map((project, idx) => (
            <motion.div
              key={`${filter}-${project.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: idx * 0.04 }}
            >
              <SpotlightCard
                spotlightColor={`${project.accentHex}22`}
                className="group h-full p-5 sm:p-6 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  {/* Top visual */}
                  <ProjectVisualPreview project={project} />

                  {/* Meta & badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-zinc-500">
                        {project.index}
                      </span>
                      <span
                        className="font-mono text-[11px] px-2.5 py-0.5 rounded-full border"
                        style={{
                          borderColor: `${project.accentHex}45`,
                          backgroundColor: `${project.accentHex}14`,
                          color: project.accentHex,
                        }}
                      >
                        {t(project.categoryLabel)}
                      </span>
                      {project.aiOrchestrated && (
                        <span className="inline-flex items-center gap-1 font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/12 border border-amber-500/30 text-amber-300">
                          <Bot className="w-3 h-3" />
                          {locale === "pt" ? "Agentes IA" : "AI Agents"}
                        </span>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-500">
                      {project.visibility === "private" && (
                        <Lock className="w-3 h-3" />
                      )}
                      {project.year}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#FF5E1A] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {t(project.tagline)}
                    </p>
                  </div>

                  {/* Metrics strip */}
                  <div className="grid grid-cols-3 gap-2.5 pt-1">
                    {project.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="rounded-xl bg-[#0B0B0F] border border-white/[0.06] px-3 py-2.5"
                      >
                        <div className="font-mono text-xs sm:text-sm font-semibold text-white">
                          {typeof metric.value === "string"
                            ? metric.value
                            : t(metric.value)}
                        </div>
                        <div className="text-[11px] text-zinc-500 truncate mt-0.5">
                          {t(metric.label)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 6 && (
                      <span className="font-mono text-[11px] px-2.5 py-1 rounded-md text-zinc-500">
                        +{project.stack.length - 6}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-6 pt-4 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => openProject(project.id)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#FF5E1A] transition-colors cursor-pointer"
                  >
                    <span>
                      {locale === "pt"
                        ? "Abrir Case Técnico"
                        : "Read Technical Case Study"}
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  <div className="flex flex-wrap items-center gap-2">
                    {project.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.11] text-xs font-mono text-zinc-200 transition-colors"
                      >
                        {link.kind === "github" ? (
                          <Github className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#FF5E1A]" />
                        )}
                        <span>
                          {link.kind === "github"
                            ? "GitHub"
                            : link.kind === "download"
                            ? locale === "pt"
                              ? "Site"
                              : "Landing"
                            : "Live"}
                        </span>
                      </a>
                    ))}
                    {project.links.length === 0 && (
                      <Link
                        href={`/lab#${project.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 text-xs font-mono text-amber-300 transition-colors"
                      >
                        <FlaskConical className="w-3.5 h-3.5" />
                        <span>
                          {locale === "pt" ? "Testar no Lab" : "Try in Lab"}
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CAPABILITIES & STACK MATRIX */}
      <section
        id="capabilities"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-white/[0.07]"
      >
        <div className="max-w-2xl space-y-2 mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5E1A]">
            {locale === "pt" ? "02 · STACK & CAPACIDADES" : "02 · STACK & CAPABILITIES"}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {locale === "pt"
              ? "Da interface ao binário nativo e banco em produção."
              : "From polished UI to native binaries and production databases."}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CAPABILITIES.map((cap) => (
            <SpotlightCard key={cap.code} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#FF5E1A]">
                  {cap.code}
                </span>
                <Layers className="w-4 h-4 text-zinc-500" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display text-xl font-bold text-white">
                  {t(cap.title)}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {t(cap.description)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {cap.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs px-2.5 py-1 rounded-lg bg-[#0B0B0F] border border-white/[0.07] text-zinc-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* EXPERIENCE & EDUCATION */}
      <section
        id="experience"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-white/[0.07]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5E1A]">
                {locale === "pt" ? "03 · EXPERIÊNCIA" : "03 · EXPERIENCE"}
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {locale === "pt" ? "Trajetória Profissional" : "Professional Track"}
              </h2>
            </div>

            <div className="space-y-6">
              {EXPERIENCE.map((exp, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#111115] hairline p-6 space-y-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-[#FF5E1A]" />
                        {t(exp.role)}
                      </h3>
                      <p className="text-sm text-zinc-400 mt-0.5">
                        {t(exp.org)} · {t(exp.location)}
                      </p>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/[0.05] text-zinc-300 border border-white/[0.07]">
                      {t(exp.period)}
                    </span>
                  </div>

                  <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1A] mt-2 shrink-0" />
                        <span>{t(bullet)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
                {locale === "pt" ? "FORMAÇÃO & IDIOMAS" : "EDUCATION & LANGUAGES"}
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                {locale === "pt" ? "Base Acadêmica" : "Academic Foundation"}
              </h3>
            </div>

            <div className="space-y-4">
              {EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#111115] hairline p-5 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <GraduationCap className="w-4 h-4 text-[#FF5E1A]" />
                    <span className="font-mono text-[11px] text-zinc-400">
                      {t(edu.period)}
                    </span>
                  </div>
                  <div className="font-display font-semibold text-base text-white">
                    {t(edu.degree)}
                  </div>
                  <div className="text-xs text-zinc-400">{edu.school}</div>
                </div>
              ))}

              <div className="rounded-2xl bg-[#111115] hairline p-5 space-y-3">
                <div className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                  {locale === "pt" ? "Idiomas" : "Languages"}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white">
                      {locale === "pt" ? "Português (Brasil)" : "Portuguese (BR)"}
                    </span>
                    <span className="font-mono text-xs text-emerald-400">
                      {locale === "pt" ? "Nativo" : "Native"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">
                      {locale === "pt" ? "Inglês" : "English"}
                    </span>
                    <span className="font-mono text-xs text-amber-300">
                      {locale === "pt"
                        ? "Intermediário · Leitura & Escrita Técnica"
                        : "Intermediate · Technical Reading & Writing"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODEL 02 TEASER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#161210] via-[#111115] to-[#0D0D12] border border-[#FF5E1A]/30 p-7 sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#FF5E1A]/20 blur-[100px]"
          />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                {locale === "pt"
                  ? "MODELO 02 · VITRINE INTERATIVA"
                  : "MODEL 02 · INTERACTIVE SHOWCASE"}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {locale === "pt"
                  ? "Quer testar os projetos ao vivo no navegador?"
                  : "Want to play with interactive demos right in your browser?"}
              </h2>
              <p className="text-sm sm:text-base text-zinc-300">
                {locale === "pt"
                  ? "No PROTHOTYPE Lab você experimenta simuladores interativos do Cafofo, Dynamic Island Win11, PRISMA e GPU Hunter BR com guardrails reais."
                  : "Inside PROTHOTYPE Lab you can interact with live sandboxes for Cafofo, Dynamic Island Win11, PRISMA, and GPU Hunter BR with real guardrails."}
              </p>
            </div>

            <Link
              href="/lab"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FF5E1A] hover:bg-[#ff7338] text-white text-sm font-semibold shrink-0 transition-all shadow-[0_0_32px_rgba(255,94,26,0.4)]"
            >
              <FlaskConical className="w-4 h-4" />
              <span>
                {locale === "pt" ? "Abrir PROTHOTYPE Lab" : "Launch PROTHOTYPE Lab"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT FOOTER */}
      <footer
        id="contact"
        className="border-t border-white/[0.07] bg-[#060608]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5E1A]">
              {locale === "pt" ? "CONTATO DIRETO" : "GET IN TOUCH"}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              {locale === "pt" ? (
                <>
                  Vamos construir algo{" "}
                  <span className="font-serif italic font-normal text-[#FF5E1A]">
                    de verdade?
                  </span>
                </>
              ) : (
                <>
                  Let&apos;s build something{" "}
                  <span className="font-serif italic font-normal text-[#FF5E1A]">
                    worth shipping.
                  </span>
                </>
              )}
            </h2>
            <p className="text-sm text-zinc-400">
              {t(PROFILE.location)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/Pedro-Carlos-Teixeira-Neto-Curriculo.pdf"
              download="Pedro-Carlos-Teixeira-Neto-Curriculo.pdf"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF5E1A] hover:bg-[#ff7338] text-sm font-semibold text-white transition-colors shadow-[0_0_24px_rgba(255,94,26,0.3)]"
            >
              <Download className="w-4 h-4" />
              <span>{locale === "pt" ? "Baixar Currículo (PDF)" : "Download Resume (PDF)"}</span>
            </a>
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
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#14141A] hover:bg-[#1C1C26] border border-white/[0.1] text-sm text-zinc-200 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-sky-400" />
              LinkedIn
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#14141A] hover:bg-[#1C1C26] border border-white/[0.1] text-sm text-zinc-200 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>

        <div className="border-t border-white/[0.05] py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
            <span>
              © 2026 {PROFILE.fullName} · {PROFILE.handle}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-[#FF5E1A]" />
              {locale === "pt"
                ? "Pressione Ctrl+K / ⌘K para navegar"
                : "Press Ctrl+K / ⌘K to navigate"}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
