import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Logger,
} from '@nestjs/common';
import { FormService } from './form.service';
import { FormSubmissionDto } from './dto/form-submission.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('forms')
export class FormController {
  private readonly logger = new Logger(FormController.name);
  constructor(private readonly formSubmissionsService: FormService) {}

  @Post('submit')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'w9UploadFile', maxCount: 1 },
      { name: 'tradeLicenseFile', maxCount: 1 },
      { name: 'certificateOfInsuranceFile', maxCount: 1 },
    ]),
  )
  async submitForm(
    @Body() formSubmissionDto: FormSubmissionDto,
    @UploadedFiles()
    files: {
      w9UploadFile?: Express.Multer.File[];
      tradeLicenseFile?: Express.Multer.File[];
      certificateOfInsuranceFile?: Express.Multer.File[];
    },
  ) {
    this.logger.log(`Received files: ${JSON.stringify(files)}`);
    this.logger.log(`Form data: ${JSON.stringify(formSubmissionDto)}`);

    const w9File = files.w9UploadFile?.[0];
    const licenseFile = files.tradeLicenseFile?.[0];
    const insuranceFile = files.certificateOfInsuranceFile?.[0];

    if (!w9File) {
      this.logger.error('W9 file is missing');
    }
    if (!insuranceFile) {
      this.logger.error('Insurance file is missing');
    }

    return await this.formSubmissionsService.submitForm(
      formSubmissionDto,
      w9File,
      licenseFile,
      insuranceFile,
    );
  }
}
