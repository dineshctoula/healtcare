import { Module } from '@nestjs/common';
import { ServicesController, ServicesService } from './services.module';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
