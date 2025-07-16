import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockUser = { id: 1, email: 'test@example.com' };
  const mockToken = 'signedtoken';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn().mockResolvedValue({ user: mockUser, token: mockToken }),
            login: jest.fn().mockResolvedValue({ user: mockUser, token: mockToken }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should register a user', async () => {
    const dto = { email: 'test@example.com', password: '123456' };
    expect(await controller.register(dto)).toEqual({ user: mockUser, token: mockToken });
  });

  it('should login a user', async () => {
    const dto = { email: 'test@example.com', password: '123456' };
    expect(await controller.login(dto)).toEqual({ user: mockUser, token: mockToken });
  });
});
