import React, { useState } from 'react';
import { usePlatform } from '../context/PlatformContext';
import { 
  Briefcase, 
  PlusCircle, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Cpu, 
  ChevronRight, 
  ChevronLeft,
  Award,
  Sparkles,
  Search
} from 'lucide-react';
import { INSTITUTES } from '../data/seedData';
import confetti from 'canvas-confetti';

export function FacultyWorkspaceView({ onOpenProject }) {
  const { projects, addProject, currentRole } = usePlatform();
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State covering all Section 5 Parameters
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Sponsored Research');
  const [instituteId, setInstituteId] = useState('FOET');
  const [department, setDepartment] = useState('Computer Engineering / AI');
  
  // Step 2: Investigators & Students
  const [piName, setPiName] = useState('Dr. Heena Patel');
  const [piEmpId, setPiEmpId] = useState('GUNI-EMP-0512');
  const [piEmail, setPiEmail] = useState('heena.patel@ganpatuniversity.ac.in');
  const [coPiName, setCoPiName] = useState('Dr. Nirav Joshi');
  const [coPiInstitute, setCoPiInstitute] = useState('FOET');
  const [studentName, setStudentName] = useState('Vatsal Trivedi');
  const [studentEnroll, setStudentEnroll] = useState('19012011045');
  const [studentRole, setStudentRole] = useState('Research Assistant');

  // Step 3: Financial & TRL
  const [fundingAgency, setFundingAgency] = useState('Anusandhan National Research Foundation (ANRF)');
  const [fundingSourceType, setFundingSourceType] = useState('Government');
  const [sanctionedAmount, setSanctionedAmount] = useState('');
  const [initialRealizedAmount, setInitialRealizedAmount] = useState('');
  const [industryCash, setIndustryCash] = useState('0');
  const [industryInKind, setIndustryInKind] = useState('0');
  const [trl, setTrl] = useState(6);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('2027-03-31');
  const [sanctionLetterFile, setSanctionLetterFile] = useState('Sanction_Order_Official.pdf');

  // Step 4: IP & Outputs
  const [patentTitle, setPatentTitle] = useState('');
  const [patentAppNo, setPatentAppNo] = useState('');
  const [prototypeName, setPrototypeName] = useState('');
  const [prototypeDesc, setPrototypeDesc] = useState('');
  const [paperTitle, setPaperTitle] = useState('');
  const [paperDoi, setPaperDoi] = useState('');

  const [wizardSuccess, setWizardSuccess] = useState(false);

  // Faculty projects list
  const facultyProjects = projects.filter(p => {
    return p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           p.fundingAgency.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalSanctionedSum = facultyProjects.reduce((acc, p) => acc + (p.sanctionedAmount || 0), 0);
  const totalRealizedSum = facultyProjects.reduce((acc, p) => acc + (p.realizedAmount || 0), 0);
  const totalIncentiveSum = facultyProjects.reduce((acc, p) => acc + (p.facultyIncentiveShare || 0), 0);

  const formatCurrency = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt || 0);
  };

  const handleCompleteSubmission = (e) => {
    e.preventDefault();
    if (!title || !sanctionedAmount) return;

    const newProject = {
      title,
      category,
      fundingAgency,
      fundingSourceType,
      principalInvestigator: {
        name: piName,
        empId: piEmpId,
        institute: instituteId,
        department,
        email: piEmail
      },
      coInvestigators: coPiName ? [{ name: coPiName, institute: coPiInstitute }] : [],
      studentResearchers: studentName ? [{ name: studentName, enrollment: studentEnroll, role: studentRole, degree: 'B.Tech / Scholar' }] : [],
      instituteId,
      department,
      startDate,
      endDate,
      trl: Number(trl),
      sanctionedAmount: Number(sanctionedAmount),
      initialRealizedAmount: Number(initialRealizedAmount || 0),
      industryCashContribution: Number(industryCash || 0),
      industryInKindValue: Number(industryInKind || 0),
      technologyLicensingRevenue: 0,
      facultyIncentiveShare: Math.round(Number(initialRealizedAmount || 0) * 0.10), // 10% faculty incentive policy
      patents: patentTitle ? [{ appNo: patentAppNo || 'TEMP-PAT-2026', title: patentTitle, status: 'Filed', date: new Date().toISOString().split('T')[0] }] : [],
      prototypes: prototypeName ? [{ name: prototypeName, description: prototypeDesc, trl: Number(trl) }] : [],
      publications: paperTitle ? [{ title: paperTitle, journal: 'CARS Proceedings / Scopus', doi: paperDoi || '10.1000/cars.2026.01' }] : [],
      startups: [],
      mous: [],
      sanctionLetterName: sanctionLetterFile
    };

    addProject(newProject);
    confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 } });
    setWizardSuccess(true);
    setTimeout(() => {
      setWizardSuccess(false);
      setShowWizard(false);
      setWizardStep(1);
      setTitle('');
      setSanctionedAmount('');
      setInitialRealizedAmount('');
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Faculty Workspace Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded uppercase">
              Principal Investigator Portal
            </span>
            <span className="text-xs text-slate-400">Dr. Heena Patel (Deputy Director - CARS)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Research Grants & Consultancy Management</h1>
          <p className="text-xs text-slate-500">
            Submit new externally funded projects, log installment tranches, upload Utilization Certificates, and monitor incentive revenue.
          </p>
        </div>

        <button
          onClick={() => { setShowWizard(true); setWizardStep(1); }}
          className="px-5 py-3 bg-brand-900 hover:bg-brand-950 text-white font-bold rounded-2xl text-xs shadow-lg shadow-brand-900/20 flex items-center gap-2 transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-blue-300" />
          <span>Submit New Project / Grant</span>
        </button>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1 text-xs">
            <span>Total Sanctioned Portfolio</span>
            <Briefcase className="w-4 h-4 text-brand-800" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900">{formatCurrency(totalSanctionedSum)}</span>
          <span className="text-[11px] text-slate-400 block mt-1">Across 10 constituent research projects</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-emerald-700 mb-1 text-xs">
            <span>Total Realized Cash Flow</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-extrabold text-emerald-700">{formatCurrency(totalRealizedSum)}</span>
          <span className="text-[11px] text-emerald-600 block mt-1">Audited receipts in GUNI bank account</span>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-indigo-700 mb-1 text-xs">
            <span>Accrued Faculty Incentive Share</span>
            <DollarSign className="w-4 h-4 text-indigo-600" />
          </div>
          <span className="text-2xl font-extrabold text-indigo-700">{formatCurrency(totalIncentiveSum)}</span>
          <span className="text-[11px] text-indigo-600 block mt-1">Disbursable per CARS Consultancy Policy</span>
        </div>
      </div>

      {/* Step-by-Step Submission Wizard Modal */}
      {showWizard && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in flex flex-col max-h-[90vh]">
            {/* Wizard Header */}
            <div className="bg-brand-900 text-white p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-bold text-lg">New Research Project / Consultancy Intake</h3>
                  <p className="text-xs text-blue-200">Structured according to Section 5 parameters of the CARS proposal</p>
                </div>
                <button 
                  onClick={() => setShowWizard(false)}
                  className="text-slate-300 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Progress Steps Tracker */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
                <div className={`p-2 rounded-xl transition-all ${wizardStep === 1 ? 'bg-white text-brand-900 font-bold shadow' : 'bg-brand-950/60 text-slate-300'}`}>
                  1. Project Scope
                </div>
                <div className={`p-2 rounded-xl transition-all ${wizardStep === 2 ? 'bg-white text-brand-900 font-bold shadow' : 'bg-brand-950/60 text-slate-300'}`}>
                  2. Investigators
                </div>
                <div className={`p-2 rounded-xl transition-all ${wizardStep === 3 ? 'bg-white text-brand-900 font-bold shadow' : 'bg-brand-950/60 text-slate-300'}`}>
                  3. Funding & TRL
                </div>
                <div className={`p-2 rounded-xl transition-all ${wizardStep === 4 ? 'bg-white text-brand-900 font-bold shadow' : 'bg-brand-950/60 text-slate-300'}`}>
                  4. Outputs & IP
                </div>
              </div>
            </div>

            {/* Wizard Body Form */}
            <div className="p-6 overflow-y-auto flex-1 text-xs">
              {wizardSuccess ? (
                <div className="p-12 text-center space-y-3">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                  <h4 className="text-xl font-bold text-slate-900">Project Successfully Enrolled in CARS!</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    The project has been registered under {instituteId}. It will immediately reflect in the institute's revenue tally and coordinator verification queue.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCompleteSubmission}>
                  {/* STEP 1: Basic Scope */}
                  {wizardStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label className="font-bold text-slate-800 block mb-1">Project / Consultancy Title *</label>
                        <input 
                          type="text" 
                          placeholder="e.g. AI-driven Formulation Optimization for Peptide Therapeutics"
                          value={title} 
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-800"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-slate-800 block mb-1">Project Category / Scope *</label>
                          <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-brand-800 font-semibold"
                          >
                            <option value="Sponsored Research">Sponsored Research (Govt / Public Grant)</option>
                            <option value="Contract R&D">Contract R&D (Industry Sponsored)</option>
                            <option value="Prototype Development">Prototype Development & Validation</option>
                            <option value="Technology Transfer">Technology Transfer & Licensing</option>
                            <option value="Patent Licensing">Patent Commercialization</option>
                            <option value="International Collaboration">International Collaborative Research</option>
                          </select>
                        </div>
                        <div>
                          <label className="font-bold text-slate-800 block mb-1">Lead Constituent Institute *</label>
                          <select 
                            value={instituteId} 
                            onChange={(e) => setInstituteId(e.target.value)}
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-brand-800 font-semibold"
                          >
                            {INSTITUTES.map(inst => (
                              <option key={inst.id} value={inst.id}>{inst.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-slate-800 block mb-1">Department / Lab Facility *</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Dept of Pharmaceutics / Centre of Excellence"
                          value={department} 
                          onChange={(e) => setDepartment(e.target.value)}
                          required
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-800"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Investigators & Students */}
                  {wizardStep === 2 && (
                    <div className="space-y-4">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <span className="font-bold text-brand-900 block uppercase tracking-wider text-[11px]">Principal Investigator (PI)</span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <label className="text-slate-600 block mb-0.5">PI Full Name</label>
                            <input 
                              type="text" 
                              value={piName} 
                              onChange={(e) => setPiName(e.target.value)}
                              required
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-slate-600 block mb-0.5">Employee ID</label>
                            <input 
                              type="text" 
                              value={piEmpId} 
                              onChange={(e) => setPiEmpId(e.target.value)}
                              required
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-slate-600 block mb-0.5">Email</label>
                            <input 
                              type="email" 
                              value={piEmail} 
                              onChange={(e) => setPiEmail(e.target.value)}
                              required
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <span className="font-bold text-brand-900 block uppercase tracking-wider text-[11px]">Co-Investigator (Optional Interdisciplinary Linkage)</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="text-slate-600 block mb-0.5">Co-PI Name</label>
                            <input 
                              type="text" 
                              value={coPiName} 
                              onChange={(e) => setCoPiName(e.target.value)}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-slate-600 block mb-0.5">Co-PI Institute</label>
                            <select 
                              value={coPiInstitute} 
                              onChange={(e) => setCoPiInstitute(e.target.value)}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                            >
                              {INSTITUTES.map(inst => (
                                <option key={inst.id} value={inst.id}>{inst.shortName}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-cyan-50/60 rounded-xl border border-cyan-200 space-y-2">
                        <span className="font-bold text-cyan-900 block uppercase tracking-wider text-[11px]">Student / Research Scholar Contributor</span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <label className="text-slate-600 block mb-0.5">Student Name</label>
                            <input 
                              type="text" 
                              value={studentName} 
                              onChange={(e) => setStudentName(e.target.value)}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-slate-600 block mb-0.5">Enrollment Number</label>
                            <input 
                              type="text" 
                              value={studentEnroll} 
                              onChange={(e) => setStudentEnroll(e.target.value)}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-slate-600 block mb-0.5">Role in Project</label>
                            <input 
                              type="text" 
                              value={studentRole} 
                              onChange={(e) => setStudentRole(e.target.value)}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Financial & TRL */}
                  {wizardStep === 3 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-slate-800 block mb-1">Funding Agency Name *</label>
                          <input 
                            type="text" 
                            placeholder="e.g. DST / ICAR / Sun Pharma / DRDO"
                            value={fundingAgency} 
                            onChange={(e) => setFundingAgency(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-800"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-800 block mb-1">Funding Category *</label>
                          <select 
                            value={fundingSourceType} 
                            onChange={(e) => setFundingSourceType(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-brand-800 font-semibold"
                          >
                            <option value="Government">Government (ANRF, DST, DBT, ICMR, ISRO...)</option>
                            <option value="Industry Partner">Industry Partner / Corporate R&D</option>
                            <option value="International">International Funding Agency</option>
                            <option value="Internal Seed Grant">Internal Seed Fund</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-slate-800 block mb-1">Total Approved Sanction Cost (₹) *</label>
                          <input 
                            type="number" 
                            placeholder="e.g. 3500000"
                            value={sanctionedAmount} 
                            onChange={(e) => setSanctionedAmount(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-800 font-bold"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-800 block mb-1">Initial Realized Tranche (₹)</label>
                          <input 
                            type="number" 
                            placeholder="Amount already received in GUNI account"
                            value={initialRealizedAmount} 
                            onChange={(e) => setInitialRealizedAmount(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-800"
                          />
                        </div>
                      </div>

                      {/* TRL Selector */}
                      <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200">
                        <label className="font-bold text-brand-900 block mb-1">
                          Technology Readiness Level (TRL {trl}):
                        </label>
                        <input 
                          type="range" 
                          min={1} 
                          max={9} 
                          value={trl} 
                          onChange={(e) => setTrl(Number(e.target.value))}
                          className="w-full cursor-pointer accent-brand-800"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-1">
                          <span>TRL 1 (Concept)</span>
                          <span>TRL 5 (Lab Prototype)</span>
                          <span>TRL 9 (Commercialized)</span>
                        </div>
                      </div>

                      {/* Sanction Letter Upload Simulation */}
                      <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Upload className="w-5 h-5 text-slate-400" />
                          <div>
                            <span className="font-bold text-slate-700 block text-xs">Official Sanction Order / Work Contract (PDF)</span>
                            <span className="text-[10px] text-slate-500">Required for NIRF/NAAC audit verification proof</span>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-white border border-slate-200 text-brand-900 rounded font-semibold text-[11px]">
                          Attached: {sanctionLetterFile}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Outputs & IP */}
                  {wizardStep === 4 && (
                    <div className="space-y-4">
                      <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200 space-y-2">
                        <span className="font-bold text-purple-900 block uppercase tracking-wider text-[11px]">Intellectual Property (Patent)</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="text-slate-600 block mb-0.5">Patent Title</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Novel Bioreactor Impeller Geometry"
                              value={patentTitle} 
                              onChange={(e) => setPatentTitle(e.target.value)}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-slate-600 block mb-0.5">Application Number</label>
                            <input 
                              type="text" 
                              placeholder="e.g. 202621099120"
                              value={patentAppNo} 
                              onChange={(e) => setPatentAppNo(e.target.value)}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 space-y-2">
                        <span className="font-bold text-blue-900 block uppercase tracking-wider text-[11px]">Prototype / Technology Deliverable</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="text-slate-600 block mb-0.5">Prototype Name</label>
                            <input 
                              type="text" 
                              placeholder="e.g. BioClean v2.0 Demonstration Rig"
                              value={prototypeName} 
                              onChange={(e) => setPrototypeName(e.target.value)}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-slate-600 block mb-0.5">Short Description</label>
                            <input 
                              type="text" 
                              placeholder="Key specifications or trial metrics"
                              value={prototypeDesc} 
                              onChange={(e) => setPrototypeDesc(e.target.value)}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
                        <span className="font-bold text-emerald-900 block uppercase tracking-wider text-[11px]">Scopus/WoS Publication</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="text-slate-600 block mb-0.5">Research Paper Title</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Experimental Analysis of High-Velocity Oxy-Fuel Coating"
                              value={paperTitle} 
                              onChange={(e) => setPaperTitle(e.target.value)}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-slate-600 block mb-0.5">DOI / Index ID</label>
                            <input 
                              type="text" 
                              placeholder="e.g. 10.1016/j.surfcoat.2026.104"
                              value={paperDoi} 
                              onChange={(e) => setPaperDoi(e.target.value)}
                              className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Wizard Footer Navigation */}
                  <div className="pt-6 mt-4 border-t border-slate-100 flex justify-between items-center">
                    {wizardStep > 1 ? (
                      <button
                        type="button"
                        onClick={() => setWizardStep(wizardStep - 1)}
                        className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-100 flex items-center gap-1 font-semibold"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                      </button>
                    ) : <div />}

                    {wizardStep < 4 ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (wizardStep === 1 && !title) return alert('Please enter project title');
                          setWizardStep(wizardStep + 1);
                        }}
                        className="px-5 py-2 bg-brand-900 hover:bg-brand-950 text-white rounded-xl font-bold flex items-center gap-1 shadow"
                      >
                        Next Step
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/30"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Finalize & Submit to CARS
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Active Grants & Consultancy Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Active Grants & Consultancy Portfolio</h2>
            <p className="text-xs text-slate-500">Live monitoring of sanction contracts, installment receipts, and auditing.</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Filter grants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-800"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
              <tr>
                <th className="p-3 pl-6">Project ID & Title</th>
                <th className="p-3">Funding Agency</th>
                <th className="p-3">Sanctioned</th>
                <th className="p-3">Realized Revenue</th>
                <th className="p-3">Readiness</th>
                <th className="p-3">Status</th>
                <th className="p-3 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {facultyProjects.map(proj => {
                const percent = Math.min(100, Math.round(((proj.realizedAmount || 0) / (proj.sanctionedAmount || 1)) * 100));
                return (
                  <tr key={proj.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 pl-6 max-w-xs">
                      <span className="font-mono text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded font-bold block w-fit mb-0.5">
                        {proj.id}
                      </span>
                      <p className="font-bold text-slate-900 leading-snug truncate" title={proj.title}>
                        {proj.title}
                      </p>
                      <span className="text-[10px] text-slate-400">{proj.instituteId} • {proj.department}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-slate-800 block truncate max-w-[180px]">{proj.fundingAgency}</span>
                      <span className="text-[10px] text-slate-400">{proj.fundingSourceType}</span>
                    </td>
                    <td className="p-3 font-bold text-slate-800">
                      {formatCurrency(proj.sanctionedAmount)}
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-emerald-700 block">{formatCurrency(proj.realizedAmount)}</span>
                      <div className="w-24 bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${percent}%` }}></div>
                      </div>
                      <span className="text-[9px] text-slate-400">{percent}% realized</span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded text-[10px]">
                        TRL {proj.trl}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        proj.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {proj.status}
                      </span>
                    </td>
                    <td className="p-3 pr-6 text-right">
                      <button
                        onClick={() => onOpenProject(proj)}
                        className="px-3 py-1 bg-brand-50 hover:bg-brand-100 text-brand-900 font-bold rounded-lg border border-brand-200 text-xs transition-colors"
                      >
                        Manage Tranches
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
