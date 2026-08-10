import { Injectable, Controller, Post, Get, Body, Module } from '@nestjs/common';

export interface CandidateApplicationDto {
  fullName: string;
  email: string;
  phone: string;
  profession: 'Doctor' | 'Nurse' | 'Allied Health' | 'Admin';
  specialization: string;
  licenseStatus: 'DHA Licensed' | 'MOH Licensed' | 'DOH Licensed' | 'Exam Passed' | 'In Process' | 'Not Started';
  yearsExperience: number;
  expectedSalaryAED?: string;
  notes?: string;
}

export interface StaffingRequestDto {
  facilityName: string;
  contactPerson: string;
  email: string;
  phone: string;
  facilityType: 'Hospital' | 'Medical Center' | 'Clinic' | 'Home Care' | 'Diagnostic Lab';
  requiredProfessions: string[];
  engagementType: 'Full-time' | 'Locum/Part-time' | 'Temporary Surge';
  headcount: number;
  urgency: 'Immediate (24-48h)' | 'Within 2 Weeks' | 'Within 1 Month';
}

@Injectable()
export class RecruitmentService {
  private candidateApps: (CandidateApplicationDto & { id: string; submittedAt: string })[] = [
    {
      id: 'app_1',
      fullName: 'Dr. Fatima Al-Sayed',
      email: 'fatima.alsayed@example.com',
      phone: '+971 55 443 2211',
      profession: 'Doctor',
      specialization: 'Pediatrics / Neonatology',
      licenseStatus: 'DHA Licensed',
      yearsExperience: 8,
      expectedSalaryAED: '35,000 - 45,000 AED',
      notes: 'Available for immediate hospital placement in Dubai.',
      submittedAt: new Date().toISOString(),
    }
  ];

  private facilityRequests: (StaffingRequestDto & { id: string; reqNumber: string; submittedAt: string })[] = [
    {
      id: 'freq_1',
      reqNumber: 'STF-2026-88',
      facilityName: 'Emirates Specialty Medical Center',
      contactPerson: 'Tariq Mansoor (HR Director)',
      email: 'hr@emiratesspecialty.ae',
      phone: '+971 4 332 9900',
      facilityType: 'Medical Center',
      requiredProfessions: ['Registered Nurse - OR', 'General Practitioner'],
      engagementType: 'Full-time',
      headcount: 4,
      urgency: 'Within 2 Weeks',
      submittedAt: new Date().toISOString(),
    }
  ];

  applyCandidate(dto: CandidateApplicationDto) {
    const record = {
      id: 'app_' + Date.now(),
      ...dto,
      submittedAt: new Date().toISOString(),
    };
    this.candidateApps.unshift(record);
    return record;
  }

  requestStaff(dto: StaffingRequestDto) {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const record = {
      id: 'freq_' + Date.now(),
      reqNumber: `STF-2026-${randomNum}`,
      ...dto,
      submittedAt: new Date().toISOString(),
    };
    this.facilityRequests.unshift(record);
    return record;
  }

  getCandidates() {
    return this.candidateApps;
  }

  getStaffingRequests() {
    return this.facilityRequests;
  }
}

@Controller('recruitment')
export class RecruitmentController {
  constructor(private readonly service: RecruitmentService) {}

  @Post('apply')
  applyCandidate(@Body() body: CandidateApplicationDto) {
    const data = this.service.applyCandidate(body);
    return {
      success: true,
      message: 'Candidate application registered successfully!',
      data,
    };
  }

  @Post('staffing-request')
  requestStaffing(@Body() body: StaffingRequestDto) {
    const data = this.service.requestStaff(body);
    return {
      success: true,
      message: 'Staffing request submitted! Our placement manager will contact you within 24 hours.',
      data,
    };
  }

  @Get('candidates')
  getCandidates() {
    return { success: true, data: this.service.getCandidates() };
  }

  @Get('requests')
  getRequests() {
    return { success: true, data: this.service.getStaffingRequests() };
  }
}

@Module({
  controllers: [RecruitmentController],
  providers: [RecruitmentService],
  exports: [RecruitmentService],
})
export class RecruitmentModule {}
