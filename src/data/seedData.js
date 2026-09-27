// Authentic GUNI Seed Data based on CARS Strategy Document

export const INSTITUTES = [
  { id: 'FOET', name: 'Faculty of Engineering & Technology (UVPCE / ICT)', shortName: 'FOET / UVPCE', targetCr: 1.30, targetAmt: 13000000, color: 'bg-blue-600' },
  { id: 'COE', name: 'Centres of Excellence (Additive Mfg, 5G, Bosch Rexroth)', shortName: 'Centres of Excellence', targetCr: 1.00, targetAmt: 10000000, color: 'bg-indigo-600' },
  { id: 'MUIS', name: 'Faculty of Science (Mehsana Urban Institute of Sciences)', shortName: 'Science (MUIS)', targetCr: 0.30, targetAmt: 3000000, color: 'bg-emerald-600' },
  { id: 'FODE', name: 'Faculty of Diploma Engineering (BSPP)', shortName: 'Diploma Engg', targetCr: 0.30, targetAmt: 3000000, color: 'bg-cyan-600' },
  { id: 'AGRI', name: 'Faculty of Agriculture Allied Sciences & Technology', shortName: 'Agriculture', targetCr: 0.25, targetAmt: 2500000, color: 'bg-lime-600' },
  { id: 'DCS', name: 'Faculty of Computer Applications (DCS / AMPICS)', shortName: 'Computer Apps', targetCr: 0.20, targetAmt: 2000000, color: 'bg-purple-600' },
  { id: 'SKPCER', name: 'Faculty of Pharmacy (SKPCER / IOPH)', shortName: 'Pharmacy', targetCr: 0.20, targetAmt: 2000000, color: 'bg-rose-600' },
  { id: 'ARCH', name: 'Faculty of Architecture, Design & Planning', shortName: 'Architecture', targetCr: 0.20, targetAmt: 2000000, color: 'bg-amber-600' },
  { id: 'HEALTH', name: 'Faculty of Health & Allied Sciences (Physiotherapy)', shortName: 'Health Sciences', targetCr: 0.15, targetAmt: 1500000, color: 'bg-teal-600' },
  { id: 'NURSING', name: 'Nursing College', shortName: 'Nursing', targetCr: 0.15, targetAmt: 1500000, color: 'bg-pink-600' },
  { id: 'FMS', name: 'Faculty of Management Studies (VMPIM / CMSR)', shortName: 'Management', targetCr: 0.10, targetAmt: 1000000, color: 'bg-orange-600' },
  { id: 'SSH', name: 'Social Science & Humanities', shortName: 'Social Sciences', targetCr: 0.10, targetAmt: 1000000, color: 'bg-slate-600' },
];

export const TOTAL_ANNUAL_TARGET_CR = 4.25;
export const TOTAL_ANNUAL_TARGET_AMT = 42500000;

