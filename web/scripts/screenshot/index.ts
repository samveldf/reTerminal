import { chromium } from 'playwright';
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

const PORT = Number(process.env.PORT || 3000);
const URL_BASE = process.env.URL_BASE || `http://localhost:${PORT}`;
const WIDTH = Number(process.env.WIDTH || 800);
const HEIGHT = Number(process.env.HEIGHT || 480);
const OUTPUT_DIR = process.env.OUTPUT_DIR || 'dist';

const targets = [
  { route: '/page1/', file: 'page1.png' },
  { route: '/page2/', file: 'page2.png' },
  { route: '/page3/', file: 'page3.png' },
];

async function captureAllScreenshots() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
  });

  try {
    for (const target of targets) {
      const url = `${URL_BASE}${target.route}`;
      const outputPath = path.join(OUTPUT_DIR, target.file);

      console.log(`capture: ${url} -> ${outputPath}`);
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 });
      await page.waitForTimeout(1200);
      await page.screenshot({
        path: outputPath,
        type: 'png',
        clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
        animations: 'disabled',
      });
    }

    await copyFile(path.join(OUTPUT_DIR, 'page1.png'), path.join(OUTPUT_DIR, 'screenshot.png'));
    console.log('saved: page1.png page2.png page3.png');
  } finally {
    await browser.close();
  }
}

captureAllScreenshots().catch((error) => {
  console.error(error);
  process.exit(1);
});
