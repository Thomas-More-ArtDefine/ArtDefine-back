import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          }
        },],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should return an array of users', async () => {
  //   const result: User[] = [{
  //     "id": "1",
  //     "user_name" : "testuser1",
  //     "user_password" : null,
  //     "user_email" : null,
  //     "user_pronouns": null,
  //     "user_subtitle": "Example subtitle",
  //     "user_bio": null,
  //     "user_profile_picture": "exampleurl.test",
  //     "user_banner_picture": null,
  //     "user_creationdate": null,
  //     "user_deactivated": false,
  //     "user_deactivation_date": null,
  //     "posts": null,
  //     "groups": null,
  //     "send_messages": null,
  //     "received_messages": null,
  //     "links": null,
  //     "folders": null,
  //     "given_feedback": null,
  //     "rules": null,
  //     "following": null
  // }];
  //   jest.spyOn(service, 'findAllUsers').mockResolvedValue(result);

  //   expect(await service.findAllUsers()).toBe(result);
  // });
});
