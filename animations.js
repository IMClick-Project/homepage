/* ========================================
   IMClick-Project — Animations & Interactions
   ======================================== */

// --- Scroll Reveal (IntersectionObserver) ---
function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = el.dataset.delay || 0;
                    setTimeout(() => {
                        el.classList.add("visible");
                    }, delay);
                    observer.unobserve(el);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach((el) => observer.observe(el));
}

// --- Animated Background: Floating Science/Math/Code Symbols ---
function initParticles() {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let symbols = [];
    const SYMBOL_COUNT = 65;

    // Symbols related to math, programming, and chemical engineering
    const GLYPHS = [
        // Math
        "\u03C0", "\u2211", "\u222B", "\u221E", "\u0394", "\u03B1", "\u03B2", "\u2202",
        "\u221A", "\u00B1", "\u2248", "\u2260", "\u03BB", "\u03B8", "\u03C3", "\u2207",
        // Programming
        "{}", "</>", "[]", "=>", "&&", "||", "#", "//", "01", "f(x)",
        // Chemical Engineering
        "H\u2082O", "CO\u2082", "\u0394H", "\u03B7", "mol", "P\u2081V\u2081", "Q=mc\u0394T"
    ];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createSymbol() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.25,
            vy: -Math.random() * 0.2 - 0.05,
            glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            size: Math.random() * 14 + 12,
            opacity: Math.random() * 0.12 + 0.05,
            color: Math.random() > 0.5 ? "255, 255, 255" : "206, 28, 43",
        };
    }

    function init() {
        resize();
        symbols = [];
        for (let i = 0; i < SYMBOL_COUNT; i++) {
            symbols.push(createSymbol());
        }
    }

    let animationId;

    function draw() {
        ctx.clearRect(0, 0, width, height);

        symbols.forEach((s, i) => {
            s.x += s.vx;
            s.y += s.vy;

            ctx.save();
            ctx.translate(s.x, s.y);
            ctx.font = `${s.size}px "JetBrains Mono", monospace`;
            ctx.fillStyle = `rgba(${s.color}, ${s.opacity})`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(s.glyph, 0, 0);
            ctx.restore();

            // Wrap around edges
            if (s.y < -30) s.y = height + 30;
            if (s.y > height + 30) s.y = -30;
            if (s.x < -30) s.x = width + 30;
            if (s.x > width + 30) s.x = -30;
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

// --- Full-page background canvas ---
function initBgCanvas() {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];

    const GLYPHS = [
        // Math
        "\u03C0", "\u2211", "\u222B", "\u221E", "\u0394", "\u03B1", "\u03B2", "\u2202",
        "\u221A", "\u00B1", "\u2248", "\u2260", "\u03BB", "\u03B8", "\u03C3", "\u2207",
        // Programming
        "{}", "</>", "[]", "=>", "&&", "||", "#", "//", "01", "f(x)",
        // Chemical Engineering
        "H\u2082O", "CO\u2082", "\u0394H", "\u03B7", "mol", "P\u2081V\u2081", "Q=mc\u0394T"
    ];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.25,
            vy: -Math.random() * 0.2 - 0.05,
            glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            size: Math.random() * 14 + 12,
            opacity: Math.random() * 0.12 + 0.05,
            color: Math.random() > 0.5 ? "255, 255, 255" : "206, 28, 43",
        };
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < 65; i++) {
            particles.push(createParticle());
        }
    }

    let animationId;

    function draw() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((s) => {
            s.x += s.vx;
            s.y += s.vy;

            ctx.save();
            ctx.translate(s.x, s.y);
            ctx.font = `${s.size}px "JetBrains Mono", monospace`;
            ctx.fillStyle = `rgba(${s.color}, ${s.opacity})`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(s.glyph, 0, 0);
            ctx.restore();

            if (s.y < -40) s.y = height + 40;
            if (s.y > height + 40) s.y = -40;
            if (s.x < -40) s.x = width + 40;
            if (s.x > width + 40) s.x = -40;
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

    window.addEventListener("resize", () => {
        resize();
    });
    document.addEventListener("visibilitychange", handleVisibility);
}

// --- Mobile Menu ---
function initMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
        toggle.textContent = menu.classList.contains("active") ? "\u2715" : "\u2630";
    });

    // Close menu when a non-dropdown link is clicked
    menu.querySelectorAll("a").forEach((link) => {
        // Don't close menu when clicking the dropdown parent
        if (link.closest(".dropdown") && link.parentElement.classList.contains("dropdown")) return;
        link.addEventListener("click", () => {
            menu.classList.remove("active");
            toggle.textContent = "\u2630";
        });
    });
}

