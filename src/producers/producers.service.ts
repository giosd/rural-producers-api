import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from './entities/producer.entity';
import { CreateProducerDto } from './dto/create-producer.dto';

@Injectable()
export class ProducersService {
  private readonly logger = new Logger(ProducersService.name);

  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
  ) {}

  async create(createProducerDto: CreateProducerDto): Promise<Producer> {
    this.logger.log(`Criando produtor: ${createProducerDto.name}`);

    for (const farm of createProducerDto.farms) {
      const sum = farm.farmingArea + farm.vegetationArea;
      if (sum > farm.totalArea) {
        const message = `Erro na fazenda "${farm.name}": área agricultável (${farm.farmingArea}) + vegetação (${farm.vegetationArea}) excede área total (${farm.totalArea}).`;
        this.logger.error(message);
        throw new BadRequestException(message);
      }
    }

    const producer = this.producerRepository.create(createProducerDto);
    const saved = await this.producerRepository.save(producer);
    this.logger.log(`Produtor criado com ID: ${saved.id}`);

    return saved;
  }

  async findOne(id: string): Promise<Producer> {
    this.logger.log(`Buscando produtor com ID: ${id}`);
    const producer = await this.producerRepository.findOne({ where: { id } });

    if (!producer) {
      const message = `Producer with id ${id} not found`;
      this.logger.warn(message);
      throw new BadRequestException(message);
    }

    return producer;
  }

  async remove(id: string): Promise<void> {
    this.logger.warn(`Removendo produtor com ID: ${id}`);
    const result = await this.producerRepository.delete(id);

    if (result.affected === 0) {
      const message = `Producer with id ${id} not found`;
      this.logger.warn(message);
      throw new BadRequestException(message);
    }

    this.logger.log(`Produtor removido com sucesso: ${id}`);
  }

  async findAll(): Promise<Producer[]> {
    this.logger.log('Listando todos os produtores');
    return this.producerRepository.find();
  }
}
