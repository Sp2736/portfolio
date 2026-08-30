# Neomorphism (Soft UI) — Surface Style Specification

> Target file in repo: `src/styles/surfaces/neomorphism.css`
> Token namespace: `[data-surface="neomorphism"]`
> Reference: "Soft UI" / Neumorphism trend (2019-20 Dribbble era) — elements that appear to be extruded from or pressed into the same material as the background, using only dual soft shadows to imply depth.

---

## 1. Philosophy & Visual DNA

Neomorphism's defining, non-negotiable rule: **the surface and the background are the same color.** There is no border, no background-color contrast, no opacity difference between a card and the page behind it. All depth — the sense that something is a raised button vs. a page background — comes *entirely* from two soft, diffuse shadows: a light one and a dark one, positioned as if from a single consistent light source above the whole page.

This makes Neomorphism simultaneously:
- The most visually minimal and monochromatic of the five styles.
- The most technically strict — get the shadow math even slightly wrong and elements either look like flat error-less blobs (not enough contrast) or like they're floating with a visible outline (too much contrast, which defeats the "carved from one material" illusion).
- The style with the worst inherent accessibility properties (see §7), which needs to be designed around deliberately, not discovered as a problem after the fact.

Two states an element can be in:
1. **Raised (convex):** looks like it's popping out of the background — light shadow top-left, dark shadow bottom-right, both external.
2. **Pressed/inset (concave):** looks like it's sunk into the background — same two shadows, but `inset`. Used for active/toggled/selected states.

---

## 2. Design Tokens

```css
[data-surface="neomorphism"] {
  /* THE core rule: background must equal the page background, not a tinted variant */
  --surface-bg: var(--theme-page-bg);

  --surface-radius: 20px;
  --surface-border: none;

  --surface-light-shadow: color-mix(in srgb, var(--theme-page-bg) 60%, white 40%);
  --surface-dark-shadow: color-mix(in srgb, var(--theme-page-bg) 60%, black 40%);
  --surface-shadow-distance: 8px;
  --surface-shadow-blur: 16px;

  --surface-shadow:
    calc(-1 * var(--surface-shadow-distance)) calc(-1 * var(--surface-shadow-distance)) var(--surface-shadow-blur) var(--surface-light-shadow),
    var(--surface-shadow-distance) var(--surface-shadow-distance) var(--surface-shadow-blur) var(--surface-dark-shadow);

  --surface-shadow-pressed:
    inset calc(-1 * var(--surface-shadow-distance)) calc(-1 * var(--surface-shadow-distance)) var(--surface-shadow-blur) var(--surface-light-shadow),
    inset var(--surface-shadow-distance) var(--surface-shadow-distance) var(--surface-shadow-blur) var(--surface-dark-shadow);

  --surface-motion-duration: 200ms;
  --surface-motion-ease: ease-in-out; /* smooth, gradual — never springy, never linear */
}
```

Requires a new theme-level token, `--theme-page-bg`, if one doesn't already exist explicitly (as opposed to being implied by a body background image/gradient) — **Neomorphism cannot work over a busy gradient, particle field, or image background**, because the light/dark shadow illusion depends on a single flat, known color to blend against. This is a hard technical constraint, not a style preference (see §6).

---

## 3. Structural Pattern

Pure CSS, same as Claymorphism — no extra DOM nodes needed:

```css
.surface-panel[data-surface-variant="neo"] {
  background: var(--surface-bg);
  border-radius: var(--surface-radius);
  box-shadow: var(--surface-shadow);
  transition: box-shadow var(--surface-motion-duration) var(--surface-motion-ease);
}
.surface-panel[data-surface-variant="neo"][data-state="pressed"],
.surface-panel[data-surface-variant="neo"]:active {
  box-shadow: var(--surface-shadow-pressed);
}
```

For toggles/switches specifically (a very natural Neomorphism use case), the "on" state should use the pressed/inset shadow permanently until toggled off, with the toggle knob itself using the *raised* shadow — the classic "inset track, raised knob" pattern.

---

## 4. Getting the Shadow Math Right (Where This Style Usually Fails)

The single most common Neomorphism implementation mistake: using shadow colors that are **pure black/white at some opacity** (e.g. `rgba(0,0,0,0.2)` / `rgba(255,255,255,0.5)`) instead of colors derived from the actual background hue. This makes the shadows look like generic drop-shadows rather than "light interacting with this specific material," and breaks immediately on any non-neutral-gray background (which Solar Flare and Cosmic both are, being warm-orange and blue-toned respectively).

The `color-mix(in srgb, var(--theme-page-bg) 60%, white 40%)` approach in §2 is mandatory, not optional, specifically so that:
- On Solar Flare (warm background), the "light" shadow reads as a warm cream, and the "dark" shadow reads as a burnt umber — both clearly related to the base color.
- On Cosmic (cool blue background), the light shadow reads as pale blue-white, the dark shadow as deep navy.

