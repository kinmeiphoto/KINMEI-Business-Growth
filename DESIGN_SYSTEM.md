# KINMEI Business Growth Design System

## Direction

`kinmeiphoto/kinmeiphoto` の Kinmei Design System を取り込み、ダーク背景、シアンアクセント、グラス風ナビ/カード、日本語ファーストのタイポグラフィ、ピル型CTAを基準にします。

TOP は SusHi Tech Tokyo のように、巨大なイベント情報、実績、Focus、Contents、最新/過去イベントの流れで構成します。イベント詳細は Peatix 型の「カバー画像、日時、会場、チケット、詳細、タイムテーブル、主催者」を1ページで確認できる構成です。

## Tokens

- Color
  - `--bg`: `#0b0808`
  - `--bg-2`: `#171110`
  - `--ink`: `#fffaf5`
  - `--ink-soft`: `#d7ccc4`
  - `--ink-mute`: `#8f8078`
  - `--accent`: `#12a9e0`
  - `--accent-2`: `#087fae`
  - `--accent-soft`: `#7ee5ff`
- Type
  - 日本語ファーストのフォントスタック。
  - 日本語混在見出しに負のletter-spacingを使わない。
- Shape
  - ナビ/CTAはピル型。
  - カードは `8px` - `24px` の角丸で、グラス風の半透明面を使う。
- Space
  - セクションは `clamp(64px, 10vw, 120px)`。
  - ブレークポイントは `1024px` / `768px` / `480px`。

## Components

- Header: Kinmei logo with fixed glass navigation.
- Home Hero: Large Business Growth title + next event date panel.
- Button: Primary blue CTA and secondary outlined action.
- Report Metrics: Visitors / Meetings / Speakers.
- Focus Grid: AI / Business Design / Community.
- Contents Grid: Sessions / Timetable / Ticket / Archive.
- Latest Event: `events.js` の日付から自動選定。
- Past Event Archive: 年別フィルターを自動生成。
- Event Detail: `event.html` に日時、会場、チケット、タイムテーブル、主催者を集約。

## Event Data Model

イベントの追加・更新は [events.js](./events.js) の `events` 配列を編集します。

```js
{
  id: "unique-event-id",
  title: "KINMEI Business Growth 2026",
  date: "2026-10-18",
  time: "10:00 - 19:00",
  venue: "Tokyo / Hybrid",
  status: "open",
  summary: "Short event description.",
  image: "https://...",
  tags: ["AI", "Workflow"],
  ctaLabel: "参加申し込み",
  ctaUrl: "#final-title"
}
```

`date` が今日以降のイベントは最新イベント候補になり、今日より前のイベントは過去イベントに入ります。今後イベント数が増えても、年別フィルターは自動で増えます。
