# Vendored ESP Web Tools

This directory contains the `dist/web` assets from **ESP Web Tools 10.4.0** (package SHA-1 `594e2c7c06dced84bfc6dd1d0ee80e591867769f`), plus its Apache-2.0 `LICENSE`.

RGB2Go serves these files from GitHub Pages instead of loading `esp-web-tools@10` from unpkg at runtime. This pins the browser flasher implementation and avoids CDN/version-cache drift.

The bundled installer initializes `ESPLoader` with `baudrate: 115200`; the ESP ROM bootloader rate is also 115200. Consequently it does not execute a post-stub baud-rate transition. Keep this directory self-contained: the dynamically imported chunks use relative paths and must be deployed together.
