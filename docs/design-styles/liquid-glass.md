# Liquid Glass — Surface Style Specification

> Target file in repo: `src/styles/surfaces/liquid-glass.css`
> Token namespace: `[data-surface="liquid-glass"]`
> Reference material: Apple's "Liquid Glass" (visionOS/iOS 26 design language), taken further into a living, reactive material.

---

## 1. Philosophy & Visual DNA

Liquid Glass is **not** Glassmorphism with more blur. Glassmorphism is a *static* frosted pane sitting on top of content. Liquid Glass is a **living, optically-reactive material** — it behaves like a real, refractive lens with surface tension, and it *changes its own body* in response to what's underneath it and where the user's cursor is.

Three properties define it, and if any one is missing, it just reads as "glassmorphism with extra steps":

1. **Refraction, not just blur.** Light bends around the edges of the object, subtly displacing/warping what's behind it near the border. Blur alone flattens; refraction gives the material physical thickness.
2. **Specular response.** A highlight — a soft, moving hotspot of light — tracks the cursor or a fixed "light source" angle, as if the glass has a curved surface catching light. This is the single highest-impact detail for making the material feel "alive."
3. **Elastic/liquid motion.** Shape changes (open/close, hover, resize) are not linear fades — they behave like a viscous fluid: slight overshoot, squash-and-stretch on the border-radius, a "settle" wobble at the end of a transition.

Think: a droplet of water or a curved lens sitting above your UI, not a sheet of frosted acrylic.

---

## 2. Where This Style Should NOT Be Used

Because it's the most expensive, most animated, most attention-grabbing surface, use it **sparingly and intentionally**:

- Hero panel, the primary CTA button, the nav bar (as a floating pill), modals, and 1–2 "hero" project cards — yes.
- Every single card in a dense project grid — no. At scale, 30 refracting/specular surfaces on screen simultaneously will (a) tank frame rate, (b) visually compete with each other so nothing looks special, (c) become nauseating.
- **Rule of thumb:** Liquid Glass is a *lead actor* material. Use it for 3–6 elements per viewport max. Supporting elements should downgrade gracefully to Glassmorphism (see §7).

---

## 3. Design Tokens

```css
[data-surface="liquid-glass"] {
  /* Material body */
  --surface-bg: color-mix(in srgb, var(--theme-surface-base) 55%, transparent);
  --surface-blur: blur(24px) saturate(180%) brightness(1.05);
  --surface-border: 1px solid color-mix(in srgb, var(--theme-fg) 22%, transparent);
  --surface-radius: 28px;

  /* Depth */
  --surface-shadow:
    0 8px 32px color-mix(in srgb, var(--theme-shadow) 25%, transparent),
    inset 0 1px 1px color-mix(in srgb, white 35%, transparent),
    inset 0 -1px 8px color-mix(in srgb, var(--theme-fg) 8%, transparent);

  /* Specular highlight (positioned via JS, see §5) */
  --surface-specular-size: 220px;
  --surface-specular-opacity: 0.35;
  --surface-specular-color: color-mix(in srgb, white 80%, var(--theme-accent) 20%);

  /* Motion */
  --surface-elastic-ease: cubic-bezier(0.34, 1.56, 0.64, 1); /* overshoot */
  --surface-settle-duration: 480ms;
  --surface-hover-scale: 1.015;

  /* Refraction edge (border warp) */
  --surface-refraction-strength: 2px; /* max displacement */
}
```

Notes:
- `--theme-surface-base`, `--theme-fg`, `--theme-shadow`, `--theme-accent` are your **existing theme tokens** (Dark Angel / White Devil / Solar Flare / Cosmic already define these). Liquid Glass never hardcodes a hex value — it always derives from the active theme via `color-mix()`, which is exactly why the two systems stay orthogonal.
- On **White Devil** (light theme) invert the specular color mix and drop `brightness` to `0.98`, or the highlight will blow out to solid white and look broken. Add a `[data-theme="white-devil"][data-surface="liquid-glass"]` override block.

---

## 4. Structural Markup Pattern

```html
<div class="surface-panel surface-liquid" data-liquid>
  <div class="surface-liquid__specular" aria-hidden="true"></div>
  <div class="surface-liquid__refraction-edge" aria-hidden="true"></div>
  <div class="surface-liquid__content"><!-- real content --></div>
</div>
```

- `.surface-liquid__specular` — an absolutely positioned radial-gradient div, `pointer-events: none`, moved via `transform: translate()` in a `requestAnimationFrame` loop bound to `mousemove` (scoped to the element, not `window`, for performance).
- `.surface-liquid__refraction-edge` — a 1–2px inset pseudo-border using an SVG `feDisplacementMap` filter or a CSS `backdrop-filter: url(#glass-distortion)` referencing an inline SVG filter. This is the hardest part technically — see §6.

