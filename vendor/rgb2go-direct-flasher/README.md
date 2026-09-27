# RGB2Go direct flasher bundle

This browser bundle is built from `esptool-js` 0.6.0 and `improv-wifi-serial-sdk` 2.8.1. It replaces the ESP Web Tools installer wrapper for the RGB2Go GitHub Pages flasher.

The direct client initializes `ESPLoader` at **115200 baud**, retaining that speed after the RAM stub upload. After a successful flash and reset, it reopens the serial port at 115200 and launches an Improv Wi-Fi wizard with manual SSID entry. During provisioning, controls disable and **Connect** becomes **Connecting…**. If the controller does not return the Improv success packet within 30 seconds, the client closes the pending serial session, reconnects at 115200, and reads Improv state again. A returned URL confirms connection and is offered as an **Open WLED in browser** link; otherwise the wizard reports a concrete failed confirmation rather than waiting indefinitely.

The bundle retains the upstream `esptool-js` LICENSE. All `.mjs` chunk files in this directory are required because the loader dynamically imports chip-specific ROM and stub modules.
