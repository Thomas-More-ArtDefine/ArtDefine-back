import { Test, TestingModule } from '@nestjs/testing';
import { DirectmessagesController } from './directmessages.controller';
import { DirectmessagesService } from './directmessages.service';

describe('DirectmessagesController', () => {
  let controller: DirectmessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectmessagesController],
      providers: [DirectmessagesService],
    }).compile();

    controller = module.get<DirectmessagesController>(DirectmessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
