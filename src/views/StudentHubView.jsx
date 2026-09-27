import React, { useState } from 'react';
import { usePlatform } from '../context/PlatformContext';
import { 
  GraduationCap, 
  Sparkles, 
  Send, 
  Award, 
  FilePlus, 
  Briefcase, 
  Rocket, 
  Clock, 
  CheckCircle2, 
  DollarSign,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function StudentHubView({ onOpenProject }) {
  const { studentOpenings, projects, addProject, currentRole } = usePlatform();
  const [showIntakeForm, setShowIntakeForm] = useState(false);
  const [appliedOpenings, setAppliedOpenings] = useState({});

  // Student Form State
  const [studentName, setStudentName] = useState('Vatsal Trivedi');
  const [enrollment, setEnrollment] = useState('19012011045');
  const [institute, setInstitute] = useState('FOET');
  const [degree, setDegree] = useState('B.Tech CSE');
  const [projectTitle, setProjectTitle] = useState('');
  const [grantSource, setGrantSource] = useState('Student Startup & Innovation Policy (SSIP 2.0)');
  const [fundingAmount, setFundingAmount] = useState('');
  const [facultyMentor, setFacultyMentor] = useState('Dr. Ketan Patel');
  const [mentorEmail, setMentorEmail] = useState('ketan.patel@ganpatuniversity.ac.in');
  const [trlLevel, setTrlLevel] = useState(4);
  const [submitted, setSubmitted] = useState(false);

  // Student specific initiatives
  const studentProjects = projects.filter(p => 
    p.category === 'Student Innovation (SSIP)' || 
    (p.studentResearchers && p.studentResearchers.some(s => s.name.toLowerCase().includes('vatsal') || s.enrollment))
  );

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (!projectTitle || !fundingAmount) return;

    addProject({
      title: projectTitle,
      category: 'Student Innovation (SSIP)',
      fundingAgency: grantSource,
      fundingSourceType: 'Internal Seed Grant',
      principalInvestigator: {
        name: `${facultyMentor} (Faculty Mentor)`,
        empId: 'GUNI-FAC-MENTOR',
        institute: institute,
        department: degree,
        email: mentorEmail
      },
      coInvestigators: [],
      studentResearchers: [
        { name: studentName, enrollment: enrollment, role: 'Lead Student Innovator', degree: degree }
      ],
      instituteId: institute,
      department: degree,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-06-30',
      trl: Number(trlLevel),
      sanctionedAmount: Number(fundingAmount),
      initialRealizedAmount: Number(fundingAmount),
      industryCashContribution: 0,
      industryInKindValue: 0,
      technologyLicensingRevenue: 0,
      facultyIncentiveShare: 0,
      patents: [],
      prototypes: [
        { name: `${projectTitle.slice(0, 25)} Prototype`, description: 'Working student validation unit', trl: Number(trlLevel) }
      ],
      publications: [],
      startups: [],
      mous: [],
      sanctionLetterName: `SSIP_Sanction_${studentName.replace(/\s+/g, '_')}.pdf`
    });

    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowIntakeForm(false);
      setProjectTitle('');
      setFundingAmount('');
    }, 2000);
  };

  const handleApply = (oppId) => {
    setAppliedOpenings(prev => ({ ...prev, [oppId]: true }));
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
  };

  const formatCurrency = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt || 0);
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Student Hub Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-8 shadow-xl border border-indigo-900/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-cyan-300" />
              Student & Research Scholar Innovation Wing
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              Get Your Project Funded & Recognized at Ganpat University
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Whether you won an SSIP grant, built a hackathon prototype, or want to join funded faculty research projects in 5G, Additive Manufacturing, or Pharma, this portal gives your innovation institutional visibility.
            </p>
          </div>
          <button
            onClick={() => setShowIntakeForm(!showIntakeForm)}
            className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/30 flex items-center gap-2 transition-all shrink-0"
          >
            <FilePlus className="w-4 h-4" />
            <span>Register Your Funded Project</span>
          </button>
        </div>
      </div>

      {/* Student Intake Form Modal / Card */}
      {showIntakeForm && (
        <div className="bg-white p-6 rounded-2xl border-2 border-cyan-300 shadow-xl animate-in fade-in">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-cyan-600" />
                Register Student Research Grant / Hackathon / SSIP Project
              </h3>
              <p className="text-xs text-slate-500">Document your grant so it is credited to your department and added to NIRF student innovation filings.</p>
            </div>
            <button 
              onClick={() => setShowIntakeForm(false)}
              className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
            >
              ✕
            </button>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">Student Grant Registered Successfully!</h4>
              <p className="text-xs text-slate-500">Your mentor has been tagged and the project is now queued for institute coordinator verification.</p>
            </div>
          ) : (
            <form onSubmit={handleStudentSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Student Name *</label>
                  <input 
                    type="text" 
                    value={studentName} 
                    onChange={(e) => setStudentName(e.target.value)}
                    required 
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Enrollment No. *</label>
                  <input 
                    type="text" 
                    value={enrollment} 
                    onChange={(e) => setEnrollment(e.target.value)}
                    required 
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Institute *</label>
                  <select 
                    value={institute} 
                    onChange={(e) => setInstitute(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white font-semibold"
                  >
                    <option value="FOET">FOET / UVPCE</option>
                    <option value="SKPCER">SKPCER (Pharmacy)</option>
                    <option value="MUIS">MUIS (Science)</option>
                    <option value="DCS">DCS / AMPICS</option>
                    <option value="FODE">FODE (Diploma)</option>
                    <option value="AGRI">Agriculture</option>
                    <option value="ARCH">Architecture</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Degree / Branch *</label>
                  <input 
                    type="text" 
                    value={degree} 
                    onChange={(e) => setDegree(e.target.value)}
                    required 
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Innovation / Project Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g. AI-Based Crop Disease Detector using Multispectral Camera"
                  value={projectTitle} 
                  onChange={(e) => setProjectTitle(e.target.value)}
                  required 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Grant / Funding Scheme *</label>
                  <select 
                    value={grantSource} 
                    onChange={(e) => setGrantSource(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Student Startup & Innovation Policy (SSIP 2.0)">SSIP 2.0 Grant</option>
                    <option value="Smart Gujarat Hackathon Award">Smart Gujarat Hackathon Winner</option>
                    <option value="National Hackathon Grant">National Hackathon Grant</option>
                    <option value="GUNI Incubation Seed Fund">GUNI Incubation Seed Fund</option>
                    <option value="Corporate CSR Student Grant">Corporate CSR Student Grant</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Sanctioned Amount (₹) *</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 250000"
                    value={fundingAmount} 
                    onChange={(e) => setFundingAmount(e.target.value)}
                    required 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Current Readiness (TRL) *</label>
                  <select 
                    value={trlLevel} 
                    onChange={(e) => setTrlLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value={3}>TRL 3: Proof of Concept Tested</option>
                    <option value={4}>TRL 4: Lab Prototype Built</option>
                    <option value={5}>TRL 5: Validated in Relevant Environment</option>
                    <option value={6}>TRL 6: Prototype Demonstrated</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Faculty Mentor Name *</label>
                  <input 
                    type="text" 
                    value={facultyMentor} 
                    onChange={(e) => setFacultyMentor(e.target.value)}
                    required 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mentor Email *</label>
                  <input 
                    type="email" 
                    value={mentorEmail} 
                    onChange={(e) => setMentorEmail(e.target.value)}
                    required 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowIntakeForm(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg shadow flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Grant Details
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Open Research Opportunities Board */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              Campus Research Openings
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">Paid Student Research Positions & Internships</h2>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">Funded through government and corporate grants</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studentOpenings.map(opp => {
            const hasApplied = appliedOpenings[opp.id];
            return (
              <div key={opp.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-all">
                <div className="space-y-2.5">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {opp.institute}
                    </span>
                    <span className="text-[10px] text-slate-400">Deadline: {opp.deadline}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">{opp.title}</h3>
                  <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 block">Stipend:</span>
                    <span className="font-extrabold text-emerald-900">{opp.stipend}</span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p><strong>Faculty PI:</strong> {opp.piName}</p>
                    <p><strong>Eligibility:</strong> {opp.eligibility}</p>
                    <p className="text-[11px] text-slate-500"><strong>Skills:</strong> {opp.skills}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  {hasApplied ? (
                    <div className="w-full py-2 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Application Submitted!
                    </div>
                  ) : (
                    <button
                      onClick={() => handleApply(opp.id)}
                      className="w-full py-2 bg-brand-900 hover:bg-brand-950 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                    >
                      <span>Apply for Research Slot</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Student Research Innovations in Progress */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Active Student Innovations & Funded Ventures
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studentProjects.map(proj => (
            <div key={proj.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-cyan-800 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded">
                    Student Grant ({proj.category})
                  </span>
                  <span className="text-xs font-bold text-emerald-700">{formatCurrency(proj.sanctionedAmount)}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">{proj.title}</h4>
                <p className="text-xs text-slate-500 mb-2">Scheme: {proj.fundingAgency}</p>
                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                  <p><strong>Student Lead:</strong> {proj.studentResearchers?.[0]?.name} ({proj.studentResearchers?.[0]?.degree})</p>
                  <p><strong>Mentor:</strong> {proj.principalInvestigator?.name}</p>
                </div>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-400">TRL {proj.trl} Verified</span>
                <button
                  onClick={() => onOpenProject(proj)}
                  className="font-bold text-brand-800 hover:underline flex items-center gap-1"
                >
                  View Details & Patents &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
