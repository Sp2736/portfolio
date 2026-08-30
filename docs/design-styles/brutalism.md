# Brutalism — Surface Style Specification

> Target file in repo: `src/styles/surfaces/brutalism.css`
> Token namespace: `[data-surface="brutalism"]`
> Reference: Neubrutalism / "anti-design" web trend — raw HTML aesthetics, thick borders, offset hard shadows, deliberately "undesigned" typography, high contrast.

---

## 1. Philosophy & Visual DNA

Where Liquid Glass and Claymorphism are about *softness and illusion of physical material*, Brutalism is about **honesty and confrontation**. Nothing is hidden, nothing is smoothed over, nothing pretends to be 3D. Structure is exposed and exaggerated rather than disguised.

Core properties:

1. **Zero border-radius, or near-zero (0–4px max).** Every corner is a right angle. This is the single fastest visual signal of the style and the easiest to get wrong by "softening it a little" — don't. Sharp corners everywhere, no exceptions, no per-component "just this once."
2. **Thick, solid, high-contrast borders** (2–4px), always solid color, never translucent, never a gradient.
3. **Hard offset drop-shadows, not blurred ones.** A shadow with `blur-radius: 0` and a fixed pixel offset (e.g. `6px 6px 0 #000`) simulating a flat cutout sitting above the page, like layered cardboard — not a soft ambient shadow suggesting elevation from light.
4. **Raw, high-contrast color blocking.** Colors should be used at full saturation/opacity from the theme palette, not muted or tinted down. No transparency, no blur, no glow.
5. **Typography as a structural element**, not decoration — bold, often monospace or a single heavy grotesque weight, sometimes deliberately oversized or slightly misaligned in a controlled way (e.g. one heading rotated -1° to +1°) to signal "handmade/raw" rather than "machine-perfect."

---

## 2. Design Tokens

```css
[data-surface="brutalism"] {
  --surface-bg: var(--theme-surface-base); /* full opacity, no color-mix dilution */
  --surface-border: 3px solid var(--theme-fg);
  --surface-radius: 0px;
  --surface-shadow: 6px 6px 0 var(--theme-fg); /* hard, zero blur, solid color not rgba */
  --surface-shadow-hover: 3px 3px 0 var(--theme-fg); /* shadow shrinks toward the element on hover */
  --surface-hover-offset: translate(3px, 3px); /* element moves toward its own shadow */
  --surface-motion-ease: steps(1); /* or a very short linear — brutalism avoids smooth easing */
  --surface-motion-duration: 90ms;
  --surface-font-weight-boost: 700;
}
```

**Critical detail:** the hard shadow's color should usually be the theme's foreground/ink color, not black universally and not the theme's soft `--theme-shadow` token used by the other four styles — Brutalism wants a shadow that reads as "another flat shape," not "atmospheric darkness." Using the same muted shadow token as Glassmorphism will make Brutalism look like a bug (a card with a random offset blur) rather than a coherent style choice.

---

## 3. The Hover Interaction Signature

This is Brutalism's single most recognizable interaction pattern and should be implemented identically across every component using this style:

```css
.surface-panel[data-surface-variant="brutal"] {
  transition: transform var(--surface-motion-duration) linear,
              box-shadow var(--surface-motion-duration) linear;
}
.surface-panel[data-surface-variant="brutal"]:hover {
  transform: var(--surface-hover-offset);
  box-shadow: var(--surface-shadow-hover);
}
```

The element physically moves *toward* its own shadow on hover, so the shadow appears to shrink — as if you pressed the flat cutout down slightly. This single 90ms linear transition, applied consistently, does more to make Brutalism feel intentional and "designed" (ironically) than any other single detail in this document. Skipping it, or using an eased/slow transition instead of `linear`, is the most common way this style ends up looking like "we forgot to finish the CSS" rather than "aggressive by design."

---

## 4. Typography Rules Specific to This Surface

