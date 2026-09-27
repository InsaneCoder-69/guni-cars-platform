import express from 'express';
import cors from 'cors';
import { dataStore } from './dataStore.js';
import { generateOfficialPdf } from './reportGenerator.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', university: 'Ganpat University', centre: 'CARS', time: new Date().toISOString() });
});

// Projects Endpoints
app.get('/api/projects', (req, res) => {
  try {
    const { instituteId, category, status } = req.query;
    let projects = dataStore.getProjects();

    if (instituteId && instituteId !== 'ALL') {
      projects = projects.filter(p => p.instituteId === instituteId);
    }
    if (category && category !== 'ALL') {
      projects = projects.filter(p => p.category === category);
    }
    if (status && status !== 'ALL') {
      projects = projects.filter(p => p.status === status);
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects', details: error.message });
  }
});

app.post('/api/projects', (req, res) => {
  try {
    const newProject = dataStore.addProject(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project', details: error.message });
  }
});

app.post('/api/projects/:id/installments', (req, res) => {
  try {
    const { id } = req.params;
    const updated = dataStore.addInstallment(id, req.body);
    if (!updated) return res.status(404).json({ error: 'Project not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add installment', details: error.message });
  }
});

app.put('/api/projects/:id/approve', (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;
    const updated = dataStore.approveProject(id, notes);
    if (!updated) return res.status(404).json({ error: 'Project not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve project', details: error.message });
  }
});

// Stats & Quota Benchmark Endpoint
app.get('/api/stats', (req, res) => {
  try {
    const stats = dataStore.getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to compute stats', details: error.message });
  }
});

// Inquiries Endpoints
app.get('/api/inquiries', (req, res) => {
  try {
    res.json(dataStore.getInquiries());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inquiries', details: error.message });
  }
});

app.post('/api/inquiries', (req, res) => {
  try {
    const newInquiry = dataStore.addInquiry(req.body);
    res.status(201).json(newInquiry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit inquiry', details: error.message });
  }
});

// Dynamic Official PDF Report Generator Endpoint
app.post('/api/reports/generate-pdf', async (req, res) => {
  try {
    const {
      executiveName = 'Dr. Heena Patel',
      designation = 'Deputy Director - CARS (Centre for Advanced Research Studies)',
      directorName = 'Dr. Ajay Kumar Gupta',
      directorDesignation = 'Director - CARS (Centre for Advanced Research Studies)',
      academicYear = '2025–26',
      scope = 'All Constituent Institutes'
    } = req.body;

    const stats = dataStore.getStats();
    const projects = dataStore.getProjects();

    const { buffer, filename } = await generateOfficialPdf({
      executiveName,
      designation,
      directorName,
      directorDesignation,
      academicYear,
      scope,
      stats,
      projects
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', buffer.length);
    res.send(buffer);
  } catch (error) {
    console.error('PDF Endpoint error:', error);
    res.status(500).json({ error: 'Failed to generate PDF report', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`GUNI CARS Backend Server running on http://localhost:${PORT}`);
});
