import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceCatalog } from './components/ServiceCatalog';
import { EligibilityCalculator } from './components/EligibilityCalculator';
import { ExamPrepHub } from './components/ExamPrepHub';
import { DataFlowTracker } from './components/DataFlowTracker';
import { StaffingPortal } from './components/StaffingPortal';
import { BookingModal } from './components/BookingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { fetchCategories } from './services/api';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [initialBookingCategory, setInitialBookingCategory] = useState<string | undefined>(undefined);
  const [initialBookingService, setInitialBookingService] = useState<string | undefined>(undefined);
  
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    loadCategoriesData();
  }, []);

  const loadCategoriesData = async () => {
    const data = await fetchCategories();
    if (data && data.length > 0) {
      setCategories(data);
    } else {
      setCategories(getFallbackCategories());
    }
  };

  const handleOpenBooking = (serviceName?: string, categoryTitle?: string) => {
    setInitialBookingService(serviceName);
    setInitialBookingCategory(categoryTitle);
    setIsBookingOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex-grow">
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onNavigate={handleNavigate}
        />

        <ServiceCatalog
          categories={categories}
          onSelectServiceBooking={(svcName, catTitle) => handleOpenBooking(svcName, catTitle)}
        />

        <EligibilityCalculator
          onOpenBooking={(svc) => handleOpenBooking(svc)}
        />

        <ExamPrepHub />

        <DataFlowTracker />

        <StaffingPortal />
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialCategory={initialBookingCategory}
        initialService={initialBookingService}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
};

function getFallbackCategories() {
  return [
    {
      id: 'licensing-exam-prep',
      categoryTitle: 'Healthcare Licensing & Exam Preparation',
      categoryDescription: 'Comprehensive end-to-end guidance for DHA, MOH, and DOH licensing, exam coaching, and DataFlow primary source verification.',
      badge: 'Licensing & Exams',
      icon: 'Award',
      services: [
        { id: 'dha-license-prep', title: 'DHA License Preparation Support', description: 'Step-by-step application guidance, eligibility verification, document attestation support, and full submission management.', timeline: '2 - 4 Weeks', targetAudience: 'Doctors, Nurses & Allied', keyBenefits: ['Pre-eligibility screening', 'Document attestation roadmap', 'Sheryan profile setup'] },
        { id: 'dha-exam-coaching', title: 'DHA Exam Coaching & Preparation', description: 'Tailored study plans, mock exam practice tests, and 1-on-1 tutoring.', timeline: '4 - 8 Weeks', targetAudience: 'GPs, Specialists, RNs', keyBenefits: ['95%+ First-time pass rate', 'Updated 2026 Prometric question bank'] },
        { id: 'nursing-license-guidance', title: 'Nursing License Guidance', description: 'Dedicated licensing track for registered nurses, assistant nurses, and midwives looking to practice in Dubai.', timeline: '3 - 5 Weeks', targetAudience: 'Registered Nurses', keyBenefits: ['Category mapping (RN/Assistant)', 'DataFlow PSV assistance'] },
        { id: 'doctor-licensing-assistance', title: 'Doctor Licensing Assistance', description: 'Specialized concierge service for Consultants, Specialists, and GPs to navigate DHA, DOH, and MOH license conversions.', timeline: '3 - 6 Weeks', targetAudience: 'Physicians & Surgeons', keyBenefits: ['Tiered qualification assessment', 'Direct specialist submission'] }
      ]
    },
    {
      id: 'recruitment-staffing',
      categoryTitle: 'Healthcare Recruitment & Staffing',
      categoryDescription: 'Premium recruitment and locum staffing solutions for Dubai hospitals, clinics, diagnostic centers, and home care providers.',
      badge: 'Recruitment & Talent',
      icon: 'Users',
      services: [
        { id: 'doctor-placement', title: 'Doctor Placement Services', description: 'Executive placement matching DHA-licensed consultants and specialists with top Dubai private hospitals.', timeline: '2 - 6 Weeks', targetAudience: 'Hospitals & Medical Centers', keyBenefits: ['Pre-vetted licensed doctors', 'Contract negotiation support'] },
        { id: 'nursing-staff-supply', title: 'Nursing Staff Supply', description: 'Sourcing and deployment of qualified ward nurses, ICU specialists, and outpatient staff.', timeline: '1 - 3 Weeks', targetAudience: 'Hospitals & Specialized Clinics', keyBenefits: ['Qualified RNs & Specialists', 'Full background & PSV check'] }
      ]
    },
    {
      id: 'clinic-business-setup',
      categoryTitle: 'Clinic & Healthcare Business Setup',
      categoryDescription: 'Turnkey facility licensing, DHA engineering blueprints approval, healthcare business formation, and operational compliance.',
      badge: 'Facility Setup & DHA',
      icon: 'Building',
      services: [
        { id: 'clinic-setup-consultancy', title: 'Clinic Setup Consultancy', description: 'End-to-end guidance for starting a clinic in Dubai, from feasibility study to operational launch.', timeline: '2 - 6 Months', targetAudience: 'Investors & Doctors', keyBenefits: ['DHA facility classification', 'Location approval guidance'] },
        { id: 'dha-facility-licensing', title: 'DHA Facility Licensing Assistance', description: 'Navigating DHA health regulation guidelines, initial approval, architectural plan approval, and inspection.', timeline: '1 - 3 Months', targetAudience: 'Healthcare Facilities', keyBenefits: ['Initial & final DHA clearance', 'DHA inspection mock audit'] }
      ]
    },
    {
      id: 'training-education',
      categoryTitle: 'Training & Education Services',
      categoryDescription: 'High-yield exam prep courses, clinical skills development, OSCE coaching, and professional development.',
      badge: 'Medical Education',
      icon: 'BookOpen',
      services: [
        { id: 'dha-training-doctors', title: 'DHA Exam Training for Doctors', description: 'Intensive prep modules covering clinical recalls and high-yield question banks for DHA doctor exam.', timeline: '4 - 8 Weeks', targetAudience: 'GPs & Specialists', keyBenefits: ['1000+ Verified questions', 'Weekly mock exams'] },
        { id: 'medical-english-training', title: 'Medical English Training', description: 'Specialized English language coaching for medical professionals to excel in clinical documentation and exams.', timeline: '4 - 8 Weeks', targetAudience: 'Non-native Medical Staff', keyBenefits: ['OET & IELTS medical focus', 'Clinical communication'] }
      ]
    },
    {
      id: 'medical-support-services',
      categoryTitle: 'Medical Support Services',
      categoryDescription: 'Operational support including healthcare HR, medical documentation, insurance guidance, telehealth, and homecare setup.',
      badge: 'Operations & HR',
      icon: 'Shield',
      services: [
        { id: 'medical-admin-support', title: 'Medical Administration Support', description: 'Outsourced medical office management, reception training, and electronic medical record management.', timeline: 'Ongoing', targetAudience: 'Clinics & Specialized Centers', keyBenefits: ['Patient journey optimization', 'Admin SOP implementation'] },
        { id: 'telehealth-setup-support', title: 'Telehealth Setup Support', description: 'DHA compliant telemedicine platform selection, licensing approvals, and remote consultation protocols.', timeline: '2 - 4 Weeks', targetAudience: 'Private Practices & Group Clinics', keyBenefits: ['DHA Telehealth permit', 'Virtual care SOPs'] }
      ]
    }
  ];
}

export default App;
