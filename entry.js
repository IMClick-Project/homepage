/* ========================================
   IMClick-Project — Entry Page Logic
   ======================================== */

(function () {
    "use strict";

    let isEnglish = false;
    let subjectData = null;
    let currentEntry = null;

    const CATEGORIES = {
        "notas-teoricas": { es: "Notas teóricas", en: "Theory notes" },
        "bibliografia": { es: "Bibliografía", en: "Bibliography" },
        "ejercicios-resueltos": { es: "Ejercicios resueltos", en: "Solved exercises" },
        "proyectos-integrales": { es: "Proyectos integrales", en: "Integrated projects" },
        "codigos-documentados": { es: "Códigos documentados", en: "Documented code" },
        "simuladores": { es: "Simuladores", en: "Simulators" },
        "videos": { es: "Videos y animaciones", en: "Videos & animations" },
        "cursos": { es: "Cursos", en: "Courses" }
    };

    const SUBJECT_NAMES = {
        "informatica": { es: "Informática", en: "Informatics" },
        "matematicas": { es: "Matemáticas", en: "Math" },
        "ingenieria-quimica": { es: "Ingeniería Química", en: "Chemical Engineering" }
    };

    // --- Init ---
    document.addEventListener("DOMContentLoaded", () => {
        // Read language from localStorage
        const savedLang = localStorage.getItem("imclick-lang");
        if (savedLang) {
            isEnglish = savedLang === "en";
            document.documentElement.lang = isEnglish ? "en" : "es";
        } else {
            isEnglish = document.documentElement.lang === "en";
        }
        const params = new URLSearchParams(window.location.search);
        const subject = params.get("subject");
        const file = params.get("file");

        if (!subject || !file) {
            showError();
            return;
        }

        initLangToggle(subject, file);
        initTocToggle();
        loadSubjectData(subject, file);
        translateNavbarAndFooter();
    });

    // --- Load subject JSON to get metadata ---
    function loadSubjectData(subject, file) {
        // Try fetch first, fallback to SUBJECT_DATA
        fetch("data/" + subject + ".json")
            .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
            .then((data) => { processSubjectData(data, subject, file); })
            .catch(() => {
                if (window.SUBJECT_DATA) {
                    processSubjectData(window.SUBJECT_DATA, subject, file);
                } else {
                    showError();
                }
            });
    }

    function processSubjectData(data, subject, file) {
        subjectData = data;
        currentEntry = (data.entries || []).find((e) => e.file === file);

        renderBreadcrumb(subject);
        renderHeader();
        loadMarkdown(subject, file);
        renderRelated(subject);
        renderBackButton(subject);
    }

    // --- Breadcrumb ---
    function renderBreadcrumb(subject) {
        const el = document.getElementById("breadcrumb");
        if (!el) return;

        const home = isEnglish ? "Home" : "Inicio";
        const subName = SUBJECT_NAMES[subject] ? (isEnglish ? SUBJECT_NAMES[subject].en : SUBJECT_NAMES[subject].es) : subject;
        const catName = currentEntry
            ? (Array.isArray(currentEntry.category) ? currentEntry.category : [currentEntry.category])
                .map((c) => CATEGORIES[c] ? (isEnglish ? CATEGORIES[c].en : CATEGORIES[c].es) : c)
                .join(" · ")
            : "";

        el.innerHTML = `<a href="index.html">${home}</a><span>›</span><a href="${subject}.html">${subName}</a><span>›</span><span>${catName}</span>`;
    }

    // --- Article Header ---
    function renderHeader() {
        if (!currentEntry) return;

        const titleEl = document.getElementById("article-title");
        const metaEl = document.getElementById("article-meta");
        const tagsEl = document.getElementById("article-tags");

        if (titleEl) {
            titleEl.textContent = isEnglish ? (currentEntry.title_en || currentEntry.title) : currentEntry.title;
        }

        if (metaEl) {
            const cats = Array.isArray(currentEntry.category) ? currentEntry.category : [currentEntry.category];
            const catLabel = cats.map((c) => CATEGORIES[c]
                ? (isEnglish ? CATEGORIES[c].en : CATEGORIES[c].es)
                : c
            ).join(" · ");
            metaEl.innerHTML = `
                <span class="meta-date">${currentEntry.date || ""}</span>
                <span class="meta-category">${catLabel}</span>
            `;
        }

        if (tagsEl) {
            const tags = isEnglish ? (currentEntry.tags_en || currentEntry.tags || []) : (currentEntry.tags || []);
            tagsEl.innerHTML = tags.map((t) => `<span class="tag">${t}</span>`).join("");
        }
    }

    // --- Load and render Markdown ---
    function loadMarkdown(subject, file) {
        const suffix = isEnglish ? ".en.md" : ".md";
        const path = "content/" + subject + "/" + file + suffix;

        fetch(path)
            .then((r) => {
                if (!r.ok) throw new Error();
                return r.text();
            })
            .then((md) => {
                renderMarkdown(md);
            })
            .catch(() => {
                // Fallback: try the other language or show message
                const fallbackPath = "content/" + subject + "/" + file + ".md";
                fetch(fallbackPath)
                    .then((r) => { if (!r.ok) throw new Error(); return r.text(); })
                    .then((md) => { renderMarkdown(md); })
                    .catch(() => {
                        const body = document.getElementById("article-body");
                        if (body) {
                            body.innerHTML = '<p style="color:#888;text-align:center;padding:40px;">' +
                                (isEnglish ? "Content not available yet." : "Contenido no disponible aún.") +
                                "</p>";
                        }
                    });
            });
    }

    function renderMarkdown(md) {
        // Strip front-matter (YAML between ---)
        const fmRegex = /^---\n[\s\S]*?\n---\n?/;
        const content = md.replace(fmRegex, "");

        // Configure marked
        if (window.marked) {
            if (marked.setOptions) {
                marked.setOptions({
                    highlight: function (code, lang) {
                        if (window.hljs && lang && hljs.getLanguage(lang)) {
                            return hljs.highlight(code, { language: lang }).value;
                        }
                        return code;
                    },
                    breaks: false,
                    gfm: true
                });
            }

            let html = (marked.parse || marked)(content);

            // Render KaTeX (block: $$ ... $$)
            html = html.replace(/\$\$([\s\S]*?)\$\$/g, function (_, tex) {
                try {
                    return katex.renderToString(tex.trim(), { displayMode: true, throwOnError: false });
                } catch (e) { return "$$" + tex + "$$"; }
            });

            // Render KaTeX (inline: $ ... $) — avoid matching $$
            html = html.replace(/(?<!\$)\$(?!\$)(.*?)(?<!\$)\$(?!\$)/g, function (_, tex) {
                try {
                    return katex.renderToString(tex.trim(), { displayMode: false, throwOnError: false });
                } catch (e) { return "$" + tex + "$"; }
            });

            const body = document.getElementById("article-body");
            if (body) {
                body.innerHTML = html;
                wrapSectionsCollapsible();
                generateTOC();
                initScrollSpy();
            }
        }
    }

    // --- Wrap h2 sections into collapsible accordion ---
    function wrapSectionsCollapsible() {
        const body = document.getElementById("article-body");
        if (!body) return;

        const children = Array.from(body.children);
        const fragment = document.createDocumentFragment();
        let currentHeader = null;
        let currentContent = null;

        function appendCurrentSection() {
            if (currentHeader && currentContent) {
                fragment.appendChild(currentHeader);
                fragment.appendChild(currentContent);
            }
        }

        children.forEach((el) => {
            if (el.tagName === "H2") {
                // Close previous section
                appendCurrentSection();

                // Create collapsible header
                currentHeader = document.createElement("div");
                currentHeader.className = "section-header";
                currentHeader.innerHTML = '<h2>' + el.innerHTML + '</h2><i class="bi bi-chevron-down section-toggle"></i>';

                // Create content container (collapsed by default)
                currentContent = document.createElement("div");
                currentContent.className = "section-content";

                // Click to toggle using IIFE for closure
                (function (header, content) {
                    header.addEventListener("click", function () {
                        header.classList.toggle("expanded");
                        content.classList.toggle("expanded");
                    });
                })(currentHeader, currentContent);

            } else if (currentContent) {
                // Add element to current section content
                currentContent.appendChild(el);
            } else {
                // Content before first h2 - keep as is
                fragment.appendChild(el);
            }
        });

        // Append last section
        appendCurrentSection();

        body.innerHTML = "";
        body.appendChild(fragment);
    }

    // --- Table of Contents ---
    function generateTOC() {
        const body = document.getElementById("article-body");
        const tocList = document.getElementById("toc-list");
        if (!body || !tocList) return;

        // Find h2 inside section-headers and h3 inside section-content
        const sectionHeaders = body.querySelectorAll(".section-header h2");
        const h3s = body.querySelectorAll(".section-content h3");

        const allHeadings = [];
        sectionHeaders.forEach((h) => allHeadings.push({ el: h, tag: "H2" }));
        h3s.forEach((h) => allHeadings.push({ el: h, tag: "H3" }));

        if (allHeadings.length === 0) {
            const sidebar = document.querySelector(".toc-sidebar");
            const toggle = document.querySelector(".toc-toggle");
            if (sidebar) sidebar.style.display = "none";
            if (toggle) toggle.style.display = "none";
            return;
        }

        tocList.innerHTML = "";
        let idx = 0;

        // Build TOC in document order
        body.querySelectorAll(".section-header h2, .section-content h3").forEach((h) => {
            const id = "section-" + idx;
            h.id = id;
            idx++;

            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = "#" + id;
            a.textContent = h.textContent;
            a.dataset.target = id;
            if (h.tagName === "H3") a.classList.add("toc-h3");

            a.addEventListener("click", (e) => {
                e.preventDefault();
                // If clicking a h2 in a collapsed section, expand it first
                const sectionHeader = h.closest(".section-header");
                if (sectionHeader && !sectionHeader.classList.contains("expanded")) {
                    sectionHeader.click();
                }
                // If clicking a h3, expand its parent section
                const sectionContent = h.closest(".section-content");
                if (sectionContent && !sectionContent.classList.contains("expanded")) {
                    const prevHeader = sectionContent.previousElementSibling;
                    if (prevHeader && prevHeader.classList.contains("section-header")) {
                        prevHeader.click();
                    }
                }
                setTimeout(() => {
                    document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
            });

            li.appendChild(a);
            tocList.appendChild(li);
        });
    }

    // --- Scroll Spy for TOC ---
    function initScrollSpy() {
        const tocLinks = document.querySelectorAll("#toc-list a");
        if (!tocLinks.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    tocLinks.forEach((l) => l.classList.remove("active"));
                    const link = document.querySelector('#toc-list a[data-target="' + entry.target.id + '"]');
                    if (link) link.classList.add("active");
                }
            });
        }, { rootMargin: "-80px 0px -60% 0px", threshold: 0 });

        document.querySelectorAll("#article-body .section-header h2, #article-body .section-content h3").forEach((h) => {
            observer.observe(h);
        });
    }

    // --- TOC Toggle ---
    function initTocToggle() {
        const sidebar = document.querySelector(".toc-sidebar");
        const toggle = document.querySelector(".toc-toggle");
        if (!sidebar || !toggle) return;

        toggle.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");
            sidebar.classList.toggle("open");
            const isCollapsed = sidebar.classList.contains("collapsed");
            toggle.innerHTML = isCollapsed
                ? '<i class="bi bi-chevron-right"></i>'
                : '<i class="bi bi-chevron-left"></i>';
        });

        // Mobile: start collapsed
        if (window.innerWidth <= 768) {
            sidebar.classList.add("collapsed");
            toggle.innerHTML = '<i class="bi bi-chevron-right"></i>';
        }
    }

    // --- Related Entries ---
    function renderRelated(subject) {
        const section = document.getElementById("related-section");
        if (!section || !currentEntry || !subjectData) return;

        const relatedFiles = currentEntry.related || [];
        let relatedEntries = [];

        if (relatedFiles.length > 0) {
            relatedEntries = subjectData.entries.filter((e) => relatedFiles.includes(e.file));
        } else {
            // Fallback: show entries from same category (max 3)
            const currentCats = Array.isArray(currentEntry.category) ? currentEntry.category : [currentEntry.category];
            relatedEntries = subjectData.entries
                .filter((e) => {
                    if (e.file === currentEntry.file) return false;
                    const eCats = Array.isArray(e.category) ? e.category : [e.category];
                    return eCats.some((c) => currentCats.includes(c));
                })
                .slice(0, 3);
        }

        if (relatedEntries.length === 0) {
            section.style.display = "none";
            return;
        }

        const title = isEnglish ? "Related entries" : "Entradas relacionadas";
        const grid = relatedEntries.map((e) => {
            const eTitle = isEnglish ? (e.title_en || e.title) : e.title;
            const eDesc = isEnglish ? (e.description_en || e.description) : e.description;
            const link = "entry.html?subject=" + subject + "&file=" + e.file;
            return `
                <a href="${link}" class="related-card">
                    <img src="${e.image || 'images/logoico.png'}" alt="${eTitle}">
                    <div class="related-card-text">
                        <h4>${eTitle}</h4>
                        <p>${eDesc}</p>
                    </div>
                </a>
            `;
        }).join("");

        section.innerHTML = `<h2>${title}</h2><div class="related-grid">${grid}</div>`;
    }

    // --- Back Button ---
    function renderBackButton(subject) {
        const container = document.getElementById("back-container");
        if (!container) return;

        const subName = SUBJECT_NAMES[subject] ? (isEnglish ? SUBJECT_NAMES[subject].en : SUBJECT_NAMES[subject].es) : subject;
        const label = isEnglish ? "Back to " + subName : "Volver a " + subName;
        container.innerHTML = `<a href="${subject}.html" class="back-btn"><i class="bi bi-arrow-left"></i> ${label}</a>`;
    }

    // --- Language Toggle ---
    function initLangToggle(subject, file) {
        const langBtn = document.querySelector(".lang");
        if (!langBtn) return;

        langBtn.textContent = isEnglish ? "ESP" : "ENG";

        langBtn.addEventListener("click", (e) => {
            e.preventDefault();
            isEnglish = !isEnglish;
            document.documentElement.lang = isEnglish ? "en" : "es";
            localStorage.setItem("imclick-lang", isEnglish ? "en" : "es");
            langBtn.textContent = isEnglish ? "ESP" : "ENG";

            // Re-render everything
            renderBreadcrumb(subject);
            renderHeader();
            loadMarkdown(subject, file);
            renderRelated(subject);
            renderBackButton(subject);
            translateNavbarAndFooter();
        });
    }

    // --- Translate Navbar and Footer ---
    function translateNavbarAndFooter() {
        // Navbar links
        const menuLinks = document.querySelectorAll(".menu > li > a");
        menuLinks.forEach((link) => {
            const href = link.getAttribute("href") || "";
            if (href.includes("study-areas")) {
                link.textContent = isEnglish ? "Study areas" : "Áreas de estudio";
            } else if (href.includes("aboutme")) {
                link.textContent = isEnglish ? "About me" : "Sobre mí";
            } else if (href.includes("contact")) {
                link.textContent = isEnglish ? "Contact" : "Contacto";
            }
        });

        // Footer
        const footerP = document.querySelector(".footer p");
        if (footerP) {
            footerP.textContent = isEnglish
                ? "\u00A9 2026 IMClick-Project. All Rights Reserved."
                : "\u00A9 2026 IMClick-Project. Derechos Reservados.";
        }

        // TOC title
        const tocTitle = document.querySelector(".toc-title");
        if (tocTitle) {
            tocTitle.textContent = isEnglish ? "Contents" : "Contenido";
        }
    }

    // --- Error State ---
    function showError() {
        const body = document.getElementById("article-body");
        if (body) {
            body.innerHTML = '<p style="color:rgba(255,255,255,0.5);text-align:center;padding:60px;">Entry not found.</p>';
        }
    }

})();
