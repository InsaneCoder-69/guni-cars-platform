import React, { useState } from 'react';
import { PlatformProvider, usePlatform } from './context/PlatformContext';
import { Navbar } from './components/Navbar';
import { PublicShowcaseView } from './views/PublicShowcaseView';
import { StudentHubView } from './views/StudentHubView';
import { FacultyWorkspaceView } from './views/FacultyWorkspaceView';
import { CoordinatorQueueView } from './views/CoordinatorQueueView';
import { CarsExecutiveDashboardView } from './views/CarsExecutiveDashboardView';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { InquiryModal } from './components/InquiryModal';
import { GenerateReportModal } from './components/GenerateReportModal';
import { Award, ShieldCheck, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

function AppContent() {
  const { currentRole, isReportModalOpen, setIsReportModalOpen } = usePlatform();
  
  // Initialize tab from URL search params or hash if available
  const [activeTab, setActiveTabState] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam) return tabParam;
    const hash = window.location.hash.replace('#', '');
    if (hash) return hash;
    return 'showcase';
  });

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    const url = new URL(window.location);
    url.searchParams.set('tab', tab);
    window.history.replaceState({}, '', url);
  };

  const [selectedProject, setSelectedProject] = useState(null);
  const [inquiryFacility, setInquiryFacility] = useState(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const handleOpenInquiry = (facility) => {
    setInquiryFacility(facility);
    setShowInquiryModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 sm:pt-8">
          {activeTab === 'showcase' && (
            <PublicShowcaseView 
              onOpenProject={(p) => setSelectedProject(p)} 
              onOpenInquiry={handleOpenInquiry} 
            />
          )}

          {activeTab === 'student' && (
            <StudentHubView 
              onOpenProject={(p) => setSelectedProject(p)} 
            />
          )}

          {activeTab === 'faculty' && (
            <FacultyWorkspaceView 
              onOpenProject={(p) => setSelectedProject(p)} 
            />
          )}

          {activeTab === 'coordinator' && (
            (currentRole === 'COORDINATOR' || currentRole === 'CARS_ADMIN') ? (
              <CoordinatorQueueView 
                onOpenProject={(p) => setSelectedProject(p)} 
              />
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-lg mx-auto my-12 shadow-sm">
                <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">Institute Verification Queue Restricted</h2>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  Department-level proposal review and verification queues are restricted to appointed Institute Coordinators and CARS administrators.
                </p>
                <button
                  onClick={() => setActiveTab('showcase')}
                  className="px-5 py-2.5 bg-guni-navy text-white rounded-xl text-xs font-bold hover:bg-guni-navyDark transition-colors"
                >
                  Return to Public Showcase
                </button>
              </div>
            )
          )}

          {activeTab === 'executive' && (
            currentRole === 'CARS_ADMIN' ? (
              <CarsExecutiveDashboardView 
                onOpenProject={(p) => setSelectedProject(p)} 
              />
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-lg mx-auto my-12 shadow-sm">
                <div className="w-12 h-12 bg-red-100 text-guni-crimson rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">CARS Executive Control Center Restricted</h2>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  Institutional revenue targets, 12-institute financial quota matrices, and statutory executive audit tools are confidential to authorized CARS leadership (Dr. Heena Patel & Dr. Ajay Kumar Gupta).
                </p>
                <button
                  onClick={() => setActiveTab('showcase')}
                  className="px-5 py-2.5 bg-guni-navy text-white rounded-xl text-xs font-bold hover:bg-guni-navyDark transition-colors"
                >
                  Return to Public Research Directory
                </button>
              </div>
            )
          )}
        </main>
      </div>

      {/* Global Modals */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {showInquiryModal && (
        <InquiryModal 
          initialFacility={inquiryFacility} 
          onClose={() => { setShowInquiryModal(false); setInquiryFacility(null); }} 
        />
      )}

      {isReportModalOpen && (
        <GenerateReportModal 
          onClose={() => setIsReportModalOpen(false)} 
        />
      )}

      {/* Official Ganpat University Footer */}
      <footer className="bg-white border-t-2 border-guni-crimson mt-20 pt-10 pb-8 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-200">
            {/* Column 1: University Identity */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-guni-crimson text-base font-serif">GANPAT UNIVERSITY</span>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-300">
                  NAAC 'A'
                </span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Centre for Advanced Research Studies (CARS) is the apex institutional directorate driving sponsored grants, technology transfers, industrial consultancy, and statutory ranking compliance across 12 constituent faculties.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-guni-crimson shrink-0" />
                <span>Ganpat Vidyanagar, Mehsana-Gozaria Highway, PO Kherva, Gujarat - 384017</span>
              </div>
            </div>

            {/* Column 2: Executive Leadership */}
            <div className="space-y-3">
              <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block">
                CARS Directorate Leadership
              </span>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-extrabold text-guni-navy block">Dr. Ajay Kumar Gupta</span>
                  <span className="text-[11px] text-slate-500">Director, Centre for Advanced Research Studies</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-extrabold text-guni-crimson block">Dr. Heena Patel</span>
                  <span className="text-[11px] text-slate-500">Deputy Director, Centre for Advanced Research Studies</span>
                </div>
              </div>
            </div>

            {/* Column 3: Statutory Compliances & Quick Report Trigger */}
            <div className="space-y-3">
              <span className="font-bold text-slate-900 text-xs uppercase tracking-wider block">
                Statutory Data & Compliance
              </span>
              <p className="text-xs text-slate-500">
                Data recorded on this portal feeds directly into the annual submissions for NIRF (MHRD/MoE), NAAC Criterion 3, GSIRF, and annual university audit reports.
              </p>
              {currentRole === 'CARS_ADMIN' ? (
                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-guni-crimson to-guni-navy text-white rounded-xl font-bold text-xs shadow hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>Generate Official Report (Dr. Heena Patel)</span>
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-[11px] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>CARS Executive Reporting Portal (Authorized Access Only)</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} Ganpat University (GUNI). All rights reserved. "Social Upliftment Through Education".</p>
            <p className="font-medium">
              Aligned with National Education Policy (NEP 2020) & Anusandhan National Research Foundation (ANRF).
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <PlatformProvider>
      <AppContent />
    </PlatformProvider>
  );
}
