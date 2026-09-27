import React, { useState } from 'react';
import { usePlatform } from '../context/PlatformContext';
import { 
  Search, 
  Filter, 
  Building2, 
  ArrowRight, 
  Sparkles, 
  DollarSign, 
  Award, 
  Cpu, 
  ChevronRight, 
  SlidersHorizontal,
  FileCheck2,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { INSTITUTES, TOTAL_ANNUAL_TARGET_CR } from '../data/seedData';

export function PublicShowcaseView({ onOpenProject, onOpenInquiry }) {
  const { 
    projects, 
    totalRealizedRevenue, 
    totalSanctionedAmount, 
    totalPatentsCount, 
    totalPrototypesCount,
    totalTargetAchievementPct,
    coeFacilities 
  } = usePlatform();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInst, setSelectedInst] = useState('ALL');
  const [selectedFundingType, setSelectedFundingType] = useState('ALL');
  const [selectedTrlGroup, setSelectedTrlGroup] = useState('ALL');

  const formatCurrency = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt || 0);
  };

  // Filter projects (only showing approved or ongoing publicly)
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.fundingAgency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.principalInvestigator?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesInst = selectedInst === 'ALL' || p.instituteId === selectedInst;
    const matchesFunding = selectedFundingType === 'ALL' || p.fundingSourceType === selectedFundingType;
    
    let matchesTrl = true;
    if (selectedTrlGroup === 'BASIC') matchesTrl = p.trl <= 3;
    if (selectedTrlGroup === 'DEMO') matchesTrl = p.trl >= 4 && p.trl <= 6;
    if (selectedTrlGroup === 'DEPLOY') matchesTrl = p.trl >= 7;

    return matchesSearch && matchesInst && matchesFunding && matchesTrl;
  });

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-950 via-brand-900 to-slate-900 text-white p-8 lg:p-12 shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Centre for Advanced Research Studies (CARS)
          </div>
          <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Ganpat University Research & Innovation Directory
          </h1>
          <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
            A unified institutional gateway mapping live sponsored research, industry consultancies, state-of-the-art Centres of Excellence, and student innovations across all constituent institutes of Ganpat University.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button 
              onClick={() => onOpenInquiry(null)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Request Industry Consultancy
            </button>
            <a 
              href="#coe-section" 
              className="px-5 py-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold rounded-xl text-xs border border-slate-700 transition-all"
            >
              Explore CoE Infrastructure
            </a>
          </div>
        </div>

        {/* Public Research Impact Highlights (Confidential Revenue Figures Restricted to Executive View) */}
        <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <span className="text-xs text-slate-400 font-medium block">Active Projects</span>
            <span className="text-xl lg:text-2xl font-extrabold text-blue-300">{projects.length}+</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Sponsored & Industry Grants</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <span className="text-xs text-slate-400 font-medium block">Centres of Excellence</span>
            <span className="text-xl lg:text-2xl font-extrabold text-emerald-400">{coeFacilities.length} CoEs</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">High-End Testing & R&D Labs</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <span className="text-xs text-slate-400 font-medium block">Patents & IP</span>
            <span className="text-xl lg:text-2xl font-extrabold text-purple-300">{totalPatentsCount}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Filed & Granted Patents</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <span className="text-xs text-slate-400 font-medium block">Industry Prototypes</span>
            <span className="text-xl lg:text-2xl font-extrabold text-amber-300">{totalPrototypesCount}</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">TRL 5-8 Field Validated</span>
          </div>
        </div>
      </div>

      {/* CoE Infrastructure Section */}
      <section id="coe-section" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-800 uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-brand-800" />
              Flagship Facilities
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Centres of Excellence & High-End Lab Assets</h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md">
            Open for industrial consultancy, testing, prototyping, and interdisciplinary student research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coeFacilities.map(coe => (
            <div key={coe.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-brand-900 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded-full uppercase">
                    {coe.partner}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100" title="Active"></span>
                </div>
                <h3 className="font-bold text-base text-slate-900 leading-snug">{coe.name}</h3>
                <p className="text-xs text-slate-500"><strong>Faculty Lead:</strong> {coe.lead}</p>
                
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">Core Infrastructure:</span>
                  <ul className="space-y-1">
                    {coe.strengths.map((str, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="text-brand-800 font-bold">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Consultancy Areas:</span>
                  <p className="text-slate-700 leading-tight">{coe.consultancyAreas}</p>
                  <p className="text-[11px] font-semibold text-emerald-700 pt-1">{coe.consultancyRate}</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  onClick={() => onOpenInquiry(coe)}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Book Facility / Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search and Filters */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search projects by title, funding agency (DST, ICAR...), or PI name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-800 focus:bg-white transition-all"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Institute Filter */}
            <select 
              value={selectedInst} 
              onChange={(e) => setSelectedInst(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-brand-800"
            >
              <option value="ALL">All Institutes (12+)</option>
              {INSTITUTES.map(inst => (
                <option key={inst.id} value={inst.id}>{inst.shortName}</option>
              ))}
            </select>

            {/* Funding Source Filter */}
            <select 
              value={selectedFundingType} 
              onChange={(e) => setSelectedFundingType(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-brand-800"
            >
              <option value="ALL">All Funding Sources</option>
              <option value="Government">Government (DST, ANRF, ICMR...)</option>
              <option value="Industry Partner">Industry / Corporate R&D</option>
              <option value="Internal Seed Grant">Student SSIP / Seed Fund</option>
            </select>

            {/* TRL Filter */}
            <select 
              value={selectedTrlGroup} 
              onChange={(e) => setSelectedTrlGroup(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-brand-800"
            >
              <option value="ALL">All Readiness Levels (TRL)</option>
              <option value="BASIC">TRL 1-3 (Proof of Concept)</option>
              <option value="DEMO">TRL 4-6 (Prototype Validation)</option>
              <option value="DEPLOY">TRL 7-9 (Commercial / Deployable)</option>
            </select>
          </div>
        </div>

        {/* Filter Stats Counter */}
        <div className="flex justify-between items-center px-1 text-xs text-slate-500">
          <span>Showing <strong>{filteredProjects.length}</strong> active initiatives</span>
          {searchTerm && (
            <button 
              onClick={() => { setSearchTerm(''); setSelectedInst('ALL'); setSelectedFundingType('ALL'); setSelectedTrlGroup('ALL'); }}
              className="text-brand-800 font-bold hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Project Innovation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => {
            const trlBadge = project.trl >= 7 
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
              : project.trl >= 4 
                ? 'bg-blue-100 text-blue-800 border-blue-300' 
                : 'bg-amber-100 text-amber-800 border-amber-300';

            return (
              <div 
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 space-y-3">
                  {/* Card Header Tag Strip */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {project.instituteId}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${trlBadge}`}>
                      TRL {project.trl}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-brand-900 transition-colors leading-snug line-clamp-2">
                    {project.title}
                  </h3>

                  <div className="space-y-1 text-xs text-slate-500 pt-1">
                    <p className="truncate"><strong>Sponsor:</strong> {project.fundingAgency}</p>
                    <p><strong>PI:</strong> {project.principalInvestigator?.name}</p>
                    {project.studentResearchers && project.studentResearchers.length > 0 && (
                      <p className="text-cyan-700 text-[11px] font-semibold">
                        🎓 {project.studentResearchers.length} Student Researcher(s) Attached
                      </p>
                    )}
                  </div>

                  {/* Badges for Outputs */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.patents && project.patents.length > 0 && (
                      <span className="text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded">
                        Patent Filed
                      </span>
                    )}
                    {project.prototypes && project.prototypes.length > 0 && (
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">
                        Prototype Ready
                      </span>
                    )}
                    {project.startups && project.startups.length > 0 && (
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                        Incubated Spinoff
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer (Public Privacy Compliant) */}
                <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Research Domain</span>
                    <span className="font-bold text-slate-700">{project.category || 'Sponsored R&D'}</span>
                  </div>
                  <button
                    onClick={() => onOpenProject(project)}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-brand-900 font-bold rounded-lg border border-slate-300 text-xs flex items-center gap-1 transition-colors shadow-sm"
                  >
                    <span>View Dossier</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
