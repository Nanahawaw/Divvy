import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormSubmission } from './submission.entity';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormSubmission])],
  controllers: [FormController],
  providers: [FormService, EmailService],
})
export class FormModule {}
