import { Injectable, Controller, Get, Param, NotFoundException } from '@nestjs/common';

export interface HealthcareServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  keyBenefits: string[];
  timeline: string;
  targetAudience: string;
}

export interface ServiceCategory {
  id: string;
  categoryTitle: string;
  categoryDescription: string;
  badge: string;
  icon: string;
  services: HealthcareServiceItem[];
}

@Injectable()
export class ServicesService {
  private readonly serviceCategories: ServiceCategory[] = [
    {
      id: 'licensing-exam-prep',
      categoryTitle: 'Healthcare Licensing & Exam Preparation',
      categoryDescription: 'Comprehensive end-to-end guidance for DHA, MOH, and DOH licensing, exam coaching, and DataFlow primary source verification.',
      badge: 'Licensing & Exams',
      icon: 'Award',
      services: [
        {
          id: 'dha-license-prep',
          title: 'DHA License Preparation Support',
          description: 'Step-by-step application guidance, eligibility verification, document attestation support, and full submission management for the Dubai Health Authority.',
          iconName: 'FileCheck',
          keyBenefits: ['Pre-eligibility screening', 'Document attestation roadmap', 'DHA portal profile setup', 'Fast-track approval support'],
          timeline: '2 - 4 Weeks',
          targetAudience: 'Doctors, Nurses, Dentists & Allied Professionals'
        },
        {
          id: 'dha-exam-coaching',
          title: 'DHA Exam Coaching & Preparation',
          description: 'Tailored study plans, mock exam practice tests, high-yield clinical recall questions, and 1-on-1 tutoring by certified UAE medical educators.',
          iconName: 'GraduationCap',
          keyBenefits: ['95%+ First-time pass rate', 'Updated 2026 Prometric question bank', 'Specialty-specific prep modules', 'Performance analytics'],
          timeline: '4 - 8 Weeks',
          targetAudience: 'General Practitioners, Specialists, Registered Nurses'
        },
        {
          id: 'nursing-license-guidance',
          title: 'Nursing License Guidance',
          description: 'Dedicated licensing track for registered nurses, assistant nurses, and midwives looking to practice in Dubai hospitals and home care services.',
          iconName: 'HeartPulse',
          keyBenefits: ['Category mapping (RN/Assistant/Midwife)', 'DataFlow PSV assistance', 'Good Standing certificate verification', 'Fast credential review'],
          timeline: '3 - 5 Weeks',
          targetAudience: 'Registered Nurses & Nursing Assistants'
        },
        {
          id: 'doctor-licensing-assistance',
          title: 'Doctor Licensing Assistance',
          description: 'Specialized concierge service for Consultants, Specialists, and GPs to navigate DHA, DOH (HAAD), and MOH license conversions and exams.',
          iconName: 'Stethoscope',
          keyBenefits: ['Tiered qualification assessment', 'Title equivalency analysis', 'Direct DHA specialist submission', 'Exemption verification check'],
          timeline: '3 - 6 Weeks',
          targetAudience: 'Consultants, Specialists & General Practitioners'
        },
        {
          id: 'prometric-exam-prep',
          title: 'Prometric Exam Preparation',
          description: 'Targeted preparation course for Prometric computer-based testing, including timing techniques, clinical scenario simulations, and scoring strategies.',
          iconName: 'MonitorCheck',
          keyBenefits: ['Simulated exam software', 'Time-management strategies', 'Domain-by-domain weakness analysis', 'Exam center booking aid'],
          timeline: '3 - 6 Weeks',
          targetAudience: 'All Healthcare License Candidates'
        },
        {
          id: 'dataflow-verification',
          title: 'DataFlow Verification Assistance',
          description: 'Expert assistance for Primary Source Verification (PSV) through the DataFlow Group, ensuring seamless verification of credentials and experience.',
          iconName: 'ShieldCheck',
          keyBenefits: ['Pre-submission document audit', 'Issuing authority follow-ups', 'Status discrepancy resolution', 'Express PSV service option'],
          timeline: '4 - 6 Weeks',
          targetAudience: 'All Applicants for UAE Healthcare Licenses'
        },
        {
          id: 'healthcare-career-consultation',
          title: 'Healthcare Career Consultation',
          description: 'Strategic career planning for medical professionals moving to Dubai, covering salary benchmarks, licensing requirements, and hospital placements.',
          iconName: 'TrendingUp',
          keyBenefits: ['Salary standard guidance', 'UAE healthcare market overview', 'CV optimization for UAE recruiters', 'Relocation guidance'],
          timeline: '1 - 2 Sessions',
          targetAudience: 'International Healthcare Candidates'
        },
        {
          id: 'medical-registration-support',
          title: 'Medical Professional Registration Support',
          description: 'End-to-end registration assistance on Sheryan (DHA Portal), Tamme (DOH Portal), and UAE Ministry of Health platforms.',
          iconName: 'UserCheck',
          keyBenefits: ['Sheryan profile activation', 'Primary document upload', 'Credential conversion', 'Issue resolution desk'],
          timeline: '1 - 2 Weeks',
          targetAudience: 'Medical Practitioners & Allied Staff'
        }
      ]
    },
    {
      id: 'recruitment-staffing',
      categoryTitle: 'Healthcare Recruitment & Staffing',
      categoryDescription: 'Premium recruitment and locum staffing solutions for Dubai hospitals, clinics, diagnostic centers, and home care providers.',
      badge: 'Recruitment & Talent',
      icon: 'Users',
      services: [
        {
          id: 'doctor-placement',
          title: 'Doctor Placement Services',
          description: 'Executive placement service matching DHA-licensed consultants, specialists, and sub-specialists with top Dubai private hospitals and clinics.',
          iconName: 'UserPlus',
          keyBenefits: ['Pre-vetted DHA licensed candidates', 'Seamless interview scheduling', 'Contract negotiation support', 'Rapid onboarding'],
          timeline: '2 - 6 Weeks',
          targetAudience: 'Hospitals, Polyclinics & Surgical Centers'
        },
        {
          id: 'nursing-staff-supply',
          title: 'Nursing Staff Supply',
          description: 'Sourcing and deployment of qualified ward nurses, ICU specialists, OR nurses, outpatient staff, and pediatric nurse professionals.',
          iconName: 'Activity',
          keyBenefits: ['Qualified RNs & Specialists', 'Full background & PSV verification', 'Flexible deployment terms', 'Permanent & Contractual'],
          timeline: '1 - 3 Weeks',
          targetAudience: 'Hospitals, Medical Centers & Specialized Clinics'
        },
        {
          id: 'healthcare-staffing-solutions',
          title: 'Healthcare Staffing Solutions',
          description: 'Customized workforce management solutions for healthcare facility expansions, new clinic launches, and seasonal demand spikes.',
          iconName: 'Briefcase',
          keyBenefits: ['Turnkey staffing packages', 'Compliance & license matching', 'Recruitment process outsourcing', 'Dedicated account manager'],
          timeline: 'Ongoing',
          targetAudience: 'Healthcare Enterprise Group & Chains'
        },
        {
          id: 'temporary-medical-staffing',
          title: 'Temporary Medical Staffing',
          description: 'Flexible short-term healthcare staffing for locum coverage, leave coverage, peak season surges, and event medical cover.',
          iconName: 'Clock',
          keyBenefits: ['Rapid 24-48hr deployment', 'Pre-screened licensed professionals', 'Zero long-term liability', 'Transparent hourly/daily rates'],
          timeline: '24 - 48 Hours',
          targetAudience: 'Hospitals, Day Surgery Centers & Event Organizers'
        },
        {
          id: 'clinic-staffing-support',
          title: 'Clinic Staffing Support',
          description: 'Tailored staffing setups for dental, aesthetic, dermatology, pediatric, and general medicine clinics across Dubai.',
          iconName: 'Building2',
          keyBenefits: ['Specialty-matched personnel', 'Bilingual (Arabic/English) staff', 'Reception & clinical integration', 'Compliance assured'],
          timeline: '1 - 3 Weeks',
          targetAudience: 'Private Outpatient Clinics'
        },
        {
          id: 'home-healthcare-recruitment',
          title: 'Home Healthcare Staff Recruitment',
          description: 'Recruitment of compassionate, licensed home care nurses, physiotherapists, and elderly care companions for Dubai home care entities.',
          iconName: 'Home',
          keyBenefits: ['DHA Home Care license holders', 'Caregiver competency checks', 'Patient-oriented soft skills', 'Immediate deployment'],
          timeline: '1 - 2 Weeks',
          targetAudience: 'Home Healthcare Providers & Private Families'
        },
        {
          id: 'allied-healthcare-supply',
          title: 'Allied Healthcare Professional Supply',
          description: 'Placement of lab technicians, radiographers, pharmacists, physiotherapists, clinical dietitians, and sonographers.',
          iconName: 'Microscope',
          keyBenefits: ['Specialized technical verification', 'DHA/MOH license validated', 'State-of-the-art diagnostic familiarity', 'Immediate availability'],
          timeline: '2 - 4 Weeks',
          targetAudience: 'Diagnostic Labs, Radiology & Rehab Centers'
        },
        {
          id: 'locum-doctor-services',
          title: 'Locum Doctor Services',
          description: 'On-demand locum consultant and specialist doctors to maintain uninterrupted clinical operations and call rotas.',
          iconName: 'Stethoscope',
          keyBenefits: ['Instant credential verification', 'Full DHA part-time permit assistance', 'Flexible coverage options', 'Competitive rates'],
          timeline: '48 Hours',
          targetAudience: 'Emergency Departments & Private Hospitals'
        }
      ]
    },
    {
      id: 'clinic-business-setup',
      categoryTitle: 'Clinic & Healthcare Business Setup',
      categoryDescription: 'Turnkey facility licensing, DHA engineering blueprints approval, healthcare business formation, and operational compliance in Dubai.',
      badge: 'Facility Setup & DHA',
      icon: 'Building',
      services: [
        {
          id: 'clinic-setup-consultancy',
          title: 'Clinic Setup Consultancy',
          description: 'End-to-end guidance for starting a clinic in Dubai, from feasibility study and facility classification to operational launch.',
          iconName: 'Compass',
          keyBenefits: ['DHA facility classification review', 'ROI & market analysis', 'Location approval guidance', 'Complete setup roadmap'],
          timeline: '2 - 6 Months',
          targetAudience: 'Medical Investors, Doctors & Healthcare Groups'
        },
        {
          id: 'medical-center-setup',
          title: 'Medical Center Setup Support',
          description: 'Comprehensive setup support for multi-specialty medical centers, day surgery centers, and polyclinics.',
          iconName: 'Building2',
          keyBenefits: ['Multi-department zoning', 'DHA & DED licensing sync', 'Medical equipment planning', 'Operational workflow design'],
          timeline: '3 - 8 Months',
          targetAudience: 'Investors & Healthcare Groups'
        },
        {
          id: 'dha-facility-licensing',
          title: 'DHA Facility Licensing Assistance',
          description: 'Navigating DHA health regulation sector guidelines, initial approval, architectural plan approval, and final inspection clearance.',
          iconName: 'ShieldAlert',
          keyBenefits: ['Initial & final DHA clearance', 'DHA inspection mock audit', 'Radiation & pharmacy permits', 'License renewal support'],
          timeline: '1 - 3 Months',
          targetAudience: 'All Healthcare Facilities in Dubai'
        },
        {
          id: 'healthcare-business-formation',
          title: 'Healthcare Business Formation',
          description: 'Corporate structuring, Dubai Economy & Tourism (DET) licensing, free zone setup (DHCC), and shareholder agreement support.',
          iconName: 'Briefcase',
          keyBenefits: ['100% Foreign ownership options', 'DHCC vs Mainland analysis', 'Trade license issuance', 'Corporate bank account aid'],
          timeline: '2 - 4 Weeks',
          targetAudience: 'International Investors & Healthcare Brands'
        },
        {
          id: 'medical-operational-consultancy',
          title: 'Medical Operational Consultancy',
          description: 'Streamlining clinical workflows, EHR/EMR implementation, patient safety protocols, and standard operating procedure (SOP) development.',
          iconName: 'Settings',
          keyBenefits: ['Custom DHA-compliant SOPs', 'EMR/E-claim system integration', 'Clinical audit readiness', 'Patient flow optimization'],
          timeline: '4 - 8 Weeks',
          targetAudience: 'Existing & New Clinics'
        },
        {
          id: 'healthcare-compliance-guidance',
          title: 'Healthcare Compliance Guidance',
          description: 'Continuous audit readiness, infection control protocols, medical waste disposal contracts, and DHA regulatory updates.',
          iconName: 'CheckCircle2',
          keyBenefits: ['Quarterly compliance audits', 'Penalty avoidance roadmap', 'DHA regulation alert updates', 'Staff safety training'],
          timeline: 'Ongoing / Retainer',
          targetAudience: 'Operating Medical Facilities'
        },
        {
          id: 'medical-facility-planning',
          title: 'Medical Facility Planning',
          description: 'Specialized architectural, mechanical, electrical, and plumbing (MEP) design review aligned with DHA health facility guidelines.',
          iconName: 'Layers',
          keyBenefits: ['DHA architectural approval', 'Infection control layout check', 'Radiation shield compliance', 'Ergonomic clinical spaces'],
          timeline: '3 - 6 Weeks',
          targetAudience: 'Architects, Contractors & Clinic Owners'
        }
      ]
    },
    {
      id: 'training-education',
      categoryTitle: 'Training & Education Services',
      categoryDescription: 'High-yield exam prep courses, clinical skills development, OSCE coaching, and professional development for healthcare candidates.',
      badge: 'Medical Education',
      icon: 'BookOpen',
      services: [
        {
          id: 'dha-training-doctors',
          title: 'DHA Exam Training for Doctors',
          description: 'Intensive prep modules covering internal medicine, surgery, pediatrics, OB/GYN, and emergency medicine clinical recalls for DHA exam.',
          iconName: 'GraduationCap',
          keyBenefits: ['1000+ Verified high-yield questions', 'Weekly mock exams', 'Live Q&A tutor sessions', 'Study material access'],
          timeline: '4 - 8 Weeks',
          targetAudience: 'GPs, Specialists & Residents'
        },
        {
          id: 'dha-training-nurses',
          title: 'DHA Exam Training for Nurses',
          description: 'Structured training focused on nursing fundamentals, pharmacology, infection control, and patient safety for DHA nurse licensure.',
          iconName: 'HeartPulse',
          keyBenefits: ['Targeted nursing question banks', 'Focus on safety & ethics', 'Flexible online evening batches', 'Mock performance analytics'],
          timeline: '3 - 6 Weeks',
          targetAudience: 'RNs & Midwives'
        },
        {
          id: 'moh-doh-guidance',
          title: 'MOH & DOH Exam Guidance',
          description: 'Comprehensive preparation support for Ministry of Health (MOH - Northern Emirates) and Department of Health (DOH - Abu Dhabi) exams.',
          iconName: 'Compass',
          keyBenefits: ['Multi-jurisdiction exam roadmap', 'DOH vs DHA vs MOH comparison', 'Unified license transfer advice', 'Pass guarantee support'],
          timeline: '3 - 6 Weeks',
          targetAudience: 'All Healthcare Candidates in UAE'
        },
        {
          id: 'medical-english-training',
          title: 'Medical English Training',
          description: 'Specialized English language coaching for medical professionals to excel in clinical documentation, exams, and patient communication.',
          iconName: 'Languages',
          keyBenefits: ['OET & IELTS medical focus', 'Clinical communication roleplay', 'Medical terminology mastery', 'Confidence building'],
          timeline: '4 - 8 Weeks',
          targetAudience: 'Non-native English Speaking Professionals'
        },
        {
          id: 'osce-preparation',
          title: 'OSCE Preparation',
          description: 'Practical Objective Structured Clinical Examination (OSCE) training with live simulated patient interactions and physical assessment rubrics.',
          iconName: 'UserCheck',
          keyBenefits: ['Hands-on clinical station practice', 'Simulated patient scenarios', 'Expert examiner feedback', 'Video review of performance'],
          timeline: '2 - 4 Weeks',
          targetAudience: 'Specialists & Nursing Candidates'
        },
        {
          id: 'healthcare-interview-prep',
          title: 'Healthcare Interview Preparation',
          description: 'Mock interview coaching tailored for Dubai top hospital board interviews, clinical case presentations, and behavioral questions.',
          iconName: 'MessageSquare',
          keyBenefits: ['Hospital panel mock interviews', 'UAE healthcare regulation drills', 'Resume & portfolio presentation', 'Salary negotiation tactics'],
          timeline: '1 - 2 Weeks',
          targetAudience: 'Shortlisted Medical Candidates'
        },
        {
          id: 'clinical-skills-workshops',
          title: 'Clinical Skills Workshops',
          description: 'Hands-on workshops in advanced life support protocols, IV access, wound care, patient triage, and emergency response updates.',
          iconName: 'Activity',
          keyBenefits: ['Practical simulation labs', 'CME credit accreditation guidance', 'Small group coaching', 'Certificate of completion'],
          timeline: '1 - 3 Days',
          targetAudience: 'Nurses, Doctors & Paramedics'
        },
        {
          id: 'nursing-skill-development',
          title: 'Nursing Skill Development Programs',
          description: 'Advanced skill upgrade courses in ICU monitoring, telemetry, pediatric care, and surgical assist procedures.',
          iconName: 'Award',
          keyBenefits: ['Specialized clinical modules', 'Dubai hospital standard compliance', 'Practical competency certificate', 'Career advancement boost'],
          timeline: '2 - 4 Weeks',
          targetAudience: 'Nurses seeking ICU / Specialist placement'
        }
      ]
    },
    {
      id: 'medical-support-services',
      categoryTitle: 'Medical Support Services',
      categoryDescription: 'Operational support including healthcare HR, medical documentation, insurance & revenue cycle guidance, telehealth, and homecare setup.',
      badge: 'Operations & HR',
      icon: 'Shield',
      services: [
        {
          id: 'medical-admin-support',
          title: 'Medical Administration Support',
          description: 'Outsourced medical office management, reception training, appointment scheduling setup, and electronic medical record management.',
          iconName: 'FileText',
          keyBenefits: ['Patient journey optimization', 'Admin SOP implementation', 'Front desk staff training', 'Quality assurance checks'],
          timeline: 'Ongoing / Project',
          targetAudience: 'Clinics & Specialized Centers'
        },
        {
          id: 'healthcare-hr-consultancy',
          title: 'Healthcare HR Consultancy',
          description: 'Tailored UAE labor law compliance for medical staff, employment contract drafting, credentialing tracking, and appraisal systems.',
          iconName: 'Users',
          keyBenefits: ['UAE Labor Law medical compliance', 'Automated credential expiration alerts', 'Physician incentive structures', 'HR manual creation'],
          timeline: '2 - 4 Weeks',
          targetAudience: 'Clinic Managers & HR Directors'
        },
        {
          id: 'medical-documentation-services',
          title: 'Medical Documentation Services',
          description: 'Clinical documentation improvement (CDI), audit preparation, electronic record template creation, and medical transcription setup.',
          iconName: 'FolderCheck',
          keyBenefits: ['DHA documentation audit compliance', 'Standardized medical record templates', 'Reduced claim rejection rates', 'Legal protection'],
          timeline: '2 - 3 Weeks',
          targetAudience: 'Hospitals & Outpatient Facilities'
        },
        {
          id: 'insurance-billing-guidance',
          title: 'Insurance & Billing Guidance',
          description: 'DHA e-Claim registration support, insurance payer empanelment, coding compliance (ICD-10/CPT), and revenue cycle optimization.',
          iconName: 'CreditCard',
          keyBenefits: ['DHA e-Claim system setup', 'Major insurance panel onboarding', 'Claim denial management', 'Revenue maximization'],
          timeline: '4 - 8 Weeks',
          targetAudience: 'Clinics, Polyclinics & Diagnostic Labs'
        },
        {
          id: 'patient-coordination-services',
          title: 'Patient Coordination Services',
          description: 'Concierge medical tourism support, patient triage protocols, international patient facilitation, and treatment planning.',
          iconName: 'Heart',
          keyBenefits: ['Multilingual patient coordinators', 'Seamless transfer protocols', 'Medical tourism workflow', 'High patient satisfaction'],
          timeline: 'Ongoing',
          targetAudience: 'Specialty Hospitals & Luxury Clinics'
        },
        {
          id: 'healthcare-operations-support',
          title: 'Healthcare Operations Support',
          description: 'Comprehensive operational audits, inventory management for pharmaceuticals, patient waiting time reduction, and workflow redesign.',
          iconName: 'Zap',
          keyBenefits: ['Operational bottleneck removal', 'Supply chain efficiency', 'DHA inspection readiness', 'Cost structure optimization'],
          timeline: '2 - 6 Weeks',
          targetAudience: 'Healthcare Center Directors'
        },
        {
          id: 'telehealth-setup-support',
          title: 'Telehealth Setup Support',
          description: 'DHA compliant telemedicine platform selection, licensing approvals, remote consultation protocols, and HIPAA/UAE data compliance.',
          iconName: 'Video',
          keyBenefits: ['DHA Telehealth permit acquisition', 'Secure video & prescription integration', 'Virtual care SOPs', 'Expanded patient reach'],
          timeline: '2 - 4 Weeks',
          targetAudience: 'Private Practices & Group Clinics'
        },
        {
          id: 'home-healthcare-consultancy',
          title: 'Home Healthcare Consultancy',
          description: 'Specialized setup, licensing, operational workflows, and clinical governance for Home Healthcare Providers operating in Dubai.',
          iconName: 'Home',
          keyBenefits: ['DHA Home Health facility permit', 'Mobile nursing SOPs & safety', 'Fleet & equipment management', 'Reimbursement setup'],
          timeline: '1 - 3 Months',
          targetAudience: 'Home Healthcare Business Owners'
        }
      ]
    }
  ];

  getAllCategories(): ServiceCategory[] {
    return this.serviceCategories;
  }

  getCategoryById(id: string): ServiceCategory {
    const category = this.serviceCategories.find(c => c.id === id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  getServiceById(serviceId: string): HealthcareServiceItem {
    for (const cat of this.serviceCategories) {
      const found = cat.services.find(s => s.id === serviceId);
      if (found) return found;
    }
    throw new NotFoundException(`Service with ID ${serviceId} not found`);
  }
}

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  getAllServices() {
    return {
      success: true,
      data: this.servicesService.getAllCategories(),
      totalCategories: 5,
      totalServices: 39,
    };
  }

  @Get('category/:id')
  getCategory(@Param('id') id: string) {
    return {
      success: true,
      data: this.servicesService.getCategoryById(id),
    };
  }

  @Get('detail/:serviceId')
  getServiceDetail(@Param('serviceId') serviceId: string) {
    return {
      success: true,
      data: this.servicesService.getServiceById(serviceId),
    };
  }
}
