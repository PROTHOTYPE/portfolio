export type Locale = "pt" | "en";

export interface BiText {
  pt: string;
  en: string;
}

export interface ProjectLink {
  label: BiText;
  url: string;
  kind: "live" | "github" | "download";
}

export interface ProjectMetric {
  value: string | BiText;
  label: BiText;
}

export interface ProjectArchitectureNode {
  layer: string;
  detail: BiText;
}

export interface ProjectScreenshot {
  src: string;
  caption: BiText;
}

export interface ProjectItem {
  id: "cafofo" | "prisma" | "dynamic-island" | "gpu-hunter";
  index: string;
  name: string;
  subtitle: BiText;
  tagline: BiText;
  category: "fullstack-desktop" | "mobile-web" | "python-ai";
  categoryLabel: BiText;
  year: string;
  status: BiText;
  visibility: "public" | "private";
  accentHex: string;
  logo?: string;
  logoLightSurface?: boolean;
  aiOrchestrated: boolean;
  aiNote?: BiText;
  summary: BiText;
  problem: BiText;
  solution: BiText;
  highlights: BiText[];
  architecture: ProjectArchitectureNode[];
  stack: string[];
  metrics: ProjectMetric[];
  links: ProjectLink[];
  screenshots?: ProjectScreenshot[];
}

export const PROFILE = {
  fullName: "Pedro Carlos Teixeira Neto",
  shortName: "Pedro Teixeira",
  handle: "PROTHOTYPE",
  email: "pedroteixeiraneto20@gmail.com",
  github: "https://github.com/PROTHOTYPE",
  linkedin: "https://www.linkedin.com/in/pedrocartneto",
  location: {
    pt: "Natal / Touros, RN — Brasil (Remoto, Híbrido ou Presencial)",
    en: "Natal / Touros, RN — Brazil (Remote, Hybrid or On-site)",
  },
  coordinates: "-5.7945° S, 35.2110° W",
  role: {
    pt: "Engenheiro de Software Full Stack & Sistemas",
    en: "Full Stack & Systems Software Engineer",
  },
  availability: {
    pt: "Disponível para oportunidades Full Stack & Engenharia de Software",
    en: "Open to Full Stack & Software Engineering roles",
  },
  bio: {
    pt: "Combino quase 3 anos liderando TI e operações críticas em mais de 30 escolas municipais com engenharia prática de software em TypeScript, React, Rust (Tauri/Axum), PostgreSQL e automações em Python orquestradas com agentes de IA. Construo aplicações rápidas, reais e feitas para rodar em produção.",
    en: "Combining nearly 3 years leading IT operations across 30+ municipal public schools with hands-on software engineering in TypeScript, React, Rust (Tauri/Axum), PostgreSQL, and AI-agent-orchestrated Python automation. I build fast, grounded software designed for real-world production.",
  },
  labBio: {
    pt: "PROTHOTYPE é meu laboratório independente de produto, interfaces nativas e automações assistidas por agentes de IA — onde ideias viram apps desktop em Rust, sistemas públicos multiplataforma, overlays para Windows 11 e radares de hardware.",
    en: "PROTHOTYPE is my independent studio for software products, native interfaces, and AI-agent-orchestrated automation — turning raw ideas into Rust desktop apps, multi-platform civic tools, Windows 11 overlays, and hardware deal radars.",
  },
} as const;

