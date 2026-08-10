import { Module } from '@nestjs/common';
import { ServicesController, ServicesService } from './services/services.module';
import { ConsultationsModule } from './consultations/consultations.module';
import { VerificationModule } from './verification/verification.module';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { ExamPrepModule } from './exam-prep/exam-prep.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConsultationsModule,
    VerificationModule,
    RecruitmentModule,
    ExamPrepModule,
    AdminModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class AppModule {}
