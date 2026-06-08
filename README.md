# RGB2Go WLED Flasher

Browser-based WLED firmware installer for RGB2Go controllers.

**Live site:** https://jasonsomers.github.io/wled-flasher/

## Requirements
- Chrome or Edge (WebSerial API required — Firefox and Safari not supported)
- CP210x or CH340 USB serial driver installed
- Data-capable USB cable (not a charge-only cable)

## Supported Controllers

### Solo2Go (ESP32)
| Version | Base | Ethernet | Differential | DMX | Ethernet+DMX | OLED |
|---|---|---|---|---|---|---|
| 0.15.0 | ✓ | ✓ | | ✓ | ✓ | |
| 0.15.1 | ✓ | ✓ | | ✓ | ✓ | |
| 0.15.3 | ✓ | ✓ | | ✓ | ✓ | ✓ |
| 0.15.4 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| 16.0.0 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

### Duo2Go - Rev 1 (ESP8266)
| Version | Base | 160MHz (Recommended) |
|---|---|---|
| 0.13 | ✓ | |
| 0.14.4 | ✓ | ✓ |
| 0.15.0 | | ✓ |
| 0.15.1 | | ✓ |

### Duo2Go - Rev 2 (ESP32)
| Version | Base | DMX |
|---|---|---|
| 0.14.4 | ✓ | |
| 0.15.0 | ✓ | |
| 0.15.1 | ✓ | |
| 0.15.3 | ✓ | ✓ |
| 0.15.4 | ✓ | ✓ |
| 16.0.0 | ✓ | ✓ |

### Tetra2Go (ESP32)
| Version | Base | Ethernet | Differential | OLED |
|---|---|---|---|---|
| 0.15.0 | ✓ | ✓ | ✓ | ✓ |
| 0.15.1 | ✓ | ✓ | ✓ | ✓ |
| 0.15.3 | ✓ | ✓ | ✓ | ✓ |
| 0.15.4 | ✓ | ✓ | ✓ | ✓ |
| 16.0.0 | ✓ | ✓ | ✓ | ✓ |

### Octa2Go (ESP32)
| Version | Base | Ethernet | OLED |
|---|---|---|---|
| 0.15.0 | ✓ | ✓ | ✓ |
| 0.15.1 | ✓ | ✓ | ✓ |
| 0.15.3 | ✓ | ✓ | ✓ |
| 0.15.4 | ✓ | ✓ | ✓ |
| 16.0.0 | ✓ | ✓ | ✓ |

### Matrix2Go (ESP32)
| Version | Base |
|---|---|
| 16.0.0 | ✓ |

## Add-on Modules

| Module | Description | Available On |
|---|---|---|
| OLED | Status display module | Solo2Go, Tetra2Go, Octa2Go |
| Ethernet | Wired LAN8720 network module | Solo2Go, Tetra2Go, Octa2Go |
| Differential | 4 extra outputs via differential receiver | Solo2Go, Tetra2Go |
| DMX | Pixel-to-DMX adapter | Solo2Go, Duo2Go Rev 2 |

**Selection rules:**
- OLED and Differential are fully exclusive — cannot be combined with anything else
- Ethernet and DMX can be selected together on Solo2Go only (produces Eth+DMX firmware)
- On controllers without DMX, Ethernet is also exclusive

## Known Issues

**Ethernet cold-boot (16.0.0):** On some controllers, powering on with an Ethernet cable connected may prevent a successful boot. This appears to be a regression introduced in WLED 0.16.0. A workaround delay has been added to the RGB2Go firmware builds. If you experience this issue, power on without the cable, wait 10 seconds, then connect the cable.

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
    WLED_<ver>_Solo2Go.bin
    WLED_<ver>_Solo2Go-Eth.bin
    WLED_<ver>_Solo2Go-Diff.bin
    WLED_<ver>_Solo2Go-DMX.bin
    WLED_<ver>_Solo2Go-Eth-DMX.bin
    WLED_<ver>_Solo2Go-OLED.bin
  duo2go_v1/
    manifest_<ver>_<label>.json
    WLED_<ver>_Duo2Go.bin
    WLED_<ver>_Duo2Go_160.bin
  duo2go_v2/
    manifest_<ver>_<addon>.json
    WLED_<ver>_Duo2Go_v2.bin        # Note: underscore before v2
    WLED_<ver>_Duo2Go-DMX.bin       # Note: hyphen for DMX variant
  tetra2go/
    manifest_<ver>_<addon>.json
    WLED_<ver>_Tetra2Go.bin
    WLED_<ver>_Tetra2Go-Eth.bin
    WLED_<ver>_Tetra2Go-Diff.bin
    WLED_<ver>_Tetra2Go-OLED.bin
  octa2go/
    manifest_<ver>_<addon>.json
    WLED_<ver>_Octa2Go.bin
    WLED_<ver>_Octa2Go-Eth.bin
    WLED_<ver>_Octa2Go-OLED.bin
  matrix2go/
    manifest_16.0.0_base.json
    WLED_16.0.0_Matrix2Go.bin
```

## ESP32 vs ESP8266 Flashing

**ESP32 controllers** (Solo2Go, Duo2Go Rev 2, Tetra2Go, Octa2Go, Matrix2Go) require four files flashed at specific offsets. The manifests handle this automatically using the shared files in `bins/esp32-common/`.

**ESP8266 controllers** (Duo2Go Rev 1) use a single binary flashed at offset 0.

## Adding New Firmware

1. Upload the `.bin` file to the appropriate `bins/<controller>/` folder
2. Copy an existing manifest JSON, update the `name`, `version`, and firmware `path`
3. Add the version option to the controller's entry in `index.html`
4. Update the revision date in the footer of `index.html`

## Driver Downloads

- **CP210x (Silicon Labs):** https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers
- **CH340/CH341 (WCH):** https://www.wemos.cc/en/latest/ch340_driver.html

Both drivers can be installed simultaneously — Windows will auto-select the correct one.

## Support

jason@rgb2go.com | https://rgb2go.com