export const COE_FACILITIES = [
  {
    id: 'coe-additive',
    name: 'Centre of Excellence in Additive Manufacturing',
    partner: 'Industry 4.0 Consortia / DST',
    lead: 'Dr. Ketan Patel (FOET)',
    strengths: [
      'Advanced Metal 3D Printers (DMLS / SLM)',
      'High-resolution Polymer & Resin Printers',
      '5-Axis High-Precision CNC Machining Center',
      'Laser Optical 3D Reverse Engineering Scanners'
    ],
    consultancyAreas: 'Aerospace & Defence prototypes, Medical implant design, Tooling & Die fabrication, Rapid prototyping for MSMEs',
    consultancyRate: '₹3,500/hr machine time or project contract',
    status: 'Available for Industry Consultancy & Student Projects'
  },
  {
    id: 'coe-5g-iiot',
    name: 'Centre of Excellence in 5G & Industrial IoT',
    partner: 'Telecom & Electronics Enterprise Partner',
    lead: 'Dr. Nirav Joshi (FOET)',
    strengths: [
      'Dedicated 5G Sub-6 GHz Private Testbed',
      'Industrial IoT Edge Gateways & Sensor Test Rig',
      'Digital Twin Simulation Platform (Siemens / PTC)',
      'AR/VR Industry 4.0 Training & Immersion Suites'
    ],
    consultancyAreas: 'Private 5G factory deployment, Smart metering protocols, IIoT predictive maintenance sensors, Edge AI optimization',
    consultancyRate: '₹2,50,000 per proof-of-concept / evaluation',
    status: 'Available for Industry Consultancy & Student Projects'
  },
  {
    id: 'coe-bosch-rexroth',
    name: 'Bosch Rexroth Centre of Excellence in Automation',
    partner: 'Bosch Rexroth India Ltd.',
    lead: 'Prof. R. M. Shah (FOET)',
    strengths: [
      'Advanced Industrial Hydraulic & Pneumatic Workstations',
      'Modular PLC, SCADA & Mechatronics Test Benches',
      'Collaborative Robots (Cobots) for Assembly Lines',
      'Variable Frequency Drives & Motion Controllers'
    ],
    consultancyAreas: 'Automated conveyor retrofitting, Plant hydraulics performance audit, Cobot integration studies for auto-ancillaries',
    consultancyRate: '₹1,80,000 per industrial audit / turnkey automation',
    status: 'Available for Industry Consultancy & Student Projects'
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 'GUNI-CARS-2025-001',
    title: '5G-Enabled Industrial IoT Sensor Network for Predictive Maintenance in Textile Machinery',
    category: 'Sponsored Research',
    fundingAgency: 'Department of Science and Technology (DST) / MeitY',
    fundingSourceType: 'Government',
    principalInvestigator: {
      name: 'Dr. Nirav Joshi',
      empId: 'GUNI-EMP-1042',
      institute: 'FOET',
      department: 'Electronics & Communication Engg',
      email: 'nirav.joshi@ganpatuniversity.ac.in'
    },
    coInvestigators: [
      { name: 'Dr. Ketan Patel', institute: 'FOET' },
      { name: 'Prof. Anjali Dave', institute: 'DCS' }
    ],
    studentResearchers: [
      { name: 'Vatsal Trivedi', enrollment: '19012011045', role: 'Edge AI Firmware Developer', degree: 'B.Tech CSE' },
      { name: 'Rohan Mehta', enrollment: '20012011089', role: 'Hardware & Sensor Testing', degree: 'B.Tech ECE' }
    ],
    instituteId: 'FOET',
    department: 'Electronics & Communication / CoE 5G',
    startDate: '2024-04-01',
    endDate: '2026-03-31',
    trl: 7, // TRL 7 - Prototype demonstration in operational environment
    status: 'Approved',
    sanctionedAmount: 4800000,
    realizedAmount: 3200000,
    industryCashContribution: 800000,
    industryInKindValue: 500000,
    technologyLicensingRevenue: 0,
    patentRevenue: 0,
    facultyIncentiveShare: 320000,
    installments: [
      { trancheNo: 1, date: '2024-04-15', amount: 2000000, ref: 'NEFT-DST-991204', ucSubmitted: true },
      { trancheNo: 2, date: '2025-01-10', amount: 1200000, ref: 'NEFT-DST-104928', ucSubmitted: true }
    ],
    patents: [
      { appNo: '202421049281', title: 'Ultra-low Latency Mesh Sensor for Vibration Diagnostics', status: 'Published', date: '2024-11-20' }
    ],
    prototypes: [
      { name: 'GUNI-VibeNode v2.1', description: 'Self-powered wireless piezo sensor with on-chip edge inference', trl: 7 }
    ],
    publications: [
      { title: 'Sub-millisecond Anomaly Detection in Rotating Machinery using 5G NR ULL', journal: 'IEEE Sensors Journal', doi: '10.1109/JSEN.2024.339102' }
    ],
    startups: [],
    mous: [
      { partner: 'Arvind Mills Technical Textiles Div', scope: 'On-site pilot testbed deployment', signedDate: '2024-05-12' }
    ],
    sanctionLetter: 'Sanction_Letter_DST_5G_IIoT.pdf',
    auditNotes: 'Verified by CARS Central Audit; UC-1 and UC-2 approved.'
  },
  {
    id: 'GUNI-CARS-2025-002',
    title: 'Turnkey Additive Manufacturing of Titanium Aerospace Bracket Assemblies & Topology Optimization',
    category: 'Contract R&D',
    fundingAgency: 'AeroStructures Dynamics Pvt Ltd / DRDO Subcontractor',
    fundingSourceType: 'Industry Partner',
    principalInvestigator: {
      name: 'Dr. Ketan Patel',
      empId: 'GUNI-EMP-0831',
      institute: 'COE',
      department: 'Centre of Excellence in Additive Manufacturing',
      email: 'ketan.patel@ganpatuniversity.ac.in'
    },
    coInvestigators: [
      { name: 'Dr. H. R. Prajapati', institute: 'FOET' }
    ],
    studentResearchers: [
      { name: 'Deepak Sharma', enrollment: '21012022014', role: 'FEA Simulation & Slicing', degree: 'M.Tech CAD/CAM' }
    ],
    instituteId: 'COE',
    department: 'Additive Manufacturing CoE',
    startDate: '2024-08-01',
    endDate: '2025-07-31',
    trl: 8,
    status: 'Approved',
    sanctionedAmount: 4200000,
    realizedAmount: 3800000,
    industryCashContribution: 4200000,
    industryInKindValue: 1200000,
    technologyLicensingRevenue: 300000,
    patentRevenue: 0,
    facultyIncentiveShare: 760000,
    installments: [
      { trancheNo: 1, date: '2024-08-15', amount: 2000000, ref: 'CHQ-AXIS-883921', ucSubmitted: true },
      { trancheNo: 2, date: '2024-12-05', amount: 1800000, ref: 'NEFT-AERO-449102', ucSubmitted: true }
    ],
    patents: [
      { appNo: '202421098432', title: 'Lattice Density Grading for Ti6Al4V Aerospace Brackets', status: 'Filed', date: '2024-10-18' }
    ],
    prototypes: [
      { name: 'AeroBracket Gen-3 Ti', description: '42% weight-reduced satellite payload structural hinge', trl: 8 }
    ],
    publications: [],
    startups: [],
    mous: [
      { partner: 'AeroStructures Dynamics', scope: 'Commercial supply of flight-grade brackets', signedDate: '2024-07-15' }
    ],
    sanctionLetter: 'Contract_AeroStructures_GUNI_AM.pdf',
    auditNotes: 'Direct corporate consultancy; funds realized in GUNI CARS bank account.'
  },
  {
    id: 'GUNI-CARS-2025-003',
    title: 'Liposomal Nanocarrier Delivery System for Targeted Chemotherapeutic Phytopharmaceuticals',
    category: 'Sponsored Research',
    fundingAgency: 'Indian Council of Medical Research (ICMR) & Cadila Pharma Joint Grant',
    fundingSourceType: 'Government',
    principalInvestigator: {
      name: 'Dr. Heena Patel',
      empId: 'GUNI-EMP-0512',
      institute: 'SKPCER',
      department: 'Pharmaceutics & Novel Drug Delivery',
      email: 'heena.patel@ganpatuniversity.ac.in'
    },
    coInvestigators: [
      { name: 'Dr. R. S. Bhadoria', institute: 'MUIS' }
    ],
    studentResearchers: [
      { name: 'Pooja Varma', enrollment: '22019011002', role: 'Ph.D. Scholar - Cell Culture', degree: 'Ph.D. Pharmacy' },
      { name: 'Kishan Patel', enrollment: '21019011019', role: 'Formulation Chemist', degree: 'M.Pharm' }
    ],
    instituteId: 'SKPCER',
    department: 'Faculty of Pharmacy',
    startDate: '2023-11-01',
    endDate: '2025-10-31',
    trl: 6,
    status: 'Approved',
    sanctionedAmount: 2800000,
    realizedAmount: 1900000,
    industryCashContribution: 500000,
    industryInKindValue: 300000,
    technologyLicensingRevenue: 0,
    patentRevenue: 0,
    facultyIncentiveShare: 190000,
    installments: [
      { trancheNo: 1, date: '2023-11-20', amount: 1000000, ref: 'RTGS-ICMR-102911', ucSubmitted: true },
      { trancheNo: 2, date: '2024-09-14', amount: 900000, ref: 'RTGS-ICMR-339101', ucSubmitted: true }
    ],
    patents: [
      { appNo: '202321034901', title: 'PEGylated Phytochemical Liposomal Formulation for Colorectal Carcinoma', status: 'Granted', date: '2024-06-12' }
    ],
    prototypes: [
      { name: 'LipoPhyto-7 Formulation', description: 'Batch stable nano-suspension with 89% encapsulation efficiency', trl: 6 }
    ],
    publications: [
      { title: 'Enhanced Bioavailability of Curcumin Nanocarriers: In-Vitro and In-Vivo Pharmacokinetics', journal: 'International Journal of Pharmaceutics', doi: '10.1016/j.ijpharm.2024.124019' }
    ],
    startups: [
      { name: 'NanoPhyto Therapeutics LLP', founders: 'Pooja Varma & Dr. Heena Patel', incubationDate: '2024-08-01' }
    ],
    mous: [
      { partner: 'Cadila Pharmaceuticals R&D', scope: 'Phase-I clinical trials advisory', signedDate: '2023-10-25' }
    ],
    sanctionLetter: 'Sanction_ICMR_SKPCER_Nano.pdf',
    auditNotes: 'Patent granted in June 2024; listed in NAAC 3.4.3.'
  },
  {
    id: 'GUNI-CARS-2025-004',
    title: 'Bio-stimulant Extraction from Dairy Whey Waste & Field Trial Validation for North Gujarat Soils',
    category: 'Sponsored Research',
    fundingAgency: 'Gujarat State Biotechnology Mission (GSBTM) / ICAR',
    fundingSourceType: 'Government',
    principalInvestigator: {
      name: 'Dr. Alpesh Patel',
      empId: 'GUNI-EMP-1120',
      institute: 'AGRI',
      department: 'Biotechnology & Soil Sciences',
      email: 'alpesh.patel@ganpatuniversity.ac.in'
    },
    coInvestigators: [
      { name: 'Dr. H. M. Chaudhary', institute: 'MUIS' }
    ],
    studentResearchers: [
      { name: 'Hardik Prajapati', enrollment: '22014011023', role: 'Field Trials & Soil Testing', degree: 'B.Sc. Agriculture' }
    ],
    instituteId: 'AGRI',
    department: 'Faculty of Agriculture',
    startDate: '2024-06-01',
    endDate: '2026-05-31',
    trl: 5,
    status: 'Approved',
    sanctionedAmount: 2200000,
    realizedAmount: 1400000,
    industryCashContribution: 300000,
    industryInKindValue: 200000,
    technologyLicensingRevenue: 0,
    patentRevenue: 0,
    facultyIncentiveShare: 140000,
    installments: [
      { trancheNo: 1, date: '2024-06-25', amount: 1400000, ref: 'NEFT-GSBTM-559124', ucSubmitted: true }
    ],
    patents: [
      { appNo: '202421077412', title: 'Fermentative Hydrolysis of Whey for Soil Micronutrient Mobilization', status: 'Filed', date: '2024-08-30' }
    ],
    prototypes: [
      { name: 'AgriWhey Soil Bio-fertilizer Liquid v1', description: 'Liquid organic microbial bio-stimulant for arid saline soil', trl: 5 }
    ],
    publications: [
      { title: 'Dairy Waste Valorization for Nitrogen-Fixing Enhancement in Castor Crops', journal: 'Journal of Cleaner Production', doi: '10.1016/j.jclepro.2024.141209' }
    ],
    startups: [],
    mous: [
      { partner: 'Mehsana District Co-operative Milk Producers Union (Dudhsagar Dairy)', scope: 'Industrial whey collection MoU', signedDate: '2024-04-10' }
    ],
    sanctionLetter: 'Sanction_GSBTM_Agri_Whey.pdf',
    auditNotes: 'Quarterly review submitted to CARS.'
  },
  {
    id: 'GUNI-CARS-2025-005',
    title: 'Automated Cybersecurity Compliance Audit & Vulnerability Assessment for Gujarat Cooperative Banks',
    category: 'Contract R&D',
    fundingAgency: 'Gujarat Urban Co-operative Banks Federation',
    fundingSourceType: 'Industry Partner',
    principalInvestigator: {
      name: 'Dr. Sandip Patel',
      empId: 'GUNI-EMP-0914',
      institute: 'DCS',
      department: 'Computer Applications (AMPICS)',
      email: 'sandip.patel@ganpatuniversity.ac.in'
    },
    coInvestigators: [
      { name: 'Prof. J. B. Vyas', institute: 'DCS' }
    ],
    studentResearchers: [
      { name: 'Aarav Shah', enrollment: '21013011034', role: 'VAPT Pen-tester', degree: 'MCA' },
      { name: 'Shruti Modi', enrollment: '22013011012', role: 'Security Compliance Auditor', degree: 'BCA Cyber Sec' }
    ],
    instituteId: 'DCS',
    department: 'Faculty of Computer Applications',
    startDate: '2024-09-01',
    endDate: '2025-08-31',
    trl: 8,
    status: 'Approved',
    sanctionedAmount: 1800000,
    realizedAmount: 1200000,
    industryCashContribution: 1800000,
    industryInKindValue: 0,
    technologyLicensingRevenue: 0,
    patentRevenue: 0,
    facultyIncentiveShare: 360000,
    installments: [
      { trancheNo: 1, date: '2024-09-20', amount: 800000, ref: 'CHQ-BOB-991204', ucSubmitted: true },
      { trancheNo: 2, date: '2025-01-15', amount: 400000, ref: 'NEFT-GUCB-771923', ucSubmitted: true }
    ],
    patents: [],
    prototypes: [
      { name: 'GUNI-BankGuard Scanner', description: 'Automated RBI-compliance vulnerability assessment dashboard', trl: 8 }
    ],
    publications: [],
    startups: [],
    mous: [
      { partner: 'Gujarat State Co-Op Bank Ltd', scope: 'Annual IT audit contract', signedDate: '2024-08-15' }
    ],
    sanctionLetter: 'Consultancy_Order_CoOpBanks.pdf',
    auditNotes: 'Direct consultancy revenue; certified under NAAC Metric 3.5.1.'
  },
  {
    id: 'GUNI-CARS-2025-006',
    title: 'GIS and Thermal Drone Mapping of Urban Heat Islands for Ahmedabad Urban Development Authority (AUDA)',
    category: 'Contract R&D',
    fundingAgency: 'Urban Development & Urban Housing Dept / AUDA',
    fundingSourceType: 'Government',
    principalInvestigator: {
      name: 'Prof. Mihir Shah',
      empId: 'GUNI-EMP-1402',
      institute: 'ARCH',
      department: 'Architecture & Urban Planning',
      email: 'mihir.shah@ganpatuniversity.ac.in'
    },
    coInvestigators: [
      { name: 'Dr. Nirav Joshi', institute: 'FOET' }
    ],
    studentResearchers: [
      { name: 'Devanshi Trivedi', enrollment: '20015011011', role: 'GIS Spatial Modeler', degree: 'B.Arch' }
    ],
    instituteId: 'ARCH',
    department: 'Faculty of Architecture & Planning',
    startDate: '2024-05-01',
    endDate: '2025-04-30',
    trl: 7,
    status: 'Approved',
    sanctionedAmount: 1900000,
    realizedAmount: 1300000,
    industryCashContribution: 1900000,
    industryInKindValue: 350000,
    technologyLicensingRevenue: 0,
    patentRevenue: 0,
    facultyIncentiveShare: 260000,
    installments: [
      { trancheNo: 1, date: '2024-05-18', amount: 1300000, ref: 'TREASURY-GJ-884912', ucSubmitted: true }
    ],
    patents: [],
    prototypes: [
      { name: 'AUDA-Microclimate Heat Atlas', description: 'High-resolution surface temperature and canopy spatial model', trl: 7 }
    ],
    publications: [
      { title: 'Remote Sensing Analysis of Urban Green Cover Deficits in Semi-Arid Urban Centers', journal: 'Sustainable Cities and Society', doi: '10.1016/j.scs.2024.105118' }
    ],
    startups: [],
    mous: [
      { partner: 'AUDA Smart City Cell', scope: 'Technical advisory on green corridor zoning', signedDate: '2024-03-20' }
    ],
    sanctionLetter: 'AUDA_WorkOrder_HeatMapping.pdf',
    auditNotes: 'Consultancy work order completed Phase 1.'
  },
  {
    id: 'GUNI-CARS-2025-007',
    title: 'AI-Powered Ergonomic Risk Assessment Tool for Automotive Assembly Line Workers',
    category: 'Sponsored Research',
    fundingAgency: 'Tata Motors & Department of Heavy Industries (DHI)',
    fundingSourceType: 'Industry Partner',
    principalInvestigator: {
      name: 'Dr. Priya Desai',
      empId: 'GUNI-EMP-1288',
      institute: 'HEALTH',
      department: 'Faculty of Health & Physiotherapy',
      email: 'priya.desai@ganpatuniversity.ac.in'
    },
    coInvestigators: [
      { name: 'Dr. Sandip Patel', institute: 'DCS' }
    ],
    studentResearchers: [
      { name: 'Sneha Patel', enrollment: '21017011008', role: 'Clinical Biomechanics Assessor', degree: 'MPT Sports' }
    ],
    instituteId: 'HEALTH',
    department: 'Physiotherapy & Health Sciences',
    startDate: '2024-07-01',
    endDate: '2025-06-30',
    trl: 6,
    status: 'Approved',
    sanctionedAmount: 1400000,
    realizedAmount: 950000,
    industryCashContribution: 1400000,
    industryInKindValue: 100000,
    technologyLicensingRevenue: 0,
    patentRevenue: 0,
    facultyIncentiveShare: 190000,
    installments: [
      { trancheNo: 1, date: '2024-07-22', amount: 950000, ref: 'NEFT-TATA-774012', ucSubmitted: true }
    ],
    patents: [
      { appNo: '202421066311', title: 'Computer Vision-based REBA/RULA Ergonomic Posture Estimation in Real-Time', status: 'Filed', date: '2024-11-04' }
    ],
    prototypes: [
      { name: 'GUNI-ErgoVision AI v1.2', description: 'Non-intrusive camera-based ergonomic posture scoring rig', trl: 6 }
    ],
    publications: [],
    startups: [],
    mous: [
      { partner: 'Tata Motors Sanand Plant', scope: 'Assembly line pilot trial', signedDate: '2024-06-15' }
    ],
    sanctionLetter: 'Tata_Sanand_Ergo_Sanction.pdf',
    auditNotes: 'Interdisciplinary project between Physiotherapy and Computer Applications.'
  },
  {
    id: 'GUNI-CARS-2025-008',
    title: 'Bio-Remediation of Industrial Dye Effluents Using Immobilized Halophilic Bacterial Consortia',
    category: 'Sponsored Research',
    fundingAgency: 'Anusandhan National Research Foundation (ANRF) / DST',
    fundingSourceType: 'Government',
    principalInvestigator: {
      name: 'Dr. Bhavin Shah',
      empId: 'GUNI-EMP-0672',
      institute: 'MUIS',
      department: 'Microbiology & Biotechnology',
      email: 'bhavin.shah@ganpatuniversity.ac.in'
    },
    coInvestigators: [
      { name: 'Dr. Heena Patel', institute: 'SKPCER' }
    ],
    studentResearchers: [
      { name: 'Chirag Barot', enrollment: '22018011015', role: 'Bioreactor Operator', degree: 'M.Sc. Microbiology' }
    ],
    instituteId: 'MUIS',
    department: 'Mehsana Urban Institute of Sciences',
    startDate: '2024-09-15',
    endDate: '2027-03-31',
    trl: 5,
    status: 'Approved',
    sanctionedAmount: 3100000,
    realizedAmount: 1800000,
    industryCashContribution: 400000,
    industryInKindValue: 250000,
    technologyLicensingRevenue: 0,
    patentRevenue: 0,
    facultyIncentiveShare: 180000,
    installments: [
      { trancheNo: 1, date: '2024-10-05', amount: 1800000, ref: 'NEFT-ANRF-102941', ucSubmitted: true }
    ],
    patents: [
      { appNo: '202421088192', title: 'Halophilic Bacterial Strain Consortia for Azo Dye Decolorization', status: 'Filed', date: '2024-12-01' }
    ],
    prototypes: [
      { name: '100L Fluidized Bed Bio-cleaner', description: 'Pilot scale continuous column reactor at GIDC Panoli', trl: 5 }
    ],
    publications: [
      { title: 'Rapid Decolorization of Reactive Black-5 by Novel Marine Halo-tolerant Isolates', journal: 'Bioresource Technology', doi: '10.1016/j.biortech.2024.130981' }
    ],
    startups: [],
    mous: [
      { partner: 'Kadi Green Enviro Association', scope: 'Effluent treatment validation testbed', signedDate: '2024-08-20' }
    ],
    sanctionLetter: 'ANRF_Sanction_MUIS_Biotech.pdf',
    auditNotes: 'Premier ANRF grant won in 2024.'
  },
  {
    id: 'GUNI-CARS-2025-009',
    title: 'Smart Solar-Powered Micro-Cold Storage for Horticulture Farmers (Student SSIP Grant)',
    category: 'Student Innovation (SSIP)',
    fundingAgency: 'Student Startup and Innovation Policy (SSIP 2.0) / CARS Seed Fund',
    fundingSourceType: 'Internal Seed Grant',
    principalInvestigator: {
      name: 'Dr. Ketan Patel (Mentor)',
      empId: 'GUNI-EMP-0831',
      institute: 'FOET',
      department: 'Mechanical Engineering',
      email: 'ketan.patel@ganpatuniversity.ac.in'
    },
    coInvestigators: [],
    studentResearchers: [
      { name: 'Vatsal Trivedi', enrollment: '19012011045', role: 'Lead Innovator & Automation', degree: 'B.Tech CSE' },
      { name: 'Jaymin Patel', enrollment: '19012011082', role: 'Thermal & Structural Design', degree: 'B.Tech Mech' },
      { name: 'Riddhi Soni', enrollment: '20012011051', role: 'IoT Firmware & App', degree: 'B.Tech IT' }
    ],
    instituteId: 'FOET',
    department: 'Mechanical / UVPCE',
    startDate: '2024-03-01',
    endDate: '2025-04-30',
    trl: 6,
    status: 'Approved',
    sanctionedAmount: 250000,
    realizedAmount: 250000,
    industryCashContribution: 0,
    industryInKindValue: 50000,
    technologyLicensingRevenue: 0,
    patentRevenue: 0,
    facultyIncentiveShare: 0,
    installments: [
      { trancheNo: 1, date: '2024-03-20', amount: 150000, ref: 'SSIP-CHEQUE-449102', ucSubmitted: true },
      { trancheNo: 2, date: '2024-11-15', amount: 100000, ref: 'SSIP-CHEQUE-881923', ucSubmitted: true }
    ],
    patents: [
      { appNo: '202421045102', title: 'Phase Change Material Integrated Hybrid Solar Micro Cold Storage', status: 'Filed', date: '2024-07-22' }
    ],
    prototypes: [
      { name: 'SolarKisanCool v1', description: '1 Metric Ton portable solar PCM cold chamber for vegetable growers', trl: 6 }
    ],
    publications: [],
    startups: [
      { name: 'KisanCool Agrotech Private Limited', founders: 'Vatsal Trivedi & Jaymin Patel', incubationDate: '2024-10-12' }
    ],
    mous: [],
    sanctionLetter: 'SSIP_Sanction_SolarCold_GUNI.pdf',
    auditNotes: 'State Hackathon 1st Prize Winner; Incubated at GUNI E-Cell.'
  },
  {
    id: 'GUNI-CARS-2025-010',
    title: 'Consultancy for Industrial Hydraulic System Efficiency Audit and Retrofitting for Ceramic Tile Presses',
    category: 'Contract R&D',
    fundingAgency: 'Morbi Ceramic Manufacturers Consortium',
    fundingSourceType: 'Industry Partner',
    principalInvestigator: {
      name: 'Prof. R. M. Shah',
      empId: 'GUNI-EMP-0721',
      institute: 'COE',
      department: 'Bosch Rexroth Centre of Excellence',
      email: 'rm.shah@ganpatuniversity.ac.in'
    },
    coInvestigators: [
      { name: 'Prof. H. B. Vaghela', institute: 'FODE' }
    ],
    studentResearchers: [
      { name: 'Nikhil Parmar', enrollment: '22011022019', role: 'Pressure Sensor Logging', degree: 'Diploma Mech' }
    ],
    instituteId: 'COE',
    department: 'Bosch Rexroth CoE / FODE',
    startDate: '2024-10-01',
    endDate: '2025-03-31',
    trl: 8,
    status: 'Approved',
    sanctionedAmount: 1600000,
    realizedAmount: 1600000,
    industryCashContribution: 1600000,
    industryInKindValue: 0,
    technologyLicensingRevenue: 0,
    patentRevenue: 0,
    facultyIncentiveShare: 320000,
    installments: [
      { trancheNo: 1, date: '2024-10-15', amount: 800000, ref: 'CHQ-HDFC-991204', ucSubmitted: true },
      { trancheNo: 2, date: '2025-01-20', amount: 800000, ref: 'NEFT-CERAMIC-330192', ucSubmitted: true }
    ],
    patents: [],
    prototypes: [
      { name: 'Servo-Hydraulic Energy Saver Retrofit', description: 'Reduces peak hydraulic press energy consumption by 24%', trl: 8 }
    ],
    publications: [],
    startups: [],
    mous: [
      { partner: 'Kajaria Vitrified Tiles Plant Morbi', scope: 'Turnkey hydraulic upgrade', signedDate: '2024-09-15' }
    ],
    sanctionLetter: 'WorkOrder_Morbi_Ceramics_Hydraulics.pdf',
    auditNotes: '100% realized revenue; certified for NAAC 3.5.1.'
  }
];

