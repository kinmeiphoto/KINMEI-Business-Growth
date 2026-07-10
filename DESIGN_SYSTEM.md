# KINMEI Business Growth Design System

## Direction

`kinmeiphoto/kinmeiphoto` の Kinmei Design System を取り込み、ダーク背景、シアンアクセント、グラス風ナビ/カード、日本語ファーストのタイポグラフィ、ピル型CTAを基準にします。

TOP は SusHi Tech Tokyo のように、巨大なイベント情報、実績、Focus、Contents、最新/過去イベントの流れで構成します。イベント詳細は Peatix 型の「カバー画像、日時、会場、チケット、詳細、タイムテーブル、主催者」を1ページで確認できる構成です。

すべての値は `styles.css` の `:root` に CSS カスタムプロパティとして定義し、
生の数値をコンポーネントに直接書かない（トークン経由で参照する）ことを原則にします。

- Color
  - 背景サーフェススケール: `--bg` `#0b0808` / `--bg-2` `#171110` / `--bg-3` `#261b19`
  - インク: `--ink` `#fffaf5` / `--ink-soft` `#d7ccc4` / `--ink-mute` `#8f8078`
  - アクセント: `--accent` `#12a9e0`（基準）/ `--accent-2` `#087fae`（押下・深み）/ `--accent-soft` `#7ee5ff`（ホバー・強調）
  - グラス面: `--glass` / `--glass-strong` / `--glass-cyan`、罫線は `--rule` / `--rule-strong`
- Type
  - 日本語ファーストのフォントスタック（`--font-sans`）。ラテン専用は `--font-latin`。
  - 日本語混在見出しに負のletter-spacingを使わない。
  - フォントサイズはトークン化する: 見出し `--type-*`、本文 `--fs-body` / `--fs-body-lg`、
    キャプション `--fs-caption`、マイクロラベル `--fs-micro`、アイブロウ `--fs-eyebrow`。
  - トラッキングは `--ls-normal` / `--ls-relaxed`（小さめ日本語本文） / `--ls-cta`（CTA） /
    `--ls-wide` / `--ls-wider` / `--ls-widest` を使う。
  - 行間は Kinmei マスターの命名スケールに合わせる:
    `--lh-tight 1.2`（ディスプレイ） / `--lh-snug 1.4`（見出し） / `--lh-normal 1.7` /
    `--lh-relaxed 1.85`（本文・日本語のスイートスポット） / `--lh-loose 2`（高密度本文）。
    本文は `--lh-relaxed`、日本語を含む見出しは詰めすぎない（h2 は約 1.2）。
  - 日本語の描画品質: `body` に `font-feature-settings: "palt" 1`、`text-rendering: optimizeLegibility`、
    フォントスムージングを適用する（句読点カーニングと可読性のため）。
- Shape
  - ナビ/CTA/フィルターはピル型（`--radius-pill`）。
  - 角丸スケールは `--radius-sm` `8px` / `--radius-md` `16px` / `--radius-lg` `24px`。
    カードは `8px` - `24px` の角丸で、グラス風の半透明面を使う。
- Space
  - 間隔スケール `--space-1`〜`--space-9`（6px〜88px）を使う。
  - セクション縦は `--section-pad-y: clamp(64px, 10vw, 120px)`、横は `--section-pad-x: clamp(20px, 4vw, 40px)`。
  - 固定ナビ下のアンカー着地は `--nav-h` を `scroll-margin-top` に使い、見出しがナビに隠れないようにする。
  - ブレークポイントは `1024px` / `768px` / `480px`。

## Accessibility

- フォーカス: すべてのインタラクティブ要素はキーボード操作時に `:focus-visible` の
  リング（`--focus-outline` / `--focus-ring`）を表示する。フォーカスが見えない状態を作らない。
- タップ領域: ナビリンク・CTA・フィルターボタンは最小 `44px` の高さを確保する。
- モーション: `prefers-reduced-motion: reduce` でスムーススクロールとトランジションを抑制する。
- コントラスト: `--ink-mute` は暗背景上で本文最小サイズ AA（4.5:1）を満たす範囲で使う。
- ホバーとフォーカスの見た目は対で定義し、片方だけにしない。

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
