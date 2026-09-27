import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_PROJECTS, SAMPLE_INQUIRIES, INSTITUTES, TOTAL_ANNUAL_TARGET_AMT } from '../src/data/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize seed data if not present
if (!fs.existsSync(PROJECTS_FILE)) {
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(INITIAL_PROJECTS, null, 2), 'utf-8');
}

if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(SAMPLE_INQUIRIES, null, 2), 'utf-8');
}

export const dataStore = {
  getProjects() {
    try {
      const content = fs.readFileSync(PROJECTS_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (e) {
      console.error('Error reading projects:', e);
      return INITIAL_PROJECTS;
    }
  },

  saveProjects(projects) {
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');
  },

  addProject(projectData) {
    const projects = this.getProjects();
    const newId = `GUNI-CARS-${new Date().getFullYear()}-${String(projects.length + 1).padStart(3, '0')}`;
    const newProject = {
      id: newId,
      ...projectData,
      status: projectData.status || 'Approved',
      realizedAmount: Number(projectData.initialRealizedAmount || projectData.realizedAmount || 0),
      sanctionedAmount: Number(projectData.sanctionedAmount || 0),
      installments: (projectData.initialRealizedAmount || projectData.realizedAmount) > 0 ? [
        {
          trancheNo: 1,
          date: new Date().toISOString().split('T')[0],
          amount: Number(projectData.initialRealizedAmount || projectData.realizedAmount),
          ref: `INIT-${Math.floor(100000 + Math.random() * 900000)}`,
          ucSubmitted: true
        }
      ] : [],
      patents: projectData.patents || [],
      prototypes: projectData.prototypes || [],
      publications: projectData.publications || [],
      startups: projectData.startups || [],
      mous: projectData.mous || [],
      sanctionLetter: projectData.sanctionLetterName || 'Sanction_Letter_Uploaded.pdf',
      createdAt: new Date().toISOString()
    };

    projects.unshift(newProject);
    this.saveProjects(projects);
    return newProject;
  },

  addInstallment(projectId, installment) {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === projectId);
    if (index === -1) return null;

    const project = projects[index];
    const newInstallments = [...(project.installments || []), installment];
    const newRealized = newInstallments.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

    project.installments = newInstallments;
    project.realizedAmount = newRealized;
    this.saveProjects(projects);
    return project;
  },

  approveProject(projectId, notes = '') {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === projectId);
    if (index === -1) return null;

    projects[index].status = 'Approved';
    projects[index].auditNotes = notes || 'Verified and approved by CARS Audit Desk.';
    this.saveProjects(projects);
    return projects[index];
  },

  getInquiries() {
    try {
      const content = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (e) {
      return SAMPLE_INQUIRIES;
    }
  },

  addInquiry(inquiryData) {
    const inquiries = this.getInquiries();
    const newInquiry = {
      id: `inq-${Date.now().toString().slice(-4)}`,
      ...inquiryData,
      date: new Date().toISOString().split('T')[0],
      status: 'New Inquiry'
    };
    inquiries.unshift(newInquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
    return newInquiry;
  },

  getStats() {
    const projects = this.getProjects();
    const totalRealizedRevenue = projects.reduce((acc, p) => acc + (p.realizedAmount || 0), 0);
    const totalSanctionedAmount = projects.reduce((acc, p) => acc + (p.sanctionedAmount || 0), 0);
    const totalPatentsCount = projects.reduce((acc, p) => acc + (p.patents ? p.patents.length : 0), 0);
    const totalPrototypesCount = projects.reduce((acc, p) => acc + (p.prototypes ? p.prototypes.length : 0), 0);
    const totalStartupsCount = projects.reduce((acc, p) => acc + (p.startups ? p.startups.length : 0), 0);
    const totalPublicationsCount = projects.reduce((acc, p) => acc + (p.publications ? p.publications.length : 0), 0);
    const totalTargetAchievementPct = Math.min(100, Math.round((totalRealizedRevenue / TOTAL_ANNUAL_TARGET_AMT) * 100));

    const instituteStats = INSTITUTES.map(inst => {
      const instProjects = projects.filter(p => p.instituteId === inst.id);
      const realized = instProjects.reduce((acc, p) => acc + (p.realizedAmount || 0), 0);
      const sanctioned = instProjects.reduce((acc, p) => acc + (p.sanctionedAmount || 0), 0);
      const percent = Math.min(100, Math.round((realized / inst.targetAmt) * 100));
      return {
        ...inst,
        realized,
        sanctioned,
        percent,
        projectCount: instProjects.length,
        isMet: realized >= inst.targetAmt
      };
    });

    return {
      totalRealizedRevenue,
      totalSanctionedAmount,
      totalPatentsCount,
      totalPrototypesCount,
      totalStartupsCount,
      totalPublicationsCount,
      totalTargetAchievementPct,
      totalAnnualTargetAmt: TOTAL_ANNUAL_TARGET_AMT,
      instituteStats
    };
  }
};
