const events = [
  {
    id: "taopix-iwata-seminar-2026",
    title: "TAOPIX社 × 株式会社イワタ セミナー",
    date: "2026-07-23",
    time: "14:00 スタート",
    venue: "オンライン(Zoom)",
    address: "",
    status: "open",
    summary:
      "TAOPIX社と株式会社イワタを迎え、最新プロダクト「Taopix.ai」とTAOPIX向けフォント専用ライセンスパックを紹介するオンラインセミナーです。",
    image: "./assets/event-room.jpg",
    tags: ["TAOPIX", "Taopix.ai", "フォント"],
    ctaLabel: "セミナー詳細を見る",
    ctaUrl: "./event.html",
  },
];

const formatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "short",
});

const today = new Date();
today.setHours(0, 0, 0, 0);

const sortedEvents = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));
const upcomingEvents = sortedEvents
  .filter((event) => new Date(event.date) >= today)
  .sort((a, b) => new Date(a.date) - new Date(b.date));
const pastEvents = sortedEvents.filter((event) => new Date(event.date) < today);
const latestEvent = upcomingEvents[0] || sortedEvents[0];
let activeYear = "all";

function formatDate(value) {
  return formatter.format(new Date(`${value}T00:00:00`));
}

function getYear(value) {
  return new Date(`${value}T00:00:00`).getFullYear().toString();
}

function tagList(tags) {
  return tags.map((tag) => `<li>${tag}</li>`).join("");
}

function renderLatestEvent() {
  const root = document.querySelector("#latest-event");
  if (!root) return;

  const isUpcoming = new Date(latestEvent.date) >= today;
  root.innerHTML = `
    <img src="${latestEvent.image}" alt="${latestEvent.title}のイベント風景" />
    <div class="latest-event-copy">
      <p class="eyebrow">${isUpcoming ? "LATEST EVENT" : "LATEST ARCHIVE"}</p>
      <h3>${latestEvent.title}</h3>
      <div class="event-meta">
        <span>${formatDate(latestEvent.date)}</span>
        <span>${latestEvent.time}</span>
        <span>${latestEvent.venue}</span>
        ${latestEvent.address ? `<span>${latestEvent.address}</span>` : ""}
      </div>
      <p>${latestEvent.summary}</p>
      <ul class="event-tags" aria-label="Event tags">${tagList(latestEvent.tags)}</ul>
      <a class="button button-primary" href="${latestEvent.ctaUrl || "./event.html"}">
        ${latestEvent.ctaLabel || "詳細を見る"}
      </a>
    </div>
  `;
}

function renderHeroLatestEvent() {
  const root = document.querySelector("#hero-latest-event");
  if (!root) return;

  root.innerHTML = `
    <img class="hero-ticket-thumb" src="${latestEvent.image}" alt="${latestEvent.title}のサムネイル" />
    <div class="hero-ticket-copy">
      <p class="ticket-kicker">LATEST EVENT</p>
      <h2>${latestEvent.title}</h2>
      <div class="event-meta">
        <span>${formatDate(latestEvent.date)}</span>
        <span>${latestEvent.time}</span>
        <span>${latestEvent.venue}</span>
        ${latestEvent.address ? `<span>${latestEvent.address}</span>` : ""}
      </div>
      <a class="button button-primary" href="${latestEvent.ctaUrl || "./event.html"}">
        ${latestEvent.ctaLabel || "イベント詳細を見る"}
      </a>
    </div>
  `;
}

function renderFilters() {
  const root = document.querySelector("#event-filters");
  if (!root) return;

  if (!pastEvents.length) {
    root.innerHTML = "";
    return;
  }

  const years = [...new Set(pastEvents.map((event) => getYear(event.date)))];
  const filterItems = ["all", ...years];
  root.innerHTML = filterItems
    .map((year) => {
      const label = year === "all" ? "All" : year;
      return `<button type="button" data-year="${year}" aria-pressed="${year === activeYear}">${label}</button>`;
    })
    .join("");

  root.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activeYear = button.dataset.year;
      renderFilters();
      renderPastEvents();
    });
  });
}

function renderPastEvents() {
  const root = document.querySelector("#past-events");
  if (!root) return;

  const visibleEvents =
    activeYear === "all"
      ? pastEvents
      : pastEvents.filter((event) => getYear(event.date) === activeYear);

  if (!visibleEvents.length) {
    root.innerHTML = `<p class="empty-state">過去のイベントはありません</p>`;
    return;
  }

  root.innerHTML = visibleEvents
    .map(
      (event) => `
        <article class="event-card glass-card">
          <img src="${event.image}" alt="${event.title}の記録写真" />
          <div class="event-card-body">
            <div class="event-meta">
              <span>${formatDate(event.date)}</span>
              <span>${event.venue}</span>
            </div>
            <h4>${event.title}</h4>
            <p>${event.summary}</p>
            <ul class="event-tags" aria-label="Event tags">${tagList(event.tags)}</ul>
          </div>
        </article>
      `,
    )
    .join("");
}

renderHeroLatestEvent();
renderLatestEvent();
renderFilters();
renderPastEvents();
