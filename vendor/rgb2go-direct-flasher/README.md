# RGB2Go direct flasher bundle

This browser bundle is built from `esptool-js` 0.6.0 and `improv-wifi-serial-sdk` 2.8.1. It replaces the ESP Web Tools installer wrapper for the RGB2Go GitHub Pages flasher.

The direct client initializes `ESPLoader` at **115200 baud**, retaining that speed after the RAM stub upload. After a successful flash and reset, it reopens the serial port at 115200 and launches an Improv Wi-Fi wizard. The wizard uses the Improv SDK's continuous scan subscription (matching its standard provisioning dialog), supports rescan and manual SSID entry, and stops scanning before provisioning. On successful provisioning, it presents the controller-provided URL and an **Open WLED in browser** link.

The bundle retains the upstream `esptool-js` LICENSE. All `.mjs` chunk files in this directory are required because the loader dynamically imports chip-specific ROM and stub modules.
