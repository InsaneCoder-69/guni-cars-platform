import React, { useState } from 'react';
import { usePlatform } from '../context/PlatformContext';
import { 
  X, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Download, 
  FileText, 
  Award, 
  Users, 
  DollarSign, 
  Cpu, 
  BookOpen, 
  Rocket, 
  PlusCircle,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function ProjectDetailModal({ project, onClose }) {
  const { currentRole, addInstallment } = usePlatform();
  const [showAddTranche, setShowAddTranche] = useState(false);
  const [trancheAmt, setTrancheAmt] = useState('');
  const [trancheRef, setTrancheRef] = useState('');
  const [trancheDate, setTrancheDate] = useState(new Date().toISOString().split('T')[0]);

  if (!project) return null;

  const formatCurrency = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt || 0);
  };

  const getTrlDetails = (trl) => {
    if (trl <= 3) return { label: 'TRL 1-3: Proof of Concept & Basic Research', color: 'bg-amber-100 text-amber-900 border-amber-300' };
    if (trl <= 6) return { label: 'TRL 4-6: Technology Demonstration & Pilot Validation', color: 'bg-blue-100 text-blue-900 border-blue-300' };
    return { label: 'TRL 7-9: System Deployment & Commercialization Ready', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
  };

  const trlInfo = getTrlDetails(project.trl || 5);
  const pendingAmount = Math.max(0, (project.sanctionedAmount || 0) - (project.realizedAmount || 0));

  const handleAddInstallment = (e) => {
    e.preventDefault();
    if (!trancheAmt || isNaN(trancheAmt) || Number(trancheAmt) <= 0) return;

    const installment = {
      trancheNo: (project.installments ? project.installments.length : 0) + 1,
      date: trancheDate,
      amount: Number(trancheAmt),
      ref: trancheRef || `NEFT-${Math.floor(100000 + Math.random() * 900000)}`,
      ucSubmitted: true
    };

    addInstallment(project.id, installment);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    setShowAddTranche(false);
    setTrancheAmt('');
    setTrancheRef('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 flex justify-between items-start">
          <div className="space-y-1 pr-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                {project.id}
              </span>
              <span className="bg-slate-800 text-slate-200 text-xs font-semibold px-2 py-0.5 rounded">
                {project.category}
              </span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                project.status === 'Approved' ? 'bg-emerald-900/80 text-emerald-300 border-emerald-700' : 'bg-amber-900/80 text-amber-300 border-amber-700'
              }`}>
                {project.status === 'Approved' ? 'CARS Audit Verified' : 'Under Institute Review'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white leading-snug mt-2">
              {project.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
              <span><strong>Funding Body:</strong> {project.fundingAgency}</span>
              <span>•</span>
              <span><strong>Source:</strong> {project.fundingSourceType}</span>
              <span>•</span>
              <span><strong>Institute:</strong> {project.department} ({project.instituteId})</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-sm">
          {/* TRL Status Banner */}
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${trlInfo.color}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/80 flex items-center justify-center font-extrabold text-lg shadow-sm">
                {project.trl || 5}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block">Technology Readiness Level (TRL)</span>
                <span className="font-semibold text-sm">{trlInfo.label}</span>
              </div>
            </div>
            <div className="text-xs text-right font-medium">
              Duration: {project.startDate} to {project.endDate}
            </div>
          </div>

          {/* Financial Overview Grid (Protected: Restricted to Authorized University Personnel) */}
          {(currentRole === 'CARS_ADMIN' || currentRole === 'COORDINATOR' || currentRole === 'FACULTY') ? (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  Financial Realization & Revenue Ledger
                </h3>
                <button
                  onClick={() => setShowAddTranche(!showAddTranche)}
                  className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-lg border border-emerald-300 flex items-center gap-1.5 transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Log New Installment
                </button>
              </div>

              {/* Quick Financial Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Sanctioned</span>
                  <span className="text-base font-extrabold text-slate-900">{formatCurrency(project.sanctionedAmount)}</span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-[11px] font-semibold text-emerald-700 uppercase block">Realized in Bank</span>
                  <span className="text-base font-extrabold text-emerald-800">{formatCurrency(project.realizedAmount)}</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="text-[11px] font-semibold text-amber-700 uppercase block">Pending Tranche</span>
                  <span className="text-base font-extrabold text-amber-800">{formatCurrency(pendingAmount)}</span>
                </div>
                <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                  <span className="text-[11px] font-semibold text-indigo-700 uppercase block">PI Incentive Share</span>
                  <span className="text-base font-extrabold text-indigo-800">{formatCurrency(project.facultyIncentiveShare)}</span>
                </div>
              </div>

              {/* Add Installment Form (Conditional) */}
              {showAddTranche && (
                <form onSubmit={handleAddInstallment} className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl mb-4 animate-in fade-in">
                  <h4 className="font-bold text-xs text-emerald-900 uppercase tracking-wider mb-2">Record Realized Installment (CARS Accounts)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Installment Amount (₹)</label>
                      <input 
                        type="number" 
                        placeholder="e.g. 500000"
                        value={trancheAmt}
                        onChange={(e) => setTrancheAmt(e.target.value)}
                        required
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Bank Ref / Cheque No.</label>
                      <input 
                        type="text" 
                        placeholder="e.g. NEFT-DST-104918"
                        value={trancheRef}
                        onChange={(e) => setTrancheRef(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Date Realized</label>
                      <input 
                        type="date" 
                        value={trancheDate}
                        onChange={(e) => setTrancheDate(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button 
                      type="button" 
                      onClick={() => setShowAddTranche(false)}
                      className="px-3 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-4 py-1 text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg shadow-sm"
                    >
                      Confirm & Update Revenue
                    </button>
                  </div>
                </form>
              )}

              {/* Installments Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">Tranche #</th>
                      <th className="p-2.5">Date Realized</th>
                      <th className="p-2.5">Transaction Ref</th>
                      <th className="p-2.5">Amount (₹)</th>
                      <th className="p-2.5">Utilization Cert (UC)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {project.installments && project.installments.length > 0 ? (
                      project.installments.map((inst, i) => (
                        <tr key={i} className="hover:bg-slate-50/80">
                          <td className="p-2.5 font-bold text-slate-800">Tranche {inst.trancheNo || i + 1}</td>
                          <td className="p-2.5 text-slate-600">{inst.date}</td>
                          <td className="p-2.5 font-mono text-slate-600">{inst.ref}</td>
                          <td className="p-2.5 font-bold text-emerald-700">{formatCurrency(inst.amount)}</td>
                          <td className="p-2.5">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Audited & Cleared
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-4 text-center text-slate-400">No installments logged yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-200/80 rounded-lg text-slate-500">
                  <ShieldAlert className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">Financial Ledger & Bank Realization Protected</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Individual grant tranches, sanction amounts, and faculty revenue shares are confidential to authorized CARS executives and Principal Investigators.
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2.5 py-1 rounded-full uppercase shrink-0">
                Institutional Privacy
              </span>
            </div>
          )}

          {/* Research Team & Student Contributors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-brand-800" />
                Principal & Co-Investigators
              </h4>
              <div className="space-y-2">
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-xs font-bold text-brand-900 block">{project.principalInvestigator?.name}</span>
                  <span className="text-[11px] text-slate-500 block">{project.principalInvestigator?.department} ({project.principalInvestigator?.empId})</span>
                  <span className="text-[11px] text-blue-600">{project.principalInvestigator?.email}</span>
                </div>
                {project.coInvestigators && project.coInvestigators.map((co, i) => (
                  <div key={i} className="text-xs text-slate-600 pl-2 border-l-2 border-slate-300">
                    <strong>Co-PI:</strong> {co.name} ({co.institute})
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-cyan-600" />
                Student & Scholar Contributors
              </h4>
              {project.studentResearchers && project.studentResearchers.length > 0 ? (
                <div className="space-y-1.5">
                  {project.studentResearchers.map((stu, i) => (
                    <div key={i} className="p-2 bg-white rounded-lg border border-slate-200 text-xs">
                      <div className="flex justify-between">
                        <strong className="text-slate-800">{stu.name}</strong>
                        <span className="text-slate-400 text-[10px]">{stu.enrollment}</span>
                      </div>
                      <div className="text-slate-500 text-[11px]">{stu.role} • {stu.degree}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No student researchers registered for this project.</p>
              )}
            </div>
          </div>

          {/* Research Outputs & IP */}
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-purple-600" />
              Research Outputs, Patents & Intellectual Property
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Patents */}
              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200">
                <span className="text-xs font-bold text-purple-900 uppercase block mb-1">Patents ({project.patents?.length || 0})</span>
                {project.patents && project.patents.length > 0 ? (
                  project.patents.map((pat, i) => (
                    <div key={i} className="text-xs text-slate-700 mb-1">
                      <p className="font-semibold text-purple-950">{pat.title}</p>
                      <span className="text-[10px] text-slate-500">App: {pat.appNo} • {pat.status}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-slate-400">Nil</span>
                )}
              </div>

              {/* Prototypes */}
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200">
                <span className="text-xs font-bold text-blue-900 uppercase block mb-1">Prototypes ({project.prototypes?.length || 0})</span>
                {project.prototypes && project.prototypes.length > 0 ? (
                  project.prototypes.map((proto, i) => (
                    <div key={i} className="text-xs text-slate-700 mb-1">
                      <p className="font-semibold text-blue-950">{proto.name}</p>
                      <span className="text-[10px] text-slate-500">{proto.description}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-slate-400">Nil</span>
                )}
              </div>

              {/* Publications & Startups */}
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200">
                <span className="text-xs font-bold text-emerald-900 uppercase block mb-1">Publications & Startups</span>
                {project.publications && project.publications.length > 0 && (
                  <div className="text-xs text-slate-700 mb-2">
                    <p className="font-semibold text-emerald-950 truncate">{project.publications[0].title}</p>
                    <span className="text-[10px] text-slate-500">{project.publications[0].journal}</span>
                  </div>
                )}
                {project.startups && project.startups.length > 0 && (
                  <div className="text-xs bg-white p-1.5 rounded border border-emerald-200">
                    <span className="font-bold text-emerald-800 text-[11px]">🚀 Startup: {project.startups[0].name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Audit Verification Note */}
          <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Sanction Document: <strong>{project.sanctionLetter || 'Sanction_Letter.pdf'}</strong></span>
            </div>
            <span className="text-emerald-700 font-bold bg-emerald-100/80 px-2 py-0.5 rounded text-[11px]">
              Ready for NIRF & NAAC Filing
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
          <span className="text-xs text-slate-400">Ganpat University Centre for Advanced Research Studies (CARS)</span>
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs shadow transition-all"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
