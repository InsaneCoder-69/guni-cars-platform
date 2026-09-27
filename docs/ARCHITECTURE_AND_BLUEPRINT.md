# GUNI CARS: Centralized Research & Consultancy Revenue Monitoring, Awareness & Ranking Platform
*Comprehensive Architectural Blueprint & Requirement Specification for Ganpat University (GUNI)*

---

## 1. Executive Summary & Context

Under the leadership of **Dr. Ajay Kumar Gupta** (Director – CARS) and **Dr. Heena Patel** (Deputy Director – CARS), the **Centre for Advanced Research Studies (CARS)** at **Ganpat University (GUNI)** has prepared a strategic proposal: *"Consultancy Revenue Enhancement Strategy and Institute-wise Action Plan (2026–2030)"*.

This initiative aims to elevate Ganpat University to a nationally recognized research powerhouse, driving:
* **₹4.25 Crore / year** initial consultancy revenue target across all constituent institutes, scaling to **> ₹5.00 Crore / year** by 2030.
* **150+ industry-sponsored research projects**.
* **100+ filed and granted patents** with commercial licensing.
* **Alignment with national missions**: NEP 2020, ANRF (Anusandhan National Research Foundation), Make in India, Atmanirbhar Bharat, and Viksit Bharat 2047.

To achieve this, the university requires a **Centralized Web Platform** that eliminates data silos, provides public awareness, tracks revenue in real-time, and automates institutional filings for **NIRF, NAAC, QS, THE, and ARIIA**.

---

## 2. Core Problem vs. Proposed Solution

```
┌───────────────────────────────────────────────┐
│              THE CURRENT PROBLEM              │
├───────────────────────────────────────────────┤
│ • Decentralized & Isolated Data: Projects,    │
│   grants, and consultancies remain buried in  │
│   faculty email chains, lab notebooks, or     │
│   spreadsheets across 12+ separate institutes.│
│                                               │
│ • Ranking & Filing Data Loss: During NIRF /   │
│   NAAC / QS audits, collecting sanction       │
│   letters, utilization certificates (UC), and │
│   actual received figures takes months,       │
│   causing missing data and lower rankings.    │
│                                               │
│ • Zero Awareness: Students, junior scholars,  │
│   and even faculty don't know what research   │
│   or high-end equipment (3D metal printers,   │
│   5G IIoT labs) exists within their campus.   │
│                                               │
│ • No Target Accountability: Institutes lack   │
│   real-time visibility against annual         │
│   revenue targets (e.g. FOET ₹1.3 Cr).        │
└───────────────────────────────────────┬───────┘
                                        │
                                        ▼
┌───────────────────────────────────────────────┐
│        THE PROPOSED CENTRALIZED SOLUTION       │
├───────────────────────────────────────────────┤
│ 1. Public Awareness & Showcase Portal:        │
│    Discoverable directory of all projects,    │
│    patents, student innovations, and CoEs.    │
│                                               │
│ 2. Unified Data Ingestion for Researchers &   │
│    Students: Simple guided forms to log       │
│    grants, consultancies, funding, and TRL.   │
│                                               │
│ 3. Automated Ranking & Accreditation Engine:  │
│    One-click export tailored for NIRF RPC,    │
│    NAAC Criterion 3, QS, THE, and ARIIA.      │
│                                               │
│ 4. Executive CARS Monitoring Dashboard:       │
│    Live progress tracking toward institute    │
│    revenue quotas and commercialization KPIs. │
└───────────────────────────────────────────────┘
```

---

## 3. Data Dictionary: Exact Parameters Required by CARS

The platform must capture, validate, and store data under three core categories specified in Section 5 of the CARS proposal document:

