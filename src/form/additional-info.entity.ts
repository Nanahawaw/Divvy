// additional-info.entity.ts
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AdditionalInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  schedulingCommunicationPreferences: string;

  @Column()
  schedulingContactName: string;

  @Column()
  schedulingContactTitle: string;

  @Column()
  schedulingContactEmail: string;

  @Column()
  schedulingContactPhone: string;

  @Column()
  closeOnBankHoliday: string;

  @Column({ type: 'time' })
  appointmentStartTime: string;

  @Column({ type: 'time' })
  appointmentEndTime: string;

  @Column({ type: 'time', nullable: true })
  appointmentStartTimeSaturday: string;

  @Column({ type: 'time', nullable: true })
  appointmentEndTimeSaturday: string;

  @Column({ type: 'time', nullable: true })
  appointmentStartTimeSunday: string;

  @Column({ type: 'time', nullable: true })
  appointmentEndTimeSunday: string;

  @Column()
  weeklyCapacityJob: number;

  @Column()
  weeklyCapacityAccount: number;

  @Column()
  w2Employees: string;

  @Column()
  totalEmployees: number;

  @Column()
  thirdPartyWorkManagement: string;

  @Column()
  paymentTermsAgreement: string;

  @Column()
  occupiedMaintenanceInterest: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
