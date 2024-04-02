import { Test, TestingModule } from '@nestjs/testing';
import { DirectmessagesController } from './directmessages.controller';
import { DirectmessagesService } from './directmessages.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Directmessage } from './entities/directmessage.entity';

describe('DirectmessagesController', () => {
  let controller: DirectmessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectmessagesController],
      providers: [DirectmessagesService,
        {
          provide: getRepositoryToken(Directmessage),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          }
        },],
    }).compile();

    controller = module.get<DirectmessagesController>(DirectmessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