export const STUDENT_RESEARCH_OPENINGS = [
  {
    id: 'opp-01',
    title: 'Student Research Assistant: 5G Edge Computing & Industrial Telemetry',
    projectRef: 'GUNI-CARS-2025-001',
    piName: 'Dr. Nirav Joshi',
    institute: 'FOET / CoE 5G',
    stipend: '₹8,000 / month (DST sponsored)',
    eligibility: 'B.Tech / M.Tech CSE, IT, ECE (3rd/4th Year)',
    skills: 'Python, MQTT, C++, Linux, Wireless networking',
    deadline: '2026-10-15',
    slots: 2
  },
  {
    id: 'opp-02',
    title: 'Formulation Research Intern: Phytopharmaceutical Nanoparticles',
    projectRef: 'GUNI-CARS-2025-003',
    piName: 'Dr. Heena Patel',
    institute: 'SKPCER (Pharmacy)',
    stipend: '₹10,000 / month (ICMR project grant)',
    eligibility: 'B.Pharm (Final Year) / M.Pharm (Pharmaceutics)',
    skills: 'HPLC, Dissolution testing, Liposome synthesis, Lab compliance',
    deadline: '2026-10-20',
    slots: 2
  },
  {
    id: 'opp-03',
    title: 'CAD/CAM Simulation & Slicing Intern: Metal 3D Printing',
    projectRef: 'GUNI-CARS-2025-002',
    piName: 'Dr. Ketan Patel',
    institute: 'CoE Additive Manufacturing',
    stipend: '₹9,000 / month (Industry funded)',
    eligibility: 'B.Tech / Diploma Mechanical / Mechatronics',
    skills: 'SolidWorks, Ansys, Magics Slicing, Material testing',
    deadline: '2026-10-30',
    slots: 1
  }
];

export const SAMPLE_INQUIRIES = [
  {
    id: 'inq-101',
    clientName: 'Sun Pharmaceutical Industries Ltd',
    contactPerson: 'Mr. Rajesh Kothari (VP - R&D)',
    email: 'rajesh.kothari@sunpharma.example.com',
    phone: '+91 98250 11234',
    serviceRequested: 'Bioavailability Testing & Stability Study at SKPCER Testing Centre',
    targetInstitute: 'SKPCER',
    budgetEstimated: '₹6,50,000',
    status: 'In Discussion',
    date: '2026-09-18'
  },
  {
    id: 'inq-102',
    clientName: 'Adani Green Energy Ltd',
    contactPerson: 'Ms. Sneha Vaghela (Head - Drone Inspection)',
    email: 'sneha.v@adanigreen.example.com',
    phone: '+91 98790 99881',
    serviceRequested: 'Drone-based Thermal Solar Panel Hotspot Detection & AI Diagnostics',
    targetInstitute: 'FOET',
    budgetEstimated: '₹14,00,000',
    status: 'Proposal Submitted',
    date: '2026-09-15'
  }
];
