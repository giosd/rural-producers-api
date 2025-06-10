import { Test, TestingModule } from '@nestjs/testing';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';

describe('ProducersController', () => {
  let controller: ProducersController;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducersController],
      providers: [
        {
          provide: ProducersService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProducersController>(ProducersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
