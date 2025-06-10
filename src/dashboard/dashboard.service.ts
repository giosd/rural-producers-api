import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from '../farms/entities/farm.entity';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}

  async getTotalFarms() {
    this.logger.log('Calculando total de fazendas cadastradas');
    return this.farmRepository.count();
  }

  async getTotalArea() {
    this.logger.log('Somando área total de todas as fazendas');
    const result = (await this.farmRepository
      .createQueryBuilder('farm')
      .select('SUM(farm.totalArea)', 'sum')
      .getRawOne()) as { sum: string | null };

    const total = Number(result?.sum ?? 0);
    this.logger.log(`Área total: ${total} hectares`);
    return total;
  }

  async getFarmsByState() {
    this.logger.log('Gerando gráfico por estado');
    return this.farmRepository
      .createQueryBuilder('farm')
      .select('farm.state', 'state')
      .addSelect('COUNT(*)', 'count')
      .groupBy('farm.state')
      .getRawMany();
  }

  async getFarmsByCulture() {
    this.logger.log('Gerando gráfico por cultura plantada');
    return this.farmRepository
      .createQueryBuilder('farm')
      .leftJoin('farm.crops', 'crop')
      .select('crop.name', 'culture')
      .addSelect('COUNT(*)', 'count')
      .groupBy('crop.name')
      .getRawMany();
  }

  async getLandUsage() {
    this.logger.log('Calculando uso do solo (agricultura vs vegetação)');
    const result = (await this.farmRepository
      .createQueryBuilder('farm')
      .select('SUM(farm.farmingArea)', 'farming')
      .addSelect('SUM(farm.vegetationArea)', 'vegetation')
      .getRawOne()) as { farming: string | null; vegetation: string | null };

    const farmingArea = Number(result?.farming ?? 0);
    const vegetationArea = Number(result?.vegetation ?? 0);

    this.logger.log(
      `Área agricultável: ${farmingArea}, vegetação: ${vegetationArea}`,
    );

    return {
      farmingArea,
      vegetationArea,
    };
  }
}
