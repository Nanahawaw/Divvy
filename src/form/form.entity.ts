import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('simple-array')
  serviceAreas: string[];

  @Column('simple-array')
  providedServices: string[];
}
