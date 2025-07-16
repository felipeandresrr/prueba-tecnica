import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

const mockUser = {
  id: 1,
  email: 'test@example.com',
  password: 'hashedpassword',
  createdAt: new Date(),
};

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockImplementation(dto => dto),
            save: jest.fn().mockResolvedValue(mockUser),
            findOneBy: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should create a user', async () => {
    const dto = { email: 'test@example.com', password: 'hashed' };
    const user = await service.create(dto);
    expect(user).toEqual(mockUser);
    expect(repo.save).toHaveBeenCalledWith(dto);
  });

  it('should find user by email', async () => {
    const user = await service.findByEmail('test@example.com');
    expect(user).toEqual(mockUser);
  });

  it('should find user by id', async () => {
    const user = await service.findById(1);
    expect(user).toEqual(mockUser);
  });
});
