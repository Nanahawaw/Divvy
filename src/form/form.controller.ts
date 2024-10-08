import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FormService } from './form.service';
import { FormSubmissionDto } from './dto/form-submission.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('forms')
export class FormController {
  constructor(private readonly formSubmissionsService: FormService) {}

  @Post('submit')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'w9Upload', maxCount: 1 },
      { name: 'tradeLicense', maxCount: 1 },
      { name: 'certificateOfInsurance', maxCount: 1 },
    ]),
  )
  async submitForm(
    @UploadedFiles()
    files: {
      w9Upload: Express.Multer.File[];
      tradeLicense?: Express.Multer.File[];
      certificateOfInsurance: Express.Multer.File[];
    },
    @Body() formSubmissionDto: FormSubmissionDto,
  ) {
    //assign uploadedfiles to the dto
    formSubmissionDto.w9Upload = files.w9Upload[0];
    formSubmissionDto.tradeLicense = files.tradeLicense[0];
    formSubmissionDto.certificateOfInsurance = files.certificateOfInsurance[0];
    return await this.formSubmissionsService.submitForm(formSubmissionDto);
  }
}
