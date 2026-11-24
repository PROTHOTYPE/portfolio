"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Command, FlaskConical, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ProjectModal } from "@/components/ProjectModal";
import { CommandPalette } from "@/components/CommandPalette";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLab = pathname.startsWith("/lab");
  const { locale, setLocale, setCommandOpen, toast } = useLanguage();

  return (
    <div className="relative min-h-screen flex flex-col bg-[#08080A] text-[#F5F5F7]">
      {/* Subtle full-screen grain overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 studio-grain opacity-70"
      />

      {/* Sticky Editorial Navigation */}
      <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#08080A]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Brand identity adapts subtly to current model */}
          <Link
            href={isLab ? "/lab" : "/"}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <span className="relative w-8 h-8 rounded-lg bg-[#14141A] border border-white/15 flex items-center justify-center font-display font-bold text-xs tracking-tight text-white group-hover:border-[#FF5E1A]/60 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1A] absolute -top-0.5 -right-0.5 shadow-[0_0_8px_#FF5E1A]" />
              {isLab ? "PR" : "PT"}
            </span>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display font-bold text-sm tracking-tight text-white">
                {isLab ? "PROTHOTYPE" : "Pedro Teixeira"}
              </span>
              <span className="font-mono text-[10px] text-zinc-500 mt-0.5">
                {isLab
                  ? locale === "pt"
                    ? "LABORATÓRIO CRIATIVO"
                    : "CREATIVE LAB"
                  : locale === "pt"
                  ? "ENGENHARIA FULL STACK"
                  : "FULL STACK ENGINEER"}
              </span>
            </div>
          </Link>

          {/* Center Tactile Dual-Model Switcher */}
          <nav
            aria-label={locale === "pt" ? "Modelos do portfólio" : "Portfolio modes"}
            className="flex items-center gap-1 p-1 rounded-full bg-[#121217] border border-white/[0.08]"
          >
            <Link
              href="/"
              className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                !isLab
                  ? "bg-[#FF5E1A] text-white shadow-[0_0_20px_rgba(255,94,26,0.4)]"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 shrink-0" />
              <span>{locale === "pt" ? "Engenharia" : "Engineering"}</span>
            </Link>

            <Link
              href="/lab"
              className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                isLab
                  ? "bg-[#FF5E1A] text-white shadow-[0_0_20px_rgba(255,94,26,0.4)]"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5 shrink-0" />
              <span>PROTHOTYPE Lab</span>
            </Link>
          </nav>

          {/* Right Controls: PT/EN + ⌘K */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              role="group"
              aria-label="Language"
              className="flex items-center p-0.5 rounded-lg bg-[#121217] border border-white/[0.08] font-mono text-[11px]"
            >
              <button
                type="button"
                onClick={() => setLocale("pt")}
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  locale === "pt"
                    ? "bg-white/12 text-white font-semibold"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                PT
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  locale === "en"
                    ? "bg-white/12 text-white font-semibold"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              aria-label="Command palette"
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#121217] hover:bg-[#191921] border border-white/[0.08] text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <Command className="w-3 h-3 text-[#FF5E1A]" />
              <span>K</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Modals & Toast */}
      <ProjectModal />
      <CommandPalette />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#16161D] border border-[#FF5E1A]/40 text-sm text-white shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
          >
            <Check className="w-4 h-4 text-[#FF5E1A]" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
