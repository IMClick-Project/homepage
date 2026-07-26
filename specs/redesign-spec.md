# IMClick-Project — Homepage Redesign Specification

## 1. Objective

Transform the current static, light-themed homepage into a modern, dynamic, dark-themed experience that reflects the tech/science identity of the project — inspired by sites like roxs.dev, zdynamics.org, and ChemEFlow.

The redesign preserves all existing content and bilingual structure while overhauling the visual language, interactions, and perceived quality of the site.

---

## 2. Design Principles

| Principle | Description |
|-----------|-------------|
| Dark-first | Deep dark backgrounds with colored accent glows |
| Depth & glass | Layered surfaces using glassmorphism (backdrop-blur, transparency) |
| Motion with purpose | Scroll reveals, hover feedback, and subtle ambient animation |
| Lightweight | No frameworks — pure HTML, CSS, vanilla JS |
| Accessible | WCAG AA contrast on all text, keyboard-navigable, semantic HTML |
| Responsive | Mobile-first breakpoints, touch-friendly interactions |

---

## 3. Color System

### Base palette (CSS custom properties)

```
--bg-primary:       #0a0a0f        (deep dark base)
--bg-secondary:     #12121a        (card/section backgrounds)
--bg-glass:         rgba(255, 255, 255, 0.03)  (glassmorphism fill)
--border-glass:     rgba(255, 255, 255, 0.08)  (glass borders)

--accent-primary:   #ce1c2b        (brand red — kept from current)
--accent-glow:      rgba(206, 28, 43, 0.4)     (red glow/shadow)
--accent-secondary: #ff4d5a        (lighter red for hover states)

--text-primary:     #f0f0f0        (headings, main text)
--text-secondary:   #a0a0b0        (body text, descriptions)
--text-muted:       #606070        (captions, subtle labels)
```

### Gradient accents
- Hero background: radial gradient from `--accent-primary` at 10% opacity fading into `--bg-primary`
- Card borders on hover: linear-gradient sweep using red → transparent
- Section separators: subtle horizontal gradient lines

---

## 4. Typography

### Font stack
- **Headings:** `"Inter", sans-serif` — weight 700/800
- **Body:** `"Inter", sans-serif` — weight 400/500
- **Code/Tech accents:** `"JetBrains Mono", monospace` — for labels like module counts, slogan secondary text

### Scale
| Element | Size (desktop) | Size (mobile) |
|---------|---------------|---------------|
| Hero title | 56px | 36px |
| Hero slogan | 28px | 22px |
| Section titles | 36px | 26px |
| Card titles | 22px | 18px |
| Body text | 17px | 16px |
| Captions/labels | 14px | 13px |

---

## 5. Component Specifications

### 5.1 Navbar

- **Style:** Floating glassmorphism bar with `backdrop-filter: blur(12px)`, sticky top
- **Background:** `rgba(10, 10, 15, 0.8)` with 1px bottom border `--border-glass`
- **Logo:** Displayed on white pill (keep current), or adapt to transparent bg with light logo
- **Links:** White text, on hover underline animated from left to right using `::after` pseudo-element
- **Language toggle:** Pill button with border, subtle glow on hover
- **Mobile:** Hamburger opens a full-height slide-in panel from the right (dark glass bg)

### 5.2 Hero Section

- **Layout:** Full viewport height (100vh), centered content
- **Background:** 
  - CSS radial gradient (dark with subtle red glow in center)
  - Floating particles animation (CSS-only using `@keyframes` on small pseudo-elements, or lightweight canvas — max 3KB JS)
- **Content:**
  - Title "IMClick - Project" with gradient text effect (white → accent red)
  - Slogan with typing/reveal animation on load
  - Description paragraph fading in with 0.5s delay
  - CTA button: "Explorar áreas" / "Explore areas" — solid accent bg, rounded, hover glow
- **Logo animation:** Keep the 3-part logo assembly animation (braces, compass, flask) but increase the scale and make it the centerpiece on desktop. On mobile, stack vertically.
- **Scroll indicator:** Subtle bouncing chevron at the bottom

### 5.3 Study Areas Section

- **Layout:** 3-column grid (desktop), 1-column stacked (mobile)
- **Cards:**
  - Glassmorphism surface: `--bg-glass` background, `--border-glass` border, `border-radius: 20px`
  - On hover: border shifts to gradient (red sweep), card lifts with `translateY(-8px)`, subtle glow shadow
  - Image inside with soft overlay gradient at bottom for text readability
  - Badge/tag below the image: e.g., "5 modules · 20+ problems" in monospace font
- **Section title:** Centered, with a short red accent line below (40px wide, 3px tall)

### 5.4 Resources Section

- **Layout:** Bento grid — asymmetric sizes (some cards span 2 columns, others 1)
- **Cards:**
  - Icon on the left (Bootstrap Icons, size 32px, colored accent)
  - Text label to the right
  - Glassmorphism bg, subtle border
  - On hover: icon scales up 1.1x, background brightens slightly
- **Arrangement (desktop):**
  ```
  [  Theory notes  ] [  Bibliography  ] [ Solved exercises ]
  [ Integrated projects     ] [ Documented code          ]
  [ Simulators ] [ Videos & animations ] [  Courses  ]
  ```
