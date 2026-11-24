"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Disc3,
  Download,
  HeadphoneOff,
  Headphones,
  Mic,
  MicOff,
  MonitorOff,
  MonitorUp,
  Pause,
  Play,
  SkipForward,
  Sparkles,
  Volume2,
} from "lucide-react";
import { GithubIcon as Github } from "@/components/BrandIcons";
import { useLanguage } from "@/context/LanguageContext";

const TRACKS = [
  { title: "Midnight Drive (Lo-Fi Mix)", requester: "Guii", duration: "03:40" },
  { title: "Synthwave Overdrive 1989", requester: "Predo", duration: "04:12" },
  { title: "Night City Ambient Session", requester: "Matheus", duration: "02:58" },
];

export function CafofoSandbox() {
  const { locale, openProject } = useLanguage();
  const [focusedUser, setFocusedUser] = useState<"predo" | "guii">("predo");
  const [streaming, setStreaming] = useState(true);
  const [muted, setMuted] = useState(false);
  const [deafened, setDeafened] = useState(false);
  const [rnnoise, setRnnoise] = useState(true);
  const [streamVolume, setStreamVolume] = useState(125);
  const [isPlaying, setIsPlaying] = useState(true);
  const [trackIndex, setTrackIndex] = useState(0);
  const [progress, setProgress] = useState(38);

  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) {
          setTrackIndex((idx) => (idx + 1) % TRACKS.length);
          return 4;
        }
        return prev + 1.5;
      });
    }, 350);
    return () => window.clearInterval(id);
  }, [isPlaying]);

  const track = TRACKS[trackIndex];

  return (
    <div
      id="cafofo"
      className="rounded-3xl bg-[#0D0D12] border border-red-500/20 overflow-hidden shadow-[0_28px_90px_rgba(0,0,0,0.75)]"
    >
      {/* Exhibit Header */}
      <div className="px-6 py-5 border-b border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#101016]">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#16161E] border border-red-500/30 p-1.5 flex items-center justify-center">
            <img
              src="/projects/cafofo-logo-icon.png"
              alt="Cafofo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-red-400">EXHIBIT 01</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/30">
                RUST · TAURI v2 · LIVEKIT
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
              Cafofo —{" "}
              <span className="font-serif italic font-normal text-zinc-300">
                {locale === "pt"
                  ? "Palco de Voz, Stream 16:9 & Bot Sincronizado"
                  : "Voice Stage, 16:9 Stream & Synced Music Bot"}
              </span>
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="https://cafofo.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-400 text-white text-xs font-semibold transition-colors"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            {locale === "pt" ? "Abrir Web App" : "Launch Web App"}
          </a>
          <a
            href="https://cafofo-landing.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 text-xs font-mono transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Windows .exe
          </a>
          <a
            href="https://github.com/PROTHOTYPE/cafofo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 text-xs font-mono transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
          <button
            type="button"
            onClick={() => openProject("cafofo")}
            className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            {locale === "pt" ? "Arquitetura →" : "Architecture →"}
          </button>
        </div>
      </div>

      {/* Interactive Window Body */}
      <div className="p-4 sm:p-6 bg-[#08080B]">
        <div className="rounded-2xl bg-[#101015] border border-white/[0.08] overflow-hidden">
          {/* Desktop Window Titlebar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#09090C] border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="ml-2 font-mono text-[11px] text-zinc-400">
                Cafofo Desktop — QG da Madrugada
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300">
                <Sparkles className="w-3 h-3 text-red-400" />
                {locale === "pt" ? "Interativo — clique nos controles" : "Interactive — click controls"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                14 ms · Fly.io GRU
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Stage Area (16:9 + Participants) */}
            <div className="lg:col-span-8 p-4 sm:p-5 space-y-4 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
              {/* 16:9 Stream Stage */}
              <div className="relative aspect-[16/9] rounded-xl bg-[#07070A] border border-white/[0.07] overflow-hidden flex flex-col justify-between p-4">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: streaming
                      ? "radial-gradient(circle at 25% 30%, rgba(239,68,68,0.18), transparent 55%), radial-gradient(circle at 80% 75%, rgba(255,94,26,0.12), transparent 50%)"
                      : "none",
                  }}
                />

                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 border border-white/10 text-zinc-200">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        streaming ? "bg-red-500 animate-pulse" : "bg-zinc-600"
                      }`}
                    />
                    {streaming
                      ? `${focusedUser === "predo" ? "Predo" : "Guii"} · LIVE 1080p60`
                      : locale === "pt"
                      ? "Transmissão pausada"
                      : "Stream paused"}
                  </span>

                  <button
                    type="button"
                    onClick={() => setStreaming((s) => !s)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-zinc-100 transition-colors cursor-pointer"
                  >
                    {streaming ? (
                      <>
                        <MonitorOff className="w-3.5 h-3.5 text-red-400" />
                        {locale === "pt" ? "Parar Stream" : "Stop Stream"}
                      </>
                    ) : (
                      <>
                        <MonitorUp className="w-3.5 h-3.5 text-emerald-400" />
                        {locale === "pt" ? "Transmitir 16:9" : "Share 16:9"}
                      </>
                    )}
                  </button>
                </div>

                {/* Stage center content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto py-4">
                  {streaming ? (
                    <>
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-400">
                        {focusedUser === "predo"
                          ? "GAME DETECTOR · WINDOWS NATIVE"
                          : "SCREEN CAPTURE CRATE · DXGI"}
                      </div>
                      <div className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                        {focusedUser === "predo"
                          ? "Rust Workspace + LiveKit Stage"
                          : "Valorant · 16:9 Fullscreen Capture"}
                      </div>
                      <p className="text-xs text-zinc-400 mt-2 max-w-md">
                        {locale === "pt"
                          ? `Áudio do stream ajustado em ${streamVolume}% independente do microfone (${rnnoise ? "RNNoise DSP ativo" : "DSP desligado"}).`
                          : `Independent stream audio gain set to ${streamVolume}% (${rnnoise ? "RNNoise DSP active" : "DSP bypassed"}).`}
                      </p>
                    </>
                  ) : (
                    <div className="text-sm font-mono text-zinc-500">
                      {locale === "pt"
                        ? "Clique em 'Transmitir 16:9' para iniciar o palco de captura."
                        : "Click 'Share 16:9' to start the capture stage."}
                    </div>
                  )}
                </div>

                {/* Stream Volume Bar (0-200%) */}
                <div className="relative z-10 flex items-center justify-between gap-4 bg-black/60 backdrop-blur-md rounded-xl px-3.5 py-2 border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 shrink-0">
                    <Volume2 className="w-3.5 h-3.5 text-red-400" />
                    <span>{locale === "pt" ? "Ganho Stream" : "Stream Gain"}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={200}
                    value={streamVolume}
                    onChange={(e) => setStreamVolume(Number(e.target.value))}
                    className="w-full accent-red-500 cursor-pointer"
                  />
                  <span className="font-mono text-xs text-white w-11 text-right">
                    {streamVolume}%
                  </span>
                </div>
              </div>

              {/* Voice Controls & Participant Switch */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {(["predo", "guii"] as const).map((user) => {
                    const active = focusedUser === user;
                    return (
                      <button
                        key={user}
                        type="button"
                        onClick={() => setFocusedUser(user)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                          active
                            ? "bg-red-500/15 border-red-500/40 text-white"
                            : "bg-[#15151C] border-white/[0.07] text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            active ? "bg-emerald-400" : "bg-zinc-600"
                          }`}
                        />
                        <span>{user === "predo" ? "Predo (Host)" : "Guii"}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMuted((m) => !m)}
                    className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      muted
                        ? "bg-red-500/20 border-red-500/40 text-red-300"
                        : "bg-[#15151C] border-white/[0.08] text-zinc-200 hover:bg-white/[0.08]"
                    }`}
                    title={muted ? "Unmute" : "Mute"}
                  >
                    {muted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeafened((d) => !d)}
                    className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      deafened
                        ? "bg-red-500/20 border-red-500/40 text-red-300"
                        : "bg-[#15151C] border-white/[0.08] text-zinc-200 hover:bg-white/[0.08]"
                    }`}
                    title={deafened ? "Undeafen" : "Deafen"}
                  >
                    {deafened ? (
                      <HeadphoneOff className="w-4 h-4" />
                    ) : (
                      <Headphones className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRnnoise((r) => !r)}
                    className={`px-3 py-2 rounded-xl border font-mono text-[11px] transition-colors cursor-pointer ${
                      rnnoise
                        ? "bg-emerald-500/15 border-emerald-500/35 text-emerald-300"
                        : "bg-[#15151C] border-white/[0.08] text-zinc-400"
                    }`}
                  >
                    RNNoise {rnnoise ? "ON" : "OFF"}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar: Synced Music Bot + RAM Footprint Benchmark */}
            <div className="lg:col-span-4 p-4 sm:p-5 flex flex-col justify-between gap-5 bg-[#0D0D12]">
              {/* Synced Music Bot */}
              <div className="rounded-xl bg-[#13131A] border border-white/[0.07] p-4 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-red-400">
                    <Disc3
                      className={`w-3.5 h-3.5 ${isPlaying ? "animate-spin" : ""}`}
                      style={{ animationDuration: "3.5s" }}
                    />
                    {locale === "pt" ? "Bot de Música Sync 0:00" : "Synced Music Bot"}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500">
                    CACHE · AXUM
                  </span>
                </div>

                <div>
                  <div className="text-sm font-semibold text-white truncate">
                    {track.title}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {locale === "pt" ? "Pedido por" : "Queued by"} {track.requester} ·{" "}
                    {track.duration}
                  </div>
                </div>

                <div className="h-1.5 w-full rounded-full bg-white/[0.07] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-amber-400 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPlaying((p) => !p)}
                      className="p-2 rounded-lg bg-red-500 hover:bg-red-400 text-white transition-colors cursor-pointer"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTrackIndex((i) => (i + 1) % TRACKS.length);
                        setProgress(6);
                      }}
                      className="p-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 transition-colors cursor-pointer"
                      aria-label="Next track"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Animated EQ */}
                  <div className="flex items-end gap-1 h-4">
                    {[0.6, 1, 0.75, 0.9, 0.5].map((op, idx) => (
                      <span
                        key={idx}
                        className={`w-1 rounded-full bg-red-400 ${
                          isPlaying ? "h-full eq-bar" : "h-1.5"
                        }`}
                        style={{ animationDelay: `${idx * 0.13}s`, opacity: op }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* RAM Footprint Comparator */}
              <div className="rounded-xl bg-[#13131A] border border-white/[0.07] p-4 space-y-3">
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  {locale === "pt"
                    ? "Consumo de Memória em Call"
                    : "In-Call Memory Footprint"}
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between font-mono">
                      <span className="text-white font-semibold">
                        Cafofo (Tauri v2 + Rust)
                      </span>
                      <span className="text-emerald-400">~64 MB</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                      <div className="h-full w-[16%] rounded-full bg-emerald-400" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-zinc-500">
                      <span>Electron Voice Client</span>
                      <span>~420 MB</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                      <div className="h-full w-[88%] rounded-full bg-zinc-600" />
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {locale === "pt"
                    ? "Sem Chromium duplicado rodando atrás do jogo — atualizações assinadas via Cloudflare R2."
                    : "No bundled Chromium eating RAM behind your game — signed auto-updates delivered via Cloudflare R2."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
