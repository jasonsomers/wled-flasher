# RGB2Go WLED Flasher

Browser-based WLED firmware installer for RGB2Go controllers.

**Live site:** https://jasonsomers.github.io/wled-flasher/

## Supported Controllers
- Solo2Go (v0.15.0 – v16.0.0)
- More coming: Matrix2Go, Duo2Go, Tetra2Go, Octa2Go

## Requirements
- Chrome or Edge (WebSerial API required)
- CP210x or CH340 USB driver installed
- Data-capable USB cable

## Repo Structure
```
index.html                         # Main flasher page
bins/
  solo2go/
    bootloader.bin                 # ESP32 bootloader (upload once)
    partitions.bin                 # Partition table
    boot_app0.bin                  # OTA selector
    manifest_<ver>_<addon>.json    # One manifest per firmware variant
    WLED_<ver>_Solo2Go*.bin        # Firmware binaries (upload from Drive)
```

## Adding New Firmware
1. Upload the `.bin` file to the appropriate `bins/<controller>/` folder
2. Add a manifest JSON (copy an existing one, update `name`, `version`, and `path`)
3. Add the version option to `index.html`

## Bootloader Files
The `bootloader.bin`, `partitions.bin`, and `boot_app0.bin` files are the same
for all standard ESP32 4MB builds. Extract them from any PlatformIO build under
`.pio/build/<target>/` or download from the WLED releases.
