# KINMEI Business Growth

印刷/フォト業界の成長を共創するビジネスコミュニティサイトです。TOPページ、イベント詳細ページ、最新イベント/過去イベント管理を静的HTML/CSS/JavaScriptで構成しています。

## 公開URL

- Repository: https://github.com/kinmeiphoto/KINMEI-Business-Growth
- GitHub Pages: https://kinmeiphoto.github.io/KINMEI-Business-Growth/
- 公開ブランチ: `gh-pages`

## ページ構成

- `index.html`: TOPページ。MV、コミュニティ紹介、Focus、最新イベント、過去イベントを表示します。
- `event.html`: 最新イベントの詳細ページ。MV、テーマ、タイムテーブル、参加費、会場情報、申込導線を表示します。
- `events.js`: イベントデータ管理。最新イベントと過去イベントを日付から自動で振り分けます。
- `site.js`: 共通ヘッダー/フッター。
- `styles.css`: デザイントークン、レイアウト、コンポーネント。
- `DESIGN_SYSTEM.md`: デザインシステムの方針とイベントデータモデル。

## 現在の最新イベント

- タイトル: TAOPIXの代表に聞く：AI時代の新たな印刷業の成長戦略
- 日時: 2026年7月23日(木) 13:00 - 15:00
- 会場: 錦明印刷会社 本社７F イベントルーム
- 住所: 東京都千代田区西神田3-3-3
- 参加費: 無料

## イベント管理

イベントの追加・更新は `events.js` の `events` 配列を編集します。

```js
{
  id: "unique-event-id",
  title: "イベントタイトル",
  date: "2026-07-23",
  time: "13:00 - 15:00",
  venue: "錦明印刷会社 本社７F イベントルーム",
  address: "東京都千代田区西神田3-3-3",
  status: "open",
  summary: "イベント概要",
  image: "./assets/event-room.jpg",
  tags: ["AI", "Growth Strategy"],
  ctaLabel: "イベント詳細を見る",
  ctaUrl: "./event.html"
}
```

- `date` が今日以降のイベントは最新イベント候補になります。
- `date` が今日より前のイベントは過去イベントとして表示されます。
- 過去イベントがない場合は「過去のイベントはありません」と表示します。
- イベントが増えると、過去イベントの年別フィルターは自動生成されます。

## ローカル確認

静的サイトのため、ローカルサーバーだけで確認できます。

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

ブラウザで `http://127.0.0.1:4173/` を開きます。

## デプロイ

GitHub Pages は `gh-pages` ブランチから公開します。

```bash
git push origin main
git push origin main:gh-pages
```
