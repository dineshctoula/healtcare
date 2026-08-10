import React from 'react';
import { Stethoscope, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs relative pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight">DUBAI HEALTHCARE</span>
                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">CONSULTANCY SERVICES</p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Certified healthcare regulatory advisory firm based in Dubai, UAE. End-to-end guidance for DHA, DOH, MOH licensing, DataFlow primary source verification, clinic facility setup, exam coaching, and executive staffing.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Level 14, Al Saada Tower, Business Bay & DHCC, Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>+971 4 800 3422 / +971 50 882 1940</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>contact@dubaihealthcareconsultancy.ae</span>
              </div>
            </div>
          </div>

          {/* Service Pillars Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Service Pillars</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => onNavigate('services')} className="hover:text-emerald-400 transition-colors">DHA License Prep</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-emerald-400 transition-colors">Prometric Coaching</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-emerald-400 transition-colors">DataFlow Verification</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-emerald-400 transition-colors">Doctor & Nurse Placement</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-emerald-400 transition-colors">Clinic Setup & Licensing</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-emerald-400 transition-colors">Healthcare HR & SOPs</button></li>
            </ul>
          </div>

          {/* Quick Tools */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Interactive Tools</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => onNavigate('calculator')} className="hover:text-amber-400 transition-colors">DHA Eligibility Calculator</button></li>
              <li><button onClick={() => onNavigate('exam-hub')} className="hover:text-emerald-400 transition-colors">Prometric Mock Quiz Demo</button></li>
              <li><button onClick={() => onNavigate('tracker')} className="hover:text-teal-400 transition-colors">DataFlow PSV Status Tracker</button></li>
              <li><button onClick={() => onNavigate('staffing')} className="hover:text-emerald-400 transition-colors">Medical Job Placement</button></li>
              <li><button onClick={onOpenBooking} className="hover:text-amber-400 transition-colors">Book Advisory Session</button></li>
            </ul>
          </div>

          {/* Working Hours & Regulatory Note */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Consulting Desk Hours</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Monday - Saturday: 08:30 - 19:30</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>24/7 Priority Emergency Desk</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-2 leading-normal">
                Compliant with Dubai Health Authority (DHA), UAE Ministry of Health & Prevention (MOHAP), and Department of Health Abu Dhabi (DOH) regulatory guidelines.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Dubai Healthcare Consultancy Services. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>DHA Compliance Disclaimer</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
