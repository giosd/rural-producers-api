import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Farm } from '../../farms/entities/farm.entity';

@Entity()
export class Crop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  season: string;

  @ManyToOne(() => Farm, (farm) => farm.crops, { onDelete: 'CASCADE' })
  farm: Farm;
}
