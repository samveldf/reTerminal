# reTerminal E1002 Web-only Multi-page Dashboard

已按你的需求实现为 `web` 方案（不依赖 `arduino/`）：

- Page1: 东京最近三天天气 + 室内温湿度 + 设备电量
- Page2: Google News 的 gadget 最新新闻摘要
- Page3: 当前目录图片 `./DSC_2962.jpg`

关键页面：
- `web/src/pages/page1.astro`
- `web/src/pages/page2.astro`
- `web/src/pages/page3.astro`
- `web/src/pages/index.astro`（自动轮播）

环境变量：
- 已直接写入 `web/.env`（包含你提供的 OpenWeather API key）。
- `INDOOR_TEMP_C / INDOOR_HUMIDITY / DEVICE_BATTERY_PERCENT` 目前由 `web/.env` 提供展示值。

使用方法看：
- `web/README.md`
