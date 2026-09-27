# RGB2Go direct flasher bundle

This is a browser bundle built from `esptool-js` 0.6.0. It replaces the ESP Web Tools installer wrapper for the RGB2Go GitHub Pages flasher.

The direct client deliberately initializes `ESPLoader` at **115200 baud**. The ESP ROM connection and the post-stub transport stay at that rate, avoiding the high-baud CP210x failure seen in affected controller batches.

The bundle retains the upstream `esptool-js` LICENSE. All `.mjs` chunk files in this directory are required because the loader dynamically imports chip-specific ROM and stub modules.
