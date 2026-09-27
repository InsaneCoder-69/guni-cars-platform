import React, { useState } from 'react';
import { usePlatform } from '../context/PlatformContext';
import { 
  Building2, 
  Search, 
  Bell, 
  UserCheck, 
  ChevronDown, 
  Sparkles, 
  FileSpreadsheet, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  SlidersHorizontal,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Download,
  Award,
  FileText
} from 'lucide-react';

export function Navbar({ activeTab, setActiveTab }) {
  const { 
    currentRole, 
    setCurrentRole, 
    totalRealizedRevenue, 
    totalTargetAchievementPct, 
    notifications,
    resetToDefaults,
    setIsReportModalOpen
  } = usePlatform();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const roles = [
    { 
      id: 'PUBLIC', 
      label: 'Public Visitor', 
      desc: 'Awareness, Project Showcase & CoE Facilities',
      icon: ExternalLink,
      badge: 'bg-emerald-100 text-emerald-800'
    },
    { 
      id: 'STUDENT', 
      label: 'Student Innovator', 
      desc: 'SSIP Grants, Hackathons & Research Openings',
      icon: GraduationCap,
      badge: 'bg-cyan-100 text-cyan-800'
    },
    { 
      id: 'FACULTY', 
      label: 'Faculty / PI Workspace', 
      desc: 'Submit Sponsored Grants, Log Tranches & IP',
      icon: Briefcase,
      badge: 'bg-indigo-100 text-indigo-800'
    },
    { 
      id: 'COORDINATOR', 
      label: 'Institute Coordinator', 
      desc: 'Department Verification Queue & Quota Tracker',
      icon: SlidersHorizontal,
      badge: 'bg-amber-100 text-amber-800'
    },
    { 
      id: 'CARS_ADMIN', 
      label: 'CARS Executive (Dr. Heena Patel)', 
      desc: 'Macro Quota Dashboard & 1-Click Official PDF Reports',
      icon: ShieldCheck,
      badge: 'bg-guni-crimson/10 text-guni-crimson'
    },
  ];

  const currentRoleObj = roles.find(r => r.id === currentRole) || roles[0];

  const formatCurrency = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Tier 1: Authentic Ganpat University Top Statutory Bar */}
      <div className="bg-guni-navyDark text-white px-4 lg:px-8 py-1.5 border-b border-guni-gold/20 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Left: Statutory Recognition & Sanskrit Motto */}
          <div className="flex items-center gap-2 sm:gap-3 text-slate-300">
            <span className="font-serif italic text-amber-300 tracking-wide">
              "विद्यया विन्दतेऽमृतम्"
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline font-medium text-slate-300">
              Social Upliftment Through Education
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-400">
              UGC Recognized State Private University
            </span>
          </div>

            {/* Right: NAAC Grade & Live Realization Quick Ticker (Restricted to Authorized Roles) */}
            <div className="flex items-center gap-3 ml-auto text-xs">
              <div className="flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">
                <Award className="w-3 h-3 text-amber-400" />
                <span>NAAC 'A' GRADE (3.16 CGPA)</span>
              </div>

              {(currentRole === 'CARS_ADMIN' || currentRole === 'COORDINATOR') && (
                <div className="hidden lg:flex items-center gap-2 text-slate-300 animate-in fade-in">
                  <span>Target: <strong className="text-emerald-400">₹4.25 Cr</strong></span>
                  <span className="text-slate-500">/</span>
                  <span>Realized: <strong className="text-amber-300">{formatCurrency(totalRealizedRevenue)}</strong> ({totalTargetAchievementPct}%)</span>
                </div>
              )}

              <button 
                onClick={resetToDefaults}
                title="Reset platform to authentic default seed data"
                className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors pl-2 border-l border-slate-700 text-[10px]"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
        </div>
      </div>

      {/* Tier 2: Institutional Brand Header */}
      <div className="border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Official Ganpat University Crest & CARS Typography */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group" 
            onClick={() => setActiveTab('showcase')}
          >
            {/* Custom SVG Institutional Crest */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-guni-crimson to-guni-navy p-1 shadow-md flex items-center justify-center shrink-0 border border-amber-300/40">
              <svg viewBox="0 0 100 100" className="w-full h-full text-amber-300 fill-current">
                {/* Sunburst Rays / Wheel */}
                <circle cx="50" cy="50" r="44" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeDasharray="3,2" />
                <circle cx="50" cy="50" r="38" fill="#0F2C59" stroke="#990000" strokeWidth="2" />
                {/* Flame of Knowledge */}
                <path d="M50 20 C45 32, 42 36, 44 45 C46 41, 50 37, 50 34 C50 37, 54 41, 56 45 C58 36, 55 32, 50 20 Z" fill="#F59E0B" />
                <path d="M50 26 C47 34, 46 38, 48 44 C50 40, 52 38, 50 26 Z" fill="#FEF08A" />
                {/* Open Book */}
                <path d="M30 66 C38 60, 47 62, 50 67 C53 62, 62 60, 70 66 L68 53 C61 48, 53 50, 50 54 C47 50, 39 48, 32 53 Z" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />
                {/* Book Spines */}
                <path d="M50 54 L50 67" stroke="#0F2C59" strokeWidth="1.5" />
                {/* Wreath base */}
                <path d="M34 76 Q50 82 66 76" fill="none" stroke="#D4AF37" strokeWidth="2" />
              </svg>
            </div>

            {/* University & Centre Brand Names */}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-guni-crimson tracking-tight text-lg sm:text-xl font-serif">
                  GANPAT UNIVERSITY
                </h1>
                <span className="hidden sm:inline-block bg-guni-navy text-white text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
                  State Private Univ
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-bold text-guni-navy text-xs sm:text-sm tracking-wide">
                  Centre for Advanced Research Studies (CARS)
                </span>
                <span className="bg-amber-100 text-amber-900 font-extrabold text-[9px] px-1.5 py-0.2 rounded border border-amber-300">
                  R&D Portal
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden md:block">
                Under Executive Direction of Dr. Ajay Kumar Gupta (Director) & Dr. Heena Patel (Deputy Director)
              </p>
            </div>
          </div>

          {/* Right Header Section: Primary Action & Persona Switcher */}
          <div className="flex items-center gap-3">
            
            {/* PROMINENT ACTION BUTTON: Generate Official PDF Report (Restricted to CARS Executive) */}
            {currentRole === 'CARS_ADMIN' && (
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="relative group overflow-hidden px-4 py-2 bg-gradient-to-r from-guni-crimson to-red-800 hover:from-guni-crimsonDark hover:to-guni-crimson text-white font-bold rounded-xl text-xs shadow-md hover:shadow-red-900/20 border border-amber-300/30 flex items-center gap-2 transition-all active:scale-98 animate-in fade-in"
                title="Generate Official Statutory Research Report under Dr. Heena Patel & GUNI"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-12 -translate-x-full group-hover:translate-x-300 transition-transform duration-1000"></div>
                <FileText className="w-4 h-4 text-amber-300 shrink-0" />
                <div className="text-left hidden sm:block">
                  <span className="block leading-tight font-extrabold">Generate Report</span>
                  <span className="text-[9px] text-amber-200/90 font-medium block">Official GUNI PDF</span>
                </div>
                <span className="sm:hidden font-extrabold">PDF Report</span>
              </button>
            )}

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2 text-slate-600 hover:text-guni-navy hover:bg-slate-100 rounded-xl relative transition-colors border border-slate-200"
                title="Audit & Realization Notifications"
              >
                <Bell className="w-4 h-4" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-guni-crimson rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 mb-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">CARS Live Alerts</span>
                    <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-semibold">Real-time</span>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs transition-colors border border-slate-100">
                        <p className="text-slate-800 font-medium leading-snug">{n.text}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Persona Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-xl border border-slate-200 transition-all text-left"
              >
                <currentRoleObj.icon className="w-4 h-4 text-guni-navy" />
                <div className="hidden md:block">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">{currentRoleObj.label}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${currentRoleObj.badge}`}>
                      ACTIVE
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-1" />
              </button>

              {/* Role Menu */}
              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Stakeholder Persona</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">Explore how each campus role interacts with the CARS engine</p>
                  </div>
                  <div className="space-y-1">
                    {roles.map(r => {
                      const isSelected = r.id === currentRole;
                      const Icon = r.icon;
                      return (
                        <button
                          key={r.id}
                          onClick={() => {
                            setCurrentRole(r.id);
                            setRoleMenuOpen(false);
                            if (r.id === 'PUBLIC') setActiveTab('showcase');
                            if (r.id === 'STUDENT') setActiveTab('student');
                            if (r.id === 'FACULTY') setActiveTab('faculty');
                            if (r.id === 'COORDINATOR') setActiveTab('coordinator');
                            if (r.id === 'CARS_ADMIN') setActiveTab('executive');
                          }}
                          className={`w-full p-2.5 rounded-xl text-left flex items-start gap-3 transition-all ${
                            isSelected ? 'bg-red-50/70 border border-red-200' : 'hover:bg-slate-50 border border-transparent'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-guni-crimson text-white' : 'bg-slate-100 text-slate-600'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900">{r.label}</span>
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-guni-crimson" />}
                            </div>
                            <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{r.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Tier 3: Primary Institutional Navigation Bar */}
      <div className="bg-slate-100/90 border-b border-slate-200 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-1.5 scrollbar-none">
          <nav className="flex items-center gap-1.5 min-w-max">
            <button
              onClick={() => setActiveTab('showcase')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'showcase' 
                  ? 'bg-guni-navy text-white shadow-xs' 
                  : 'text-slate-600 hover:text-guni-navy hover:bg-slate-200/60'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Showcase & CoE Portal</span>
            </button>

            {(currentRole === 'STUDENT' || currentRole === 'CARS_ADMIN') && (
              <button
                onClick={() => setActiveTab('student')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'student' 
                    ? 'bg-guni-navy text-white shadow-xs' 
                    : 'text-slate-600 hover:text-guni-navy hover:bg-slate-200/60'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student Hub</span>
              </button>
            )}

            {(currentRole === 'FACULTY' || currentRole === 'CARS_ADMIN') && (
              <button
                onClick={() => setActiveTab('faculty')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'faculty' 
                    ? 'bg-guni-navy text-white shadow-xs' 
                    : 'text-slate-600 hover:text-guni-navy hover:bg-slate-200/60'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Faculty Workspace</span>
              </button>
            )}

            {(currentRole === 'COORDINATOR' || currentRole === 'CARS_ADMIN') && (
              <button
                onClick={() => setActiveTab('coordinator')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'coordinator' 
                    ? 'bg-guni-navy text-white shadow-xs' 
                    : 'text-slate-600 hover:text-guni-navy hover:bg-slate-200/60'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Institute Queue</span>
              </button>
            )}

            {currentRole === 'CARS_ADMIN' && (
              <button
                onClick={() => setActiveTab('executive')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'executive' 
                    ? 'bg-guni-crimson text-white shadow-xs' 
                    : 'text-slate-700 hover:text-guni-crimson hover:bg-red-50'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>Executive & Rankings (Dr. Heena Patel)</span>
              </button>
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Backend Server: <strong>Port 5000 (Live)</strong>
            </span>
            <span>•</span>
            <span>NIRF RPC Engine Active</span>
          </div>
        </div>
      </div>
    </header>
  );
}
