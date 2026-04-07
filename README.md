# Nativewit — Company Introduction Video

A **23-second, 1920×1080 company introduction video** for [Nativewit Technologies](https://www.nativewit.in/) built entirely with [Remotion](https://www.remotion.dev/) and React. No video editor. Every frame is code.

![Nativewit Logo](public/logo.png)

---

## Preview

| Scene | Duration | Content |
|---|---|---|
| Brand Intro | 3s | Logo reveal with red radial glow |
| Hero Statement | 3s | "We engineer products that ship." |
| Services | 5s | Product Engineering · AI Integration · CTO-as-a-Service |
| Stats | 4s | 30+ products · 5.0 Clutch · 12 weeks · 99.7% crash-free |
| Process | 4s | Discover → Architect → Build → Launch |
| Outro | 4s | CTA — "Ready to build your next product?" |

---

## Tech Stack

- **[Remotion 4](https://www.remotion.dev/)** — Code-based video rendering
- **React 18** — Component model for scenes
- **TypeScript** — Type-safe props and data
- **Node.js / npm** — Build toolchain

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Preview in Remotion Studio

```bash
npm run dev
```

Opens **http://localhost:3000** — select any composition from the sidebar to preview and scrub through the timeline.

### Render to MP4

```bash
npm run build
```

Outputs `out/NativewitIntro.mp4` — 1920×1080, 30fps, H.264, ~2.2 MB.

---

## Project Structure

```
remotion/
├── public/
│   └── logo.png                 # Nativewit brand logo
├── src/
│   ├── index.ts                 # Entry — registerRoot()
│   ├── Root.tsx                 # Registers all Compositions
│   ├── theme.ts                 # Brand colors & font (from nativewit.in)
│   ├── compositions/
│   │   └── NativewitIntro.tsx   # Main 23s composition (orchestrates scenes)
│   ├── scenes/
│   │   ├── BrandIntro.tsx       # Logo reveal
│   │   ├── HeroStatement.tsx    # Tagline
│   │   ├── Services.tsx         # Three service cards
│   │   ├── Stats.tsx            # Animated metric counters
│   │   ├── Process.tsx          # 4-step process flow
│   │   └── Outro.tsx            # CTA + contact
│   └── utils/
│       └── markdown.ts          # Animation helper utilities
├── system_design.md             # Full architecture & component docs
├── remotion.config.ts           # Output settings
└── package.json
```

---

## Brand Theme

All scenes use the exact color palette from [nativewit.in](https://www.nativewit.in/):

| Token | Value | Usage |
|---|---|---|
| Background | `#0a0a0a` | Full-screen bg |
| Surface | `#141414` | Cards & panels |
| Border | `rgba(255,255,255,0.1)` | Card borders |
| Text Primary | `#ffffff` | Headlines |
| Text Secondary | `rgba(255,255,255,0.5)` | Body text |
| Accent | `#e63434` | Buttons, labels, glows |
| Font | Nunito → Inter → sans-serif | All text |

---

## Architecture

```
index.ts → Root.tsx → NativewitIntro.tsx
                           │
              ┌────────────┼─────────────────┐
         BrandIntro  HeroStatement  Services  Stats  Process  Outro
              │                                │
           logo.png                        theme.ts
```

See [system_design.md](system_design.md) for a full explanation of every component, Remotion concepts, and how to modify the video.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Remotion Studio at localhost:3000 |
| `npm run build` | Render `NativewitIntro` to `out/NativewitIntro.mp4` |
| `npm run upgrade` | Upgrade Remotion packages |

---

## License

Private. © 2026 Nativewit Technologies Pvt Ltd.
