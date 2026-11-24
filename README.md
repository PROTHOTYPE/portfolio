# Portfólio — Pedro Carlos Teixeira Neto

Meu site pessoal e vitrine de projetos, feito em **Next.js**, **TypeScript** e **Tailwind CSS**, com suporte completo a **PT-BR** e **EN** (também aceita `?lang=en` ou `?lang=pt` direto na URL).

- **No ar:** https://prothotype-portfolio.vercel.app
- **Laboratório interativo:** https://prothotype-portfolio.vercel.app/lab

## Duas visões no mesmo projeto

Organizei o portfólio em duas rotas porque nem sempre quem abre está procurando a mesma coisa:

- **`/` (Engenharia & Carreira):** versão direta para recrutadores e times de tecnologia — resumo técnico, cases com arquitetura dos projetos, stack, experiência na SMEC Touros e formação.
- **`/lab` (PROTHOTYPE Lab):** vitrine pessoal e laboratório interativo, com simuladores clicáveis dos quatro projetos e capturas reais de tela.

Também há uma paleta rápida (`Ctrl+K` / `⌘K`) para alternar entre as visões, trocar o idioma ou abrir qualquer case técnico.

## Projetos em destaque

- **[Cafofo](https://github.com/PROTHOTYPE/cafofo):** app desktop (Tauri v2 + Rust + Axum) e web de voz, chat, screen share 16:9 e bot de música sincronizado com LiveKit, Supabase e Cloudflare R2.
- **PRISMA (SMEC Touros):** sistema multiplataforma (Expo, React Native Web e Supabase) para gestão de demandas, protocolo de ofícios e geração do Relatório Anual em PDF A4 nos 15 setores da secretaria.
- **Dynamic Island para Windows 11:** overlay nativo de topo em Python + Win32 API + Edge WebView2 (< 25 MB de RAM), com lançador rápido, telemetria e controle de mídia *(orquestrado com agentes de IA na automação e testes multi-DPI)*.
- **GPU Hunter BR:** monitor de preços e quedas de placas de vídeo no Brasil em Python + SQLite + `ntfy.sh`, com filtros de compatibilidade elétrica (Corsair CV650) e teto < R$ 3.000 *(loop local 0-tokens + ingestão de catálogos via agentes de IA)*.

## Stack

- Next.js 16 (App Router) & React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion & Lucide Icons

## Rodando localmente

```bash
npm install
npm run dev
```

O servidor sobe em `http://localhost:3000`. Para gerar o build de produção:

```bash
npm run build
npm run start
```

## Onde editar o conteúdo

- `src/data/portfolio.ts` concentra os textos em PT-BR/EN, links, projetos, métricas, experiência e formação.
- `src/components/engineering/` reúne a versão principal (`/`).
- `src/components/lab/` reúne o laboratório e os quatro simuladores (`/lab`).

## Licença

[MIT](LICENSE)
