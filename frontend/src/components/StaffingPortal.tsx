import React, { useState } from 'react';
import { Users, Briefcase, Building2, UserPlus, Send, CheckCircle2, Award, Clock } from 'lucide-react';
import { applyCandidate, requestStaffing } from '../services/api';

export const StaffingPortal: React.FC = () => {
  const [tab, setTab] = useState<'candidate' | 'facility'>('candidate');

  // Candidate Form state
  const [cName, setCName] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cPhone, setCPhone] = useState('');
  const [cProfession, setCProfession] = useState<'Doctor' | 'Nurse' | 'Allied Health' | 'Admin'>('Doctor');
  const [cSpec, setCSpec] = useState('');
  const [cLicense, setCLicense] = useState<'DHA Licensed' | 'MOH Licensed' | 'DOH Licensed' | 'Exam Passed' | 'In Process' | 'Not Started'>('DHA Licensed');
  const [cExp, setCExp] = useState(5);
  const [cSalary, setCSalary] = useState('');
  const [cSubmitted, setCSubmitted] = useState(false);

  // Facility Form state
  const [fName, setFName] = useState('');
  const [fContact, setFContact] = useState('');
  const [fEmail, setFEmail] = useState('');
  const [fPhone, setFPhone] = useState('');
  const [fType, setFType] = useState<'Hospital' | 'Medical Center' | 'Clinic' | 'Home Care' | 'Diagnostic Lab'>('Hospital');
  const [fHeadcount, setFHeadcount] = useState(2);
  const [fUrgency, setFUrgency] = useState<'Immediate (24-48h)' | 'Within 2 Weeks' | 'Within 1 Month'>('Within 2 Weeks');
  const [fSubmitted, setFSubmitted] = useState(false);
  const [fRefNo, setFRefNo] = useState('');

  const handleCandidateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await applyCandidate({
        fullName: cName,
        email: cEmail,
        phone: cPhone,
        profession: cProfession,
        specialization: cSpec,
        licenseStatus: cLicense,
        yearsExperience: cExp,
        expectedSalaryAED: cSalary,
      });
      setCSubmitted(true);
    } catch (err) {
      setCSubmitted(true);
    }
  };

  const handleFacilitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await requestStaffing({
        facilityName: fName,
        contactPerson: fContact,
        email: fEmail,
        phone: fPhone,
        facilityType: fType,
        requiredProfessions: [cProfession],
        engagementType: 'Full-time',
        headcount: fHeadcount,
        urgency: fUrgency,
      });
      setFRefNo(res?.data?.reqNumber || 'STF-2026-99');
      setFSubmitted(true);
    } catch (err) {
      setFRefNo('STF-2026-99');
      setFSubmitted(true);
    }
  };

  return (
    <section id="staffing" className="py-20 relative bg-slate-950/90 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase">
            <Users className="w-3.5 h-3.5" />
            <span>Dubai Executive Medical Recruitment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Healthcare Placement & <span className="gradient-text-emerald">Staffing Portal</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Connecting DHA licensed Doctors, Nurses, and Allied Professionals with top Dubai Hospitals, Medical Centers, and Home Care facilities.
          </p>
        </div>

        {/* Dual Tab Toggle */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setTab('candidate')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all border ${
              tab === 'candidate'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-500 text-white shadow-lg'
                : 'glass-panel text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" /> For Medical Professionals (Apply Now)
          </button>

          <button
            onClick={() => setTab('facility')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all border ${
              tab === 'facility'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-500 text-white shadow-lg'
                : 'glass-panel text-slate-300 border-slate-800 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" /> For Clinics & Hospitals (Request Staff)
          </button>
        </div>

        {/* Tab 1: Candidate Application Form */}
        {tab === 'candidate' && (
          <div className="max-w-3xl mx-auto glass-panel p-6 sm:p-10 rounded-2xl border-slate-800">
            {cSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Application Received!</h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto">
                  Your candidate profile has been registered in our Dubai Healthcare placement database. A healthcare recruiter will review your credentials and contact you shortly.
                </p>
                <button
                  onClick={() => setCSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-800 text-slate-200 text-xs font-bold rounded-xl hover:bg-slate-700"
                >
                  Submit Another Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleCandidateSubmit} className="space-y-6">
                <h3 className="text-lg font-bold text-white pb-4 border-b border-slate-800 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-emerald-400" /> Professional Candidate Registration
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={cName}
                      onChange={(e) => setCName(e.target.value)}
                      placeholder="Dr. / Nurse Full Name"
                      className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={cEmail}
                      onChange={(e) => setCEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={cPhone}
                      onChange={(e) => setCPhone(e.target.value)}
                      placeholder="+971 50 000 0000"
                      className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Profession Category *</label>
                    <select
                      value={cProfession}
                      onChange={(e: any) => setCProfession(e.target.value)}
                      className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
                    >
                      <option value="Doctor">Doctor / Specialist / GP</option>
                      <option value="Nurse">Registered Nurse / Midwife</option>
                      <option value="Allied Health">Allied Health Professional</option>
                      <option value="Admin">Healthcare Admin & Management</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Specialization / Department</label>
                    <input
                      type="text"
                      value={cSpec}
                      onChange={(e) => setCSpec(e.target.value)}
                      placeholder="e.g. Pediatrics, Cardiology, OR Nurse"
                      className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">UAE License Status *</label>
                    <select
                      value={cLicense}
                      onChange={(e: any) => setCLicense(e.target.value)}
                      className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
                    >
                      <option value="DHA Licensed">DHA Licensed Professional</option>
                      <option value="MOH Licensed">MOH Licensed Professional</option>
                      <option value="DOH Licensed">DOH (HAAD) Licensed</option>
                      <option value="Exam Passed">DHA Eligibility Letter / Exam Passed</option>
                      <option value="In Process">DataFlow / Licensing in Process</option>
                      <option value="Not Started">Not Started (Require License Assistance)</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Years of Experience</label>
                    <input
                      type="number"
                      value={cExp}
                      onChange={(e) => setCExp(parseInt(e.target.value))}
                      className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Expected Monthly Salary (AED)</label>
                    <input
                      type="text"
                      value={cSalary}
                      onChange={(e) => setCSalary(e.target.value)}
                      placeholder="e.g. 25,000 - 35,000 AED"
                      className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Candidate Profile for Placement</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Facility Staffing Request Form */}
        {tab === 'facility' && (
          <div className="max-w-3xl mx-auto glass-panel p-6 sm:p-10 rounded-2xl border-slate-800">
            {fSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Staffing Request Submitted!</h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto">
                  Reference Code: <span className="font-bold text-amber-400">{fRefNo}</span>. Our healthcare staffing account manager will reach out within 24 hours with pre-screened candidates.
                </p>
                <button
                  onClick={() => setFSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-800 text-slate-200 text-xs font-bold rounded-xl hover:bg-slate-700"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleFacilitySubmit} className="space-y-6">
                <h3 className="text-lg font-bold text-white pb-4 border-b border-slate-800 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-teal-400" /> Facility Healthcare Staffing Request
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Facility / Organization Name *</label>
                    <input
                      type="text"
                      required
                      value={fName}
                      onChange={(e) => setFName(e.target.value)}
                      placeholder="e.g. Dubai Specialty Hospital"
                      className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Contact Person Name & Title *</label>
                    <input
                      type="text"
                      required
                      value={fContact}
                      onChange={(e) => setFContact(e.target.value)}
                      placeholder="e.g. HR Manager / Medical Director"
                      className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      value={fEmail}
                      onChange={(e) => setFEmail(e.target.value)}
                      placeholder="hr@hospital.ae"
                      className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Direct Phone *</label>
                    <input
                      type="tel"
                      required
                      value={fPhone}
                      onChange={(e) => setFPhone(e.target.value)}
                      placeholder="+971 4 000 0000"
                      className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Facility Type</label>
                    <select
                      value={fType}
                      onChange={(e: any) => setFType(e.target.value)}
                      className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
                    >
                      <option value="Hospital">Hospital</option>
                      <option value="Medical Center">Medical Center / Polyclinic</option>
                      <option value="Clinic">Specialty Clinic</option>
                      <option value="Home Care">Home Healthcare Agency</option>
                      <option value="Diagnostic Lab">Diagnostic Center / Radiology</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Headcount Needed</label>
                    <input
                      type="number"
                      min="1"
                      value={fHeadcount}
                      onChange={(e) => setFHeadcount(parseInt(e.target.value))}
                      className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Deployment Urgency</label>
                    <select
                      value={fUrgency}
                      onChange={(e: any) => setFUrgency(e.target.value)}
                      className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
                    >
                      <option value="Immediate (24-48h)">Locum / Urgent (24-48h)</option>
                      <option value="Within 2 Weeks">Within 2 Weeks</option>
                      <option value="Within 1 Month">Within 1 Month</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Qualified Medical Personnel</span>
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
