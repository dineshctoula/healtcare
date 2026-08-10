import { Injectable, Controller, Get, Module } from '@nestjs/common';
import { ConsultationsService, ConsultationsModule } from '../consultations/consultations.module';
import { RecruitmentService, RecruitmentModule } from '../recruitment/recruitment.module';

@Injectable()
export class AdminService {
  constructor(
    private readonly consultationsService: ConsultationsService,
    private readonly recruitmentService: RecruitmentService,
  ) {}

  getOverviewStats() {
    const consultations = this.consultationsService.getAll();
    const candidates = this.recruitmentService.getCandidates();
    const staffingReqs = this.recruitmentService.getStaffingRequests();

    return {
      totalConsultations: consultations.length,
      pendingConsultations: consultations.filter(c => c.status === 'PENDING').length,
      confirmedConsultations: consultations.filter(c => c.status === 'CONFIRMED').length,
      totalCandidates: candidates.length,
      activeStaffingRequests: staffingReqs.length,
      activeDataFlowVerifications: 142,
      dhaPassRatePercentage: 96.4,
      popularCategories: [
        { name: 'Healthcare Licensing & Exam Preparation', count: 48 },
        { name: 'Clinic & Healthcare Business Setup', count: 31 },
        { name: 'Healthcare Recruitment & Staffing', count: 29 },
        { name: 'Training & Education Services', count: 22 },
        { name: 'Medical Support Services', count: 18 }
      ],
      recentConsultations: consultations.slice(0, 5),
      recentCandidates: candidates.slice(0, 5),
      recentStaffingRequests: staffingReqs.slice(0, 5),
    };
  }
}

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  getStats() {
    return {
      success: true,
      data: this.adminService.getOverviewStats(),
    };
  }
}

@Module({
  imports: [ConsultationsModule, RecruitmentModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