---

## 5. Specular Highlight Implementation

```js
function bindSpecular(el) {
  const highlight = el.querySelector('.surface-liquid__specular');
  let raf = null;
  el.addEventListener('pointermove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      highlight.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    });
  });
  el.addEventListener('pointerleave', () => {
    // ease back to a default "ambient light" position, e.g. top-left
    highlight.style.transform = 'translate(20%, 15%) translate(-50%, -50%)';
  });
}
```

For elements the cursor can't reach (mobile, or off-screen), fall back to a slow **ambient drift animation** — the specular gently orbits a fixed point over 8–12s using a CSS `@keyframes` loop, so the material never looks dead on touch devices.

---

## 6. Refraction (the hard part — tiered approach)

Real refraction requires backdrop distortion, which browser support varies on. Implement in three tiers and feature-detect:

**Tier 1 (best): SVG `feDisplacementMap` + `backdrop-filter: url(#id)`**
```html
<svg style="display:none">
  <filter id="glass-distortion">
    <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="7" result="noise"/>
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="8"/>
  </filter>
</svg>
```
```css
.surface-liquid__refraction-edge { backdrop-filter: url(#glass-distortion) blur(2px); }
```
Chromium supports this well; Safari support is inconsistent — test on device.

**Tier 2 (fallback): fake refraction with layered box-shadows.** A thin inner-glow ring + a slightly offset duplicate of the border-radius shape with a hue-shifted border creates a cheap chromatic-aberration illusion without any filter cost.

**Tier 3 (low-power fallback): drop refraction entirely**, keep blur + specular only. This is still recognizably "Liquid Glass-ish" and costs almost nothing.

Feature-detect via `CSS.supports('backdrop-filter: url(#x)')` and via your **existing GPU telemetry panel** — you already extract the WebGL renderer string for the telemetry HUD; reuse that exact signal to pick a tier at mount time instead of duplicating GPU-detection logic.

---

## 7. Graceful Degradation Chain

Liquid Glass → Glassmorphism → flat surface, in that order, triggered by (in priority order):
1. `prefers-reduced-motion: reduce` → disable specular tracking + elastic overshoot, keep static blur only.
2. `prefers-reduced-transparency: reduce` → drop `backdrop-filter` entirely, use solid `--theme-surface-base`.
3. Low-tier GPU (from telemetry signal) → drop refraction (Tier 3 above).
4. `backdrop-filter` unsupported → solid fallback background, no blur.

This chain should be a single shared utility (`resolveSurfaceTier()`), not duplicated per component, since Glassmorphism will reuse steps 2–4.

---

## 8. Motion Language

- **Entry:** scale from 0.92 → 1.0 with `--surface-elastic-ease`, opacity 0 → 1 over 480ms. Specular fades in 150ms after the shape settles (light "catches" the glass after it forms).
- **Hover:** scale to `--surface-hover-scale`, specular hotspot brightens (+10% opacity), border brightens slightly. No layout shift — use `transform`, never `width/height`.
- **Press/active:** quick squash — `scaleY(0.985) scaleX(1.005)` for 80ms, then spring back. This is the "liquid tension" moment.
- **Exit:** faster than entry (~220ms), slight downward drift (`translateY(6px)`) + fade, as if the droplet is being absorbed back into the surface.

---

## 9. Where To Use It In SP.SYS Specifically

Given your existing component inventory:
- Hero panel background card → yes, flagship use.
- Primary CTA / "resume" trigger button → yes.
- Nav bar, if converted to a floating pill → yes, this is a classic Liquid Glass use case (see iOS tab bars).
- Terminal / JSON override view → **no** — those are intentionally raw/technical, glass would fight that aesthetic.
- Zero-G interaction engine objects → interesting combination, but test carefully: physics + specular tracking + refraction simultaneously is the most GPU-expensive combo in the entire site. Consider disabling refraction specifically during an active Zero-G event.

---

## 10. Prompt Guidance for Gemini 3.1 Pro / Antigravity

When handing this file to the model as a build spec, explicitly instruct it to:
- Implement `resolveSurfaceTier()` **once**, shared across all surface styles, not per-component.
- Never hardcode a color — every value must derive from the active `data-theme` via `color-mix()` or CSS custom property fallback chains.
- Build the specular-tracking hook as a reusable `useSpecularTracking(ref)` (if React) so it isn't reimplemented per component.
- Test the SVG displacement filter tier on both Chromium and WebKit before committing to it as the default tier — ask it to report actual rendering differences, not assume support.
