import { Controller, Post, Body } from '@nestjs/common';
import { FormService } from './form.service';
import { FormSubmissionDto } from './dto/form-submission.dto';

@Controller('form-submissions')
export class FormController {
  constructor(private readonly formSubmissionsService: FormService) {}

  @Post()
  async create(@Body() createFormSubmissionDto: FormSubmissionDto) {
    return await this.formSubmissionsService.submitForm(
      createFormSubmissionDto,
    );
  }
}
