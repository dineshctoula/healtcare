import React, { useState } from 'react';
import {
  Stethoscope,
  Award,
  Calculator,
  BookOpen,
  ShieldCheck,
  Users,
  Shield,
  Calendar,
  Menu,
  X,
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (category?: string) => void;
  onOpenAdmin: () => void;
  // The active section is tracked in the parent (App.tsx) and passed down
  // so the navbar can highlight the correct link without owning that state itself
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

// Each entry in this list becomes both a desktop tab and a mobile menu item
const NAV_ITEMS = [
  { id: 'services',    label: 'Services Catalog',      icon: Award },
  { id: 'calculator',  label: 'License Calculator',     icon: Calculator },
  { id: 'exam-hub',    label: 'Exam Prep Hub',          icon: BookOpen },
  { id: 'tracker',     label: 'DataFlow Tracker',       icon: ShieldCheck },
  { id: 'staffing',    label: 'Recruitment & Staffing', icon: Users },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAdmin,
  activeSection,
  setActiveSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to the target section and update the active state in one shot
  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Brand logo — clicking it scrolls back to the hero */}
        <div
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group"
          role="link"
          aria-label="Go to homepage"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleNavClick('hero')}
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white">DUBAI HEALTHCARE</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest border border-emerald-500/30">
                CONSULTANCY
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Licensing • Staffing • Clinic Setup • Exams</p>
          </div>
        </div>

        {/* Desktop navigation — hidden on smaller screens */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* CTA buttons — hidden on mobile (handled in the dropdown instead) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenAdmin}
            title="Executive Portal Access"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-all"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Desk</span>
          </button>

          <button
            onClick={() => onOpenBooking()}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-emerald-900/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation</span>
          </button>
        </div>

        {/* Hamburger — only visible on small screens */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-slate-800 px-4 pt-3 pb-6 space-y-2">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800/70"
            >
              <Icon className="w-5 h-5 text-emerald-400" />
              {label}
            </button>
          ))}

          <div className="pt-3 flex flex-col gap-2 border-t border-slate-800">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-lg"
            >
              <Shield className="w-4 h-4" /> Admin Portal
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-lg shadow-md"
            >
              <Calendar className="w-4 h-4" /> Book Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