export const PROJECTS: ProjectItem[] = [
  {
    id: "cafofo",
    index: "01",
    name: "Cafofo",
    subtitle: {
      pt: "App Desktop & Web de Comunicação em Tempo Real",
      en: "Real-Time Voice, Chat & Screen-Share Desktop/Web App",
    },
    tagline: {
      pt: "Voz, chat, transmissão de tela 16:9 e bot de música sincronizado — sem devorar a RAM durante a partida.",
      en: "Voice rooms, live chat, 16:9 screen sharing, and a synchronized music bot — without eating half your RAM mid-game.",
    },
    category: "fullstack-desktop",
    categoryLabel: {
      pt: "Desktop Rust + Full Stack Web",
      en: "Rust Desktop + Full Stack Web",
    },
    year: "2026",
    status: {
      pt: "Em Produção · Open Source",
      en: "Live in Production · Open Source",
    },
    visibility: "public",
    accentHex: "#EF4444",
    logo: "/projects/cafofo-logo-icon.png",
    aiOrchestrated: false,
    summary: {
      pt: "Plataforma própria de comunicação em tempo real construída como monorepo Rust + TypeScript. Roda nativamente no Windows via Tauri v2 (bandeja do sistema, autostart, game detector e auto-update assinado via Cloudflare R2) e também direto no navegador via Cloudflare Pages.",
      en: "Custom real-time communication platform engineered as a Rust + TypeScript monorepo. Runs natively on Windows via Tauri v2 (system tray, silent autostart, process game detector, and signed Cloudflare R2 auto-updates) as well as directly in the browser via Cloudflare Pages.",
    },
    problem: {
      pt: "Clientes tradicionais de voz baseados em Electron consomem centenas de megabytes de RAM e ciclos de CPU em segundo plano durante jogos, além de travarem personalização básica de perfil atrás de paywalls.",
      en: "Mainstream Electron voice clients consume heavy RAM and background CPU during gaming sessions while locking basic profile customization behind subscription paywalls.",
    },
    solution: {
      pt: "Arquitetura enxuta combinando shell nativo Tauri v2 + crates Rust dedicados (`audio-engine`, `screen-capture`, `game-detector`, `protocol` com `ts-rs`), servidor Axum no Fly.io (`gru`), mídia WebRTC via LiveKit, dados/auth no Supabase com RLS e distribuição de binários assinados no Cloudflare R2.",
      en: "Lean architecture pairing a native Tauri v2 shell with purpose-built Rust crates (`audio-engine`, `screen-capture`, `game-detector`, `protocol` via `ts-rs`), an Axum signaling server on Fly.io (`gru`), LiveKit WebRTC media, Supabase Postgres + RLS, and signed binary releases on Cloudflare R2.",
    },
    highlights: [
      {
        pt: "Salas de voz/texto, cargos, convites, DMs, chamadas 1:1 e palco 16:9 com controle de volume individual (0%–200%).",
        en: "Voice & text channels, roles, invites, DMs, 1:1 calls, and a 16:9 stream stage with per-user & per-stream gain control (0%–200%).",
      },
      {
        pt: "Bot de música do YouTube sincronizado com cache em disco no servidor Rust para toda a call começar exatamente no 0:00.",
        en: "Synchronized YouTube music bot with server-side disk caching in Rust so everyone in the voice channel starts tightly aligned at 0:00.",
      },
      {
        pt: "Contratos tipados ponta a ponta entre Rust e TypeScript via `ts-rs`, mais detecção automática de jogos em execução no Windows.",
        en: "End-to-end typed Rust ↔ TypeScript contracts via `ts-rs`, plus native Windows process detection for active games.",
      },
      {
        pt: "Pipeline completo de release assinado (`.exe` + `.sig` + `latest.json`) hospedado no Cloudflare R2 com atualização automática in-app.",
        en: "Full signed release pipeline (`.exe` + `.sig` + `latest.json`) hosted on Cloudflare R2 with seamless in-app auto-updates.",
      },
    ],
    architecture: [
      {
        layer: "apps/desktop",
        detail: {
          pt: "Frontend React 19 + Vite + Zustand + Radix UI + shell nativo Tauri v2 (Windows).",
          en: "React 19 + Vite + Zustand + Radix UI frontend wrapped in native Tauri v2 shell.",
        },
      },
      {
        layer: "apps/server",
        detail: {
          pt: "Servidor Rust (Axum) na Fly.io (GRU): sinalização WebSocket, tokens LiveKit e bot de música.",
          en: "Rust (Axum) backend on Fly.io (GRU): WebSocket signaling, LiveKit tokens & synced music bot.",
        },
      },
      {
        layer: "crates/*",
        detail: {
          pt: "4 crates nativos: `audio-engine` (DSP), `screen-capture`, `game-detector` e `protocol` (`ts-rs`).",
          en: "4 native crates: `audio-engine` (DSP), `screen-capture`, `game-detector` & `protocol` (`ts-rs`).",
        },
      },
      {
        layer: "Cloud & Data",
        detail: {
          pt: "Supabase (PostgreSQL, RLS, Auth, Realtime), Cloudflare Pages (web/landing) e Cloudflare R2 (releases).",
          en: "Supabase (PostgreSQL, RLS, Auth, Realtime), Cloudflare Pages (web/landing) & Cloudflare R2 (releases).",
        },
      },
    ],
    stack: [
      "Rust",
      "Tauri v2",
      "Axum",
      "TypeScript",
      "React 19",
      "LiveKit WebRTC",
      "Supabase",
      "PostgreSQL",
      "Cloudflare R2",
      "Fly.io",
    ],
    metrics: [
      { value: "4 Crates", label: { pt: "Workspace Rust nativo", en: "Native Rust crates" } },
      { value: "~14 ms", label: { pt: "Latência região GRU", en: "GRU region latency" } },
      { value: "Web + Win", label: { pt: "Deploy simultâneo", en: "Dual deployment" } },
    ],
    links: [
      {
        label: { pt: "Landing & Download", en: "Landing & Download" },
        url: "https://cafofo-landing.pages.dev",
        kind: "download",
      },
      {
        label: { pt: "Abrir no Navegador", en: "Open Web App" },
        url: "https://cafofo.pages.dev",
        kind: "live",
      },
      {
        label: { pt: "Código no GitHub", en: "GitHub Repository" },
        url: "https://github.com/PROTHOTYPE/cafofo",
        kind: "github",
      },
    ],
  },
  {
    id: "prisma",
    index: "02",
    name: "PRISMA · SMEC Touros",
    subtitle: {
      pt: "Sistema Multiplataforma de Gestão Interna & Prestação de Contas",
      en: "Multi-Platform Municipal Operations & Accountability System",
    },
    tagline: {
      pt: "Gestão de demandas, protocolo de ofícios físicos e geração automática do Relatório Anual em PDF A4 para 15 setores públicos.",
      en: "Internal demand tracking, physical document intake, and automated official A4 PDF annual accountability reports across 15 public sectors.",
    },
    category: "mobile-web",
    categoryLabel: {
      pt: "Web + Mobile (Expo / Supabase)",
      en: "Web + Mobile (Expo / Supabase)",
    },
    year: "2026",
    status: {
      pt: "Validado em Ambiente Real · Repositório Privado",
      en: "Field-Validated · Private Repo",
    },
    visibility: "private",
    accentHex: "#3B82F6",
    logo: "/projects/prisma-logo.png",
    logoLightSurface: true,
    aiOrchestrated: false,
    summary: {
      pt: "Aplicação multiplataforma (Web, iOS e Android) desenvolvida para a Secretaria Municipal de Educação e Cultura de Touros/RN. Unifica o fluxo administrativo de 15 setores oficiais com controle de acesso hierárquico (RBAC) e consolidação documental em PDF oficial.",
      en: "Multi-platform (Web, iOS, Android) internal operations system built for the Municipal Secretariat of Education and Culture of Touros/RN. Unifies workflows across 15 official sectors with hierarchical RBAC and automated official PDF consolidation.",
    },
    problem: {
      pt: "Ofícios físicos, solicitações intersetoriais e relatórios anuais de prestação de contas ficavam fragmentados em papéis e planilhas, dificultando rastreabilidade e fechamento anual pela gestão pública.",
      en: "Physical official letters, cross-department requests, and annual accountability reports were scattered across paper folders and spreadsheets, slowing traceability and yearly reporting.",
    },
    solution: {
      pt: "App único em React Native / Expo + React Native Web conectado ao Supabase/PostgreSQL (com persistência offline via AsyncStorage), fluxo de homologação de acessos pelo Super Admin TI, triagem de ofícios pelo ADM-RH e motor de exportação A4 pronto para assinatura institucional.",
      en: "Single React Native / Expo + React Native Web codebase backed by Supabase/PostgreSQL (plus AsyncStorage caching), IT Super Admin user onboarding approval, HR/Admin formal letter triage, and an automated A4 print/export engine ready for official signatures.",
    },
    highlights: [
      {
        pt: "Organograma digital dos 15 setores oficiais da SMEC (TI, ADM-RH, Gabinete, Pedagógico, Transporte, PNAE, Cultura, Prestação de Contas etc.).",
        en: "Models all 15 official municipal education sectors (IT, Admin/HR, Executive, Pedagogy, School Transport, Nutrition, Culture, Accountability, etc.).",
      },
      {
        pt: "RBAC completo com homologação manual: define Setor, Papel Hierárquico (`DIRETOR`, `COORDENADOR`, `INTEGRANTE`) e Permissão funcional.",
        en: "Full RBAC with admin approval flow defining Sector, Hierarchical Role (`DIRECTOR`, `COORDINATOR`, `MEMBER`), and operational permissions.",
      },
      {
        pt: "Relatório Anual em PDF A4 unificando ofícios atendidos, demandas atribuídas e ações diretas com classificação de desfecho e termo de assinatura.",
        en: "Automated official A4 PDF report consolidating formal letters, assigned tasks, and direct team initiatives with completion outcomes and signature blocks.",
      },
      {
        pt: "Design System institucional Clean Frosted Glass adaptado tanto para navegador desktop quanto para celular (`expo-print` + `expo-sharing`).",
        en: "Institutional Clean Frosted Glass UI engineered for both desktop web browsers and mobile devices (`expo-print` + `expo-sharing`).",
      },
    ],
    architecture: [
      {
        layer: "Multiplatform UI",
        detail: {
          pt: "Expo 58 + React 19 + React Native Web + TypeScript com build único para Android, iOS e Web.",
          en: "Expo 58 + React 19 + React Native Web + TypeScript shipping a unified Web, iOS & Android codebase.",
        },
      },
      {
        layer: "Auth & RBAC",
        detail: {
          pt: "Fluxo `pending` -> homologação pelo `SUPER_ADMIN_TI`, proteção de dados sensíveis do setor Multidisciplinar.",
          en: "`pending` access request -> `SUPER_ADMIN_TI` approval workflow, with strict privacy boundaries for sensitive student support records.",
        },
      },
      {
        layer: "Data Layer",
        detail: {
          pt: "Supabase PostgreSQL + AsyncStorage para responsividade e digitalização com Document/Image Picker.",
          en: "Supabase PostgreSQL + AsyncStorage caching + physical document scanning via Document/Image Picker.",
        },
      },
      {
        layer: "PDF A4 Engine",
        detail: {
          pt: "Geração de Relatório Anual oficial via impressão A4 no navegador e `expo-print` + `expo-sharing` no mobile.",
          en: "Official A4 accountability PDF generator via clean browser print layout and `expo-print` + `expo-sharing` on mobile.",
        },
      },
    ],
    stack: [
      "TypeScript",
      "React Native",
      "Expo",
      "React Native Web",
      "Supabase",
      "PostgreSQL",
      "RBAC",
      "Expo Print",
      "AsyncStorage",
    ],
    metrics: [
      { value: "15", label: { pt: "Setores integrados", en: "Integrated sectors" } },
      { value: "30+", label: { pt: "Escolas impactadas", en: "Schools served" } },
      {
        value: { pt: "3 Alvos", en: "3 Targets" },
        label: { pt: "Web, iOS & Android", en: "Web, iOS & Android" },
      },
    ],
    links: [],
  },
  {
    id: "dynamic-island",
    index: "03",
    name: "Dynamic Island · Win11",
    subtitle: {
      pt: "Overlay Nativo com Lançador Rápido, Telemetria e Mídia",
      en: "Native Windows 11 Overlay with Quick Launcher, Telemetry & Media",
    },
    tagline: {
      pt: "Pílula flutuante de topo acelerada por hardware para substituir a barra de tarefas do Windows 11 usando menos de 25 MB de RAM.",
      en: "Hardware-accelerated top pill overlay replacing the traditional Windows 11 taskbar while staying under 25 MB of RAM.",
    },
    category: "python-ai",
    categoryLabel: {
      pt: "Python · Orquestrado com Agentes IA",
      en: "Python · AI-Agent Orchestrated",
    },
    year: "2026",
    status: {
      pt: "Desktop Utility · Repositório Privado",
      en: "Desktop Utility · Private Repo",
    },
    visibility: "private",
    accentHex: "#38BDF8",
    aiOrchestrated: true,
    aiNote: {
      pt: "Desenvolvido em Python com orquestração ativa de agentes de IA para acelerar integrações com a Win32 API, workers assíncronos em PowerShell e ciclos iterativos de validação visual em múltiplos DPIs (100%, 125% e 150%).",
      en: "Built in Python by orchestrating AI coding agents to accelerate Win32 API bindings, asynchronous PowerShell media/radio workers, and multi-DPI visual regression testing (100%, 125%, 150%).",
    },
    summary: {
      pt: "Ilha Dinâmica minimalista ancorada no topo do Windows 11 construída em Python + `pywebview` (Edge WebView2) + Win32 API (`ctypes`/`pywin32`). Reúne dock de janelas ativas, lançador instantâneo indexando 78+ programas reais, telemetria de CPU/RAM/disco/rede e controle de mídia do Windows.",
      en: "Minimalist Dynamic Island anchored to the top of Windows 11 built with Python + `pywebview` (Edge WebView2) + Win32 API (`ctypes`/`pywin32`). Combines an active window dock, an instant launcher indexing 78+ local apps, real-time CPU/RAM/disk/network gauges, and native Windows media controls.",
    },
    problem: {
      pt: "A barra de tarefas padrão do Windows ocupa espaço vertical permanente, enquanto utilitários de terceiros costumam ser pesados, mal adaptados a escalas de DPI diferentes ou desconectados dos controles nativos de mídia.",
      en: "The default Windows taskbar claims permanent vertical screen real estate, while third-party docks are often bloated, fragile across DPI scaling, or disconnected from Windows media sessions.",
    },
    solution: {
      pt: "Overlay borderless `HWND_TOPMOST` / `WS_EX_TOOLWINDOW` com renderização WebView2 acelerada por GPU, indexador de aplicativos instalado localmente, workers dedicados em PowerShell para Windows Media Session (Spotify, YouTube, VLC, Stremio) e alternância rápida da visibilidade da barra nativa.",
      en: "Borderless `HWND_TOPMOST` / `WS_EX_TOOLWINDOW` overlay powered by GPU-accelerated Edge WebView2, local app indexer, dedicated PowerShell workers for Windows Media Sessions (Spotify, YouTube, VLC, Stremio), and a 1-click native taskbar toggle.",
    },
    highlights: [
      {
        pt: "Consumo típico abaixo de 25 MB de RAM operando de forma assíncrona com `pywebview` e `psutil`.",
        en: "Typical memory footprint under 25 MB RAM operating asynchronously with `pywebview` and `psutil`.",
      },
      {
        pt: "Três modos fluidos dentro da cápsula expandida: Tarefas Ativas, Lançador Instantâneo (78+ apps reais) e Controles de Mídia + Telemetria.",
        en: "Three seamless views inside the expanded pill: Active Tasks dock, Instant App Launcher (78+ indexed programs), and Media + System Telemetry.",
      },
      {
        pt: "Suporte nativo a escalas reais de DPI (100%, 125% e 150%), detecção de tela cheia e internacionalização automática (`pt-BR` / `en`).",
        en: "Real DPI scaling support (100%, 125%, 150%), fullscreen visibility awareness, and automatic OS locale detection (`pt-BR` / `en`).",
      },
      {
        pt: "Orquestração com agentes de IA na geração de testes, scripts de captura de tela por fase e estabilização dos adaptadores Win32.",
        en: "AI-agent orchestration applied to automated test harnesses, per-phase DPI screenshot verification, and Win32 adapter stabilization.",
      },
    ],
    architecture: [
      {
        layer: "core/ (Win32 & Workers)",
        detail: {
          pt: "`system_monitor.py`, `app_indexer.py`, `task_manager.py`, `visibility_monitor.py` e workers PowerShell de áudio/mídia/rádio.",
          en: "`system_monitor.py`, `app_indexer.py`, `task_manager.py`, `visibility_monitor.py`, plus PowerShell media/radio session workers.",
        },
      },
      {
        layer: "ui/ (WebView2 Glass)",
        detail: {
          pt: "Interface HTML/CSS/JS com transições elásticas de mola, `sliding_pager.py` e `system_overlay.py` via `HWND_TOPMOST`.",
          en: "Spring-animated HTML/CSS/JS glassmorphic interface paired with `sliding_pager.py` and `system_overlay.py` via `HWND_TOPMOST`.",
        },
      },
      {
        layer: "AI Automation Loop",
        detail: {
          pt: "Agentes de IA orquestrados para iterar layouts, validar screenshots em 100/125/150% DPI e manter suite `pytest`.",
          en: "AI agents orchestrated to iterate UI layouts, capture and validate 100/125/150% DPI screenshots, and maintain `pytest` coverage.",
        },
      },
    ],
    stack: [
      "Python 3.12+",
      "Win32 API",
      "pywebview",
      "Edge WebView2",
      "psutil",
      "PowerShell",
      "AI-Agent Workflow",
      "HTML/CSS/JS",
    ],
    metrics: [
      { value: "< 25 MB", label: { pt: "Consumo típico de RAM", en: "Typical RAM footprint" } },
      { value: "78+ Apps", label: { pt: "Indexação instantânea", en: "Instant app indexing" } },
      { value: "3 DPIs", label: { pt: "100% / 125% / 150%", en: "100% / 125% / 150%" } },
    ],
    links: [],
    screenshots: [
      {
        src: "/projects/island-compact.png",
        caption: {
          pt: "Cápsula compacta ancorada no topo (captura real em 100% DPI)",
          en: "Compact top-anchored pill (real 100% DPI capture)",
        },
      },
      {
        src: "/projects/island-launcher.png",
        caption: {
          pt: "Lançador rápido indexando 78+ programas reais e comandos do sistema",
          en: "Quick launcher indexing 78+ real Windows programs & system commands",
        },
      },
      {
        src: "/projects/island-media.png",
        caption: {
          pt: "Painel expandido de telemetria (CPU, RAM, Disco, Rede) e controle de mídia",
          en: "Expanded telemetry (CPU, RAM, Disk, Network) & Windows media deck",
        },
      },
      {
        src: "/projects/island-tasks.png",
        caption: {
          pt: "Dock de tarefas ativas com alternância direta da barra de tarefas",
          en: "Active window dock with one-click native taskbar visibility toggle",
        },
      },
    ],
  },
  {
    id: "gpu-hunter",
    index: "04",
    name: "GPU Hunter BR",
    subtitle: {
      pt: "Radar Automatizado de Preços, Bugs & Guardrails de Hardware",
      en: "Automated GPU Price Radar, Deal Alerts & Hardware Guardrails",
    },
    tagline: {
      pt: "Monitor híbrido 0-tokens + agentes de IA que caça placas abaixo de R$ 3.000 compatíveis com fonte Corsair CV650 e dispara push no celular.",
      en: "Hybrid 0-token local + AI-agent monitor hunting Brazilian GPU deals under R$ 3,000 safe for a Corsair CV650 PSU with instant mobile push alerts.",
    },
    category: "python-ai",
    categoryLabel: {
      pt: "Python · Orquestrado com Agentes IA",
      en: "Python · AI-Agent Orchestrated",
    },
    year: "2026",
    status: {
      pt: "Automação Ativa · Local",
      en: "Active Automation · Local",
    },
    visibility: "private",
    accentHex: "#F59E0B",
    aiOrchestrated: true,
    aiNote: {
      pt: "Projeto em Python construído e operado em modelo híbrido com agentes de IA: coleta agendada local consome 0 tokens (RSS + Mercado Livre OAuth), enquanto agentes de navegação (Browser Flash / Playwright) extraem catálogos de OLX, Enjoei e Facebook Marketplace e ingerem via `--ingest ofertas.json`.",
      en: "Python system built and operated with a hybrid AI-agent architecture: local scheduled sweeps cost 0 tokens (RSS + Mercado Livre OAuth), while AI browser agents extract listings from OLX, Enjoei, and Facebook Marketplace and feed the CLI via `--ingest ofertas.json`.",
    },
    summary: {
      pt: "Motor de monitoramento e inteligência de preços em Python + SQLite voltado ao mercado brasileiro de placas de vídeo usadas e promocionais. Aplica regras estritas de regex e compatibilidade elétrica (i5-12400 + Corsair CV650), calcula médias móveis de 7 dias e envia alertas instantâneos via `ntfy.sh`.",
      en: "Python + SQLite price monitoring and deal-intelligence engine tailored for the Brazilian GPU market. Enforces strict regex and power-envelope guardrails (i5-12400 + Corsair CV650), computes 7-day rolling averages, and dispatches instant mobile push notifications via `ntfy.sh`.",
    },
    problem: {
      pt: "Ofertas reais e bugs de preço de GPUs no Brasil duram minutos e se perdem em meio a anúncios enganosos (como versões capadas de 8GB, modelos mobile ou placas que excedem a folga da fonte).",
      en: "Genuine GPU deals and pricing glitches in Brazil disappear within minutes and are buried under misleading listings (8GB cut-down variants, laptop parts, or power-hungry cards exceeding PSU headroom).",
    },
    solution: {
      pt: "Arquitetura em duas camadas: coletor local agendado no Windows Task Scheduler a cada 10 minutos (0 custo de LLM) combinando RSS (Hardmob) + API OAuth do Mercado Livre + parser BRL (`R$ 2.799,90`, `2,5k`), integrado a um comando `--ingest` que valida catálogos coletados por agentes de IA em marketplaces complexos.",
      en: "Two-tier architecture: a local Windows Task Scheduler collector running every 10 minutes (0 LLM token cost) combining Hardmob RSS + Mercado Livre OAuth API + custom BRL price parsing (`R$ 2.799,90`, `2,5k`), paired with an `--ingest` pipeline validating offers scraped by AI browser agents from dynamic marketplaces.",
    },
    highlights: [
      {
        pt: "Guardrails de hardware em `config.yaml`: bloqueia automaticamente `RX 6800 XT` (proteção da fonte CV650), `RX 9060 XT 8GB` e anúncios `laptop`/`mobile`.",
        en: "Declarative hardware guardrails in `config.yaml`: automatically blocks `RX 6800 XT` (protecting the CV650 PSU), `RX 9060 XT 8GB`, and `laptop`/`mobile` listings.",
      },
      {
        pt: "Parser robusto de preços brasileiros (`filters.py`) cobrindo notações reais de anúncios (`R$ 2.499,90`, `2,5k`, valores inteiros) com suite `pytest`.",
        en: "Resilient Brazilian BRL price parser (`filters.py`) handling real-world formats (`R$ 2.499,90`, `2,5k`, raw integers) backed by `pytest` unit tests.",
      },
      {
        pt: "Persistência em SQLite com histórico de 7 dias, deduplicação e ranking de melhores oportunidades (`--ranking --push`).",
        en: "SQLite storage with 7-day rolling price averages, deduplication, and ranked opportunity summaries (`--ranking --push`).",
      },
      {
        pt: "Notificações push instantâneas no celular via `ntfy.sh` e agendamento 100% automático no Windows via `setup_task.ps1`.",
        en: "Instant mobile push notifications via `ntfy.sh` plus automated 10-minute Windows Task Scheduler deployment via `setup_task.ps1`.",
      },
    ],
    architecture: [
      {
        layer: "collectors/",
        detail: {
          pt: "`rss_feeds.py` (Hardmob), `mercadolivre.py` (OAuth API) e `enjoei_pw.py` (Playwright) + templates de varredura para agentes.",
          en: "`rss_feeds.py` (Hardmob), `mercadolivre.py` (OAuth API), `enjoei_pw.py` (Playwright) & browser-agent search templates.",
        },
      },
      {
        layer: "filters.py & config.yaml",
        detail: {
          pt: "Regex de inclusão/exclusão por modelo (RTX 4070, RX 9060 XT 16GB, RX 7700 XT, RX 6800, RX 6750 XT) e teto global < R$ 3.000.",
          en: "Model-specific include/exclude regex engine (RTX 4070, RX 9060 XT 16GB, RX 7700 XT, RX 6800, RX 6750 XT) under R$ 3,000 ceiling.",
        },
      },
      {
        layer: "storage.py & notifier.py",
        detail: {
          pt: "Banco SQLite (`gpu_hunter.db`) para médias de 7 dias + disparo push instantâneo para celular via `ntfy.sh`.",
          en: "SQLite database (`gpu_hunter.db`) for 7-day rolling benchmarks + instant phone push alerts via `ntfy.sh`.",
        },
      },
    ],
    stack: [
      "Python 3.12",
      "SQLite",
      "Playwright",
      "Mercado Livre OAuth",
      "RSS / Atom",
      "ntfy.sh",
      "AI-Agent Ingestion",
      "pytest",
      "PowerShell",
    ],
    metrics: [
      { value: "0 Tokens", label: { pt: "Loop local a cada 10 min", en: "10-min local sweep cost" } },
      { value: "6 GPUs", label: { pt: "Com guardrails CV650", en: "With CV650 guardrails" } },
      {
        value: { pt: "4 Fontes", en: "4 Sources" },
        label: { pt: "RSS, ML, OLX, Enjoei", en: "RSS, ML, OLX, Enjoei" },
      },
    ],
    links: [],
  },
];

