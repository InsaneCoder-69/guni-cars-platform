# Contributing to GUNI CARS Platform

Thank you for your interest in contributing to the **Ganpat University (GUNI) Centre for Advanced Research Studies (CARS) Platform**!

## Development Guidelines

### 1. Prerequisites
- **Node.js**: v18.x or v20.x
- **npm**: v9.x or later
- **Google Chrome / Chromium**: Installed locally for headless PDF rendering.

### 2. Local Setup
```bash
# Clone the repository
git clone https://github.com/InsaneCoder-69/guni-cars-platform.git
cd guni-cars-platform

# Copy environment template
cp .env.example .env

# Install project dependencies
npm install

# Start Express Backend (Port 5000)
npm run server

# Start Vite Frontend (Port 3000 / 3001) in a separate terminal
npm run dev
```

### 3. Code Standards
- **Frontend**: Functional React components with hooks. Styling powered by Tailwind CSS adhering to Ganpat University's official brand guidelines:
  - University Crimson: `#990000`
  - Deep Navy: `#0F2C59`
  - Accreditation Gold: `#D4AF37`
- **Backend**: ES Modules in Node.js with clear error handling, input validation, and atomic JSON datastore persistence.
- **Reporting Engine**: Exact A4 dimensions with CSS `@page { size: A4; margin: 0; }` and zero layout shifts.

### 4. Pull Requests & Commit Conventions
- Commit messages should be structured with conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`).
- Verify that `npm run build` runs cleanly without errors before submitting PRs.
- For new statutory metrics (e.g. NAAC, NIRF, ANRF), update the corresponding calculation logic in both `server/reportGenerator.js` and `src/views/CarsExecutiveDashboardView.jsx`.
