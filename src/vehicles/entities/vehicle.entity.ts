import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { VehicleType } from '../enums/vehicle-type.enum';

@Entity('vehicles')
export class VehicleEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 20 })
  licensePlate!: string;

  @Column({ length: 100 })
  brand!: string;

  @Column({ length: 100 })
  model!: string;

  @Column()
  year!: number;

  @Column({ length: 50 })
  color!: string;

  @Column({
    type: 'enum',
    enum: VehicleType,
  })
  type!: VehicleType;

  @Column({ default: true })
  active!: boolean;
}