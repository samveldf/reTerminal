# Arduino Firmware for reTerminal E1002

`arduino/sketch/sketch.ino` is responsible for:
- connecting to Wi-Fi
- downloading `screenshot.bmp`
- drawing on the 7.3" color ePaper
- overlaying device-side data: indoor temperature/humidity + battery level
- waking up on schedule and refreshing via deep sleep

## Dependencies

- Arduino IDE
- ESP32 Board Package (follow Seeed official docs)
- Libraries:
  - `GxEPD2`
  - `Sensirion I2C SHT4x`

Reference:
- https://wiki.seeedstudio.com/reterminal_e10xx_with_arduino/

## Required Parameters

Edit in `sketch.ino`:

```cpp
const char* WIFI_SSID = "YOUR_WIFI_SSID";
const char* WIFI_PASS = "YOUR_WIFI_PASS";
const char* BMP_URL = "https://<your-user>.github.io/<your-repo>/screenshot.bmp";
```

## Hardware Reads

- Indoor temperature/humidity: SHT4x (I2C `SDA=19`, `SCL=20`, address `0x44`)
- Battery: `BATTERY_ADC_PIN=1`, `BATTERY_ENABLE_PIN=21`

## Refresh Strategy

- Refresh once every 30 minutes by default
- Skip automatic refresh from `01:00` to `05:00` by default (button wake can force refresh)
- Enter deep sleep after refresh

## Upload

Flash to E1002 using Seeed's official board settings (serial baud rate `115200`).

After upload, the device runs automatically according to the refresh schedule.
