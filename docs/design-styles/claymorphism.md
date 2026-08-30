# Claymorphism — Surface Style Specification

> Target file in repo: `src/styles/surfaces/claymorphism.css`
> Token namespace: `[data-surface="claymorphism"]`
> Reference: the "clay UI" trend (Figma community kits, ~2021-22) — soft, puffy, toy-like 3D surfaces molded from a single material.

---

## 1. Philosophy & Visual DNA

Claymorphism simulates **soft, thick, moldable material** — think a UI made of stress-ball foam or fondant icing, not glass or metal. Every element looks like it was pressed into shape from a single block of matte material, with light rolling gently over rounded, puffy edges.

Three non-negotiable properties:

1. **Dual shadow system** — every surface needs *both* a light-side highlight shadow (simulating light hitting the raised top-left edge) *and* a dark-side shadow (simulating the recessed bottom-right edge), simultaneously, on the *same element*. This is what separates Claymorphism from ordinary soft-UI drop shadows.
2. **Exaggerated, consistent border-radius.** Sharp corners are the enemy of this style. Even small elements (buttons, tags, icons) get generous rounding — nothing should look like it could cut you.
3. **Matte, saturated, low-contrast fills.** No transparency, no gloss/specular highlights (that's Liquid Glass's job), no gradients that look metallic. Flat pastel-leaning or muted-saturated fills only, derived from the active theme's palette but desaturated ~15-20% and lightened, so the material reads as "soft" rather than "vivid."

---

## 2. Design Tokens

```css
[data-surface="claymorphism"] {
  --surface-bg: color-mix(in srgb, var(--theme-surface-base) 88%, white 12%);
  --surface-radius: 32px; /* generous, consistent across ALL components */
  --surface-border: none; /* claymorphism has no hard border — shadows define the edge */

  /* The dual-shadow signature */
  --surface-shadow:
    -8px -8px 16px color-mix(in srgb, white 45%, transparent),
    8px 8px 20px color-mix(in srgb, var(--theme-shadow) 35%, transparent);

  /* Pressed / inset variant, for active states */
  --surface-shadow-pressed:
    inset -6px -6px 12px color-mix(in srgb, white 30%, transparent),
    inset 6px 6px 16px color-mix(in srgb, var(--theme-shadow) 40%, transparent);

  --surface-saturation-adjust: 0.85; /* apply via filter: saturate() on fills, not on content */
  --surface-motion-ease: cubic-bezier(0.34, 1.56, 0.64, 1); /* springy, toy-like */
}
```

