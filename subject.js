/* ========================================
   IMClick-Project — Subject Page Logic
   ======================================== */

(function () {
    "use strict";

    // --- State ---
    let entries = [];
    let subjectMeta = {};
    let currentCategory = "all";
    let currentTag = [];
    let currentSearch = "";
    let isEnglish = false;

    // Category labels (bilingual)
    const CATEGORIES = {
        "all": { es: "Todos", en: "All", icon: "bi-grid" },
        "notas-teoricas": { es: "Notas teóricas", en: "Theory notes", icon: "bi-journal-text" },
        "bibliografia": { es: "Bibliografía", en: "Bibliography", icon: "bi-book" },
        "ejercicios-resueltos": { es: "Ejercicios resueltos", en: "Solved exercises", icon: "bi-calculator" },
        "proyectos-integrales": { es: "Proyectos integrales", en: "Integrated projects", icon: "bi-diagram-3" },
        "codigos-documentados": { es: "Códigos documentados", en: "Documented code", icon: "bi-code-slash" },
        "simuladores": { es: "Simuladores", en: "Simulators", icon: "bi-laptop" },
        "videos": { es: "Videos y animaciones", en: "Videos & animations", icon: "bi-play-circle" },
        "cursos": { es: "Cursos", en: "Courses", icon: "bi-mortarboard" }
    };

    // --- Hero Canvas: per-subject floating symbols ---
    function initHeroCanvas() {
        const canvas = document.getElementById("subject-hero-canvas");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const subject = document.body.dataset.subject;

        // Symbols per subject
        const SUBJECT_GLYPHS = {
            "informatica": ["{}", "</>", "[]", "=>", "&&", "||", "//", "01", "f(x)", "if", "for", "int", "#", "0x", "++", "=="],
            "matematicas": ["\u03C0", "\u2211", "\u222B", "\u221E", "\u0394", "\u03B1", "\u03B8", "\u2202", "\u221A", "\u00B1", "\u2248", "\u03BB", "x\u00B2", "n!", "lim", "\u2200"],
            "ingenieria-quimica": ["H\u2082O", "CO\u2082", "\u0394H", "\u03B7", "mol", "PV=nRT", "Q", "\u0394G", "kPa", "R", "\u03C1", "Cp", "\u03BC", "Re", "Nu", "Pr"]
        };

        const glyphs = SUBJECT_GLYPHS[subject] || SUBJECT_GLYPHS["informatica"];
        let width, height;
        let symbols = [];
        const COUNT = 20;

        function resize() {
            const hero = canvas.parentElement;
            width = canvas.width = hero.offsetWidth;
            height = canvas.height = hero.offsetHeight;
        }

        function createSymbol() {
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.2,
                glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
                size: Math.random() * 12 + 10,
                opacity: Math.random() * 0.15 + 0.05,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.004,
            };
        }

        function init() {
            resize();
            symbols = [];
            for (let i = 0; i < COUNT; i++) {
                symbols.push(createSymbol());
            }
        }

        let animationId;

        function draw() {
            ctx.clearRect(0, 0, width, height);

            symbols.forEach((s) => {
                s.x += s.vx;
                s.y += s.vy;
                s.rotation += s.rotationSpeed;

                ctx.save();
                ctx.translate(s.x, s.y);
                ctx.rotate(s.rotation);
                ctx.font = s.size + 'px "JetBrains Mono", monospace';
                ctx.fillStyle = "rgba(255, 255, 255, " + s.opacity + ")";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(s.glyph, 0, 0);
                ctx.restore();

                if (s.x < -30) s.x = width + 30;
                if (s.x > width + 30) s.x = -30;
                if (s.y < -20) s.y = height + 20;
                if (s.y > height + 20) s.y = -20;
            });

            animationId = requestAnimationFrame(draw);
        }

        function handleVisibility() {
            if (document.hidden) {
                cancelAnimationFrame(animationId);
            } else {
                draw();
            }
        }

        init();
        draw();

        window.addEventListener("resize", resize);
        document.addEventListener("visibilitychange", handleVisibility);
    }

    // --- Init ---
    document.addEventListener("DOMContentLoaded", () => {
        isEnglish = document.documentElement.lang === "en";
        initSidebar();
        initSidebarToggle();
        initSearch();
        initLangToggle();
        initHeroCanvas();
        loadData();
    });

    // --- Load JSON data ---
    function loadData() {
        const dataFile = document.body.dataset.subject;
        if (!dataFile) return;

        const url = window.SUBJECT_DATA_URL || ("data/" + dataFile + ".json");

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("HTTP " + res.status);
                return res.json();
            })
            .then((data) => {
                subjectMeta = data;
                entries = data.entries || [];
                renderSubjectHero();
                renderEntries();
            })
            .catch(() => {
                if (window.SUBJECT_DATA) {
                    subjectMeta = window.SUBJECT_DATA;
                    entries = window.SUBJECT_DATA.entries || [];
                    renderSubjectHero();
                    renderEntries();
                } else {
                    const grid = document.querySelector(".entries-grid");
                    if (grid) {
                        grid.innerHTML = '<div class="no-results">' +
                            (isEnglish ? "Could not load entries. Deploy to GitHub Pages to see content." : "No se pudieron cargar las entradas. Despliega en GitHub Pages para ver el contenido.") +
                            '</div>';
                    }
                }
            });
    }

    // --- Render subject hero ---
    function renderSubjectHero() {
        // Hero stays as defined in HTML - not affected by language toggle
    }

    // --- Sidebar ---
    function initSidebar() {
        const nav = document.querySelector(".sidebar-nav");
        if (!nav) return;

        nav.innerHTML = "";

        Object.keys(CATEGORIES).forEach((key) => {
            const cat = CATEGORIES[key];
            const btn = document.createElement("button");
            btn.className = "sidebar-item" + (key === "all" ? " active" : "");
            btn.dataset.category = key;
            btn.innerHTML = `<i class="bi ${cat.icon}"></i><span>${isEnglish ? cat.en : cat.es}</span>`;
            btn.addEventListener("click", () => {
                currentCategory = key;
                currentTag = [];
                updateActiveFilters();
                renderEntries();
                // Update active class
                nav.querySelectorAll(".sidebar-item").forEach((el) => el.classList.remove("active"));
                btn.classList.add("active");
            });
            nav.appendChild(btn);
        });
    }

    // --- Sidebar Toggle ---
    function initSidebarToggle() {
        const sidebar = document.querySelector(".sidebar");
        const toggle = document.querySelector(".sidebar-toggle");
        if (!sidebar || !toggle) return;

        toggle.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");
            sidebar.classList.toggle("open");
            toggle.innerHTML = sidebar.classList.contains("collapsed")
                ? '<i class="bi bi-chevron-right"></i>'
                : '<i class="bi bi-chevron-left"></i>';
        });

        // Mobile: start collapsed
        if (window.innerWidth <= 768) {
            sidebar.classList.add("collapsed");
            toggle.innerHTML = '<i class="bi bi-chevron-right"></i>';
        }
    }

    // --- Search ---
    function initSearch() {
        const input = document.querySelector(".search-box input");
        if (!input) return;

        input.placeholder = isEnglish ? "Search entries..." : "Buscar entradas...";

        let debounce;
        input.addEventListener("input", () => {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                currentSearch = input.value.trim().toLowerCase();
                renderEntries();
            }, 250);
        });
    }

    // --- Language Toggle ---
    function initLangToggle() {
        const langBtn = document.querySelector(".lang");
        if (!langBtn) return;

        langBtn.textContent = isEnglish ? "ESP" : "ENG";

        langBtn.addEventListener("click", (e) => {
            e.preventDefault();
            isEnglish = !isEnglish;
            document.documentElement.lang = isEnglish ? "en" : "es";
            langBtn.textContent = isEnglish ? "ESP" : "ENG";

            // Re-render everything
            initSidebar();
            initSearch();
            renderSubjectHero();
            updateActiveFilters();
            renderEntries();

            // Update navbar links
            const aboutLink = document.querySelector('[href*="aboutme"], [href*="sobre"]');
            const contactLink = document.querySelector('[href*="contact"]');
            if (aboutLink) aboutLink.textContent = isEnglish ? "About me" : "Sobre mí";
            if (contactLink) contactLink.textContent = isEnglish ? "Contact" : "Contacto";
        });
    }

    // --- Active Filters Display ---
    function updateActiveFilters() {
        const container = document.querySelector(".active-filters");
        if (!container) return;

        container.innerHTML = "";

        currentTag.forEach((tag) => {
            const badge = document.createElement("span");
            badge.className = "filter-badge";
            badge.innerHTML = `${tag} <span class="remove">&times;</span>`;
            badge.addEventListener("click", () => {
                currentTag = currentTag.filter((t) => t !== tag);
                updateActiveFilters();
                renderEntries();
            });
            container.appendChild(badge);
        });

        if (currentTag.length > 0) {
            const clearBtn = document.createElement("span");
            clearBtn.className = "filter-badge";
            clearBtn.style.opacity = "0.6";
            clearBtn.innerHTML = (isEnglish ? "Clear all" : "Limpiar") + ` <span class="remove">&times;</span>`;
            clearBtn.addEventListener("click", () => {
                currentTag = [];
                updateActiveFilters();
                renderEntries();
            });
            container.appendChild(clearBtn);
        }
    }

    // --- Render Entries ---
    function renderEntries() {
        const grid = document.querySelector(".entries-grid");
        if (!grid) return;

        // Filter entries
        let filtered = entries.filter((entry) => {
            // Category filter
            if (currentCategory !== "all" && entry.category !== currentCategory) return false;

            // Tag filter
            if (currentTag.length > 0) {
                const tags = isEnglish ? (entry.tags_en || entry.tags || []) : (entry.tags || []);
                const hasAll = currentTag.every((t) => tags.includes(t));
                if (!hasAll) return false;
            }

            // Search filter
            if (currentSearch) {
                const title = isEnglish ? (entry.title_en || entry.title) : entry.title;
                const desc = isEnglish ? (entry.description_en || entry.description) : entry.description;
                const tags = isEnglish ? (entry.tags_en || entry.tags || []) : (entry.tags || []);
                const searchable = (title + " " + desc + " " + tags.join(" ")).toLowerCase();
                if (!searchable.includes(currentSearch)) return false;
            }

            return true;
        });

        // Render
        if (filtered.length === 0) {
            grid.innerHTML = '<div class="no-results">' +
                (isEnglish ? "No entries match the current filters." : "No hay entradas que coincidan con los filtros.") +
                '</div>';
            return;
        }

        grid.innerHTML = filtered.map((entry) => {
            const title = isEnglish ? (entry.title_en || entry.title) : entry.title;
            const desc = isEnglish ? (entry.description_en || entry.description) : entry.description;
            const tags = isEnglish ? (entry.tags_en || entry.tags || []) : (entry.tags || []);
            const catLabel = CATEGORIES[entry.category]
                ? (isEnglish ? CATEGORIES[entry.category].en : CATEGORIES[entry.category].es)
                : entry.category;
            const dateStr = entry.date || "";
            const link = entry.link || "#";
            const image = entry.image || "";

            return `
                <article class="entry-card">
                    ${image ? `<img class="entry-card-image" src="${image}" alt="${title}">` : ""}
                    <div class="entry-card-body">
                        <span class="entry-card-category">${catLabel}</span>
                        <h3 class="entry-card-title">${title}</h3>
                        <p class="entry-card-desc">${desc}</p>
                        ${tags.length ? `<div class="entry-card-tags">${tags.map((t) => `<span class="entry-tag" data-tag="${t}">${t}</span>`).join("")}</div>` : ""}
                    </div>
                    <div class="entry-card-footer">
                        <span class="entry-card-date">${dateStr}</span>
                        <a href="${link}" target="_blank" rel="noopener noreferrer" class="entry-card-link">
                            ${isEnglish ? "See more" : "Ver más"} <i class="bi bi-arrow-right-short"></i>
                        </a>
                    </div>
                </article>
            `;
        }).join("");

        // Attach tag click handlers
        grid.querySelectorAll(".entry-tag").forEach((tagEl) => {
            tagEl.addEventListener("click", () => {
                const tag = tagEl.dataset.tag;
                if (currentTag.includes(tag)) {
                    currentTag = currentTag.filter((t) => t !== tag);
                } else {
                    currentTag.push(tag);
                }
                updateActiveFilters();
                renderEntries();
            });
        });
    }

})();