export interface CapabilityGroup {
  code: string;
  title: BiText;
  description: BiText;
  items: string[];
}

export const CAPABILITIES: CapabilityGroup[] = [
  {
    code: "01",
    title: {
      pt: "Full Stack, Web & Mobile",
      en: "Full Stack, Web & Mobile",
    },
    description: {
      pt: "Interfaces responsivas e aplicativos multiplataforma com tipagem estrita e foco em fluidez real.",
      en: "Responsive interfaces and multi-platform applications built with strict typing and fluid UX.",
    },
    items: [
      "TypeScript",
      "JavaScript",
      "React 19",
      "Next.js",
      "React Native / Expo",
      "Tailwind CSS",
      "Zustand",
      "Radix UI",
    ],
  },
  {
    code: "02",
    title: {
      pt: "Sistemas, Desktop & Tempo Real",
      en: "Systems, Desktop & Real-Time",
    },
    description: {
      pt: "Apps desktop nativos de baixo consumo, servidores concorrentes e comunicação WebRTC de baixa latência.",
      en: "Low-footprint native desktop applications, concurrent backends, and low-latency WebRTC systems.",
    },
    items: [
      "Rust",
      "Tauri v2",
      "Axum",
      "LiveKit WebRTC",
      "WebSockets",
      "ts-rs",
      "Win32 API",
      "Java",
    ],
  },
  {
    code: "03",
    title: {
      pt: "Dados, Nuvem & Sustentação",
      en: "Data, Cloud & Operations",
    },
    description: {
      pt: "Modelagem relacional, publicação em nuvem, diagnóstico em produção, leitura de logs e continuidade operacional.",
      en: "Relational modeling, cloud deployments, production troubleshooting, log analysis, and operational reliability.",
    },
    items: [
      "PostgreSQL",
      "SQL",
      "Supabase + RLS",
      "SQLite",
      "Cloudflare Pages & R2",
      "Fly.io",
      "Linux CLI",
      "Git",
    ],
  },
  {
    code: "04",
    title: {
      pt: "Automação Python & Agentes de IA",
      en: "Python Automation & AI Agents",
    },
    description: {
      pt: "Orquestração pragmática de agentes de IA para acelerar pipelines em Python, scraping estruturado e QA.",
      en: "Pragmatic AI-agent orchestration accelerating Python automation pipelines, structured scraping, and QA loops.",
    },
    items: [
      "Python 3.12+",
      "AI-Agent Orchestration",
      "Playwright",
      "pywebview",
      "OAuth / REST APIs",
      "pytest",
      "ntfy.sh",
      "PowerShell",
    ],
  },
];

