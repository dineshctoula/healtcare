import { Injectable, Controller, Get, Param, Post, Body, Module } from '@nestjs/common';

export interface VerificationStatus {
  caseNumber: string;
  applicantName: string;
  passportNo: string;
  authority: 'DHA' | 'MOH' | 'DOH';
  submissionDate: string;
  currentStage: 'Document Verification' | 'Primary Source Contact' | 'Report Generated' | 'Completed';
  status: 'In Progress' | 'Verified Positive' | 'Additional Docs Required';
  progressPercentage: number;
  stages: { title: string; date: string; completed: boolean }[];
  details: string;
}

@Injectable()
export class VerificationService {
  private cases: VerificationStatus[] = [
    {
      caseNumber: 'DF-DXB-98421',
      applicantName: 'Dr. Michael Chen',
      passportNo: 'A8849201',
      authority: 'DHA',
      submissionDate: '2026-07-10',
      currentStage: 'Report Generated',
      status: 'Verified Positive',
      progressPercentage: 100,
      stages: [
        { title: 'Application & Document Intake', date: '2026-07-10', completed: true },
        { title: 'Issuing Authority Verification', date: '2026-07-18', completed: true },
        { title: 'Primary Source Verification (PSV)', date: '2026-07-28', completed: true },
        { title: 'Final DataFlow Report Clearance', date: '2026-08-05', completed: true }
      ],
      details: 'All educational degrees and Medical Council Good Standing certificates verified positively.'
    },
    {
      caseNumber: 'DF-DXB-87103',
      applicantName: 'Amina Al-Mansoor',
      passportNo: 'N5521940',
      authority: 'DHA',
      submissionDate: '2026-07-25',
      currentStage: 'Primary Source Contact',
      status: 'In Progress',
      progressPercentage: 65,
      stages: [
        { title: 'Application & Document Intake', date: '2026-07-25', completed: true },
        { title: 'Issuing Authority Verification', date: '2026-08-01', completed: true },
        { title: 'Primary Source Verification (PSV)', date: '2026-08-06', completed: true },
        { title: 'Final DataFlow Report Clearance', date: 'Pending', completed: false }
      ],
      details: 'University transcript verification in process with issuing institution.'
    }
  ];

  lookupCase(query: string): VerificationStatus {
    const q = query.trim().toUpperCase();
    const found = this.cases.find(
      c => c.caseNumber.toUpperCase() === q || c.passportNo.toUpperCase() === q || c.applicantName.toUpperCase().includes(q)
    );

    if (found) return found;

    // Generate dynamic mock response for any arbitrary valid case input
    return {
      caseNumber: q.startsWith('DF-') ? q : `DF-DXB-${Math.floor(10000 + Math.random() * 90000)}`,
      applicantName: 'Healthcare Candidate (' + query + ')',
      passportNo: 'P' + Math.floor(10000000 + Math.random() * 90000000),
      authority: 'DHA',
      submissionDate: new Date(Date.now() - 14 * 86400000).toISOString().split('T')[0],
      currentStage: 'Primary Source Contact',
      status: 'In Progress',
      progressPercentage: 70,
      stages: [
        { title: 'Application & Document Intake', date: '2026-07-28', completed: true },
        { title: 'Issuing Authority Verification', date: '2026-08-02', completed: true },
        { title: 'Primary Source Verification (PSV)', date: 'In Progress', completed: true },
        { title: 'Final DataFlow Report Clearance', date: 'Pending', completed: false }
      ],
      details: 'Verification request actively processed with primary degree granting authority.'
    };
  }
}

@Controller('verification')
export class VerificationController {
  constructor(private readonly service: VerificationService) {}

  @Get('track/:query')
  track(@Param('query') query: string) {
    const result = this.service.lookupCase(query);
    return {
      success: true,
      data: result
    };
  }
}

@Module({
  controllers: [VerificationController],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}
