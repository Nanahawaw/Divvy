import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FormSubmission } from 'src/form/form.entity';
import { FormSubmissionDto } from 'src/form/dto/form-submission.dto';
import { EmailService } from 'src/email/email.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AdditionalInfo } from './additional-info.entity';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(FormSubmission)
    private formSubmissionRepository: Repository<FormSubmission>,
    private emailService: EmailService,
    @InjectRepository(AdditionalInfo)
    private additionalInfoRepository: Repository<AdditionalInfo>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async uploadFile(
    file: Express.Multer.File,
    fieldName: string,
  ): Promise<string> {
    return this.cloudinaryService.uploadFile(file);
  }
  async submitForm(formSubmissionDto: FormSubmissionDto) {
    const formSubmission = new FormSubmission();
    Object.assign(formSubmission, formSubmissionDto);

    //upload files
    formSubmission.W9UploadUrl = await this.uploadFile(
      formSubmissionDto.w9Upload,
      'w9Upload',
    );
    formSubmission.tradeLicenseUrl = await this.uploadFile(
      formSubmissionDto.tradeLicense,
      'tradeLicense',
    );
    formSubmission.certificateOfInsuranceUrl = await this.uploadFile(
      formSubmissionDto.certificateOfInsurance,
      'certificateOfInsurance',
    );
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
