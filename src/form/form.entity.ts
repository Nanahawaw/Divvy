import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => AdditionalInfo, { cascade: true })
  @JoinColumn()
  additionalInfo: AdditionalInfo;
}