### A. Project & Personnel Details
| Field Name | Type | Description / Options |
| :--- | :--- | :--- |
| `project_title` | String | Full title of the research or consultancy initiative |
| `project_category` | Dropdown | Sponsored Research, Contract R&D, Industry-funded R&D, Prototype Development, Product Validation, Technology Transfer, Patent Licensing, International Collaborative Research, Student Innovation Grant |
| `funding_agency_name` | String | Name of the funding organization or industry partner |
| `funding_source_type` | Dropdown | **Government** (ANRF, DST, DBT, ICAR, ICMR, BIRAC, DRDO, ISRO, MSME, AICTE, CSIR, SERB, Gujarat Council on Science and Tech) <br> **Industry Partner** (Corporate R&D, MSME, Private Firm) <br> **International** <br> **Internal / Seed Grant** |
| `principal_investigator` | User Ref | Faculty PI (Name, Employee ID, Institute, Department, Email, Phone) |
| `co_investigators` | User Ref [] | Co-PIs (Faculty members across any institute) |
| `student_researchers` | User Ref [] | Enrolled Students & Ph.D. Scholars (Enrollment No., Institute, Degree, Role) |
| `lead_institute` | Dropdown | Constituent Institute / Faculty (FOET, FODE, SKPCER, MUIS, DCS/AMPICS, etc.) |
| `collaborating_department` | String | Interdisciplinary / Collaborating department |
| `start_date` / `end_date` | Date | Project duration and timeline |
| `trl_level` | Dropdown | **Technology Readiness Level (TRL 1 to TRL 9)**: <br>• TRL 1–3: Basic research / Proof of Concept <br>• TRL 4–6: Lab & Prototype validation <br>• TRL 7–9: System demonstration / Ready for Commercialization |
| `status` | Dropdown | Proposed / Sanctioned / Ongoing / Completed / Terminated |

### B. Financial Details & Revenue Tracking
| Field Name | Type | Description / Options |
| :--- | :--- | :--- |
| `total_project_cost` | Currency (₹) | Total approved sanction amount |
| `sanction_letter_doc` | File / PDF | Verifiable sanction letter (critical for NIRF/NAAC audit) |
| `sponsored_research_funding` | Currency (₹) | Direct sponsored grant component |
| `industry_cash_contribution` | Currency (₹) | Real cash contribution received from industry partner |
| `industry_inkind_value` | Currency (₹) | Software licenses, raw materials, or equipment provided |
| `consultancy_revenue_received` | Currency (₹) | Cumulative cash received in university bank accounts to date |
| `revenue_received_installments` | Sub-table | Date, Amount (₹), Cheque/NEFT Ref, Tranche No., Utilization Certificate (UC) uploaded |
| `technology_licensing_revenue` | Currency (₹) | Revenue earned from licensing IP/know-how |
| `patent_commercialization_revenue` | Currency (₹) | Royalties or milestone payments received |
| `faculty_incentive_share` | Currency (₹) | Realized revenue share for investigators per university policy |

### C. Research Outputs & Intellectual Property (IP)
| Field Name | Type | Description / Options |
| :--- | :--- | :--- |
| `patents_filed` / `granted` | Sub-table | Application No., Filing Date, Grant Date, Patent Title, Inventors, Status |
| `prototypes_developed` | Sub-table | Name, Description, Photos/CAD link, TRL reached, Demonstration status |
| `technologies_developed` | Text | Description of new processes, algorithms, materials, or software |
| `products_commercialized` | Sub-table | Commercial Product Name, Market partner, Revenue generated |
| `research_publications` | Sub-table | Paper Title, Journal Name, Scopus/WoS ID, DOI, Impact Factor, Student co-authors |
| `startups_incubated` | Sub-table | Startup Name, CIN / Registration, Founders, Incubation Centre (e.g. GUNI Incubation) |
| `mous_signed` | Sub-table | Partner Name, Scope of Work, Signing Date, Validity Period |

---

## 4. Institute-wise Mapping & Revenue Target Benchmarks

The platform must maintain institute-level profiles and track progress against the **₹4.25 Crore Annual Target** outlined in Dr. Patel's proposal:

