# RGB2Go direct flasher bundle

This browser bundle is built from `esptool-js` 0.6.0 and `improv-wifi-serial-sdk` 2.8.1. It replaces the ESP Web Tools installer wrapper for the RGB2Go GitHub Pages flasher.

The direct client initializes `ESPLoader` at **115200 baud**, retaining that speed after the RAM stub upload. **Clean install** is checked by default: after the user confirms, the flasher calls `eraseFlash()` before it writes bootloader, partition, and application images. This removes saved WLED configuration and Wi‑Fi, preventing a prior controller’s identity or network settings from surviving a controller-image change. The checkbox can be cleared only when an intentional in-place update needs preserved settings.

After a successful flash and reset, the client hands serial-port ownership to the Improv Wi-Fi wizard. The outer flash cleanup does not close the port while Improv is reading or provisioning. The manual-SSID wizard uses the SDK's full 45-second provision timeout; during provisioning, all controls are disabled and **Connect** changes to **Connecting…**.

The bundle retains the upstream `esptool-js` LICENSE. All `.mjs` chunk files in this directory are required because the loader dynamically imports chip-specific ROM and stub modules.
