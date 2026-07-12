(() => {
  const themeStorageKey = "kinmei-theme";
  const root = document.documentElement;
  const storage = {
    get() {
      try {
        return localStorage.getItem(themeStorageKey);
      } catch {
        return null;
      }
    },
    set(value) {
      try {
        localStorage.setItem(themeStorageKey, value);
      } catch {
        // Theme switching still works for the current page when storage is unavailable.
      }
    },
  };
  const storedTheme = storage.get();
  const initialTheme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : "light";

  root.dataset.theme = initialTheme;

  const headerRoot = document.querySelector("#site-header");
  const footerRoot = document.querySelector("#site-footer");

  if (headerRoot) {
    headerRoot.outerHTML = `
      <header class="site-nav" aria-label="Primary navigation">
        <a class="logo-link" href="./index.html" aria-label="KINMEI Business Growth home">
          <img class="brand-logo" src="./assets/logo.png" alt="Kinmei Graphic Arts フォトイメージング事業部" />
        </a>
        <nav class="nav-links" aria-label="Site navigation">
          <a href="./index.html#about">About</a>
          <a href="./index.html#focus">Focus</a>
          <a href="./index.html#events">Events</a>
          <a href="./event.html#tickets">Ticket</a>
        </nav>
        <button class="theme-toggle" type="button" aria-label="ダークモードに切り替える" aria-pressed="false">
          <svg class="theme-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.4 15.2A7.7 7.7 0 0 1 8.8 3.6a8.7 8.7 0 1 0 11.6 11.6Z" />
          </svg>
          <svg class="theme-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.8v2.4M12 18.8v2.4M4.5 4.5l1.7 1.7M17.8 17.8l1.7 1.7M2.8 12h2.4M18.8 12h2.4M4.5 19.5l1.7-1.7M17.8 6.2l1.7-1.7" />
          </svg>
        </button>
        <a class="nav-cta" href="./event.html#tickets">参加する</a>
      </header>
    `;
  }

  if (footerRoot) {
    footerRoot.outerHTML = `
      <footer class="site-footer">
        <div>
          <img src="./assets/logo.png" alt="Kinmei Graphic Arts フォトイメージング事業部" />
          <p>Powered by 錦明フォトイメージング事業部</p>
        </div>
        <a href="#top">Back to top</a>
      </footer>
    `;
  }

  const themeToggle = document.querySelector(".theme-toggle");

  function syncThemeToggle() {
    if (!themeToggle) return;
    const isDark = root.dataset.theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "ライトモードに切り替える" : "ダークモードに切り替える");
  }

  syncThemeToggle();

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    storage.set(nextTheme);
    syncThemeToggle();
  });
})();
