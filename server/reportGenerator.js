import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateOfficialPdf({
  executiveName = 'Dr. Heena Patel',
  designation = 'Deputy Director - CARS (Centre for Advanced Research Studies)',
  directorName = 'Dr. Ajay Kumar Gupta',
  directorDesignation = 'Director - CARS (Centre for Advanced Research Studies)',
  academicYear = '2025–26',
  scope = 'All Constituent Institutes',
  stats,
  projects
}) {
  const formatCurrency = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt || 0);
  };

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const reportRef = `GUNI/CARS/EXEC/${new Date().getFullYear()}/AUDIT-${Math.floor(1000 + Math.random() * 9000)}`;

  const sponsored = projects.filter(p => p.category === 'Sponsored Research');
  const consultancy = projects.filter(p => p.category === 'Contract R&D' || p.category === 'Consultancy');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Ganpat University CARS Official Report - ${executiveName}</title>
<style>
  @page {
    size: A4 portrait;
    margin: 12mm 14mm 12mm 14mm;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    background: #fff;
    font-size: 9.5pt;
    line-height: 1.45;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .page {
    height: 273mm;
    max-height: 273mm;
    page-break-after: always;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }
  .page-content { flex: 1; }

  /* GUNI Official Letterhead */
  .letterhead {
    border-bottom: 3px solid #990000;
    padding-bottom: 12px;
    margin-bottom: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .crest-box {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .crest-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #990000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20pt;
    font-weight: 900;
    box-shadow: 0 2px 4px rgba(153,0,0,0.2);
  }
  .uni-titles h1 {
    font-size: 15pt;
    font-weight: 900;
    color: #990000;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .uni-titles p {
    font-size: 8pt;
    color: #475569;
    font-weight: 600;
  }
  .motto-tag {
    font-size: 7.5pt;
    font-style: italic;
    color: #990000;
    font-weight: 700;
  }
  .naac-badge {
    text-align: right;
    border-left: 2px solid #e2e8f0;
    padding-left: 12px;
  }
  .naac-grade {
    font-size: 11pt;
    font-weight: 900;
    color: #0f2c59;
  }
  .naac-sub {
    font-size: 7.5pt;
    color: #64748b;
  }

  /* Document Meta */
  .doc-title-bar {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-left: 4px solid #990000;
    padding: 8px 12px;
    border-radius: 6px;
    margin-bottom: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .doc-title-bar h2 {
    font-size: 11pt;
    font-weight: 800;
    color: #0f2c59;
    text-transform: uppercase;
  }
  .doc-title-bar span {
    font-size: 8pt;
    color: #64748b;
    font-family: monospace;
    font-weight: bold;
  }

  /* Executive Sign-off block */
  .sign-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 8px;
    padding: 10px 14px;
    margin-bottom: 14px;
  }
  .sign-col h4 {
    font-size: 7.5pt;
    text-transform: uppercase;
    color: #1e3a8a;
    font-weight: 700;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
  }
  .sign-col p {
    font-size: 9.5pt;
    font-weight: 800;
    color: #0f172a;
  }
  .sign-col span {
    font-size: 8pt;
    color: #475569;
    display: block;
  }

  /* KPI Box */
  .kpi-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 14px;
  }
  .kpi-cell {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-top: 3px solid #990000;
    border-radius: 6px;
    padding: 8px 10px;
    text-align: center;
  }
  .kpi-val {
    font-size: 13pt;
    font-weight: 800;
    color: #0f2c59;
  }
  .kpi-lbl {
    font-size: 7.5pt;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 7.5pt;
    margin-bottom: 8px;
  }
  th {
    background: #f1f5f9;
    color: #0f2c59;
    font-weight: 700;
    text-align: left;
    padding: 3.5px 6px;
    border: 1px solid #cbd5e1;
    font-size: 7pt;
    text-transform: uppercase;
  }
  td {
    padding: 3px 6px;
    border: 1px solid #e2e8f0;
    color: #334155;
    line-height: 1.3;
    vertical-align: top;
  }
  tr:nth-child(even) td { background: #f8fafc; }
  .text-right { text-align: right; }
  .font-bold { font-weight: 700; }
  .text-green { color: #047857; }
  .text-navy { color: #0f2c59; }

  .section-h {
    font-size: 9.5pt;
    font-weight: 800;
    color: #0f2c59;
    margin-bottom: 4px;
    border-bottom: 1.5px solid #cbd5e1;
    padding-bottom: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* Seal & Signature */
  .seal-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid #e2e8f0;
  }
  .seal-badge {
    border: 2px solid #990000;
    color: #990000;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 8pt;
    font-weight: 800;
    text-transform: uppercase;
    display: inline-block;
  }
  .sig-block {
    text-align: right;
  }
  .sig-line {
    width: 180px;
    border-bottom: 1px solid #475569;
    margin-bottom: 4px;
  }
  .sig-name {
    font-size: 9pt;
    font-weight: 800;
    color: #0f172a;
  }
  .sig-title {
    font-size: 7.5pt;
    color: #64748b;
  }

  .footer-note {
    font-size: 7pt;
    color: #94a3b8;
    border-top: 1px solid #e2e8f0;
    padding-top: 4px;
    display: flex;
    justify-content: space-between;
  }
</style>
</head>
<body>

  <!-- PAGE 1: EXECUTIVE LETTER & QUOTA AUDIT -->
  <div class="page">
    <div class="page-content">
      <!-- Letterhead -->
      <div class="letterhead">
        <div class="crest-box">
          <div class="crest-circle">G</div>
          <div class="uni-titles">
            <h1>GANPAT UNIVERSITY</h1>
            <p>Centre for Advanced Research Studies (CARS) • Ganpat Vidyanagar, Gujarat</p>
            <span class="motto-tag">"Social Upliftment through Education"</span>
          </div>
        </div>
        <div class="naac-badge">
          <div class="naac-grade">NAAC 'A' GRADE</div>
          <div class="naac-sub">UGC Recognized • NIRF Rated</div>
        </div>
      </div>

      <!-- Title Bar -->
      <div class="doc-title-bar">
        <h2>Executive Research & Consultancy Revenue Performance Audit</h2>
        <span>REF: ${reportRef}</span>
      </div>

      <!-- Sign-off & Submission Context -->
      <div class="sign-grid">
        <div class="sign-col">
          <h4>Presented & Certified By:</h4>
          <p>${executiveName}</p>
          <span>${designation}</span>
          <span style="margin-top: 2px;">Co-Signatory: <strong>${directorName}</strong> (${directorDesignation})</span>
        </div>
        <div class="sign-col">
          <h4>Submitted For Institutional Approval To:</h4>
          <p>The Pro Chancellor & Executive Registrar</p>
          <span>Ganpat University Leadership Secretariat</span>
          <span style="margin-top: 2px;">Date of Audit: <strong>${currentDate}</strong></span>
        </div>
      </div>

      <!-- KPI Summary -->
      <div class="kpi-row">
        <div class="kpi-cell">
          <div class="kpi-val text-navy">₹4.25 Cr</div>
          <div class="kpi-lbl">Annual Target Quota</div>
        </div>
        <div class="kpi-cell">
          <div class="kpi-val text-green">${formatCurrency(stats.totalRealizedRevenue)}</div>
          <div class="kpi-lbl">Realized In Bank (${stats.totalTargetAchievementPct}%)</div>
        </div>
        <div class="kpi-cell">
          <div class="kpi-val text-navy">${formatCurrency(stats.totalSanctionedAmount)}</div>
          <div class="kpi-lbl">Sanctioned Portfolio</div>
        </div>
        <div class="kpi-cell">
          <div class="kpi-val text-navy">${stats.totalPatentsCount} Patents / ${stats.totalPrototypesCount} Prototypes</div>
          <div class="kpi-lbl">Audited IP Assets</div>
        </div>
      </div>

      <!-- Institute-wise Table -->
      <div class="section-h">
        <span>Institute-wise Revenue Quota Achievement (₹4.25 Cr Matrix)</span>
        <span style="font-size: 7.5pt; font-weight: normal; color: #64748b;">Academic Year ${academicYear}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Constituent Institute / School</th>
            <th class="text-right">Target (₹ Cr)</th>
            <th class="text-right">Realized Cash (₹)</th>
            <th class="text-right">% Achieved</th>
            <th class="text-right">Projects</th>
            <th class="text-right">Audit Status</th>
          </tr>
        </thead>
        <tbody>
          ${stats.instituteStats.map(inst => `
            <tr>
              <td class="font-bold text-navy">${inst.name}</td>
              <td class="text-right">₹${inst.targetCr.toFixed(2)} Cr</td>
              <td class="text-right font-bold text-green">${formatCurrency(inst.realized)}</td>
              <td class="text-right font-bold">${inst.percent}%</td>
              <td class="text-right">${inst.projectCount}</td>
              <td class="text-right">${inst.isMet ? '<span style="color:#047857; font-weight:bold;">Quota Met</span>' : '<span style="color:#d97706; font-weight:bold;">In Progress</span>'}</td>
            </tr>
          `).join('')}
          <tr style="background:#e0e7ff; font-weight:bold;">
            <td class="text-navy">TOTAL GANPAT UNIVERSITY BENCHMARK</td>
            <td class="text-right text-navy">₹4.25 Cr</td>
            <td class="text-right text-green">${formatCurrency(stats.totalRealizedRevenue)}</td>
            <td class="text-right">${stats.totalTargetAchievementPct}%</td>
            <td class="text-right">${projects.length}</td>
            <td class="text-right text-navy">Institutional Target</td>
          </tr>
        </tbody>
      </table>

      <!-- Executive Endorsement -->
      <div class="seal-row">
        <div class="seal-badge">
          Official CARS Certification Seal
        </div>
        <div class="sig-block">
          <div class="sig-line"></div>
          <div class="sig-name">${executiveName}</div>
          <div class="sig-title">${designation}</div>
          <div class="sig-title">Ganpat University</div>
        </div>
      </div>
    </div>

    <div class="footer-note">
      <span>Ganpat University • Centre for Advanced Research Studies (CARS)</span>
      <span>Official Executive Audit Report • Page 1 of 2</span>
    </div>
  </div>

  <!-- PAGE 2: NIRF & NAAC ACCREDITATION FILING DATA -->
  <div class="page">
    <div class="page-content">
      <!-- Letterhead Minimal -->
      <div class="letterhead" style="padding-bottom: 6px; margin-bottom: 10px;">
        <div class="crest-box">
          <div class="crest-circle" style="width: 32px; height: 32px; font-size: 14pt;">G</div>
          <div class="uni-titles">
            <h1 style="font-size: 12pt;">GANPAT UNIVERSITY • CENTRE FOR ADVANCED RESEARCH STUDIES</h1>
          </div>
        </div>
        <div style="font-size: 8pt; font-family: monospace; color: #64748b;">REF: ${reportRef} (P.2)</div>
      </div>

      <!-- Section: Verified Project Register -->
      <div class="section-h">
        <span>1. Verified Sponsored Research & Consultancy Ledger (Audit Proof Attached)</span>
      </div>
      <table>
        <thead>
          <tr>
            <th style="width: 14%;">Project ID</th>
            <th>Project Title & Scope</th>
            <th style="width: 20%;">Funding Agency</th>
            <th class="text-right" style="width: 12%;">Sanctioned</th>
            <th class="text-right" style="width: 12%;">Realized</th>
            <th style="width: 12%;">PI Name</th>
          </tr>
        </thead>
        <tbody>
          ${projects.slice(0, 5).map(p => `
            <tr>
              <td class="font-bold text-navy" style="font-family: monospace;">${p.id}</td>
              <td><strong>${p.title}</strong><br><span style="color:#64748b; font-size:7pt;">TRL ${p.trl} • Doc: ${p.sanctionLetter || 'Sanction_Letter.pdf'}</span></td>
              <td>${p.fundingAgency}<br><span style="color:#64748b; font-size:7pt;">${p.fundingSourceType}</span></td>
              <td class="text-right">${formatCurrency(p.sanctionedAmount)}</td>
              <td class="text-right font-bold text-green">${formatCurrency(p.realizedAmount)}</td>
              <td>${p.principalInvestigator?.name}<br><span style="color:#64748b; font-size:7pt;">${p.instituteId}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- Section: NIRF RPC Data Format -->
      <div class="section-h" style="margin-top: 10px;">
        <span>2. NIRF Research & Professional Practice (RPC) Official Summary</span>
        <span style="font-size: 7.5pt; font-weight: normal; color: #1e40af;">Pre-Formatted for NIRF Data Capture System</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>NIRF Parameter</th>
            <th class="text-right">Project Count</th>
            <th class="text-right">Total Sanctioned (INR)</th>
            <th class="text-right">Total Realized in Cash (INR)</th>
            <th>Compliance Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="font-bold text-navy">Funded Sponsored Research (FSR)</td>
            <td class="text-right font-bold">${sponsored.length}</td>
            <td class="text-right">${formatCurrency(sponsored.reduce((a,c) => a + c.sanctionedAmount, 0))}</td>
            <td class="text-right font-bold text-green">${formatCurrency(sponsored.reduce((a,c) => a + c.realizedAmount, 0))}</td>
            <td>Audited UCs Attached</td>
          </tr>
          <tr>
            <td class="font-bold text-navy">Funded Consultancy Projects (FCP)</td>
            <td class="text-right font-bold">${consultancy.length}</td>
            <td class="text-right">${formatCurrency(consultancy.reduce((a,c) => a + c.sanctionedAmount, 0))}</td>
            <td class="text-right font-bold text-green">${formatCurrency(consultancy.reduce((a,c) => a + c.realizedAmount, 0))}</td>
            <td>Client Bank Realization Verified</td>
          </tr>
        </tbody>
      </table>

      <!-- Section: NAAC Criterion 3 Summary -->
      <div class="section-h" style="margin-top: 10px;">
        <span>3. NAAC Accreditation Compliance (Criterion 3 Metrics)</span>
        <span style="font-size: 7.5pt; font-weight: normal; color: #047857;">NAAC 'A' Grade Continuous Documentation</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>NAAC Metric ID</th>
            <th>Description</th>
            <th class="text-right">Institutional Data Metric</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="font-bold text-navy">Metric 3.2.1</td>
            <td>Extramural funding for research from government and non-governmental agencies</td>
            <td class="text-right font-bold text-green">₹${(stats.totalRealizedRevenue / 100000).toFixed(2)} Lakhs</td>
          </tr>
          <tr>
            <td class="font-bold text-navy">Metric 3.4.3</td>
            <td>Number of patents published/awarded during the assessment period</td>
            <td class="text-right font-bold text-navy">${stats.totalPatentsCount} Published / Granted Patents</td>
          </tr>
          <tr>
            <td class="font-bold text-navy">Metric 3.5.1</td>
            <td>Revenue generated from consultancy and corporate training</td>
            <td class="text-right font-bold text-green">₹${(consultancy.reduce((a,c) => a + c.realizedAmount, 0) / 100000).toFixed(2)} Lakhs</td>
          </tr>
        </tbody>
      </table>

      <!-- Closing Sign-off -->
      <div class="seal-row" style="margin-top: 10px;">
        <div style="font-size: 8pt; color: #475569;">
          <strong>Official Archival Record:</strong> Verified by CARS Technical Secretariat, Ganpat University.<br>
          Authorized for submission to NIRF, NAAC, QS, and Executive Board.
        </div>
        <div class="sig-block">
          <div class="sig-line"></div>
          <div class="sig-name">${executiveName}</div>
          <div class="sig-title">${designation}</div>
        </div>
      </div>
    </div>

    <div class="footer-note">
      <span>Ganpat University • Centre for Advanced Research Studies (CARS)</span>
      <span>Official Executive Audit Report • Page 2 of 2</span>
    </div>
  </div>

</body>
</html>`;

  // Write temporary HTML file
  const tempHtmlPath = path.join(__dirname, `temp_report_${Date.now()}.html`);
  const tempPdfPath = path.join(__dirname, `temp_report_${Date.now()}.pdf`);

  fs.writeFileSync(tempHtmlPath, html, 'utf-8');

  // Locate Chrome or Chromium cross-platform (Linux / Windows / macOS / Cloud Docker)
  function findChromeExecutable() {
    if (process.env.CHROME_BIN && fs.existsSync(process.env.CHROME_BIN)) {
      return process.env.CHROME_BIN;
    }
    const candidates = [
      // Linux / Cloud Containers (Render, Railway, Docker, Debian, Ubuntu)
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
      '/snap/bin/chromium',
      // Windows
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
      // macOS
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium'
    ];
    for (const c of candidates) {
      if (fs.existsSync(c)) return c;
    }
    return process.env.CHROME_BIN || (process.platform === 'win32' ? 'chrome.exe' : 'google-chrome');
  }

  const chromePath = findChromeExecutable();
  const args = [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--no-pdf-header-footer',
    `--print-to-pdf=${tempPdfPath}`,
    tempHtmlPath
  ];

  try {
    await execFileAsync(chromePath, args);
    const pdfBuffer = fs.readFileSync(tempPdfPath);

    // Clean up temporary files
    try {
      fs.unlinkSync(tempHtmlPath);
      fs.unlinkSync(tempPdfPath);
    } catch (e) {}

    return {
      buffer: pdfBuffer,
      filename: `GUNI_CARS_Official_Report_${executiveName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().getFullYear()}.pdf`
    };
  } catch (error) {
    console.error('PDF Generation Error:', error);
    try {
      if (fs.existsSync(tempHtmlPath)) fs.unlinkSync(tempHtmlPath);
      if (fs.existsSync(tempPdfPath)) fs.unlinkSync(tempPdfPath);
    } catch (e) {}
    throw new Error(`Failed to compile PDF via headless browser (${chromePath}): ${error.message}`);
  }
}
