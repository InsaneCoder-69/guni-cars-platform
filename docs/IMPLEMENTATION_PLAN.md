# Full-Stack Architecture: Express Backend, Dynamic Official PDF Generator & Authentic GUNI Institutional UI/UX

Implement a robust **Node.js/Express Backend** with real persistent data storage, dynamic server-side **Official PDF Report Generation** customized for **Dr. Heena Patel** and Ganpat University, and overhaul the frontend UI/UX to match **Ganpat University's official brand design language** (Crimson Red `#990000`, Deep Navy `#0F2C59`, NAAC 'A' Grade accreditation, and official institutional header).

---

## User Review Required

> [!IMPORTANT]
> **Backend Architecture & PDF Generation**:
> 1. **Express Server (`http://localhost:5000`)**: Houses full REST endpoints for projects, tranches, verification queues, inquiries, and statistics.
> 2. **Official PDF Generation Engine (`POST /api/reports/generate-pdf`)**:
>    - Runs headless Chrome on the server to render a multi-page, publication-quality executive audit document.
>    - Features **Ganpat University official letterhead**, NAAC 'A' Grade emblem, CARS crest, university motto (*"Social Upliftment through Education"*).
>    - Custom-tailored to **Dr. Heena Patel (Deputy Director - CARS)** and **Dr. Ajay Kumar Gupta (Director - CARS)**, with formal submission to the Pro Chancellor, Pro Vice Chancellors, and Executive Registrar.
>    - Embeds live real-time metrics, institute quota progress against the **₹4.25 Cr target**, and pre-formatted tables for **NIRF (RPC)** and **NAAC Criterion 3**.
>    - Streams the resulting PDF directly to the browser for instant download.

> [!NOTE]
> **Authentic Ganpat University UI/UX**:
> - Re-theming the platform with GUNI's official Crimson Red (`#990000`) and Navy Blue (`#0F2C59`) color palette.
> - Top institutional header displaying:
>   - GUNI Seal and CARS Monogram
>   - Motto: *"Social Upliftment through Education"*
>   - Accreditation Tag: *"Accredited with 'A' Grade by NAAC | Approved by UGC & AICTE"*
>   - Quick-access "Generate Executive Report" action for Dr. Heena Patel.

---

## Proposed Architecture & Changes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FULL-STACK ARCHITECTURE OVERVIEW                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [FRONTEND: React + Vite + Tailwind (Port 3000 / 3001)]                     │
│   • Authentic Ganpat University Header (Crimson/Navy/Gold & NAAC 'A' Badge) │
│   • Executive Action: "Generate Official CARS Report (PDF)"                 │
│   • Real-time API Client (calling Backend REST endpoints)                  │
│   • Persona Switcher & Live Quota Benchmarking                              │
│                                                                             │
│                                  ▲  HTTP / REST                             │
│                                  │  (JSON & Streamed PDF)                   │
│                                  ▼                                          │
│                                                                             │
│  [BACKEND: Express.js Node Server (Port 5000)]                              │
│   • REST Endpoints: /api/projects, /api/installments, /api/inquiries        │
│   • Data Repository: File-backed persistent storage (projects.json)         │
│   • PDF Report Engine: /api/reports/generate-pdf                            │
│     - Ingests live database records                                         │
│     - Formats official GUNI Letterhead & CARS Executive Audit Dossier       │
│     - Renders vector-perfect PDF via headless Chrome                        │
│     - Streams file directly to client with Content-Disposition attachment   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Proposed Changes

### 1. Backend Service Layer (`server/`)

#### [NEW] [server/server.js](../server/server.js)
* Express server setup with CORS, JSON body parser, and logging.
* Routes:
  * `GET /api/health`: Health check and system uptime.
  * `GET /api/projects`: Returns all projects with optional filtering (institute, category, status).
  * `POST /api/projects`: Validates and saves new research project.
  * `POST /api/projects/:id/installments`: Logs incoming financial tranche, updates realized revenue, and archives UC proof.
  * `PUT /api/projects/:id/approve`: Approves project in coordinator queue.
  * `GET /api/stats`: Calculates university-wide and institute-level quota achievements against ₹4.25 Cr.
  * `GET /api/inquiries` & `POST /api/inquiries`: Manages external industry consultancy requests.
  * `POST /api/reports/generate-pdf`: Server-side PDF generation engine for Dr. Heena Patel.

