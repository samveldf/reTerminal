# スクリーンショット生成スクリプト

このディレクトリには、ローカルでホストされている Web アプリケーションのスクリーンショットを Playwright で取得するスクリプトが含まれています。CI/CD パイプラインやリリース用の画像の生成に利用します。

## 使い方

1. `npm run dev` などで対象アプリを `localhost:3000` に起動しておく（`PORT` を変更した場合は `index.ts` と README を合わせて更新）。
2. プロジェクトのルートにて `npm run screenshot` で実行してスクリーンショットを作成します。

## 前提条件

- Node.js 24+ および依存パッケージ（`playwright` など）がインストール済みであること。
- ブラウザ起動に必要なランタイム（Playwright の Chromium）がセットアップ済みであること（`npx playwright install` を初回に実行）。

## パラメータのカスタマイズ

- `PORT`: 対象アプリのサーバーポート（デフォルト 3000）。
- `OUTPUT_FILE`: 出力ファイル名（デフォルト `screenshot.jpg`）。
- `URL`: スクリーンショットを取りたい完全な URL（必要に応じてホストやパスを調整）。
- `WIDTH` / `HEIGHT`: ブラウザのビューポートサイズ。必要なレイアウトやアセットが確実に収まるように調整してください。

## トラブルシューティング

- `browserType.launch: Executable doesn't exist at /Users/kana/Library/Caches/ms-playwright/chromium_headless_shell-1200/chrome-headless-shell-mac-arm64/chrome-headless-shell` のようなエラーが出た場合、`npx playwright install` を再実行してブラウザバイナリを再インストールしてください。
