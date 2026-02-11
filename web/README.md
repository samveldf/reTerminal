# Web-only Multi-page Cyber Dashboard (for SenseCraft)

This setup is purely `web`-based and does not use `arduino/`.

Architecture and implementation details (plain + technical) are in:
- `README.md`

Generated outputs:
- `page1.bmp`: weather + indoor temp/humidity + battery
- `page2.bmp`: 3 key gadget news briefs (about 100 chars each)
- `page3.bmp`: image page from `./DSC_2962.jpg`

## 1) `.env` Is Configured

`web/.env` already includes:
- OpenWeather API Key
- Tokyo coordinates
- Tokyo weather label
- General top-news RSS (Page1)
- Gadget news RSS (Page2)
- `FEATURE_IMAGE_URL=/DSC_2962.jpg`
- `INDOOR_TEMP_C / INDOOR_HUMIDITY / DEVICE_BATTERY_PERCENT` (currently display values)

Edit `web/.env` if you want to change them.

## 2) Local Development

```bash
cd web
npm install
npm run dev
```

Pages:
- `http://localhost:3000/page1`
- `http://localhost:3000/page2`
- `http://localhost:3000/page3`
- `http://localhost:3000/` (auto-rotation)

RSS env variables:
- `GENERAL_NEWS_RSS_URL`: general top headlines for Page1 (default: Google News general feed)
- `GADGET_NEWS_RSS_URL`: gadget/digital feed for Page2 (default: gadget search feed)
- `GOOGLE_NEWS_RSS_URL`: legacy compatibility; used for Page2 only when `GADGET_NEWS_RSS_URL` is unset

## 3) Generate 3 Screenshots and BMPs

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

# Preserve color on page3 (do not remap to the 7-color palette)
magick ./dist/page3.png \
  -colorspace sRGB \
  -strip \
  -alpha off \
  -define bmp:format=bmp3 \
  -type truecolor \
  ./dist/page3.bmp
```

## 4) Configure Multi-page Rotation in SenseCraft

Recommended approach: use `Gallery` (most stable).
1. Create a new `Gallery` page in SenseCraft.
2. Add 3 image URLs:
   - `https://<your-user>.github.io/<your-repo>/page1.bmp`
   - `https://<your-user>.github.io/<your-repo>/page2.bmp`
   - `https://<your-user>.github.io/<your-repo>/page3.bmp`
3. Set rotation interval (for example, 20-60 seconds).
4. Deploy to E1002.

This gives the desired cycle:
1 page weather + top news, 1 page gadget briefs, 1 page image.