- **Mobile:** 2-column grid, uniform sizes

### 5.5 About Me Section

- **Background:** Slightly different shade or a subtle gradient to differentiate from adjacent sections
- **Layout:**
  - Desktop: Left column = photo carousel (keep current auto-advance logic), right column = text blocks stacked
  - Instead of 3 separate text boxes, use a **timeline/milestone layout**:
    1. Icon + "Olympiad background" + short text
    2. Icon + "Chemical Engineering MSc" + short text  
    3. Icon + "PhD & Research" + short text
    4. Icon + "IMClick Project" + short text
  - Each milestone revealed on scroll
- **Alternative (simpler):** Keep the current 2-column grid with carousel + text boxes, but apply glassmorphism styling and scroll-reveal animation to each box
- **Social links:** Displayed as icon row with hover glow effect

### 5.6 Contact Section

- **Layout:** 2-column (form right, social left) — keep current structure
- **Form:**
  - Dark inputs with 1px border `--border-glass`, focus state glows red
  - Labels in `--text-secondary`
  - Submit button: accent red background, hover brightens, subtle pulse animation on focus
- **Social groups:**
  - Icons arranged in rows with labels above
  - Icons get a subtle glow + scale on hover
- **Background:** Match `--bg-primary`

### 5.7 Footer

- **Style:** Multi-column layout
  - Left: Logo + one-line tagline
  - Center: Quick navigation links
  - Right: Social icons row
- **Separator:** Horizontal gradient line (red fading to transparent at edges)
- **Background:** Slightly darker than body (`#060609`)
- **Copyright:** Centered below the columns, small text

---

## 6. Animations & Interactions

### 6.1 Scroll Reveal (IntersectionObserver)

All sections and cards use a `.reveal` class:
- **Initial state:** `opacity: 0; transform: translateY(30px);`
- **Visible state:** `opacity: 1; transform: translateY(0);` with `transition: 0.6s ease`
- **Stagger:** Cards in a grid get sequential delays (0.1s increments)

### 6.2 Hover Effects

| Element | Effect |
|---------|--------|
| Nav links | Underline grows from left via `::after` |
| Study cards | Lift + glow border + shadow |
| Resource cards | Icon scale + bg brighten |
| Social icons | Scale 1.15 + color shift to accent |
| CTA button | Glow expansion + slight scale |
| Form inputs | Border color → accent red |

### 6.3 Hero Animations

- Logo parts: Keep current staggered assembly (already good)
- Title: Fade in + slight slide up (0.3s)
- Slogan: Fade in + slide up (0.6s delay)
- Description: Fade in (1s delay)
- CTA button: Fade in (1.3s delay)
- Background particles: Continuous slow float upward, random sizes (2-4px), low opacity

### 6.4 Carousel

- Keep current auto-advance (8s interval)
- Add crossfade (already using opacity transition — keep)
- Add subtle Ken Burns effect (slow zoom in during display)

---

## 7. Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| > 1024px | Full desktop layout |
| 768px - 1024px | Tablet — 2-column grids collapse where needed |
| < 768px | Mobile — single column, hamburger nav, stacked hero |

---

## 8. File Structure (After Redesign)

```
/
├── index.html          (Spanish version — updated)
├── index-en.html       (English version — updated)
├── styles.css          (Complete rewrite — dark theme)
├── animations.js       (IntersectionObserver reveals + particles)
├── images/             (No changes to existing assets)
└── specs/
    └── redesign-spec.md (this document)
```

---

## 9. Performance Targets

- No external JS frameworks (vanilla only)
- Total added JS < 5KB (unminified)
- Google Fonts loaded via `<link>` with `display=swap`
- All animations use `transform` and `opacity` only (GPU-composited, no layout thrashing)
- Lazy-load carousel images (native `loading="lazy"`)

---

## 10. What Is NOT Changing

- Content text (Spanish and English)
- Image assets
- Bilingual architecture (two HTML files)
- Logo branding (colors are adapted for dark bg, not replaced)
- Section order (Hero → Study Areas → Resources → About → Contact → Footer)
- Form fields and structure

---

## 11. Implementation Tasks

1. **Set up typography and base** — Add Google Fonts, define CSS custom properties, reset base styles to dark theme
2. **Navbar** — Rebuild as glassmorphism floating bar with animated links and mobile slide-in menu
3. **Hero** — Full-height dark gradient with particles, animated content reveal, logo assembly
4. **Study Areas** — Glassmorphism cards with hover glow and scroll-reveal
5. **Resources** — Bento grid layout with icon hover effects
6. **About Me** — Restyle with dark glass boxes, enhanced carousel, scroll-reveal
7. **Contact** — Dark form inputs with glow focus, social icon hover effects
8. **Footer** — Multi-column dark footer with gradient separator
9. **animations.js** — IntersectionObserver scroll reveals + optional particles
10. **Responsive pass** — Verify all breakpoints, mobile menu, touch interactions
11. **Accessibility audit** — Contrast check, focus states, ARIA labels, keyboard navigation
