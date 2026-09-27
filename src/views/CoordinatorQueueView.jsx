import React, { useState } from 'react';
import { usePlatform } from '../context/PlatformContext';
import { 
  SlidersHorizontal, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Building2, 
  FileText, 
  TrendingUp, 
  Eye, 
  Filter, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { INSTITUTES } from '../data/seedData';
import confetti from 'canvas-confetti';

export function CoordinatorQueueView({ onOpenProject }) {
  const { 
    projects, 
    approveProject, 
    coordinatorInstitute, 
    setCoordinatorInstitute, 
    instituteStats 
  } = usePlatform();

  const [approvalNote, setApprovalNote] = useState('Sanction order verified with University Accounts Section.');
  const [activeTab, setActiveTab] = useState('pending');

  const currentInst = instituteStats.find(i => i.id === coordinatorInstitute) || instituteStats[0];

  const formatCurrency = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt || 0);
  };

  const instProjects = projects.filter(p => p.instituteId === coordinatorInstitute);
  const pendingProjects = instProjects.filter(p => p.status === 'Under Review');
  const approvedProjects = instProjects.filter(p => p.status === 'Approved');

  const handleApprove = (projId) => {
    approveProject(projId, approvalNote);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  const gapToTarget = Math.max(0, currentInst.targetAmt - currentInst.realized);

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Header & Institute Switcher */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded uppercase">
              Institute Verification Cell
            </span>
            <span className="text-xs text-slate-400">Department Auditing & Quota Monitoring</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            {currentInst.name}
          </h1>
          <p className="text-xs text-slate-500">
            Review department research projects, verify sanction letters, and monitor progress toward your annual target.
          </p>
        </div>

        {/* Change Coordinator Institute Context */}
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-slate-600 pl-2">Switch Institute:</span>
          <select 
            value={coordinatorInstitute} 
            onChange={(e) => setCoordinatorInstitute(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-brand-900 focus:ring-2 focus:ring-brand-800 shadow-sm"
          >
            {INSTITUTES.map(inst => (
              <option key={inst.id} value={inst.id}>{inst.shortName} (Target: ₹{inst.targetCr} Cr)</option>
            ))}
          </select>
        </div>
      </div>

      {/* Target Progress Card */}
      <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white p-6 rounded-3xl shadow-lg border border-slate-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <span className="text-xs text-blue-300 uppercase font-bold tracking-wider">Annual Consultancy Target Benchmark</span>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-3xl font-extrabold text-white">{formatCurrency(currentInst.realized)}</span>
              <span className="text-slate-400 text-sm">of ₹{currentInst.targetCr} Cr Quota</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-emerald-400">{currentInst.percent}%</span>
            <span className="text-[11px] text-slate-400 block">Quota Achieved</span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-800 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-700">
          <div 
            className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-700" 
            style={{ width: `${currentInst.percent}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800/80">
          <span>Gap remaining to hit quota: <strong className="text-amber-400">{formatCurrency(gapToTarget)}</strong></span>
          <span>{instProjects.length} projects registered under this institute</span>
        </div>
      </div>

      {/* Verification Queue & Active Ledger */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('pending')}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'pending'
                  ? 'bg-amber-100 text-amber-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Pending Verification ({pendingProjects.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'approved'
                  ? 'bg-emerald-100 text-emerald-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Approved & Cleared ({approvedProjects.length})</span>
            </button>
          </div>
        </div>

        {/* Pending Queue Content */}
        {activeTab === 'pending' && (
          <div>
            {pendingProjects.length === 0 ? (
              <div className="p-12 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-slate-800">Verification Queue is Clear!</h4>
                <p className="text-xs text-slate-400">All submitted projects for {currentInst.shortName} have been vetted and approved for CARS reporting.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {pendingProjects.map(proj => (
                  <div key={proj.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-amber-50/20">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {proj.id}
                        </span>
                        <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
                          Awaiting Sanction Clearance
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900">{proj.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span><strong>PI:</strong> {proj.principalInvestigator?.name}</span>
                        <span>•</span>
                        <span><strong>Sponsor:</strong> {proj.fundingAgency}</span>
                        <span>•</span>
                        <span><strong>Sanctioned:</strong> {formatCurrency(proj.sanctionedAmount)}</span>
                        <span>•</span>
                        <span><strong>Document:</strong> {proj.sanctionLetter || 'Sanction_Order.pdf'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <button
                        onClick={() => onOpenProject(proj)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Inspect Dossier
                      </button>
                      <button
                        onClick={() => handleApprove(proj.id)}
                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Approve & Verify
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Approved Projects Content */}
        {activeTab === 'approved' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
                <tr>
                  <th className="p-3 pl-6">Project ID & Title</th>
                  <th className="p-3">PI Name</th>
                  <th className="p-3">Funding Agency</th>
                  <th className="p-3">Sanctioned</th>
                  <th className="p-3">Realized Revenue</th>
                  <th className="p-3 pr-6 text-right">Dossier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {approvedProjects.map(proj => (
                  <tr key={proj.id} className="hover:bg-slate-50/80">
                    <td className="p-3 pl-6 max-w-xs">
                      <span className="font-mono text-[10px] text-slate-500 font-bold block">{proj.id}</span>
                      <p className="font-bold text-slate-900 truncate">{proj.title}</p>
                    </td>
                    <td className="p-3 text-slate-700 font-medium">{proj.principalInvestigator?.name}</td>
                    <td className="p-3 text-slate-600">{proj.fundingAgency}</td>
                    <td className="p-3 font-semibold text-slate-800">{formatCurrency(proj.sanctionedAmount)}</td>
                    <td className="p-3 font-bold text-emerald-700">{formatCurrency(proj.realizedAmount)}</td>
                    <td className="p-3 pr-6 text-right">
                      <button
                        onClick={() => onOpenProject(proj)}
                        className="text-brand-800 hover:underline font-bold"
                      >
                        View &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
