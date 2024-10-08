import { IsEmail, IsString, IsArray } from 'class-validator';

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

  @IsArray()
  serviceAreas: string[];

  @IsArray()
  providedServices: string[];

  // Add other fields and validations as needed
}
