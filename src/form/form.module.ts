import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormSubmission } from './form.entity';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { EmailService } from 'src/email/email.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AdditionalInfo } from './additional-info.entity';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FormSubmission, AdditionalInfo]),
    MulterModule.register({
      dest: './uploads',
    }),
    CloudinaryModule,
  ],

  controllers: [FormController],
  providers: [FormService, EmailService, CloudinaryService],
})
export class FormModule {}
