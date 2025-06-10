// src/producers/producers.controller.ts
import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ProducersService } from './producers.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { Producer } from './entities/producer.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Producers')
@Controller('producers')
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar produtor rural' })
  create(@Body() createProducerDto: CreateProducerDto): Promise<Producer> {
    return this.producersService.create(createProducerDto);
  }

  @Get()
  findAll(): Promise<Producer[]> {
    return this.producersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Producer> {
    return this.producersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.producersService.remove(id);
  }
}