**Dark themes need special handling.** The classic Claymorphism look was designed for light backgrounds (a light-source highlight only reads clearly on pale material). On Dark Angel or Cosmic, invert the shadow-light logic: the "highlight" shadow should use a lighter tint of the surface itself (not pure white, or it'll look like a sticker) and the "depth" shadow should go nearly black, not just darker-theme-shadow:

```css
[data-theme="dark-angel"][data-surface="claymorphism"] {
  --surface-bg: color-mix(in srgb, var(--theme-surface-base) 92%, white 8%);
  --surface-shadow:
    -6px -6px 14px color-mix(in srgb, var(--theme-surface-base) 60%, white 20%),
    8px 8px 22px color-mix(in srgb, black 55%, transparent);
}
```

Without this override, Claymorphism on a dark theme will look muddy and undefined rather than "puffy" — the dual-shadow illusion depends on real luminance contrast between the two shadow directions, which dark palettes compress by default.

---

## 3. Structural Pattern

Unlike Liquid Glass, Claymorphism needs **no extra DOM nodes** — it's pure CSS on the existing element:

```css
.surface-panel[data-surface-variant="clay"] {
  background: var(--surface-bg);
  border-radius: var(--surface-radius);
  box-shadow: var(--surface-shadow);
  border: var(--surface-border);
  transition: box-shadow 220ms var(--surface-motion-ease), transform 220ms var(--surface-motion-ease);
}
.surface-panel[data-surface-variant="clay"]:active {
  box-shadow: var(--surface-shadow-pressed);
  transform: scale(0.98);
}
```

This simplicity is a genuine advantage: Claymorphism is the **cheapest style to implement and the cheapest to render** (no blur, no filters, no extra layers) — good to know for performance budgeting if the site ends up needing to fall back to something on low-end devices generally, not just as a Liquid Glass fallback.

---

## 4. Typography & Iconography Pairing

Clay surfaces read best with **rounded, friendly typefaces and icon sets** — if your current headings use a sharp/technical font (likely, given SP.SYS's terminal/OS aesthetic), Claymorphism will visually clash unless you also swap the icon corner treatment. You don't need to swap the whole font family (that would break "keep everything as-is" for the other styles), but consider:
- Rounding icon stroke `linejoin`/`linecap` to `round` specifically when `data-surface="claymorphism"` is active (Lucide icons support a `strokeLinejoin` prop — toggle it per surface).
- Increasing tracking/letter-spacing slightly (+0.01em) on clay surfaces — tight tracking reads as "sharp/technical," which fights the soft material metaphor.

---

## 5. Motion Language

Claymorphism should feel **physically squishable**:

- **Hover:** slight lift — `transform: translateY(-4px)`, shadow spread increases (+4px on both shadow layers) to simulate the object rising further off the surface.
- **Press:** switch to `--surface-shadow-pressed` (inset shadows) + `scale(0.98)`, simulating the material compressing under a finger. Duration ~120ms, snappy.
- **Release:** spring back with `--surface-motion-ease` (the overshoot cubic-bezier) — a small bounce past 1.0 scale before settling, like foam decompressing.
- Entry animations can use a "squash and stretch" — scale in on Y-axis first (0.85 → 1.05 → 1.0) then X catches up, over ~400ms. This is a classic animation-principle trick (anticipation + overshoot) that reads as "soft material" even without any 3D rendering.

---

## 6. Where To Use It In SP.SYS

Claymorphism is a strong **playful counterpoint** to your site's otherwise "cinematic OS / terminal" identity — this contrast can be a genuine strength if framed as an intentional Easter-egg-adjacent mode ("what if SP.SYS had a friendly skin?") rather than trying to make it look native to the boot-sequence aesthetic:
- Skill/tech tag chips — excellent fit, chips are small and rounding reads well at that scale.
- Project cards in the grid — good fit, this is Claymorphism's classic use case (card grids).
- Terminal / JSON view — **do not apply**; keep those surfaces literally unstyled regardless of active surface style, since they're meant to look like raw system output. Treat them as a `data-surface-exempt` region.
- Boot sequence — avoid; the boot sequence's identity is "cold, technical, decrypting" — clay's warmth actively undermines that specific moment. Consider **scoping the surface style to apply only after boot completes**, i.e. the boot sequence always renders in a neutral/unstyled state regardless of the user's chosen `data-surface`.

---

## 7. Accessibility Notes

- Dual-shadow depth cues are **the only** depth signal in this style (no border, no color difference) — for users with low vision or on high-glare displays, this can render as "no distinguishable card at all." Add a `prefers-contrast: more` fallback that adds a thin 1px border in addition to the shadows.
- Because fills are matte and low-saturation, verify text-on-clay contrast carefully — pastel backgrounds with default-weight body text often fail WCAG AA. You may need a slightly darker `--surface-bg` specifically for text-heavy clay surfaces vs. decorative ones.

---

## 8. Prompt Guidance for Gemini 3.1 Pro / Antigravity

- Instruct it to build and screenshot-test the dark-theme shadow override (§2) specifically — this is the one part of Claymorphism most likely to look wrong if implemented naively (i.e., just reusing the light-theme shadow formula with darker color inputs, which doesn't work here).
- Ask it to implement the `data-surface-exempt` escape hatch (§6) as a shared attribute usable by *any* future style, not something clay-specific, since Brutalism will likely want a similar exemption for the terminal view for the opposite reason (already brutalist-adjacent).
- Have it verify text contrast ratios programmatically (e.g. computing relative luminance of `--surface-bg` against the theme's text color) rather than eyeballing it, and report any combination under WCAG AA.
