# IMClick-Project — Subject Pages Specification

## 1. Overview

Each study area (Informática, Matemáticas, Ingeniería Química) gets its own dedicated page with a blog-style layout. Clicking a subject area from the homepage opens a new tab with that subject's page.

---

## 2. Page Structure

```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR (same as homepage — white, logo, back to home)  │
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│ SIDEBAR  │           MAIN CONTENT AREA                  │
│ (toggle) │                                              │
│          │  ┌────────────────────────────────────────┐  │
│ ☰ Toggle │  │  Subject Title + Logo                  │  │
│          │  │  Brief description                     │  │
│ Resources│  ├────────────────────────────────────────┤  │
│          │  │                                        │  │
│ • Notas  │  │  Resource entries (cards/list)         │  │
│ • Biblio │  │  filtered by selected category         │  │
│ • Ejerc. │  │                                        │  │
│ • Proyec.│  │  Each entry:                           │  │
│ • Código │  │  - Title                               │  │
│ • Simul. │  │  - Description                         │  │
│ • Videos │  │  - Image/thumbnail                     │  │
│ • Cursos │  │  - Link to content                     │  │
│          │  │  - Date (optional)                     │  │
│          │  │                                        │  │
│          │  └────────────────────────────────────────┘  │
├──────────┴──────────────────────────────────────────────┤
│  FOOTER (same as homepage — copyright)                  │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Navigation Flow

1. **Homepage → Subject Page**: User clicks on a study area card (Informática, Matemáticas, or Ingeniería Química) → opens a new tab with that subject's page.
2. **Sidebar navigation**: The 8 resource categories are listed in the left sidebar. Clicking one filters/scrolls the main content to show entries of that resource type.
3. **Default view**: When the page opens, shows all entries or the first resource category (TBD).

---

## 4. Sidebar

### Behavior
- **Desktop**: Sidebar visible by default on the left (fixed position, 260px wide)
- **Mobile**: Sidebar hidden by default, toggled with a hamburger/panel button
- **Toggle**: A button (☰ or ✕) collapses/expands the sidebar on both desktop and mobile

### Content
The 8 resource categories with their icons (same as homepage):
1. 📄 Notas teóricas / Theory notes
2. 📚 Bibliografía / Bibliography
3. 🧮 Ejercicios resueltos / Solved exercises
4. 📊 Proyectos integrales / Integrated projects
5. 💻 Códigos documentados / Documented code
6. 🖥️ Simuladores / Interactive simulators
7. 🎬 Videos y animaciones / Videos and animations
8. 🎓 Cursos / Courses

### Style
- Same dark theme as homepage (tinto background)
- Active category highlighted with accent color
- Hover effect on items
- Icons (Bootstrap Icons) + text labels

---

## 5. Main Content Area

### Header
- Subject logo (logoI2, logoM2, or logoC2)
- Subject name as title
- Brief 1-2 sentence description of the area

### Entry Cards
Each resource entry displayed as a card:

```
┌──────────────────────────────────────────────┐
│  [Image/Thumbnail]                           │
│                                              │
│  Title of the entry                          │
│  Category badge (e.g., "Notas teóricas")     │
│  Short description (2-3 lines)               │
│                                              │
│  [Ver más →]                     [Date tag]  │
└──────────────────────────────────────────────┘
```

### Layout options
- **Grid view**: 2-3 columns of cards (blog style)
- **List view** (optional toggle): Single column, more compact

### Filtering
- When a sidebar category is clicked, only entries matching that category are shown
- Smooth transition/animation when switching categories
- "All" option to show everything

---

## 6. Data Source

A JSON file per subject (or one unified JSON), editable by the user:

### File: `data/informatica.json` (example)

```json
{
    "subject": "Informática",
    "subject_en": "Informatics",
    "description": "Fundamentos, algoritmos, lógica y programación competitiva.",
    "description_en": "Fundamentals, algorithms, logic and competitive programming.",
    "logo": "images/logoI2.png",
    "entries": [
        {
            "title": "Introducción a la complejidad algorítmica",
            "title_en": "Introduction to algorithmic complexity",
            "category": "notas-teoricas",
            "description": "Aprende sobre Big O, Omega y Theta...",
            "description_en": "Learn about Big O, Omega and Theta...",
            "image": "images/entry-thumbnail.png",
            "link": "https://...",
            "date": "2026-01-15"
        }
    ]
}
```

### File: `data/matematicas.json`
### File: `data/ingenieria-quimica.json`

---

## 7. File Structure

```
/
├── index.html                (Homepage ES)
├── index-en.html             (Homepage EN)
├── informatica.html          (Subject page - Informática)
├── matematicas.html          (Subject page - Matemáticas)
├── ingenieria-quimica.html   (Subject page - Ing. Química)
├── subject.css               (Shared styles for subject pages)
├── subject.js                (Sidebar logic, filtering, JSON loading)
├── styles.css                (Homepage styles)
├── animations.js             (Homepage animations)
├── data/
│   ├── informatica.json
│   ├── matematicas.json
│   └── ingenieria-quimica.json
├── resources-data.json       (Homepage resource previews)
└── images/
```

---

## 8. Visual Style

- Same dark theme as homepage
- Subject pages use the **tinto** primary background (`--bg-primary: #2b1520`)
- Sidebar uses slightly darker tone
- Entry cards: glassmorphism style (same as homepage cards)
- Hover effects on cards (lift + glow)
- Active sidebar item: left accent border (red/tinto)
- Responsive: sidebar collapses to overlay on mobile

