# KINMEI Print Growth Design System

## Direction

参照サイトの「太いタイポグラフィ、白い余白、黒い罫線、鮮やかな青、写真主体の編集的レイアウト」をベースに、印刷業界向けに落ち着いた紙色と短い文章で組み立てます。

## Tokens

- Color
  - `--color-paper`: 背景。白すぎない紙色。
  - `--color-surface`: カード、FAQ、イベント面。
  - `--color-ink`: 見出し、罫線、強いCTA。
  - `--color-muted`: 本文、補足。
  - `--color-blue`: 主要アクセント、CTA、ラベル。
  - `--color-yellow`: 写真キャプション、ホバーアクセント。
- Type
  - 見出しは大きく、行間を詰める。
  - 本文は日本語の読みやすさを優先し、字間は広げない。
- Shape
  - カード角丸は最大 `8px`。
  - 罫線とグリッドで情報を整理する。
- Space
  - セクションは広めの縦余白。
  - モバイルでは1カラムに落とし、画像の高さを固定して崩れを防ぐ。

## Components

- Header: Sticky navigation with compact brand mark.
- Hero: Large type + photographic visual + theme label.
- Button: Primary blue CTA and secondary outlined action.
- Value Card: Learn / Meet / Build for the core promise.
- Topic Grid: Future event topics can be added without changing layout.
- Latest Event: `events.js` の日付から自動選定。
- Past Event Archive: 年別フィルターを自動生成。
- FAQ: Native `details` for accessible disclosure.

## Event Data Model

イベントの追加・更新は `events.js` の `events` 配列を編集します。

```js
{
  id: "unique-event-id",
  title: "Event title",
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