```
┌─────────────────────────────────────────────────────────────┬────────────────┐
│ Constituent Institute / Faculty                             │ Annual Target  │
├─────────────────────────────────────────────────────────────┼────────────────┤
│ Faculty of Engineering & Technology (FOET / UVPCE / ICT)    │ ₹1.30 Crore    │
│ Centres of Excellence (Additive Mfg, 5G, Bosch Rexroth)     │ ₹1.00 Crore    │
│ Faculty of Diploma Engineering (FODE)                       │ ₹0.30 Crore    │
│ Faculty of Science (MUIS)                                   │ ₹0.30 Crore    │
│ Faculty of Agriculture Allied Sciences & Technology         │ ₹0.25 Crore    │
│ Faculty of Computer Applications (DCS / AMPICS)             │ ₹0.20 Crore    │
│ Faculty of Pharmacy (IOPH / SKPCER)                         │ ₹0.20 Crore    │
│ Faculty of Architecture, Design & Planning                  │ ₹0.20 Crore    │
│ Faculty of Health & Allied Sciences (Physiotherapy, etc.)   │ ₹0.15 Crore    │
│ Nursing                                                     │ ₹0.15 Crore    │
│ Faculty of Management Studies (VMPIM / CMSR / VMPCIMS)      │ ₹0.10 Crore    │
│ Social Science & Humanities                                 │ ₹0.10 Crore    │
├─────────────────────────────────────────────────────────────┼────────────────┤
│ TOTAL GANPAT UNIVERSITY ANNUAL TARGET                       │ ₹4.25 Crore    │
└─────────────────────────────────────────────────────────────┴────────────────┘
```

---

## 5. Direct Impact on University Rankings & Accreditation

A major selling point for Ganpat University leadership is that this platform transforms **tedious annual compliance** into an **automated continuous export**:

```
                       ┌─────────────────────────┐
                       │ Centralized CARS Portal │
                       └────────────┬────────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         │                          │                          │
         ▼                          ▼                          ▼
 ┌───────────────┐          ┌───────────────┐          ┌───────────────┐
 │   NIRF RPC    │          │ NAAC Crit. 3  │          │ QS / THE /    │
 │ (FSR & FCP)   │          │ (3.1 to 3.5)  │          │    ARIIA      │
 └───────────────┘          └───────────────┘          └───────────────┘
```

1. **NIRF (National Institutional Ranking Framework)**:
   * **Parameter RPC (Research and Professional Practice)**:
     * *FSR (Funded Sponsored Research)*: Requires project details, funding agency, and sanctioned amount.
     * *FCP (Funded Consultancy Projects)*: Requires audited received consultancy revenue from clients.
   * *Impact*: Automates the generation of verified NIRF Data Capture System (DCS) tables with downloadable proof documents.
2. **NAAC (National Assessment and Accreditation Council)**:
   * **Criterion 3 (Research, Innovations and Extension)**:
     * *Metric 3.2.1 / 3.2.2*: Extramural funding for research from government and non-governmental bodies.
     * *Metric 3.3.1*: Innovation ecosystem, incubation centres, technology transfer.
     * *Metric 3.4.3 / 3.4.4*: Patents published and granted.
     * *Metric 3.5.1 / 3.5.2*: Revenue generated from consultancy and corporate training.
   * *Impact*: Generates NAAC Data Templates (Excel format) formatted exactly as per NAAC SOP.
3. **QS World Rankings & Times Higher Education (THE)**:
   * Metric: **Industry Income / Knowledge Transfer** (Research income from industry per academic staff).
4. **ARIIA / Innovation Ranking**:
   * Evaluates TRL level progression, prototypes developed, startups registered, and IP commercialization revenue.

---

## 6. Key System Modules & Role-Based Access Control (RBAC)

