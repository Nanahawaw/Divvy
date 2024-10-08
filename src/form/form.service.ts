import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FormSubmission } from 'src/form/form.entity';
import { FormSubmissionDto } from 'src/form/dto/form-submission.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(FormSubmission)
    private formSubmissionRepository: Repository<FormSubmission>,
    private emailService: EmailService,
  ) {}
  async submitForm(
    formSubmissionDto: FormSubmissionDto,
  ): Promise<FormSubmission> {
    const formSubmission =
      this.formSubmissionRepository.create(formSubmissionDto);
    const savedSubmission =
      await this.formSubmissionRepository.save(formSubmission);
    await this.emailService.sendAdminNotification(savedSubmission);
    return savedSubmission;
  }
}
