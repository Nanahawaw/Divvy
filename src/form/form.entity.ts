import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdditionalInfo } from './additional-info.entity';

@Entity()
export class FormSubmission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column()
  companyName: string;

  @Column({ nullable: true })
  tradeLicenseUrl: string;

  @Column()
  W9UploadUrl: string;

  @Column()
  certificateOfInsuranceUrl: string;

  @Column({ nullable: true })
  vendorServices: string;

  @Column('simple-array')
  serviceAreas: string[];

  @Column('simple-array')
  providedServices: string[];

  @OneToOne(() => AdditionalInfo, { cascade: true })
  @JoinColumn()
  additionalInfo: AdditionalInfo;
}