- Force a heavier font-weight on brutalist surfaces even if the base site uses a lighter weight elsewhere — apply `font-weight: var(--surface-font-weight-boost)` to headings/labels inside `[data-surface="brutalism"]` scopes.
- Consider swapping body text to a monospace or grotesque fallback stack *specifically within brutalist-styled components*, if your base typography is a humanist sans — this reinforces the "raw/technical" read. This is one of the few places a style is allowed to touch typography, because Brutalism's whole identity is structural/typographic, not just surface decoration.
- Avoid italic, avoid light-weight text, avoid soft letter-spacing — anything that reads as "refined" contradicts the aesthetic.

---

## 5. Motion Language (Deliberately Anti-Smooth)

- **No easing curves borrowed from the other four styles.** Use `linear` or `steps()` timing functions. Springy/elastic easing (Liquid Glass, Claymorphism) is antithetical here — motion should feel mechanical and immediate, not organic.
- **Entry:** instant appearance or a very short (~100ms) linear fade — no scale-up, no slide, no bounce. Brutalist elements don't "arrive gracefully," they're just suddenly there.
- **Click/active:** the offset-shadow press described in §3, nothing more elaborate.
- Avoid parallax, avoid blur-in, avoid any of your existing Zero-G physics engine effects on brutalist surfaces specifically — physics simulation implies softness and continuous motion, which undercuts the flat/graphic identity. Consider excluding brutalist-styled elements from the Zero-G engine's target selector entirely.

---

## 6. Color Application

Brutalism traditionally leans on **1-2 accent colors used at full strength plus black/white**, rather than a broad palette. Since your themes (Dark Angel, White Devil, Solar Flare, Cosmic) each already define an accent, the rule when Brutalism is active should be: **pick exactly one accent color per surface element and use it at 100% opacity for either the border, the background, or a single highlighted sub-element** — never blend two accent colors on the same brutalist card, and never use accent colors at reduced opacity. If a component currently has a soft gradient background, replace it with a flat single-color fill for this surface mode.

---

## 7. Where To Use It In SP.SYS

Brutalism is arguably the style that fits your **existing "raw system / terminal" identity** best, more so than any of the other four — lean into that:
- Terminal view, JSON override view: these can *stay visually as-is* since they're already brutalist-adjacent (monospace, flat, high-contrast) — but you could tighten the connection by explicitly using `--surface-*` tokens there too instead of one-off terminal-specific styles, so the terminal automatically harmonizes when Brutalism is the active global style and looks intentionally "in-universe" when other styles are active too.
- Project cards, tech-stack tags, nav — strong fit, this is where most Neubrutalist portfolio sites apply the style, and yours already has the "engineered system" framing to justify it narratively.
- Hero panel — works, but consider keeping the boot-sequence animation itself unaffected by surface style (per the `data-surface-exempt` pattern from `claymorphism.md` §6) since boot sequence is a scripted cinematic moment, not a UI surface.

---

## 8. Accessibility Notes

- Brutalism is naturally **the most accessible of the five styles by default** — high contrast, solid colors, no transparency, no blur, clear boundaries. Preserve this; don't add any "refinement" that reduces contrast (e.g. don't be tempted to soften the border to a mid-gray for aesthetic reasons).
- The hover-offset interaction (§3) uses `transform`, which is fine for reduced-motion users at this short a duration (90ms, 3px), but still gate it behind `prefers-reduced-motion` — replace the transform+shadow-shrink with an instant border-color change instead, so there's still a clear hover state without any positional movement.

---

## 9. Prompt Guidance for Gemini 3.1 Pro / Antigravity

- Explicitly forbid it from adding any border-radius "for polish" — a very common failure mode is a model softening brutalist corners slightly because it's trained on generally-rounded modern UI. State the constraint as a hard rule: `--surface-radius: 0px` is non-negotiable for this file.
- Instruct it to implement the hover-offset shadow interaction (§3) with `linear` timing specifically, and to avoid reusing any easing curve token defined for the other four surface styles.
- Ask it to identify which existing components already have brutalist-adjacent styling (terminal, JSON view) and refactor those to consume the new shared tokens rather than leaving them as separate, non-token-based one-offs — this reduces duplicate CSS and makes them respond correctly if the token values are ever tuned later.
