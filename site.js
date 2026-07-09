(() => {
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
})();
