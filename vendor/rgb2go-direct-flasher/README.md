# RGB2Go direct flasher bundle

This browser bundle is built from `esptool-js` 0.6.0 and `improv-wifi-serial-sdk` 2.8.1. It replaces the ESP Web Tools installer wrapper for the RGB2Go GitHub Pages flasher.

The direct client initializes `ESPLoader` at **115200 baud**, retaining that speed after the RAM stub upload. After a successful flash and reset, it hands ownership of the serial port to the Improv Wi-Fi wizard. The outer flash cleanup must not close the port again while Improv is reading or provisioning. The manual-SSID wizard uses the SDK's full 45-second provision timeout; it does not interrupt that RPC with a competing reconnect command. During provisioning, all controls are disabled and **Connect** changes to **Connecting…**.

The bundle retains the upstream `esptool-js` LICENSE. All `.mjs` chunk files in this directory are required because the loader dynamically imports chip-specific ROM and stub modules.
