# Hello Resin (Sample Plugin & Template)

The official sample plugin and starter template for **Resin** desktop workspace.

This repository demonstrates how to build, typecheck, bundle, and run external plugins using [`resin-api`](https://www.npmjs.com/package/resin-api).

---

## Features Demonstrated

- **Ribbon Icons**: Adds a sparkle icon to Resin's left navigation ribbon with tooltip and click action.
- **Commands**: Registers a command into Resin's Command Palette (`Ctrl+P` / `Cmd+P`).
- **Settings Tab**: Adds a dedicated configuration tab in Resin's Settings menu with toggles and text inputs.
- **Data Persistence**: Loads and saves plugin settings to `.resin/plugins/hello-resin/data.json`.
- **CSS Ingestion**: Automatically injects scoped custom styles from `styles.css`.

---

## Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Resin Desktop](https://github.com/Xoppyc/resin) (v0.4.0 or higher)

### 2. Installation
Clone or copy this repository into your vault's plugin directory:

```bash
# Inside <Your Vault>/.resin/plugins/
git clone https://github.com/Xoppyc/resin-sample-plugin.git
cd resin-sample-plugin
npm install
```

---

## Development Workflow

### Watch Mode (Development)
Rebuilds `main.js` automatically on file changes:
```bash
npm run dev
```

### Production Build
Creates an optimized, minified bundle:
```bash
npm run build
```

---

## Project Structure

```text
hello-resin/
├── manifest.json       # Plugin metadata and minimum Resin version
├── package.json        # Dependencies (resin-api, esbuild, typescript)
├── tsconfig.json       # TypeScript configuration
├── esbuild.config.mjs  # Bundler configuration (bundles into CommonJS main.js)
├── styles.css          # Optional plugin stylesheets
├── src/
│   └── main.ts         # Plugin lifecycle logic (extends Plugin from resin-api)
└── main.js             # Generated output bundle loaded by Resin
```

---

## Testing in Resin

1. Open Resin and navigate to **Settings -> Core & Community Plugins**.
2. Enable **Hello Resin**.
3. Click the **Sparkle** icon on the ribbon or open the Command Palette and run **Show Greeting Toast**.

