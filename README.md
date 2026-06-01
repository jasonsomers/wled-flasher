# RGB2Go WLED Flasher

Browser-based WLED firmware installer for RGB2Go controllers.

**Live site:** https://jasonsomers.github.io/wled-flasher/

## Requirements
- Chrome or Edge (WebSerial API required — Firefox and Safari not supported)
- CP210x or CH340 USB serial driver installed
- Data-capable USB cable (not a charge-only cable)

## Supported Controllers

| Controller | Chip | Versions |
|---|---|---|
| Solo2Go | ESP32 | 0.15.0 – 16.0.0 |
| Duo2Go Rev 1 | ESP8266 | 0.13 – 0.15.1 |
| Duo2Go Rev 2 | ESP32 | 0.14.4 – 16.0.0 |
| Tetra2Go | ESP32 | 0.15.0 – 16.0.0 |

## Add-on Modules

Some firmware variants support optional hardware modules. Select the module that matches your hardware before flashing.

| Module | Description | Controllers |
|---|---|---|
| OLED | Status display | Solo2Go, Tetra2Go |
| Ethernet | Wired network module | Solo2Go, Tetra2Go |
| Differential | 4 extra outputs via differential receiver | Solo2Go, Tetra2Go |
| DMX | Pixel-to-DMX adapter | Solo2Go, Duo2Go Rev 2 |

**Selection rules:**
- OLED and Differential are fully exclusive — cannot be combined with anything
- Ethernet and DMX can be selected together (Solo2Go only)
- On controllers without DMX, Ethernet is also exclusive

## Repo Structure

```
index.html                          # Main flasher page
.nojekyll                           # Disables Jekyll so GitHub Pages serves index.html
bins/
  esp32-common/
    bootloader.bin                  # Shared ESP32 bootloader (all ESP32 controllers)
    partitions.bin                  # Shared partition table
    boot_app0.bin                   # Shared OTA selector
  solo2go/
    manifest_<ver>_<addon>.json
    WLED_<ver>_Solo2Go*.bin
  duo2go_v1/
    manifest_<ver>_<label>.json
    WLED_<ver>_Duo*.bin
  duo2go_v2/
    manifest_<ver>_<addon>.json
    WLED_<ver>_Duo2Go-v2*.bin
  tetra2go/
    manifest_<ver>_<addon>.json
    WLED_<ver>_Tetra2Go*.bin
```

## ESP32 vs ESP8266 Flashing

**ESP32 controllers** (Solo2Go, Duo2Go Rev 2, Tetra2Go) require four files flashed at specific offsets. The manifests handle this automatically using the shared files in `bins/esp32-common/`.

**ESP8266 controllers** (Duo2Go Rev 1) use a single binary flashed at offset 0.

## Adding New Firmware

1. Upload the `.bin` file to the appropriate `bins/<controller>/` folder
2. Copy an existing manifest JSON, update the `name`, `version`, and firmware `path`
3. Add the version option to the controller's entry in `index.html`

## Driver Downloads

- **CP210x (Silicon Labs):** https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers
- **CH340/CH341 (WCH):** https://www.wemos.cc/en/latest/ch340_driver.html

Both drivers can be installed simultaneously — Windows will auto-select the correct one.