If you skip this and use generic black/white shadows, Neomorphism will look identical and disconnected from theme identity across all 4 themes, which defeats the entire point of keeping surface style and color theme as two independently meaningful axes.

---

## 5. Motion Language

Neomorphism is **slow, smooth, and tactile** — the opposite of Brutalism's instant snap and distinct from Liquid Glass's elastic overshoot:

- **Hover:** very subtle — shadow distance/blur can increase marginally (+2px) to suggest the element rising slightly closer to the light source. No transform/scale change; Neomorphism elements shouldn't move in space, only their *shadow* should shift, because the whole illusion depends on the element appearing to be part of the same continuous material as the background.
- **Press:** cross-fade from raised to inset shadow over ~150ms `ease-in-out` — should feel like slowly pressing into foam, not a snap.
- **No bounce, no overshoot, no scale changes ever.** Any transform beyond shadow interpolation breaks the "carved from one surface" metaphor immediately, because a floating/moving element implies it's a separate object rather than a deformation of the same material as the background.

---

## 6. Hard Constraint: Background Compatibility

Because this style requires a flat, known page-background color, **and your site has animated backgrounds (particle systems, gradients, telemetry visualizations per the "Environment-Aware Rendering" system)**, Neomorphism cannot be applied globally without modification. Two real options:

- **Option A (recommended):** When `data-surface="neomorphism"` is active, temporarily suppress/simplify the animated background layer to a flat `--theme-page-bg` color for the duration, and only re-enable particles/gradients when a different surface style is selected. This is a legitimate, describable trade-off ("Neomorphism mode trades ambient effects for tactile depth") rather than a bug.
- **Option B:** Scope Neomorphism to only apply within panels that already sit on a solid background sub-region (e.g. inside a modal with its own solid backdrop), and leave it unavailable/degrading to Glassmorphism for elements sitting directly over the animated hero background.

Document whichever you choose directly in code comments, because this is the one style where "just add the CSS" is not sufficient — it has a real architectural dependency on what's already true about your page background, and Gemini/Antigravity needs to know this constraint exists before it starts implementing, or it will produce shadows that look broken over your particle field and you'll spend a long debugging session assuming it's a color-mix bug when it's actually a background-compatibility issue.

---

## 7. Accessibility Notes (Important — This Style Needs the Most Compensation)

Neomorphism is well-documented across the design industry as **the least accessible of the popular soft-UI trends**, for two compounding reasons:
- Zero color/border differentiation between interactive elements and background means low-vision users, and anyone in bright ambient light (a huge factor on mobile), may not perceive that a button *is* a button at all.
- Because shadows are the only depth cue, `prefers-reduced-motion` and `prefers-contrast: more` users need a real structural fallback, not just a motion reduction.

Mandatory compensations:
- Add a `prefers-contrast: more` override that adds a visible 1-2px border matching `--theme-fg` at reduced opacity, breaking the "pure shadow" rule specifically for this accessibility mode — purity of the aesthetic is not worth an unusable interface.
- Ensure every interactive neomorphic element has a clear `:focus-visible` state using an actual outline/ring, not a shadow change (keyboard users cannot rely on hover-shadow cues at all).
- Never use Neomorphism as the *only* signal for critical actions (primary form submit, destructive delete) — pair it with an icon, label, or color accent so it doesn't rely purely on shape-from-shading perception.

---

## 8. Where To Use It In SP.SYS

Given the background-compatibility constraint (§6), Neomorphism fits best in **contained, solid-background contexts** rather than across the whole animated site:
- Settings/preferences panel (if one exists or is added) sitting on a solid modal backdrop — ideal use case, this is Neomorphism's classic strength (toggles, sliders, form controls).
- Theme/surface switcher UI itself — a nice meta touch: the control that lets you pick surface styles could itself be neomorphic regardless of which style is globally active, as a small persistent "system chrome" element exempt from the global surface attribute (similar to the `data-surface-exempt` pattern from the other files).
- Full hero/project-grid backgrounds — avoid, per the background-compatibility constraint, unless you're willing to accept Option A's trade-off of suppressing ambient effects.

---

## 9. Prompt Guidance for Gemini 3.1 Pro / Antigravity

- Flag the background-compatibility constraint (§6) as a decision point requiring your explicit choice (Option A vs B) *before* implementation begins, rather than letting the model pick silently — this materially changes what "Neomorphism mode" feels like site-wide.
- Instruct it to derive all shadow colors via `color-mix()` against `--theme-page-bg` per §4, and explicitly reject any implementation using flat `rgba(0,0,0,x)`/`rgba(255,255,255,x)` shadow values.
- Require it to implement the `prefers-contrast: more` border fallback and `:focus-visible` ring (§7) as non-optional parts of the initial build, not a follow-up accessibility pass — this style breaks basic usability without them, more so than any of the other four.
