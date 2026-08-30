# 🛰️ SP.SYS — Interactive Portfolio Environment

> **Note on this file:** this is a *forward-looking* draft, written before the Surface Style system is actually implemented. It merges your existing live README content with the new system so you have the finished target to build toward and to swap in once the code lands. Once Liquid Glass / Glassmorphism / Claymorphism / Brutalism / Neomorphism are actually shipped, replace any `(planned)` markers below with real screenshots/GIFs and confirm every claim against the live site before publishing.

A cinematic portfolio that behaves less like a website
and more like a **strange operating system accidentally running inside your browser** — now with a fully interchangeable material system layered on top.

*Warning: You may break reality. Or at least the UI.*

---

## What Is SP.SYS?

SP.SYS is not a normal portfolio.

It is an **interactive digital environment** disguised as a website. Instead of showing information through plain sections and cards, the site behaves like a **runtime system** that reacts to user input, browser telemetry, mouse physics, and hidden trigger protocols. The browser becomes a **simulation container**, and the portfolio becomes a **system interface**.

```
Portfolio + Physics Engine + Terminal + Chaos
```

---

## Two Independent Visual Axes

SP.SYS now separates **what colors you see** from **what material everything is made of** — two orthogonal systems that combine freely.

### Axis 1 — Theme (color & mood)
Controlled via `data-theme` on `<html>`, unchanged from before:

| Theme | Character |
|---|---|
| **Dark Angel** | White phosphor visual traces |
| **White Devil** | High-contrast dark rendering |
| **Solar Flare** | Burnt orange thermal fragments |
| **Cosmic** | Blue atmospheric particles |

### Axis 2 — Surface Style (material & depth) *(planned)*
Controlled independently via `data-surface` on `<html>`, selectable from a visible switcher in the header next to the theme toggle:

| Style | Character |
|---|---|
| **Glassmorphism** *(baseline — this is what the site already looks like today)* | Frosted, translucent, calm |
| **Liquid Glass** | Refractive, specular-tracking, elastic — a living lens |
| **Claymorphism** | Soft, puffy, dual-shadow, toy-like matte material |
| **Brutalism** | Flat, sharp-cornered, hard offset shadows, raw and confrontational |
| **Neomorphism** | Monochromatic soft-UI, depth from shadow alone, carved from one surface |

Any theme × any style combination is valid — e.g. Cosmic + Brutalism, Solar Flare + Liquid Glass, White Devil + Neomorphism. Full technical specifications for each style live in `/docs/design-styles/`:
`glassmorphism.md` · `liquid-glass.md` · `claymorphism.md` · `brutalism.md` · `neomorphism.md`

Certain surfaces are intentionally **exempt** from the active style (the boot sequence, the raw terminal/JSON view) via a `data-surface-exempt` attribute, since those moments are scripted/technical rather than general UI chrome.

---

## System Features

### Boot Sequence Interface
A cinematic initialization sequence simulating a system boot:
- **Text Decryption Animation** — characters scramble and decrypt in real time.
- **Liquid Curtain Transition** — the interface reveals itself through fluid motion.
- **Theme-Aware Initialization** — reads theme preference before rendering to avoid flicker.
- **Motion Physics Animation Pipeline** — Framer Motion physics-driven transitions.
- The boot sequence renders in a neutral, surface-style-exempt state regardless of the active `data-surface`, preserving its cold/technical identity.

### Real-Time System Telemetry
A live telemetry panel reading data from your browser: GPU renderer detection (WebGL), memory usage (JS heap), network intelligence (downlink/latency), and performance metrics (live FPS, frame timing). This same GPU-detection signal now also drives the **Surface Style tier resolver** *(planned)* — e.g. downgrading Liquid Glass's refraction layer to a cheaper fallback automatically on lower-tier GPUs.

### Zero-Gravity Interaction Engine
UI elements detach from layout and drift through the interface via a custom vector-based motion system — collision simulation, velocity decay, gravity/drift mechanics. *(Planned interaction note: Brutalist-styled elements are excluded from this engine's target selector, since continuous physics motion contradicts the flat/static Brutalist identity.)*

### Hidden Interaction Protocols
Secret, terminal-style triggers activated by typing anywhere on the page (when not focused on an input):

| Trigger | Effect |
|---|---|
| Shake the cursor aggressively | **Thermal Override** — interface melts like overheated hardware |
| Click Antigravity icon in tech arsenal | Antigravity easter egg |
| Click profile picture 4–5 times | **Caffeinated Author** mode |
| Type `invert` | **Inversion Protocol** — colors invert under the cursor |
| Special word | Reveals a quote from *"Before I Learned Goodbye"* |
| Type `leak` | **Ghost Script Leak** — DOM fragments trail the cursor |
| `Shift + Left Click` | **Wall Punches** — punch permanent cracks into the interface |
| Type `json` | **API View** — unmounts the GUI, shows raw JSON with copy-to-clipboard (`ESC` to return) |
| Type `resume` or `cv` | **ATS Resume Engine** — live-preview CV generator, 3 formatting algorithms, print-to-PDF export |
| Type `zen` | **Focus/Zen Mode** — kills background effects and telemetry, centers reading content (`ESC` to restore) |

### Environment-Aware Rendering
A single `MutationObserver` watches `<html>` for both `data-theme` **and** `data-surface` attribute changes *(planned extension)* and dynamically adjusts rendering palettes and material tokens accordingly — one shared observer, not two parallel ones.

### Interaction Recovery & Stability
- **Automatic Stabilization** — effects reset after several seconds.
- **Protocol Toggle** — typing a trigger again disables the effect.
- **Hard Reset** — refreshing the page restores the original interface.

---

## Technology Stack

- **Next.js** — application architecture
- **React** — component composition
- **Tailwind CSS** — styling system
- **Framer Motion** — animation and motion physics
- **Shadcn UI** — component framework
- **Lucide Icons** — interface iconography
- **Vercel** — deployment platform

Surface Style system additions *(planned)*: a shared `--surface-*` CSS custom property schema (`--surface-bg`, `--surface-border`, `--surface-blur`, `--surface-radius`, `--surface-shadow`, plus style-specific tokens) consumed by shared `.surface-panel` / `.surface-button` / `.surface-nav` utility classes, a `resolveSurfaceTier()` GPU/motion-preference-aware fallback resolver, and (for Liquid Glass) a reusable `useSpecularTracking()` pointer-tracking hook.

---

## Design Documentation

Full build specifications for every surface style — philosophy, exact design tokens, motion language, accessibility requirements, and where each style should and shouldn't be used across the site — live in:

```
/docs/design-styles/
├── glassmorphism.md   ← baseline audit + hardening notes (current live style)
├── liquid-glass.md
├── claymorphism.md
├── brutalism.md
└── neomorphism.md
```

These were written as direct build specs for use with **Gemini 3.1 Pro inside Antigravity**.

---

## Why This Exists

SP.SYS was built to explore a simple idea:
> A portfolio does not have to behave like a webpage.

It can behave like a digital environment, a playground for interface physics, a browser-based simulation, and a technical showcase — and now, a demonstration that a single interface can convincingly wear five completely different material languages without losing its underlying identity or breaking any of its existing chaos systems.

---

## Final Note

SP.SYS was intentionally designed to feel **alive**. Not static. Not predictable. Not entirely stable.

Because the most interesting interfaces are the ones that make users stop and think:
> "Wait… did I just break the website?"

If that happens, the system is working exactly as intended.
