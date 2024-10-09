import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FormSubmission } from 'src/form/form.entity';
import { FormSubmissionDto } from 'src/form/dto/form-submission.dto';
import { EmailService } from 'src/email/email.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AdditionalInfo } from './additional-info.entity';

@Injectable()
export class FormService {
  private readonly logger = new Logger(FormService.name);
  constructor(
    @InjectRepository(FormSubmission)
    private formSubmissionRepository: Repository<FormSubmission>,
    private emailService: EmailService,
    @InjectRepository(AdditionalInfo)
    private additionalInfoRepository: Repository<AdditionalInfo>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async submitForm(
    formSubmissionDto: FormSubmissionDto,
    w9_file: Express.Multer.File,
    license_file: Express.Multer.File,
    insurance_file: Express.Multer.File,
  ) {
    this.logger.log(`Submitting form with files: 
      W9: ${w9_file?.originalname}, 
      License: ${license_file?.originalname}, 
      Insurance: ${insurance_file?.originalname}`);
    const formSubmission = new FormSubmission();
    Object.assign(formSubmission, formSubmissionDto);

    let w9Url: string;
    let licenseUrl: string;
    let insuranceUrl: string;

    if (w9_file) {
      try {
        w9Url = await this.cloudinaryService.uploadFile(w9_file);
        this.logger.log(`W9 file uploaded: ${w9Url}`);
      } catch (error) {
        this.logger.error(`Error uploading W9 file: ${error.message}`);
        throw new Error(`Failed to upload W9 file: ${error.message}`);
      }
    } else {
      this.logger.error('W9 file is missing or empty');
      throw new Error('W9 file is required');
    }

    if (license_file) {
      licenseUrl = await this.cloudinaryService.uploadFile(license_file);
    }

    if (insurance_file) {
      insuranceUrl = await this.cloudinaryService.uploadFile(insurance_file);
    }

    formSubmission.W9UploadUrl = w9Url;
    formSubmission.tradeLicenseUrl = licenseUrl;
    formSubmission.certificateOfInsuranceUrl = insuranceUrl;
    //create and associate additional info
    const additionalInfo = new AdditionalInfo();
    Object.assign(additionalInfo, {
      schedulingCommunicationPreferences:
        formSubmissionDto.schedulingCommunicationPreferences,
      schedulingContactName: formSubmissionDto.schedulingContactName,
      schedulingContactTitle: formSubmissionDto.schedulingContactTitle,
      schedulingContactEmail: formSubmissionDto.schedulingContactEmail,
      schedulingContactPhone: formSubmissionDto.schedulingContactPhone,
    });
    formSubmission.additionalInfo = additionalInfo;
    const savedSubmission =
      await this.formSubmissionRepository.save(formSubmission);
    return savedSubmission;
  }
}
