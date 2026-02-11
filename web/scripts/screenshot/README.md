# Screenshot Generation Script

This directory contains a Playwright script that captures screenshots of a locally hosted web app. It is used in CI/CD and release image generation.

## Usage

1. Start the target app on `localhost:3000` (for example with `npm run dev`).
   If you change `PORT`, update both `index.ts` and this README.
2. Run `npm run screenshot` from the project root.

## Prerequisites

- Node.js 24+ and dependencies (including `playwright`) are installed.
- Playwright Chromium runtime is installed (`npx playwright install` on first setup).

## Customizable Parameters

- `PORT`: app server port (default: `3000`)
- `OUTPUT_FILE`: output file name (default: `screenshot.png`)
- `URL`: full URL to capture (adjust host/path as needed)
- `WIDTH` / `HEIGHT`: browser viewport size for your target layout

## Troubleshooting

- If you see an error like `browserType.launch: Executable doesn't exist ...`,
  run `npx playwright install` again to reinstall browser binaries.
