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
      { name: 'w9UploadFile', maxCount: 1 },
      { name: 'tradeLicenseFile', maxCount: 1 },
      { name: 'certificateOfInsuranceFile', maxCount: 1 },
    ]),
  )
  async submitForm(
    @Body() formSubmissionDto: FormSubmissionDto,
    @UploadedFiles()
    files: {
      w9UploadFile: Express.Multer.File[];
      tradeLicenseFile?: Express.Multer.File[];
      certificateOfInsuranceFile: Express.Multer.File[];
    },
  ) {
    const w9File = files.w9UploadFile?.[0];
    const licenseFile = files.tradeLicenseFile?.[0];
    const insuranceFile = files.certificateOfInsuranceFile?.[0];
    return await this.formSubmissionsService.submitForm(
      formSubmissionDto,
      w9File,
      licenseFile,
      insuranceFile,
    );
  }
}
