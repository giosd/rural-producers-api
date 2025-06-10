import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Farm } from '../../farms/entities/farm.entity';

@Entity('producers')
export class Producer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  document: string;

  @Column()
  name: string;

  @OneToMany(() => Farm, (farm) => farm.producer, {
    cascade: true,
    eager: true,
  })
  farms: Farm[];
}