#### [NEW] [server/reportGenerator.js](../server/reportGenerator.js)
* Generates an official multi-page HTML template with:
  * GUNI Official Letterhead (Crimson Red `#990000`, Navy `#0F2C59`, Gold accents).
  * Formal addressing: *"Prepared by: Dr. Heena Patel (Deputy Director - CARS) & Dr. Ajay Kumar Gupta (Director - CARS)"*.
  * Submitted to: *"Pro Chancellor, Pro Vice Chancellors, Executive Registrar, Ganpat University"*.
  * Executive Summary with live realized numbers vs ₹4.25 Cr target.
  * Institute-wise Target Quota Table (all 12 institutes).
  * Full Verified Project Register with Sanction Order IDs, PIs, Students, and Cash Receipts.
  * NIRF (RPC - FSR & FCP) and NAAC (Criterion 3.2, 3.4, 3.5) compliance tables.
  * Formal Institutional Certification & Signature Block.
* Spawns headless Google Chrome (`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`) to print to PDF.
* Returns streamable PDF buffer.

#### [NEW] [server/dataStore.js](../server/dataStore.js)
* Persistent JSON data storage handling concurrent read/writes.
* Initialized with authentic Ganpat University seed data.

---

### 2. Frontend Overhaul (`src/`)

#### [MODIFY] [tailwind.config.js](../tailwind.config.js)
* Integrate Ganpat University's official brand colors:
  * `guni-red`: `#990000` (Official University Crimson)
  * `guni-navy`: `#0F2C59` (Deep Academic Navy)
  * `guni-gold`: `#D4AF37` / `#F59E0B` (Accreditation Gold)
  * `guni-slate`: `#F8FAFC` to `#1E293B`

#### [MODIFY] [src/components/Navbar.jsx](../src/components/Navbar.jsx)
* Upgrade header to match Ganpat University official portal:
  * Top bar: NAAC "A" Grade accreditation badge, UGC & AICTE approval, NIRF participation notice.
  * Official GUNI university crest and CARS monogram.
  * University motto: *"Social Upliftment through Education"*.
  * Prominent button: **"Generate Official Report (PDF)"** for Dr. Heena Patel.

#### [NEW] [src/components/GenerateReportModal.jsx](../src/components/GenerateReportModal.jsx)
* Professional report customization modal:
  * Target Executive: Dr. Heena Patel (pre-filled, customizable)
  * Scope: All Institutes (₹4.25 Cr Target) or Specific Institute
  * Sections to include: Executive Summary, Institute Quotas, NIRF RPC Tables, NAAC Criterion 3
  * Live status indicator: "Compiling real-time data & generating signed PDF from GUNI CARS server..."
  * Direct file download trigger.

#### [MODIFY] [src/context/PlatformContext.jsx](../src/context/PlatformContext.jsx)
* Connect to Express backend API (`http://localhost:5000/api`) with fallback to local state for resilience.
* Add `generateOfficialPdfReport(options)` function that calls the backend endpoint and downloads the file.

#### [MODIFY] [src/views/CarsExecutiveDashboardView.jsx](../src/views/CarsExecutiveDashboardView.jsx)
* Embed direct "Generate Official GUNI Executive Report" primary button with live generation feedback.
* Polish UI with official GUNI Crimson/Navy styling.

---

## Verification Plan

### Automated Tests
1. **Backend Server Test**:
   - Start Express backend on port 5000.
   - Run curl checks on `/api/health`, `/api/projects`, `/api/stats`.
2. **Dynamic PDF Generation Test**:
   - Send `POST /api/reports/generate-pdf` with payload `{ executiveName: 'Dr. Heena Patel', targetYear: '2025-26' }`.
   - Verify that HTTP response is `200 OK`, `Content-Type: application/pdf`, and the returned file is a valid multi-page PDF.
   - Inspect PDF page count and layout using macOS Swift PDFKit / thumbnail preview.

### Manual / End-to-End Verification
1. **Full-Stack Execution**:
   - Run backend on port 5000 and frontend on port 3000.
   - Open browser, verify official Ganpat University header with Crimson Red & Navy palette, NAAC 'A' Grade badge, and motto.
2. **Report Generation Flow**:
   - In Executive Dashboard, click **"Generate Official Report (PDF)"**.
   - Customize report title/options and click "Download Official PDF".
   - Verify that the browser downloads `GUNI_CARS_Official_Report_Dr_Heena_Patel.pdf` generated by the backend.
   - Open the PDF and verify it has Dr. Heena Patel's name, Ganpat University letterhead, live numbers, and NIRF/NAAC tables.
3. **Data Mutation & PDF Update**:
   - Add a new project or installment in Faculty Workspace.
   - Re-generate the PDF report; verify that the newly added funds and project immediately reflect in the fresh PDF report!
