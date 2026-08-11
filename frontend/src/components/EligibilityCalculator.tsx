import React, { useState } from 'react';
import { Calculator, CheckCircle2, AlertCircle, ArrowRight, RotateCcw, ShieldCheck, FileText, Clock, HelpCircle } from 'lucide-react';

/**
 * Props expected by the EligibilityCalculator section.
 * The parent passes onOpenBooking so the calculator can forward the user
 * directly to the booking modal once they've checked their eligibility.
 */
interface EligibilityCalculatorProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const EligibilityCalculator: React.FC<EligibilityCalculatorProps> = ({ onOpenBooking }) => {
  // Profession narrows the options in both the title dropdown and the fee logic
  const [profession, setProfession] = useState<'Doctor' | 'Nurse' | 'Allied'>('Doctor');
  const [title, setTitle] = useState<string>('Specialist');
  // Stored as number (years) so the range slider can bind to it directly
  const [yearsExp, setYearsExp] = useState<number>(3);
  // The DHA uses a tier system based on where your degree was awarded;
  // Tier 1 (UK/US/CA/AU) usually means the Prometric exam can be waived
  const [qualificationCountry, setQualificationCountry] = useState<string>('UK/US/Canada (Tier 1)');
  const [hasDataFlow, setHasDataFlow] = useState<boolean>(false);
  const [hasPassedPrometric, setHasPassedPrometric] = useState<boolean>(false);

  /**
   * Core eligibility calculation — runs on every render because all inputs
   * are controlled state. Not expensive enough to warrant useMemo here.
   *
   * Returns an object the result panel can display directly without extra
   * transformation in JSX.
   */
  const getEligibilityResult = () => {
    let eligible = false;
    let examRequired = true;
    let categoryTitle = '';
    let estimatedDays = '30 - 45 Days';
    let estimatedCostAED = 3500;
    let requiredDocs: string[] = [
      'Passport Copy & UAE Visa (if applicable)',
      'Basic Medical Degree Certificate',
      'Official Academic Transcripts',
      'Home Country Medical Council Registration',
      'Good Standing Certificate (issued within 6 months)',
      'Experience Certificates for required years'
    ];

    if (profession === 'Doctor') {
      if (title === 'Consultant') {
        categoryTitle = 'DHA Consultant Physician License Track';
        estimatedCostAED = 5500;
        estimatedDays = '20 - 35 Days';
        if (yearsExp >= 5) {
          eligible = true;
          if (qualificationCountry.includes('Tier 1')) examRequired = false;
        } else {
          eligible = false;
        }
      } else if (title === 'Specialist') {
        categoryTitle = 'DHA Specialist Physician License Track';
        estimatedCostAED = 4500;
        estimatedDays = '25 - 40 Days';
        if (yearsExp >= 3) {
          eligible = true;
          if (qualificationCountry.includes('Tier 1')) examRequired = false;
        } else {
          eligible = false;
        }
      } else {
        categoryTitle = 'DHA General Practitioner (GP) License Track';
        estimatedCostAED = 3800;
        estimatedDays = '30 - 45 Days';
        if (yearsExp >= 2) eligible = true;
        else eligible = false;
      }
    } else if (profession === 'Nurse') {
      categoryTitle = title === 'Registered Nurse' ? 'DHA Registered Nurse (RN) Track' : 'DHA Nursing Assistant / Midwife Track';
      estimatedCostAED = 2800;
      estimatedDays = '25 - 35 Days';
      if (yearsExp >= 2) eligible = true;
      else eligible = false;
    } else {
      categoryTitle = 'DHA Allied Health Professional Track';
      estimatedCostAED = 3200;
      estimatedDays = '30 - 40 Days';
      if (yearsExp >= 2) eligible = true;
      else eligible = false;
    }

    // Passing the Prometric exam always removes the exam requirement, regardless of tier
    if (hasPassedPrometric) examRequired = false;
    // If DataFlow is already done, the applicant saves ~1 200 AED in PSV costs
    if (hasDataFlow) estimatedCostAED -= 1200;

    return {
      eligible,
      examRequired,
      categoryTitle,
      estimatedDays,
      estimatedCostAED,
      requiredDocs,
    };
  };

  const result = getEligibilityResult();

