# KINMEI Business Growth Design System

## Direction

`kinmeiphoto/kinmeiphoto` の Kinmei Design System を取り込み、ダーク背景、シアンアクセント、控えめなグラス面、日本語ファーストのタイポグラフィ、ピル型CTAを基準にします。

TOP は「コミュニティの目的、重点領域、最新イベント、過去イベント」の順に整理します。イベント詳細は Peatix 型の「カバー画像、テーマ、タイムテーブル、参加費、会場、主催者」を1ページで確認できる構成です。

Apple Human Interface Guidelines の考え方をWeb向けに解釈し、以下を優先します。

- Clarity: 見出しは必要以上に巨大化させず、本文・画像・CTAの関係が一目で読める階層にする。
- Deference: 装飾はコンテンツを邪魔しない濃度に抑える。グリッド背景、グラス効果、影は弱く使う。
- Depth: 背景、カード、CTAの面を分けるが、過度な立体表現は避ける。
- Proximity: 見出しと画像を密着させない。セクションヘッダーとコンテンツの間は共通余白を使う。
- Legibility: Apple系システムフォントを優先し、本文は15px未満にしない。日本語見出しに負のletter-spacingを使わない。

すべての値は `styles.css` の `:root` に CSS カスタムプロパティとして定義し、
生の数値をコンポーネントに直接書かない（トークン経由で参照する）ことを原則にします。

- Color
  - 背景サーフェススケール: `--bg` `#0b0808` / `--bg-2` `#171110` / `--bg-3` `#261b19`
  - インク: `--ink` `#fffaf5` / `--ink-soft` `#d7ccc4` / `--ink-mute` `#8f8078`
  - アクセント: `--accent` `#12a9e0`（基準）/ `--accent-2` `#087fae`（押下・深み）/ `--accent-soft` `#7ee5ff`（ホバー・強調）
  - グラス面: `--glass` / `--glass-strong` / `--glass-cyan`、罫線は `--rule` / `--rule-strong`
- Type
  - Apple系システムフォントを先頭に置いた日本語ファーストのフォントスタック（`--font-sans`）。ラテン専用は `--font-latin`。
  - 日本語混在見出しに負のletter-spacingを使わない。
  - フォントサイズはトークン化する: 見出し `--type-*`、本文 `--fs-body` / `--fs-body-lg`、
    キャプション `--fs-caption`、マイクロラベル `--fs-micro`、アイブロウ `--fs-eyebrow`。
  - トラッキングは `--ls-normal` / `--ls-cta`（CTA） / `--ls-wide` / `--ls-wider` / `--ls-widest` を使う。
- Shape
  - ナビ/CTA/フィルターはピル型（`--radius-pill`）。
  - 角丸スケールは `--radius-sm` `8px` / `--radius-md` `16px` / `--radius-lg` `24px`。
    カードは原則 `--radius-md` を使い、グラス風の半透明面は控えめにする。
- Space
  - 間隔スケール `--space-1`〜`--space-9`（6px〜80px）を使う。
  - セクション縦は `--section-pad-y: clamp(72px, 8vw, 112px)`、横は `--section-pad-x: clamp(22px, 4vw, 56px)`。
  - `.section-head` は次の画像/カード群との間に共通マージンを持つ。個別に詰めない。
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
- Home Hero: Business Growth title + latest event panel. タイトルは最大96pxに抑える。
- Button: Primary blue CTA and secondary outlined action.
- Report Metrics: Visitors / Meetings / Speakers.
- Focus Grid: AI / Business Design / Community. 見出しと画像の間は `.section-head` の共通余白で分離する。
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
