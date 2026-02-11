# Web-only Multi-page Cyber Dashboard (for SenseCraft)

你现在这套是纯 `web` 方案，不用 `arduino/`。

实现原理与架构图（外行版 + 技术版）见根目录：
- `README.md`

生成结果：
- `page1.bmp`：天气 + 室内温湿度 + 电量
- `page2.bmp`：3 条重点 Gadget 新闻摘要（每条约 100 字）
- `page3.bmp`：`./DSC_2962.jpg` 图片页

## 1) `.env` 已配置

`web/.env` 已写入：
- OpenWeather API Key
- 东京坐标
- Tokyo 天气
- 综合重点新闻 RSS（Page1）
- Gadget 新闻 RSS（Page2）
- `FEATURE_IMAGE_URL=/DSC_2962.jpg`
- `INDOOR_TEMP_C / INDOOR_HUMIDITY / DEVICE_BATTERY_PERCENT`（当前为页面展示值）

如果要改，编辑 `web/.env`。

## 2) 本地开发

```bash
cd web
npm install
npm run dev
```

页面：
- `http://localhost:3000/page1`
- `http://localhost:3000/page2`
- `http://localhost:3000/page3`
- `http://localhost:3000/`（自动轮播）

RSS 变量说明：
- `GENERAL_NEWS_RSS_URL`：Page1 综合重点头条（默认 Google News 综合头条）
- `GADGET_NEWS_RSS_URL`：Page2 数码/Gadget 头条（默认 Gadget 搜索 RSS）
- `GOOGLE_NEWS_RSS_URL`：兼容旧配置，仅在未设置 `GADGET_NEWS_RSS_URL` 时用于 Page2

## 3) 生成 3 页截图和 BMP

```bash
cd web
npm run build
python3 -m http.server 3000 --directory ./dist &
npx wait-on http://127.0.0.1:3000
npm run screenshot

magick xc:"#000000" xc:"#FFFFFF" xc:"#FF0000" xc:"#FFFF00" xc:"#0000FF" xc:"#00FF00" xc:"#FF8000" +append palette.png
for p in page1 page2; do
  magick ./dist/${p}.png \
    -colorspace sRGB \
    -strip \
    -alpha off \
    +dither \
    -remap palette.png \
    -define bmp:format=bmp3 \
    -type truecolor \
    ./dist/${p}.bmp
done

# page3 保色优先（不要 remap 到 7 色盘）
magick ./dist/page3.png \
  -colorspace sRGB \
  -strip \
  -alpha off \
  -define bmp:format=bmp3 \
  -type truecolor \
  ./dist/page3.bmp
```

## 4) 用 SenseCraft 实现多页循环

推荐用 Gallery（最稳）：
1. 在 SenseCraft 新建 `Gallery` 页面。
2. 添加 3 张网络图片：
   - `https://<your-user>.github.io/<your-repo>/page1.bmp`
   - `https://<your-user>.github.io/<your-repo>/page2.bmp`
   - `https://<your-user>.github.io/<your-repo>/page3.bmp`
3. 设置轮播间隔（例如 20~60 秒）。
4. Deploy 到 E1002。

这样就是你要的“1页天气+综合重点头条、1页3条数码摘要、1页图片”的循环显示。
