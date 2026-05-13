/* =========================================================
   Cheder Menachem of Inverrary — Site JS
   Renders shared header/footer, handles nav, tweaks, theme.
   ========================================================= */

(function () {
  const NAV = [
    { href: "index.html",      label: "Home"       },
    { href: "about.html",      label: "About"      },
    { href: "program.html",    label: "Program"    },
    { href: "staff.html",      label: "Our Staff"  },
    { href: "enrollment.html", label: "Enrollment" },
    { href: "faq.html",        label: "FAQ"        },
    { href: "contact.html",    label: "Contact"    }
  ];

  const STATE = {
    theme: localStorage.getItem("cm-theme") || "light",
    hero:  localStorage.getItem("cm-hero")  || "split"
  };

  /* ---------------------------------------------------------
     Theme
  --------------------------------------------------------- */
  function applyTheme(theme) {
    STATE.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("cm-theme", theme);
    document.querySelectorAll("[data-theme-toggle]").forEach(btn => {
      btn.innerHTML = theme === "dark" ? sunIcon() : moonIcon();
      btn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
    });
    document.querySelectorAll("[data-tweak='theme'] button").forEach(b => {
      b.classList.toggle("active", b.dataset.value === theme);
    });
  }

  /* ---------------------------------------------------------
     Hero variant (home page only)
  --------------------------------------------------------- */
  function applyHero(variant) {
    STATE.hero = variant;
    localStorage.setItem("cm-hero", variant);
    const hero = document.querySelector(".hero[data-hero-host]");
    if (hero) {
      hero.classList.remove("hero-split", "hero-overlay", "hero-typographic");
      hero.classList.add("hero-" + variant);
    }
    document.querySelectorAll("[data-tweak='hero'] button").forEach(b => {
      b.classList.toggle("active", b.dataset.value === variant);
    });
  }

  /* ---------------------------------------------------------
     SVG icons
  --------------------------------------------------------- */
  function moonIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }
  function sunIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`;
  }
  function menuIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>`;
  }
  function tweaksIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="6" cy="8" r="2"/><line x1="6" y1="2" x2="6" y2="6"/><line x1="6" y1="10" x2="6" y2="22"/><circle cx="12" cy="16" r="2"/><line x1="12" y1="2" x2="12" y2="14"/><line x1="12" y1="18" x2="12" y2="22"/><circle cx="18" cy="11" r="2"/><line x1="18" y1="2" x2="18" y2="9"/><line x1="18" y1="13" x2="18" y2="22"/></svg>`;
  }
  function ornament() {
    return `<svg viewBox="0 0 14 14" fill="currentColor"><path d="M7 0 L8.5 5.5 L14 7 L8.5 8.5 L7 14 L5.5 8.5 L0 7 L5.5 5.5 Z"/></svg>`;
  }

  /* ---------------------------------------------------------
     Header
  --------------------------------------------------------- */
  function renderHeader() {
    const slot = document.querySelector("[data-site-header]");
    if (!slot) return;

    const currentPage = (location.pathname.split("/").pop() || "index.html").toLowerCase();

    const navLinks = NAV.map(item => {
      const active = item.href.toLowerCase() === currentPage ? "is-active" : "";
      return `<a class="${active}" href="${item.href}">${item.label}</a>`;
    }).join("");

    slot.innerHTML = `
      <div class="utility-bar">
        <div class="container">
          <span class="heb">בס״ד</span>
          <span style="display:flex; gap:24px; align-items:center;">
            <a href="mailto:Info@Chedermenacheminverrary.com">Info@Chedermenacheminverrary.com</a>
            <a href="tel:9176156960" style="display:none" data-show-md>917-615-6960</a>
          </span>
        </div>
      </div>
      <header class="site-header">
        <div class="nav-inner">
          <a class="brand" href="index.html">
            <span class="brand-mark">ח</span>
            <span class="brand-text">
              <span class="brand-name">Cheder Menachem</span>
              <span class="brand-sub">of Inverrary · Pre-1A</span>
            </span>
          </a>
          <button class="nav-toggle" data-nav-toggle aria-label="Open menu">${menuIcon()}</button>
          <nav class="main-nav" data-main-nav>
            ${navLinks}
            <a class="nav-cta" href="enrollment.html">Apply</a>
            <button class="theme-toggle" data-theme-toggle aria-label="Toggle theme"></button>
          </nav>
        </div>
      </header>
    `;

    slot.querySelector("[data-nav-toggle]").addEventListener("click", () => {
      const nav = slot.querySelector("[data-main-nav]");
      const open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", !open);
    });
    slot.querySelector("[data-theme-toggle]").addEventListener("click", () => {
      applyTheme(STATE.theme === "dark" ? "light" : "dark");
    });
  }

  /* ---------------------------------------------------------
     Footer
  --------------------------------------------------------- */
  function renderFooter() {
    const slot = document.querySelector("[data-site-footer]");
    if (!slot) return;

    slot.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a class="brand" href="index.html" style="color: var(--cream-soft); border: none;">
                <span class="brand-mark" style="background: transparent; color: var(--gold-soft); border-color: var(--gold-soft);">ח</span>
                <span class="brand-text">
                  <span class="brand-name">Cheder Menachem</span>
                  <span class="brand-sub">of Inverrary · Pre-1A</span>
                </span>
              </a>
              <span class="heb">תורה · דרך ארץ · חינוך</span>
              <p>A Chabad-based Pre-1A program serving the families of Inverrary and the surrounding community.</p>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li><a href="about.html">About</a></li>
                <li><a href="program.html">Program</a></li>
                <li><a href="staff.html">Our Staff</a></li>
                <li><a href="faq.html">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4>Enroll</h4>
              <ul>
                <li><a href="enrollment.html">Pre-1A Enrollment</a></li>
                <li><a href="https://form.jotform.com/261225649441154" target="_blank" rel="noopener">Submit Application</a></li>
                <li><a href="enrollment.html#tuition">Tuition</a></li>
                <li><a href="contact.html">Visit / Inquire</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:Info@Chedermenacheminverrary.com">Info@Chedermenacheminverrary.com</a></li>
                <li><a href="tel:9176156960">917-615-6960</a></li>
                <li style="margin-top: 8px; color: rgba(245,239,228,0.55); font-size: 13.5px;">Naftali Marasow</li>
                <li style="color: rgba(245,239,228,0.55); font-size: 13.5px;">Mirel Rosenfeld</li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} Cheder Menachem of Inverrary. All rights reserved.</span>
            <span class="heb" style="color: var(--gold-soft);">חינוך על טהרת הקודש</span>
          </div>
        </div>
      </footer>
    `;
  }

  /* ---------------------------------------------------------
     FAQ accordion
  --------------------------------------------------------- */
  function initFAQ() {
    document.querySelectorAll(".faq-item").forEach(item => {
      const q = item.querySelector(".faq-q");
      if (!q) return;
      q.addEventListener("click", () => {
        const open = item.getAttribute("data-open") === "true";
        item.setAttribute("data-open", !open);
      });
    });
  }

  /* ---------------------------------------------------------
     Tweaks (light/dark + hero variant)
     Listens for parent toolbar messages.
  --------------------------------------------------------- */
  function renderTweaks() {
    if (document.querySelector("[data-tweaks-host]")) return;
    const wrap = document.createElement("div");
    wrap.className = "tweaks";
    wrap.setAttribute("data-tweaks-host", "");

    const isHome = document.body.dataset.page === "home";

    wrap.innerHTML = `
      <div class="tweaks-head">
        <span class="tweaks-title">Tweaks</span>
        <button class="tweaks-close" data-tweaks-close aria-label="Close tweaks">×</button>
      </div>
      <div class="tweaks-group" data-tweak="theme">
        <div class="tweaks-label">Theme</div>
        <div class="tweaks-segmented">
          <button data-value="light">Light</button>
          <button data-value="dark">Dark</button>
        </div>
      </div>
      ${isHome ? `
      <div class="tweaks-group" data-tweak="hero">
        <div class="tweaks-label">Hero style</div>
        <div class="tweaks-segmented three">
          <button data-value="split">Split</button>
          <button data-value="overlay">Overlay</button>
          <button data-value="typographic">Type</button>
        </div>
      </div>` : ""}
    `;
    document.body.appendChild(wrap);

    wrap.querySelector("[data-tweaks-close]").addEventListener("click", () => {
      wrap.setAttribute("data-open", "false");
      try { window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*"); } catch (_) {}
    });
    wrap.querySelectorAll("[data-tweak='theme'] button").forEach(b => {
      b.addEventListener("click", () => applyTheme(b.dataset.value));
    });
    wrap.querySelectorAll("[data-tweak='hero'] button").forEach(b => {
      b.addEventListener("click", () => applyHero(b.dataset.value));
    });
  }

  function bindTweaksProtocol() {
    window.addEventListener("message", (e) => {
      const t = e?.data?.type;
      if (t === "__activate_edit_mode") {
        const w = document.querySelector("[data-tweaks-host]");
        if (w) w.setAttribute("data-open", "true");
      }
      if (t === "__deactivate_edit_mode") {
        const w = document.querySelector("[data-tweaks-host]");
        if (w) w.setAttribute("data-open", "false");
      }
    });
    try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch (_) {}
  }

  /* ---------------------------------------------------------
     Init
  --------------------------------------------------------- */
  function init() {
    applyTheme(STATE.theme);
    renderHeader();
    renderFooter();
    applyTheme(STATE.theme);   // re-sync toggle markup after header render
    if (document.body.dataset.page === "home") applyHero(STATE.hero);
    initFAQ();
    renderTweaks();
    bindTweaksProtocol();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
