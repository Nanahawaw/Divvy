import { Type } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsArray,
  IsOptional,
  IsNotEmpty,
  isNotEmpty,
  IsNumber,
  IsBoolean,
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

  @IsOptional()
  vendorServices: string[];

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

  @IsString()
  closeOnBankHoliday: string;

  @IsString()
  appointmentStartTime: string;

  @IsString()
  appointmentEndTime: string;

  @IsOptional()
  appointmentStartTimeSaturday?: string;

  @IsOptional()
  appointmentEndTimeSaturday?: string;

  @IsOptional()
  appointmentStartTimeSunday?: string;

  @IsOptional()
  appointmentEndTimeSunday?: string;

  @IsNumber()
  weeklyCapacityJob: number;

  @IsNumber()
  weeklyCapacityAccount: number;

  @IsString()
  w2Employees: string;

  @IsNumber()
  totalEmployees: number;

  @IsString()
  thirdPartyWorkManagement: string;

  @IsString()
  paymentTermsAgreement: string;

  @IsString()
  occupiedMaintenanceInterest: string;

  // Add other fields and validations as needed
}
