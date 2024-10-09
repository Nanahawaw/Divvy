import { Type } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsArray,
  IsOptional,
  IsNotEmpty,
  isNotEmpty,
} from 'class-validator';
import { Express } from 'express';

export class FormSubmissionDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  companyName: string;

  @IsNotEmpty()
  w9UploadFile: Express.Multer.File;

  @IsOptional()
  tradeLicenseFile?: Express.Multer.File;

  @IsNotEmpty()
  certificateOfInsuranceFile: Express.Multer.File;

  @IsArray()
  serviceAreas: string[];

  @IsArray()
  providedServices: string[];

  @IsString()
  @IsNotEmpty()
  schedulingCommunicationPreferences: string;

  @IsString()
  @IsNotEmpty()
  schedulingContactName: string;

  @IsString()
  @IsNotEmpty()
  schedulingContactTitle: string;

  @IsString()
  @IsNotEmpty()
  schedulingContactEmail: string;

  @IsString()
  @IsNotEmpty()
  schedulingContactPhone: string;

  // Add other fields and validations as needed
}
