const events = [
  {
    id: "business-growth-2026",
    title: "KINMEI Business Growth 2026",
    date: "2026-10-18",
    time: "10:00 - 19:00",
    venue: "Tokyo / Hybrid",
    status: "open",
    summary:
      "AI、制作ワークフロー、写真体験、EC、地域ビジネスを横断し、新しいビジネスを創り出すための1日。",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    tags: ["AI", "Business Design", "Community"],
    ctaLabel: "イベント詳細を見る",
    ctaUrl: "./event.html",
  },
  {
    id: "workflow-lab-2026",
    title: "Business Workflow Lab",
    date: "2026-04-22",
    time: "15:00 - 18:00",
    venue: "Osaka",
    status: "closed",
    summary:
      "少量多品種、EC連携、制作進行をテーマに、事業成長を支える業務設計を議論しました。",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80",
    tags: ["Workflow", "Automation"],
  },
  {
    id: "photo-commerce-2025",
    title: "Photo Commerce Meetup",
    date: "2025-11-07",
    time: "13:00 - 17:00",
    venue: "Nagoya",
    status: "closed",
    summary:
      "写真体験、アルバム、EC、店頭接客をつなぎ、顧客接点を増やすサービスづくりを扱いました。",
    image:
      "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=1000&q=80",
    tags: ["Photo", "Commerce"],
  },
  {
    id: "package-growth-2025",
    title: "Packaging Growth Session",
    date: "2025-06-14",
    time: "14:00 - 18:30",
    venue: "Fukuoka",
    status: "closed",
    summary:
      "パッケージ、販促物、ブランド体験を組み合わせ、印刷会社が提案できる価値を整理しました。",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1000&q=80",
    tags: ["Packaging", "Brand"],
  },
  {
    id: "local-business-2024",
    title: "Local Business Design Forum",
    date: "2024-09-20",
    time: "10:30 - 16:30",
    venue: "Kyoto",
    status: "closed",
    summary:
      "地域企業、自治体、制作会社が集まり、印刷と写真を活用した地域事業の作り方を議論しました。",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
    tags: ["Local", "Sustainability"],
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
      </div>
      <p>${latestEvent.summary}</p>
      <ul class="event-tags" aria-label="Event tags">${tagList(latestEvent.tags)}</ul>
      <a class="button button-primary" href="${latestEvent.ctaUrl || "./event.html"}">
        ${latestEvent.ctaLabel || "詳細を見る"}
      </a>
    </div>
  `;
}

function renderFilters() {
  const root = document.querySelector("#event-filters");
  if (!root) return;

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
    root.innerHTML = `<p class="empty-state">該当する過去イベントはまだありません。</p>`;
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

renderLatestEvent();
renderFilters();
renderPastEvents();
