import React, { useState } from 'react';
import { usePlatform } from '../context/PlatformContext';
import { X, Send, Building2, User, Mail, Phone, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

export function InquiryModal({ initialFacility, onClose }) {
  const { submitInquiry, coeFacilities, instituteStats } = usePlatform();
  const [clientName, setClientName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [targetInstitute, setTargetInstitute] = useState(initialFacility ? 'COE' : 'FOET');
  const [serviceRequested, setServiceRequested] = useState(
    initialFacility ? `Consultancy / Testing for ${initialFacility.name}` : ''
  );
  const [budgetEstimated, setBudgetEstimated] = useState('₹5,00,000');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitInquiry({
      clientName,
      contactPerson,
      email,
      phone,
      targetInstitute,
      serviceRequested,
      budgetEstimated
    });
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in">
        <div className="bg-brand-900 text-white p-5 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-base">Request Research & Technical Consultancy</h3>
            <p className="text-xs text-blue-200">Connect with Ganpat University CARS Innovation Cells</p>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h4 className="text-lg font-bold text-slate-900">Inquiry Dispatched to CARS</h4>
            <p className="text-xs text-slate-500">
              Your consultancy request has been registered in the CARS Executive queue. An institute coordinator will reach out within 24 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Company / Organization Name *</label>
              <input 
                type="text"
                placeholder="e.g. L&T Defence / Zydus Lifesciences"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Contact Person *</label>
                <input 
                  type="text"
                  placeholder="e.g. Dr. Rajesh Shah"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-800"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Official Email *</label>
                <input 
                  type="email"
                  placeholder="e.g. r.shah@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                <input 
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-800"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Institute / CoE *</label>
                <select 
                  value={targetInstitute}
                  onChange={(e) => setTargetInstitute(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-800 bg-white"
                >
                  <option value="COE">Centres of Excellence (3D Printing / 5G / Bosch)</option>
                  <option value="FOET">Faculty of Engineering & Tech (UVPCE)</option>
                  <option value="SKPCER">Faculty of Pharmacy (SKPCER)</option>
                  <option value="MUIS">Faculty of Science (MUIS)</option>
                  <option value="DCS">Faculty of Computer Applications</option>
                  <option value="AGRI">Faculty of Agriculture</option>
                  <option value="ARCH">Architecture & Planning</option>
                  <option value="HEALTH">Health & Physiotherapy</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Consultancy Scope / Problem Statement *</label>
              <textarea 
                rows="3"
                placeholder="Describe your technical challenge, testing requirement, or prototype specification..."
                value={serviceRequested}
                onChange={(e) => setServiceRequested(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-800"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Estimated Budget Allocation</label>
              <select 
                value={budgetEstimated}
                onChange={(e) => setBudgetEstimated(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-800 bg-white"
              >
                <option value="Below ₹2,00,000">Below ₹2,00,000 (Testing / Short Audit)</option>
                <option value="₹2,00,000 - ₹5,00,000">₹2,00,000 - ₹5,00,000 (PoC / Machine Trials)</option>
                <option value="₹5,00,000 - ₹15,00,000">₹5,00,000 - ₹15,00,000 (Turnkey R&D Contract)</option>
                <option value="Above ₹15,00,000">Above ₹15,00,000 (Sponsored Research & Technology Transfer)</option>
              </select>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button 
                type="button" 
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-5 py-2 bg-brand-900 hover:bg-brand-950 text-white font-bold rounded-lg shadow-md flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
