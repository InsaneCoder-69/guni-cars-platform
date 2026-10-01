import React, { useState } from 'react';
import { usePlatform } from '../context/PlatformContext';
import { 
  ShieldCheck, 
  FileText, 
  Download, 
  CheckCircle2, 
  Loader2, 
  X, 
  Award, 
  Building2, 
  Calendar, 
  User, 
  FileSpreadsheet, 
  ExternalLink,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function GenerateReportModal({ onClose }) {
  const { 
    totalRealizedRevenue, 
    totalSanctionedAmount, 
    totalTargetAchievementPct, 
    projects,
    generateOfficialPdfReport
  } = usePlatform();

  const [formData, setFormData] = useState({
    executiveName: 'Dr. Heena Patel',
    designation: 'Deputy Director - CARS (Centre for Advanced Research Studies)',
    directorName: 'Dr. Ajay Kumar Gupta',
    directorDesignation: 'Director - CARS (Centre for Advanced Research Studies)',
    academicYear: '2025–26',
    scope: 'All Constituent Institutes & Centres of Excellence'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const formatCurrency = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt || 0);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setErrorMsg('');
    setGenerationProgress('Compiling verified project ledger from backend database...');

    try {
      setTimeout(() => {
        setGenerationProgress('Generating official GUNI letterhead & NIRF/NAAC statutory tables...');
      }, 700);

      setTimeout(() => {
        setGenerationProgress('Rendering publication-grade PDF via Chrome rendering engine...');
      }, 1400);

      await generateOfficialPdfReport(formData);

      setIsGenerating(false);
      setDownloadSuccess(true);
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Report Generation Error:', err);
      setIsGenerating(false);
      setErrorMsg(err.message || 'Failed to generate PDF. Ensure the backend server is running and accessible.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header with GUNI Crimson Banner */}
        <div className="bg-gradient-to-r from-guni-crimson via-red-900 to-guni-navy text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-300" />
              Official Statutory Document
            </span>
            <span className="text-white/70 text-xs font-medium">NAAC Grade 'A' • NIRF RPC Compliant</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-amber-400 shrink-0" />
            Generate Executive CARS Research Report
          </h2>
          <p className="text-xs sm:text-sm text-red-100/90 mt-1 max-w-lg">
            Directly compiled under the seal of <strong>Dr. Heena Patel</strong> and <strong>Ganpat University</strong> with live audited financials against the ₹4.25 Cr target.
          </p>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleGenerate} className="p-6 space-y-6">
          
          {/* Live Data Highlights Box */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Audited Real-Time Dataset to be Injected
            </span>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
                <span className="text-[10px] text-slate-500 block">Realized Cash</span>
                <span className="text-sm font-extrabold text-emerald-700">{formatCurrency(totalRealizedRevenue)}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
                <span className="text-[10px] text-slate-500 block">Sanctioned Value</span>
                <span className="text-sm font-extrabold text-blue-900">{formatCurrency(totalSanctionedAmount)}</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
                <span className="text-[10px] text-slate-500 block">Quota Achieved</span>
                <span className="text-sm font-extrabold text-guni-crimson">{totalTargetAchievementPct}%</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1.5 justify-center">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Includes {projects.length} verified projects across UVPCE, SKPCER, Science, Agriculture & CoE labs.</span>
            </p>
          </div>

          {/* Configuration Parameters */}
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-800 block mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-guni-crimson" />
                  Primary Signatory (CARS Deputy Director)
                </label>
                <input 
                  type="text" 
                  value={formData.executiveName}
                  onChange={(e) => setFormData({ ...formData, executiveName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:bg-white focus:border-guni-crimson focus:ring-1 focus:ring-guni-crimson outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-900" />
                  Designation / Role
                </label>
                <input 
                  type="text" 
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:bg-white focus:border-guni-crimson outline-none transition-all text-[11px]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-800 block mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-900" />
                  CARS Director Co-Signatory
                </label>
                <input 
                  type="text" 
                  value={formData.directorName}
                  onChange={(e) => setFormData({ ...formData, directorName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:bg-white focus:border-guni-crimson outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  Reporting Financial Year
                </label>
                <input 
                  type="text" 
                  value={formData.academicYear}
                  onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:bg-white focus:border-guni-crimson outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-700" />
                Institutional Scope Included
              </label>
              <input 
                type="text" 
                value={formData.scope}
                onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 focus:bg-white focus:border-guni-crimson outline-none transition-all text-xs"
                required
              />
            </div>
          </div>

          {/* Included Statutory Sections Checklist */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-900 space-y-1.5">
            <span className="font-bold block text-[11px] uppercase tracking-wider text-amber-950 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
              Automated Statutory Document Structure:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-amber-900">
              <span className="flex items-center gap-1">✓ Official GUNI Crest & CARS Seal</span>
              <span className="flex items-center gap-1">✓ Institute Target vs Realization Quotas</span>
              <span className="flex items-center gap-1">✓ NIRF FSR (Sponsored Research) Table</span>
              <span className="flex items-center gap-1">✓ NIRF FCP (Consultancy) Table</span>
              <span className="flex items-center gap-1">✓ NAAC Criterion 3 Metrics 3.2.1 & 3.5.1</span>
              <span className="flex items-center gap-1">✓ Verified Digital Cryptographic Block</span>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success Message */}
          {downloadSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Report Successfully Generated & Downloaded!
              </div>
              <p className="text-emerald-700 text-[11px]">
                The official publication PDF has been generated under the seal of Dr. Heena Patel and saved directly to your computer.
              </p>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <span className="text-[11px] text-slate-500 text-center sm:text-left">
              Rendered via Headless Chromium Backend Service
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors"
              >
                Close
              </button>

              <button
                type="submit"
                disabled={isGenerating}
                className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2 transition-all ${
                  isGenerating 
                    ? 'bg-slate-400 cursor-not-allowed' 
                    : 'bg-guni-crimson hover:bg-guni-crimsonDark hover:shadow-red-900/20 active:scale-98'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{generationProgress || 'Generating PDF...'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Generate Official Report (PDF)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