### Module 1: Public Awareness & University Showcase (No Login Required)
* **Explore Innovations**: Public grid of approved projects, research abstracts, and student achievements.
* **Infrastructure & Equipment Directory**: Interactive catalogue of university research capabilities (e.g., Metal 3D printers, 5G IIoT Testbed, Bosch Rexroth Automation benches) to attract external corporate consultancy inquiries.
* **Industry Collaboration Gateway**: "Request Consultancy / Partner with Us" form directing inquiries to the appropriate Institute Consultancy Cell.
* **Live University Counter**: Real-time counter of Active Projects, Funded Amount, Patents Filed, and Industry Partners.

### Module 2: Student & Research Scholar Workspace
* **Register Projects & Grants**: Log student research projects, SSIP (Student Startup and Innovation Policy) grants, hackathon sponsorships, and incubation funding.
* **Join Faculty Projects**: View open research openings under PIs and apply as student researchers.
* **Showcase Portfolio**: Digital verifiable portfolio of prototypes, patents, and papers for job placements and higher studies.

### Module 3: Faculty / Principal Investigator (PI) Workspace
* **Project Intake Wizard**: Step-by-step submission with auto-suggestions for funding bodies (DST, ICAR, etc.).
* **Tranche & UC Manager**: Record incoming installments and upload Utilization Certificates.
* **Output Tracker**: Link publications (DOI lookup), patents, and prototype photos.
* **Incentive Calculator**: Estimate faculty revenue share based on university policy.

### Module 4: Institute Research Consultancy Cell Coordinator
* **Institute Review Queue**: Review and verify entries submitted by department faculty and students.
* **Institute Goal Tracker**: Real-time dashboard showing current achievement vs. institute target (e.g. ₹0.30 Cr for MUIS).
* **Gap Analysis**: Highlights departments lagging behind their quarterly milestones.

### Module 5: CARS Executive & University Leadership (Dr. Ajay Gupta & Dr. Heena Patel)
* **Master University Dashboard**: Macro trends, institute leaderboards, funding agency breakdowns, and YoY growth.
* **One-Click Ranking Exporter**: Instant download of NIRF, NAAC, and ARIIA pre-populated spreadsheets with attached zip archives of sanction letters.
* **Target Management**: Adjust annual targets and track national research priority alignment.

---

## 7. Recommended Technology Stack

* **Frontend**: Next.js 14 / React with Tailwind CSS, Lucide Icons, and Recharts/Tremor for interactive analytics.
* **Backend**: Node.js (Next.js App Router / Express) or Python (FastAPI) for data validation, export formatting, and analytics.
* **Database**: PostgreSQL with Prisma ORM (relational structure is optimal for complex financial tranches, institute hierarchies, and foreign keys).
* **File Storage**: Secure cloud storage (S3 / GCP Cloud Storage) for sanction letters, patent certificates, and proof documents.
* **Export Engine**: ExcelJS / Python Pandas for automated generation of NAAC and NIRF formatted spreadsheet templates.

---

## 8. Proposed 4-Phase Roadmap for Student Team

1. **Sprint 1: Schema & Core Intake (Weeks 1–2)**:
   * Build database schema covering all fields from Section 5.
   * Implement authenticated multi-role login (Student, Faculty, Institute Coordinator, CARS Admin).
   * Develop project submission form with proof-upload capabilities.
2. **Sprint 2: Dashboards & Target Tracking (Weeks 3–4)**:
   * Build the CARS executive dashboard with institute-wise target progress bars (₹4.25 Cr breakdown).
   * Implement review and approval workflows for institute coordinators.
3. **Sprint 3: Ranking & Compliance Generator (Weeks 5–6)**:
   * Build the NIRF RPC and NAAC 3.2 / 3.5 export engine.
   * Add filters by Academic Year (e.g., 2025–26, 2026–27).
4. **Sprint 4: Public Awareness Portal & Infrastructure Directory (Weeks 7–8)**:
   * Build public-facing searchable showcase of university projects, patents, and CoE infrastructure.
   * Pilot test with Faculty of Engineering (FOET) and Centre of Excellence (Additive Mfg / 5G / Bosch).
