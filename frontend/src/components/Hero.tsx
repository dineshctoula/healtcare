import React from 'react';
import { Award, Calculator, ShieldCheck, ArrowRight, CheckCircle2, Sparkles, Building2, UserCheck, Star } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onNavigate: (section: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onNavigate }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="ambient-glow glow-emerald top-10 -left-20 animate-pulse-glow" />
      <div className="ambient-glow glow-gold bottom-10 -right-20 animate-pulse-glow" />
      <div className="ambient-glow glow-teal top-1/2 left-1/3 blur-3xl opacity-20" />

      {/* Grid Mesh Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-lg">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Dubai Healthcare Licensing & Setup Advisory</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Premier Healthcare <br />
              <span className="gradient-text-emerald">Licensing, Staffing</span> & <br />
              <span className="gradient-text-gold">Clinic Setup in Dubai</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              Accelerate your medical practice in Dubai. We specialize in end-to-end DHA, DOH, & MOH exam preparation, DataFlow PSV clearance, executive healthcare recruitment, and DHA clinic facility licensing.
            </p>

            {/* Key Value Points Grid */}
            <div className="grid sm:grid-cols-2 gap-3 max-w-xl text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>96.4% DHA Exam First-Attempt Pass Rate</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Express DataFlow Verification Clearance</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Turnkey DHA Clinic Facility Approvals</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Doctor & Nursing Recruitment Agency</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-3 px-7 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-emerald-950/60 hover:shadow-emerald-700/30 transition-all transform hover:-translate-y-1"
              >
                <span>Book Priority Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('calculator')}
                className="flex items-center gap-2 px-6 py-4 glass-panel hover:bg-slate-800/80 text-slate-100 font-semibold text-sm rounded-xl border-slate-700/80 transition-all"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Calculate DHA License Eligibility</span>
              </button>
            </div>

            {/* Trust Indicator */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold border-2 border-slate-950">DR</div>
                <div className="w-8 h-8 rounded-full bg-teal-700 flex items-center justify-center text-white font-bold border-2 border-slate-950">RN</div>
                <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white font-bold border-2 border-slate-950">MD</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="font-bold text-white ml-1">4.9/5</span>
                </div>
                <span>Trusted by over 3,500+ Medical Professionals & Clinics in Dubai</span>
              </div>
            </div>
          </div>

          {/* Right Visual Card Component */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Glass Feature Card */}
              <div className="glass-panel p-6 rounded-2xl space-y-6 shadow-2xl relative z-10 border-slate-700/50">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                      <Award className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">Dubai Healthcare Portal</h3>
                      <p className="text-xs text-slate-400">Instant Advisory & Status Desk</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                    LIVE REGULATORY AGENT
                  </span>
                </div>

                {/* Service Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 hover:border-emerald-500/40 transition-colors">
                    <div className="text-2xl font-extrabold text-white">3,800+</div>
                    <div className="text-[11px] font-semibold text-slate-400">DHA Licenses Issued</div>
                  </div>
                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 hover:border-amber-500/40 transition-colors">
                    <div className="text-2xl font-extrabold text-amber-400">180+</div>
                    <div className="text-[11px] font-semibold text-slate-400">Clinics Established</div>
                  </div>
                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 hover:border-teal-500/40 transition-colors">
                    <div className="text-2xl font-extrabold text-teal-400">99.2%</div>
                    <div className="text-[11px] font-semibold text-slate-400">DataFlow Success</div>
                  </div>
                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 hover:border-emerald-500/40 transition-colors">
                    <div className="text-2xl font-extrabold text-emerald-400">24/7</div>
                    <div className="text-[11px] font-semibold text-slate-400">Concierge Desk</div>
                  </div>
                </div>

                {/* Quick Service Category Jump Buttons */}
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Portal Navigation</p>
                  
                  <button 
                    onClick={() => onNavigate('services')}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 text-xs font-semibold text-slate-200 hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <span>Explore 5 Service Pillars (39 Services)</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button 
                    onClick={() => onNavigate('exam-hub')}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 text-xs font-semibold text-slate-200 hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span>Take DHA Mock Prometric Exam</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button 
                    onClick={() => onNavigate('tracker')}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 text-xs font-semibold text-slate-200 hover:text-white transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-teal-400" />
                      <span>Track DataFlow PSV Status</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
