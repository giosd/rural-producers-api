import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducersService } from './producers.service';
import { ProducersController } from './producers.controller';
import { Producer } from './entities/producer.entity';
import { Farm } from '../farms/entities/farm.entity';
import { Crop } from '../crops/entities/crop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producer, Farm, Crop])],
  controllers: [ProducersController],
  providers: [ProducersService],
})
export class ProducersModule {}
