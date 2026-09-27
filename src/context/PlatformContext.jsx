import React, { createContext, useContext, useState, useEffect } from 'react';
import { INSTITUTES, COE_FACILITIES, INITIAL_PROJECTS, STUDENT_RESEARCH_OPENINGS, SAMPLE_INQUIRIES, TOTAL_ANNUAL_TARGET_AMT } from '../data/seedData';

const PlatformContext = createContext();

export function PlatformProvider({ children }) {
  // Active User Role Switcher
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('guni_cars_role') || 'CARS_ADMIN';
  });

  // Active Institute Coordinator Scope (for coordinator role)
  const [coordinatorInstitute, setCoordinatorInstitute] = useState('FOET');

  // Core Data Stores with LocalStorage caching
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('guni_cars_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem('guni_cars_inquiries');
    return saved ? JSON.parse(saved) : SAMPLE_INQUIRIES;
  });

  const [studentOpenings, setStudentOpenings] = useState(() => {
    const saved = localStorage.getItem('guni_cars_openings');
    return saved ? JSON.parse(saved) : STUDENT_RESEARCH_OPENINGS;
  });

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New industry inquiry received from Sun Pharma for SKPCER Testing Centre', time: '2 hours ago', read: false },
    { id: 2, text: 'Tranche 2 of ₹12,00,000 realized for DST 5G-IIoT project (FOET)', time: '1 day ago', read: false },
    { id: 3, text: 'Patent granted for Colorectal Carcinoma Liposomal Formulation (SKPCER)', time: '3 days ago', read: true }
  ]);

  // Selected project for modal detail view
  const [selectedProject, setSelectedProject] = useState(null);

  // Global Official Report Modal state for Dr. Heena Patel / CARS
  const [isReportModalOpen, setIsReportModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('report') === 'true';
    }
    return false;
  });

  // Sync with Backend Server on Initial Load
  useEffect(() => {
    async function fetchBackendData() {
      try {
        const [projRes, inqRes] = await Promise.allSettled([
          fetch('http://localhost:5000/api/projects'),
          fetch('http://localhost:5000/api/inquiries')
        ]);

        if (projRes.status === 'fulfilled' && projRes.value.ok) {
          const backendProjects = await projRes.value.json();
          if (Array.isArray(backendProjects) && backendProjects.length > 0) {
            setProjects(backendProjects);
          }
        }

        if (inqRes.status === 'fulfilled' && inqRes.value.ok) {
          const backendInquiries = await inqRes.value.json();
          if (Array.isArray(backendInquiries) && backendInquiries.length > 0) {
            setInquiries(backendInquiries);
          }
        }
      } catch (err) {
        console.warn('Backend server currently unreachable, operating in local offline cache mode:', err);
      }
    }
    fetchBackendData();
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('guni_cars_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('guni_cars_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('guni_cars_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('guni_cars_openings', JSON.stringify(studentOpenings));
  }, [studentOpenings]);

  // Calculate Institute Metrics & University Totals
  const totalRealizedRevenue = projects.reduce((acc, p) => acc + (p.realizedAmount || 0), 0);
  const totalSanctionedAmount = projects.reduce((acc, p) => acc + (p.sanctionedAmount || 0), 0);
  const totalPatentsCount = projects.reduce((acc, p) => acc + (p.patents ? p.patents.length : 0), 0);
  const totalPrototypesCount = projects.reduce((acc, p) => acc + (p.prototypes ? p.prototypes.length : 0), 0);
  const totalStartupsCount = projects.reduce((acc, p) => acc + (p.startups ? p.startups.length : 0), 0);
  const totalPublicationsCount = projects.reduce((acc, p) => acc + (p.publications ? p.publications.length : 0), 0);
  const totalTargetAchievementPct = Math.min(100, Math.round((totalRealizedRevenue / TOTAL_ANNUAL_TARGET_AMT) * 100));

  // Compute Institute Stats vs Quota
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

  // Action: Add new project from Faculty / Student wizard
  const addProject = async (projectData) => {
    const newId = `GUNI-CARS-${new Date().getFullYear()}-${String(projects.length + 1).padStart(3, '0')}`;
    const newProject = {
      id: newId,
      ...projectData,
      status: currentRole === 'CARS_ADMIN' ? 'Approved' : 'Under Review',
      realizedAmount: Number(projectData.initialRealizedAmount || 0),
      sanctionedAmount: Number(projectData.sanctionedAmount || 0),
      installments: projectData.initialRealizedAmount > 0 ? [
        {
          trancheNo: 1,
          date: new Date().toISOString().split('T')[0],
          amount: Number(projectData.initialRealizedAmount),
          ref: `INIT-${Math.floor(100000 + Math.random() * 900000)}`,
          ucSubmitted: true
        }
      ] : [],
      patents: projectData.patents || [],
      prototypes: projectData.prototypes || [],
      publications: projectData.publications || [],
      startups: projectData.startups || [],
      mous: projectData.mous || [],
      sanctionLetter: projectData.sanctionLetterName || 'Sanction_Letter_Uploaded.pdf'
    };

    setProjects(prev => [newProject, ...prev]);

    // Send to backend
    fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject)
    }).catch(err => console.warn('Could not sync project with backend:', err));

    // Push notification
    setNotifications(prev => [
      {
        id: Date.now(),
        text: `New project "${newProject.title.slice(0, 45)}..." submitted under ${newProject.instituteId}.`,
        time: 'Just now',
        read: false
      },
      ...prev
    ]);

    return newProject;
  };

  // Action: Approve project in coordinator / CARS review queue
  const approveProject = async (projectId, notes = '') => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return { ...p, status: 'Approved', auditNotes: notes || 'Verified and approved by CARS Coordinator.' };
      }
      return p;
    }));

    fetch(`http://localhost:5000/api/projects/${projectId}/approve`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes })
    }).catch(err => console.warn('Could not sync approval with backend:', err));
  };

  // Action: Add an installment to a project
  const addInstallment = async (projectId, installment) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const newInstallments = [...(p.installments || []), installment];
        const newRealized = newInstallments.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
        return {
          ...p,
          installments: newInstallments,
          realizedAmount: newRealized
        };
      }
      return p;
    }));

    fetch(`http://localhost:5000/api/projects/${projectId}/installments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(installment)
    }).catch(err => console.warn('Could not sync installment with backend:', err));
  };

  // Action: Submit Industry Inquiry
  const submitInquiry = async (inquiryData) => {
    const newInq = {
      id: `inq-${Date.now().toString().slice(-4)}`,
      ...inquiryData,
      date: new Date().toISOString().split('T')[0],
      status: 'New Inquiry'
    };
    setInquiries(prev => [newInq, ...prev]);

    fetch('http://localhost:5000/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInq)
    }).catch(err => console.warn('Could not sync inquiry with backend:', err));

    return newInq;
  };

  // Action: Generate Official PDF Report via Backend Chrome Service
  const generateOfficialPdfReport = async (options = {}) => {
    const response = await fetch('http://localhost:5000/api/reports/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || errData.details || `Backend returned status ${response.status}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const cleanYear = (options.academicYear || '2025-26').replace(/[^\w-]/g, '_');
    const filename = `GUNI_CARS_Official_Research_Report_${cleanYear}.pdf`;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
    return { success: true, filename };
  };

  // Action: Reset data to initial state
  const resetToDefaults = () => {
    localStorage.removeItem('guni_cars_projects');
    localStorage.removeItem('guni_cars_inquiries');
    localStorage.removeItem('guni_cars_openings');
    setProjects(INITIAL_PROJECTS);
    setInquiries(SAMPLE_INQUIRIES);
    setStudentOpenings(STUDENT_RESEARCH_OPENINGS);
  };

  return (
    <PlatformContext.Provider value={{
      currentRole,
      setCurrentRole,
      coordinatorInstitute,
      setCoordinatorInstitute,
      projects,
      inquiries,
      studentOpenings,
      notifications,
      selectedProject,
      setSelectedProject,
      isReportModalOpen,
      setIsReportModalOpen,
      totalRealizedRevenue,
      totalSanctionedAmount,
      totalPatentsCount,
      totalPrototypesCount,
      totalStartupsCount,
      totalPublicationsCount,
      totalTargetAchievementPct,
      instituteStats,
      coeFacilities: COE_FACILITIES,
      addProject,
      approveProject,
      addInstallment,
      submitInquiry,
      generateOfficialPdfReport,
      resetToDefaults
    }}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
}
