import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