  return (
    <section id="calculator" className="py-20 relative bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Regulatory Wizard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            DHA / MOH License <span className="gradient-text-gold">Eligibility & Fee Calculator</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Select your clinical profession and qualification profile to instantly check your DHA license pathway, exam requirements, and total estimated processing costs.
          </p>
        </div>

        {/* Wizard Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Input Panel */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl space-y-6 border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-4 border-b border-slate-800">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold">1</span>
              <span>Configure Professional Credentials</span>
            </h3>

            {/* Profession Selector Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Select Healthcare Category</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Doctor', 'Nurse', 'Allied'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setProfession(p);
                      if (p === 'Doctor') setTitle('Specialist');
                      else if (p === 'Nurse') setTitle('Registered Nurse');
                      else setTitle('Lab Technician / Pharmacist');
                    }}
                    className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border ${
                      profession === p
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-md'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Specific Title Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Clinical Designation / Title</label>
              <select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
              >
                {profession === 'Doctor' && (
                  <>
                    <option value="Consultant">Consultant Physician / Surgeon</option>
                    <option value="Specialist">Specialist Physician / Surgeon</option>
                    <option value="General Practitioner">General Practitioner (GP)</option>
                  </>
                )}
                {profession === 'Nurse' && (
                  <>
                    <option value="Registered Nurse">Registered Nurse (RN)</option>
                    <option value="Assistant Nurse">Assistant Nurse</option>
                    <option value="Midwife">Licensed Midwife</option>
                  </>
                )}
                {profession === 'Allied' && (
                  <>
                    <option value="Lab Technician / Pharmacist">Lab Technician / Pharmacist</option>
                    <option value="Radiographer / Sonographer">Radiographer / Sonographer</option>
                    <option value="Physiotherapist">Physiotherapist</option>
                  </>
                )}
              </select>
            </div>

            {/* Post-Graduation Experience Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300 uppercase tracking-wider">Years of Post-Graduation Experience</span>
                <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {yearsExp} {yearsExp === 1 ? 'Year' : 'Years'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                value={yearsExp}
                onChange={(e) => setYearsExp(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-900 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                <span>0 Years (Graduate)</span>
                <span>5 Years</span>
                <span>10+ Years</span>
              </div>
            </div>

            {/* Qualification Awarding Country / Tier */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Degree Issuing Board Tier</label>
              <select
                value={qualificationCountry}
                onChange={(e) => setQualificationCountry(e.target.value)}
                className="w-full glass-input px-4 py-3 rounded-xl text-xs font-semibold"
              >
                <option value="UK/US/Canada (Tier 1)">Tier 1 (UK CCT / US ABMS / Canada Royal College / Australia)</option>
                <option value="Europe/Arab League (Tier 2)">Tier 2 (EU Board / Arab Board / South Africa / India MD)</option>
                <option value="Asia/Other (Tier 3)">Tier 3 (Other Recognized Universities & MBBS/BSc Nursing)</option>
              </select>
            </div>

            {/* Additional Status Checkboxes */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={hasDataFlow}
                  onChange={(e) => setHasDataFlow(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded"
                />
                <span className="text-xs text-slate-300 font-medium">DataFlow Verification Completed?</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={hasPassedPrometric}
                  onChange={(e) => setHasPassedPrometric(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500 rounded"
                />
                <span className="text-xs text-slate-300 font-medium">DHA / Prometric Exam Passed?</span>
              </label>
            </div>

          </div>

          {/* Dynamic Result Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`glass-panel p-6 sm:p-8 rounded-2xl space-y-6 border-2 ${
              result.eligible ? 'border-emerald-500/50 shadow-xl shadow-emerald-950/40' : 'border-amber-500/50'
            }`}>
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Eligibility Verdict</span>
                  <h4 className="text-lg font-bold text-white">{result.categoryTitle}</h4>
                </div>

                <div className={`px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
                  result.eligible 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}>
                  {result.eligible ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Eligible
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4" /> Additional Exp Required
                    </>
                  )}
                </div>
              </div>

              {/* Status Points */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                  <span className="text-slate-400 font-semibold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Prometric Exam Requirement
                  </span>
                  <span className={`font-bold ${result.examRequired ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {result.examRequired ? 'Exam Required' : 'EXEMPT (Direct License)'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                  <span className="text-slate-400 font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal-400" /> Estimated DHA Clearance Time
                  </span>
                  <span className="font-bold text-white">{result.estimatedDays}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                  <span className="text-slate-400 font-semibold flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-amber-400" /> Estimated Government & PSV Fee
                  </span>
                  <span className="font-extrabold text-amber-400 text-sm">~{result.estimatedCostAED.toLocaleString()} AED</span>
                </div>
              </div>

              {/* Document Checklist */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" /> Required Submission Documents
                </h5>
                <div className="space-y-1.5 bg-slate-900/50 p-3 rounded-xl border border-slate-800/60 max-h-44 overflow-y-auto">
                  {result.requiredDocs.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <button
                onClick={() => onOpenBooking(`DHA License Advisory (${profession} - ${title})`)}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/60 transition-all transform hover:-translate-y-0.5"
              >
                <span>Request Fast-Track DHA Application Support</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
