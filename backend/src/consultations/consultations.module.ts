import { Injectable, Controller, Post, Get, Body, Param, Module } from '@nestjs/common';

export interface BookingDto {
  fullName: string;
  email: string;
  phone: string;
  profession: string;
  serviceCategory: string;
  preferredDate?: string;
  message?: string;
}

export interface ConsultationRecord extends BookingDto {
  id: string;
  referenceNo: string;
  createdAt: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
}

@Injectable()
export class ConsultationsService {
  private consultations: ConsultationRecord[] = [
    {
      id: 'c1',
      referenceNo: 'DXB-HC-2026-901',
      fullName: 'Dr. Sarah Jenkins',
      email: 's.jenkins@example.com',
      phone: '+971 50 123 4567',
      profession: 'Specialist Cardiologist',
      serviceCategory: 'Healthcare Licensing & Exam Preparation',
      preferredDate: '2026-08-15',
      message: 'Need DHA Specialist license eligibility conversion support.',
      createdAt: new Date().toISOString(),
      status: 'CONFIRMED',
    },
    {
      id: 'c2',
      referenceNo: 'DXB-HC-2026-902',
      fullName: 'Elena Rostova',
      email: 'elena.r@example.com',
      phone: '+971 52 987 6543',
      profession: 'Registered Nurse',
      serviceCategory: 'Training & Education Services',
      preferredDate: '2026-08-18',
      message: 'Interested in Prometric Nursing exam prep and OSCE workshop.',
      createdAt: new Date().toISOString(),
      status: 'PENDING',
    }
  ];

  createBooking(dto: BookingDto): ConsultationRecord {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newRecord: ConsultationRecord = {
      id: 'c_' + Date.now(),
      referenceNo: `DXB-HC-2026-${randomNum}`,
      fullName: dto.fullName,
      email: dto.email,
      phone: dto.phone,
      profession: dto.profession,
      serviceCategory: dto.serviceCategory,
      preferredDate: dto.preferredDate || new Date().toISOString().split('T')[0],
      message: dto.message || '',
      createdAt: new Date().toISOString(),
      status: 'PENDING',
    };
    this.consultations.unshift(newRecord);
    return newRecord;
  }

  getAll(): ConsultationRecord[] {
    return this.consultations;
  }

  getByRef(ref: string): ConsultationRecord | undefined {
    return this.consultations.find(c => c.referenceNo.toLowerCase() === ref.toLowerCase() || c.id === ref);
  }

  updateStatus(id: string, status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'): ConsultationRecord {
    const item = this.consultations.find(c => c.id === id || c.referenceNo === id);
    if (item) {
      item.status = status;
      return item;
    }
    throw new Error('Consultation not found');
  }
}

@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly service: ConsultationsService) {}

  @Post()
  create(@Body() body: BookingDto) {
    const record = this.service.createBooking(body);
    return {
      success: true,
      message: 'Consultation request successfully submitted!',
      data: record,
    };
  }

  @Get()
  findAll() {
    return {
      success: true,
      data: this.service.getAll(),
    };
  }

  @Get(':ref')
  findByRef(@Param('ref') ref: string) {
    const record = this.service.getByRef(ref);
    if (!record) {
      return { success: false, message: 'Booking reference not found' };
    }
    return { success: true, data: record };
  }
}

@Module({
  controllers: [ConsultationsController],
  providers: [ConsultationsService],
  exports: [ConsultationsService],
})
export class ConsultationsModule {}
