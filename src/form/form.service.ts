import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FormSubmission } from 'src/form/submission.entity';
import { FormSubmissionDto } from 'src/form/dto/form-submission.dto';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(FormSubmission)
    private formSubmissionRepository: Repository<FormSubmission>,
  ) {}
  async submitForm(
    formSubmissionDto: FormSubmissionDto,
  ): Promise<FormSubmission> {
    const formSubmission =
      this.formSubmissionRepository.create(formSubmissionDto);
    return await this.formSubmissionRepository.save(formSubmission);
  }
}
