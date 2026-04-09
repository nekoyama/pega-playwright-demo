
# Pega Playwright Demo (Constellation UI)

## Overview

This repository demonstrates how to implement **end‑to‑end UI test automation for a Pega Constellation application** using **Playwright with TypeScript**.

The goal is to provide:
- Stable and maintainable UI automation for Pega
- A clear project structure using the **Page Object Model**
- CI‑ready tests with reports, screenshots, and traces
- Practical guidance for working with **Pega Constellation’s dynamic UI**

This project is intended both as a **working test suite** and as a **reference implementation** for teams automating Pega applications.

---

## Why Playwright for Pega?

Pega Constellation presents specific automation challenges:
- Dynamically generated DOMs
- Non‑deterministic IDs
- Asynchronous rendering between assignments and stages

Playwright is well suited because it:
- Handles async UI reliably
- Supports strong selector strategies (`data-testid`)
- Provides built‑in tracing and screenshots
- Runs efficiently in CI pipelines

---

## Prerequisites

- Node.js (Node 18+ or 20) https://nodejs.org
```bash
    node -v
    npm -v
```

- Pega Constellation Application Access such as:
```bash
    Pega Community Edition
    MediaCo+ / Blueprint-generated app
    Any Pega 8.8+ Constellation-based application
```

## Installation

```bash
git clone https://github.com/<your-username>/pega-playwright-demo.git
cd pega-playwright-demo
npm install
npx playwright install
(Optional, recommended for CI)
npx playwright install --with-deps
```
## 📘 Pega Application Setup Guide
For mandatory configuration steps in your Pega Constellation app (test IDs, auth, session reuse, best practices), see:  
➡️ [./PEGA_SETUP.md](/)

