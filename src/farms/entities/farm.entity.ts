import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Producer } from '../../producers/entities/producer.entity';
import { Crop } from '../../crops/entities/crop.entity';

@Entity('farms')
export class Farm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ name: 'total_area', nullable: true })
  totalArea: number;

  @Column({ name: 'farming_area', nullable: true })
  farmingArea: number;

  @Column({ name: 'vegetation_area', nullable: true })
  vegetationArea: number;

  @ManyToOne(() => Producer, (producer) => producer.farms, {
    onDelete: 'CASCADE',
  })
  producer: Producer;

  @OneToMany(() => Crop, (crop) => crop.farm, {
    cascade: true,
    eager: true, // ou false e você usa .relations()
  })
  crops: Crop[];
}
