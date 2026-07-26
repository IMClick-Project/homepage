# IMClick-Project — Entry Page Specification

## 1. Overview

A single reusable page template (`entry.html`) that renders content from Markdown files. Every entry (article, exercise, code, etc.) uses the same layout. The content lives in `.md` files that you edit directly.

---

## 2. Decisions Confirmed

| Feature | Decision |
|---------|----------|
| Content source | Markdown (.md) files with YAML front-matter |
| LaTeX formulas | Yes — using KaTeX |
| Syntax highlighting | Yes — using highlight.js |
| Navigation bottom | "Related entries" section (you define which in JSON) + "Back" button |
| Bilingual | One file per language: `file.md` (ES) + `file.en.md` (EN) |
| Table of contents | Yes — auto-generated from headings, displayed as sidebar/aside |

---

## 3. Page Structure

```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR (same as subject pages)                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Breadcrumb: Inicio > Informática > Notas teóricas      │
│                                                         │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  TABLE OF    │  ARTICLE HEADER                          │
│  CONTENTS    │  ─────────────────────────────           │
│  (auto from  │  Title                                   │
│   headings)  │  [tag1] [tag2] [tag3]                    │
│              │  Date • Category                         │
│  ## Section1 │                                          │
│  ## Section2 │  ─────────────────────────────           │
│  ### Sub2.1  │                                          │
│  ## Section3 │  ARTICLE CONTENT                         │
│              │  (rendered from Markdown)                 │
│              │                                          │
│              │  Headings, paragraphs, images,           │
│              │  code blocks (highlighted),              │
│              │  LaTeX formulas (KaTeX),                 │
│              │  tables, lists, links...                 │
│              │                                          │
├──────────────┴──────────────────────────────────────────┤
│                                                         │
│  RELATED ENTRIES                                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                   │
│  │ Entry 1 │ │ Entry 2 │ │ Entry 3 │                   │
│  └─────────┘ └─────────┘ └─────────┘                   │
│                                                         │
│  [← Volver a Informática]                              │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

---

## 4. File Structure

```
/
├── entry.html              (Single reusable template)
├── entry.css               (Entry page styles)
├── entry.js                (MD loading, parsing, TOC generation, related entries)
├── content/
│   ├── informatica/
│   │   ├── complejidad-algoritmica.md        (Spanish)
│   │   ├── complejidad-algoritmica.en.md     (English)
│   │   ├── estructuras-datos-lineales.md
│   │   ├── estructuras-datos-lineales.en.md
│   │   └── ...
│   ├── matematicas/
│   │   ├── teoria-numeros-divisibilidad.md
│   │   ├── teoria-numeros-divisibilidad.en.md
│   │   └── ...
│   └── ingenieria-quimica/
│       ├── balance-materia.md
│       ├── balance-materia.en.md
│       └── ...
└── data/
    ├── informatica.json     (already has entries — add "file" and "related" fields)
    ├── matematicas.json
    └── ingenieria-quimica.json
```

---

## 5. Markdown File Format

### Spanish version: `content/informatica/complejidad-algoritmica.md`

```markdown
---
title: "Introducción a la complejidad algorítmica"
date: 2026-01-15
category: notas-teoricas
tags: [principiante, algoritmos]
subject: informatica
---

## ¿Qué es la complejidad algorítmica?

La complejidad algorítmica nos permite medir la eficiencia de un algoritmo
en términos de tiempo y espacio.

### Notación Big O

La notación Big O describe el comportamiento en el **peor caso**:

$$O(n), \quad O(n \log n), \quad O(n^2)$$

### Ejemplo en Python

```python
def busqueda_lineal(arr, x):
    for i in range(len(arr)):
        if arr[i] == x:
            return i
    return -1
```

La complejidad de esta función es $O(n)$.

## Comparación de complejidades

| Algoritmo | Mejor caso | Peor caso |
|-----------|-----------|-----------|
| Búsqueda lineal | O(1) | O(n) |
| Búsqueda binaria | O(1) | O(log n) |
| Bubble sort | O(n) | O(n²) |

## Conclusión

Entender la complejidad te permite elegir el algoritmo adecuado...
```

### English version: `content/informatica/complejidad-algoritmica.en.md`

Same structure but in English. You write both files.

---

## 6. JSON Update — Adding "file" and "related" fields

In `data/informatica.json`, each entry gets two new fields:

```json
{
    "title": "Introducción a la complejidad algorítmica",
    "title_en": "Introduction to algorithmic complexity",
    "category": "notas-teoricas",
    "description": "Conceptos fundamentales de Big O...",
    "description_en": "Fundamental concepts of Big O...",
    "tags": ["principiante", "algoritmos"],
    "tags_en": ["beginner", "algorithms"],
    "image": "images/logoI2.png",
    "link": "entry.html?subject=informatica&file=complejidad-algoritmica",
    "date": "2026-01-15",
    "file": "complejidad-algoritmica",
    "related": ["estructuras-datos-lineales", "merge-sort-cpp"]
}
```

- **`file`**: name of the .md file (without extension or path)
- **`related`**: array of other entry `file` names to show as "Related entries"
- **`link`**: now points to `entry.html?subject=...&file=...`

---

## 7. URL Scheme

```
entry.html?subject=informatica&file=complejidad-algoritmica
entry.html?subject=matematicas&file=teoria-numeros-divisibilidad
entry.html?subject=ingenieria-quimica&file=balance-materia
```

The JS reads URL params, loads the correct .md file, parses it, and renders.

---

## 8. Table of Contents (TOC)

- Auto-generated from `##` and `###` headings in the markdown
- Displayed as a sticky sidebar on desktop (left side of the article)
- On mobile: collapsed as a toggle dropdown above the article
- Clicking a TOC item scrolls to that section smoothly
- Current section highlighted as user scrolls (scroll spy)

---

## 9. Related Entries Section

- Shows 3 entry cards (same style as subject page cards)
- You define which entries are related in the JSON `"related"` array
- If no related entries defined, shows random entries from same category
- Below the related entries: "← Volver a [materia]" button linking back to the subject page

---

## 10. External Libraries (CDN)

| Library | Purpose | Size (gzipped) |
|---------|---------|----------------|
| marked.js | Markdown → HTML parsing | ~8KB |
| KaTeX | LaTeX formula rendering | ~30KB |
| highlight.js | Code syntax highlighting | ~10KB (core + languages) |

All loaded from CDN. Total added weight: ~48KB (loaded only on entry pages).

---

## 11. Style Notes

- Same dark rojo/tinto theme as subject pages
- Article content area: slightly lighter background for readability
- Code blocks: dark bg with syntax colors
- LaTeX formulas: white text
- TOC sidebar: subtle, doesn't compete with content
- Related entry cards: same style as subject page entry cards
- Responsive: TOC moves above content on mobile

---

## 12. Implementation Plan

1. Create `entry.css` — article typography, TOC sidebar, related cards, breadcrumb, responsive
2. Create `entry.js` — URL params parsing, MD loading, marked.js + KaTeX + hljs init, TOC generation, related entries rendering, language toggle
3. Create `entry.html` — the single template page
4. Create example `.md` files (ES + EN) for one entry per subject
5. Update JSONs: add `file` and `related` fields, update `link` to entry.html URLs
6. Test locally and verify all features