// --- Dropdown (touch devices) ---
function initDropdown() {
    const dropdownBtn = document.querySelector(".dropdown > a");
    const submenu = document.querySelector(".submenu");
    if (!dropdownBtn || !submenu) return;

    dropdownBtn.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            submenu.classList.toggle("active");
        }
    });
}

// --- About Carousel ---
function initCarousel() {
    const images = document.querySelectorAll(".about-carousel img");
    if (!images.length) return;

    let index = 0;
    setInterval(() => {
        images[index].classList.remove("active");
        index = (index + 1) % images.length;
        images[index].classList.add("active");
    }, 6000);
}

// --- Navbar shadow on scroll ---
function initNavScroll() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 2px 16px rgba(0,0,0,0.1)";
        } else {
            navbar.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
        }
    });
}

// --- Resource Expand (click to show sub-items from JSON) ---
function initResourceExpand() {
    const cards = document.querySelectorAll(".resource-card[data-resource]");
    if (!cards.length) return;

    let activePanel = null;
    let activeCard = null;

    // Try loading from JSON file first, fallback to embedded data
    let resourcesData = null;

    const fallbackData = {
        "notas-teoricas": [
            { "area": "Informática", "area_en": "Informatics", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoI2.png", "link": "#" },
            { "area": "Matemáticas", "area_en": "Math", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoM2.png", "link": "#" },
            { "area": "Ingeniería Química", "area_en": "Chemical Engineering", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoC2.png", "link": "#" },
            { "area": "Informática", "area_en": "Informatics", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoI2.png", "link": "#" }
        ],
        "bibliografia": [
            { "area": "Informática", "area_en": "Informatics", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoI2.png", "link": "#" },
            { "area": "Matemáticas", "area_en": "Math", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoM2.png", "link": "#" },
            { "area": "Ingeniería Química", "area_en": "Chemical Engineering", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoC2.png", "link": "#" },
            { "area": "Matemáticas", "area_en": "Math", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoM2.png", "link": "#" }
        ],
        "ejercicios-resueltos": [
            { "area": "Informática", "area_en": "Informatics", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoI2.png", "link": "#" },
            { "area": "Matemáticas", "area_en": "Math", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoM2.png", "link": "#" },
            { "area": "Ingeniería Química", "area_en": "Chemical Engineering", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoC2.png", "link": "#" },
            { "area": "Informática", "area_en": "Informatics", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoI2.png", "link": "#" }
        ],
        "proyectos-integrales": [
            { "area": "Informática", "area_en": "Informatics", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoI2.png", "link": "#" },
            { "area": "Matemáticas", "area_en": "Math", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoM2.png", "link": "#" },
            { "area": "Ingeniería Química", "area_en": "Chemical Engineering", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoC2.png", "link": "#" },
            { "area": "Matemáticas", "area_en": "Math", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoM2.png", "link": "#" }
        ],
        "codigos-documentados": [
            { "area": "Informática", "area_en": "Informatics", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoI2.png", "link": "#" },
            { "area": "Matemáticas", "area_en": "Math", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoM2.png", "link": "#" },
            { "area": "Ingeniería Química", "area_en": "Chemical Engineering", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoC2.png", "link": "#" },
            { "area": "Informática", "area_en": "Informatics", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoI2.png", "link": "#" }
        ],
        "simuladores": [
            { "area": "Informática", "area_en": "Informatics", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoI2.png", "link": "#" },
            { "area": "Matemáticas", "area_en": "Math", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoM2.png", "link": "#" },
            { "area": "Ingeniería Química", "area_en": "Chemical Engineering", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoC2.png", "link": "#" },
            { "area": "Matemáticas", "area_en": "Math", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoM2.png", "link": "#" }
        ],
        "videos": [
            { "area": "Informática", "area_en": "Informatics", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoI2.png", "link": "#" },
            { "area": "Matemáticas", "area_en": "Math", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoM2.png", "link": "#" },
            { "area": "Ingeniería Química", "area_en": "Chemical Engineering", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoC2.png", "link": "#" },
            { "area": "Informática", "area_en": "Informatics", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoI2.png", "link": "#" }
        ],
        "cursos": [
            { "area": "Informática", "area_en": "Informatics", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoI2.png", "link": "#" },
            { "area": "Matemáticas", "area_en": "Math", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoM2.png", "link": "#" },
            { "area": "Ingeniería Química", "area_en": "Chemical Engineering", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoC2.png", "link": "#" },
            { "area": "Matemáticas", "area_en": "Math", "description": "Descripción del recurso aquí", "description_en": "Resource description here", "image": "images/logoM2.png", "link": "#" }
        ]
    };

    // Try fetch (works on server/GitHub Pages), fallback to embedded
    fetch("resources-data.json")
        .then((res) => res.json())
        .then((data) => { resourcesData = data; })
        .catch(() => { resourcesData = fallbackData; });

    // Also set fallback immediately so clicks work before fetch resolves
    resourcesData = fallbackData;

    cards.forEach((card) => {
        card.style.cursor = "pointer";
        card.addEventListener("click", (e) => {
            e.stopPropagation();
            const key = card.dataset.resource;
            if (!resourcesData || !resourcesData[key]) return;

            // Detect language
            const lang = document.documentElement.lang || "es";
            const isEn = lang === "en";

            // If clicking the same card, close it
            if (activeCard === card) {
                closePanel();
                activeCard = null;
                return;
            }

            // Close previous panel (replaces with new one)
            closePanel();

            // Mark active
            card.classList.add("active");
            activeCard = card;

            // Create expand panel
            const panel = document.createElement("div");
            panel.className = "resource-expand";

            const items = resourcesData[key].slice(0, 4);
            items.forEach((item) => {
                const subcard = document.createElement("a");
                subcard.className = "resource-subcard";
                subcard.href = item.link;
                if (item.link !== "#") {
                    subcard.target = "_blank";
                    subcard.rel = "noopener noreferrer";
                }
                const desc = isEn ? (item.description_en || item.description) : item.description;
                const area = isEn ? (item.area_en || item.area) : item.area;
                subcard.innerHTML = `
                    <img src="${item.image}" alt="${area}">
                    <span class="sub-area">${area}</span>
                    <span class="sub-desc">${desc}</span>
                    <span class="sub-link">${isEn ? "See more" : "Ver más"} <i class="bi bi-arrow-right-short"></i></span>
                `;
                panel.appendChild(subcard);
            });

            // "...y mucho más" footer
            const footer = document.createElement("div");
            footer.className = "resource-expand-footer";
            footer.textContent = isEn ? "...and much more" : "...y mucho más";
            panel.appendChild(footer);

            // Insert panel after the resources container
            const container = card.closest(".resources-container");
            if (container) {
                container.after(panel);
            } else {
                card.after(panel);
            }
            activePanel = panel;
        });
    });

    function closePanel() {
        if (activePanel) {
            activePanel.remove();
            activePanel = null;
        }
        if (activeCard) {
            activeCard.classList.remove("active");
            activeCard = null;
        }
    }

    // Close on click outside
    document.addEventListener("click", (e) => {
        if (!activePanel) return;
        if (!e.target.closest(".resource-card[data-resource]") && !e.target.closest(".resource-expand")) {
            closePanel();
        }
    });
}

// --- Initialize everything on DOMContentLoaded ---
document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initParticles();
    initBgCanvas();
    initMobileMenu();
    initDropdown();
    initCarousel();
    initNavScroll();
    initResourceExpand();
});