export interface ExperienceItem {
  period: BiText;
  role: BiText;
  org: BiText;
  location: BiText;
  bullets: BiText[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: { pt: "Fev 2024 — Atual", en: "Feb 2024 — Present" },
    role: {
      pt: "Coordenador de Suporte, Manutenção e TI",
      en: "IT Support, Maintenance & Operations Coordinator",
    },
    org: {
      pt: "Secretaria Municipal de Educação e Cultura (SMEC Touros)",
      en: "Municipal Secretariat of Education & Culture (SMEC Touros)",
    },
    location: { pt: "Touros, RN", en: "Touros, RN · Brazil" },
    bullets: [
      {
        pt: "Coordenação da infraestrutura de TI, diagnóstico de incidentes e suporte contínuo da secretaria e de mais de 30 escolas municipais.",
        en: "Lead IT infrastructure, incident troubleshooting, and technical continuity for headquarters and 30+ municipal public schools.",
      },
      {
        pt: "Implantação e acompanhamento em produção do sistema PRISMA, coletando feedback real de servidores e liderando evoluções contínuas.",
        en: "Deployed and iterated the PRISMA internal operations system in real production, handling user feedback and reliability.",
      },
      {
        pt: "Condução da meta de conectividade escolar, entrega de laboratórios de informática e capacitação de professores maker em programação e eletrônica.",
        en: "Drove district-wide school connectivity initiatives, delivered computer labs, and trained maker-space teachers in coding & hardware.",
      },
    ],
  },
  {
    period: { pt: "Nov 2022 — Atual", en: "Nov 2022 — Present" },
    role: {
      pt: "Desenvolvedor Full Stack",
      en: "Full Stack Developer",
    },
    org: {
      pt: "Projetos Autorais & Freelance (PROTHOTYPE)",
      en: "Independent Products & Freelance (PROTHOTYPE)",
    },
    location: { pt: "Remoto", en: "Remote" },
    bullets: [
      {
        pt: "Arquitetura e desenvolvimento ponta a ponta de aplicações Web, Mobile e Desktop com TypeScript (React, Next.js, Expo), Rust (Tauri v2, Axum) e SQL/PostgreSQL.",
        en: "End-to-end architecture and engineering of Web, Mobile, and Desktop apps using TypeScript (React, Next.js, Expo), Rust (Tauri v2, Axum), and SQL/PostgreSQL.",
      },
      {
        pt: "Operação de pipelines em nuvem com Cloudflare Pages, Cloudflare R2, Fly.io e Supabase (Auth, Realtime, Storage e políticas RLS).",
        en: "Cloud operations across Cloudflare Pages, Cloudflare R2, Fly.io, and Supabase (Auth, Realtime, Storage, and RLS policies).",
      },
      {
        pt: "Desenvolvimento de utilitários e automações em Python integrando orquestração com agentes de IA, testes automatizados e telemetria real.",
        en: "Built Python utilities and automation engines combining AI-agent orchestration, automated testing, and real-time telemetry.",
      },
    ],
  },
];

export const EDUCATION = [
  {
    period: { pt: "2021 — 2026 (Trancado)", en: "2021 — 2026 (On Hold)" },
    degree: {
      pt: "Bacharelado em Ciências e Tecnologia · Eng. de Computação",
      en: "B.S. in Science & Technology · Computer Engineering Track",
    },
    school: "Universidade Federal do Rio Grande do Norte (UFRN)",
  },
  {
    period: { pt: "Concluído", en: "Completed" },
    degree: {
      pt: "Formação Complementar em Banco de Dados (SQL) e Java",
      en: "SQL Databases & Java Engineering Track",
    },
    school: "Santander Coders",
  },
];
