import { Test, TestingModule } from '@nestjs/testing';
import { ProducersService } from './producers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Producer } from './entities/producer.entity';
import { Repository } from 'typeorm';
import { CreateProducerDto } from './dto/create-producer.dto';
import { BadRequestException } from '@nestjs/common';
import { Farm } from '../farms/entities/farm.entity';
import { Crop } from '../crops/entities/crop.entity';

describe('ProducersService', () => {
  let service: ProducersService;
  let repository: jest.Mocked<Repository<Producer>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducersService,
        {
          provide: getRepositoryToken(Producer),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProducersService>(ProducersService);
    repository = module.get(getRepositoryToken(Producer));
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a producer', async () => {
    const dto: CreateProducerDto = {
      document: '12345678900',
      name: 'João',
      farms: [
        {
          name: 'Fazenda A',
          city: 'Cidade',
          state: 'UF',
          totalArea: 100,
          farmingArea: 60,
          vegetationArea: 40,
          crops: [
            {
              name: 'Soja',
              season: 'Safra 2023',
            },
          ],
        },
      ],
    };

    const mockProducer: Producer = {
      id: 'uuid',
      name: dto.name,
      document: dto.document,
      farms: [],
    };

    const entity: Producer = {
      ...mockProducer,
      farms: dto.farms.map(
        (farm, index): Farm => ({
          id: `farm-${index}`,
          name: farm.name,
          city: farm.city,
          state: farm.state,
          totalArea: farm.totalArea,
          farmingArea: farm.farmingArea,
          vegetationArea: farm.vegetationArea,
          crops: farm.crops.map(
            (crop, cropIndex): Crop => ({
              id: cropIndex,
              name: crop.name,
              season: crop.season,
              farm: {} as Farm,
            }),
          ),
          producer: mockProducer,
        }),
      ),
    };

    repository.create.mockImplementation((): Producer => entity);
    repository.save.mockResolvedValue(entity);

    const result = await service.create(dto);

    expect(result).toEqual(entity);
    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledWith(entity);
  });

  it('should throw if farming + vegetation > totalArea', async () => {
    const dto: CreateProducerDto = {
      document: '12345678900',
      name: 'João',
      farms: [
        {
          name: 'Fazenda Erro',
          city: 'Cidade',
          state: 'UF',
          totalArea: 100,
          farmingArea: 80,
          vegetationArea: 30,
          crops: [],
        },
      ],
    };

    await expect(service.create(dto)).rejects.toThrow(BadRequestException);
  });
});