---

## 9. Bilingual Support

- Each subject page detects language from `<html lang="...">`
- All text labels in sidebar, headings, and UI elements switch between ES/EN
- Entry content uses `title_en`, `description_en` fields from JSON
- Category names have built-in translations (same as homepage resource expand)

---

## 10. Interactions

| Element | Action |
|---------|--------|
| Subject card (homepage) | Opens subject page in new tab |
| Sidebar category | Filters entries to that category |
| Sidebar toggle button | Shows/hides sidebar |
| Entry card "Ver más" | Opens the link (new tab) |
| Entry card hover | Lift + glow effect |

---

## 11. Design Decisions (Confirmed)

1. **Navbar**: Se conserva la barra superior del homepage para navegar de vuelta. El link "Áreas de estudio" se deshabilita/oculta cuando ya estás dentro de una materia.
2. **Barra de búsqueda**: Sí — un input de búsqueda arriba del contenido para filtrar entradas por texto (funciona en GitHub Pages con JS client-side).
3. **Tags**: Sí — cada entrada puede tener tags editables (dificultad, subtema, lenguaje, etc.). Se muestran como badges en las cards y permiten filtrar al hacer click. Son opcionales por entrada.
4. **Fecha**: Sí — se muestra la fecha de publicación en cada card.
5. **Idioma**: Una sola página por materia que detecta el idioma automáticamente (basado en un parámetro URL como `?lang=en` o un toggle en la navbar).

---

## 12. Updated Navigation Flow

```
Homepage (index.html / index-en.html)
  │
  ├── Click "Informática" card → informatica.html (new tab)
  ├── Click "Matemáticas" card → matematicas.html (new tab)
  └── Click "Ingeniería Química" card → ingenieria-quimica.html (new tab)

Subject Page:
  ├── Navbar: Logo (→ homepage), [Sobre mí], [Contacto], Lang toggle
  │           (Áreas de estudio link disabled/hidden)
  ├── Sidebar: 8 resource categories (toggleable)
  ├── Search bar: Filters entries by text
  ├── Content: Entry cards filtered by category + tags + search
  └── Footer: © copyright
```

---

## 13. Search Implementation (GitHub Pages compatible)

Since GitHub Pages is static (no server), search works client-side:
- JS loads all entries from the subject JSON
- User types in search box → JS filters entries in real-time
- Filters by: title, description, and tags
- Combined with sidebar category filter (both active at once)
- No external dependencies needed

---

## 14. Tags System

### In JSON:
```json
{
    "title": "Complejidad algorítmica",
    "category": "notas-teoricas",
    "tags": ["intermedio", "algoritmos", "Big O"],
    "tags_en": ["intermediate", "algorithms", "Big O"],
    ...
}
```

### In UI:
- Displayed as small colored badges on each card
- Clickable — clicking a tag filters to show only entries with that tag
- Clear filter button to reset
- Tags are optional per entry (no tags = no badges shown)

---

## 15. Implementation Plan

1. Create `subject.css` — shared styles for subject pages (sidebar, content grid, search, tags)
2. Create `subject.js` — sidebar toggle, JSON loading, filtering (category + search + tags), language detection
3. Create `informatica.html` — first subject page template
4. Create `matematicas.html` — same template, different data source
5. Create `ingenieria-quimica.html` — same template, different data source
6. Create `data/` folder with JSON files per subject
7. Update homepage cards to link to subject pages (target="_blank")
8. Update navbar on subject pages (disable "Áreas de estudio")
